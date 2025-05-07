import Container from "@/components/shadcn/container";
import Image from "next/image";
import { Title } from "../shadcn/title";
import { Button } from "../shadcn/button";
import { Mail } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 right-0 py-4 shadow-[0_4px_13px_5px_rgba(63,118,82,0.26)]">
      <Container variant="full" className="flex items-center justify-between">
        <div className="flex items-center gap-x-1">
          <Image
            width={60}
            height={60}
            alt="logo"
            src={"/img/logo.webp"}
            quality={100}
          />
          <div>
            <Title
              as="h3"
              size="lg"
              className="text-[var(--green-500)] uppercase"
            >
              ECOCONNECT
            </Title>
            <Title as="h3" size="xs" className="text-[var(--green-600)]">
              Creating a Sustainable World, One Building at a Time
            </Title>
          </div>
        </div>

        <Button variant={"default"} size={"xl"}>
          Contact <Mail size={24} />
        </Button>
      </Container>
    </header>
  );
};

export default Header;
