"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/utils/supabase';

export interface UserPreferences {
  location: string;
  budget: string;
  propertyType: string;
  purpose: string;
  status: string;
}

export interface UserData {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  userType?: string;
}

type AuthContextType = {
  user: UserData | null;
  hasPreferences: boolean;
  userPreferences: UserPreferences | null;
  signIn: (userData: UserData) => Promise<void>;
  signOut: () => Promise<void>;
  completePreferences: (prefs: UserPreferences) => Promise<void>;
  isLoading: boolean;
  allUsers: UserData[];
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      hasPreferences: false,
      userPreferences: null,
      signIn: async () => {},
      signOut: async () => {},
      completePreferences: async () => {},
      isLoading: true,
      allUsers: []
    };
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [hasPreferences, setHasPreferences] = useState(false);
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [allUsers, setAllUsers] = useState<UserData[]>([]);

  const isChecking = React.useRef(false);

  useEffect(() => {
    if (isChecking.current) return;
    
    const checkUserSession = async () => {
      if (isChecking.current) return;
      isChecking.current = true;
      
      setIsLoading(true);
      try {
        if (!supabase) return;

        const sessionPromise = supabase.auth.getSession()
          .then((res: any) => res)
          .catch(() => ({ data: { session: null }, error: null }));

        const timeoutPromise = new Promise<any>((resolve) =>
          setTimeout(() => resolve({ data: { session: null }, error: null }), 1500)
        );

        const result = (await Promise.race([sessionPromise, timeoutPromise])) as any;
        const session = result?.data?.session;
        
        if (session?.user) {
          const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single()
            .catch(() => ({ data: null }));

          if (profile) {
            setUser({
              id: profile.id,
              email: profile.email,
              fullName: profile.full_name,
              phone: profile.phone,
              userType: profile.user_type,
            });
          } else {
            // Create user profile for new OAuth signups
            const newProfile = {
              id: session.user.id,
              email: session.user.email || "",
              full_name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || "MEMBER",
              phone: session.user.user_metadata?.phone || "",
              user_type: session.user.email === "amayaproperties7@gmail.com" ? "Admin" : "Member",
            };

            try {
              await supabase
                .from('users')
                .insert(newProfile);
            } catch {
              // Silently handle
            }

            setUser({
              id: newProfile.id,
              email: newProfile.email,
              fullName: newProfile.full_name,
              phone: newProfile.phone,
              userType: newProfile.user_type,
            });
          }

          // Only fetch all users if we have a session
          try {
            const { data: users } = await supabase.from('users').select('*');
            if (users) {
              setAllUsers(users.map((u: any) => ({
                id: u.id,
                email: u.email,
                fullName: u.full_name,
                phone: u.phone,
                userType: u.user_type,
              })));
            }
          } catch {
            // Silently handle
          }
        }
      } catch {
        // Safe offline fallback
      } finally {
        setIsLoading(false);
        isChecking.current = false;
      }
    };

    checkUserSession();

    const { data: authListener } = supabase?.auth.onAuthStateChange(async (event: string, session: any) => {
      console.log(`Auth Event Triggered: ${event}`, session?.user?.email);
      
      if (event === 'SIGNED_IN' && session) {
        isChecking.current = false; // Reset guard for new login
        checkUserSession();
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsLoading(false);
        isChecking.current = false;
      } else if (event === 'TOKEN_REFRESHED') {
        if (session) {
          isChecking.current = false;
          checkUserSession();
        }
      } else if (event === 'USER_UPDATED' && session) {
        isChecking.current = false;
        checkUserSession();
      }
    }) || { data: { subscription: { unsubscribe: () => {} } } };

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (userData: UserData) => {
    setUser(userData);
  };

  const signOut = async () => {
    try {
      if (supabase) {
        await supabase.auth.signOut();
      }
      setUser(null);
    } catch (e) {
      console.error('Failed to sign out', e);
    }
  };

  const completePreferences = async (prefs: UserPreferences) => {
    setUserPreferences(prefs);
    setHasPreferences(true);
  };

  return (
    <AuthContext.Provider value={{ user, hasPreferences, userPreferences, signIn, signOut, completePreferences, isLoading, allUsers }}>
      {children}
    </AuthContext.Provider>
  );
}
