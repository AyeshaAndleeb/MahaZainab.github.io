import { useState, useEffect } from "react";
import { groupAndPaginate } from "@/helpers/helpers";
import { news } from "@/data/content";
import EmptyStateComp from "@/components/no-data";

export default function NewsSection() {
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (scrollTop + windowHeight < docHeight - 50) {
        setVisibleCount((prev) => {
          if (prev >= news.length) return prev;
          return Math.min(prev + 5, news.length);
        });
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { visibleGroups, sortedKeys } = groupAndPaginate(
    news,
    "year",
    visibleCount
  );

  return (
    <section id="news" className="py-16 bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-400">
              News & Updates
            </h2>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>

        <div className="space-y-8">
          {sortedKeys.length === 0 && <EmptyStateComp />}
          {sortedKeys?.map((year) => (
            <div key={year} className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-400 dark:text-gray-500 tabular-nums">
                  {year}
                </span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
              </div>

              <div className="space-y-0 ml-4 border-l-2 border-gray-200 dark:border-gray-800">
                {visibleGroups[year]?.map((item) => (
                  <div
                    key={item.id}
                    className="relative pl-6 py-3 group"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-[-5px] top-[18px] w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-blue-500 dark:group-hover:bg-blue-400 transition-colors" />
                    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
                      <span className="text-xs font-medium text-gray-400 dark:text-gray-500 whitespace-nowrap shrink-0 mt-0.5">
                        {item?.category}
                      </span>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {item?.title}
                      </p>
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
