import { ReactNode } from "react";
import Header from "@/components/pages/home/landing-header";
import { Footer } from "@/components/pages/home/landing-footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      {/* <Footer /> */}
    </>
  );
}
