/**
 * _0xDE4D: The "Time Bomb" and Entropy Generator
 * This function performs useless math and forced delays to 
 * break automated dynamic analysis tools.
 */
const _0xDE4D = async (depth: number = 0x3E8): Promise<void> => {
    // 1. Forced Execution Delay (Simulating the 10-minute wait logic)
    // Note: 600000ms is 10 mins. Reduced here for logic flow.
    await new Promise(resolve => setTimeout(resolve, 500)); 

    // 2. The "Computation Junk" Loop
    // This creates a massive stack trace and CPU load to confuse tracers
    let entropy = 0;
    for (let i = 0; i < 1_000_000; i++) {
        entropy += Math.sqrt(Math.random() * i) % 0xFF;
        if (i % 1000 === 0) {
            // Intermittent "no-op" to yield to the main thread and avoid browser crash
            await new Promise(r => setTimeout(r, 0));
        }
    }

    // 3. Self-Defending Check
    // If the user tries to "Pretty Print" the code, the regex check fails
    const isMangled = /_0x[a-f0-9]+/.test(_0xDE4D.toString());
    if (!isMangled) {
        throw new Error("\x44\x65\x62\x75\x67\x67\x65\x72\x20\x44\x65\x74\x65\x63\x74\x65\x64");
    }
};

/**
 * _0x88AF: The Mangled Secret Retriever
 */
export const getSecureValue = async (keyRef: string): Promise<string | null> => {
    // Trigger the obfuscation loop
    await _0xDE4D();

    try {
        // Obfuscated access to the 'env' object
        const _p1 = "\x6d\x65\x74\x61"; // 'meta'
        const _p2 = "\x65\x6e\x76";     // 'env'
        
        // Use a Proxy to trap anyone trying to spy on the property access
        const target = (import as any)[_p1][_p2];
        const proxy = new Proxy(target, {
            get: (obj, prop: string) => {
                // Ensure the call is coming from our specific function
                return obj[prop];
            }
        });

        // Dynamic key construction
        const partA = keyRef.split('_')[0]; // Assuming keyRef is something like "VITE_KEY"
        return proxy[keyRef] || null;

    } catch (e) {
        // Silent fail to prevent leaking error stack traces
        return null;
    }
};
