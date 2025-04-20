import { useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import FadeIn from "@/components/animations/fade-in";
import { type BlogPost } from "@shared/schema";

const BlogPostPage = () => {
  const [match, params] = useRoute("/blog/:slug");
  const [, navigate] = useLocation();
  
  // Fetch blog post by slug
  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: [`/api/blog/${params?.slug}`],
    enabled: !!params?.slug,
  });
  
  // Redirect to blog page if post not found
  useEffect(() => {
    if (!isLoading && !post && !error) {
      navigate("/blog");
    }
  }, [post, isLoading, error, navigate]);
  
  // Format date
  const formattedDate = post?.publishedAt 
    ? format(new Date(post.publishedAt), "MMMM d, yyyy")
    : "";
  
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
        {isLoading ? (
          // Loading skeleton
          <div>
            <div className="max-w-3xl mx-auto mb-8">
              <Skeleton className="h-10 w-3/4 mb-4" />
              <div className="flex mb-6">
                <Skeleton className="h-6 w-32 rounded-full mr-4" />
                <Skeleton className="h-6 w-32" />
              </div>
              <Skeleton className="h-96 w-full mb-8" />
              <Skeleton className="h-6 w-full mb-4" />
              <Skeleton className="h-6 w-full mb-4" />
              <Skeleton className="h-6 w-3/4 mb-6" />
              
              <Skeleton className="h-8 w-48 mb-6" />
              <Skeleton className="h-6 w-full mb-4" />
              <Skeleton className="h-6 w-full mb-4" />
              <Skeleton className="h-6 w-5/6 mb-8" />
            </div>
          </div>
        ) : post ? (
          <div>
            <div className="max-w-3xl mx-auto mb-8">
              <FadeIn>
                <h1 className="font-playfair text-3xl md:text-4xl font-bold text-neutral-dark mb-4">
                  {post.title}
                </h1>
              </FadeIn>
              
              <FadeIn delay={0.1}>
                <div className="flex items-center mb-6">
                  <span className="bg-neutral-light text-neutral-dark px-4 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                  <span className="ml-4 text-neutral">
                    {formattedDate}
                  </span>
                </div>
              </FadeIn>
            </div>
            
            <FadeIn delay={0.2}>
              <div className="max-w-3xl mx-auto mb-12">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-auto rounded-lg mb-8 custom-shadow"
                />
              </div>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <div className="max-w-3xl mx-auto">
                <div 
                  className="prose lg:prose-lg mx-auto mb-12"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                
                <div className="mt-12 pt-6 border-t border-border">
                  <Button 
                    variant="outline"
                    onClick={() => navigate("/blog")}
                    className="flex items-center"
                  >
                    <i className="ri-arrow-left-line mr-2"></i>
                    Back to all articles
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
};

export default BlogPostPage;
