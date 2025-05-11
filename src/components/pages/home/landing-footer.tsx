import Container from "@/components/commons/container";
import { Title } from "@/components/commons/title";
import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { Label } from "@/components/shadcn/label";
import { Textarea } from "@/components/shadcn/textarea";

const Footer = () => {
  return (
    <Container variant="full" className="bg-light-green-500">
      <Container variant="large">
        <footer className="flex w-full items-center justify-between gap-10 py-10 max-md:flex-col max-md:items-baseline md:py-24">
          <div className="flex flex-col justify-center gap-5 md:w-3/6">
            <Title as="h4">Get in Touch</Title>
            <ul className="list-inside list-disc space-y-5">
              <li>Receive Updates On Our Launch Date</li>
              <li>Ask Your Questions</li>
              <li>Apply To Be Part Of Our Team</li>
            </ul>
            <div className="flex flex-col gap-2">
              <a href="tel:+4917621432802" className="text-sm text-white/80">
                +49 (0)17621432802
              </a>
              <a
                href="mailto:ecoconnect.info@gmail.com"
                className="text-sm text-white/80"
              >
                ecoconnect.info@gmail.com
              </a>
            </div>
          </div>

          <div className="flex w-full justify-center md:w-3/6">
            <form className="flex w-full flex-col gap-4 md:w-6/6 lg:w-4/6">
              <div className="flex w-full items-center gap-5 max-sm:flex-col">
                <div className="w-full">
                  {" "}
                  <Label htmlFor="first-name">First Name</Label>
                  <Input
                    id="first-name"
                    type="text"
                    className="mt-4 border-white focus-visible:ring-gray-100"
                  />
                </div>
                <div className="w-full">
                  <Label htmlFor="last-name">First Name</Label>
                  <Input
                    id="last-name"
                    type="text"
                    className="mt-4 border-white focus-visible:ring-gray-100"
                  />
                </div>
              </div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                className="border-white focus-visible:ring-gray-100"
              />
              <Label htmlFor="Message">Message</Label>
              <Textarea
                id="Message"
                className="border-white focus-visible:ring-gray-100"
              />

              <Button type="submit" rounded={"full"}>
                Send
              </Button>
            </form>
          </div>
        </footer>
        <div className="pb-10 text-center text-sm text-white">
          ©2023 by Ecoconnect
        </div>
      </Container>
    </Container>
  );
};

export { Footer };
