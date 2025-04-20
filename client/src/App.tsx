import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Home from "@/pages/home";
import Products from "@/pages/products";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import About from "@/pages/about";
import { AnimatePresence } from "framer-motion";

function Router() {
  const [location] = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Switch key={location}>
        <Route path="/" component={Home} />
        <Route path="/products" component={Products} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Header />
      <main className="pt-20">
        <Router />
      </main>
      <Footer />
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
