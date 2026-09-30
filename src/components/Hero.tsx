import React from 'react';
import { ArrowDown, ExternalLink, Sparkles } from 'lucide-react';
import heroImg from '../assets/images/hero_travel_landscape_1790762959418.jpg';

interface HeroProps {
  onScrollToPlanner: () => void;
  onOpenInspector: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToPlanner,
  onOpenInspector,
}) => {
  return (
    <section className="relative overflow-hidden border-b border-neutral-200 bg-white">
      {/* Background Hero Image with measured scrim */}
      <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-24 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Editorial Value Proposition */}
          <div className="lg:col-span-7">
            {/* Clean unboxed text kicker */}
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-wider text-orange-600 uppercase">
              <span>Agent Trip Autonomous Engine</span>
              <span aria-hidden="true" className="text-neutral-300">·</span>
              <span>n8n Cloud Webhook Integrated</span>
            </div>

            <h1 className="font-display text-4xl font-extrabold tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl text-balance">
              Personalized Travel Plans Crafted in Seconds.
            </h1>

            <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg max-w-2xl">
              Connected directly to Agent Trip&apos;s n8n workflow. Enter your target destination, departure date, and budget in Indian Rupees (₹) to orchestrate an end-to-end travel itinerary with custom budget allocations and daily activities.
            </p>

            {/* Unboxed Metadata with subtle dot separators */}
            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
              <span>n8n Cloud Form Trigger</span>
              <span aria-hidden="true">·</span>
              <span>Dynamic Budget Calculator</span>
              <span aria-hidden="true">·</span>
              <span>Day-by-Day Roadmaps</span>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onScrollToPlanner}
                className="flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700 active:scale-98 whitespace-nowrap"
              >
                <span>Start Planning Now</span>
                <ArrowDown className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={onOpenInspector}
                className="flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-5 py-3.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 active:scale-98 whitespace-nowrap"
              >
                <span>View n8n Workflow Specs</span>
                <ExternalLink className="h-4 w-4 text-neutral-400" />
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5">
            <div className="group relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-100 shadow-md">
              <div className="aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10]">
                <img
                  src={heroImg}
                  alt="Scenic mountain landscape with turquoise alpine lake"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Scrim Overlay Card with real trip context */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/40 to-transparent p-5 text-white">
                <div className="flex items-center justify-between text-xs text-neutral-300">
                  <span className="font-mono text-[11px] tracking-wide uppercase">Active Pipeline</span>
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <Sparkles className="h-3 w-3" />
                    n8n Ready
                  </span>
                </div>
                <p className="mt-1 font-display text-lg font-bold text-white">
                  Agent Trip – Travel Planner
                </p>
                <p className="text-xs text-neutral-300 line-clamp-1">
                  Destination · Travel Date · Target Budget (₹)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
