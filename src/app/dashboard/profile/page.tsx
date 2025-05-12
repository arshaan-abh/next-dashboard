"use client";

import { DashboardPageLayout } from "@/components/pages/dashboard/dashboard-page-layout";
import { Form } from "@/components/commons/form";
import { ControlledTextField } from "@/components/commons/controlled-text-field";
import { Submit } from "@/components/commons/submit";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { z } from "zod";
import { useEffect, useState } from "react";
import { toast } from "sonner"; // or any toast lib you're using
import { useFormContext } from "react-hook-form";
import { ControlledDropdownField } from "@/components/commons/controlled-dropdown-field";

// --- Schema Definition ---
const ProfileSchema = z.object({
  firstName: z.string().min(1, "Required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Required"),
  country: z.string().min(1, "Required"),
  state: z.string().optional(),
  city: z.string().min(1, "Required"),
  addressLine1: z.string().min(1, "Required"),
  addressLine2: z.string().optional(),
  postalCode: z.string().min(1, "Required"),
  phoneNumber: z.string().min(1, "Required"),
  email: z.string().email().readonly(),
  contactPersonName: z.string().min(1, "Required"),
  contactPersonPhone: z.string().min(1, "Required"),
});

type ProfileFormType = z.infer<typeof ProfileSchema>;

// --- Mocked Dynamic Data ---
const countries = [
  { code: "US", name: "United States", hasStates: true },
  { code: "DE", name: "Germany", hasStates: false },
];
const states = {
  US: ["California", "Texas", "New York"],
};

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileFormType | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      // Replace this with API call
      const data = {
        firstName: "John",
        middleName: "",
        lastName: "Doe",
        country: "US",
        state: "California",
        city: "Los Angeles",
        addressLine1: "123 Main St",
        addressLine2: "",
        postalCode: "90001",
        phoneNumber: "123-456-7890",
        email: "john@example.com",
        contactPersonName: "Jane Doe",
        contactPersonPhone: "321-654-0987",
      };
      setProfileData(data);
    };
    fetchProfile();
  }, []);

  if (!profileData) return null;

  return (
    <Form<ProfileFormType>
      zodSchema={ProfileSchema}
      defaultValues={profileData}
      onSubmit={async (values) => {
        try {
          console.log(values);
          setLoading(true);
          await new Promise((res) => setTimeout(res, 1000));
          toast.success("Profile updated successfully.");
        } catch (err) {
          console.log(err);

          toast.error("Unable to save profile. Please try again.");
        } finally {
          setLoading(false);
        }
      }}
    >
      <DashboardPageLayout
        title="My Profile"
        className="grid grid-cols-1 gap-6 lg:grid-cols-2"
      >
        <PersonalInfo />
        <AddressSection />
        <EmergencyContact />
        <Card className="lg:col-span-2">
          <CardFooter className="justify-end">
            <Submit disabled={loading}>Save</Submit>
          </CardFooter>
        </Card>
      </DashboardPageLayout>
    </Form>
  );
}

// --- Personal Info Section ---
const PersonalInfo = () => (
  <SectionCard title="Personal Info" description="Your basic personal details.">
    <ControlledTextField<ProfileFormType>
      name="firstName"
      label="First Name"
      className="text-left"
      required
    />
    <ControlledTextField<ProfileFormType>
      name="middleName"
      label="Middle Name"
      className="text-left"
    />
    <ControlledTextField<ProfileFormType>
      name="lastName"
      label="Last Name"
      className="text-left"
      required
    />
    <ControlledTextField<ProfileFormType>
      name="email"
      label="Email"
      className="text-left"
      required
      disabled
    />
    <ControlledTextField<ProfileFormType>
      name="phoneNumber"
      label="Phone Number"
      className="text-left"
      required
    />
  </SectionCard>
);

// --- Address Section ---
const AddressSection = () => {
  const { watch } = useFormContext<ProfileFormType>();
  const country = watch("country");

  const showState = countries.find((c) => c.code === country)?.hasStates;

  return (
    <SectionCard title="Address" description="Your current address.">
      <ControlledDropdownField<ProfileFormType>
        name="country"
        label="Country"
        options={countries.map((c) => ({ value: c.code, label: c.name }))}
      />
      {showState && (
        <ControlledDropdownField<ProfileFormType>
          name="state"
          label="State"
          options={(states[country as keyof typeof states] ?? []).map((s) => ({
            value: s,
            label: s,
          }))}
        />
      )}
      <ControlledTextField<ProfileFormType> name="city" label="City" required />
      <ControlledTextField<ProfileFormType>
        name="addressLine1"
        label="Address Line 1"
        className="text-left"
        required
      />
      <ControlledTextField<ProfileFormType>
        name="addressLine2"
        className="text-left"
        label="Address Line 2"
      />
      <ControlledTextField<ProfileFormType>
        name="postalCode"
        className="text-left"
        label="Postal Code"
        required
      />
    </SectionCard>
  );
};

// --- Emergency Contact Section ---
const EmergencyContact = () => (
  <SectionCard
    title="Emergency Contact"
    description="Person to contact in emergencies."
  >
    <ControlledTextField<ProfileFormType>
      name="contactPersonName"
      className="text-left"
      label="Contact Person Name"
      required
    />
    <ControlledTextField<ProfileFormType>
      name="contactPersonPhone"
      className="text-left"
      label="Contact Person Phone"
      required
    />
  </SectionCard>
);

// --- Reusable Section Card ---
const SectionCard = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent className="flex flex-col gap-4">{children}</CardContent>
  </Card>
);
