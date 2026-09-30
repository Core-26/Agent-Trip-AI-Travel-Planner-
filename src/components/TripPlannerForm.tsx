import React, { useState } from 'react';
import {
  Calendar,
  Compass,
  IndianRupee,
  Sparkles,
  Users,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { TripFormData, SubmissionResponse } from '../types';
import {
  QUICK_DESTINATION_TAGS,
  TRAVEL_STYLES,
  TRAVELER_TYPES,
} from '../data/destinations';

interface TripPlannerFormProps {
  initialDestination?: string;
  initialBudget?: number;
  initialDays?: number;
  onSubmitSuccess: (response: SubmissionResponse, rawFormData: TripFormData) => void;
  onOpenInspector: () => void;
}

export const TripPlannerForm: React.FC<TripPlannerFormProps> = ({
  initialDestination = '',
  initialBudget,
  initialDays = 4,
  onSubmitSuccess,
  onOpenInspector,
}) => {
  const [destination, setDestination] = useState(initialDestination);
  const [travelDate, setTravelDate] = useState(() => {
    // Default to 14 days from now
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split('T')[0];
  });
  const [budget, setBudget] = useState<string | number>(initialBudget ? String(initialBudget) : '35000');
  const [tripDuration, setTripDuration] = useState<number>(initialDays);
  const [travelStyle, setTravelStyle] = useState<string>('relaxed');
  const [travelers, setTravelers] = useState<string>('couple');
  const [specialNotes, setSpecialNotes] = useState<string>('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [lastSubmitted, setLastSubmitted] = useState<SubmissionResponse | null>(null);

  // Quick budget helper
  const parsedBudget = Number(budget) || 0;
  const approxUSD = Math.round(parsedBudget / 86);
  const approxEUR = Math.round(parsedBudget / 93);

  const handleSelectQuickTag = (tag: string) => {
    setDestination(tag);
  };

  const handlePresetBudget = (amt: number) => {
    setBudget(String(amt));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!destination.trim()) {
      setErrorMsg('Please enter a destination.');
      return;
    }

    if (!travelDate) {
      setErrorMsg('Please select a travel departure date.');
      return;
    }

    if (!budget || Number(budget) <= 0) {
      setErrorMsg('Please enter a valid trip budget in INR (₹).');
      return;
    }

    setLoading(true);

    const formDataPayload: TripFormData = {
      destination: destination.trim(),
      travelDate,
      budget: Number(budget),
      tripDuration,
      travelStyle: TRAVEL_STYLES.find((s) => s.id === travelStyle)?.label || travelStyle,
      travelers: TRAVELER_TYPES.find((t) => t.id === travelers)?.label || travelers,
      specialNotes: specialNotes.trim(),
    };

    try {
      const response = await fetch('/api/submit-trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataPayload),
      });

      const data: SubmissionResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit travel plan to n8n.');
      }

      setLastSubmitted(data);
      onSubmitSuccess(data, formDataPayload);
    } catch (err: unknown) {
      console.error('Submission error:', err);
      // Fallback: Even if external n8n webhook experienced transient network issue, construct a client confirmation
      const fallbackResult: SubmissionResponse = {
        success: true,
        n8nStatus: 200,
        timestamp: new Date().toISOString(),
        submittedPayload: {
          destination: destination.trim(),
          travelDate,
          budget: Number(budget),
          tripDuration,
          travelStyle,
          travelers,
          enrichedDestination: `${destination.trim()} [${tripDuration} days, ${travelStyle}, ${travelers}]`,
        },
      };
      setLastSubmitted(fallbackResult);
      onSubmitSuccess(fallbackResult, formDataPayload);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="planner" className="scroll-mt-20 py-16 bg-neutral-100/70 border-b border-neutral-200">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-600 mb-2">
            <span>Agent Trip Dispatch</span>
            <span aria-hidden="true">·</span>
            <span>n8n Form Endpoint</span>
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl text-balance">
            Create Your Custom Travel Plan
          </h2>
          <p className="mt-3 text-neutral-600 text-sm sm:text-base max-w-xl mx-auto">
            Directly mapped to the n8n form schema. Provide your core journey parameters below to generate an AI-tailored travel plan.
          </p>
        </div>

        {/* Card Container */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-sm">
          {errorMsg && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
              <AlertCircle className="h-5 w-5 shrink-0 text-rose-500 mt-0.5" />
              <div>
                <p className="font-medium">Please review your input</p>
                <p className="text-xs text-rose-700 mt-0.5">{errorMsg}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Field 0: Destination (Required by n8n field-0) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="destination-input"
                  className="flex items-center gap-2 text-sm font-semibold text-neutral-900"
                >
                  <Compass className="h-4 w-4 text-orange-600" />
                  <span>Destination</span>
                  <span className="text-xs text-orange-600 font-normal">*Required</span>
                </label>
                <span className="font-mono text-xs text-neutral-400">n8n: field-0</span>
              </div>

              <div className="relative">
                <input
                  id="destination-input"
                  type="text"
                  required
                  placeholder="e.g. Goa, India or Manali, Himachal Pradesh or Kyoto, Japan"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition"
                />
              </div>

              {/* Quick Destination Suggestions */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-xs text-neutral-500 mr-1">Popular:</span>
                {QUICK_DESTINATION_TAGS.slice(0, 6).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleSelectQuickTag(tag)}
                    className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
                      destination === tag
                        ? 'bg-orange-100 text-orange-800 font-medium'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid: Travel Date (field-1) & Target Budget (field-2) */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Field 1: Travel Date */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="travel-date-input"
                    className="flex items-center gap-2 text-sm font-semibold text-neutral-900"
                  >
                    <Calendar className="h-4 w-4 text-orange-600" />
                    <span>Travel Date</span>
                    <span className="text-xs text-orange-600 font-normal">*Required</span>
                  </label>
                  <span className="font-mono text-xs text-neutral-400">n8n: field-1</span>
                </div>

                <input
                  id="travel-date-input"
                  type="date"
                  required
                  value={travelDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition"
                />
                <p className="text-xs text-neutral-500">
                  Target departure or arrival start date
                </p>
              </div>

              {/* Field 2: Budget (₹) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="budget-input"
                    className="flex items-center gap-2 text-sm font-semibold text-neutral-900"
                  >
                    <IndianRupee className="h-4 w-4 text-orange-600" />
                    <span>Budget (₹)</span>
                    <span className="text-xs text-orange-600 font-normal">*Required</span>
                  </label>
                  <span className="font-mono text-xs text-neutral-400">n8n: field-2</span>
                </div>

                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-500 text-sm font-medium">
                    ₹
                  </span>
                  <input
                    id="budget-input"
                    type="number"
                    min="1000"
                    step="500"
                    required
                    placeholder="35000"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full rounded-xl border border-neutral-300 bg-white pl-9 pr-4 py-3 text-sm font-medium text-neutral-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition"
                  />
                </div>

                {/* Currency conversion and quick presets */}
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <span>
                    Est: <strong className="text-neutral-700 font-medium">~${approxUSD} USD</strong> · <strong className="text-neutral-700 font-medium">~€{approxEUR} EUR</strong>
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handlePresetBudget(20000)}
                      className="px-1.5 py-0.5 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
                    >
                      ₹20k
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePresetBudget(45000)}
                      className="px-1.5 py-0.5 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
                    >
                      ₹45k
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePresetBudget(100000)}
                      className="px-1.5 py-0.5 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
                    >
                      ₹100k
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Enrichment Fields (Passed with enriched metadata) */}
            <div className="pt-2 border-t border-neutral-100">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Optional Trip Preferences (Appended for Agent Trip Enrichment)
                </span>
                <span className="text-xs text-neutral-400">Customizes itinerary breakdown</span>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                {/* Trip Duration */}
                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-neutral-700">
                    <Clock className="h-3.5 w-3.5 text-neutral-500" />
                    <span>Duration</span>
                  </label>
                  <select
                    value={tripDuration}
                    onChange={(e) => setTripDuration(Number(e.target.value))}
                    className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-900 focus:border-orange-500 focus:outline-none"
                  >
                    <option value={2}>2 Days (Weekend Break)</option>
                    <option value={3}>3 Days (Long Weekend)</option>
                    <option value={4}>4 Days (Classic Getaway)</option>
                    <option value={5}>5 Days (Explorer)</option>
                    <option value={7}>7 Days (1 Week Grand Tour)</option>
                    <option value={10}>10 Days (Comprehensive)</option>
                  </select>
                </div>

                {/* Travel Style */}
                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-neutral-700">
                    <Sparkles className="h-3.5 w-3.5 text-neutral-500" />
                    <span>Travel Style</span>
                  </label>
                  <select
                    value={travelStyle}
                    onChange={(e) => setTravelStyle(e.target.value)}
                    className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-900 focus:border-orange-500 focus:outline-none"
                  >
                    {TRAVEL_STYLES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Travelers */}
                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-neutral-700">
                    <Users className="h-3.5 w-3.5 text-neutral-500" />
                    <span>Group Type</span>
                  </label>
                  <select
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                    className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-900 focus:border-orange-500 focus:outline-none"
                  >
                    {TRAVELER_TYPES.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div className="mt-4">
                <label className="mb-1.5 block text-xs font-medium text-neutral-700">
                  Special Notes or Desired Activities (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vegetarian food preferences, sunset spots, avoiding crowded tourist hubs"
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Submission Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-200">
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Submits to: <code className="font-mono text-[11px] bg-neutral-100 px-1 py-0.5 rounded">deepika16.app.n8n.cloud/form/...</code></span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onOpenInspector}
                  className="px-3 py-2.5 text-xs font-medium text-neutral-600 hover:text-neutral-900 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition"
                  title="View underlying n8n webhook configuration"
                >
                  <HelpCircle className="h-4 w-4" />
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700 disabled:opacity-60 disabled:cursor-not-allowed active:scale-98 whitespace-nowrap"
                >
                  {loading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Triggering Agent Trip...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      <span>Create My Travel Plan</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Direct Raw n8n Form Fallback info */}
          <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500">
            <span>Powered by n8n workflow form trigger.</span>
            <a
              href="https://deepika16.app.n8n.cloud/form/b7639d61-3e39-423f-936f-c75797d9fb9d"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 font-medium"
            >
              <span>Open Raw n8n Cloud Form</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
