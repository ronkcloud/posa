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

export const newProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().positive(),
  category: z.string(),
  description: z.string().nullable().optional()
})

export const productSchema = newProductSchema.extend({
  id: z.number(),
})

export type NewProduct = z.infer<typeof newProductSchema>;
export type Product = z.infer<typeof productSchema>;

export const EMPTY_PRODUCT = {
  name: "",
  price: 0,
  category: "",
  description: ""
}