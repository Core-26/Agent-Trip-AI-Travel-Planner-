import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  n8nStatus: 'checking' | 'online' | 'offline';
  onOpenInspector: () => void;
  onScrollToPlanner: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  n8nStatus,
  onOpenInspector,
  onScrollToPlanner,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/80 bg-white/90 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          className="font-display text-xl font-bold tracking-tight text-neutral-950 transition hover:text-neutral-800"
        >
          Agent Trip
        </a>

        {/* Zone 2: 4-6 text navigation links */}
        <nav className="hidden items-center gap-8 text-sm font-medium text-neutral-600 md:flex">
          <a
            href="#planner"
            className="transition hover:text-neutral-950"
          >
            Planner
          </a>
          <a
            href="#destinations"
            className="transition hover:text-neutral-950"
          >
            Destinations
          </a>
          <a
            href="#workflow"
            className="transition hover:text-neutral-950"
          >
            How It Works
          </a>
          <button
            type="button"
            onClick={onOpenInspector}
            className="text-left transition hover:text-neutral-950"
          >
            Workflow Specs
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenInspector}
            className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-medium text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-100"
            title="Inspect connected n8n cloud automation"
          >
            <span
              className={`h-2 w-2 rounded-full ${
                n8nStatus === 'online'
                  ? 'bg-emerald-500 ring-2 ring-emerald-200'
                  : n8nStatus === 'checking'
                  ? 'bg-amber-400 animate-pulse'
                  : 'bg-rose-500'
              }`}
            />
            <span className="hidden sm:inline">n8n Live Cloud</span>
            <span className="sm:hidden">n8n</span>
          </button>

          <button
            type="button"
            onClick={onScrollToPlanner}
            className="flex items-center gap-1.5 rounded-lg bg-neutral-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-neutral-800 active:scale-98 whitespace-nowrap"
          >
            <span>Plan My Trip</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
