import Container from "@/components/commons/container";
import Image from "next/image";
import { Title } from "@/components/commons/title";
import { Button } from "@/components/shadcn/button";
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
            <Title as="h3" size="lg" className="text-light-green-500 uppercase">
              ECOCONNECT
            </Title>
            <Title as="h3" size="xs" className="text-light-green-600">
              Creating a Sustainable World, One Building at a Time
            </Title>
          </div>
        </div>

        <Button
          variant={"default"}
          size={"xl"}
          rounded={"full"}
          className={"bg-light-green-500"}
        >
          Contact <Mail className="size-6" />
        </Button>
      </Container>
    </header>
  );
};

export default Header;
