import { DayItinerary } from '../types';

export function generateCustomItinerary(
  destination: string,
  travelDateStr: string,
  budgetNumber: number,
  durationDays: number = 4
): {
  days: DayItinerary[];
  budgetBreakdown: { category: string; amountINR: number; percentage: number }[];
  packingTips: string[];
} {
  const destLower = destination.toLowerCase();
  const days: DayItinerary[] = [];

  const baseDate = travelDateStr ? new Date(travelDateStr) : new Date();

  // Determine destination theme
  const isBeach = destLower.includes('goa') || destLower.includes('beach') || destLower.includes('andaman') || destLower.includes('bali') || destLower.includes('kerala');
  const isMountain = destLower.includes('manali') || destLower.includes('ladakh') || destLower.includes('shimla') || destLower.includes('rishikesh') || destLower.includes('sikkim') || destLower.includes('himalaya');
  const isHeritage = destLower.includes('jaipur') || destLower.includes('rajasthan') || destLower.includes('udaipur') || destLower.includes('agra') || destLower.includes('varanasi') || destLower.includes('delhi');

  const perDayBudget = Math.round(budgetNumber / Math.max(1, durationDays));

  for (let i = 1; i <= durationDays; i++) {
    const curDate = new Date(baseDate);
    curDate.setDate(curDate.getDate() + (i - 1));
    const formattedDate = curDate.toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });

    if (i === 1) {
      days.push({
        dayNumber: 1,
        title: `Day 1 (${formattedDate}) — Arrival & Sunset Orientation`,
        morning: `Touch down at ${destination}. Check-in to accommodation and refresh after travel.`,
        afternoon: isBeach
          ? 'Stroll along the nearby shore, acclimatize to the tropical ocean breeze, and enjoy chilled coconut water.'
          : isMountain
          ? 'Acclimatization walk through the local town market and pine-lined pathways. Light hydration break.'
          : 'Check-in to heritage haveli or hotel, savoring a traditional welcome beverage and quiet rest.',
        evening: isBeach
          ? 'Catch a fiery sunset at a beachside shanti shack with grilled seafood and acoustic music.'
          : isMountain
          ? 'Evening dinner at a wood-fired pizza cafe in the old town with warm spiced tea.'
          : 'Sunset panoramic view from the local hilltop fortress, followed by authentic regional dinner.',
        budgetEstimate: `₹${Math.round(perDayBudget * 0.9).toLocaleString('en-IN')}`,
      });
    } else if (i === 2) {
      days.push({
        dayNumber: 2,
        title: `Day 2 (${formattedDate}) — Signature Cultural & Nature Highlights`,
        morning: isBeach
          ? 'Early morning dolphin spotting boat excursion or heritage church exploration before midday heat.'
          : isMountain
          ? 'Early departure for mountain pass excursion or alpine valley viewpoint trek.'
          : 'Guided morning heritage walk through landmark monuments, fort ramparts, and museum exhibits.',
        afternoon: isBeach
          ? 'Coastal lunch of Goan fish curry rice, followed by lounging under beach cabanas or boutique shopping.'
          : isMountain
          ? 'Riverside picnic or hearty local mountain thali; visit natural thermal hot springs or cedar shrines.'
          : 'Traditional artisan bazaar visit to observe block printing, gemstones, and handcrafted pottery.',
        evening: isBeach
          ? 'Bustling night flea market, live music club, or quiet candlelit beach dining.'
          : isMountain
          ? 'Stargazing by an outdoor campfire or relaxed evening at a live indie acoustic venue.'
          : 'Spectacular sound & light show projected onto ancient palace walls.',
        budgetEstimate: `₹${Math.round(perDayBudget * 1.1).toLocaleString('en-IN')}`,
      });
    } else if (i === 3) {
      days.push({
        dayNumber: 3,
        title: `Day 3 (${formattedDate}) — Off-the-Beaten-Track & Gastronomy`,
        morning: isBeach
          ? 'Kayaking through tranquil mangrove backwaters or exploring historic spice plantation estates.'
          : isMountain
          ? 'Forest trail hike to a secluded waterfall; fresh mountain air and photography stop.'
          : 'Early sunrise hot air balloon flight or photography walk along ornate lake pavilions.',
        afternoon: isBeach
          ? 'Farm-to-table lunch amidst spice groves, followed by artisanal bakery tastings.'
          : isMountain
          ? 'Visit to a cliffside monastery or local orchard estate; artisanal honey and cider sampling.'
          : 'Royal courtyard lunch with traditional folk music performances and royal thali spread.',
        evening: isBeach
          ? 'Catamaran sunset cruise along the coastline with refreshing twilight cocktails.'
          : isMountain
          ? 'Cozy alpine dinner featuring trout preparations or authentic regional momos and thukpa.'
          : 'Dinner on a candlelit terrace overlooking illuminated palace domes.',
        budgetEstimate: `₹${Math.round(perDayBudget * 1.05).toLocaleString('en-IN')}`,
      });
    } else {
      days.push({
        dayNumber: i,
        title: `Day ${i} (${formattedDate}) — Leisure Discovery & Souvenir Trail`,
        morning: 'Leisurely breakfast. Final visits to local viewpoints and scenic photography spots.',
        afternoon: 'Curated shopping for local specialties, handicrafts, spices, and artisan souvenirs.',
        evening: 'Farewell celebratory dinner at a top-rated panoramic restaurant; preparation for onward journey.',
        budgetEstimate: `₹${Math.round(perDayBudget * 0.95).toLocaleString('en-IN')}`,
      });
    }
  }

  // Budget breakdown proportions based on total budget
  const stay = Math.round(budgetNumber * 0.40);
  const food = Math.round(budgetNumber * 0.25);
  const activities = Math.round(budgetNumber * 0.20);
  const transport = Math.round(budgetNumber * 0.10);
  const reserve = budgetNumber - (stay + food + activities + transport);

  const budgetBreakdown = [
    { category: 'Accommodations & Stays', amountINR: stay, percentage: 40 },
    { category: 'Food & Culinary Experiences', amountINR: food, percentage: 25 },
    { category: 'Activities & Sightseeing', amountINR: activities, percentage: 20 },
    { category: 'Local Transit & Cabs', amountINR: transport, percentage: 10 },
    { category: 'Contingency & Shopping', amountINR: reserve, percentage: 5 },
  ];

  const packingTips = isBeach
    ? ['Breathable linen apparel & swimwear', 'SPF 50+ reef-friendly sunscreen', 'Waterproof phone pouch for watersports', 'Light insect repellent for dusk']
    : isMountain
    ? ['Layered thermal fleece & windbreaker', 'Sturdy trail footwear with good grip', 'UV-protection sunglasses for snow glare', 'Lip balm & high-altitude hydration flask']
    : ['Light cotton modest clothing for temple visits', 'Comfortable walking shoes for marble fort ramps', 'Sun hat and polarized eyewear', 'Small cash denominations for local artisans'];

  return { days, budgetBreakdown, packingTips };
}
