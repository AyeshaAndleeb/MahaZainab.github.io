import SocialLinksComp from "@/components/social-links";
import { about } from "@/data/content";

export default function HeroSection() {
  return (
    <section id="about" className="w-full py-16 lg:py-24 bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left column — Photo + Info */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start gap-6">
            <div className="relative">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-lg ring-1 ring-gray-200 dark:ring-gray-700">
                <img
                  src={about.imageUrl}
                  alt="Maha Zainab"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="text-center lg:text-left space-y-1.5">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 font-academic">
                {about?.name}
              </h1>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {about?.degree}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {about?.instituteName}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {about?.email}
              </p>
            </div>
            <div className="flex justify-center lg:justify-start gap-2">
              <SocialLinksComp />
            </div>
          </div>

          {/* Right column — Bio */}
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-400">
                  About
                </h2>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
              </div>
              <div className="space-y-4 text-base leading-relaxed text-gray-600 dark:text-gray-300">
                <p>{about?.p1}</p>
                {about?.p2 && <p>{about?.p2}</p>}
                {about?.p3 && <p>{about?.p3}</p>}
                {about?.p4 && <p>{about?.p4}</p>}
              </div>
            </div>

            {/* Research interests tags */}
            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
                Research Interests
              </p>
              <div className="flex flex-wrap gap-2">
                {about?.researchAreas?.map((area) => (
                  <span
                    key={area}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 w-fit">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                Open to research collaborations
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
