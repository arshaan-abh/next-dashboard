import { ReactNode } from "react";
import Header from "@/components/landingHeader";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
