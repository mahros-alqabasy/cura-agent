
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";

// Define the schema for user form validation
const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  nationalId: z.string().min(1, "National ID is required"),
  email: z.string().email("Invalid email format"),
  mobile: z.string().min(1, "Mobile number is required"),
  specialty: z.string().optional(),
});

type UserFormValues = z.infer<typeof userSchema>;

interface UserFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (userData: any) => void;
  editData?: any;
  userType: "doctor" | "patient" | "nurse" | "receptionist";
}

const UserForm = ({ open, onOpenChange, onSubmit, editData, userType }: UserFormProps) => {
  // Initialize form with React Hook Form
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: editData?.firstName || "",
      lastName: editData?.lastName || "",
      nationalId: editData?.nationalId || "",
      email: editData?.email || "",
      mobile: editData?.mobile || "",
      specialty: editData?.specialty || (userType === "doctor" ? "general" : undefined),
    },
  });

  const handleSubmit = (values: UserFormValues) => {
    onSubmit({ ...values, role: userType });
    onOpenChange(false);
    toast.success(`${editData ? 'Updated' : 'Created'} ${userType} successfully`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {editData ? `Edit ${userType}` : `Create new ${userType}`}
          </DialogTitle>
          <DialogDescription>
            {editData
              ? `Update the ${userType}'s information below.`
              : `Enter the ${userType}'s details below. A password will be sent to their email.`}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="nationalId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>National ID</FormLabel>
                  <FormControl>
                    <Input placeholder="National ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+20 10-15-888-272" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {userType === "doctor" && (
              <FormField
                control={form.control}
                name="specialty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialty</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value || "general"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select specialty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="general">General Medicine</SelectItem>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="neurology">Neurology</SelectItem>
                        <SelectItem value="pediatrics">Pediatrics</SelectItem>
                        <SelectItem value="dermatology">Dermatology</SelectItem>
                        <SelectItem value="orthopedics">Orthopedics</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editData ? "Update" : "Create"} {userType}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UserForm;
