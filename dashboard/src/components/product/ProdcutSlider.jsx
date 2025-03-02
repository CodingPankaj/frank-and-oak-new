import { useEffect, useState } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

export const ProductSlider = () => {
  const productImages = [
    "/images/satin-tank-top-1.webp",
    "/images/satin-tank-top-2.webp",
    "/images/satin-tank-top-3.webp",
    "/images/satin-tank-top-4.webp",
    "/images/satin-tank-top-5.webp",
  ];

  const [swiperInstance, setSwiperInstance] = useState(null);

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
  );
};

const ProductSlides = ({ src }) => {
  return (
    <div className="swiper-slide">
      <figure className="aspect-[0.9] overflow-hidden rounded">
        <img
          src={src}
          alt="thumbnail"
          className="h-full w-full object-cover object-[top_center]"
        />
      </figure>
    </div>
  );
};
