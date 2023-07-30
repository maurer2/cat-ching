import { z } from 'zod';

export const coinSchema = z.object({
  name: z.string().min(1),
  value: z.number().int().positive(),
  image: z.string().min(5).endsWith('.png')
    .or(z.string().min(5).endsWith('.jpg')),
  size: z.object({
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    unit: z.union([
      z.literal('mm'),
      z.literal('cm'),
    ]),
  })
    .strict(),
})
  .strict();

export const coinListSchema = z.array(coinSchema);
