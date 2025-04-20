import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { BLOG_CATEGORIES } from "@/lib/constants";
import BlogCard from "@/components/blog/blog-card";
import FadeIn from "@/components/animations/fade-in";
import { Skeleton } from "@/components/ui/skeleton";
import { type BlogPost } from "@shared/schema";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  // Fetch blog posts
  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });
  
  // Filter posts by category
  const filteredPosts = selectedCategory === "All"
    ? blogPosts
    : blogPosts?.filter(post => post.category === selectedCategory);
  
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
            Culinary Blog
          </h1>
        </FadeIn>
        
        <FadeIn delay={0.1}>
          <p className="text-neutral max-w-2xl mx-auto text-center mb-12">
            Tips, tutorials, and insights to help you make the most of your kitchen and cooking skills.
          </p>
        </FadeIn>
        
        {/* Category Filters */}
        <FadeIn delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {BLOG_CATEGORIES.map((category, index) => (
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
        
        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeletons
            Array(6).fill(0).map((_, index) => (
              <div key={index} className="bg-background rounded-lg overflow-hidden custom-shadow">
                <Skeleton className="h-48 w-full" />
                <div className="p-6">
                  <div className="flex mb-3 items-center">
                    <Skeleton className="h-4 w-24 rounded-full" />
                    <Skeleton className="h-4 w-24 ml-4" />
                  </div>
                  <Skeleton className="h-6 w-full mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-5" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            ))
          ) : (
            filteredPosts?.map((post, index) => (
              <BlogCard 
                key={post.id}
                post={post}
                delay={0.1 * (index % 3)} // stagger animation by row
              />
            ))
          )}
        </div>
        
        {/* Empty State */}
        {filteredPosts?.length === 0 && (
          <div className="text-center py-16">
            <FadeIn>
              <p className="text-neutral-dark text-lg mb-2">No articles found in this category.</p>
              <p className="text-neutral">Try selecting a different category or check back later.</p>
            </FadeIn>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Blog;
