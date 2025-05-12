import { z } from "zod";

const PlanSchema = z.object({
  title: z.string(),
  price: z.number().positive(),
  features: z.array(z.string()),
  recommended: z.boolean().optional(),
});

export const plans: z.infer<typeof PlanSchema>[] = [
  {
    title: "One Time",
    price: 20,
    features: ["Up to 10 materials per sheet", "Single report download"],
  },
  {
    title: "Monthly",
    price: 65,
    features: [
      "Up to 30 reports",
      "First 3 reports free",
      "Online extended sheets",
    ],
    recommended: true,
  },
  {
    title: "Yearly",
    price: 150,
    features: ["Unlimited reports", "New material updates"],
  },
];
