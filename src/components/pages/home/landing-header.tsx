"use client";
import { useState } from "react";
import Container from "@/components/commons/container";
import Image from "next/image";
import { Title } from "@/components/commons/title";
import { Button } from "@/components/shadcn/button";
import { Mail, Menu, X } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 right-0 z-50 bg-white py-4 shadow-[0_4px_13px_5px_rgba(63,118,82,0.26)]">
      <Container
        variant="full"
        className="flex items-center justify-between max-md:gap-6"
      >
        <div className="flex items-center gap-x-1 max-md:justify-center">
          <Image
            width={60}
            height={60}
            alt="logo"
            src={"/img/logo.webp"}
            quality={100}
            className="min-w-[30px]"
          />
          <div>
            <Title
              as="h3"
              size="lg"
              className="text-light-green-500 uppercase max-md:text-xl"
            >
              ECOCONNECT
            </Title>
            <Title
              as="h3"
              size="xs"
              className="text-light-green-600 text-wrap max-md:w-3xs max-md:text-xs"
            >
              Creating a Sustainable World, One Building at a Time
            </Title>
          </div>
        </div>

        <Button
          size={"xl"}
          rounded={"full"}
          className={"bg-light-green-500 text-white max-md:hidden"}
        >
          Contact <Mail className="size-6" />
        </Button>

        <div className="md:hidden">
          {menuOpen ? (
            <X
              className="text-light-green-500 cursor-pointer"
              onClick={() => setMenuOpen(false)}
            />
          ) : (
            <Menu
              className="text-light-green-500 cursor-pointer"
              onClick={() => setMenuOpen(true)}
            />
          )}
        </div>
      </Container>

      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white p-4 shadow-lg md:hidden">
          <ul className="text-light-green-500 flex flex-col items-center gap-4">
            <li>
              <a
                className="text-light-green-500"
                href="#home"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </a>
            </li>
            <li>
              <a href="#about" onClick={() => setMenuOpen(false)}>
                About
              </a>
            </li>
            <li>
              <a href="#services" onClick={() => setMenuOpen(false)}>
                Services
              </a>
            </li>
            <li>
              <a href="#contact" onClick={() => setMenuOpen(false)}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
