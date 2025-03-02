"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import { ProductCardQuickAdd } from "./ProductCartQuickAdd";

export const ProductCardImageSlider = () => {
  const [swiperInstance, setSwiperInstance] = useState(null);

  const productImages = [
    "images/fuzzy-sweater-1.jpg",
    "images/fuzzy-sweater-2.jpg",
    "images/fuzzy-sweater-3.jpg",
  ];

  useEffect(() => {
    if (!swiperInstance) {
      const swiper = new Swiper(".swiper", {
        loop: true,
        slidesPerView: 1,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
      setSwiperInstance(swiper);
    }
  }, [swiperInstance]);

  return (
    <div className="group/image relative">
      <Image
        src="/images/cat-image-1.webp"
        alt="category image"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full group-hover/image:hidden"
      />

      <div className="swiper">
        <div className="swiper-wrapper">
          {productImages.map((item, index) => (
            <ProductSlides key={index} src={item} />
          ))}
        </div>

        <div className="swiper-pagination"></div>
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </div>

      <ProductCardQuickAdd />
    </div>
  );
};

const ProductSlides = ({ src }) => {
  return (
    <div className="swiper-slide">
      <figure className="hidden group-hover/image:block">
        <img
          src={src}
          alt="thumbnail"
          className="h-full w-full object-cover object-[top_center]"
        />
      </figure>
    </div>
  );
};
