import {
  users, type User, type InsertUser,
  products, type Product, type InsertProduct,
  blogPosts, type BlogPost, type InsertBlogPost,
  testimonials, type Testimonial, type InsertTestimonial,
  features, type Feature, type InsertFeature,
  newsletterSubscriptions, type NewsletterSubscription, type InsertNewsletterSubscription,
  contactMessages, type ContactMessage, type InsertContactMessage
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Product methods
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Blog methods
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getBlogPostsByCategory(category: string): Promise<BlogPost[]>;
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;

  // Testimonial methods
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;

  // Feature methods
  getFeatures(): Promise<Feature[]>;
  createFeature(feature: InsertFeature): Promise<Feature>;

  // Newsletter methods
  subscribeToNewsletter(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;

  // Contact methods
  createContactMessage(contactMessage: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private blogPosts: Map<number, BlogPost>;
  private testimonials: Map<number, Testimonial>;
  private features: Map<number, Feature>;
  private newsletterSubscriptions: Map<number, NewsletterSubscription>;
  private contactMessages: Map<number, ContactMessage>;

  private userId: number;
  private productId: number;
  private blogPostId: number;
  private testimonialId: number;
  private featureId: number;
  private subscriptionId: number;
  private messageId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.blogPosts = new Map();
    this.testimonials = new Map();
    this.features = new Map();
    this.newsletterSubscriptions = new Map();
    this.contactMessages = new Map();

    this.userId = 1;
    this.productId = 1;
    this.blogPostId = 1;
    this.testimonialId = 1;
    this.featureId = 1;
    this.subscriptionId = 1;
    this.messageId = 1;

    // Initialize with sample data
    this.initializeData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.category === category
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  // Blog methods
  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(
      (post) => post.slug === slug
    );
  }

  async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).filter(
      (post) => post.category === category
    );
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.blogPostId++;
    const blogPost: BlogPost = { ...insertBlogPost, id };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }

  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialId++;
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  // Feature methods
  async getFeatures(): Promise<Feature[]> {
    return Array.from(this.features.values());
  }

  async createFeature(insertFeature: InsertFeature): Promise<Feature> {
    const id = this.featureId++;
    const feature: Feature = { ...insertFeature, id };
    this.features.set(id, feature);
    return feature;
  }

  // Newsletter methods
  async subscribeToNewsletter(insertSubscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    // Check if email already exists
    const existingSubscription = Array.from(this.newsletterSubscriptions.values()).find(
      (sub) => sub.email === insertSubscription.email
    );

    if (existingSubscription) {
      return existingSubscription;
    }

    const id = this.subscriptionId++;
    const subscription: NewsletterSubscription = { 
      ...insertSubscription, 
      id, 
      subscribedAt: new Date() 
    };
    this.newsletterSubscriptions.set(id, subscription);
    return subscription;
  }

  // Contact methods
  async createContactMessage(insertContactMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.messageId++;
    const contactMessage: ContactMessage = { 
      ...insertContactMessage, 
      id, 
      createdAt: new Date() 
    };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }

  private initializeData() {
    // Initialize features
    const features = [
      {
        title: "Take the Quiz",
        description: "Answer a few simple questions about your cooking habits and kitchen preferences.",
        icon: "ri-questionnaire-line"
      },
      {
        title: "Get Personalized Picks",
        description: "Our algorithm analyzes your responses to curate a selection of products perfect for you.",
        icon: "ri-magic-line"
      },
      {
        title: "Love Your Kitchen",
        description: "Discover products that match your style and enhance your cooking experience.",
        icon: "ri-heart-line"
      }
    ];

    features.forEach(feature => {
      this.createFeature(feature);
    });

    // Initialize products
    const products = [
      {
        name: "Professional Stand Mixer",
        description: "Premium stand mixer perfect for baking enthusiasts and everyday cooks.",
        price: 29900, // $299.00
        category: "Appliances",
        imageUrl: "https://images.unsplash.com/photo-1585515320310-259814833e62?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        rating: 45 // 4.5 out of 5
      },
      {
        name: "Chef's Knife Set",
        description: "Professional-grade knife set with precision-forged blades for perfect cutting.",
        price: 18900, // $189.00
        category: "Utensils",
        imageUrl: "https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        rating: 50 // 5.0 out of 5
      },
      {
        name: "Smart Blender",
        description: "High-performance blender with multiple settings for smoothies, soups, and more.",
        price: 14900, // $149.00
        category: "Appliances",
        imageUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        rating: 40 // 4.0 out of 5
      },
      {
        name: "Cast Iron Dutch Oven",
        description: "Versatile enameled cast iron pot perfect for slow cooking, baking, and roasting.",
        price: 12900, // $129.00
        category: "Cookware",
        imageUrl: "https://images.unsplash.com/photo-1596803244618-8dfd89f3e85d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        rating: 45 // 4.5 out of 5
      },
      {
        name: "Wooden Cutting Board",
        description: "Handcrafted wooden cutting board made from sustainable hardwood.",
        price: 7900, // $79.00
        category: "Utensils",
        imageUrl: "https://images.unsplash.com/photo-1545470762-4e8cf046e8d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        rating: 45 // 4.5 out of 5
      },
      {
        name: "Copper Cookware Set",
        description: "Premium copper cookware set with excellent heat conductivity for precise cooking.",
        price: 34900, // $349.00
        category: "Cookware",
        imageUrl: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        rating: 45 // 4.5 out of 5
      },
      {
        name: "Multi-Purpose Food Processor",
        description: "Versatile food processor with multiple attachments for various food preparation tasks.",
        price: 19900, // $199.00
        category: "Appliances",
        imageUrl: "https://images.unsplash.com/photo-1593011951342-8eddc1cccfff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        rating: 40 // 4.0 out of 5
      },
      {
        name: "Stainless Steel Measuring Cups",
        description: "Precision-crafted stainless steel measuring cups for accurate cooking and baking.",
        price: 2490, // $24.90
        category: "Utensils",
        imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        rating: 45 // 4.5 out of 5
      }
    ];

    products.forEach(product => {
      this.createProduct(product);
    });

    // Initialize blog posts
    const blogPosts = [
      {
        title: "Knife Skills for Beginners: A Guide to Chopping Like a Pro",
        content: `<p>Every great chef will tell you that knife skills are one of the most fundamental techniques in cooking. Not only do proper knife skills make your meal prep faster and more efficient, but they also ensure safety in the kitchen.</p>
        <h2>The Basics of Knife Handling</h2>
        <p>The first step to mastering knife skills is understanding how to properly hold your knife. The grip should be firm but comfortable, with your thumb and index finger pinching the blade just above the handle, and your remaining fingers wrapped around the handle itself.</p>
        <p>This grip, known as the "pinch grip," gives you the most control over the knife, allowing for precise movements and reducing the risk of slipping.</p>
        <h2>Essential Cutting Techniques</h2>
        <h3>The Slice</h3>
        <p>The slice is the most basic cutting technique. Position your knife at a slight angle against the food, and draw the knife backward while applying gentle downward pressure. This slicing motion, rather than chopping directly down, uses the full length of the blade and results in cleaner cuts.</p>
        <h3>The Dice</h3>
        <p>Dicing creates uniform cubes of food, which is important for even cooking. To dice an onion, for example:</p>
        <ol>
          <li>Cut the onion in half from root to stem</li>
          <li>Peel off the outer skin</li>
          <li>Make horizontal cuts parallel to the cutting board</li>
          <li>Make vertical cuts from top to bottom</li>
          <li>Slice across these cuts to create uniform dice</li>
        </ol>
        <h3>The Julienne</h3>
        <p>Julienning creates thin, matchstick-sized strips. This technique is often used for vegetables in stir-fries or as garnishes. To julienne:</p>
        <ol>
          <li>Square off the vegetable to create flat surfaces</li>
          <li>Slice the vegetable into thin slabs</li>
          <li>Stack the slabs and cut them into thin strips</li>
        </ol>
        <h2>Caring for Your Knives</h2>
        <p>Proper maintenance is essential for keeping your knives in top condition:</p>
        <ul>
          <li>Hand wash knives immediately after use with warm water and mild soap</li>
          <li>Dry knives completely before storing</li>
          <li>Use a honing steel regularly to maintain the edge</li>
          <li>Sharpen knives when they become dull</li>
          <li>Store knives in a block, on a magnetic strip, or with blade guards</li>
        </ul>
        <h2>Recommended Products for Knife Skill Practice</h2>
        <p>Ready to start practicing? Here are some tools that will help you hone your knife skills:</p>
        <ul>
          <li>Chef's knife: The most versatile knife in the kitchen</li>
          <li>Cutting board: Choose a sturdy wooden or plastic board that won't dull your knives</li>
          <li>Honing steel: For maintaining your knife's edge between sharpenings</li>
          <li>Cut-resistant gloves: Optional but helpful for beginners</li>
        </ul>
        <p>With practice, you'll develop muscle memory and confidence in your knife skills, making cooking more enjoyable and efficient. Remember, the key to improvement is consistent practice. Start slow, focus on technique, and speed will come naturally over time.</p>`,
        excerpt: "Master the fundamental techniques of knife skills that will make your meal prep faster, safer, and more enjoyable. Learn proper grip, cutting styles, and care for your knives.",
        imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "Cooking Techniques",
        publishedAt: new Date("2023-06-12"),
        slug: "knife-skills-for-beginners"
      },
      {
        title: "5 Smart Kitchen Organization Solutions for Small Spaces",
        content: `<p>Living with a small kitchen doesn't mean you have to compromise on functionality or style. With clever organization solutions, you can transform even the tiniest cooking space into an efficient and enjoyable area.</p>
        <h2>Vertical Storage Solutions</h2>
        <p>When floor space is limited, look up! Utilizing vertical space is one of the most effective ways to maximize storage in a small kitchen.</p>
        <h3>Wall-Mounted Magnetic Knife Strips</h3>
        <p>Instead of using a knife block that takes up counter space, install a magnetic knife strip on your wall. Not only does this free up valuable counter real estate, but it also keeps your knives easily accessible and on display.</p>
        <h3>Hanging Pot Racks</h3>
        <p>Ceiling-mounted pot racks are perfect for storing bulky pots and pans that would otherwise fill an entire cabinet. Plus, having your cookware hanging overhead makes it easy to grab what you need while cooking.</p>
        <h2>Multi-Functional Kitchen Tools</h2>
        <p>In small kitchens, every item should earn its place. Opt for tools that serve multiple purposes to minimize clutter.</p>
        <h3>Nesting Cookware Sets</h3>
        <p>Invest in cookware sets designed to stack neatly inside one another. Some modern sets even come with detachable handles, allowing for compact storage and versatility.</p>
        <h3>Convertible Cutting Boards</h3>
        <p>Look for cutting boards with built-in colanders or drawers that can catch chopped ingredients. These multi-functional tools save space and reduce the need for multiple prep bowls.</p>
        <h2>Smart Cabinet Solutions</h2>
        <p>Make the most of your cabinet space with these organization hacks:</p>
        <h3>Door-Mounted Organizers</h3>
        <p>The inside of cabinet doors offers valuable storage space. Install narrow shelves or racks to hold spice jars, cleaning supplies, or pot lids.</p>
        <h3>Pull-Out Pantry Shelves</h3>
        <p>Transform deep cabinets from black holes where items get lost to functional pantry space with pull-out shelves. These make it easy to see and access everything in your cabinet.</p>
        <h2>Counter Space Optimization</h2>
        <p>Counter space is precious in small kitchens. Here's how to maximize it:</p>
        <h3>Sink Covers</h3>
        <p>A cutting board designed to fit over your sink instantly creates additional prep space when you're not using the sink.</p>
        <h3>Appliance Garages</h3>
        <p>Keep frequently used appliances like toasters and coffee makers hidden but accessible with a dedicated appliance garage. This keeps your counters clear without sacrificing convenience.</p>
        <h2>Recommended Space-Saving Products</h2>
        <p>Ready to optimize your small kitchen? Here are some products that can help:</p>
        <ul>
          <li>Stackable storage containers with multiple compartments</li>
          <li>Over-the-sink dish drying racks</li>
          <li>Folding step stools that can be stored in narrow spaces</li>
          <li>Magnetic spice jars for refrigerator or wall mounting</li>
        </ul>
        <p>Remember, the key to a functional small kitchen is thoughtful organization. By implementing these space-saving solutions, you can create a kitchen that feels spacious and works efficiently despite its size.</p>`,
        excerpt: "Maximize your limited kitchen space with these clever organization tips and product recommendations that will transform how you store and access your cooking essentials.",
        imageUrl: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "Organization",
        publishedAt: new Date("2023-05-28"),
        slug: "smart-kitchen-organization-solutions"
      },
      {
        title: "Eco-Friendly Kitchen Products That Don't Compromise on Quality",
        content: `<p>As environmental consciousness grows, more cooks are looking to make sustainable choices in their kitchens without sacrificing functionality or aesthetics. The good news is that eco-friendly kitchen products have come a long way, offering high-quality alternatives to conventional items.</p>
        <h2>Sustainable Cookware Options</h2>
        <p>Traditional non-stick cookware often contains chemicals that can be harmful to both health and environment. Here are some greener alternatives:</p>
        <h3>Cast Iron Cookware</h3>
        <p>Cast iron pans have been used for centuries and for good reason. They're incredibly durable (often lasting generations), naturally non-stick when properly seasoned, and free from synthetic chemicals. While they require some specific care, many cooks find that the superior cooking results are worth it.</p>
        <h3>Ceramic-Coated Cookware</h3>
        <p>For those who prefer the convenience of non-stick surfaces but want to avoid traditional PTFE coatings, ceramic-coated cookware offers an excellent alternative. These pans provide a smooth cooking surface without the potentially harmful chemicals in conventional non-stick coatings.</p>
        <h2>Plastic-Free Food Storage</h2>
        <p>Reducing plastic use in the kitchen is one of the most impactful changes you can make:</p>
        <h3>Glass Food Storage Containers</h3>
        <p>Glass containers are non-porous, meaning they won't absorb food odors or stains. They're also oven-safe, allowing you to store, heat, and serve from the same container. Look for options with silicone or bamboo lids to further reduce plastic use.</p>
        <h3>Beeswax Wraps</h3>
        <p>These reusable alternatives to plastic wrap are made from cotton infused with beeswax, jojoba oil, and tree resin. They mold to containers or food items with the warmth of your hands and can be washed and reused for up to a year.</p>
        <h2>Sustainable Kitchen Textiles</h2>
        <p>Kitchen textiles are often overlooked, but they present excellent opportunities for eco-friendly swaps:</p>
        <h3>Organic Cotton Dish Towels</h3>
        <p>Conventional cotton farming uses significant pesticides and water. Organic cotton dish towels offer the same absorbency and durability without the environmental impact.</p>
        <h3>Compostable Cleaning Cloths</h3>
        <p>Swedish dishcloths made from cellulose and cotton can replace dozens of paper towel rolls. They're highly absorbent, can be washed in the dishwasher or washing machine, and will eventually biodegrade completely.</p>
        <h2>Eco-Friendly Utensils and Gadgets</h2>
        <p>Even the smallest kitchen tools can be upgraded to sustainable versions:</p>
        <h3>Bamboo Utensils</h3>
        <p>Bamboo is a rapidly renewable resource that makes for excellent cooking utensils. It's naturally antibacterial, won't scratch non-stick surfaces, and is heat-resistant.</p>
        <h3>Stainless Steel Straws and Food Containers</h3>
        <p>Durable stainless steel items can replace countless disposable alternatives. They're dishwasher safe, virtually unbreakable, and will last for decades with proper care.</p>
        <h2>Recommended Eco-Friendly Kitchen Products</h2>
        <p>Looking to make the switch to a more sustainable kitchen? Here are some top-performing products to consider:</p>
        <ul>
          <li>Lodge cast iron skillet: A versatile, heirloom-quality cooking essential</li>
          <li>Stasher silicone storage bags: Reusable, air-tight, and dishwasher safe</li>
          <li>Bambu coconut wood spoons: Naturally antimicrobial and heat-resistant</li>
          <li>Full Circle compostable kitchen scrubbers: Made from plant-based materials</li>
        </ul>
        <p>By making thoughtful choices about the products we bring into our kitchens, we can significantly reduce our environmental footprint without compromising on cooking performance or style.</p>`,
        excerpt: "Discover sustainable alternatives to common kitchen tools and appliances that are better for the environment without sacrificing performance or durability.",
        imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "Sustainability",
        publishedAt: new Date("2023-05-15"),
        slug: "eco-friendly-kitchen-products"
      }
    ];

    blogPosts.forEach(blogPost => {
      this.createBlogPost(blogPost);
    });

    // Initialize testimonials
    const testimonials = [
      {
        text: "The product recommendations were spot on! I never would have found these amazing kitchen tools on my own. My cooking has improved so much.",
        author: "Sarah J.",
        role: "Home Baker",
        rating: 50, // 5.0 out of 5
        imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80"
      },
      {
        text: "I was overwhelmed by all the choices until I found this site. The quiz really helped narrow down exactly what I needed for my small apartment kitchen.",
        author: "Michael T.",
        role: "Apartment Dweller",
        rating: 50, // 5.0 out of 5
        imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80"
      },
      {
        text: "The blog articles are just as valuable as the product recommendations. I've learned so many cooking techniques and kitchen organization tips!",
        author: "Elena K.",
        role: "Food Enthusiast",
        rating: 45, // 4.5 out of 5
        imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80"
      }
    ];

    testimonials.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });
  }
}

export const storage = new MemStorage();
