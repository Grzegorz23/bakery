require('@testing-library/jest-dom');

import { TextEncoder, TextDecoder } from 'util';

if (typeof global.TextEncoder === 'undefined') {
  // @ts-ignore
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  // @ts-ignore
  global.TextDecoder = TextDecoder;
}

// Mock IntersectionObserver for Jest/jsdom
if (typeof window.IntersectionObserver === 'undefined') {
  class IntersectionObserver {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() { return []; }
  }
  // @ts-ignore
  window.IntersectionObserver = IntersectionObserver;
  // @ts-ignore
  global.IntersectionObserver = IntersectionObserver;
}
