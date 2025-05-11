import Container from "@/components/commons/container";
import { Typography } from "@/components/commons/typography";
import Image from "next/image";

const ReportMap = () => {
  return (
    <Container
      variant="large"
      className="flex items-center justify-between gap-6 py-10 max-md:flex-col md:py-10"
    >
      <div className="flex flex-col items-center gap-10">
        <Typography
          align="center"
          as="p"
          className="text-light-green-500 text-lg md:text-xl"
        >
          Customized Report Sheets <br /> Providing You With The Most Relevant
          and <br />
          Most Sustainable Material and Supplier <br />
          Choices for Your Projects
        </Typography>
        <Image alt="report" width={445} height={486} src={"/img/report.webp"} />
      </div>

      <div className="flex flex-col items-center gap-10">
        <Image alt="report" width={491} height={486} src={"/img/map.webp"} />
        <Typography
          align="center"
          as="p"
          className="text-light-green-500 text-lg md:text-xl"
        >
          Interactive Map Showing The <br /> Suggested Results
        </Typography>
      </div>
    </Container>
  );
};

export default ReportMap;
