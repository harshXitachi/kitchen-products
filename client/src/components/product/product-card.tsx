import { useState } from "react";
import { motion } from "framer-motion";
import { StarRating } from "@/components/ui/star-rating";
import { type Product } from "@shared/schema";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  delay?: number;
  className?: string;
}

const ProductCard = ({ product, delay = 0, className }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Format price from cents to dollars with 2 decimal places
  const formattedPrice = (product.price / 100).toFixed(2);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "product-card group bg-white rounded-lg overflow-hidden custom-shadow",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden h-64 relative">
        <motion.img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <i className="ri-heart-line text-primary hover:text-primary-dark transition-colors cursor-pointer"></i>
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-playfair text-lg font-semibold text-neutral-dark">{product.name}</h3>
          <span className="font-bold text-primary">${formattedPrice}</span>
        </div>
        <p className="text-neutral text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <StarRating rating={product.rating} />
          <button className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">View Details</button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
