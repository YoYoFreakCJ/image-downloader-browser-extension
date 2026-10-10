// LoadingContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

type LoadingEntry = { id: string; message?: string };

type LoadingContextType = {
  addLoading: (message?: string) => string;
  removeLoading: (id: string) => void;
  activeLoadings: LoadingEntry[];
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [activeLoadings, setActiveLoadings] = useState<LoadingEntry[]>([]);

  const addLoading = (message?: string): string => {
    const id = uuidv4();
    setActiveLoadings((prev) => [...prev, { id, message }]);
    return id;
  };

  const removeLoading = (id: string) => {
    setActiveLoadings((prev) => prev.filter((entry) => entry.id !== id));
  };

  return (
    <LoadingContext.Provider value={{ addLoading, removeLoading, activeLoadings }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
