"use client";

import { Submit } from "@/components/commons/submit";
import { DashboardPageLayout } from "@/components/pages/dashboard/dashboard-page-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { Form } from "@/components/commons/form";
import { ControlledTextField } from "@/components/commons/controlled-text-field";
import { z } from "zod";

const UserProfileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string().optional(),
  country: z.number(),
  state: z.number(),
  city: z.number(),
  address1: z.string(),
  address2: z.string().optional(),
  postalCode: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
  contactPersonName: z.string(),
  contactPersonPhone: z.string(),
});
type UserProfileRequest = z.infer<typeof UserProfileSchema>;

export default function ProfilePage() {
  return (
    <Form<UserProfileRequest>
      zodSchema={UserProfileSchema}
      defaultValues={{
        firstName: "",
        lastName: "",
        middleName: "",
        country: 0,
        state: 0,
        city: 0,
        address1: "",
        address2: "",
        postalCode: "",
        phoneNumber: "",
        email: "",
        contactPersonName: "",
        contactPersonPhone: "",
      }}
      onSubmit={async (data) => console.log("Profile Submitted", data)}
    >
      <DashboardPageLayout
        title="User Profile"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
      >
        <ProfileCard />
      </DashboardPageLayout>
    </Form>
  );
}

const ProfileCard = () => {
  return (
    <Card className="col-span-1 sm:col-span-2 xl:col-span-3">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
        <CardDescription>
          Update your personal and contact details.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <ControlledTextField<UserProfileRequest>
          name="firstName"
          label="First Name"
        />
        <ControlledTextField<UserProfileRequest>
          name="lastName"
          label="Last Name"
        />
        <ControlledTextField<UserProfileRequest>
          name="middleName"
          label="Middle Name (Optional)"
        />
        <ControlledTextField<UserProfileRequest>
          name="country"
          label="Country"
          type="number"
          saveAsNumber
        />
        <ControlledTextField<UserProfileRequest>
          name="state"
          label="State"
          type="number"
          saveAsNumber
        />
        <ControlledTextField<UserProfileRequest>
          name="city"
          label="City"
          type="number"
          saveAsNumber
        />
        <ControlledTextField<UserProfileRequest>
          name="address1"
          label="Address Line 1"
        />
        <ControlledTextField<UserProfileRequest>
          name="address2"
          label="Address Line 2 (Optional)"
        />
        <ControlledTextField<UserProfileRequest>
          name="postalCode"
          label="Postal Code"
        />
        <ControlledTextField<UserProfileRequest>
          name="phoneNumber"
          label="Phone Number"
        />
        <ControlledTextField<UserProfileRequest> name="email" label="Email" />
        <ControlledTextField<UserProfileRequest>
          name="contactPersonName"
          label="Contact Person Name"
        />
        <ControlledTextField<UserProfileRequest>
          name="contactPersonPhone"
          label="Contact Person Phone"
        />
      </CardContent>
      <CardFooter className="justify-end">
        <Submit>Save Changes</Submit>
      </CardFooter>
    </Card>
  );
};
