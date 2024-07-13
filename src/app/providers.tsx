"use client";
import { AuthProvider } from "../contexts/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </AuthProvider>
  );
}
