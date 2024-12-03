import { ConvexProvider, ConvexReactClient } from 'convex/react';
import React from 'react';

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

const ConvexProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
};

export default ConvexProviderWrapper;
