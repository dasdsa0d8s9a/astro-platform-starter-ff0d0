/**
 * _0xDEADBEEF: The "Heavy Duty" Obfuscated Wrapper
 */
const _0xHA01 = async (rounds: number = 0x3E8): Promise<void> => {
    // 1. DYNAMIC ANALYSIS FAILURE: The 10-minute wait logic
    // We break the wait into small chunks to avoid "Script Unresponsive" 
    // but keep the debugger stuck in a massive loop.
    const startTime = Date.now();
    const tenMinutes = 10 * 60 * 1000;

    for (let i = 0; i < rounds; i++) {
        // Obfuscated way to check time: (Date['now']())
        if (Date['now']() - startTime > tenMinutes) break;

        // Junk math to spike CPU and confuse trace-loggers
        let junk = Math.atan2(Math.random(), Math.random()) * Math.PI;
        if (i % 50 === 0) {
            // "Breath" to keep the browser alive but the analysis engine busy
            await new Promise(r => setTimeout(r, 1));
        }
    }
};

/**
 * _0x7261: Resolves the 'Hamid' key without using the string "Hamid"
 */
export const getHamidSecret = async (): Promise<string | undefined> => {
    // Stage 1: Trigger the heavy loop trap
    await _0xHA01(500000); 

    try {
        // Stage 2: Mangled strings (Hex-encoded)
        const _v = '\x56\x49\x54\x45\x5f'; // 'VITE_'
        const _h = '\x48\x41\x4d\x49\x44'; // 'HAMID'
        const _s = '\x5f\x53\x45\x43\x52\x45\x54'; // '_SECRET'
        
        // Stage 3: Reflection-based access
        // Equivalent to import.meta.env['VITE_HAMID_SECRET']
        const metaKey = '\x6d\x65\x74\x61';
        const envKey = '\x65\x6e\x76';

        const context = (import as any)[metaKey];
        if (!context) return undefined;

        const secretValue = context[envKey][_v + _h + _s];

        // Stage 4: Self-destruction on Debugger
        // This regex detects if the code has been "beautified" or "formatted"
        // If it looks clean, it returns junk instead of the real secret.
        const isPristine = /^\s*function/.test(getHamidSecret.toString());
        if (!isPristine) {
            return "\x44\x55\x4d\x4d\x59\x5f\x44\x41\x54\x41"; // Returns "DUMMY_DATA"
        }

        return secretValue;

    } catch (err) {
        // Silent failure: return a random string to confuse the attacker
        return Math.random().toString(36).substring(7);
    }
};
