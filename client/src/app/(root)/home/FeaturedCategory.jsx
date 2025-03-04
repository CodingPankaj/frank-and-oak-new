"use client";
import { MainContainer } from "@/app/components/MainContainer";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export const FeaturedCategoy = () => {
  const [categorydata, setcategorydata] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/admin/subcategory/view",
        { withCredentials: true }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <section>
      <MainContainer className="py-10 lg:py-16">
        <h3 className="mb-8 text-[22px] lg:mb-16 lg:text-[32px]">
          Featured Categories
        </h3>
        <div className="grid grid-cols-2 gap-[10px] md:grid-cols-4 lg:gap-5">
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
        </div>
      </MainContainer>
    </section>
  );
};

const CategoryCard = () => {
  return (
    <div>
      <figure>
        <Image
          src="/images/cat-image-1.webp"
          alt="category image"
          className="w-full"
          width={0}
          height={0}
          sizes="100vw"
          // style={{ width: "100%", height: "auto" }}
        />
        {/* <img
          src="images/cat-image-1.webp"
          alt="category image"
          className="w-full"
        /> */}
      </figure>
      <h4 className="mt-2 text-sm text-black lg:text-base">
        Knitwear for Women
      </h4>
    </div>
  );
};
