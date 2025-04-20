import { Link } from "wouter";
import { NAV_LINKS } from "@/lib/constants";

const Footer = () => {
  return (
    <footer className="bg-neutral-dark text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <i className="ri-knife-line text-2xl text-primary"></i>
              <span className="text-2xl font-bold font-playfair">CulinaryCompass</span>
            </div>
            <p className="mb-6 text-gray-400">Your guide to personalized kitchen recommendations based on your unique preferences and cooking style.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <i className="ri-facebook-fill text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <i className="ri-instagram-line text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <i className="ri-pinterest-line text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <i className="ri-twitter-fill text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <a className="text-gray-400 hover:text-primary transition-colors">{link.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-6">Categories</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Kitchen Appliances</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Cookware</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Utensils & Gadgets</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Storage Solutions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Bakeware</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="ri-map-pin-line mt-1 mr-3 text-primary"></i>
                <span className="text-gray-400">123 Kitchen Way, Culinary City, CC 10101</span>
              </li>
              <li className="flex items-center">
                <i className="ri-mail-line mr-3 text-primary"></i>
                <a href="mailto:info@culinarycompass.com" className="text-gray-400 hover:text-primary transition-colors">info@culinarycompass.com</a>
              </li>
              <li className="flex items-center">
                <i className="ri-phone-line mr-3 text-primary"></i>
                <a href="tel:+1234567890" className="text-gray-400 hover:text-primary transition-colors">(123) 456-7890</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2023 CulinaryCompass. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
