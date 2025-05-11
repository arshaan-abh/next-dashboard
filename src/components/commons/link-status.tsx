"use client";

import { useDebounce } from "@/hooks/use-debounce";
import { LucideProps } from "lucide-react";
import { useLinkStatus } from "next/link";
import { FC } from "react";
import { Loading } from "./loading";

export const LinkStatus: FC<LucideProps> = (props) => {
  const { pending } = useLinkStatus();
  const { debouncedState } = useDebounce(pending, 300);

  return debouncedState ? <Loading {...props} /> : null;
};
