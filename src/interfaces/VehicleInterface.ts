import { z } from 'zod';

const VehicleSchema = z.object({
  model: z.string().min(3),
  year: z.number().gt(1900).lte(2022),
  color: z.string().min(3),
  status: z.boolean().optional(),
  buyValue: z.number().int(),
});

type Vehicle = z.infer<typeof VehicleSchema>;

export default Vehicle;
export { VehicleSchema };