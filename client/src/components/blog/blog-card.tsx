import { Link } from "wouter";
import { motion } from "framer-motion";
import { type BlogPost } from "@shared/schema";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface BlogCardProps {
  post: BlogPost;
  delay?: number;
  className?: string;
}

const BlogCard = ({ post, delay = 0, className }: BlogCardProps) => {
  // Format date
  const formattedDate = format(new Date(post.publishedAt), "MMMM d, yyyy");
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "bg-background rounded-lg overflow-hidden custom-shadow h-full flex flex-col",
        className
      )}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex mb-3 items-center">
          <span className="text-xs text-neutral-dark bg-neutral-light py-1 px-3 rounded-full">
            {post.category}
          </span>
          <span className="text-sm text-neutral ml-4">{formattedDate}</span>
        </div>
        <h3 className="font-playfair text-xl font-semibold text-neutral-dark mb-3">{post.title}</h3>
        <p className="text-neutral mb-5 line-clamp-3 flex-grow">{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`}>
          <a className="inline-block text-primary hover:text-primary-dark font-medium transition-colors mt-auto">
            Read More →
          </a>
        </Link>
      </div>
    </motion.article>
  );
};

export default BlogCard;
