import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

const N8N_FORM_URL = 'https://deepika16.app.n8n.cloud/form/b7639d61-3e39-423f-936f-c75797d9fb9d';

// Health check and n8n webhook status
app.get('/api/check-n8n-status', async (_req: Request, res: Response) => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const response = await fetch(N8N_FORM_URL, {
      method: 'GET',
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (response.ok) {
      res.json({
        online: true,
        statusCode: response.status,
        formTitle: 'Agent Trip – Travel Planner',
        n8nUrl: N8N_FORM_URL,
      });
    } else {
      res.json({
        online: false,
        statusCode: response.status,
        n8nUrl: N8N_FORM_URL,
      });
    }
  } catch (err: unknown) {
    res.json({
      online: false,
      error: err instanceof Error ? err.message : 'Connection failed',
      n8nUrl: N8N_FORM_URL,
    });
  }
});

// Trip submission endpoint - forwards to n8n webhook/form
app.post('/api/submit-trip', async (req: Request, res: Response) => {
  try {
    const { destination, travelDate, budget, tripDuration, travelStyle, travelers, specialNotes } = req.body;

    if (!destination || !travelDate || budget === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Destination, Travel Date, and Budget are required by the Agent Trip workflow.',
      });
    }

    // Build FormData matching Deepika's n8n form specifications:
    // field-0: Destination (enriched with details if provided)
    // field-1: Travel Date (YYYY-MM-DD)
    // field-2: Budget (₹)
    const formData = new FormData();
    
    // Enrich destination if user selected travel style/duration for better n8n AI trip generation
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

    const status = n8nResponse.status;
    let responseText = '';
    try {
      responseText = await n8nResponse.text();
    } catch {
      // ignore
    }

    return res.json({
      success: n8nResponse.ok,
      n8nStatus: status,
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
  } catch (error: unknown) {
    console.error('Error forwarding to n8n:', error);
    return res.status(502).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to reach n8n workflow.',
    });
  }
});

// Vite middleware in development or static serve in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Agent Trip server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
