"use server";

import { TAGS } from "@/lib/constants";
import { addToCart } from "@/lib/shopify";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function addItem(
  prevState: unknown,
  selectedVariantId: string | undefined
) {
  let cartId = (await cookies()).get("cartId")?.value;

  if (!cartId || !selectedVariantId) {
    return "Error adding item to cart";
  }

  try {
    await addToCart(cartId, [
      { merchandiseId: selectedVariantId, quantity: 1 },
    ]);

    revalidateTag(TAGS.cart);
  } catch (error) {
    console.error(error);
    return "Error adding item to cart";
  }
}
