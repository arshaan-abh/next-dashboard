import Container from "@/components/commons/container";
import { Title } from "@/components/commons/title";
import { Typography } from "@/components/commons/typography";
import Image from "next/image";

const items = [
  {
    id: 1,
    src: "/img/service-2.webp",
    counter: "01",
    title: "Services For Architects, Builders, and Property Developers",
    content:
      "For builders and contractors who need access to high-quality sustainable building materials to meet the growing demand for green buildings, for architects and designers who are looking for sustainable materials to meet the needs of their clients and meet environmental standards, and for property developers who are looking for sustainable building materials to differentiate their projects and appeal to environmentally conscious customers, WE ARE THERE. We make the eco-conscious selection process easy for you by tailoring the options available in the market to your needs. ",
  },
  {
    id: 2,
    src: "/img/service-3.webp",
    counter: "02",
    title: "Services For Material Suppliers",
    content:
      "Whether you're a newcomer to the market, an eco-friendly supplier seeking recognition, or someone looking to differentiate your offerings with unique characteristics, Ecoconnect is here to support your growth journey. Our platform offers a strategic advantage by helping committed suppliers adhere to the highest sustainability standards, enabling you to stand out from the competition. Through our robust network and services, we empower suppliers to expand their reach, forge new connections, and captivate a wider audience of conscientious customers.",
  },
  {
    id: 3,
    src: "/img/service-1.webp",
    counter: "03",
    title: "Services to the construction Industry in General",
    content:
      "At Ecoconnect, we're committed to streamlining and enhancing the process of material sourcing, making it not just efficient but also sustainable. Our platform is a catalyst for change, empowering the industry to make environmentally conscious decisions, reduce carbon footprints, and promote sustainable practices. Through our innovative approach, we're driving a significant reduction in CO2 emissions and fostering environmental protection by offering a diverse range of eco-friendly materials",
  },
];

const Services = () => {
  return (
    <Container variant="small" className="space-y-24 p-20">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`flex items-center gap-x-8 ${
            index % 2 == 0 ? "flex-row-reverse" : ""
          }`}
        >
          <Image
            src={item.src}
            width={505}
            height={505}
            alt={`Feature ${item.counter}`}
          />

          <div className="flex max-w-xl flex-col items-start justify-between">
            <Title as="h4" className="text-light-green-500 text-[100px]">
              {item.counter}
            </Title>
            <Title
              as="h4"
              className="text-light-green-500 text-[38px] leading-8"
            >
              {item.title}
            </Title>
            <Typography
              as="p"
              className="text-light-green-500 text-base leading-8"
            >
              {item.content}
            </Typography>
          </div>
        </div>
      ))}
    </Container>
  );
};

export default Services;
