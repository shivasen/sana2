import { z } from 'zod';

export const bookingFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  treatment: z.string({ required_error: "Please select a treatment."}).min(1, { message: 'Please select a treatment.' }),
  message: z.string().optional(),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;
