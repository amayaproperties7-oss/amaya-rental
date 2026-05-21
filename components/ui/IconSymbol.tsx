import { StyleProp, ViewStyle, OpaqueColorValue } from 'react-native';
import { SymbolWeight } from 'expo-symbols';

// This is a simplified IconSymbol for web compatibility
export function IconSymbol({
  name: _name,
  size: _size = 24,
  color: _color,
  style: _style,
}: {
  name: string;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  return null; // Return null or an actual web-compatible icon component
}
