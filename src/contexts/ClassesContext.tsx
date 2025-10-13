import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import dndData from "../configs/dnd.json";

interface Class {
  id: string;
  name: string;
  ability: string;
  description: string[];
}

interface ClassesContextType {
  classes: Class[];
}

const ClassesContext = createContext<ClassesContextType | undefined>(undefined);

export const ClassesProvider = ({ children }: { children: ReactNode }) => {
  const contextValue = {
    classes: dndData.classes,
  };

  return (
    <ClassesContext.Provider value={contextValue}>
      {children}
    </ClassesContext.Provider>
  );
};

export const useClasses = () => {
  const context = useContext(ClassesContext);
  if (context === undefined) {
    throw new Error("No hay ClassesProvider");
  }
  return context;
};
