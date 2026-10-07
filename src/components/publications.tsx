import { useState, useEffect, type JSX } from "react";
import { FileText, PlayIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { publications } from "@/data/content";
import { groupAndPaginate } from "@/helpers/helpers";
import EmptyStateComp from "@/components/no-data";

export default function PublicationSection() {
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (scrollTop + windowHeight < docHeight - 50) {
        setVisibleCount((prev) => {
          if (prev >= publications.length) return prev;
          return Math.min(prev + 5, publications.length);
        });
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatAuthors = (authors: string | string[]): JSX.Element => {
    const authorsArray =
      typeof authors === "string"
        ? authors.split(",").map((a) => a.trim())
        : authors;
    return (
      <>
        {authorsArray.map((author, index) => (
          <span key={index}>
            {author === "Maha Zainab" ? (
              <span className="font-semibold text-gray-900 dark:text-gray-100">{author}</span>
            ) : (
              author
            )}
            {index < authorsArray.length - 1 && ", "}
          </span>
        ))}
      </>
    );
  };

  const { visibleGroups, sortedKeys } = groupAndPaginate(
    publications,
    "year",
    visibleCount
  );

  return (
    <section id="publications" className="py-16 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-400">
              Publications
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
                  {visibleGroups[year]?.length} paper{visibleGroups[year]?.length > 1 ? "s" : ""}
                </span>
              </div>

              <div className="space-y-3">
                {visibleGroups[year]?.map((item) => (
                  <article
                    key={item?.id}
                    className="group bg-white dark:bg-gray-900/80 rounded-xl p-5 border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
                      <div className="flex-1 space-y-1.5">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-snug">
                          {item?.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatAuthors(item?.authors)}
                        </p>
                        {item?.doi && (
                          <p className="text-xs text-gray-400 dark:text-gray-500 font-mono">
                            {item?.doi}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-row items-center gap-2 shrink-0">
                        {item?.pdfLink && (
                          <Link to={item?.pdfLink}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-lg text-xs cursor-pointer border-gray-300 dark:border-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
                            >
                              <FileText size={14} className="mr-1" /> PDF
                            </Button>
                          </Link>
                        )}
                        {item?.talkLink && (
                          <Link to={item?.talkLink}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-lg text-xs cursor-pointer border-gray-300 dark:border-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
                            >
                              <PlayIcon size={14} className="mr-1" /> Talk
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
