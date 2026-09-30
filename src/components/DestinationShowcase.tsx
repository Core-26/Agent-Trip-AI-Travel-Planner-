import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { POPULAR_DESTINATIONS } from '../data/destinations';
import { DestinationPreset } from '../types';

interface DestinationShowcaseProps {
  onSelectDestination: (preset: DestinationPreset) => void;
}

export const DestinationShowcase: React.FC<DestinationShowcaseProps> = ({
  onSelectDestination,
}) => {
  return (
    <section id="destinations" className="scroll-mt-16 py-20 bg-white border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-600 mb-2">
              <span>Curated Blueprints</span>
              <span aria-hidden="true" className="text-neutral-300">·</span>
              <span>1-Click Preset Planning</span>
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl text-balance">
              Featured Travel Inspirations
            </h2>
          </div>
          <p className="text-sm text-neutral-600 max-w-md">
            Click any curated destination to pre-populate the Agent Trip n8n planner with tested duration and budget allocations.
          </p>
        </div>

        {/* 3-Column Bento Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {POPULAR_DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              className="group flex flex-col rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-xs transition hover:shadow-md hover:border-neutral-300"
            >
              {/* Image Container with 4:3 Aspect Ratio */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                <img
                  src={dest.imageUrl}
                  alt={dest.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[11px] font-mono tracking-wider text-neutral-300 uppercase block">
                    {dest.region}
                  </span>
                  <h3 className="font-display text-lg font-bold text-white leading-tight">
                    {dest.name}
                  </h3>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  {/* Unboxed Metadata with · separator (Zero Pill Discipline) */}
                  <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium mb-2.5">
                    <span>{dest.suggestedDays} Days</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-neutral-800">
                      ₹{dest.suggestedBudgetINR.toLocaleString('en-IN')} Budget
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {dest.description}
                  </p>

                  {/* Highlights list */}
                  <div className="mt-4 pt-4 border-t border-neutral-100 space-y-1.5">
                    <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
                      Key Highlights
                    </span>
                    {dest.highlights.slice(0, 3).map((h, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs text-neutral-700">
                        <span className="text-orange-600 font-bold">•</span>
                        <span className="line-clamp-1">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <button
                  type="button"
                  onClick={() => onSelectDestination(dest)}
                  className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-neutral-900 py-2.5 px-4 text-xs font-semibold text-white transition hover:bg-neutral-800 active:scale-98"
                >
                  <Sparkles className="h-3.5 w-3.5 text-orange-400" />
                  <span>Use This Destination</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
