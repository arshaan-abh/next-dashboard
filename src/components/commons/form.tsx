"use client";

import { DialogContext } from "@/consts/dialog-context";
import { useUnsavedChangesWarning } from "@/hooks/use-unsaved-changes-warning";
import { Dialog } from "@/interfaces/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useCallback, useContext } from "react";
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  useForm,
} from "react-hook-form";
import { ZodType } from "zod";

interface FormProps<FinalData extends FieldValues> {
  children?: ReactNode;
  zodSchema: ZodType;
  defaultValues: FinalData;
  omitFields?: (keyof FinalData)[];
  confirmDialog?: Omit<Dialog, "open" | "onConfirm" | "onDecline">;
  onSubmit?: (finalData: FinalData) => Promise<void>;
  showUnsavedChangesWarning?: boolean;
}

export const Form = <FinalData extends FieldValues>({
  children,
  zodSchema,
  defaultValues,
  omitFields,
  confirmDialog,
  onSubmit,
  showUnsavedChangesWarning,
}: FormProps<FinalData>) => {
  const { handleSubmit, control, ...others } = useForm<FinalData>({
    resolver: zodResolver(zodSchema),
    defaultValues: defaultValues as DefaultValues<FinalData>,
  });

  useUnsavedChangesWarning(
    showUnsavedChangesWarning ? others.formState.isDirty : false,
  );

  const [, setDialog] = useContext(DialogContext);

  const showConfirmDialog = useCallback(
    async (): Promise<boolean> =>
      new Promise((resolve) =>
        setDialog({
          onConfirm: () => resolve(true),
          onDecline: () => resolve(false),
          open: true,
          title: confirmDialog?.title ?? "",
          description: confirmDialog?.description,
          content: confirmDialog?.content,
        }),
      ),
    [confirmDialog, setDialog],
  );

  return (
    <FormProvider handleSubmit={handleSubmit} control={control} {...others}>
      <form
        onSubmit={handleSubmit(async (data) => {
          if (confirmDialog) {
            const confirmed = await showConfirmDialog();
            if (!confirmed) return;
          }

          if (onSubmit) {
            const finalData = omitFields
              ? (Object.fromEntries(
                  Object.entries(data).filter(
                    ([key]) => !omitFields.includes(key),
                  ),
                ) as FinalData)
              : data;

            await onSubmit(finalData);
          }
        })}
      >
        <FormProvider handleSubmit={handleSubmit} control={control} {...others}>
          {children}
        </FormProvider>
      </form>
    </FormProvider>
  );
};
