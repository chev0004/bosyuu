'use client';

import { SessionProvider } from 'next-auth/react';

export interface AuthContextProps {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthContextProps) => {
    return <SessionProvider>{children}</SessionProvider>;
};
