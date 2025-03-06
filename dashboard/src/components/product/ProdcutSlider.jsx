import { useEffect, useRef, useState } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

export const ProductSlider = ({ productImages }) => {
  const swiperRef = useRef(null);

  // swiper instance
  useEffect(() => {
    if (!swiperRef.current) {
      // initialize swiper instance only once
      swiperRef.current = new Swiper(".swiper", {
        loop: productImages.length > 0,

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
    } else {
      // if wwiper is already initialized, update it
      swiperRef.current.update();
    }

    // removes swiper when unmounts
    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy(true, true);
        swiperRef.current = null;
      }
    };
  }, [productImages]);

  return (
    <div className="swiper">
      <div className="swiper-wrapper">
        {productImages.length > 0 ? (
          productImages.map((item, index) => (
            <ProductSlides key={index} src={item} />
          ))
        ) : (
          <ProductSlides src={"/images/satin-tank-top-1.webp"} />
        )}
      </div>

      <div className="swiper-pagination"></div>
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
    </div>
  );
};

const ProductSlides = ({ src }) => {
  const imageSrc = typeof src === "string" ? src : URL.createObjectURL(src);

  return (
    <div className="swiper-slide">
      <figure className="aspect-[0.9] overflow-hidden rounded">
        <img
          src={imageSrc}
          alt="thumbnail"
          className="h-full w-full object-cover object-[top_center]"
        />
      </figure>
    </div>
  );
};
