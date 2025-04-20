import React from "react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number; // rating out of 50 (0-50)
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  size = "md", 
  className 
}) => {
  // Convert rating from 0-50 scale to 0-5 scale
  const normalizedRating = rating / 10;
  
  const stars = [];
  
  // Calculate full stars, half stars, and empty stars
  const fullStars = Math.floor(normalizedRating);
  const hasHalfStar = normalizedRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  // Size mappings
  const sizeMap = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };
  
  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<i key={`full-${i}`} className="ri-star-fill text-yellow-400"></i>);
  }
  
  // Add half star if needed
  if (hasHalfStar) {
    stars.push(<i key="half" className="ri-star-half-fill text-yellow-400"></i>);
  }
  
  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<i key={`empty-${i}`} className="ri-star-line text-yellow-400"></i>);
  }
  
  return (
    <div className={cn("flex", sizeMap[size], className)}>
      {stars}
    </div>
  );
};
