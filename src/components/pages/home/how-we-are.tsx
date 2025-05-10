import { Button } from "@/components/shadcn/button";
import Container from "@/components/commons/container";
import { Title } from "@/components/commons/title";
import { Typography } from "@/components/commons/typography";
import Image from "next/image";

const HowWeAre = () => {
  return (
    <Container variant="full" className="py-20">
      <Container variant="small" className="flex items-center gap-20">
        <Image
          src={"/img/who.webp"}
          alt="who we are"
          width={402}
          height={396}
        />
        <div className="flex flex-col items-center">
          <Title as="h2" className="text-light-green-700 text-[40px] font-bold">
            Who We Are
          </Title>
          <Typography as="p" className="text-light-green-700">
            At a Glance:
          </Typography>
          <Typography
            as="p"
            size="sm"
            className="text-light-green-700 mt-2 leading-7"
          >
            Ecoconnect is a LCA-based building material database that empowers
            architects and project developers in discerning eco-conscious
            materials and vendors. Our mission is to refine material
            procurement, fostering sustainable construction through a
            comprehensive decision support platform. Elevate your experience
            with premium offerings, including personalized material selection
            consultations through detailed report sheets, material supply, and
            project material profiles
          </Typography>
          <Button rounded={"full"} className={"bg-light-green-500 mt-4"}>
            Our Customers
          </Button>
        </div>
      </Container>
    </Container>
  );
};

export default HowWeAre;
