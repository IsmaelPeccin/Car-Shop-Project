import { z } from 'zod';
import { VehicleSchema } from './VehicleInterface';

const CarSchema = z.object({
  doorsQty: z.number({
    required_error: 'Doors quantity is required',
  }).gte(2, { message: 'DoorsQty must be greater or equal 2' })
    .lte(4, { message: 'DoorsQty must be less or equal 4' }),

  seatsQty: z.number({
    required_error: 'Seats quantity is required',
  }).gte(2, { message: 'Seats quantity must be greater or equal 2' })
    .lte(7, { message: 'Seats quantity must be less or equal 7' }),
});

type Car = z.infer<typeof VehicleSchema & typeof CarSchema>;

export { CarSchema, Car };
