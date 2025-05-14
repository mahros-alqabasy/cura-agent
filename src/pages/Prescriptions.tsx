import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import PageLayout from "@/components/PageLayout";
import { PillIcon, Plus } from "lucide-react";

const prescriptionSchema = z.object({
  id: z.string().optional(),
  patientName: z.string().min(1, "Patient name is required"),
  medication: z.string().min(1, "Medication is required"),
  dosage: z.string().min(1, "Dosage is required"),
  instructions: z.string().optional(),
});

type PrescriptionType = z.infer<typeof prescriptionSchema>;

const initialPrescriptions: PrescriptionType[] = [
  {
    id: "1",
    patientName: "John Doe",
    medication: "Paracetamol",
    dosage: "500mg",
    instructions: "Take one tablet every 6 hours.",
  },
  {
    id: "2",
    patientName: "Jane Smith",
    medication: "Ibuprofen",
    dosage: "200mg",
    instructions: "Take one tablet every 8 hours after meals.",
  },
];

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState<PrescriptionType[]>(initialPrescriptions);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const form = useForm<PrescriptionType>({
    resolver: zodResolver(prescriptionSchema),
    defaultValues: {
      patientName: "",
      medication: "",
      dosage: "",
      instructions: "",
    },
  });

  const handleCreatePrescription = () => {
    form.reset({
      patientName: "",
      medication: "",
      dosage: "",
      instructions: "",
    });
    setIsFormOpen(true);
  };

  const onSubmit = (data: PrescriptionType) => {
    const newPrescription = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
    };
    setPrescriptions([...prescriptions, newPrescription]);
    toast({
      title: "Success",
      description: "Prescription created successfully",
      variant: "default",
    });
    setIsFormOpen(false);
  };

  return (
    <PageLayout
      title="Prescriptions"
      actionButton={{
        label: "New Prescription",
        onClick: handleCreatePrescription,
        icon: <Plus className="h-4 w-4" />,
      }}
    >
      <div className="bg-white rounded-md border p-6">
        {prescriptions.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center text-gray-500">
              <PillIcon className="h-12 w-12 mb-4" />
              <p className="text-lg">No prescriptions available</p>
            </div>
          </div>
        ) : (
          <ul className="space-y-4">
            {prescriptions.map((prescription) => (
              <li key={prescription.id} className="border p-4 rounded-md">
                <h3 className="font-bold text-lg">{prescription.patientName}</h3>
                <p><strong>Medication:</strong> {prescription.medication}</p>
                <p><strong>Dosage:</strong> {prescription.dosage}</p>
                <p><strong>Instructions:</strong> {prescription.instructions || "No instructions provided"}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Create New Prescription</DialogTitle>
          </DialogHeader>
          <FormProvider {...form}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-4 py-4">
                  <FormField
                    control={form.control}
                    name="patientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Patient Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter patient name" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="medication"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medication</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter medication" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dosage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dosage</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter dosage" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="instructions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instructions</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter instructions" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
                </DialogFooter>
              </form>
            </Form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default Prescriptions;
