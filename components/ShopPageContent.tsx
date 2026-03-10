"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { allProducts, categories } from "@/data/products";

export default function ShopPageContent() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products... e.g. Arduino, IC, Multimeter"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-2xl border border-gray-300 px-5 py-4 text-gray-900 outline-none transition focus:border-blue-600"
        />
      </div>

      <div className="mb-8 rounded-2xl border border-gray-200 bg-gray-50 p-5">
        <p className="text-sm text-gray-600">
          Total Products:{" "}
          <span className="font-semibold text-gray-900">
            {filteredProducts.length}
          </span>
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-xl px-5 py-2 font-semibold transition ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "border border-gray-300 bg-white text-gray-800 hover:bg-gray-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              category={product.category}
              price={product.price}
              stock={product.stock}
              image={product.image}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
          <h2 className="text-2xl font-bold">No products found</h2>
          <p className="mt-3 text-gray-600">
            Try changing the category or search keyword.
          </p>
        </div>
      )}
    </>
  );
}