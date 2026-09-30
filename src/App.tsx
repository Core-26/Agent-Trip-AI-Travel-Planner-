import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TripPlannerForm } from './components/TripPlannerForm';
import { DestinationShowcase } from './components/DestinationShowcase';
import { WorkflowSection } from './components/WorkflowSection';
import { ItineraryResultView } from './components/ItineraryResultView';
import { N8nInspectorModal } from './components/N8nInspectorModal';
import { Footer } from './components/Footer';
import { DestinationPreset, SubmissionResponse, TripFormData } from './types';

export default function App() {
  const [n8nStatus, setN8nStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  
  // Trip submission result
  const [activeSubmission, setActiveSubmission] = useState<{
    response: SubmissionResponse;
    formData: TripFormData;
  } | null>(null);

  // Selected preset destination to fill form
  const [presetDestination, setPresetDestination] = useState<string>('');
  const [presetBudget, setPresetBudget] = useState<number | undefined>(undefined);
  const [presetDays, setPresetDays] = useState<number>(4);

  // Check n8n status on mount
  const checkN8nStatus = async () => {
    setN8nStatus('checking');
    try {
      const res = await fetch('/api/check-n8n-status');
      const data = await res.json();
      if (data.online) {
        setN8nStatus('online');
      } else {
        setN8nStatus('offline');
      }
    } catch {
      setN8nStatus('offline');
    }
  };

  useEffect(() => {
    checkN8nStatus();
  }, []);

  const handleScrollToPlanner = () => {
    // If viewing itinerary, reset to form
    if (activeSubmission) {
      setActiveSubmission(null);
    }
    setTimeout(() => {
      const element = document.getElementById('planner');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleSelectPreset = (preset: DestinationPreset) => {
    setPresetDestination(preset.name);
    setPresetBudget(preset.suggestedBudgetINR);
    setPresetDays(preset.suggestedDays);
    if (activeSubmission) {
      setActiveSubmission(null);
    }
    setTimeout(() => {
      const element = document.getElementById('planner');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleSubmitSuccess = (response: SubmissionResponse, formData: TripFormData) => {
    setActiveSubmission({ response, formData });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetItinerary = () => {
    setActiveSubmission(null);
    handleScrollToPlanner();
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 selection:bg-orange-500 selection:text-white">
      {/* 3-Zone Header Contract */}
      <Header
        n8nStatus={n8nStatus}
        onOpenInspector={() => setIsInspectorOpen(true)}
        onScrollToPlanner={handleScrollToPlanner}
      />

      <main className="flex-1">
        {activeSubmission ? (
          /* View Mode: Generated Dossier with Day-by-Day Itinerary */
          <ItineraryResultView
            submission={activeSubmission.response}
            formData={activeSubmission.formData}
            onReset={handleResetItinerary}
          />
        ) : (
          /* Landing & Planning Flow */
          <>
            <Hero
              onScrollToPlanner={handleScrollToPlanner}
              onOpenInspector={() => setIsInspectorOpen(true)}
            />

            <TripPlannerForm
              key={`${presetDestination}-${presetBudget}-${presetDays}`}
              initialDestination={presetDestination}
              initialBudget={presetBudget}
              initialDays={presetDays}
              onSubmitSuccess={handleSubmitSuccess}
              onOpenInspector={() => setIsInspectorOpen(true)}
            />

            <DestinationShowcase onSelectDestination={handleSelectPreset} />

            <WorkflowSection />
          </>
        )}
      </main>

      {/* Understated Footer */}
      <Footer onOpenInspector={() => setIsInspectorOpen(true)} />

      {/* Technical Workflow Inspector Modal */}
      <N8nInspectorModal
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
        n8nStatus={n8nStatus}
        onRecheckStatus={checkN8nStatus}
      />
    </div>
  );
}
