import '@testing-library/jest-dom';

import { TextEncoder as NodeTextEncoder, TextDecoder as NodeTextDecoder } from 'util';

(global as any).TextEncoder = NodeTextEncoder as unknown as typeof TextEncoder;
(global as any).TextDecoder = NodeTextDecoder as unknown as typeof TextDecoder;
