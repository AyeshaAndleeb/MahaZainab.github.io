import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

export default function ScrollToggleButton() {
  const [atBottom, setAtBottom] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50;
      setAtBottom(nearBottom);
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollAction = () => {
    window.scrollTo({
      top: atBottom ? 0 : document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollAction}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-xl shadow-lg
        bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900
        hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white
        transition-all duration-300 cursor-pointer"
      aria-label={atBottom ? "Scroll to top" : "Scroll to bottom"}
    >
      {atBottom ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
    </button>
  );
}
