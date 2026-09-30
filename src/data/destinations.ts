import { DestinationPreset } from '../types';
import coastalImg from '../assets/images/dest_tropical_coastal_1790762971171.jpg';
import mountainImg from '../assets/images/dest_himalayan_peaks_1790762983152.jpg';
import palaceImg from '../assets/images/dest_rajasthan_palace_1790762995776.jpg';

export const POPULAR_DESTINATIONS: DestinationPreset[] = [
  {
    id: 'goa-coastal',
    name: 'Goa, India',
    region: 'South Coast & Konkan',
    suggestedDays: 4,
    suggestedBudgetINR: 28000,
    vibe: 'Sun-drenched beaches, Portuguese colonial villas, and seaside dining',
    imageUrl: coastalImg,
    description: 'Golden sand shores along Morjim and Palolem, vibrant night markets, spice plantations, and fresh seafood shacks on the Arabian Sea.',
    highlights: ['Anjuna Flea Market & Sunset Cliffs', 'Old Goa Basilica & Fontainhas Latin Quarter', 'Watersports at Calangute & Baga', 'Spice Plantation Feast'],
  },
  {
    id: 'manali-himalayas',
    name: 'Manali & Solang Valley, Himachal Pradesh',
    region: 'Western Himalayas',
    suggestedDays: 5,
    suggestedBudgetINR: 35000,
    vibe: 'Pine-scented mountain air, snow vistas, and cedar forest trails',
    imageUrl: mountainImg,
    description: 'Alpine sanctuary framed by towering peaks, the Atal Tunnel crossing to Lahaul, hot sulphur springs of Vashisht, and riverside cafes in Old Manali.',
    highlights: ['Solang Valley adventure activities', 'Atal Tunnel drive to Sissu waterfall', 'Jogini Waterfall trek from Vashisht', 'Old Manali Apple Orchards & Cafes'],
  },
  {
    id: 'jaipur-rajasthan',
    name: 'Jaipur & Udaipur, Rajasthan',
    region: 'Royal Rajasthan',
    suggestedDays: 5,
    suggestedBudgetINR: 42000,
    vibe: 'Ornate sandstone palaces, desert sunsets, and royal heritage feasts',
    imageUrl: palaceImg,
    description: 'The storied Pink City, Amber Fort perched above Maota Lake, the Hawa Mahal wind facade, and sunset boat rides across Lake Pichola.',
    highlights: ['Amber Fort elephant paths & Sheesh Mahal', 'City Palace & Jantar Mantar observatory', 'Nahargarh Fort panoramic sunset views', 'Traditional Rajasthani thali at Chokhi Dhani'],
  },
];

export const QUICK_DESTINATION_TAGS = [
  'Goa, India',
  'Manali, Himachal Pradesh',
  'Jaipur, Rajasthan',
  'Kerala Backwaters (Alleppey)',
  'Leh Ladakh, India',
  'Rishikesh, Uttarakhand',
  'Udaipur, Rajasthan',
  'Darjeeling & Sikkim',
  'Andaman & Nicobar Islands',
  'Bali, Indonesia',
  'Dubai, UAE',
  'Kyoto, Japan',
];

export const TRAVEL_STYLES = [
  { id: 'relaxed', label: 'Relaxed & Leisure' },
  { id: 'adventure', label: 'Adventure & Outdoors' },
  { id: 'cultural', label: 'Heritage & Culture' },
  { id: 'foodie', label: 'Culinary & Nightlife' },
  { id: 'scenic', label: 'Nature & Scenic Roadtrips' },
];

export const TRAVELER_TYPES = [
  { id: 'solo', label: 'Solo Traveler' },
  { id: 'couple', label: 'Couple / Duo' },
  { id: 'family', label: 'Family with Kids' },
  { id: 'friends', label: 'Group of Friends' },
];
