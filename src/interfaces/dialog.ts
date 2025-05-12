import { Dispatch, ReactNode, SetStateAction } from "react";

export interface Dialog {
  open: boolean;
  onConfirm?: () => void;
  onDecline?: () => void;
  title: string;
  description?: string;
  content?: ReactNode;
}

export type DialogContextType = [Dialog, Dispatch<SetStateAction<Dialog>>];
