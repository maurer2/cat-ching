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
  // uniqueness - https://github.com/colinhacks/zod/discussions/2316
  .refine(
    (coins): boolean => {
      const values = coins.map(({ value }) => value);
      return new Set(values).size === values.length;
    },
    {
      message: 'Duplicate coin values detected',
    },
  )
  // no mixed units
  .refine(
    (coins): boolean => {
      const units = coins.map(({ size }) => size.unit);
      return new Set(units).size === 1;
    },
    {
      message: 'Size units must not be mixed',
    },
  );
