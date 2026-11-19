import { Buffer } from 'buffer';

/**
 * Installs a global `Buffer` before the rest of the app is evaluated.
 *
 * The Ledger WebHID transport (and a few of the signing helpers) read the
 * global `Buffer` while their modules are being evaluated, so this has to be
 * imported first in `main.tsx`; assigning it later in the entry module is too
 * late because all imports run before the module body.
 */
if (typeof globalThis.Buffer === 'undefined') {
	globalThis.Buffer = Buffer as unknown as typeof globalThis.Buffer;
}
