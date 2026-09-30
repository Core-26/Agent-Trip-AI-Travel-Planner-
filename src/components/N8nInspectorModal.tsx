import React, { useState } from 'react';
import { X, ExternalLink, RefreshCw, CheckCircle2, AlertCircle, Copy, Terminal } from 'lucide-react';

interface N8nInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  n8nStatus: 'checking' | 'online' | 'offline';
  onRecheckStatus: () => void;
}

export const N8nInspectorModal: React.FC<N8nInspectorModalProps> = ({
  isOpen,
  onClose,
  n8nStatus,
  onRecheckStatus,
}) => {
  const [copied, setCopied] = useState(false);
  const n8nUrl = 'https://deepika16.app.n8n.cloud/form/b7639d61-3e39-423f-936f-c75797d9fb9d';

  if (!isOpen) return null;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(n8nUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-xs">
      <div className="w-full max-w-2xl rounded-2xl border border-neutral-200 bg-white shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4 bg-neutral-50">
          <div className="flex items-center gap-2.5">
            <Terminal className="h-5 w-5 text-orange-600" />
            <h3 className="font-display text-base font-bold text-neutral-900">
              n8n Automation Specifications
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-700 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Status Indicator */}
          <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-neutral-50 p-4">
            <div className="flex items-center gap-3">
              <span
                className={`h-3 w-3 rounded-full ${
                  n8nStatus === 'online'
                    ? 'bg-emerald-500 ring-4 ring-emerald-100'
                    : n8nStatus === 'checking'
                    ? 'bg-amber-400 animate-pulse'
                    : 'bg-rose-500 ring-4 ring-rose-100'
                }`}
              />
              <div>
                <p className="text-xs font-semibold text-neutral-900">
                  {n8nStatus === 'online'
                    ? 'n8n Cloud Webhook Online'
                    : n8nStatus === 'checking'
                    ? 'Checking Connection...'
                    : 'Webhook Offline or Unreachable'}
                </p>
                <p className="text-[11px] text-neutral-500">
                  Deepika&apos;s Agent Trip Cloud Cluster (Singapore region)
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onRecheckStatus}
              className="flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${n8nStatus === 'checking' ? 'animate-spin' : ''}`} />
              <span>Ping</span>
            </button>
          </div>

          {/* URL Box */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Production Webhook Endpoint URL
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={n8nUrl}
                className="w-full font-mono text-xs rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2 text-neutral-800"
              />
              <button
                type="button"
                onClick={handleCopyUrl}
                className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition shrink-0"
              >
                {copied ? 'Copied' : <Copy className="h-4 w-4" />}
              </button>
              <a
                href={n8nUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-orange-600 px-3 py-2 text-xs font-semibold text-white hover:bg-orange-700 transition shrink-0 flex items-center gap-1"
              >
                <span>Open</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Field Schema Table */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-700 mb-2">
              Form Trigger Data Contract (POST / FormData)
            </h4>
            <div className="rounded-xl border border-neutral-200 overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 font-semibold">
                  <tr>
                    <th className="px-3.5 py-2 font-mono">Field Key</th>
                    <th className="px-3.5 py-2">Label</th>
                    <th className="px-3.5 py-2">Type</th>
                    <th className="px-3.5 py-2">Required</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-neutral-700">
                  <tr>
                    <td className="px-3.5 py-2.5 font-mono text-neutral-900 font-medium">field-0</td>
                    <td className="px-3.5 py-2.5">Destination</td>
                    <td className="px-3.5 py-2.5 font-mono text-neutral-500">string</td>
                    <td className="px-3.5 py-2.5 text-emerald-600 font-medium">Yes</td>
                  </tr>
                  <tr>
                    <td className="px-3.5 py-2.5 font-mono text-neutral-900 font-medium">field-1</td>
                    <td className="px-3.5 py-2.5">Travel Date</td>
                    <td className="px-3.5 py-2.5 font-mono text-neutral-500">YYYY-MM-DD</td>
                    <td className="px-3.5 py-2.5 text-emerald-600 font-medium">Yes</td>
                  </tr>
                  <tr>
                    <td className="px-3.5 py-2.5 font-mono text-neutral-900 font-medium">field-2</td>
                    <td className="px-3.5 py-2.5">Budget (₹)</td>
                    <td className="px-3.5 py-2.5 font-mono text-neutral-500">number</td>
                    <td className="px-3.5 py-2.5 text-emerald-600 font-medium">Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Architectural Notes */}
          <div className="rounded-xl border border-neutral-200/80 bg-neutral-50 p-4 text-xs text-neutral-600 space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-neutral-800">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Full-Stack Proxy Architecture</span>
            </div>
            <p>
              Direct browser fetches to n8n forms from 3rd-party origins can encounter CORS constraints or iframe blocking (<code className="font-mono text-neutral-800">X-Frame-Options: SAMEORIGIN</code>). This web application features an Express proxy server route (<code className="font-mono text-neutral-800">/api/submit-trip</code>) that packages and transmits the exact FormData directly to the n8n Cloud endpoint, guaranteeing instantaneous HTTP 200 delivery.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-200 px-6 py-3.5 bg-neutral-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-neutral-900 px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-800 transition"
          >
            Close Specs
          </button>
        </div>
      </div>
    </div>
  );
};
