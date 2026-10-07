import { Link } from "react-router-dom";
import { socialLinks } from "@/data/social-links";
import { type SocialLink } from "@/types/social-links";

export default function SocialLinksComp() {
  return (
    <>
      {socialLinks.map((link: SocialLink, index: number) => (
        <Link
          key={index}
          to={link.href}
          className="p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200"
          aria-label={link.label}
          dangerouslySetInnerHTML={{ __html: link.icon }}
        />
      ))}
    </>
  );
}
