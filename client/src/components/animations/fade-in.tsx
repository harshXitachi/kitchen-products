import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  once?: boolean;
}

const FadeIn = ({
  children,
  delay = 0,
  duration = 0.6,
  className,
  direction = "up",
  distance = 20,
  once = true,
}: FadeInProps) => {
  // Set initial animation properties based on direction
  const getInitialProps = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: distance };
      case "down":
        return { opacity: 0, y: -distance };
      case "left":
        return { opacity: 0, x: distance };
      case "right":
        return { opacity: 0, x: -distance };
      default:
        return { opacity: 0, y: distance };
    }
  };

  // Set animation props for the target state
  const getAnimateProps = () => {
    switch (direction) {
      case "up":
      case "down":
        return { opacity: 1, y: 0 };
      case "left":
      case "right":
        return { opacity: 1, x: 0 };
      default:
        return { opacity: 1, y: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialProps()}
      whileInView={getAnimateProps()}
      viewport={{ once }}
      transition={{ duration, delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
