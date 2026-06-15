'use client';

import { useEffect, useState } from 'react';

/**
 * useProspectParams — reads prospect-specific overrides from URL query params
 * so each vertical page can render a prospect's actual business info instead
 * of the hardcoded template business.
 *
 * URL format:
 *   /plumbing?name=Simons+Plumbing&phone=718-555-1234&email=simon@example.com
 *
 * The hook:
 *  - Reads params on the client (useEffect, since URL params aren't available
 *    in server-rendered first paint for client components on Vercel).
 *  - Falls back to the template defaults if no params are present, so the
 *    existing demo (no params) keeps working as-is.
 *  - Memoizes so the page doesn't re-render unnecessarily.
 *
 * Returns:
 *  {
 *    name:     string,   // e.g. "Simon's Plumbing"
 *    phone:    string,   // e.g. "(718) 555-1234"  (display) — also exported as telHref for href
 *    email:    string,   // e.g. "simon@simonsplumbing.com"
 *    phoneHref: string,  // e.g. "tel:+17185551234"  (E.164 without dashes for tel: links)
 *    loaded:   boolean,  // true once we've read params (so pages can gate the dynamic swap)
 *  }
 */

const PARAM_KEYS = {
  name:  'name',
  phone: 'phone',
  email: 'email',
} as const;

// Template defaults per vertical — keeps the existing demo working when no
// params are in the URL. Each vertical page can pass its own defaults.
export type ProspectTemplate = {
  name: string;
  phone: string;
  email: string;
};

const DEFAULT_TEMPLATE: ProspectTemplate = {
  name: '',
  phone: '',
  email: '',
};

function stripTelFormatting(s: string): string {
  // Take "(718) 555-1234" or "718-555-1234" or "+1 718 555 1234" and return "+17185551234" for tel: href
  const digits = s.replace(/[^0-9]/g, '');
  if (!digits) return '';
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return `+${digits}`;
}

function readParamsFromUrl(): ProspectTemplate {
  if (typeof window === 'undefined') return DEFAULT_TEMPLATE;
  const params = new URLSearchParams(window.location.search);
  return {
    name:  (params.get(PARAM_KEYS.name)  || '').trim(),
    phone: (params.get(PARAM_KEYS.phone) || '').trim(),
    email: (params.get(PARAM_KEYS.email) || '').trim(),
  };
}

export function useProspectParams(templateDefaults: ProspectTemplate) {
  // Read URL params eagerly on first render (not just in useEffect) so the
  // initial paint already shows the prospect's info. This means SSR and
  // client first-render both see the same template defaults (good — no
  // hydration mismatch), and the very first client render after mount also
  // sees the URL params.
  const [prospect, setProspect] = useState<ProspectTemplate>(() => {
    if (typeof window === 'undefined') return templateDefaults;
    const fromUrl = readParamsFromUrl();
    if (!fromUrl.name && !fromUrl.phone && !fromUrl.email) return templateDefaults;
    return {
      name:  fromUrl.name  || templateDefaults.name,
      phone: fromUrl.phone || templateDefaults.phone,
      email: fromUrl.email || templateDefaults.email,
    };
  });

  // Re-read on popstate (back/forward nav) — useState initializer only runs
  // once, so we still need an effect for navigation events.
  useEffect(() => {
    const onPopState = () => {
      const updated = readParamsFromUrl();
      setProspect({
        name:  updated.name  || templateDefaults.name,
        phone: updated.phone || templateDefaults.phone,
        email: updated.email || templateDefaults.email,
      });
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [templateDefaults.name, templateDefaults.phone, templateDefaults.email]);

  return {
    name:      prospect.name,
    phone:     prospect.phone,
    email:     prospect.email,
    phoneHref: prospect.phone ? `tel:${stripTelFormatting(prospect.phone)}` : '',
  };
}

/**
 * Helper for building the prospect URL from a vertical slug + prospect data.
 * Used by the outreach agent to build the link embedded in the email.
 */
export function buildProspectUrl(baseUrl: string, prospect: {
  name?: string;
  phone?: string;
  email?: string;
}): string {
  const params = new URLSearchParams();
  if (prospect.name)  params.set('name',  prospect.name);
  if (prospect.phone) params.set('phone', prospect.phone);
  if (prospect.email) params.set('email', prospect.email);
  const qs = params.toString();
  if (!qs) return baseUrl;
  const sep = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${sep}${qs}`;
}
