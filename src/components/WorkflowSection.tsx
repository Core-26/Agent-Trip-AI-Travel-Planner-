import React from 'react';
import { GitBranch, Cpu, Database, Send, ExternalLink, CheckCircle } from 'lucide-react';

export const WorkflowSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Webhook & Form Ingestion',
      icon: GitBranch,
      desc: 'The n8n trigger listens on the dedicated cloud endpoint (/form/b7639d61...). Inputs are validated for Destination (field-0), Departure Date (field-1), and Target Budget in INR (field-2).',
    },
    {
      num: '02',
      title: 'Contextual Parameter Mapping',
      icon: Database,
      desc: 'Destination attributes, regional seasonality, currency conversion tables, and travel group pace are cross-referenced to compute daily budget ceilings across lodging, dining, and transit.',
    },
    {
      num: '03',
      title: 'Agent Trip Synthesis',
      icon: Cpu,
      desc: 'Agent nodes synthesize morning, afternoon, and twilight itineraries matching the traveler style, filtering out over-touristy bottlenecks and balancing travel distance.',
    },
    {
      num: '04',
      title: 'Plan Dispatch & Synchronization',
      icon: Send,
      desc: 'The execution response terminates with HTTP 200 and dispatches the travel dossier, complete with itemized expenditure estimates and packing checklists.',
    },
  ];

  return (
    <section id="workflow" className="scroll-mt-16 py-20 bg-neutral-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-400 mb-2">
            <span>Automation Architecture</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>n8n Cloud Workflow</span>
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance">
            How Agent Trip Orchestrates Your Journey
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-400">
            A seamless bridge between high-touch travel curation and modern workflow automation running 24/7 on n8n Cloud.
          </p>
        </div>

        {/* 4-Step Editorial Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-orange-500">
                      {step.num}
                    </span>
                    <Icon className="h-5 w-5 text-neutral-400" />
                  </div>
                  <h3 className="font-display text-base font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center gap-1.5 text-[11px] text-emerald-400">
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span>Production verified</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technical Callout Card */}
        <div className="mt-12 rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h4 className="font-display text-lg font-bold text-white">
              Direct Cloud Integration
            </h4>
            <p className="text-xs text-neutral-400 mt-1 max-w-xl">
              Connected to Deepika&apos;s active n8n cloud production form trigger. Submissions are delivered with zero intermediate data alteration.
            </p>
          </div>

          <a
            href="https://deepika16.app.n8n.cloud/form/b7639d61-3e39-423f-936f-c75797d9fb9d"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-3 text-xs font-semibold text-white transition hover:bg-orange-700 active:scale-98 whitespace-nowrap shrink-0"
          >
            <span>Inspect Webhook Form</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
