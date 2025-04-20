import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import ProductCard from "@/components/product/product-card";
import FadeIn from "@/components/animations/fade-in";
import { Skeleton } from "@/components/ui/skeleton";
import { type Product } from "@shared/schema";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  // Fetch products
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });
  
  // Filter products by category
  const filteredProducts = selectedCategory === "All"
    ? products
    : products?.filter(product => product.category === selectedCategory);
  
  const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.5 }
  };
  
  return (
    <motion.div 
      {...pageTransition}
      className="min-h-screen py-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h1 className="font-playfair text-4xl font-bold text-neutral-dark mb-6 text-center">
            Kitchen Products
          </h1>
        </FadeIn>
        
        <FadeIn delay={0.1}>
          <p className="text-neutral max-w-2xl mx-auto text-center mb-12">
            Explore our curated collection of high-quality kitchen products, designed to enhance your cooking experience.
          </p>
        </FadeIn>
        
        {/* Category Filters */}
        <FadeIn delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {PRODUCT_CATEGORIES.map((category, index) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-white text-neutral-dark hover:bg-background'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </FadeIn>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading ? (
            // Loading skeletons
            Array(8).fill(0).map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden custom-shadow">
                <Skeleton className="h-64 w-full" />
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            filteredProducts?.map((product, index) => (
              <ProductCard 
                key={product.id}
                product={product}
                delay={0.05 * (index % 4)} // stagger animation by row
              />
            ))
          )}
        </div>
        
        {/* Empty State */}
        {filteredProducts?.length === 0 && (
          <div className="text-center py-16">
            <FadeIn>
              <p className="text-neutral-dark text-lg mb-2">No products found in this category.</p>
              <p className="text-neutral">Try selecting a different category or check back later.</p>
            </FadeIn>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Products;
