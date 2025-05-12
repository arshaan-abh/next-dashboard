"use client";

import { initialDialogContext, DialogContext } from "@/consts/dialog-context";
import { cn } from "@/utils/cn";
import { ReactNode, useState, useCallback } from "react";

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [dialog, setDialog] = useState(initialDialogContext[0]);

  const onConfirm = useCallback(() => {
    dialog.onConfirm?.();
    setDialog((prev) => ({ ...prev, open: false }));
  }, [dialog]);

  const onDecline = useCallback(() => {
    dialog.onDecline?.();
    setDialog((prev) => ({ ...prev, open: false }));
  }, [dialog]);

  return (
    <DialogContext.Provider value={[dialog, setDialog]}>
      {children}

      <div
        className={cn(
          "fixed inset-0 z-10 flex items-center justify-center bg-black/75 p-4 transition-all",
          !dialog.open && "pointer-events-none opacity-0",
        )}
        onClick={onDecline}
      >
        <div
          className="w-main max-h-full max-w-full overflow-y-auto rounded-[0.625rem] bg-white"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 flex flex-col gap-1 bg-white p-4">
            <div className="text-xl">{dialog.title}</div>
            <div className="opacity-50">{dialog.description}</div>
          </div>

          <div className="p-4 pt-0">{dialog.content}</div>

          {(dialog.onConfirm || dialog.onDecline) && (
            <div className="sticky bottom-0 flex divide-x divide-black/25 border-t border-black/25 bg-[#F3F3F3] divide-x-reverse *:basis-full *:p-2">
              {dialog.onConfirm && <button onClick={onConfirm}>تایید</button>}
              {dialog.onDecline && <button onClick={onDecline}>رد کردن</button>}
            </div>
          )}
        </div>
      </div>
    </DialogContext.Provider>
  );
};
