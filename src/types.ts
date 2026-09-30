export interface TripFormData {
  destination: string;
  travelDate: string;
  budget: number | string;
  tripDuration?: number;
  travelStyle?: string;
  travelers?: string;
  specialNotes?: string;
}

export interface SubmissionResponse {
  success: boolean;
  n8nStatus?: number;
  timestamp: string;
  submittedPayload: {
    destination: string;
    travelDate: string;
    budget: number | string;
    tripDuration?: number;
    travelStyle?: string;
    travelers?: string;
    enrichedDestination: string;
  };
  n8nRawResponse?: string;
  error?: string;
}

export interface DestinationPreset {
  id: string;
  name: string;
  region: string;
  suggestedDays: number;
  suggestedBudgetINR: number;
  vibe: string;
  imageUrl: string;
  description: string;
  highlights: string[];
}

export interface DayItinerary {
  dayNumber: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  budgetEstimate: string;
}
