export default async function handler(req: any, res: any) {
  const N8N_FORM_URL = 'https://deepika16.app.n8n.cloud/form/b7639d61-3e39-423f-936f-c75797d9fb9d';
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const response = await fetch(N8N_FORM_URL, {
      method: 'GET',
      signal: controller.signal,
    });
    clearTimeout(timeout);

    return res.status(200).json({
      online: response.ok,
      statusCode: response.status,
      formTitle: 'Agent Trip – Travel Planner',
      n8nUrl: N8N_FORM_URL,
    });
  } catch (err: any) {
    return res.status(200).json({
      online: false,
      error: err?.message || 'Connection failed',
      n8nUrl: N8N_FORM_URL,
    });
  }
}
