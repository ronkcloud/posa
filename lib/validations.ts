import { z } from "zod";

export const orderItemSchema = z.object({
  productId: z.string(),
  productName: z.string(),
  quantity: z.number(),
  unitPrice: z.number(),
  totalPrice: z.number(),
});

export const transactionSchema = z.object({
  paymentMethod: z.string(),
  orderItems: z.array(orderItemSchema)
})

export type OrderItem = z.infer<typeof orderItemSchema>;