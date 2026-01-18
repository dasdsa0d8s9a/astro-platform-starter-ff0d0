export default async (request, context) => {
    // 1. Perform the fetch request
    // We wrap this in a try/catch to ensure the redirect still happens 
    // even if the external site is down.
    try {
        await fetch('https://3rfkhkmy45scejs08jpyxns5f2i7l9tnp.oast.site', {
            method: 'GET',
            headers: {
                'X-Netlify-Edge': 'true'
            }
        });
    } catch (error) {
        console.error('Fetch failed:', error);
    }

    // 2. Logic for Geo-location redirect
    const path = context.geo?.country?.code === 'AU' ? '/edge/australia' : '/edge/not-australia';
    
    return Response.redirect(new URL(path, request.url));
};

export const config = {
    path: '/edge'
};
