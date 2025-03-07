"use client";
import { MainContainer } from "@/app/components/MainContainer";
import axios from "axios";
import { useEffect, useState } from "react";
import { ProductCard } from "@/app/components/product/ProductCard";

export const ProductSlider = () => {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/web/products", {
        withCredentials: true,
      });
      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <section>
      <MainContainer className="py-10 lg:py-16">
        <h3 className="mb-8 text-[22px] lg:mb-16 lg:text-[32px]">
          Featured Categories
        </h3>
        <div className="grid grid-cols-2 gap-[10px] md:grid-cols-4 lg:gap-5">
          {products &&
            products.length > 0 &&
            products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </MainContainer>
    </section>
  );
};
