import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle-client";
import { products as productsSchema } from "@/db/schema";
import { newProductSchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  try {

    const products = await db.query.products.findMany();
    const categories = [...new Set(products.map(item => item.category))];

    const data = {
      products,
      categories
    };
    
    return NextResponse.json({ success: true, data: data });
  } catch (error) {
    console.error("Error reading product info:", error);
    return NextResponse.json(
      { success: false, error: "Failed to read product info" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const bodyParsed = newProductSchema.safeParse(body);

    if (!bodyParsed.success) {
      console.log(bodyParsed);
        return NextResponse.json(
            { success: false, error: "Invalid product data", details: bodyParsed.error.format()},
            { status: 400}
        )
    }

    const productData = bodyParsed.data;

    const insertedProduct = await db.insert(productsSchema).values({
      name: productData.name,
      category: productData.category,
      price: productData.price,
      description: productData.description,
      stock: 0,
    }).returning();

    return NextResponse.json({ success: true, data: insertedProduct[0] });
  } catch (error) {
    console.error("Error adding new product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add product" },
      { status: 500 }
    );
  }
}