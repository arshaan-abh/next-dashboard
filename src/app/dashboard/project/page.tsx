"use client";

import { ControlledCheckbox } from "@/components/commons/controlled-checkbox";
import { ControlledCustomSelect } from "@/components/commons/controlled-custom-select";
import { ControlledSlider } from "@/components/commons/controlled-slider";
import { ControlledTextField } from "@/components/commons/controlled-text-field";
import { Form } from "@/components/commons/form";
import { HelperText } from "@/components/commons/helper-text";
import { Stepper } from "@/components/commons/stepper";
import { DashboardPageLayout } from "@/components/pages/dashboard/dashboard-page-layout";
import { Button } from "@/components/shadcn/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";
import { StepperContext } from "@/consts/stepper-context";
import { cn } from "@/utils/cn";
import { Eraser, Pencil, Plus } from "lucide-react";
import {
  ComponentProps,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Path, useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { z } from "zod";

const MaterialSchema = z.object({
  buildingElement: z.union([z.literal("floor"), z.literal("roof")]),
  quantity: z.number().positive(),
  material: z.union([
    z.literal("concrete"),
    z.literal("wood"),
    z.literal("plaster"),
  ]),
});
const StructureProjectSchema = z
  .object({
    address: z.string().min(1),
    postalCode: z.string().min(1),
    city: z.string().min(1),

    serviceOne: z.boolean(),
    serviceTwo: z.boolean(),
    serviceThree: z.boolean(),

    lifespan: z.number().positive(),

    buildingType: z.union([z.literal("new-building"), z.literal("renovation")]),
    netFloorArea: z.number().positive(),
    usableArea: z.number().positive(),
    grossFloorArea: z.number().positive(),
    propertyArea: z.number().positive(),

    materials: z.array(MaterialSchema).min(1),
    buildingElementTemp: z.union([z.literal("floor"), z.literal("roof")]),
    quantityTemp: z.number().positive(),
    materialTemp: z.union([
      z.literal("concrete"),
      z.literal("wood"),
      z.literal("plaster"),
    ]),
  })
  .refine((data) => data.serviceOne || data.serviceTwo || data.serviceThree, {
    message: "At least one service must be selected",
    path: ["serviceOne"],
  });
type StructureProjectRequest = z.infer<typeof StructureProjectSchema>;

export default function StructureProject() {
  return (
    <Form<StructureProjectRequest>
      zodSchema={StructureProjectSchema}
      defaultValues={{
        address: "",
        postalCode: "",
        city: "",

        serviceOne: false,
        serviceTwo: false,
        serviceThree: false,

        lifespan: 0,

        buildingType: "new-building",
        netFloorArea: 0,
        usableArea: 0,
        grossFloorArea: 0,
        propertyArea: 0,

        materials: [],
        buildingElementTemp: "floor",
        quantityTemp: 0,
        materialTemp: "concrete",
      }}
      omitFields={["buildingElementTemp", "quantityTemp", "materialTemp"]}
      onSubmit={async (data) => console.log(data)}
      // showUnsavedChangesWarning
    >
      <DashboardPageLayout title="Structure Your Project" className="px-0">
        <Stepper
          steps={[
            {
              title: "Location",
              description: "First step",
              content: <LocationStep />,
            },
            {
              title: "Functions Selection",
              description: "Second step",
              content: <FunctionsSelectionStep />,
            },
            {
              title: "Lifespan Definition",
              description: "Third step",
              content: <LifespanDefinitionStep />,
            },
            {
              title: "Project Details",
              description: "Fourth step",
              content: <ProjectDetailsStep />,
            },
            {
              title: "Material Selection",
              description: "Fifth step",
              content: <MaterialSelectionStep />,
            },
          ]}
        />
      </DashboardPageLayout>
    </Form>
  );
}

// First step
const LocationStep = () => {
  return (
    <StepperContentCard
      cardTitle="Location"
      cardDescription="Enter location details of my building so that the system can register where the project is based."
      fieldNames={["address", "postalCode", "city"]}
    >
      <ControlledTextField<StructureProjectRequest>
        name="address"
        label="Address"
        placeholder="Street and building"
      />
      <ControlledTextField<StructureProjectRequest>
        name="postalCode"
        label="Postal code"
        placeholder="10115 etc."
      />
      <ControlledTextField<StructureProjectRequest>
        name="city"
        label="City"
        placeholder="Berlin etc."
      />
    </StepperContentCard>
  );
};

// Second step
const FunctionsSelectionStep = () => {
  return (
    <StepperContentCard
      cardTitle="Functions Selection"
      cardDescription="Choose which house-building services apply to my project."
      fieldNames={["serviceOne", "serviceTwo", "serviceThree"]}
    >
      <ControlledCheckbox<StructureProjectRequest>
        name="serviceOne"
        label="Service One"
        description="Description of service one"
      />
      <ControlledCheckbox<StructureProjectRequest>
        name="serviceTwo"
        label="Service Two"
        description="Description of service two"
      />
      <ControlledCheckbox<StructureProjectRequest>
        name="serviceThree"
        label="Service Three"
        description="Description of service three"
      />
    </StepperContentCard>
  );
};

// Third step
const LifespanDefinitionStep = () => {
  return (
    <StepperContentCard
      cardTitle="Lifespan Definition"
      cardDescription="Define the expected lifespan of my building."
      fieldNames={["lifespan"]}
    >
      <ControlledSlider<StructureProjectRequest>
        name="lifespan"
        unit="Years"
        min={0}
        step={1}
        max={100}
        saveAsNumber
      />
    </StepperContentCard>
  );
};

// Fourth step
const ProjectDetailsStep = () => {
  return (
    <StepperContentCard
      cardTitle="Project Details"
      cardDescription="Enter detailed characteristics of my building project including type and area."
      fieldNames={[
        "buildingType",
        "netFloorArea",
        "usableArea",
        "grossFloorArea",
        "propertyArea",
      ]}
    >
      <ControlledCustomSelect<StructureProjectRequest>
        name="buildingType"
        label="Building type"
        options={[
          { children: "New building", value: "new-building" },
          { children: "Renovation", value: "renovation" },
        ]}
      />
      <ControlledTextField<StructureProjectRequest>
        name="netFloorArea"
        type="number"
        label="Net floor area"
        saveAsNumber
      />
      <ControlledTextField<StructureProjectRequest>
        name="usableArea"
        type="number"
        label="Usable area"
        saveAsNumber
      />
      <ControlledTextField<StructureProjectRequest>
        name="grossFloorArea"
        type="number"
        label="Gross floor area"
        saveAsNumber
      />
      <ControlledTextField<StructureProjectRequest>
        name="propertyArea"
        type="number"
        label="Property area"
        saveAsNumber
      />
    </StepperContentCard>
  );
};

// Fifth step
const MaterialSelectionStep = () => {
  const { control, trigger, setValue, formState } =
    useFormContext<StructureProjectRequest>();
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "materials",
  });
  const [watchedBuildingElementTemp, watchedQuantityTemp, watchedMaterialTemp] =
    useWatch({
      control,
      name: ["buildingElementTemp", "quantityTemp", "materialTemp"],
    });

  const add = useCallback(
    ({ close }: CustomDialogSubmitParams) =>
      trigger(["buildingElementTemp", "quantityTemp", "materialTemp"]).then(
        (isValid) => {
          if (isValid) {
            append({
              buildingElement: watchedBuildingElementTemp,
              quantity: watchedQuantityTemp,
              material: watchedMaterialTemp,
            });
            close();
          }
        },
      ),
    [
      trigger,
      append,
      watchedBuildingElementTemp,
      watchedQuantityTemp,
      watchedMaterialTemp,
    ],
  );

  const edit = useCallback(
    ({ index }: { index: number }) =>
      ({ close }: CustomDialogSubmitParams) =>
        trigger(["buildingElementTemp", "quantityTemp", "materialTemp"]).then(
          (isValid) => {
            if (isValid) {
              update(index, {
                buildingElement: watchedBuildingElementTemp,
                quantity: watchedQuantityTemp,
                material: watchedMaterialTemp,
              });
              close();
            }
          },
        ),
    [
      trigger,
      update,
      watchedBuildingElementTemp,
      watchedQuantityTemp,
      watchedMaterialTemp,
    ],
  );

  return (
    <StepperContentCard
      cardTitle="Material Selection"
      cardDescription="Specify materials for different parts of the building by adding rows of detailed inputs."
      fieldNames={["materials"]}
      className="block"
    >
      <div className="flex flex-col gap-2">
        <Table>
          <TableCaption>
            Here you can specify your desired materials.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Building Element</TableHead>
              <TableHead>Quantity (m²)</TableHead>
              <TableHead>Material</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map(
              ({ id, buildingElement, quantity, material }, index) => (
                <TableRow key={id}>
                  <TableCell>{buildingElement}</TableCell>
                  <TableCell>{quantity}</TableCell>
                  <TableCell>{material}</TableCell>
                  <TableCell className="flex items-center justify-end gap-2">
                    <CustomDialog
                      dialogTitle="Edit Material"
                      dialogDescription="Here you can edit your desired materials."
                      submitText="Edit"
                      submit={edit({ index })}
                      onOpen={() => {
                        setValue("buildingElementTemp", buildingElement);
                        setValue("quantityTemp", quantity);
                        setValue("materialTemp", material);
                      }}
                      trigger={
                        <Button
                          type="button"
                          variant="secondary"
                          size="icon"
                          className="size-8"
                        >
                          <Pencil />
                        </Button>
                      }
                    >
                      <MaterialForm />
                    </CustomDialog>
                    <CustomDialog
                      dialogTitle="Remove Material"
                      dialogDescription="Are you sure you want to remove this material?"
                      submitText="Remove"
                      submit={({ close }) => {
                        remove(index);
                        close();
                      }}
                      trigger={
                        <Button
                          type="button"
                          variant="secondary"
                          size="icon"
                          className="size-8"
                        >
                          <Eraser />
                        </Button>
                      }
                    />
                  </TableCell>
                </TableRow>
              ),
            )}
            {fields.length === 0 && (
              <TableRow>
                <TableCell colSpan={4}>
                  <span className="text-muted-foreground">
                    No materials added yet
                  </span>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <CustomDialog
          dialogTitle="Add New Material"
          dialogDescription="Here you can specify your desired materials."
          submitText="Add"
          submit={add}
          trigger={
            <Button type="button" variant="outline" className="w-full">
              <Plus />
            </Button>
          }
        >
          <MaterialForm />
        </CustomDialog>

        {formState.errors.materials && (
          <HelperText className="text-red-500">
            {formState.errors.materials.message}
          </HelperText>
        )}
      </div>
    </StepperContentCard>
  );
};

const MaterialForm = () => {
  return (
    <>
      <ControlledCustomSelect<StructureProjectRequest>
        name="buildingElementTemp"
        label="Building element"
        options={[
          { value: "floor", children: "Floor" },
          { value: "roof", children: "Roof" },
        ]}
      />
      <ControlledTextField<StructureProjectRequest>
        name="quantityTemp"
        type="number"
        label="Quantity (m²)"
        saveAsNumber
      />
      <ControlledCustomSelect<StructureProjectRequest>
        name="materialTemp"
        label="Material"
        options={[
          { value: "concrete", children: "Concrete" },
          { value: "wood", children: "Wood" },
          { value: "plaster", children: "Plaster" },
        ]}
      />
    </>
  );
};

interface CustomDialogSubmitParams {
  close: () => void;
}
interface CustomDialogProps extends ComponentProps<typeof Dialog> {
  trigger: ReactNode;
  dialogTitle: ReactNode;
  dialogDescription?: ReactNode;
  submitText?: string;
  submit?: (props: CustomDialogSubmitParams) => void;
  onOpen?: () => void;
}

export const CustomDialog: FC<CustomDialogProps> = ({
  trigger,
  dialogTitle,
  dialogDescription,
  submitText = "Submit",
  submit,
  onOpen,
  children,
  ...dialogProps
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const close = useCallback(() => setIsOpen(false), [setIsOpen]);

  useEffect(() => {
    if (isOpen === true) onOpen?.();
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} {...dialogProps}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          {dialogDescription && (
            <DialogDescription>{dialogDescription}</DialogDescription>
          )}
        </DialogHeader>

        {children}

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          {submit && (
            <Button type="button" onClick={() => submit({ close })}>
              {submitText}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface StepperContentCardProps extends ComponentProps<typeof Card> {
  fieldNames: Path<StructureProjectRequest>[];
  cardTitle?: ReactNode;
  cardDescription?: ReactNode;
}

const StepperContentCard: FC<StepperContentCardProps> = ({
  fieldNames,
  cardTitle,
  cardDescription,
  className,
  children,
  ...otherProps
}) => {
  const { next, prev, canGoNext, canGoPrev, isTheLastStep } =
    useContext(StepperContext);
  const { trigger } = useFormContext<StructureProjectRequest>();

  return (
    <Card className="mx-6 mt-4">
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription className="md:w-full lg:w-1/2 xl:w-1/3">
          {cardDescription}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            "mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
            className,
          )}
          {...otherProps}
        >
          {children}
        </div>
        <CardAction className="flex items-center gap-3">
          {canGoPrev && (
            <Button type="button" onClick={prev} variant="secondary">
              Prev
            </Button>
          )}
          <Button
            {...(canGoNext
              ? {
                  type: "button",
                  onClick: () =>
                    trigger(fieldNames).then((isValid) => {
                      if (isValid) next();
                    }),
                }
              : {
                  type: "submit",
                  onClick: next,
                })}
          >
            {isTheLastStep ? "Submit" : "Next"}
          </Button>
        </CardAction>
      </CardContent>
    </Card>
  );
};
