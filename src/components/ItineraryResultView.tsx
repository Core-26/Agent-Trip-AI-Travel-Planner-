import React, { useState } from 'react';
import {
  Calendar,
  IndianRupee,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  Copy,
  Printer,
  RotateCcw,
  Sun,
  Sunset,
  Moon,
  Luggage,
  PieChart,
  ExternalLink,
} from 'lucide-react';
import { SubmissionResponse, TripFormData } from '../types';
import { generateCustomItinerary } from '../utils/itineraryGenerator';

interface ItineraryResultViewProps {
  submission: SubmissionResponse;
  formData: TripFormData;
  onReset: () => void;
}

export const ItineraryResultView: React.FC<ItineraryResultViewProps> = ({
  submission,
  formData,
  onReset,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const budgetNum = Number(formData.budget) || 35000;
  const duration = formData.tripDuration || 4;

  const { days, budgetBreakdown, packingTips } = generateCustomItinerary(
    formData.destination,
    formData.travelDate,
    budgetNum,
    duration
  );

  const formattedDate = formData.travelDate
    ? new Date(formData.travelDate).toLocaleDateString('en-IN', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Upcoming Departure';

  const handleCopyItinerary = () => {
    const textPlan = `
AGENT TRIP - PERSONALIZED TRAVEL BLUEPRINT
Destination: ${formData.destination}
Travel Date: ${formattedDate}
Duration: ${duration} Days
Total Budget: ₹${budgetNum.toLocaleString('en-IN')}
Style: ${formData.travelStyle || 'Curated'}
Travelers: ${formData.travelers || 'Standard'}

BUDGET BREAKDOWN:
${budgetBreakdown.map((b) => `- ${b.category}: ₹${b.amountINR.toLocaleString('en-IN')} (${b.percentage}%)`).join('\n')}

DAY-BY-DAY ITINERARY:
${days
  .map(
    (d) => `
${d.title}
• Morning: ${d.morning}
• Afternoon: ${d.afternoon}
• Evening: ${d.evening}
• Day Budget: ${d.budgetEstimate}
`
  )
  .join('\n')}

PACKING ESSENTIALS:
${packingTips.map((tip) => `- ${tip}`).join('\n')}

Generated via Agent Trip n8n Workflow Automation
Submission Timestamp: ${submission.timestamp}
    `.trim();

    navigator.clipboard.writeText(textPlan);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-12 bg-neutral-50 min-h-screen">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Status Confirmation Banner */}
        <div className="mb-8 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-emerald-950 text-base">
                    Trip Plan Generated & Webhook Dispatched
                  </h3>
                  <span className="font-mono text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">
                    n8n HTTP {submission.n8nStatus || 200}
                  </span>
                </div>
                <p className="text-xs text-emerald-800 mt-1">
                  Sent to Deepika&apos;s n8n workflow at{' '}
                  <span className="font-mono">{new Date(submission.timestamp).toLocaleTimeString()}</span>.
                  Your personalized itinerary and expense breakdown are ready below.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={onReset}
                className="flex items-center gap-1.5 rounded-lg border border-emerald-300 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-900 transition hover:bg-emerald-50 active:scale-98"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Plan Another</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Dossier Card */}
        <div className="rounded-3xl border border-neutral-200 bg-white shadow-sm overflow-hidden print:border-none print:shadow-none">
          {/* Dossier Header */}
          <div className="border-b border-neutral-200 bg-neutral-900 px-6 py-8 text-white sm:px-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-orange-400 uppercase">
                  <span>Agent Trip Travel Plan</span>
                  <span aria-hidden="true">·</span>
                  <span>{duration} Days Exploration</span>
                </div>
                <h1 className="mt-1 font-display text-3xl font-bold sm:text-4xl text-white">
                  {formData.destination}
                </h1>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 print:hidden">
                <button
                  type="button"
                  onClick={handleCopyItinerary}
                  className="flex items-center gap-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 px-3.5 py-2 text-xs font-medium text-neutral-200 transition"
                  title="Copy travel plan to clipboard"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>{copied ? 'Copied!' : 'Copy Itinerary'}</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 rounded-lg bg-white hover:bg-neutral-100 px-3.5 py-2 text-xs font-semibold text-neutral-900 transition"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>Print Plan</span>
                </button>
              </div>
            </div>

            {/* Key Trip Parameters Banner */}
            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-neutral-800 pt-6 sm:grid-cols-4 text-xs">
              <div>
                <span className="text-neutral-400 block mb-0.5">Departure Date</span>
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-orange-400" />
                  {formattedDate}
                </span>
              </div>
              <div>
                <span className="text-neutral-400 block mb-0.5">Budget Allocated</span>
                <span className="font-semibold text-white flex items-center gap-1.5 font-mono">
                  <IndianRupee className="h-3.5 w-3.5 text-orange-400" />
                  ₹{budgetNum.toLocaleString('en-IN')}
                </span>
              </div>
              <div>
                <span className="text-neutral-400 block mb-0.5">Travel Pace</span>
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-orange-400" />
                  {formData.travelStyle || 'Relaxed & Leisure'}
                </span>
              </div>
              <div>
                <span className="text-neutral-400 block mb-0.5">Travelers</span>
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-orange-400" />
                  {formData.travelers || 'Couple / Duo'}
                </span>
              </div>
            </div>
          </div>

          {/* Dossier Body */}
          <div className="p-6 sm:p-10 space-y-10">
            {/* 1. Day-by-Day Itinerary Navigator */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl font-bold text-neutral-950 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-orange-600" />
                  <span>Curated Day-by-Day Schedule</span>
                </h2>
                <span className="text-xs text-neutral-500 font-medium">
                  {days.length} Days Planned
                </span>
              </div>

              {/* Day Selector Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {days.map((day, idx) => (
                  <button
                    key={day.dayNumber}
                    type="button"
                    onClick={() => setActiveDayIndex(idx)}
                    className={`shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition ${
                      activeDayIndex === idx
                        ? 'bg-neutral-900 text-white shadow-sm'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    Day {day.dayNumber}
                  </button>
                ))}
              </div>

              {/* Active Day Detail Card */}
              {days[activeDayIndex] && (
                <div className="mt-4 rounded-2xl border border-neutral-200 bg-neutral-50/50 p-6 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200 pb-3">
                    <h3 className="font-display text-lg font-bold text-neutral-900">
                      {days[activeDayIndex].title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-600">
                      <span>Est. Daily Spend:</span>
                      <strong className="text-neutral-900 font-bold">{days[activeDayIndex].budgetEstimate}</strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Morning */}
                    <div className="rounded-xl border border-neutral-200/80 bg-white p-4 shadow-2xs">
                      <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase mb-2">
                        <Sun className="h-4 w-4 text-amber-500" />
                        <span>Morning</span>
                      </div>
                      <p className="text-xs leading-relaxed text-neutral-700">
                        {days[activeDayIndex].morning}
                      </p>
                    </div>

                    {/* Afternoon */}
                    <div className="rounded-xl border border-neutral-200/80 bg-white p-4 shadow-2xs">
                      <div className="flex items-center gap-2 text-xs font-semibold text-orange-700 uppercase mb-2">
                        <Sunset className="h-4 w-4 text-orange-500" />
                        <span>Afternoon</span>
                      </div>
                      <p className="text-xs leading-relaxed text-neutral-700">
                        {days[activeDayIndex].afternoon}
                      </p>
                    </div>

                    {/* Evening */}
                    <div className="rounded-xl border border-neutral-200/80 bg-white p-4 shadow-2xs">
                      <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 uppercase mb-2">
                        <Moon className="h-4 w-4 text-indigo-500" />
                        <span>Evening</span>
                      </div>
                      <p className="text-xs leading-relaxed text-neutral-700">
                        {days[activeDayIndex].evening}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Budget Allocation Strategy */}
            <div className="border-t border-neutral-200 pt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl font-bold text-neutral-950 flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-orange-600" />
                  <span>Strategic Budget Allocation (₹{budgetNum.toLocaleString('en-IN')})</span>
                </h2>
                <span className="text-xs text-neutral-500">
                  Recommended Proportions
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {budgetBreakdown.map((item) => (
                  <div
                    key={item.category}
                    className="rounded-xl border border-neutral-200 bg-neutral-50/70 p-4"
                  >
                    <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
                      <span>{item.percentage}%</span>
                    </div>
                    <p className="font-display text-base font-bold text-neutral-900 font-mono">
                      ₹{item.amountINR.toLocaleString('en-IN')}
                    </p>
                    <p className="text-xs text-neutral-600 mt-1 leading-snug">
                      {item.category}
                    </p>
                    <div className="w-full bg-neutral-200 h-1.5 rounded-full mt-3 overflow-hidden">
                      <div
                        className="bg-orange-600 h-full rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Packing & Preparedness Essentials */}
            <div className="border-t border-neutral-200 pt-8">
              <h2 className="font-display text-xl font-bold text-neutral-950 flex items-center gap-2 mb-4">
                <Luggage className="h-5 w-5 text-orange-600" />
                <span>Destination Packing & Travel Essentials</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {packingTips.map((tip, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 rounded-xl border border-neutral-200 bg-white p-3.5 text-xs text-neutral-700"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Workflow Audit & Receipt */}
            <div className="border-t border-neutral-200 pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-500">
              <div>
                <span>Triggered n8n Cloud Webhook: </span>
                <code className="font-mono text-neutral-800 bg-neutral-100 px-1.5 py-0.5 rounded">
                  https://deepika16.app.n8n.cloud/form/b7639d61...
                </code>
              </div>
              <a
                href="https://deepika16.app.n8n.cloud/form/b7639d61-3e39-423f-936f-c75797d9fb9d"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 font-medium"
              >
                <span>Live n8n Form Endpoint</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
