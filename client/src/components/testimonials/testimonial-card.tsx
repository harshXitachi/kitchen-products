import { motion } from "framer-motion";
import { type Testimonial } from "@shared/schema";
import { StarRating } from "@/components/ui/star-rating";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  testimonial: Testimonial;
  delay?: number;
  className?: string;
}

const TestimonialCard = ({ testimonial, delay = 0, className }: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "bg-white p-8 rounded-lg custom-shadow",
        className
      )}
    >
      <div className="flex mb-4">
        <StarRating rating={testimonial.rating} />
      </div>
      <p className="text-neutral-dark italic mb-6">{testimonial.text}</p>
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <img 
            src={testimonial.imageUrl} 
            alt={testimonial.author} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-medium text-neutral-dark">{testimonial.author}</h4>
          <p className="text-sm text-neutral">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
