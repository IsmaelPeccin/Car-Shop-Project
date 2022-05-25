import { z } from 'zod';

const VehicleSchema = z.object({
  model: z.string({
    required_error: 'Model is required', 
  }).min(3, { message: 'Model must be at least 3 characters' }),

  year: z.number({
    required_error: 'Year is required',
  }).gt(1900).lte(2022),
  
  color: z.string({
    required_error: 'Color is required',
  }).min(3, { message: 'Color must be at least 3 characters' }),

  status: z.boolean().optional(),

  buyValue: z.number({
    required_error: 'Buy value is required',
  }).int(),
});

type Vehicle = z.infer<typeof VehicleSchema>;

export { VehicleSchema, Vehicle };