"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import MainWebsiteHeader from "@/app/Components/mainWebsiteHeader";
import MainWebsiteFooter from "@/app/Components/mainWebsiteFooter";
import type { PrintifyProduct, PrintifyVariant } from "@/app/utils/printifyService";
import { useCart } from "@/app/Components/CartContext";

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

// ─── Swatch helper ────────────────────────────────────────────────────────────

// ─── Main component ───────────────────────────────────────────────────────────

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [product, setProduct] = useState<PrintifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});
  const [quantity, setQuantity] = useState(1);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  // Load product
  useEffect(() => {
    fetch(`/api/printify/products/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setProduct(data as PrintifyProduct);
        // Default to first enabled (merchant-configured) variant
        const firstEnabled = (data as PrintifyProduct).variants.find(
          (v: PrintifyVariant) => v.is_enabled
        );
        if (firstEnabled) {
          const opts: Record<string, number> = {};
          // variant.options is an unordered set of value IDs — map each back to its option
          firstEnabled.options.forEach((valueId: number) => {
            (data as PrintifyProduct).options.forEach((opt) => {
              if (opt.values.some((v) => v.id === valueId)) {
                opts[opt.name] = valueId;
              }
            });
          });
          setSelectedOptions(opts);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#F3F8FF" }}>
        <MainWebsiteHeader />
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-pulse">
            <div className="aspect-square bg-gray-200 rounded-2xl" />
            <div className="space-y-4 pt-4">
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="h-6 bg-gray-200 rounded w-1/3" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>
          </div>
        </div>
        <MainWebsiteFooter />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#F3F8FF" }}>
        <MainWebsiteHeader />
        <div className="max-w-6xl mx-auto px-4 py-24 text-center">
          <h1 className="font-kantumruy font-bold text-[#234285] text-3xl mb-4">Product not found</h1>
          <p className="font-kantumruy text-gray-600 mb-8">{error}</p>
          <Link href="/merch" className="bg-[#234285] text-white font-kantumruy font-bold px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors">
            Back to Merch
          </Link>
        </div>
        <MainWebsiteFooter />
      </div>
    );
  }

  // ─── Variant resolution ─────────────────────────────────────────────────────

  // Printify returns ALL blueprint variants (can be 400-1000+).
  // Only is_enabled=true variants are the ones the merchant actually configured.
  const enabledVariants = product.variants.filter((v) => v.is_enabled);

  // Build a lookup: value ID → option name (variant.options is an unordered set of IDs,
  // NOT indexed to match product.options array order)
  const valueIdToOptionName = new Map<number, string>();
  product.options.forEach((opt) => {
    opt.values.forEach((val) => valueIdToOptionName.set(val.id, opt.name));
  });

  // Find the variant that has ALL currently selected option value IDs
  function findSelectedVariant(): PrintifyVariant | undefined {
    const selectedIds = Object.values(selectedOptions);
    if (selectedIds.length < product!.options.length) return undefined;
    return enabledVariants.find((v) =>
      selectedIds.every((id) => v.options.includes(id))
    );
  }

  const selectedVariant = findSelectedVariant();

  // Get available option values for one option given other current selections
  function getAvailableOptionValues(optionName: string): Set<number> {
    const available = new Set<number>();
    const thisOptionValueIds = new Set(
      product!.options.find((o) => o.name === optionName)?.values.map((v) => v.id) ?? []
    );
    for (const variant of enabledVariants) {
      // Check all OTHER selected options are present in this variant
      const otherMatch = Object.entries(selectedOptions).every(([name, id]) => {
        if (name === optionName) return true;
        return variant.options.includes(id);
      });
      if (otherMatch) {
        // Add whichever value ID this variant has for this option
        for (const id of variant.options) {
          if (thisOptionValueIds.has(id)) available.add(id);
        }
      }
    }
    return available;
  }

  function handleOptionChange(optionName: string, valueId: number) {
    setSelectedOptions((prev) => ({ ...prev, [optionName]: valueId }));
    setActiveImageIdx(0);
  }

  // ─── Images ─────────────────────────────────────────────────────────────────

  // Filter images that apply to selected variant, or fall back to all
  const variantImages = selectedVariant
    ? product.images.filter((img) => img.variant_ids.includes(selectedVariant.id))
    : product.images;

  const displayImages = variantImages.length > 0 ? variantImages : product.images;
  const activeImage = displayImages[activeImageIdx] ?? displayImages[0];

  // ─── Add to cart ─────────────────────────────────────────────────────────────

  function handleAddToCart() {
    if (!selectedVariant) return;

    const defaultImg = product!.images.find((i) => i.is_default) ?? product!.images[0];

    addToCart({
      product_id: product!.id,
      variant_id: selectedVariant.id,
      quantity,
      price: selectedVariant.price,
      title: product!.title,
      variant_title: selectedVariant.title,
      image_src: activeImage?.src ?? defaultImg?.src ?? "",
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F3F8FF" }}>
      <MainWebsiteHeader />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 font-kantumruy text-sm text-gray-500">
          <Link href="/merch" className="hover:text-[#234285] transition-colors">Merch</Link>
          <span>›</span>
          <span className="text-[#234285] font-bold truncate max-w-xs">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ── Images ── */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
              {activeImage && (
                <Image
                  src={activeImage.src}
                  alt={`${product.title} - ${activeImage.position}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  unoptimized
                />
              )}
              <div className="absolute top-4 left-4">
                <span className="bg-[#234285] text-white text-xs font-kantumruy font-bold px-3 py-1 rounded-full">
                  QCSA
                </span>
              </div>
            </div>

            {/* Thumbnail row */}
            {displayImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {displayImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${idx === activeImageIdx ? "border-[#234285] shadow-md" : "border-transparent hover:border-gray-300"}`}
                  >
                    <Image src={img.src} alt="" fill className="object-cover" unoptimized />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Details ── */}
          <div className="flex flex-col">
            <h1 className="font-kantumruy font-bold text-[#234285] text-3xl lg:text-4xl leading-tight mb-4">
              {product.title}
            </h1>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-kantumruy font-bold text-3xl text-[#234285]">
                {selectedVariant ? formatPrice(selectedVariant.price) : "—"}
              </span>
              {selectedVariant && (
                <span className="font-kantumruy text-gray-500 text-sm">per item</span>
              )}
            </div>

            {/* Options */}
            {product.options.map((option) => {
              const available = getAvailableOptionValues(option.name);
              const isColor = option.type === "color";
              const availableValues = option.values.filter((val) => available.has(val.id));

              return (
                <div key={option.name} className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-kantumruy font-bold text-gray-700">{option.name}:</span>
                    <span className="font-kantumruy text-[#234285] font-bold">
                      {option.values.find((v) => v.id === selectedOptions[option.name])?.title ?? "—"}
                    </span>
                  </div>

                  {isColor ? (
                    availableValues.length === 1 ? (
                      // Single color — show as a non-interactive indicator
                      <div className="flex items-center gap-2">
                        <div
                          className="w-9 h-9 rounded-full border-2 border-[#234285] shadow-md"
                          style={{ backgroundColor: availableValues[0].colors?.[0] ?? "#888" }}
                          title={availableValues[0].title}
                        />
                        <span className="font-kantumruy text-sm text-gray-500">{availableValues[0].title}</span>
                      </div>
                    ) : (
                      // Multiple colors — show picker
                      <div className="flex flex-wrap gap-2">
                        {availableValues.map((val) => {
                          const isSelected = selectedOptions[option.name] === val.id;
                          const hexColor = val.colors?.[0] ?? "#888";
                          return (
                            <div key={val.id} className="relative group">
                              <button
                                onClick={() => handleOptionChange(option.name, val.id)}
                                className={`w-9 h-9 rounded-full border-2 transition-all ${isSelected ? "border-[#234285] scale-110 shadow-md" : "border-transparent hover:border-gray-300"}`}
                                style={{ backgroundColor: hexColor }}
                                title={val.title}
                              />
                              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                {val.title}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {availableValues.map((val) => {
                        const isSelected = selectedOptions[option.name] === val.id;
                        return (
                          <button
                            key={val.id}
                            onClick={() => handleOptionChange(option.name, val.id)}
                            className={`px-4 py-2 rounded-lg border-2 font-kantumruy text-sm font-bold transition-all ${
                              isSelected
                                ? "border-[#234285] bg-[#234285] text-white"
                                : "border-gray-200 text-gray-700 hover:border-[#234285] hover:text-[#234285]"
                            }`}
                          >
                            {val.title}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Quantity */}
            <div className="mb-6">
              <span className="font-kantumruy font-bold text-gray-700 block mb-3">Quantity:</span>
              <div className="inline-flex items-center gap-0 border-2 border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-3 font-bold text-gray-600 hover:bg-gray-50 transition-colors text-xl"
                >
                  −
                </button>
                <span className="px-6 py-3 font-kantumruy font-bold text-[#234285] text-lg w-16 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 py-3 font-bold text-gray-600 hover:bg-gray-50 transition-colors text-xl"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedVariant || addedToCart}
              className={`w-full py-4 rounded-xl font-kantumruy font-bold text-lg transition-all mb-4 ${
                addedToCart
                  ? "bg-green-500 text-white scale-[0.98]"
                  : selectedVariant
                  ? "bg-[#234285] text-white hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {addedToCart ? "✓ Added to Cart!" : selectedVariant ? "Add to Cart" : "Select Options"}
            </button>

            {/* Unavailable message */}
            {!selectedVariant && product.variants.length > 0 && (
              <p className="text-center text-sm font-kantumruy text-red-500 mb-4">
                This combination is out of stock. Please select a different option.
              </p>
            )}

            {/* Description */}
            {product.description && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="font-kantumruy font-bold text-[#234285] text-lg mb-3">About this product</h3>
                <div
                  className="font-kantumruy text-gray-600 text-sm leading-relaxed prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            )}

            {/* Trust badges */}
          </div>
        </div>
      </main>

      <MainWebsiteFooter />
    </div>
  );
}
