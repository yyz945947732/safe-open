import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import safeOpen from '../src/index';

const HTTP_URL = 'http://www.google.com/';
const HTTPS_URL = 'https://www.google.com/';

describe('safeOpen', () => {
  const originalLocation = window.location;

  beforeEach(() => {
    // @ts-ignore
    vi.spyOn(window, 'open').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalLocation,
    });
  });

  function mockProtocol(protocol) {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { protocol },
    });
  }

  it('should open https version when current page is https', () => {
    mockProtocol('https:');
    safeOpen(HTTP_URL);
    expect(window.open).toHaveBeenCalledWith(HTTPS_URL, '_blank', undefined);
  });

  it('should return undefined if url is not string', () => {
    expect(safeOpen('')).toBe(undefined);
    expect(safeOpen(undefined)).toBe(undefined);
    // @ts-expect-error
    expect(safeOpen(39)).toBe(undefined);
  });

  it('should keep original http when current page is http', () => {
    mockProtocol('http:');
    safeOpen(HTTP_URL);
    expect(window.open).toHaveBeenCalledWith(HTTP_URL, '_blank', undefined);
  });

  it('should not change url if already https', () => {
    mockProtocol('https:');
    safeOpen(HTTPS_URL);
    expect(window.open).toHaveBeenCalledWith(HTTPS_URL, '_blank', undefined);
  });

  it('should pass custom target and features', () => {
    mockProtocol('https:');
    safeOpen(HTTP_URL, '_self', 'noopener');
    expect(window.open).toHaveBeenCalledWith(HTTPS_URL, '_self', 'noopener');
  });
});
