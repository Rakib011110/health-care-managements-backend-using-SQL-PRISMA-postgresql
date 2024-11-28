import { z } from "zod";

export const create = z.object({
  body: z.object({
    password: z.string({
      required_error: "Password is required",
    }),
    doctor: z.object({
      email: z.string({
        required_error: "Email is required",
      }),
      name: z.string({
        required_error: "Name is required",
      }),
      profilePhoto: z.string().optional(),
      contactNumber: z.string({
        required_error: "Contact Number is required",
      }),
      address: z.string().optional(),
      registrationNumber: z.string({
        required_error: "Registration Number is required",
      }),
      experience: z.number({
        required_error: "Experience is required",
      }),
      gender: z.enum(["MALE", "FEMALE", "OTHER"], {
        required_error: "Gender is required",
      }),
      appointmentFee: z.number({
        required_error: "Appointment Fee is required",
      }),
      qualification: z.string({
        required_error: "Qualification is required",
      }),
      currentWorkingPlace: z.string().optional(),
      designation: z.string().optional(),
    }),
  }),
});

const update = z.object({
  body: z.object({
    name: z.string().optional(),
    profilePhoto: z.string().optional(),
    contactNumber: z.string().optional(),
    registrationNumber: z.string().optional(),
    experience: z.number().optional(),
    gender: z.string().optional(),
    apointmentFee: z.number().optional(),
    qualification: z.string().optional(),
    currentWorkingPlace: z.string().optional(),
    designation: z.string().optional(),
  }),
});

export const DoctorValidation = {
  create,
  update,
};
