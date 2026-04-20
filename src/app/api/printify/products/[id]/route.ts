import { NextResponse } from "next/server";
import { getProduct } from "@/app/utils/printifyService";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await getProduct(id);
    return NextResponse.json(product);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch product";
    console.error("Printify product error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
