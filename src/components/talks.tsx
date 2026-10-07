import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Mic, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { groupAndPaginate } from "@/helpers/helpers";
import { talks } from "@/data/content";
import EmptyStateComp from "@/components/no-data";

export default function TalksSection() {
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (scrollTop + windowHeight < docHeight - 50) {
        setVisibleCount((prev) => {
          if (prev >= talks.length) return prev;
          return Math.min(prev + 5, talks.length);
        });
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { visibleGroups, sortedKeys } = groupAndPaginate(
    talks,
    "year",
    visibleCount
  );

  return (
    <section id="talks" className="py-16 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-400">
              Talks & Presentations
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

              <div className="space-y-3">
                {visibleGroups[year]?.map((item) => (
                  <div
                    key={item?.id}
                    className="group bg-white dark:bg-gray-900/80 rounded-xl p-5 border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1 space-y-1">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          {item?.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item?.organization}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-400">
                          <Mic size={12} />
                          {item?.category || "Talk"}
                        </span>
                        {item?.slidesLink && (
                          <Link to={item?.slidesLink}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-lg text-xs cursor-pointer border-gray-300 dark:border-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
                            >
                              <ExternalLink size={12} className="mr-1" />
                              Slides
                            </Button>
                          </Link>
                        )}
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
