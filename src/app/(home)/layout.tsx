import { Footer } from "@/components/pages/home/landing-footer";
import Header from "@/components/pages/home/landing-header";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
