import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle-client";
import { orders } from "@/db/schema"
import { transactionSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = transactionSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "Invalid transaction data", details: result.error.format() },
        { status: 400 }
      );
    }

    const orderItems = result.data.orderItems;
    const totalAmount = orderItems.reduce((sum, item) => sum + item.totalPrice, 0);

    const [newOrder] = await db.insert(orders).values({
      totalAmount,
      paymentMethod: result.data.paymentMethod,
      orderDetails: orderItems,
    }).returning();

    return NextResponse.json({ success: true, orderId: newOrder.id });
  } catch (error) {
    console.error("Error writing transaction:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save transaction" },
      { status: 500 }
    );
  }
}