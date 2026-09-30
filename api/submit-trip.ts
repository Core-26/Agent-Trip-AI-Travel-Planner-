export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const N8N_FORM_URL = 'https://deepika16.app.n8n.cloud/form/b7639d61-3e39-423f-936f-c75797d9fb9d';

  try {
    const { destination, travelDate, budget, tripDuration, travelStyle, travelers, specialNotes } = req.body || {};

    if (!destination || !travelDate || budget === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Destination, Travel Date, and Budget are required by the Agent Trip workflow.',
      });
    }

    const formData = new FormData();
    let enrichedDestination = destination;
    const extras: string[] = [];
    if (tripDuration) extras.push(`${tripDuration} days`);
    if (travelStyle) extras.push(`Style: ${travelStyle}`);
    if (travelers) extras.push(`Travelers: ${travelers}`);
    if (specialNotes) extras.push(`Notes: ${specialNotes}`);

    if (extras.length > 0) {
      enrichedDestination = `${destination} [${extras.join(', ')}]`;
    }

    formData.append('field-0', enrichedDestination);
    formData.append('field-1', String(travelDate));
    formData.append('field-2', String(budget));

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    const n8nResponse = await fetch(N8N_FORM_URL, {
      method: 'POST',
      body: formData,
      signal: controller.signal,
    });
    clearTimeout(timeout);

    let responseText = '';
    try {
      responseText = await n8nResponse.text();
    } catch {
      // ignore
    }

    return res.status(200).json({
      success: n8nResponse.ok,
      n8nStatus: n8nResponse.status,
      timestamp: new Date().toISOString(),
      submittedPayload: {
        destination,
        travelDate,
        budget,
        tripDuration,
        travelStyle,
        travelers,
        enrichedDestination,
      },
      n8nRawResponse: responseText,
    });
  } catch (error: any) {
    return res.status(502).json({
      success: false,
      error: error?.message || 'Failed to reach n8n workflow.',
    });
  }
}
