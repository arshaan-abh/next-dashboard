import { Button } from "@/components/shadcn/button";
import Container from "@/components/shadcn/container";
import { Title } from "@/components/shadcn/title";
import { Typography } from "@/components/shadcn/typography";

const HeroHeader = () => {
  return (
    <Container variant="full" className="mt-3 px-0">
      <div className="flex h-[680px] items-center justify-center bg-[var(--green-700)]/30 bg-[url(/img/hero-header.webp)] bg-cover bg-center bg-blend-multiply">
        <div className="flex w-full flex-col items-center gap-3">
          <div className="w-full bg-[var(--green-700)]/50 py-5">
            <Title align="center" className="text-6xl font-bold text-white">
              Ecoconnect
            </Title>
            <Typography align="center" as="p" className="mt-3 text-white">
              Creating a Sustainable World, One Building at a Time
            </Typography>
          </div>
          <Button size={"xl"} className="w-max">
            Who We Are
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default HeroHeader;
