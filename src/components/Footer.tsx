import React from 'react';
import { ArrowUp, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenInspector: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInspector }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-200 bg-white py-12 text-neutral-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-neutral-100">
          <div>
            <a
              href="/"
              className="font-display text-lg font-bold tracking-tight text-neutral-950"
            >
              Agent Trip
            </a>
            <p className="mt-1 text-xs text-neutral-500 max-w-md">
              Autonomous travel planning website powered by Agent Trip on n8n Cloud. Designed for rapid itinerary generation, realistic budget estimation in INR (₹), and day-by-day travel structuring.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium">
            <a href="#planner" className="hover:text-neutral-950 transition">
              Trip Planner
            </a>
            <a href="#destinations" className="hover:text-neutral-950 transition">
              Destinations
            </a>
            <a href="#workflow" className="hover:text-neutral-950 transition">
              Workflow Architecture
            </a>
            <button
              type="button"
              onClick={onOpenInspector}
              className="hover:text-neutral-950 transition text-left"
            >
              n8n Specifications
            </button>
            <a
              href="https://deepika16.app.n8n.cloud/form/b7639d61-3e39-423f-936f-c75797d9fb9d"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 transition"
            >
              <span>n8n Cloud Webhook</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} Agent Trip. Form automation connected to Deepika&apos;s n8n workflow.</p>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1 text-neutral-500 hover:text-neutral-900 transition self-start sm:self-auto"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
