import { useState, useEffect } from "react";
import { BookOpen, CheckCircle } from "lucide-react";
import { groupAndPaginate } from "@/helpers/helpers";
import { books } from "@/data/content";
import EmptyStateComp from "@/components/no-data";

export default function BooksSection() {
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (scrollTop + windowHeight < docHeight - 50) {
        setVisibleCount((prev) => {
          if (prev >= books.length) return prev;
          return Math.min(prev + 5, books.length);
        });
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { visibleGroups, sortedKeys } = groupAndPaginate(
    books,
    "year",
    visibleCount
  );

  return (
    <section id="books" className="py-16 bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-400">
              Reading
            </h2>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>

        <div className="space-y-10">
          {sortedKeys.length === 0 && <EmptyStateComp />}
          {sortedKeys?.map((year) => (
            <div key={year} className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-400 dark:text-gray-500 tabular-nums">
                  {year}
                </span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {visibleGroups[year]?.map((item) => (
                  <div
                    key={item?.id}
                    className="group bg-white dark:bg-gray-900/80 rounded-xl p-4 border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0">
                        {item.status === "completed" ? (
                          <CheckCircle size={16} className="text-emerald-500" />
                        ) : (
                          <BookOpen size={16} className="text-amber-500" />
                        )}
                      </div>
                      <div className="space-y-0.5 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-snug">
                          {item?.title}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {item?.author}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
