import React from "react";
import { ProductData } from "../../types";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { MdStar } from "react-icons/md";
import FormattedPrice from "./FormattedPrice";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ item }: { item: ProductData }) => {
  return (
    <div
      key={item?._id}
      className="border border-lightText/40 rounded-md relative group overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl bg-white"
    >
      <div className="overflow-hidden">
        <Link href={`/product/${item?.slug?.current}`}>
          <Image
            src={urlFor(item?.image)?.url()}
            alt={item?._type}
            width={500}
            height={500}
            className="w-full h-72 object-cover group-hover:scale-105 hoverEffect"
          />
        </Link>
      </div>
      <div className="px-6 py-2 flex flex-col items-center gap-2">
        {/* Ratings Section */}
        <div className="text-xl text-lightText flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => {
            const filled = index + 1 <= Math.floor(item?.ratings || 0);
            const halfFilled =
              index + 1 > Math.floor(item?.ratings || 0) &&
              index < Math.ceil(item?.ratings || 0);

            return (
              <MdStar
                key={index}
                className={`${
                  filled
                    ? "text-[#fa8900]"
                    : halfFilled
                      ? "text-[#f7ca00]"
                      : "text-lightText"
                }`}
              />
            );
          })}
        </div>

        {/* Brand */}
        <p className="uppercase text-sm font-medium text-lightOrange">
          {item?.brand}
        </p>

        {/* Product Title */}
        <h2 className="text-lg font-semibold text-accent line-clamp-1">
          {item?.title}
        </h2>

        {/* Product Description */}
        <p className="text-center text-sm line-clamp-2 text-lightText">
          {item?.description}
        </p>

        {/* Pricing */}
        <div className="flex items-center gap-3 mb-5">
          <p className="text-lightText line-through">
            <FormattedPrice amount={item?.rowprice} />
          </p>
          <p className="text-darkOrange font-bold">
            <FormattedPrice amount={item?.price} />
          </p>
        </div>
      </div>
      {/* Add to Cart Button */}
      <div className="px-6 pb-4 ">
        <AddToCartButton item={item} />
      </div>
    </div>
  );
};

export default ProductCard;
