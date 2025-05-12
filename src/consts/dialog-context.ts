import { DialogContextType } from "@/interfaces/dialog";
import { createContext } from "react";

export const initialDialogContext: DialogContextType = [
  {
    open: false,
    title: "",
  },
  () => {},
];

export const DialogContext =
  createContext<DialogContextType>(initialDialogContext);
