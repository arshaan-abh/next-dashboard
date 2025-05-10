import Container from "@/components/commons/container";
import { Title } from "@/components/commons/title";
import { Typography } from "@/components/commons/typography";
import Image from "next/image";

const items = [
  {
    id: 1,
    src: "/img/feature-1.webp",
    title: "Project Oriented Approach",
    content:
      "Considering your project's location, function, scale, life span, and more, customized material offers are crafted to fit your needs",
  },
  {
    id: 2,
    src: "/img/feature-2.webp",
    title: "Material Ranking",
    content:
      "Discover top-rated sustainable materials effortlessly, making informed choices for eco-conscious projects",
  },
  {
    id: 3,
    src: "/img/feature-3.webp",
    title: "Environmental Considerations",
    content:
      "Commitment to a greener world; every material selected prioritizes environmental sustainability, reducing ecological impact",
  },
  {
    id: 4,
    src: "/img/feature-4.webp",
    title: "User Friendly platform",
    content:
      "Simplify your sourcing journey with our intuitive platform—empowering builders and architects through a seamless experience",
  },
];

const Features = () => {
  return (
    <Container variant="full" className="bg-light-green-500 p-10 md:p-20">
      <div className="flex items-center justify-between gap-32 max-md:flex-col max-md:gap-10">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center gap-4 max-md:gap-3"
          >
            <Image
              width={127}
              height={127}
              alt="feature"
              src={item.src}
              className="max-md:size-24"
            />
            <Title as="h4" className="text-xl text-white max-md:text-base">
              {item.title}
            </Title>
            <Typography
              as="p"
              align="center"
              className="text-sm text-white max-md:text-xs"
            >
              {item.content}
            </Typography>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Features;
