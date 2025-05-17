"use client";
import Container from "@/components/commons/container";
import { Title } from "@/components/commons/title";
import { Typography } from "@/components/commons/typography";
import { Button } from "@/components/shadcn/button";
import { useRouter } from "next/navigation";

const HeroHeader = () => {
  const router = useRouter();
  return (
    <Container variant="full" className="!px-0 pt-3">
      <div className="bg-light-green-700/30 flex h-[400px] items-center justify-center bg-[url(/img/hero-header-mobile.webp)] bg-cover bg-center bg-blend-multiply md:h-[680px] md:bg-[url(/img/hero-header.webp)]">
        <div className="flex w-full flex-col items-center gap-3">
          <div className="bg-light-green-700/50 w-full px-4 py-5">
            <Title
              align="center"
              className="text-6xl font-semibold text-white max-md:text-3xl"
            >
              Ecoconnect
            </Title>
            <Typography
              align="center"
              as="p"
              className="mt-5 font-light text-white max-md:text-xl"
            >
              Creating a Sustainable World, One Building at a Time
            </Typography>
          </div>
          <Button
            size={"xl"}
            rounded={"full"}
            onClick={() => router.push("#HowWeAre")}
            className={
              "bg-light-green-500 hover:bg-light-green-700 mt-4 w-max text-white"
            }
          >
            Who We Are
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default HeroHeader;
