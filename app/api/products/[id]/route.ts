import { NextRequest, NextResponse } from "next/server";
import { productSchema } from "@/lib/validations";
import { db } from "@/db/drizzle-client";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(request: NextRequest) {
  try {
        
    const body = await request.json();
    const bodyParsed = productSchema.safeParse(body);

    if (!bodyParsed.success) {
        return NextResponse.json(
            { success: false, error: "Invalid product data", details: bodyParsed.error.format()},
            { status: 400}
        )
    }

    const productData = bodyParsed.data;
    const editedProduct = await db.update(products)
        .set({
            name: productData.name,
            price: productData.price,
            category: productData.category,
            description: productData.description
        })
        .where(eq(products.id, productData.id))
        .returning();
    
    return NextResponse.json({ success: true, data: editedProduct[0] });
  } catch (error) {
    console.error("Error adding new product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add product" },
      { status: 500 }
    );
  }
}