import { useState } from "react";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FadeIn from "@/components/animations/fade-in";

const emailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type EmailFormValues = z.infer<typeof emailSchema>;

const NewsletterSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: EmailFormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/newsletter", data);
      toast({
        title: "Success!",
        description: "Thank you for subscribing to our newsletter.",
      });
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Failed to subscribe. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <motion.i 
          className="ri-knife-line text-[400px] text-white absolute -bottom-20 -left-20"
          animate={{ rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.i 
          className="ri-whisk-line text-[300px] text-white absolute -top-10 -right-10 transform rotate-12"
          animate={{ rotate: [12, 17, 12] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <FadeIn>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Join Our Culinary Community</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mb-8 opacity-90">Subscribe to our newsletter for personalized product recommendations, expert tips, and exclusive recipes.</p>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white p-2 rounded-full flex flex-col sm:flex-row">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Your email address"
                          className="px-5 py-3 bg-transparent border-none focus:outline-none text-neutral-dark rounded-full shadow-none"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary-dark text-white font-medium px-8 py-3 rounded-full transition-colors duration-300 mt-2 sm:mt-0"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            </Form>
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <p className="mt-4 text-sm opacity-80">We respect your privacy. Unsubscribe at any time.</p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
