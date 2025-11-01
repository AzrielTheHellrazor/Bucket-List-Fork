'use client';

import { createContext } from 'react';
import type { MiniKitContextType } from './types';

const defaultMiniKitContext: MiniKitContextType = {
  enabled: false,
  context: null,
  updateClientContext: () => {},
  notificationProxyUrl: '/api/notify',
  __isMiniKit: false,
};

export const MiniKitContext = createContext<MiniKitContextType>(
  defaultMiniKitContext,
);


