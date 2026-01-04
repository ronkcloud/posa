import { NextRequest, NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/products";

export async function GET(request: NextRequest) {
  try {
    const products = PRODUCTS
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error("Error reading product info:", error);
    return NextResponse.json(
      { success: false, error: "Failed to read product info" },
      { status: 500 }
    );
  }
}