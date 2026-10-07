import { Mail, MapPin } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import SocialLinksComp from "@/components/social-links";
import { about } from "@/data/content";
import { menuItems } from "@/data/navbar";
import InstallPWAButton from "@/components/install-btn";
import { Link } from "react-router-dom";

export default function FooterSection() {
  return (
    <footer className="w-full bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 font-academic">
              Maha Zainab
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              {about?.shortBio}
            </p>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
                <MapPin size={14} />
                <span className="text-xs">{about?.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
                <Mail size={14} />
                <span className="text-xs">{about?.email}</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Navigation
            </h3>
            <div className="space-y-1">
              {menuItems.map((item) => (
                <ScrollLink
                  to={item?.url}
                  key={item?.title}
                  className="block text-sm text-gray-500 dark:text-gray-400 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-0.5"
                >
                  {item?.title}
                </ScrollLink>
              ))}
            </div>
          </div>

          {/* Research Areas */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Research Areas
            </h3>
            <div className="space-y-1">
              {about?.researchAreas?.slice(0, 6).map((area) => (
                <span key={area} className="block text-sm text-gray-500 dark:text-gray-400 py-0.5">
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Connect
            </h3>
            <div className="flex gap-2">
              <SocialLinksComp />
            </div>
            <InstallPWAButton />
          </div>
        </div>

        <div className="w-full h-px bg-gray-200 dark:bg-gray-800 my-6" />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <Link to="https://www.linkedin.com/in/muhammadfarooq85">
            <p className="text-xs text-gray-400 dark:text-gray-500 hover:text-blue-500 transition-colors">
              Developed by Muhammad Farooq
            </p>
          </Link>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Updated{" "}
            {new Date(import.meta.env.BUILD_DATE).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </footer>
  );
}
