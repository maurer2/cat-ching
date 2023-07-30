import { z } from 'zod';

export const coinSchema = z
  .object({
    name: z.string().min(1),
    value: z.number().int().positive(),
    image: z.string().min(5).endsWith('.png').or(z.string().min(5).endsWith('.jpg')),
    size: z
      .object({
        width: z.number().positive(),
        height: z.number().positive(),
        unit: z.union([z.literal('mm'), z.literal('cm')]),
      })
      .strict(),
  })
  .strict();

export const coinListSchema = z
  .array(coinSchema)
  // uniqueness
  // https://github.com/colinhacks/zod/discussions/2316
  .refine(
    (coins): boolean => {
      const values = coins.map(({ value }) => value);
      return new Set(values).size === values.length;
    },
    {
      message: 'Duplicate coin values detected',
    },
  );
