import Container from "@/components/shadcn/container";
import { Title } from "@/components/shadcn/title";
import { Typography } from "@/components/shadcn/typography";

const HeroHeader = () => {
  return (
    <Container variant="full" className="mt-3 px-0">
      <div className="flex h-[680px] items-center justify-center bg-[url(/img/hero-header.webp)] bg-cover bg-center">
        <div className="w-full bg-[var(--green-700)]/50 py-5">
          <Title align="center">Ecoconnect</Title>
          <Typography align="center" as="p">
            Creating a Sustainable World, One Building at a Time
          </Typography>
        </div>
      </div>
    </Container>
  );
};

export default HeroHeader;
