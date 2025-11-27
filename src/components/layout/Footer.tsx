import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  YoutubeIcon,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600">MyBrand</h2>
          <p className="text-gray-600 mt-3">
            Building modern apps with React, Vite, Tailwind & ShadCN UI.
          </p>

          <div className="flex gap-4 mt-5">
            <Link to="#" className="text-gray-500 hover:text-blue-600">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link to="#" className="text-gray-500 hover:text-blue-600">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link to="#" className="text-gray-500 hover:text-blue-600">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link to="#" className="text-gray-500 hover:text-blue-600">
              <YoutubeIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
          <ul className="space-y-3 text-gray-600">
            <li><Link to="/about" className="hover:text-blue-600">About Us</Link></li>
            <li><Link to="/products" className="hover:text-blue-600">Products</Link></li>
            <li><Link to="/contact" className="hover:text-blue-600">Contact</Link></li>
            <li><Link to="/privacy" className="hover:text-blue-600">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">Resources</h3>
          <ul className="space-y-3 text-gray-600">
            <li><Link to="/docs" className="hover:text-blue-600">Documentation</Link></li>
            <li><Link to="/blogs" className="hover:text-blue-600">Blog</Link></li>
            <li><Link to="/tutorials" className="hover:text-blue-600">Tutorials</Link></li>
            <li><Link to="/faq" className="hover:text-blue-600">FAQ</Link></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">Contact</h3>
          <p className="text-gray-600">info@mybrand.com</p>
          <p className="text-gray-600 mt-1">+61 123 456 789</p>
          <p className="text-gray-600 mt-4">Sydney, Australia</p>
        </div>

      </div>

      <div className="border-t py-5 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} MyBrand — All rights reserved.
      </div>
    </footer>
  );
}
