import { ReactNode } from "react";
import Header from "@/components/pages/home/landing-header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
