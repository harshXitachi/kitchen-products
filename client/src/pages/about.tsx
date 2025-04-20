import { useState } from "react";
import { motion } from "framer-motion";
import { FOOD_PREPARATION, STYLED_KITCHEN_SPACES } from "@/lib/constants";
import FadeIn from "@/components/animations/fade-in";
import NewsletterSection from "@/components/layout/newsletter-section";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const About = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact", data);
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll respond as soon as possible.",
      });
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
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
      {/* About Header */}
      <section className="relative py-20 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <FadeIn>
              <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
                About CulinaryCompass
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.1}>
              <p className="text-lg mb-0">
                Helping you discover the perfect kitchen products for your unique style.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <FadeIn>
                <img 
                  src={STYLED_KITCHEN_SPACES[0]} 
                  alt="Modern Kitchen Design"
                  className="rounded-lg custom-shadow w-full"
                />
              </FadeIn>
            </div>
            <div className="lg:w-1/2">
              <FadeIn direction="right">
                <h2 className="font-playfair text-3xl font-bold text-neutral-dark mb-6">
                  Our Story
                </h2>
                <p className="text-neutral mb-4">
                  CulinaryCompass was born from a simple frustration: finding the right kitchen products shouldn't be so overwhelming. Our founder, a passionate home cook, spent countless hours researching products only to end up with items that didn't truly fit her cooking style or kitchen space.
                </p>
                <p className="text-neutral mb-0">
                  That's when the idea struck – what if there was a way to match people with kitchen products based on their unique cooking habits, kitchen layout, and personal preferences? CulinaryCompass was created to be that personalized guide, helping home cooks navigate the vast world of kitchen products to find their perfect match.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Mission */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="lg:w-1/2">
              <FadeIn>
                <img 
                  src={FOOD_PREPARATION[3]} 
                  alt="Cooking in Kitchen"
                  className="rounded-lg custom-shadow w-full"
                />
              </FadeIn>
            </div>
            <div className="lg:w-1/2">
              <FadeIn direction="left">
                <h2 className="font-playfair text-3xl font-bold text-neutral-dark mb-6">
                  Our Mission
                </h2>
                <p className="text-neutral mb-4">
                  At CulinaryCompass, we believe that the right kitchen tools can transform cooking from a daily chore into a joyful experience. Our mission is to help everyone – from beginners to seasoned chefs – discover products that truly enhance their unique cooking journey.
                </p>
                <p className="text-neutral mb-0">
                  We're committed to providing honest, thorough recommendations based on real testing and expertise. We don't just showcase trending products; we help you find the ones that will work best for YOU. Through our personalized quizzes, detailed guides, and curated selections, we aim to be your trusted companion in creating a kitchen that inspires your culinary creativity.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <h2 className="font-playfair text-3xl font-bold text-neutral-dark mb-6 text-center">
                Contact Us
              </h2>
            </FadeIn>
            
            <FadeIn delay={0.1}>
              <p className="text-neutral mb-8 text-center">
                Have questions, feedback, or suggestions? We'd love to hear from you! Fill out the form below, and our team will get back to you as soon as possible.
              </p>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <div className="bg-background p-8 rounded-lg custom-shadow">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Your message" 
                              className="min-h-[150px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary-dark text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <NewsletterSection />
    </motion.div>
  );
};

export default About;
