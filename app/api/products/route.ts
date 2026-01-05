import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle-client";
import { products as productsSchema } from "@/db/schema";

export async function GET(request: NextRequest) {
  try {
        

    // const insertedProducts = await db.insert(productsSchema).values(
    //   PRODUCTS.map(item => ({
    //     name: item.name,
    //     category: item.category,
    //     price: item.price
    //   }))
    // ).returning();

    // console.log(insertedProducts);

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