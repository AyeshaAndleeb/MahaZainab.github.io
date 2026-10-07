import { useState, useEffect } from "react";
import { projects } from "@/data/content";
import { groupAndPaginate } from "@/helpers/helpers";
import EmptyStateComp from "@/components/no-data";

export default function ProjectsSection() {
  const [visibleCount, setVisibleCount] = useState(15);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (scrollTop + windowHeight < docHeight - 50) {
        setVisibleCount((prev) => {
          if (prev >= projects.length) return prev;
          return Math.min(prev + 5, projects.length);
        });
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { visibleGroups, sortedKeys } = groupAndPaginate(
    projects,
    "year",
    visibleCount
  );

  return (
    <section id="projects" className="py-16 bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-400">
              Projects
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
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {visibleGroups[year]?.length} project{visibleGroups[year]?.length > 1 ? "s" : ""}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {visibleGroups[year]?.map((item) => (
                  <div
                    key={item?.id}
                    className="group bg-white dark:bg-gray-900/80 rounded-xl p-5 border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200"
                  >
                    <div className="space-y-2.5">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-snug">
                        {item?.title}
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {item?.technology?.split(",").map((tech, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-medium px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                        {item?.description}
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
