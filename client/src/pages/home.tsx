import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { STYLED_KITCHEN_SPACES, FOOD_PREPARATION } from "@/lib/constants";
import ProductCard from "@/components/product/product-card";
import TestimonialCard from "@/components/testimonials/testimonial-card";
import BlogCard from "@/components/blog/blog-card";
import NewsletterSection from "@/components/layout/newsletter-section";
import FadeIn from "@/components/animations/fade-in";
import { Skeleton } from "@/components/ui/skeleton";
import { type Product, type BlogPost, type Testimonial, type Feature } from "@shared/schema";

const Home = () => {
  // Fetch products
  const { data: products, isLoading: isLoadingProducts } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });
  
  // Fetch blog posts
  const { data: blogPosts, isLoading: isLoadingBlogPosts } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });
  
  // Fetch testimonials
  const { data: testimonials, isLoading: isLoadingTestimonials } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });
  
  // Fetch features
  const { data: features, isLoading: isLoadingFeatures } = useQuery<Feature[]>({
    queryKey: ["/api/features"],
  });
  
  const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.5 }
  };
  
  return (
    <motion.div 
      {...pageTransition}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url('${STYLED_KITCHEN_SPACES[1]}')` }}
        >
          <div className="absolute inset-0 banner-overlay"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center relative z-10">
          <div className="max-w-2xl">
            <FadeIn>
              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Discover Your Perfect Kitchen
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.1}>
              <p className="text-white text-xl mb-8 opacity-90">
                Personalized recommendations based on your cooking preferences and style
              </p>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary-dark text-white font-medium rounded-full"
                >
                  Take the Quiz
                </Button>
                <Link href="/products">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white hover:bg-gray-100 text-neutral-dark font-medium rounded-full"
                  >
                    Browse Products
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-neutral-dark mb-4">
                How It Works
              </h2>
            </FadeIn>
            
            <FadeIn delay={0.1}>
              <p className="text-neutral max-w-2xl mx-auto">
                We help you discover the perfect kitchen products tailored to your unique cooking style and preferences.
              </p>
            </FadeIn>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {isLoadingFeatures ? (
              // Loading skeletons
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="text-center">
                  <Skeleton className="mb-6 mx-auto w-20 h-20 rounded-full" />
                  <Skeleton className="h-6 w-40 mx-auto mb-3" />
                  <Skeleton className="h-4 w-full mx-auto mb-2" />
                  <Skeleton className="h-4 w-3/4 mx-auto" />
                </div>
              ))
            ) : (
              features?.map((feature, index) => (
                <FadeIn key={feature.id} delay={0.1 * index}>
                  <div className="text-center">
                    <div className="mb-6 mx-auto w-20 h-20 bg-background rounded-full flex items-center justify-center">
                      <i className={`${feature.icon} text-3xl text-primary`}></i>
                    </div>
                    <h3 className="font-playfair text-xl font-semibold mb-3 text-neutral-dark">{feature.title}</h3>
                    <p className="text-neutral">{feature.description}</p>
                  </div>
                </FadeIn>
              ))
            )}
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section id="products" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-neutral-dark mb-4">
                Featured Products
              </h2>
            </FadeIn>
            
            <FadeIn delay={0.1}>
              <p className="text-neutral max-w-2xl mx-auto">
                Explore our handpicked selection of top-rated kitchen essentials.
              </p>
            </FadeIn>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {isLoadingProducts ? (
              // Loading skeletons
              Array(4).fill(0).map((_, index) => (
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
              products?.slice(0, 4).map((product, index) => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  delay={0.1 * index}
                />
              ))
            )}
          </div>
          
          <div className="text-center mt-12">
            <FadeIn delay={0.3}>
              <Link href="/products">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary-dark text-white font-medium rounded-full"
                >
                  View All Products
                </Button>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-neutral-dark mb-4">
                What Our Community Says
              </h2>
            </FadeIn>
            
            <FadeIn delay={0.1}>
              <p className="text-neutral max-w-2xl mx-auto">
                Hear from community members who've found their perfect kitchen match.
              </p>
            </FadeIn>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isLoadingTestimonials ? (
              // Loading skeletons
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="bg-white p-8 rounded-lg custom-shadow">
                  <Skeleton className="h-4 w-24 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-6" />
                  <div className="flex items-center">
                    <Skeleton className="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              testimonials?.map((testimonial, index) => (
                <TestimonialCard 
                  key={testimonial.id}
                  testimonial={testimonial}
                  delay={0.1 * index}
                />
              ))
            )}
          </div>
        </div>
      </section>
      
      {/* Blog Section */}
      <section id="blog" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-neutral-dark mb-4">
                Latest from Our Blog
              </h2>
            </FadeIn>
            
            <FadeIn delay={0.1}>
              <p className="text-neutral max-w-2xl mx-auto">
                Tips, tricks, and kitchen inspiration to enhance your culinary journey.
              </p>
            </FadeIn>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isLoadingBlogPosts ? (
              // Loading skeletons
              Array(3).fill(0).map((_, index) => (
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
              blogPosts?.slice(0, 3).map((post, index) => (
                <BlogCard 
                  key={post.id}
                  post={post}
                  delay={0.1 * index}
                />
              ))
            )}
          </div>
          
          <div className="text-center mt-12">
            <FadeIn delay={0.3}>
              <Link href="/blog">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary-dark text-white font-medium rounded-full"
                >
                  View All Articles
                </Button>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <NewsletterSection />
      
      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between custom-shadow">
            <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
              <FadeIn>
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-neutral-dark mb-4">
                  Ready to Find Your Perfect Kitchen Match?
                </h2>
              </FadeIn>
              
              <FadeIn delay={0.1}>
                <p className="text-neutral mb-6">
                  Take our quick quiz to discover product recommendations tailored to your unique cooking style and kitchen needs.
                </p>
              </FadeIn>
              
              <FadeIn delay={0.2}>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary-dark text-white font-medium rounded-full"
                >
                  Start the Quiz
                </Button>
              </FadeIn>
            </div>
            <div className="md:w-1/3">
              <FadeIn delay={0.3}>
                <img 
                  src={FOOD_PREPARATION[0]} 
                  alt="Kitchen Essentials" 
                  className="rounded-lg w-full h-auto"
                />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
