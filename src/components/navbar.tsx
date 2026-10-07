import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, FileText, Sun, Moon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link as ScrollLink } from "react-scroll";
import { Button } from "@/components/ui/button";
import { menuItems, cvData } from "@/data/navbar";
import { useTheme } from "@/components/theme-provider";

export default function NavbarSection() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300
        bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg
        ${isScrolled ? "shadow-sm border-gray-200 dark:border-gray-800" : "border-transparent"}`}
    >
      {/* Desktop */}
      <nav className="mx-auto hidden max-w-5xl lg:flex lg:items-center lg:justify-between px-6 py-3">
        <ScrollLink
          to="about"
          smooth={true}
          duration={800}
          className="text-lg font-semibold tracking-tight cursor-pointer text-gray-900 dark:text-gray-100 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
        >
          Maha Zainab
        </ScrollLink>

        <div className="flex items-center gap-1">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-0">
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <ScrollLink
                    to={item.url}
                    smooth={true}
                    duration={800}
                    className="inline-flex h-9 cursor-pointer items-center px-3 text-sm font-medium
                      text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100
                      transition-colors duration-200"
                  >
                    {item.title}
                  </ScrollLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2 ml-3 pl-3 border-l border-gray-200 dark:border-gray-700">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a href={cvData.url} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg border cursor-pointer border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300
                  hover:bg-gray-900 hover:text-white hover:border-gray-900 dark:hover:bg-gray-100 dark:hover:text-gray-900 dark:hover:border-gray-100 transition-all duration-200"
              >
                <FileText size={14} className="mr-1.5" />
                {cvData.title}
              </Button>
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile */}
      <div className="flex items-center justify-between px-5 py-3 lg:hidden">
        <ScrollLink
          to="about"
          smooth={true}
          duration={800}
          className="text-lg font-semibold tracking-tight cursor-pointer text-gray-900 dark:text-gray-100"
        >
          Maha Zainab
        </ScrollLink>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Button
            variant="ghost"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 cursor-pointer"
          >
            {mobileOpen ? (
              <X size={22} className="text-gray-700 dark:text-gray-300" />
            ) : (
              <Menu size={22} className="text-gray-700 dark:text-gray-300" />
            )}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="px-5 pb-4 flex flex-col gap-1 lg:hidden animate-in fade-in slide-in-from-top-2 border-t border-gray-100 dark:border-gray-800">
          {menuItems.map((item) => (
            <ScrollLink
              to={item.url}
              smooth={true}
              duration={800}
              key={item.title}
              onClick={() => setMobileOpen(false)}
              className="py-2.5 px-3 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg cursor-pointer transition-all"
            >
              {item.title}
            </ScrollLink>
          ))}
          <a href={cvData.url} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)} className="mt-1">
            <Button
              variant="outline"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300
                hover:bg-gray-900 hover:text-white hover:border-gray-900 dark:hover:bg-gray-100 dark:hover:text-gray-900 transition-all"
            >
              <FileText size={14} className="mr-1.5" />
              {cvData.title}
            </Button>
          </a>
        </div>
      )}
    </header>
  );
}
