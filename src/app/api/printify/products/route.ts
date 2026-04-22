import { NextResponse } from "next/server";
import { getProducts } from "@/app/utils/printifyService";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const limit = Math.min(parseInt(searchParams.get("limit") ?? "50", 10), 50);

    const products = await getProducts(page, limit);
    return NextResponse.json(products);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch products";
    console.error("Printify products error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
