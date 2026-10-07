// Libraries Imports
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, NotepadTextDashed, Sun, Moon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link as ScrollLink } from "react-scroll";
import { Button } from "@/components/ui/button";
// Local Imports
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
    <section
      className={`sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 p-4 bg-white/90 dark:bg-gray-900/90
        backdrop-blur-md transition ${isScrolled ? "shadow-sm" : ""}`}
    >
      {/* Desktop */}
      <nav className="mx-auto hidden max-w-6xl lg:flex lg:items-center lg:justify-between">
        <Link
          to="/"
          className="text-2xl font-semibold tracking-tight text-blue-600"
        >
          Maha Zainab
        </Link>
        <div className="flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-0">
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <ScrollLink
                    to={item.url}
                    smooth={true}
                    duration={1200}
                    className="inline-flex h-10 cursor-pointer items-center px-3 text-lg font-medium
                    text-black dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition duration-150
                    "
                  >
                    {item.title}
                  </ScrollLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full cursor-pointer border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-gray-700" />
            )}
          </Button>
          <a href={cvData.url} target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border cursor-pointer border-blue-600 px-6 py-3 text-lg font-semibold text-blue-600
              hover:bg-blue-600 hover:text-white transition dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-500 dark:hover:text-white"
            >
              {cvData.title}
              <NotepadTextDashed className="ml-2" />
            </Button>
          </a>
        </div>
      </nav>

      {/* Mobile */}
      <div className="flex items-center justify-between lg:hidden">
        <Link
          to="/"
          className="text-xl font-semibold tracking-tight text-blue-600"
        >
          Maha Zainab
        </Link>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full cursor-pointer border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-gray-700" />
            )}
          </Button>
          <Button
            variant={"outline"}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 cursor-pointer rounded-md border border-blue-600"
          >
            {mobileOpen ? (
              <X size={24} className="text-blue-600" />
            ) : (
              <Menu size={24} className="text-blue-600" />
            )}
          </Button>
        </div>
      </div>
      {mobileOpen && (
        <div className="mt-4 flex flex-col gap-4 lg:hidden animate-in fade-in slide-in-from-top-2">
          {menuItems.map((item) => (
            <ScrollLink
              to={item.url}
              smooth={true}
              duration={1200}
              key={item.title}
              onClick={() => setMobileOpen(false)}
              className="text-lg font-medium text-black dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition"
            >
              {item.title}
            </ScrollLink>
          ))}

          <a href={cvData.url} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}>
            <Button
              variant="outline"
              className="w-full rounded-full border border-blue-600 py-3 text-lg font-semibold text-blue-600
              hover:bg-blue-600 hover:text-white transition! duration-150 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-500 dark:hover:text-white"
            >
              {cvData.title}
              <NotepadTextDashed className="ml-2" />
            </Button>
          </a>
        </div>
      )}
    </section>
  );
}
