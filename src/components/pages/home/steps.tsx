import Container from "@/components/commons/container";
import { Title } from "@/components/commons/title";
import { Typography } from "@/components/commons/typography";
import Image from "next/image";

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
    <Container variant="full" className="bg-[var(--green-500)] py-10">
      <Container variant="small" className="px-20">
        <div className="flex items-center justify-between">
          {items.map((item) => (
            <div key={item.id} className={`flex flex-col items-center gap-5`}>
              <Image
                src={item.src}
                width={100}
                height={90}
                alt={`step ${item.id}`}
              />

              <Title as="h4" className="text-xl text-white">
                {item.title}
              </Title>
            </div>
          ))}
        </div>
        <Typography
          as="p"
          align="center"
          className="mx-auto mt-10 w-4/6 text-sm leading-8 text-white"
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
