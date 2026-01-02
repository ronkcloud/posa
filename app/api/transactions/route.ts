import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log(body);

    // const { productName, quantity, unitPrice, paymentSource } = body;

    // if (!productName || !quantity || !unitPrice) {
    //   return NextResponse.json(
    //     { success: false, error: "Missing required fields" },
    //     { status: 400 }
    //   );
    // }

    // const transaction = {
    //   id: generateId(),
    //   productName,
    //   quantity: parseInt(quantity, 10),
    //   unitPrice: parseInt(unitPrice, 10),
    //   totalPrice: parseInt(quantity, 10) * parseInt(unitPrice, 10),
    //   paymentSource: paymentSource || "QRIS",
    //   timestamp: new Date().toISOString(),
    // };

    // writeTransaction(transaction);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error writing transaction:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save transaction" },
      { status: 500 }
    );
  }
}