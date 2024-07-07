"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { IconUrlContextProps } from "../types/types";

const IconUrlContext = createContext<IconUrlContextProps | undefined>(
  undefined
);

export const IconUrlProvider = ({ children }: { children: ReactNode }) => {
  const [iconUrl, setIconUrl] = useState<string | null>(null);

  return (
    <IconUrlContext.Provider value={{ iconUrl, setIconUrl }}>
      {children}
    </IconUrlContext.Provider>
  );
};

export const useIconUrl = () => {
  const context = useContext(IconUrlContext);
  if (!context) {
    throw new Error("useIconUrl must be used within an IconUrlProvider");
  }
  return context;
};
