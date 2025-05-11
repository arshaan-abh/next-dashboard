import Container from "@/components/commons/container";
import { Title } from "@/components/commons/title";
import { Typography } from "@/components/commons/typography";
import Image from "next/image";
import { MoveRight } from "lucide-react";
import React from "react";

const items = [
  {
    id: 1,
    src: "/img/step-1.webp",
    title: "Extraction and Manufacturing",
  },
  {
    id: 2,
    src: "/img/step-2.webp",
    title: "Packaging",
  },
  {
    id: 3,
    src: "/img/step-3.webp",
    title: "Storage",
  },
  {
    id: 4,
    src: "/img/step-4.webp",
    title: "Distribution",
  },
];

const Steps = () => {
  return (
    <Container variant="full" className="bg-light-green-500 py-10">
      <Container variant="small" className="max-md:px-4 lg:px-20">
        <div className="flex items-center justify-between max-md:flex-col">
          {items.map((item, i) => (
            <React.Fragment key={i}>
              {" "}
              <div className={`flex flex-col items-center gap-5 max-md:gap-3`}>
                <Image
                  src={item.src}
                  width={100}
                  height={90}
                  className="max-md:size-[80px]"
                  alt={`step ${item.id}`}
                />

                <Title
                  as="h4"
                  className="max-w-[140px] text-center text-xl font-semibold text-white max-md:text-base"
                >
                  {item.title}
                </Title>
              </div>
              {i + 2 <= items.length && (
                <MoveRight
                  size={60}
                  strokeWidth={1}
                  className="max-md:my-5 max-md:rotate-90"
                />
              )}
            </React.Fragment>
          ))}
        </div>
        <Typography
          as="p"
          align="center"
          className="mx-auto mt-10 w-4/6 text-sm leading-8 text-white max-md:w-full"
        >
          We meticulously assess every process, from material production through
          packaging, storage, transportation, to project delivery, minimizing
          environmental impacts at every step of the way.
        </Typography>
      </Container>
    </Container>
  );
};

export default Steps;
