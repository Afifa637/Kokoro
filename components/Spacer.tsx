// components/Spacer.tsx

import React from 'react';
import { View } from 'react-native';

interface SpacerProps {
  height?: number;
  width?: number;
}

export function Spacer({ height = 8, width = 0 }: SpacerProps) {
  return <View style={{ height, width }} />;
}

export default Spacer;

// Usage example:
//<Spacer height={16} />
//<Spacer width={10} />
