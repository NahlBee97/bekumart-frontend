import Link from "next/link";
import {
  PhoneIcon,
  MapPinIcon,
  MailIcon,
  ClockIcon,
  InstagramIcon,
  FacebookIcon,
  TwitterIcon,
  Leaf,
} from "lucide-react";
export default function Footer() {
  return (
    <footer className="border-t">
      <div className="max-w-7xl mx-auhref py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="w-[183px] h-[38px] flex gap-2 py-[3px] items-center">
              {/* eslint-disable-next-line */}
              <Leaf className="w-8 h-8 text-[#FFFFFF]" />
              <p className="font-semibold text-[32px] text-[#FFFFFF]">
                Ecobazar
              </p>
            </div>
            <p className="text-[#808080] my-4">
              Your one-fresh destination for fresh, high-quality fruits
              delivered href your doorstep.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#FFFFFF]">
                <FacebookIcon width={20} height={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FFFFFF]">
                <InstagramIcon width={20} height={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FFFFFF]">
                <TwitterIcon width={20} height={20} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#FFFFFF] mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/shop"
                  className="text-[#808080] hover:text-[#FFFFFF]"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[#808080] hover:text-[#FFFFFF]"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[#808080] hover:text-[#FFFFFF]"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-[#808080] hover:text-[#FFFFFF]"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#FFFFFF] mb-4">
              Customer Service
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/shipping"
                  className="text-[#808080] hover:text-[#FFFFFF]"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-[#808080] hover:text-[#FFFFFF]"
                >
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-[#808080] hover:text-[#FFFFFF]"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-[#808080] hover:text-[#FFFFFF]"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#FFFFFF] mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPinIcon
                  className="text-[#FFFFFF] mr-2 mt-0.5"
                  width={20}
                  height={20}
                />
                <span className="text-[#808080]">
                  123 Fruit Street, Orchard City, FC 12345
                </span>
              </li>
              <li className="flex items-center">
                <PhoneIcon
                  className="text-[#FFFFFF] mr-2"
                  width={20}
                  height={20}
                />
                <span className="text-[#808080]">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <MailIcon
                  className="text-[#FFFFFF] mr-2"
                  width={20}
                  height={20}
                />
                <span className="text-[#808080]">info@fruitmarket.com</span>
              </li>
              <li className="flex items-center">
                <ClockIcon
                  className="text-[#FFFFFF] mr-2"
                  width={20}
                  height={20}
                />
                <span className="text-[#808080]">Mon-Fri: 9am-6pm</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Ecobazar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
