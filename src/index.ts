/**
 * Safely opens a URL in a new window, automatically upgrading http to https if needed.
 *
 * @param {string} url - The URL to open.
 * @param {string} [target='_blank'] - The target window (e.g., '_blank', '_self').
 * @param {string} [features] - Optional features for window.open.
 * @returns A WindowProxy object or null/undefined.
 */
export default function safeOpen(
  url?: string,
  target = '_blank',
  features?: string,
): WindowProxy | null | undefined {
  /* istanbul ignore if -- @preserve */
  if (typeof window === 'undefined' || typeof window.open !== 'function') {
    return;
  }
  if (!url || typeof url !== 'string') {
    return;
  }
  const currentProtocol = window.location.protocol;
  const isHttps = currentProtocol === 'https:';

  const normalizedUrl =
    isHttps && url.startsWith('http://')
      ? url.replace(/^http:/, 'https:')
      : url;

  return window.open(normalizedUrl, target, features);
}
