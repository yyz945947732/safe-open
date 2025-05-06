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
  if (typeof window === 'undefined') {
    console.warn('`safe-open` can only be used in a browser environment.');
    return;
  }
  if (!url || typeof url !== 'string') {
    return;
  }
  try {
    const currentProtocol = window.location.protocol;
    const isHttps = currentProtocol === 'https:';

    const normalizedUrl =
      isHttps && url.startsWith('http://')
        ? url.replace(/^http:/, 'https:')
        : url;

    return window.open(normalizedUrl, target, features);
  } catch (e) {
    console.error('Failed to open the URL:', e);
    return;
  }
}
