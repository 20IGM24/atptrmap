(function() {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload"))
        return;
    for (const h of document.querySelectorAll('link[rel="modulepreload"]'))
        l(h);
    new MutationObserver(h=>{
        for (const _ of h)
            if (_.type === "childList")
                for (const E of _.addedNodes)
                    E.tagName === "LINK" && E.rel === "modulepreload" && l(E)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function r(h) {
        const _ = {};
        return h.integrity && (_.integrity = h.integrity),
        h.referrerPolicy && (_.referrerPolicy = h.referrerPolicy),
        h.crossOrigin === "use-credentials" ? _.credentials = "include" : h.crossOrigin === "anonymous" ? _.credentials = "omit" : _.credentials = "same-origin",
        _
    }
    function l(h) {
        if (h.ep)
            return;
        h.ep = !0;
        const _ = r(h);
        fetch(h.href, _)
    }
}
)();
const tu = [{
    id: "loot",
    iconName: "loot.svg",
    name: {
        en: "Loot",
        es: "Botín"
    },
    color: "#3e92d0",
    children: [{
        id: "ammo",
        iconName: "ammo.svg",
        name: {
            en: "Ammo",
            es: "Munición"
        }
    }, {
        id: "medic_kit",
        iconName: "medic_kit.svg",
        name: {
            en: "Medic kit",
            es: "Botiquín"
        }
    }, {
        id: "container",
        iconName: "container.svg",
        name: {
            en: "Container",
            es: "Contenedor"
        }
    }, {
        id: "purse",
        iconName: "purse.svg",
        name: {
            en: "Purse",
            es: "Monedero"
        }
    }, {
        id: "dead_body",
        iconName: "dead_body.svg",
        name: {
            en: "Dead body",
            es: "Cadáver"
        }
    }, {
        id: "blocked_resource_box",
        iconName: "blocked_resource_box.svg",
        name: {
            en: "Blocked Resource box",
            es: "Caja bloqueada"
        }
    }, {
        id: "blocked_access",
        iconName: "blocked_access.svg",
        name: {
            en: "Blocked access",
            es: "Accesos bloqueados"
        }
    }, {
        id: "depot",
        iconName: "depot.svg",
        name: {
            en: "Depot",
            es: "Almacén"
        }
    }, {
        id: "vault",
        iconName: "vault.svg",
        name: {
            en: "vault",
            es: "Bóveda"
        }
    }, {
        id: "hidden_stash",
        iconName: "hidden_stash.svg",
        name: {
            en: "Hidden stash",
            es: "Alijo oculto"
        }
    }]
}, {
    id: "extraction",
    iconName: "extraction.svg",
    name: {
        en: "Extraction",
        es: "Extracción"
    },
    color: "#facd45",
    children: [{
        id: "escape_pod",
        iconName: "escape_pod.svg",
        name: {
            en: "Escape pod",
            es: "Cápsula de escape"
        }
    }, {
        id: "airlock",
        iconName: "airlock.svg",
        name: {
            en: "Air lock",
            es: "Exclusa de aire"
        }
    }]
}, {
    id: "mission",
    iconName: "mission.svg",
    name: {
        en: "Mission",
        es: "Misión"
    },
    color: "#5db670",
    children: [{
        id: "zero_to_hero",
        iconName: "zero_to_hero.svg",
        name: {
            en: "Zero to hero",
            es: "De cero a héroe"
        }
    }, {
        id: "faction_mission",
        iconName: "faction_mission.svg",
        name: {
            en: "Faction mission",
            es: "Misión de facción"
        }
    }]
}, {
    id: "enemy",
    iconName: "enemy.svg",
    name: {
        en: "Enemy",
        es: "Enemigo"
    },
    color: "#d43c3c",
    children: [{
        id: "enemy_spawn",
        iconName: "enemy_spawn.svg",
        name: {
            en: "Enemy spawn",
            es: "Aparición de enemigos"
        }
    }, {
        id: "breach_pod",
        iconName: "breach_pod.svg",
        name: {
            en: "Breach pod",
            es: "Cápsula enemiga"
        }
    }]
}]
  , eu = [{
    id: "penal-colony",
    name: {
        en: "Penal Colony Beta 5",
        es: "Colonia Penal Beta 5"
    },
    alias: {
        en: "Prison",
        es: "Prisión"
    },
    cardImgSrc: "cardImg.png",
    mapImgSrc: "mapImg.svg",
    resolution: [2048, 1080],
    padding: "120px 65px 0px 400px",
    zoom: 1,
    minZoom: 1,
    maxZoom: 7,
    description: {
        en: "A self sufficient labour prison facility, a fortress filled with the most dangerous criminals in the galaxy.",
        es: "Una prisión de trabajo autosuficiente, una fortaleza llena de los criminales más peligrosos de la galaxia."
    }
}];
function gr() {
    return localStorage.hasOwnProperty("lang") ? localStorage.getItem("lang") : "en"
}
class lh {
    constructor(e, r, l) {
        this.mapConfig = e,
        this.tags = tu,
        this.rootPath = `../data/maps/${this.mapConfig.id}/`,
        this.mapPoints = r,
        this.mapLabels = l,
        this.lang = gr(),
        this.loadTags()
    }
    getFeaturesByLang(e) {
        return e.forEach(r=>{
            r.name = r.name[this.lang],
            r.hasOwnProperty("description") && (r.description = r.description[this.lang])
        }
        ),
        e
    }
    getAttributionsByLang() {
        return this.attributions[this.lang]
    }
    getRootPath() {
        return this.rootPath
    }
    getPoints() {
        return this.getFeaturesByLang(this.mapPoints)
    }
    getLabels() {
        return this.getFeaturesByLang(this.mapLabels)
    }
    getMapTags() {
        const e = [];
        return this.mapPoints.forEach(r=>{
            e.push(r.tag)
        }
        ),
        e
    }
    getTags() {
        const e = this.getMapTags();
        this.tags.forEach(r=>{
            r.children = r.children.filter(l=>e.includes(l.id))
        }
        ),
        this.tags = this.tags.filter(r=>r.children.length > 0)
    }
    loadTags() {
        this.getTags();
        const e = document.getElementById("tag-selector-content");
        e.innerHTML = this.generateTagSelector()
    }
    generateTagSelector() {
        let e = "";
        return this.tags.forEach(r=>{
            e = e + this.generateTagCard(r, r.children.map(l=>l))
        }
        ),
        e
    }
    generateTagCard(e, r) {
        let l = `<div style="border: 1px solid ${e.color}" class="mb-3 p-0 rounded">
    <div class="container-fluid p-0"><button type="button" class="btn selected btn-sm w-100 text-center tag-btn" style="border: 1px solid ${e.color}" value="${e.id}"><img class="me-2 tag-img" src="../data/icons/tags/${e.iconName}" alt="${e.name[this.lang]}" width="25">${e.name[this.lang]}</button></th>
     </div><div class="p-1 row m-2">`;
        const h = r.map(_=>`<div class="p-1 col-12 col-md-6"><button type="button" class="h-100 btn selected btn-sm w-100 text-start tag-child-btn" value="${_.id}"><img class="me-2 tag-child-img" src="../data/icons/tags/${_.iconName}" alt="${_.name[this.lang]}" width="25">${_.name[this.lang]}</button></div>`);
        return l = l + h.join("") + "</div></div></div></div>",
        l
    }
}
class nu {
    constructor() {
        this.lang = gr(),
        this.loadAttributions()
    }
    loadAttributions() {
        const e = document.getElementById("attributions-info");
        fetch(`/maprauders//${this.lang}/attributions.html`).then(r=>r.text()).then(r=>{
            e.innerHTML = r
        }
        )
    }
}
class fh {
    constructor() {
        this.lang = gr(),
        this.loadMenu()
    }
    loadMenu() {
        const e = document.getElementById("menu-div");
        let r = "";
        eu.forEach(l=>{
            r += `<div class="col text-center">
      <button class="btn p-0 rounded h-100" onclick="window.location.href='./maps/${l.id}.html'">
        <div class="card h-100 menu-item">
          <img class="menu-img" src="./data/maps/${l.id}/${l.cardImgSrc}" alt="${l.name[this.lang]}">
          <div class="card-body">
            <h4 class="card-title text-uppercase fw-ligh menu-title">${l.name[this.lang]}</h4>
            <h4><span class="badge bg-white text-black text-uppercase fw-ligh menu-alias">${l.alias[this.lang]}</span></h4>
            ${l.description[this.lang] != "undefined" ? `<p class="card-text">${l.description[this.lang]}</p>` : ""}
          </div>
        </div>
      </button>
    </div>`
        }
        ),
        e.innerHTML = r
    }
}
var iu = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}
  , ln = {}
  , ru = {
    get exports() {
        return ln
    },
    set exports(a) {
        ln = a
    }
};
/*!
 * jQuery JavaScript Library v3.6.4
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2023-03-08T15:28Z
 */
(function(a) {
    (function(e, r) {
        a.exports = e.document ? r(e, !0) : function(l) {
            if (!l.document)
                throw new Error("jQuery requires a window with a document");
            return r(l)
        }
    }
    )(typeof window < "u" ? window : iu, function(e, r) {
        var l = []
          , h = Object.getPrototypeOf
          , _ = l.slice
          , E = l.flat ? function(t) {
            return l.flat.call(t)
        }
        : function(t) {
            return l.concat.apply([], t)
        }
          , C = l.push
          , D = l.indexOf
          , M = {}
          , $ = M.toString
          , Y = M.hasOwnProperty
          , Q = Y.toString
          , U = Q.call(Object)
          , j = {}
          , k = function(n) {
            return typeof n == "function" && typeof n.nodeType != "number" && typeof n.item != "function"
        }
          , Z = function(n) {
            return n != null && n === n.window
        }
          , R = e.document
          , ht = {
            type: !0,
            src: !0,
            nonce: !0,
            noModule: !0
        };
        function lt(t, n, i) {
            i = i || R;
            var s, u, c = i.createElement("script");
            if (c.text = t,
            n)
                for (s in ht)
                    u = n[s] || n.getAttribute && n.getAttribute(s),
                    u && c.setAttribute(s, u);
            i.head.appendChild(c).parentNode.removeChild(c)
        }
        function X(t) {
            return t == null ? t + "" : typeof t == "object" || typeof t == "function" ? M[$.call(t)] || "object" : typeof t
        }
        var nt = "3.6.4"
          , o = function(t, n) {
            return new o.fn.init(t,n)
        };
        o.fn = o.prototype = {
            jquery: nt,
            constructor: o,
            length: 0,
            toArray: function() {
                return _.call(this)
            },
            get: function(t) {
                return t == null ? _.call(this) : t < 0 ? this[t + this.length] : this[t]
            },
            pushStack: function(t) {
                var n = o.merge(this.constructor(), t);
                return n.prevObject = this,
                n
            },
            each: function(t) {
                return o.each(this, t)
            },
            map: function(t) {
                return this.pushStack(o.map(this, function(n, i) {
                    return t.call(n, i, n)
                }))
            },
            slice: function() {
                return this.pushStack(_.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            even: function() {
                return this.pushStack(o.grep(this, function(t, n) {
                    return (n + 1) % 2
                }))
            },
            odd: function() {
                return this.pushStack(o.grep(this, function(t, n) {
                    return n % 2
                }))
            },
            eq: function(t) {
                var n = this.length
                  , i = +t + (t < 0 ? n : 0);
                return this.pushStack(i >= 0 && i < n ? [this[i]] : [])
            },
            end: function() {
                return this.prevObject || this.constructor()
            },
            push: C,
            sort: l.sort,
            splice: l.splice
        },
        o.extend = o.fn.extend = function() {
            var t, n, i, s, u, c, f = arguments[0] || {}, m = 1, p = arguments.length, b = !1;
            for (typeof f == "boolean" && (b = f,
            f = arguments[m] || {},
            m++),
            typeof f != "object" && !k(f) && (f = {}),
            m === p && (f = this,
            m--); m < p; m++)
                if ((t = arguments[m]) != null)
                    for (n in t)
                        s = t[n],
                        !(n === "__proto__" || f === s) && (b && s && (o.isPlainObject(s) || (u = Array.isArray(s))) ? (i = f[n],
                        u && !Array.isArray(i) ? c = [] : !u && !o.isPlainObject(i) ? c = {} : c = i,
                        u = !1,
                        f[n] = o.extend(b, c, s)) : s !== void 0 && (f[n] = s));
            return f
        }
        ,
        o.extend({
            expando: "jQuery" + (nt + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(t) {
                throw new Error(t)
            },
            noop: function() {},
            isPlainObject: function(t) {
                var n, i;
                return !t || $.call(t) !== "[object Object]" ? !1 : (n = h(t),
                n ? (i = Y.call(n, "constructor") && n.constructor,
                typeof i == "function" && Q.call(i) === U) : !0)
            },
            isEmptyObject: function(t) {
                var n;
                for (n in t)
                    return !1;
                return !0
            },
            globalEval: function(t, n, i) {
                lt(t, {
                    nonce: n && n.nonce
                }, i)
            },
            each: function(t, n) {
                var i, s = 0;
                if (at(t))
                    for (i = t.length; s < i && n.call(t[s], s, t[s]) !== !1; s++)
                        ;
                else
                    for (s in t)
                        if (n.call(t[s], s, t[s]) === !1)
                            break;
                return t
            },
            makeArray: function(t, n) {
                var i = n || [];
                return t != null && (at(Object(t)) ? o.merge(i, typeof t == "string" ? [t] : t) : C.call(i, t)),
                i
            },
            inArray: function(t, n, i) {
                return n == null ? -1 : D.call(n, t, i)
            },
            merge: function(t, n) {
                for (var i = +n.length, s = 0, u = t.length; s < i; s++)
                    t[u++] = n[s];
                return t.length = u,
                t
            },
            grep: function(t, n, i) {
                for (var s, u = [], c = 0, f = t.length, m = !i; c < f; c++)
                    s = !n(t[c], c),
                    s !== m && u.push(t[c]);
                return u
            },
            map: function(t, n, i) {
                var s, u, c = 0, f = [];
                if (at(t))
                    for (s = t.length; c < s; c++)
                        u = n(t[c], c, i),
                        u != null && f.push(u);
                else
                    for (c in t)
                        u = n(t[c], c, i),
                        u != null && f.push(u);
                return E(f)
            },
            guid: 1,
            support: j
        }),
        typeof Symbol == "function" && (o.fn[Symbol.iterator] = l[Symbol.iterator]),
        o.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(t, n) {
            M["[object " + n + "]"] = n.toLowerCase()
        });
        function at(t) {
            var n = !!t && "length"in t && t.length
              , i = X(t);
            return k(t) || Z(t) ? !1 : i === "array" || n === 0 || typeof n == "number" && n > 0 && n - 1 in t
        }
        var ut = function(t) {
            var n, i, s, u, c, f, m, p, b, A, x, T, w, V, G, H, _t, mt, Pt, rt = "sizzle" + 1 * new Date, z = t.document, Ot = 0, et = 0, pt = Qn(), On = Qn(), zn = Qn(), Mt = Qn(), je = function(d, g) {
                return d === g && (x = !0),
                0
            }, Ve = {}.hasOwnProperty, Dt = [], Ee = Dt.pop, Bt = Dt.push, Te = Dt.push, ls = Dt.slice, qe = function(d, g) {
                for (var v = 0, N = d.length; v < N; v++)
                    if (d[v] === g)
                        return v;
                return -1
            }, qi = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", it = "[\\x20\\t\\r\\n\\f]", We = "(?:\\\\[\\da-fA-F]{1,6}" + it + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", fs = "\\[" + it + "*(" + We + ")(?:" + it + "*([*^$|!~]?=)" + it + `*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(` + We + "))|)" + it + "*\\]", Wi = ":(" + We + `)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|` + fs + ")*)|.*)\\)|)", Va = new RegExp(it + "+","g"), Gn = new RegExp("^" + it + "+|((?:^|[^\\\\])(?:\\\\.)*)" + it + "+$","g"), qa = new RegExp("^" + it + "*," + it + "*"), ds = new RegExp("^" + it + "*([>+~]|" + it + ")" + it + "*"), Wa = new RegExp(it + "|>"), Ba = new RegExp(Wi), Fa = new RegExp("^" + We + "$"), Xn = {
                ID: new RegExp("^#(" + We + ")"),
                CLASS: new RegExp("^\\.(" + We + ")"),
                TAG: new RegExp("^(" + We + "|[*])"),
                ATTR: new RegExp("^" + fs),
                PSEUDO: new RegExp("^" + Wi),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + it + "*(even|odd|(([+-]|)(\\d*)n|)" + it + "*(?:([+-]|)" + it + "*(\\d+)|))" + it + "*\\)|)","i"),
                bool: new RegExp("^(?:" + qi + ")$","i"),
                needsContext: new RegExp("^" + it + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + it + "*((?:-\\d)?\\d*)" + it + "*\\)|)(?=[^-]|$)","i")
            }, Ka = /HTML$/i, Ua = /^(?:input|select|textarea|button)$/i, Ya = /^h\d$/i, Dn = /^[^{]+\{\s*\[native \w/, za = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, Bi = /[+~]/, fe = new RegExp("\\\\[\\da-fA-F]{1,6}" + it + "?|\\\\([^\\r\\n\\f])","g"), de = function(d, g) {
                var v = "0x" + d.slice(1) - 65536;
                return g || (v < 0 ? String.fromCharCode(v + 65536) : String.fromCharCode(v >> 10 | 55296, v & 1023 | 56320))
            }, hs = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, ps = function(d, g) {
                return g ? d === "\0" ? "�" : d.slice(0, -1) + "\\" + d.charCodeAt(d.length - 1).toString(16) + " " : "\\" + d
            }, gs = function() {
                T()
            }, Ga = Zn(function(d) {
                return d.disabled === !0 && d.nodeName.toLowerCase() === "fieldset"
            }, {
                dir: "parentNode",
                next: "legend"
            });
            try {
                Te.apply(Dt = ls.call(z.childNodes), z.childNodes),
                Dt[z.childNodes.length].nodeType
            } catch {
                Te = {
                    apply: Dt.length ? function(g, v) {
                        Bt.apply(g, ls.call(v))
                    }
                    : function(g, v) {
                        for (var N = g.length, y = 0; g[N++] = v[y++]; )
                            ;
                        g.length = N - 1
                    }
                }
            }
            function st(d, g, v, N) {
                var y, S, O, I, P, B, W, K = g && g.ownerDocument, tt = g ? g.nodeType : 9;
                if (v = v || [],
                typeof d != "string" || !d || tt !== 1 && tt !== 9 && tt !== 11)
                    return v;
                if (!N && (T(g),
                g = g || w,
                G)) {
                    if (tt !== 11 && (P = za.exec(d)))
                        if (y = P[1]) {
                            if (tt === 9)
                                if (O = g.getElementById(y)) {
                                    if (O.id === y)
                                        return v.push(O),
                                        v
                                } else
                                    return v;
                            else if (K && (O = K.getElementById(y)) && Pt(g, O) && O.id === y)
                                return v.push(O),
                                v
                        } else {
                            if (P[2])
                                return Te.apply(v, g.getElementsByTagName(d)),
                                v;
                            if ((y = P[3]) && i.getElementsByClassName && g.getElementsByClassName)
                                return Te.apply(v, g.getElementsByClassName(y)),
                                v
                        }
                    if (i.qsa && !Mt[d + " "] && (!H || !H.test(d)) && (tt !== 1 || g.nodeName.toLowerCase() !== "object")) {
                        if (W = d,
                        K = g,
                        tt === 1 && (Wa.test(d) || ds.test(d))) {
                            for (K = Bi.test(d) && Ki(g.parentNode) || g,
                            (K !== g || !i.scope) && ((I = g.getAttribute("id")) ? I = I.replace(hs, ps) : g.setAttribute("id", I = rt)),
                            B = f(d),
                            S = B.length; S--; )
                                B[S] = (I ? "#" + I : ":scope") + " " + Jn(B[S]);
                            W = B.join(",")
                        }
                        try {
                            return Te.apply(v, K.querySelectorAll(W)),
                            v
                        } catch {
                            Mt(d, !0)
                        } finally {
                            I === rt && g.removeAttribute("id")
                        }
                    }
                }
                return p(d.replace(Gn, "$1"), g, v, N)
            }
            function Qn() {
                var d = [];
                function g(v, N) {
                    return d.push(v + " ") > s.cacheLength && delete g[d.shift()],
                    g[v + " "] = N
                }
                return g
            }
            function te(d) {
                return d[rt] = !0,
                d
            }
            function Ft(d) {
                var g = w.createElement("fieldset");
                try {
                    return !!d(g)
                } catch {
                    return !1
                } finally {
                    g.parentNode && g.parentNode.removeChild(g),
                    g = null
                }
            }
            function Fi(d, g) {
                for (var v = d.split("|"), N = v.length; N--; )
                    s.attrHandle[v[N]] = g
            }
            function ms(d, g) {
                var v = g && d
                  , N = v && d.nodeType === 1 && g.nodeType === 1 && d.sourceIndex - g.sourceIndex;
                if (N)
                    return N;
                if (v) {
                    for (; v = v.nextSibling; )
                        if (v === g)
                            return -1
                }
                return d ? 1 : -1
            }
            function Xa(d) {
                return function(g) {
                    var v = g.nodeName.toLowerCase();
                    return v === "input" && g.type === d
                }
            }
            function Qa(d) {
                return function(g) {
                    var v = g.nodeName.toLowerCase();
                    return (v === "input" || v === "button") && g.type === d
                }
            }
            function vs(d) {
                return function(g) {
                    return "form"in g ? g.parentNode && g.disabled === !1 ? "label"in g ? "label"in g.parentNode ? g.parentNode.disabled === d : g.disabled === d : g.isDisabled === d || g.isDisabled !== !d && Ga(g) === d : g.disabled === d : "label"in g ? g.disabled === d : !1
                }
            }
            function Be(d) {
                return te(function(g) {
                    return g = +g,
                    te(function(v, N) {
                        for (var y, S = d([], v.length, g), O = S.length; O--; )
                            v[y = S[O]] && (v[y] = !(N[y] = v[y]))
                    })
                })
            }
            function Ki(d) {
                return d && typeof d.getElementsByTagName < "u" && d
            }
            i = st.support = {},
            c = st.isXML = function(d) {
                var g = d && d.namespaceURI
                  , v = d && (d.ownerDocument || d).documentElement;
                return !Ka.test(g || v && v.nodeName || "HTML")
            }
            ,
            T = st.setDocument = function(d) {
                var g, v, N = d ? d.ownerDocument || d : z;
                return N == w || N.nodeType !== 9 || !N.documentElement || (w = N,
                V = w.documentElement,
                G = !c(w),
                z != w && (v = w.defaultView) && v.top !== v && (v.addEventListener ? v.addEventListener("unload", gs, !1) : v.attachEvent && v.attachEvent("onunload", gs)),
                i.scope = Ft(function(y) {
                    return V.appendChild(y).appendChild(w.createElement("div")),
                    typeof y.querySelectorAll < "u" && !y.querySelectorAll(":scope fieldset div").length
                }),
                i.cssHas = Ft(function() {
                    try {
                        return w.querySelector(":has(*,:jqfake)"),
                        !1
                    } catch {
                        return !0
                    }
                }),
                i.attributes = Ft(function(y) {
                    return y.className = "i",
                    !y.getAttribute("className")
                }),
                i.getElementsByTagName = Ft(function(y) {
                    return y.appendChild(w.createComment("")),
                    !y.getElementsByTagName("*").length
                }),
                i.getElementsByClassName = Dn.test(w.getElementsByClassName),
                i.getById = Ft(function(y) {
                    return V.appendChild(y).id = rt,
                    !w.getElementsByName || !w.getElementsByName(rt).length
                }),
                i.getById ? (s.filter.ID = function(y) {
                    var S = y.replace(fe, de);
                    return function(O) {
                        return O.getAttribute("id") === S
                    }
                }
                ,
                s.find.ID = function(y, S) {
                    if (typeof S.getElementById < "u" && G) {
                        var O = S.getElementById(y);
                        return O ? [O] : []
                    }
                }
                ) : (s.filter.ID = function(y) {
                    var S = y.replace(fe, de);
                    return function(O) {
                        var I = typeof O.getAttributeNode < "u" && O.getAttributeNode("id");
                        return I && I.value === S
                    }
                }
                ,
                s.find.ID = function(y, S) {
                    if (typeof S.getElementById < "u" && G) {
                        var O, I, P, B = S.getElementById(y);
                        if (B) {
                            if (O = B.getAttributeNode("id"),
                            O && O.value === y)
                                return [B];
                            for (P = S.getElementsByName(y),
                            I = 0; B = P[I++]; )
                                if (O = B.getAttributeNode("id"),
                                O && O.value === y)
                                    return [B]
                        }
                        return []
                    }
                }
                ),
                s.find.TAG = i.getElementsByTagName ? function(y, S) {
                    if (typeof S.getElementsByTagName < "u")
                        return S.getElementsByTagName(y);
                    if (i.qsa)
                        return S.querySelectorAll(y)
                }
                : function(y, S) {
                    var O, I = [], P = 0, B = S.getElementsByTagName(y);
                    if (y === "*") {
                        for (; O = B[P++]; )
                            O.nodeType === 1 && I.push(O);
                        return I
                    }
                    return B
                }
                ,
                s.find.CLASS = i.getElementsByClassName && function(y, S) {
                    if (typeof S.getElementsByClassName < "u" && G)
                        return S.getElementsByClassName(y)
                }
                ,
                _t = [],
                H = [],
                (i.qsa = Dn.test(w.querySelectorAll)) && (Ft(function(y) {
                    var S;
                    V.appendChild(y).innerHTML = "<a id='" + rt + "'></a><select id='" + rt + "-\r\\' msallowcapture=''><option selected=''></option></select>",
                    y.querySelectorAll("[msallowcapture^='']").length && H.push("[*^$]=" + it + `*(?:''|"")`),
                    y.querySelectorAll("[selected]").length || H.push("\\[" + it + "*(?:value|" + qi + ")"),
                    y.querySelectorAll("[id~=" + rt + "-]").length || H.push("~="),
                    S = w.createElement("input"),
                    S.setAttribute("name", ""),
                    y.appendChild(S),
                    y.querySelectorAll("[name='']").length || H.push("\\[" + it + "*name" + it + "*=" + it + `*(?:''|"")`),
                    y.querySelectorAll(":checked").length || H.push(":checked"),
                    y.querySelectorAll("a#" + rt + "+*").length || H.push(".#.+[+~]"),
                    y.querySelectorAll("\\\f"),
                    H.push("[\\r\\n\\f]")
                }),
                Ft(function(y) {
                    y.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                    var S = w.createElement("input");
                    S.setAttribute("type", "hidden"),
                    y.appendChild(S).setAttribute("name", "D"),
                    y.querySelectorAll("[name=d]").length && H.push("name" + it + "*[*^$|!~]?="),
                    y.querySelectorAll(":enabled").length !== 2 && H.push(":enabled", ":disabled"),
                    V.appendChild(y).disabled = !0,
                    y.querySelectorAll(":disabled").length !== 2 && H.push(":enabled", ":disabled"),
                    y.querySelectorAll("*,:x"),
                    H.push(",.*:")
                })),
                (i.matchesSelector = Dn.test(mt = V.matches || V.webkitMatchesSelector || V.mozMatchesSelector || V.oMatchesSelector || V.msMatchesSelector)) && Ft(function(y) {
                    i.disconnectedMatch = mt.call(y, "*"),
                    mt.call(y, "[s!='']:x"),
                    _t.push("!=", Wi)
                }),
                i.cssHas || H.push(":has"),
                H = H.length && new RegExp(H.join("|")),
                _t = _t.length && new RegExp(_t.join("|")),
                g = Dn.test(V.compareDocumentPosition),
                Pt = g || Dn.test(V.contains) ? function(y, S) {
                    var O = y.nodeType === 9 && y.documentElement || y
                      , I = S && S.parentNode;
                    return y === I || !!(I && I.nodeType === 1 && (O.contains ? O.contains(I) : y.compareDocumentPosition && y.compareDocumentPosition(I) & 16))
                }
                : function(y, S) {
                    if (S) {
                        for (; S = S.parentNode; )
                            if (S === y)
                                return !0
                    }
                    return !1
                }
                ,
                je = g ? function(y, S) {
                    if (y === S)
                        return x = !0,
                        0;
                    var O = !y.compareDocumentPosition - !S.compareDocumentPosition;
                    return O || (O = (y.ownerDocument || y) == (S.ownerDocument || S) ? y.compareDocumentPosition(S) : 1,
                    O & 1 || !i.sortDetached && S.compareDocumentPosition(y) === O ? y == w || y.ownerDocument == z && Pt(z, y) ? -1 : S == w || S.ownerDocument == z && Pt(z, S) ? 1 : A ? qe(A, y) - qe(A, S) : 0 : O & 4 ? -1 : 1)
                }
                : function(y, S) {
                    if (y === S)
                        return x = !0,
                        0;
                    var O, I = 0, P = y.parentNode, B = S.parentNode, W = [y], K = [S];
                    if (!P || !B)
                        return y == w ? -1 : S == w ? 1 : P ? -1 : B ? 1 : A ? qe(A, y) - qe(A, S) : 0;
                    if (P === B)
                        return ms(y, S);
                    for (O = y; O = O.parentNode; )
                        W.unshift(O);
                    for (O = S; O = O.parentNode; )
                        K.unshift(O);
                    for (; W[I] === K[I]; )
                        I++;
                    return I ? ms(W[I], K[I]) : W[I] == z ? -1 : K[I] == z ? 1 : 0
                }
                ),
                w
            }
            ,
            st.matches = function(d, g) {
                return st(d, null, null, g)
            }
            ,
            st.matchesSelector = function(d, g) {
                if (T(d),
                i.matchesSelector && G && !Mt[g + " "] && (!_t || !_t.test(g)) && (!H || !H.test(g)))
                    try {
                        var v = mt.call(d, g);
                        if (v || i.disconnectedMatch || d.document && d.document.nodeType !== 11)
                            return v
                    } catch {
                        Mt(g, !0)
                    }
                return st(g, w, null, [d]).length > 0
            }
            ,
            st.contains = function(d, g) {
                return (d.ownerDocument || d) != w && T(d),
                Pt(d, g)
            }
            ,
            st.attr = function(d, g) {
                (d.ownerDocument || d) != w && T(d);
                var v = s.attrHandle[g.toLowerCase()]
                  , N = v && Ve.call(s.attrHandle, g.toLowerCase()) ? v(d, g, !G) : void 0;
                return N !== void 0 ? N : i.attributes || !G ? d.getAttribute(g) : (N = d.getAttributeNode(g)) && N.specified ? N.value : null
            }
            ,
            st.escape = function(d) {
                return (d + "").replace(hs, ps)
            }
            ,
            st.error = function(d) {
                throw new Error("Syntax error, unrecognized expression: " + d)
            }
            ,
            st.uniqueSort = function(d) {
                var g, v = [], N = 0, y = 0;
                if (x = !i.detectDuplicates,
                A = !i.sortStable && d.slice(0),
                d.sort(je),
                x) {
                    for (; g = d[y++]; )
                        g === d[y] && (N = v.push(y));
                    for (; N--; )
                        d.splice(v[N], 1)
                }
                return A = null,
                d
            }
            ,
            u = st.getText = function(d) {
                var g, v = "", N = 0, y = d.nodeType;
                if (y) {
                    if (y === 1 || y === 9 || y === 11) {
                        if (typeof d.textContent == "string")
                            return d.textContent;
                        for (d = d.firstChild; d; d = d.nextSibling)
                            v += u(d)
                    } else if (y === 3 || y === 4)
                        return d.nodeValue
                } else
                    for (; g = d[N++]; )
                        v += u(g);
                return v
            }
            ,
            s = st.selectors = {
                cacheLength: 50,
                createPseudo: te,
                match: Xn,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(d) {
                        return d[1] = d[1].replace(fe, de),
                        d[3] = (d[3] || d[4] || d[5] || "").replace(fe, de),
                        d[2] === "~=" && (d[3] = " " + d[3] + " "),
                        d.slice(0, 4)
                    },
                    CHILD: function(d) {
                        return d[1] = d[1].toLowerCase(),
                        d[1].slice(0, 3) === "nth" ? (d[3] || st.error(d[0]),
                        d[4] = +(d[4] ? d[5] + (d[6] || 1) : 2 * (d[3] === "even" || d[3] === "odd")),
                        d[5] = +(d[7] + d[8] || d[3] === "odd")) : d[3] && st.error(d[0]),
                        d
                    },
                    PSEUDO: function(d) {
                        var g, v = !d[6] && d[2];
                        return Xn.CHILD.test(d[0]) ? null : (d[3] ? d[2] = d[4] || d[5] || "" : v && Ba.test(v) && (g = f(v, !0)) && (g = v.indexOf(")", v.length - g) - v.length) && (d[0] = d[0].slice(0, g),
                        d[2] = v.slice(0, g)),
                        d.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(d) {
                        var g = d.replace(fe, de).toLowerCase();
                        return d === "*" ? function() {
                            return !0
                        }
                        : function(v) {
                            return v.nodeName && v.nodeName.toLowerCase() === g
                        }
                    },
                    CLASS: function(d) {
                        var g = pt[d + " "];
                        return g || (g = new RegExp("(^|" + it + ")" + d + "(" + it + "|$)")) && pt(d, function(v) {
                            return g.test(typeof v.className == "string" && v.className || typeof v.getAttribute < "u" && v.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(d, g, v) {
                        return function(N) {
                            var y = st.attr(N, d);
                            return y == null ? g === "!=" : g ? (y += "",
                            g === "=" ? y === v : g === "!=" ? y !== v : g === "^=" ? v && y.indexOf(v) === 0 : g === "*=" ? v && y.indexOf(v) > -1 : g === "$=" ? v && y.slice(-v.length) === v : g === "~=" ? (" " + y.replace(Va, " ") + " ").indexOf(v) > -1 : g === "|=" ? y === v || y.slice(0, v.length + 1) === v + "-" : !1) : !0
                        }
                    },
                    CHILD: function(d, g, v, N, y) {
                        var S = d.slice(0, 3) !== "nth"
                          , O = d.slice(-4) !== "last"
                          , I = g === "of-type";
                        return N === 1 && y === 0 ? function(P) {
                            return !!P.parentNode
                        }
                        : function(P, B, W) {
                            var K, tt, ot, F, yt, Tt, Rt = S !== O ? "nextSibling" : "previousSibling", dt = P.parentNode, Ln = I && P.nodeName.toLowerCase(), $n = !W && !I, Ht = !1;
                            if (dt) {
                                if (S) {
                                    for (; Rt; ) {
                                        for (F = P; F = F[Rt]; )
                                            if (I ? F.nodeName.toLowerCase() === Ln : F.nodeType === 1)
                                                return !1;
                                        Tt = Rt = d === "only" && !Tt && "nextSibling"
                                    }
                                    return !0
                                }
                                if (Tt = [O ? dt.firstChild : dt.lastChild],
                                O && $n) {
                                    for (F = dt,
                                    ot = F[rt] || (F[rt] = {}),
                                    tt = ot[F.uniqueID] || (ot[F.uniqueID] = {}),
                                    K = tt[d] || [],
                                    yt = K[0] === Ot && K[1],
                                    Ht = yt && K[2],
                                    F = yt && dt.childNodes[yt]; F = ++yt && F && F[Rt] || (Ht = yt = 0) || Tt.pop(); )
                                        if (F.nodeType === 1 && ++Ht && F === P) {
                                            tt[d] = [Ot, yt, Ht];
                                            break
                                        }
                                } else if ($n && (F = P,
                                ot = F[rt] || (F[rt] = {}),
                                tt = ot[F.uniqueID] || (ot[F.uniqueID] = {}),
                                K = tt[d] || [],
                                yt = K[0] === Ot && K[1],
                                Ht = yt),
                                Ht === !1)
                                    for (; (F = ++yt && F && F[Rt] || (Ht = yt = 0) || Tt.pop()) && !((I ? F.nodeName.toLowerCase() === Ln : F.nodeType === 1) && ++Ht && ($n && (ot = F[rt] || (F[rt] = {}),
                                    tt = ot[F.uniqueID] || (ot[F.uniqueID] = {}),
                                    tt[d] = [Ot, Ht]),
                                    F === P)); )
                                        ;
                                return Ht -= y,
                                Ht === N || Ht % N === 0 && Ht / N >= 0
                            }
                        }
                    },
                    PSEUDO: function(d, g) {
                        var v, N = s.pseudos[d] || s.setFilters[d.toLowerCase()] || st.error("unsupported pseudo: " + d);
                        return N[rt] ? N(g) : N.length > 1 ? (v = [d, d, "", g],
                        s.setFilters.hasOwnProperty(d.toLowerCase()) ? te(function(y, S) {
                            for (var O, I = N(y, g), P = I.length; P--; )
                                O = qe(y, I[P]),
                                y[O] = !(S[O] = I[P])
                        }) : function(y) {
                            return N(y, 0, v)
                        }
                        ) : N
                    }
                },
                pseudos: {
                    not: te(function(d) {
                        var g = []
                          , v = []
                          , N = m(d.replace(Gn, "$1"));
                        return N[rt] ? te(function(y, S, O, I) {
                            for (var P, B = N(y, null, I, []), W = y.length; W--; )
                                (P = B[W]) && (y[W] = !(S[W] = P))
                        }) : function(y, S, O) {
                            return g[0] = y,
                            N(g, null, O, v),
                            g[0] = null,
                            !v.pop()
                        }
                    }),
                    has: te(function(d) {
                        return function(g) {
                            return st(d, g).length > 0
                        }
                    }),
                    contains: te(function(d) {
                        return d = d.replace(fe, de),
                        function(g) {
                            return (g.textContent || u(g)).indexOf(d) > -1
                        }
                    }),
                    lang: te(function(d) {
                        return Fa.test(d || "") || st.error("unsupported lang: " + d),
                        d = d.replace(fe, de).toLowerCase(),
                        function(g) {
                            var v;
                            do
                                if (v = G ? g.lang : g.getAttribute("xml:lang") || g.getAttribute("lang"))
                                    return v = v.toLowerCase(),
                                    v === d || v.indexOf(d + "-") === 0;
                            while ((g = g.parentNode) && g.nodeType === 1);
                            return !1
                        }
                    }),
                    target: function(d) {
                        var g = t.location && t.location.hash;
                        return g && g.slice(1) === d.id
                    },
                    root: function(d) {
                        return d === V
                    },
                    focus: function(d) {
                        return d === w.activeElement && (!w.hasFocus || w.hasFocus()) && !!(d.type || d.href || ~d.tabIndex)
                    },
                    enabled: vs(!1),
                    disabled: vs(!0),
                    checked: function(d) {
                        var g = d.nodeName.toLowerCase();
                        return g === "input" && !!d.checked || g === "option" && !!d.selected
                    },
                    selected: function(d) {
                        return d.parentNode && d.parentNode.selectedIndex,
                        d.selected === !0
                    },
                    empty: function(d) {
                        for (d = d.firstChild; d; d = d.nextSibling)
                            if (d.nodeType < 6)
                                return !1;
                        return !0
                    },
                    parent: function(d) {
                        return !s.pseudos.empty(d)
                    },
                    header: function(d) {
                        return Ya.test(d.nodeName)
                    },
                    input: function(d) {
                        return Ua.test(d.nodeName)
                    },
                    button: function(d) {
                        var g = d.nodeName.toLowerCase();
                        return g === "input" && d.type === "button" || g === "button"
                    },
                    text: function(d) {
                        var g;
                        return d.nodeName.toLowerCase() === "input" && d.type === "text" && ((g = d.getAttribute("type")) == null || g.toLowerCase() === "text")
                    },
                    first: Be(function() {
                        return [0]
                    }),
                    last: Be(function(d, g) {
                        return [g - 1]
                    }),
                    eq: Be(function(d, g, v) {
                        return [v < 0 ? v + g : v]
                    }),
                    even: Be(function(d, g) {
                        for (var v = 0; v < g; v += 2)
                            d.push(v);
                        return d
                    }),
                    odd: Be(function(d, g) {
                        for (var v = 1; v < g; v += 2)
                            d.push(v);
                        return d
                    }),
                    lt: Be(function(d, g, v) {
                        for (var N = v < 0 ? v + g : v > g ? g : v; --N >= 0; )
                            d.push(N);
                        return d
                    }),
                    gt: Be(function(d, g, v) {
                        for (var N = v < 0 ? v + g : v; ++N < g; )
                            d.push(N);
                        return d
                    })
                }
            },
            s.pseudos.nth = s.pseudos.eq;
            for (n in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            })
                s.pseudos[n] = Xa(n);
            for (n in {
                submit: !0,
                reset: !0
            })
                s.pseudos[n] = Qa(n);
            function _s() {}
            _s.prototype = s.filters = s.pseudos,
            s.setFilters = new _s,
            f = st.tokenize = function(d, g) {
                var v, N, y, S, O, I, P, B = On[d + " "];
                if (B)
                    return g ? 0 : B.slice(0);
                for (O = d,
                I = [],
                P = s.preFilter; O; ) {
                    (!v || (N = qa.exec(O))) && (N && (O = O.slice(N[0].length) || O),
                    I.push(y = [])),
                    v = !1,
                    (N = ds.exec(O)) && (v = N.shift(),
                    y.push({
                        value: v,
                        type: N[0].replace(Gn, " ")
                    }),
                    O = O.slice(v.length));
                    for (S in s.filter)
                        (N = Xn[S].exec(O)) && (!P[S] || (N = P[S](N))) && (v = N.shift(),
                        y.push({
                            value: v,
                            type: S,
                            matches: N
                        }),
                        O = O.slice(v.length));
                    if (!v)
                        break
                }
                return g ? O.length : O ? st.error(d) : On(d, I).slice(0)
            }
            ;
            function Jn(d) {
                for (var g = 0, v = d.length, N = ""; g < v; g++)
                    N += d[g].value;
                return N
            }
            function Zn(d, g, v) {
                var N = g.dir
                  , y = g.next
                  , S = y || N
                  , O = v && S === "parentNode"
                  , I = et++;
                return g.first ? function(P, B, W) {
                    for (; P = P[N]; )
                        if (P.nodeType === 1 || O)
                            return d(P, B, W);
                    return !1
                }
                : function(P, B, W) {
                    var K, tt, ot, F = [Ot, I];
                    if (W) {
                        for (; P = P[N]; )
                            if ((P.nodeType === 1 || O) && d(P, B, W))
                                return !0
                    } else
                        for (; P = P[N]; )
                            if (P.nodeType === 1 || O)
                                if (ot = P[rt] || (P[rt] = {}),
                                tt = ot[P.uniqueID] || (ot[P.uniqueID] = {}),
                                y && y === P.nodeName.toLowerCase())
                                    P = P[N] || P;
                                else {
                                    if ((K = tt[S]) && K[0] === Ot && K[1] === I)
                                        return F[2] = K[2];
                                    if (tt[S] = F,
                                    F[2] = d(P, B, W))
                                        return !0
                                }
                    return !1
                }
            }
            function Ui(d) {
                return d.length > 1 ? function(g, v, N) {
                    for (var y = d.length; y--; )
                        if (!d[y](g, v, N))
                            return !1;
                    return !0
                }
                : d[0]
            }
            function Ja(d, g, v) {
                for (var N = 0, y = g.length; N < y; N++)
                    st(d, g[N], v);
                return v
            }
            function ti(d, g, v, N, y) {
                for (var S, O = [], I = 0, P = d.length, B = g != null; I < P; I++)
                    (S = d[I]) && (!v || v(S, N, y)) && (O.push(S),
                    B && g.push(I));
                return O
            }
            function Yi(d, g, v, N, y, S) {
                return N && !N[rt] && (N = Yi(N)),
                y && !y[rt] && (y = Yi(y, S)),
                te(function(O, I, P, B) {
                    var W, K, tt, ot = [], F = [], yt = I.length, Tt = O || Ja(g || "*", P.nodeType ? [P] : P, []), Rt = d && (O || !g) ? ti(Tt, ot, d, P, B) : Tt, dt = v ? y || (O ? d : yt || N) ? [] : I : Rt;
                    if (v && v(Rt, dt, P, B),
                    N)
                        for (W = ti(dt, F),
                        N(W, [], P, B),
                        K = W.length; K--; )
                            (tt = W[K]) && (dt[F[K]] = !(Rt[F[K]] = tt));
                    if (O) {
                        if (y || d) {
                            if (y) {
                                for (W = [],
                                K = dt.length; K--; )
                                    (tt = dt[K]) && W.push(Rt[K] = tt);
                                y(null, dt = [], W, B)
                            }
                            for (K = dt.length; K--; )
                                (tt = dt[K]) && (W = y ? qe(O, tt) : ot[K]) > -1 && (O[W] = !(I[W] = tt))
                        }
                    } else
                        dt = ti(dt === I ? dt.splice(yt, dt.length) : dt),
                        y ? y(null, I, dt, B) : Te.apply(I, dt)
                })
            }
            function zi(d) {
                for (var g, v, N, y = d.length, S = s.relative[d[0].type], O = S || s.relative[" "], I = S ? 1 : 0, P = Zn(function(K) {
                    return K === g
                }, O, !0), B = Zn(function(K) {
                    return qe(g, K) > -1
                }, O, !0), W = [function(K, tt, ot) {
                    var F = !S && (ot || tt !== b) || ((g = tt).nodeType ? P(K, tt, ot) : B(K, tt, ot));
                    return g = null,
                    F
                }
                ]; I < y; I++)
                    if (v = s.relative[d[I].type])
                        W = [Zn(Ui(W), v)];
                    else {
                        if (v = s.filter[d[I].type].apply(null, d[I].matches),
                        v[rt]) {
                            for (N = ++I; N < y && !s.relative[d[N].type]; N++)
                                ;
                            return Yi(I > 1 && Ui(W), I > 1 && Jn(d.slice(0, I - 1).concat({
                                value: d[I - 2].type === " " ? "*" : ""
                            })).replace(Gn, "$1"), v, I < N && zi(d.slice(I, N)), N < y && zi(d = d.slice(N)), N < y && Jn(d))
                        }
                        W.push(v)
                    }
                return Ui(W)
            }
            function Za(d, g) {
                var v = g.length > 0
                  , N = d.length > 0
                  , y = function(S, O, I, P, B) {
                    var W, K, tt, ot = 0, F = "0", yt = S && [], Tt = [], Rt = b, dt = S || N && s.find.TAG("*", B), Ln = Ot += Rt == null ? 1 : Math.random() || .1, $n = dt.length;
                    for (B && (b = O == w || O || B); F !== $n && (W = dt[F]) != null; F++) {
                        if (N && W) {
                            for (K = 0,
                            !O && W.ownerDocument != w && (T(W),
                            I = !G); tt = d[K++]; )
                                if (tt(W, O || w, I)) {
                                    P.push(W);
                                    break
                                }
                            B && (Ot = Ln)
                        }
                        v && ((W = !tt && W) && ot--,
                        S && yt.push(W))
                    }
                    if (ot += F,
                    v && F !== ot) {
                        for (K = 0; tt = g[K++]; )
                            tt(yt, Tt, O, I);
                        if (S) {
                            if (ot > 0)
                                for (; F--; )
                                    yt[F] || Tt[F] || (Tt[F] = Ee.call(P));
                            Tt = ti(Tt)
                        }
                        Te.apply(P, Tt),
                        B && !S && Tt.length > 0 && ot + g.length > 1 && st.uniqueSort(P)
                    }
                    return B && (Ot = Ln,
                    b = Rt),
                    yt
                };
                return v ? te(y) : y
            }
            return m = st.compile = function(d, g) {
                var v, N = [], y = [], S = zn[d + " "];
                if (!S) {
                    for (g || (g = f(d)),
                    v = g.length; v--; )
                        S = zi(g[v]),
                        S[rt] ? N.push(S) : y.push(S);
                    S = zn(d, Za(y, N)),
                    S.selector = d
                }
                return S
            }
            ,
            p = st.select = function(d, g, v, N) {
                var y, S, O, I, P, B = typeof d == "function" && d, W = !N && f(d = B.selector || d);
                if (v = v || [],
                W.length === 1) {
                    if (S = W[0] = W[0].slice(0),
                    S.length > 2 && (O = S[0]).type === "ID" && g.nodeType === 9 && G && s.relative[S[1].type]) {
                        if (g = (s.find.ID(O.matches[0].replace(fe, de), g) || [])[0],
                        g)
                            B && (g = g.parentNode);
                        else
                            return v;
                        d = d.slice(S.shift().value.length)
                    }
                    for (y = Xn.needsContext.test(d) ? 0 : S.length; y-- && (O = S[y],
                    !s.relative[I = O.type]); )
                        if ((P = s.find[I]) && (N = P(O.matches[0].replace(fe, de), Bi.test(S[0].type) && Ki(g.parentNode) || g))) {
                            if (S.splice(y, 1),
                            d = N.length && Jn(S),
                            !d)
                                return Te.apply(v, N),
                                v;
                            break
                        }
                }
                return (B || m(d, W))(N, g, !G, v, !g || Bi.test(d) && Ki(g.parentNode) || g),
                v
            }
            ,
            i.sortStable = rt.split("").sort(je).join("") === rt,
            i.detectDuplicates = !!x,
            T(),
            i.sortDetached = Ft(function(d) {
                return d.compareDocumentPosition(w.createElement("fieldset")) & 1
            }),
            Ft(function(d) {
                return d.innerHTML = "<a href='#'></a>",
                d.firstChild.getAttribute("href") === "#"
            }) || Fi("type|href|height|width", function(d, g, v) {
                if (!v)
                    return d.getAttribute(g, g.toLowerCase() === "type" ? 1 : 2)
            }),
            (!i.attributes || !Ft(function(d) {
                return d.innerHTML = "<input/>",
                d.firstChild.setAttribute("value", ""),
                d.firstChild.getAttribute("value") === ""
            })) && Fi("value", function(d, g, v) {
                if (!v && d.nodeName.toLowerCase() === "input")
                    return d.defaultValue
            }),
            Ft(function(d) {
                return d.getAttribute("disabled") == null
            }) || Fi(qi, function(d, g, v) {
                var N;
                if (!v)
                    return d[g] === !0 ? g.toLowerCase() : (N = d.getAttributeNode(g)) && N.specified ? N.value : null
            }),
            st
        }(e);
        o.find = ut,
        o.expr = ut.selectors,
        o.expr[":"] = o.expr.pseudos,
        o.uniqueSort = o.unique = ut.uniqueSort,
        o.text = ut.getText,
        o.isXMLDoc = ut.isXML,
        o.contains = ut.contains,
        o.escapeSelector = ut.escape;
        var ct = function(t, n, i) {
            for (var s = [], u = i !== void 0; (t = t[n]) && t.nodeType !== 9; )
                if (t.nodeType === 1) {
                    if (u && o(t).is(i))
                        break;
                    s.push(t)
                }
            return s
        }
          , gt = function(t, n) {
            for (var i = []; t; t = t.nextSibling)
                t.nodeType === 1 && t !== n && i.push(t);
            return i
        }
          , vt = o.expr.match.needsContext;
        function ft(t, n) {
            return t.nodeName && t.nodeName.toLowerCase() === n.toLowerCase()
        }
        var bt = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
        function Gt(t, n, i) {
            return k(n) ? o.grep(t, function(s, u) {
                return !!n.call(s, u, s) !== i
            }) : n.nodeType ? o.grep(t, function(s) {
                return s === n !== i
            }) : typeof n != "string" ? o.grep(t, function(s) {
                return D.call(n, s) > -1 !== i
            }) : o.filter(n, t, i)
        }
        o.filter = function(t, n, i) {
            var s = n[0];
            return i && (t = ":not(" + t + ")"),
            n.length === 1 && s.nodeType === 1 ? o.find.matchesSelector(s, t) ? [s] : [] : o.find.matches(t, o.grep(n, function(u) {
                return u.nodeType === 1
            }))
        }
        ,
        o.fn.extend({
            find: function(t) {
                var n, i, s = this.length, u = this;
                if (typeof t != "string")
                    return this.pushStack(o(t).filter(function() {
                        for (n = 0; n < s; n++)
                            if (o.contains(u[n], this))
                                return !0
                    }));
                for (i = this.pushStack([]),
                n = 0; n < s; n++)
                    o.find(t, u[n], i);
                return s > 1 ? o.uniqueSort(i) : i
            },
            filter: function(t) {
                return this.pushStack(Gt(this, t || [], !1))
            },
            not: function(t) {
                return this.pushStack(Gt(this, t || [], !0))
            },
            is: function(t) {
                return !!Gt(this, typeof t == "string" && vt.test(t) ? o(t) : t || [], !1).length
            }
        });
        var ie, At = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, Lt = o.fn.init = function(t, n, i) {
            var s, u;
            if (!t)
                return this;
            if (i = i || ie,
            typeof t == "string")
                if (t[0] === "<" && t[t.length - 1] === ">" && t.length >= 3 ? s = [null, t, null] : s = At.exec(t),
                s && (s[1] || !n))
                    if (s[1]) {
                        if (n = n instanceof o ? n[0] : n,
                        o.merge(this, o.parseHTML(s[1], n && n.nodeType ? n.ownerDocument || n : R, !0)),
                        bt.test(s[1]) && o.isPlainObject(n))
                            for (s in n)
                                k(this[s]) ? this[s](n[s]) : this.attr(s, n[s]);
                        return this
                    } else
                        return u = R.getElementById(s[2]),
                        u && (this[0] = u,
                        this.length = 1),
                        this;
                else
                    return !n || n.jquery ? (n || i).find(t) : this.constructor(n).find(t);
            else {
                if (t.nodeType)
                    return this[0] = t,
                    this.length = 1,
                    this;
                if (k(t))
                    return i.ready !== void 0 ? i.ready(t) : t(o)
            }
            return o.makeArray(t, this)
        }
        ;
        Lt.prototype = o.fn,
        ie = o(R);
        var Qe = /^(?:parents|prev(?:Until|All))/
          , ue = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
        o.fn.extend({
            has: function(t) {
                var n = o(t, this)
                  , i = n.length;
                return this.filter(function() {
                    for (var s = 0; s < i; s++)
                        if (o.contains(this, n[s]))
                            return !0
                })
            },
            closest: function(t, n) {
                var i, s = 0, u = this.length, c = [], f = typeof t != "string" && o(t);
                if (!vt.test(t)) {
                    for (; s < u; s++)
                        for (i = this[s]; i && i !== n; i = i.parentNode)
                            if (i.nodeType < 11 && (f ? f.index(i) > -1 : i.nodeType === 1 && o.find.matchesSelector(i, t))) {
                                c.push(i);
                                break
                            }
                }
                return this.pushStack(c.length > 1 ? o.uniqueSort(c) : c)
            },
            index: function(t) {
                return t ? typeof t == "string" ? D.call(o(t), this[0]) : D.call(this, t.jquery ? t[0] : t) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(t, n) {
                return this.pushStack(o.uniqueSort(o.merge(this.get(), o(t, n))))
            },
            addBack: function(t) {
                return this.add(t == null ? this.prevObject : this.prevObject.filter(t))
            }
        });
        function De(t, n) {
            for (; (t = t[n]) && t.nodeType !== 1; )
                ;
            return t
        }
        o.each({
            parent: function(t) {
                var n = t.parentNode;
                return n && n.nodeType !== 11 ? n : null
            },
            parents: function(t) {
                return ct(t, "parentNode")
            },
            parentsUntil: function(t, n, i) {
                return ct(t, "parentNode", i)
            },
            next: function(t) {
                return De(t, "nextSibling")
            },
            prev: function(t) {
                return De(t, "previousSibling")
            },
            nextAll: function(t) {
                return ct(t, "nextSibling")
            },
            prevAll: function(t) {
                return ct(t, "previousSibling")
            },
            nextUntil: function(t, n, i) {
                return ct(t, "nextSibling", i)
            },
            prevUntil: function(t, n, i) {
                return ct(t, "previousSibling", i)
            },
            siblings: function(t) {
                return gt((t.parentNode || {}).firstChild, t)
            },
            children: function(t) {
                return gt(t.firstChild)
            },
            contents: function(t) {
                return t.contentDocument != null && h(t.contentDocument) ? t.contentDocument : (ft(t, "template") && (t = t.content || t),
                o.merge([], t.childNodes))
            }
        }, function(t, n) {
            o.fn[t] = function(i, s) {
                var u = o.map(this, n, i);
                return t.slice(-5) !== "Until" && (s = i),
                s && typeof s == "string" && (u = o.filter(s, u)),
                this.length > 1 && (ue[t] || o.uniqueSort(u),
                Qe.test(t) && u.reverse()),
                this.pushStack(u)
            }
        });
        var Nt = /[^\x20\t\r\n\f]+/g;
        function Le(t) {
            var n = {};
            return o.each(t.match(Nt) || [], function(i, s) {
                n[s] = !0
            }),
            n
        }
        o.Callbacks = function(t) {
            t = typeof t == "string" ? Le(t) : o.extend({}, t);
            var n, i, s, u, c = [], f = [], m = -1, p = function() {
                for (u = u || t.once,
                s = n = !0; f.length; m = -1)
                    for (i = f.shift(); ++m < c.length; )
                        c[m].apply(i[0], i[1]) === !1 && t.stopOnFalse && (m = c.length,
                        i = !1);
                t.memory || (i = !1),
                n = !1,
                u && (i ? c = [] : c = "")
            }, b = {
                add: function() {
                    return c && (i && !n && (m = c.length - 1,
                    f.push(i)),
                    function A(x) {
                        o.each(x, function(T, w) {
                            k(w) ? (!t.unique || !b.has(w)) && c.push(w) : w && w.length && X(w) !== "string" && A(w)
                        })
                    }(arguments),
                    i && !n && p()),
                    this
                },
                remove: function() {
                    return o.each(arguments, function(A, x) {
                        for (var T; (T = o.inArray(x, c, T)) > -1; )
                            c.splice(T, 1),
                            T <= m && m--
                    }),
                    this
                },
                has: function(A) {
                    return A ? o.inArray(A, c) > -1 : c.length > 0
                },
                empty: function() {
                    return c && (c = []),
                    this
                },
                disable: function() {
                    return u = f = [],
                    c = i = "",
                    this
                },
                disabled: function() {
                    return !c
                },
                lock: function() {
                    return u = f = [],
                    !i && !n && (c = i = ""),
                    this
                },
                locked: function() {
                    return !!u
                },
                fireWith: function(A, x) {
                    return u || (x = x || [],
                    x = [A, x.slice ? x.slice() : x],
                    f.push(x),
                    n || p()),
                    this
                },
                fire: function() {
                    return b.fireWith(this, arguments),
                    this
                },
                fired: function() {
                    return !!s
                }
            };
            return b
        }
        ;
        function Xt(t) {
            return t
        }
        function Qt(t) {
            throw t
        }
        function Jt(t, n, i, s) {
            var u;
            try {
                t && k(u = t.promise) ? u.call(t).done(n).fail(i) : t && k(u = t.then) ? u.call(t, n, i) : n.apply(void 0, [t].slice(s))
            } catch (c) {
                i.apply(void 0, [c])
            }
        }
        o.extend({
            Deferred: function(t) {
                var n = [["notify", "progress", o.Callbacks("memory"), o.Callbacks("memory"), 2], ["resolve", "done", o.Callbacks("once memory"), o.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", o.Callbacks("once memory"), o.Callbacks("once memory"), 1, "rejected"]]
                  , i = "pending"
                  , s = {
                    state: function() {
                        return i
                    },
                    always: function() {
                        return u.done(arguments).fail(arguments),
                        this
                    },
                    catch: function(c) {
                        return s.then(null, c)
                    },
                    pipe: function() {
                        var c = arguments;
                        return o.Deferred(function(f) {
                            o.each(n, function(m, p) {
                                var b = k(c[p[4]]) && c[p[4]];
                                u[p[1]](function() {
                                    var A = b && b.apply(this, arguments);
                                    A && k(A.promise) ? A.promise().progress(f.notify).done(f.resolve).fail(f.reject) : f[p[0] + "With"](this, b ? [A] : arguments)
                                })
                            }),
                            c = null
                        }).promise()
                    },
                    then: function(c, f, m) {
                        var p = 0;
                        function b(A, x, T, w) {
                            return function() {
                                var V = this
                                  , G = arguments
                                  , H = function() {
                                    var mt, Pt;
                                    if (!(A < p)) {
                                        if (mt = T.apply(V, G),
                                        mt === x.promise())
                                            throw new TypeError("Thenable self-resolution");
                                        Pt = mt && (typeof mt == "object" || typeof mt == "function") && mt.then,
                                        k(Pt) ? w ? Pt.call(mt, b(p, x, Xt, w), b(p, x, Qt, w)) : (p++,
                                        Pt.call(mt, b(p, x, Xt, w), b(p, x, Qt, w), b(p, x, Xt, x.notifyWith))) : (T !== Xt && (V = void 0,
                                        G = [mt]),
                                        (w || x.resolveWith)(V, G))
                                    }
                                }
                                  , _t = w ? H : function() {
                                    try {
                                        H()
                                    } catch (mt) {
                                        o.Deferred.exceptionHook && o.Deferred.exceptionHook(mt, _t.stackTrace),
                                        A + 1 >= p && (T !== Qt && (V = void 0,
                                        G = [mt]),
                                        x.rejectWith(V, G))
                                    }
                                }
                                ;
                                A ? _t() : (o.Deferred.getStackHook && (_t.stackTrace = o.Deferred.getStackHook()),
                                e.setTimeout(_t))
                            }
                        }
                        return o.Deferred(function(A) {
                            n[0][3].add(b(0, A, k(m) ? m : Xt, A.notifyWith)),
                            n[1][3].add(b(0, A, k(c) ? c : Xt)),
                            n[2][3].add(b(0, A, k(f) ? f : Qt))
                        }).promise()
                    },
                    promise: function(c) {
                        return c != null ? o.extend(c, s) : s
                    }
                }
                  , u = {};
                return o.each(n, function(c, f) {
                    var m = f[2]
                      , p = f[5];
                    s[f[1]] = m.add,
                    p && m.add(function() {
                        i = p
                    }, n[3 - c][2].disable, n[3 - c][3].disable, n[0][2].lock, n[0][3].lock),
                    m.add(f[3].fire),
                    u[f[0]] = function() {
                        return u[f[0] + "With"](this === u ? void 0 : this, arguments),
                        this
                    }
                    ,
                    u[f[0] + "With"] = m.fireWith
                }),
                s.promise(u),
                t && t.call(u, u),
                u
            },
            when: function(t) {
                var n = arguments.length
                  , i = n
                  , s = Array(i)
                  , u = _.call(arguments)
                  , c = o.Deferred()
                  , f = function(m) {
                    return function(p) {
                        s[m] = this,
                        u[m] = arguments.length > 1 ? _.call(arguments) : p,
                        --n || c.resolveWith(s, u)
                    }
                };
                if (n <= 1 && (Jt(t, c.done(f(i)).resolve, c.reject, !n),
                c.state() === "pending" || k(u[i] && u[i].then)))
                    return c.then();
                for (; i--; )
                    Jt(u[i], f(i), c.reject);
                return c.promise()
            }
        });
        var $e = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        o.Deferred.exceptionHook = function(t, n) {
            e.console && e.console.warn && t && $e.test(t.name) && e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, n)
        }
        ,
        o.readyException = function(t) {
            e.setTimeout(function() {
                throw t
            })
        }
        ;
        var ye = o.Deferred();
        o.fn.ready = function(t) {
            return ye.then(t).catch(function(n) {
                o.readyException(n)
            }),
            this
        }
        ,
        o.extend({
            isReady: !1,
            readyWait: 1,
            ready: function(t) {
                (t === !0 ? --o.readyWait : o.isReady) || (o.isReady = !0,
                !(t !== !0 && --o.readyWait > 0) && ye.resolveWith(R, [o]))
            }
        }),
        o.ready.then = ye.then;
        function qt() {
            R.removeEventListener("DOMContentLoaded", qt),
            e.removeEventListener("load", qt),
            o.ready()
        }
        R.readyState === "complete" || R.readyState !== "loading" && !R.documentElement.doScroll ? e.setTimeout(o.ready) : (R.addEventListener("DOMContentLoaded", qt),
        e.addEventListener("load", qt));
        var $t = function(t, n, i, s, u, c, f) {
            var m = 0
              , p = t.length
              , b = i == null;
            if (X(i) === "object") {
                u = !0;
                for (m in i)
                    $t(t, n, m, i[m], !0, c, f)
            } else if (s !== void 0 && (u = !0,
            k(s) || (f = !0),
            b && (f ? (n.call(t, s),
            n = null) : (b = n,
            n = function(A, x, T) {
                return b.call(o(A), T)
            }
            )),
            n))
                for (; m < p; m++)
                    n(t[m], i, f ? s : s.call(t[m], m, n(t[m], i)));
            return u ? t : b ? n.call(t) : p ? n(t[0], i) : c
        }
          , Ai = /^-ms-/
          , Tn = /-([a-z])/g;
        function wi(t, n) {
            return n.toUpperCase()
        }
        function It(t) {
            return t.replace(Ai, "ms-").replace(Tn, wi)
        }
        var Ie = function(t) {
            return t.nodeType === 1 || t.nodeType === 9 || !+t.nodeType
        };
        function ke() {
            this.expando = o.expando + ke.uid++
        }
        ke.uid = 1,
        ke.prototype = {
            cache: function(t) {
                var n = t[this.expando];
                return n || (n = {},
                Ie(t) && (t.nodeType ? t[this.expando] = n : Object.defineProperty(t, this.expando, {
                    value: n,
                    configurable: !0
                }))),
                n
            },
            set: function(t, n, i) {
                var s, u = this.cache(t);
                if (typeof n == "string")
                    u[It(n)] = i;
                else
                    for (s in n)
                        u[It(s)] = n[s];
                return u
            },
            get: function(t, n) {
                return n === void 0 ? this.cache(t) : t[this.expando] && t[this.expando][It(n)]
            },
            access: function(t, n, i) {
                return n === void 0 || n && typeof n == "string" && i === void 0 ? this.get(t, n) : (this.set(t, n, i),
                i !== void 0 ? i : n)
            },
            remove: function(t, n) {
                var i, s = t[this.expando];
                if (s !== void 0) {
                    if (n !== void 0)
                        for (Array.isArray(n) ? n = n.map(It) : (n = It(n),
                        n = n in s ? [n] : n.match(Nt) || []),
                        i = n.length; i--; )
                            delete s[n[i]];
                    (n === void 0 || o.isEmptyObject(s)) && (t.nodeType ? t[this.expando] = void 0 : delete t[this.expando])
                }
            },
            hasData: function(t) {
                var n = t[this.expando];
                return n !== void 0 && !o.isEmptyObject(n)
            }
        };
        var q = new ke
          , Et = new ke
          , Ci = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
          , Ni = /[A-Z]/g;
        function ce(t) {
            return t === "true" ? !0 : t === "false" ? !1 : t === "null" ? null : t === +t + "" ? +t : Ci.test(t) ? JSON.parse(t) : t
        }
        function Pe(t, n, i) {
            var s;
            if (i === void 0 && t.nodeType === 1)
                if (s = "data-" + n.replace(Ni, "-$&").toLowerCase(),
                i = t.getAttribute(s),
                typeof i == "string") {
                    try {
                        i = ce(i)
                    } catch {}
                    Et.set(t, n, i)
                } else
                    i = void 0;
            return i
        }
        o.extend({
            hasData: function(t) {
                return Et.hasData(t) || q.hasData(t)
            },
            data: function(t, n, i) {
                return Et.access(t, n, i)
            },
            removeData: function(t, n) {
                Et.remove(t, n)
            },
            _data: function(t, n, i) {
                return q.access(t, n, i)
            },
            _removeData: function(t, n) {
                q.remove(t, n)
            }
        }),
        o.fn.extend({
            data: function(t, n) {
                var i, s, u, c = this[0], f = c && c.attributes;
                if (t === void 0) {
                    if (this.length && (u = Et.get(c),
                    c.nodeType === 1 && !q.get(c, "hasDataAttrs"))) {
                        for (i = f.length; i--; )
                            f[i] && (s = f[i].name,
                            s.indexOf("data-") === 0 && (s = It(s.slice(5)),
                            Pe(c, s, u[s])));
                        q.set(c, "hasDataAttrs", !0)
                    }
                    return u
                }
                return typeof t == "object" ? this.each(function() {
                    Et.set(this, t)
                }) : $t(this, function(m) {
                    var p;
                    if (c && m === void 0)
                        return p = Et.get(c, t),
                        p !== void 0 || (p = Pe(c, t),
                        p !== void 0) ? p : void 0;
                    this.each(function() {
                        Et.set(this, t, m)
                    })
                }, null, n, arguments.length > 1, null, !0)
            },
            removeData: function(t) {
                return this.each(function() {
                    Et.remove(this, t)
                })
            }
        }),
        o.extend({
            queue: function(t, n, i) {
                var s;
                if (t)
                    return n = (n || "fx") + "queue",
                    s = q.get(t, n),
                    i && (!s || Array.isArray(i) ? s = q.access(t, n, o.makeArray(i)) : s.push(i)),
                    s || []
            },
            dequeue: function(t, n) {
                n = n || "fx";
                var i = o.queue(t, n)
                  , s = i.length
                  , u = i.shift()
                  , c = o._queueHooks(t, n)
                  , f = function() {
                    o.dequeue(t, n)
                };
                u === "inprogress" && (u = i.shift(),
                s--),
                u && (n === "fx" && i.unshift("inprogress"),
                delete c.stop,
                u.call(t, f, c)),
                !s && c && c.empty.fire()
            },
            _queueHooks: function(t, n) {
                var i = n + "queueHooks";
                return q.get(t, i) || q.access(t, i, {
                    empty: o.Callbacks("once memory").add(function() {
                        q.remove(t, [n + "queue", i])
                    })
                })
            }
        }),
        o.fn.extend({
            queue: function(t, n) {
                var i = 2;
                return typeof t != "string" && (n = t,
                t = "fx",
                i--),
                arguments.length < i ? o.queue(this[0], t) : n === void 0 ? this : this.each(function() {
                    var s = o.queue(this, t, n);
                    o._queueHooks(this, t),
                    t === "fx" && s[0] !== "inprogress" && o.dequeue(this, t)
                })
            },
            dequeue: function(t) {
                return this.each(function() {
                    o.dequeue(this, t)
                })
            },
            clearQueue: function(t) {
                return this.queue(t || "fx", [])
            },
            promise: function(t, n) {
                var i, s = 1, u = o.Deferred(), c = this, f = this.length, m = function() {
                    --s || u.resolveWith(c, [c])
                };
                for (typeof t != "string" && (n = t,
                t = void 0),
                t = t || "fx"; f--; )
                    i = q.get(c[f], t + "queueHooks"),
                    i && i.empty && (s++,
                    i.empty.add(m));
                return m(),
                u.promise(n)
            }
        });
        var An = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
          , be = new RegExp("^(?:([+-])=|)(" + An + ")([a-z%]*)$","i")
          , kt = ["Top", "Right", "Bottom", "Left"]
          , re = R.documentElement
          , le = function(t) {
            return o.contains(t.ownerDocument, t)
        }
          , Bn = {
            composed: !0
        };
        re.getRootNode && (le = function(t) {
            return o.contains(t.ownerDocument, t) || t.getRootNode(Bn) === t.ownerDocument
        }
        );
        var Me = function(t, n) {
            return t = n || t,
            t.style.display === "none" || t.style.display === "" && le(t) && o.css(t, "display") === "none"
        };
        function kr(t, n, i, s) {
            var u, c, f = 20, m = s ? function() {
                return s.cur()
            }
            : function() {
                return o.css(t, n, "")
            }
            , p = m(), b = i && i[3] || (o.cssNumber[n] ? "" : "px"), A = t.nodeType && (o.cssNumber[n] || b !== "px" && +p) && be.exec(o.css(t, n));
            if (A && A[3] !== b) {
                for (p = p / 2,
                b = b || A[3],
                A = +p || 1; f--; )
                    o.style(t, n, A + b),
                    (1 - c) * (1 - (c = m() / p || .5)) <= 0 && (f = 0),
                    A = A / c;
                A = A * 2,
                o.style(t, n, A + b),
                i = i || []
            }
            return i && (A = +A || +p || 0,
            u = i[1] ? A + (i[1] + 1) * i[2] : +i[2],
            s && (s.unit = b,
            s.start = A,
            s.end = u)),
            u
        }
        var Pr = {};
        function na(t) {
            var n, i = t.ownerDocument, s = t.nodeName, u = Pr[s];
            return u || (n = i.body.appendChild(i.createElement(s)),
            u = o.css(n, "display"),
            n.parentNode.removeChild(n),
            u === "none" && (u = "block"),
            Pr[s] = u,
            u)
        }
        function Je(t, n) {
            for (var i, s, u = [], c = 0, f = t.length; c < f; c++)
                s = t[c],
                s.style && (i = s.style.display,
                n ? (i === "none" && (u[c] = q.get(s, "display") || null,
                u[c] || (s.style.display = "")),
                s.style.display === "" && Me(s) && (u[c] = na(s))) : i !== "none" && (u[c] = "none",
                q.set(s, "display", i)));
            for (c = 0; c < f; c++)
                u[c] != null && (t[c].style.display = u[c]);
            return t
        }
        o.fn.extend({
            show: function() {
                return Je(this, !0)
            },
            hide: function() {
                return Je(this)
            },
            toggle: function(t) {
                return typeof t == "boolean" ? t ? this.show() : this.hide() : this.each(function() {
                    Me(this) ? o(this).show() : o(this).hide()
                })
            }
        });
        var wn = /^(?:checkbox|radio)$/i
          , Mr = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i
          , Rr = /^$|^module$|\/(?:java|ecma)script/i;
        (function() {
            var t = R.createDocumentFragment()
              , n = t.appendChild(R.createElement("div"))
              , i = R.createElement("input");
            i.setAttribute("type", "radio"),
            i.setAttribute("checked", "checked"),
            i.setAttribute("name", "t"),
            n.appendChild(i),
            j.checkClone = n.cloneNode(!0).cloneNode(!0).lastChild.checked,
            n.innerHTML = "<textarea>x</textarea>",
            j.noCloneChecked = !!n.cloneNode(!0).lastChild.defaultValue,
            n.innerHTML = "<option></option>",
            j.option = !!n.lastChild
        }
        )();
        var Wt = {
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
        Wt.tbody = Wt.tfoot = Wt.colgroup = Wt.caption = Wt.thead,
        Wt.th = Wt.td,
        j.option || (Wt.optgroup = Wt.option = [1, "<select multiple='multiple'>", "</select>"]);
        function St(t, n) {
            var i;
            return typeof t.getElementsByTagName < "u" ? i = t.getElementsByTagName(n || "*") : typeof t.querySelectorAll < "u" ? i = t.querySelectorAll(n || "*") : i = [],
            n === void 0 || n && ft(t, n) ? o.merge([t], i) : i
        }
        function Si(t, n) {
            for (var i = 0, s = t.length; i < s; i++)
                q.set(t[i], "globalEval", !n || q.get(n[i], "globalEval"))
        }
        var ia = /<|&#?\w+;/;
        function Hr(t, n, i, s, u) {
            for (var c, f, m, p, b, A, x = n.createDocumentFragment(), T = [], w = 0, V = t.length; w < V; w++)
                if (c = t[w],
                c || c === 0)
                    if (X(c) === "object")
                        o.merge(T, c.nodeType ? [c] : c);
                    else if (!ia.test(c))
                        T.push(n.createTextNode(c));
                    else {
                        for (f = f || x.appendChild(n.createElement("div")),
                        m = (Mr.exec(c) || ["", ""])[1].toLowerCase(),
                        p = Wt[m] || Wt._default,
                        f.innerHTML = p[1] + o.htmlPrefilter(c) + p[2],
                        A = p[0]; A--; )
                            f = f.lastChild;
                        o.merge(T, f.childNodes),
                        f = x.firstChild,
                        f.textContent = ""
                    }
            for (x.textContent = "",
            w = 0; c = T[w++]; ) {
                if (s && o.inArray(c, s) > -1) {
                    u && u.push(c);
                    continue
                }
                if (b = le(c),
                f = St(x.appendChild(c), "script"),
                b && Si(f),
                i)
                    for (A = 0; c = f[A++]; )
                        Rr.test(c.type || "") && i.push(c)
            }
            return x
        }
        var jr = /^([^.]*)(?:\.(.+)|)/;
        function Ze() {
            return !0
        }
        function tn() {
            return !1
        }
        function ra(t, n) {
            return t === sa() == (n === "focus")
        }
        function sa() {
            try {
                return R.activeElement
            } catch {}
        }
        function xi(t, n, i, s, u, c) {
            var f, m;
            if (typeof n == "object") {
                typeof i != "string" && (s = s || i,
                i = void 0);
                for (m in n)
                    xi(t, m, i, s, n[m], c);
                return t
            }
            if (s == null && u == null ? (u = i,
            s = i = void 0) : u == null && (typeof i == "string" ? (u = s,
            s = void 0) : (u = s,
            s = i,
            i = void 0)),
            u === !1)
                u = tn;
            else if (!u)
                return t;
            return c === 1 && (f = u,
            u = function(p) {
                return o().off(p),
                f.apply(this, arguments)
            }
            ,
            u.guid = f.guid || (f.guid = o.guid++)),
            t.each(function() {
                o.event.add(this, n, u, s, i)
            })
        }
        o.event = {
            global: {},
            add: function(t, n, i, s, u) {
                var c, f, m, p, b, A, x, T, w, V, G, H = q.get(t);
                if (Ie(t))
                    for (i.handler && (c = i,
                    i = c.handler,
                    u = c.selector),
                    u && o.find.matchesSelector(re, u),
                    i.guid || (i.guid = o.guid++),
                    (p = H.events) || (p = H.events = Object.create(null)),
                    (f = H.handle) || (f = H.handle = function(_t) {
                        return typeof o < "u" && o.event.triggered !== _t.type ? o.event.dispatch.apply(t, arguments) : void 0
                    }
                    ),
                    n = (n || "").match(Nt) || [""],
                    b = n.length; b--; )
                        m = jr.exec(n[b]) || [],
                        w = G = m[1],
                        V = (m[2] || "").split(".").sort(),
                        w && (x = o.event.special[w] || {},
                        w = (u ? x.delegateType : x.bindType) || w,
                        x = o.event.special[w] || {},
                        A = o.extend({
                            type: w,
                            origType: G,
                            data: s,
                            handler: i,
                            guid: i.guid,
                            selector: u,
                            needsContext: u && o.expr.match.needsContext.test(u),
                            namespace: V.join(".")
                        }, c),
                        (T = p[w]) || (T = p[w] = [],
                        T.delegateCount = 0,
                        (!x.setup || x.setup.call(t, s, V, f) === !1) && t.addEventListener && t.addEventListener(w, f)),
                        x.add && (x.add.call(t, A),
                        A.handler.guid || (A.handler.guid = i.guid)),
                        u ? T.splice(T.delegateCount++, 0, A) : T.push(A),
                        o.event.global[w] = !0)
            },
            remove: function(t, n, i, s, u) {
                var c, f, m, p, b, A, x, T, w, V, G, H = q.hasData(t) && q.get(t);
                if (!(!H || !(p = H.events))) {
                    for (n = (n || "").match(Nt) || [""],
                    b = n.length; b--; ) {
                        if (m = jr.exec(n[b]) || [],
                        w = G = m[1],
                        V = (m[2] || "").split(".").sort(),
                        !w) {
                            for (w in p)
                                o.event.remove(t, w + n[b], i, s, !0);
                            continue
                        }
                        for (x = o.event.special[w] || {},
                        w = (s ? x.delegateType : x.bindType) || w,
                        T = p[w] || [],
                        m = m[2] && new RegExp("(^|\\.)" + V.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                        f = c = T.length; c--; )
                            A = T[c],
                            (u || G === A.origType) && (!i || i.guid === A.guid) && (!m || m.test(A.namespace)) && (!s || s === A.selector || s === "**" && A.selector) && (T.splice(c, 1),
                            A.selector && T.delegateCount--,
                            x.remove && x.remove.call(t, A));
                        f && !T.length && ((!x.teardown || x.teardown.call(t, V, H.handle) === !1) && o.removeEvent(t, w, H.handle),
                        delete p[w])
                    }
                    o.isEmptyObject(p) && q.remove(t, "handle events")
                }
            },
            dispatch: function(t) {
                var n, i, s, u, c, f, m = new Array(arguments.length), p = o.event.fix(t), b = (q.get(this, "events") || Object.create(null))[p.type] || [], A = o.event.special[p.type] || {};
                for (m[0] = p,
                n = 1; n < arguments.length; n++)
                    m[n] = arguments[n];
                if (p.delegateTarget = this,
                !(A.preDispatch && A.preDispatch.call(this, p) === !1)) {
                    for (f = o.event.handlers.call(this, p, b),
                    n = 0; (u = f[n++]) && !p.isPropagationStopped(); )
                        for (p.currentTarget = u.elem,
                        i = 0; (c = u.handlers[i++]) && !p.isImmediatePropagationStopped(); )
                            (!p.rnamespace || c.namespace === !1 || p.rnamespace.test(c.namespace)) && (p.handleObj = c,
                            p.data = c.data,
                            s = ((o.event.special[c.origType] || {}).handle || c.handler).apply(u.elem, m),
                            s !== void 0 && (p.result = s) === !1 && (p.preventDefault(),
                            p.stopPropagation()));
                    return A.postDispatch && A.postDispatch.call(this, p),
                    p.result
                }
            },
            handlers: function(t, n) {
                var i, s, u, c, f, m = [], p = n.delegateCount, b = t.target;
                if (p && b.nodeType && !(t.type === "click" && t.button >= 1)) {
                    for (; b !== this; b = b.parentNode || this)
                        if (b.nodeType === 1 && !(t.type === "click" && b.disabled === !0)) {
                            for (c = [],
                            f = {},
                            i = 0; i < p; i++)
                                s = n[i],
                                u = s.selector + " ",
                                f[u] === void 0 && (f[u] = s.needsContext ? o(u, this).index(b) > -1 : o.find(u, this, null, [b]).length),
                                f[u] && c.push(s);
                            c.length && m.push({
                                elem: b,
                                handlers: c
                            })
                        }
                }
                return b = this,
                p < n.length && m.push({
                    elem: b,
                    handlers: n.slice(p)
                }),
                m
            },
            addProp: function(t, n) {
                Object.defineProperty(o.Event.prototype, t, {
                    enumerable: !0,
                    configurable: !0,
                    get: k(n) ? function() {
                        if (this.originalEvent)
                            return n(this.originalEvent)
                    }
                    : function() {
                        if (this.originalEvent)
                            return this.originalEvent[t]
                    }
                    ,
                    set: function(i) {
                        Object.defineProperty(this, t, {
                            enumerable: !0,
                            configurable: !0,
                            writable: !0,
                            value: i
                        })
                    }
                })
            },
            fix: function(t) {
                return t[o.expando] ? t : new o.Event(t)
            },
            special: {
                load: {
                    noBubble: !0
                },
                click: {
                    setup: function(t) {
                        var n = this || t;
                        return wn.test(n.type) && n.click && ft(n, "input") && Fn(n, "click", Ze),
                        !1
                    },
                    trigger: function(t) {
                        var n = this || t;
                        return wn.test(n.type) && n.click && ft(n, "input") && Fn(n, "click"),
                        !0
                    },
                    _default: function(t) {
                        var n = t.target;
                        return wn.test(n.type) && n.click && ft(n, "input") && q.get(n, "click") || ft(n, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(t) {
                        t.result !== void 0 && t.originalEvent && (t.originalEvent.returnValue = t.result)
                    }
                }
            }
        };
        function Fn(t, n, i) {
            if (!i) {
                q.get(t, n) === void 0 && o.event.add(t, n, Ze);
                return
            }
            q.set(t, n, !1),
            o.event.add(t, n, {
                namespace: !1,
                handler: function(s) {
                    var u, c, f = q.get(this, n);
                    if (s.isTrigger & 1 && this[n]) {
                        if (f.length)
                            (o.event.special[n] || {}).delegateType && s.stopPropagation();
                        else if (f = _.call(arguments),
                        q.set(this, n, f),
                        u = i(this, n),
                        this[n](),
                        c = q.get(this, n),
                        f !== c || u ? q.set(this, n, !1) : c = {},
                        f !== c)
                            return s.stopImmediatePropagation(),
                            s.preventDefault(),
                            c && c.value
                    } else
                        f.length && (q.set(this, n, {
                            value: o.event.trigger(o.extend(f[0], o.Event.prototype), f.slice(1), this)
                        }),
                        s.stopImmediatePropagation())
                }
            })
        }
        o.removeEvent = function(t, n, i) {
            t.removeEventListener && t.removeEventListener(n, i)
        }
        ,
        o.Event = function(t, n) {
            if (!(this instanceof o.Event))
                return new o.Event(t,n);
            t && t.type ? (this.originalEvent = t,
            this.type = t.type,
            this.isDefaultPrevented = t.defaultPrevented || t.defaultPrevented === void 0 && t.returnValue === !1 ? Ze : tn,
            this.target = t.target && t.target.nodeType === 3 ? t.target.parentNode : t.target,
            this.currentTarget = t.currentTarget,
            this.relatedTarget = t.relatedTarget) : this.type = t,
            n && o.extend(this, n),
            this.timeStamp = t && t.timeStamp || Date.now(),
            this[o.expando] = !0
        }
        ,
        o.Event.prototype = {
            constructor: o.Event,
            isDefaultPrevented: tn,
            isPropagationStopped: tn,
            isImmediatePropagationStopped: tn,
            isSimulated: !1,
            preventDefault: function() {
                var t = this.originalEvent;
                this.isDefaultPrevented = Ze,
                t && !this.isSimulated && t.preventDefault()
            },
            stopPropagation: function() {
                var t = this.originalEvent;
                this.isPropagationStopped = Ze,
                t && !this.isSimulated && t.stopPropagation()
            },
            stopImmediatePropagation: function() {
                var t = this.originalEvent;
                this.isImmediatePropagationStopped = Ze,
                t && !this.isSimulated && t.stopImmediatePropagation(),
                this.stopPropagation()
            }
        },
        o.each({
            altKey: !0,
            bubbles: !0,
            cancelable: !0,
            changedTouches: !0,
            ctrlKey: !0,
            detail: !0,
            eventPhase: !0,
            metaKey: !0,
            pageX: !0,
            pageY: !0,
            shiftKey: !0,
            view: !0,
            char: !0,
            code: !0,
            charCode: !0,
            key: !0,
            keyCode: !0,
            button: !0,
            buttons: !0,
            clientX: !0,
            clientY: !0,
            offsetX: !0,
            offsetY: !0,
            pointerId: !0,
            pointerType: !0,
            screenX: !0,
            screenY: !0,
            targetTouches: !0,
            toElement: !0,
            touches: !0,
            which: !0
        }, o.event.addProp),
        o.each({
            focus: "focusin",
            blur: "focusout"
        }, function(t, n) {
            o.event.special[t] = {
                setup: function() {
                    return Fn(this, t, ra),
                    !1
                },
                trigger: function() {
                    return Fn(this, t),
                    !0
                },
                _default: function(i) {
                    return q.get(i.target, t)
                },
                delegateType: n
            }
        }),
        o.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function(t, n) {
            o.event.special[t] = {
                delegateType: n,
                bindType: n,
                handle: function(i) {
                    var s, u = this, c = i.relatedTarget, f = i.handleObj;
                    return (!c || c !== u && !o.contains(u, c)) && (i.type = f.origType,
                    s = f.handler.apply(this, arguments),
                    i.type = n),
                    s
                }
            }
        }),
        o.fn.extend({
            on: function(t, n, i, s) {
                return xi(this, t, n, i, s)
            },
            one: function(t, n, i, s) {
                return xi(this, t, n, i, s, 1)
            },
            off: function(t, n, i) {
                var s, u;
                if (t && t.preventDefault && t.handleObj)
                    return s = t.handleObj,
                    o(t.delegateTarget).off(s.namespace ? s.origType + "." + s.namespace : s.origType, s.selector, s.handler),
                    this;
                if (typeof t == "object") {
                    for (u in t)
                        this.off(u, n, t[u]);
                    return this
                }
                return (n === !1 || typeof n == "function") && (i = n,
                n = void 0),
                i === !1 && (i = tn),
                this.each(function() {
                    o.event.remove(this, t, i, n)
                })
            }
        });
        var oa = /<script|<style|<link/i
          , aa = /checked\s*(?:[^=]|=\s*.checked.)/i
          , ua = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
        function Vr(t, n) {
            return ft(t, "table") && ft(n.nodeType !== 11 ? n : n.firstChild, "tr") && o(t).children("tbody")[0] || t
        }
        function ca(t) {
            return t.type = (t.getAttribute("type") !== null) + "/" + t.type,
            t
        }
        function la(t) {
            return (t.type || "").slice(0, 5) === "true/" ? t.type = t.type.slice(5) : t.removeAttribute("type"),
            t
        }
        function qr(t, n) {
            var i, s, u, c, f, m, p;
            if (n.nodeType === 1) {
                if (q.hasData(t) && (c = q.get(t),
                p = c.events,
                p)) {
                    q.remove(n, "handle events");
                    for (u in p)
                        for (i = 0,
                        s = p[u].length; i < s; i++)
                            o.event.add(n, u, p[u][i])
                }
                Et.hasData(t) && (f = Et.access(t),
                m = o.extend({}, f),
                Et.set(n, m))
            }
        }
        function fa(t, n) {
            var i = n.nodeName.toLowerCase();
            i === "input" && wn.test(t.type) ? n.checked = t.checked : (i === "input" || i === "textarea") && (n.defaultValue = t.defaultValue)
        }
        function en(t, n, i, s) {
            n = E(n);
            var u, c, f, m, p, b, A = 0, x = t.length, T = x - 1, w = n[0], V = k(w);
            if (V || x > 1 && typeof w == "string" && !j.checkClone && aa.test(w))
                return t.each(function(G) {
                    var H = t.eq(G);
                    V && (n[0] = w.call(this, G, H.html())),
                    en(H, n, i, s)
                });
            if (x && (u = Hr(n, t[0].ownerDocument, !1, t, s),
            c = u.firstChild,
            u.childNodes.length === 1 && (u = c),
            c || s)) {
                for (f = o.map(St(u, "script"), ca),
                m = f.length; A < x; A++)
                    p = u,
                    A !== T && (p = o.clone(p, !0, !0),
                    m && o.merge(f, St(p, "script"))),
                    i.call(t[A], p, A);
                if (m)
                    for (b = f[f.length - 1].ownerDocument,
                    o.map(f, la),
                    A = 0; A < m; A++)
                        p = f[A],
                        Rr.test(p.type || "") && !q.access(p, "globalEval") && o.contains(b, p) && (p.src && (p.type || "").toLowerCase() !== "module" ? o._evalUrl && !p.noModule && o._evalUrl(p.src, {
                            nonce: p.nonce || p.getAttribute("nonce")
                        }, b) : lt(p.textContent.replace(ua, ""), p, b))
            }
            return t
        }
        function Wr(t, n, i) {
            for (var s, u = n ? o.filter(n, t) : t, c = 0; (s = u[c]) != null; c++)
                !i && s.nodeType === 1 && o.cleanData(St(s)),
                s.parentNode && (i && le(s) && Si(St(s, "script")),
                s.parentNode.removeChild(s));
            return t
        }
        o.extend({
            htmlPrefilter: function(t) {
                return t
            },
            clone: function(t, n, i) {
                var s, u, c, f, m = t.cloneNode(!0), p = le(t);
                if (!j.noCloneChecked && (t.nodeType === 1 || t.nodeType === 11) && !o.isXMLDoc(t))
                    for (f = St(m),
                    c = St(t),
                    s = 0,
                    u = c.length; s < u; s++)
                        fa(c[s], f[s]);
                if (n)
                    if (i)
                        for (c = c || St(t),
                        f = f || St(m),
                        s = 0,
                        u = c.length; s < u; s++)
                            qr(c[s], f[s]);
                    else
                        qr(t, m);
                return f = St(m, "script"),
                f.length > 0 && Si(f, !p && St(t, "script")),
                m
            },
            cleanData: function(t) {
                for (var n, i, s, u = o.event.special, c = 0; (i = t[c]) !== void 0; c++)
                    if (Ie(i)) {
                        if (n = i[q.expando]) {
                            if (n.events)
                                for (s in n.events)
                                    u[s] ? o.event.remove(i, s) : o.removeEvent(i, s, n.handle);
                            i[q.expando] = void 0
                        }
                        i[Et.expando] && (i[Et.expando] = void 0)
                    }
            }
        }),
        o.fn.extend({
            detach: function(t) {
                return Wr(this, t, !0)
            },
            remove: function(t) {
                return Wr(this, t)
            },
            text: function(t) {
                return $t(this, function(n) {
                    return n === void 0 ? o.text(this) : this.empty().each(function() {
                        (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) && (this.textContent = n)
                    })
                }, null, t, arguments.length)
            },
            append: function() {
                return en(this, arguments, function(t) {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        var n = Vr(this, t);
                        n.appendChild(t)
                    }
                })
            },
            prepend: function() {
                return en(this, arguments, function(t) {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        var n = Vr(this, t);
                        n.insertBefore(t, n.firstChild)
                    }
                })
            },
            before: function() {
                return en(this, arguments, function(t) {
                    this.parentNode && this.parentNode.insertBefore(t, this)
                })
            },
            after: function() {
                return en(this, arguments, function(t) {
                    this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
                })
            },
            empty: function() {
                for (var t, n = 0; (t = this[n]) != null; n++)
                    t.nodeType === 1 && (o.cleanData(St(t, !1)),
                    t.textContent = "");
                return this
            },
            clone: function(t, n) {
                return t = t ?? !1,
                n = n ?? t,
                this.map(function() {
                    return o.clone(this, t, n)
                })
            },
            html: function(t) {
                return $t(this, function(n) {
                    var i = this[0] || {}
                      , s = 0
                      , u = this.length;
                    if (n === void 0 && i.nodeType === 1)
                        return i.innerHTML;
                    if (typeof n == "string" && !oa.test(n) && !Wt[(Mr.exec(n) || ["", ""])[1].toLowerCase()]) {
                        n = o.htmlPrefilter(n);
                        try {
                            for (; s < u; s++)
                                i = this[s] || {},
                                i.nodeType === 1 && (o.cleanData(St(i, !1)),
                                i.innerHTML = n);
                            i = 0
                        } catch {}
                    }
                    i && this.empty().append(n)
                }, null, t, arguments.length)
            },
            replaceWith: function() {
                var t = [];
                return en(this, arguments, function(n) {
                    var i = this.parentNode;
                    o.inArray(this, t) < 0 && (o.cleanData(St(this)),
                    i && i.replaceChild(n, this))
                }, t)
            }
        }),
        o.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(t, n) {
            o.fn[t] = function(i) {
                for (var s, u = [], c = o(i), f = c.length - 1, m = 0; m <= f; m++)
                    s = m === f ? this : this.clone(!0),
                    o(c[m])[n](s),
                    C.apply(u, s.get());
                return this.pushStack(u)
            }
        });
        var Oi = new RegExp("^(" + An + ")(?!px)[a-z%]+$","i")
          , Di = /^--/
          , Kn = function(t) {
            var n = t.ownerDocument.defaultView;
            return (!n || !n.opener) && (n = e),
            n.getComputedStyle(t)
        }
          , Br = function(t, n, i) {
            var s, u, c = {};
            for (u in n)
                c[u] = t.style[u],
                t.style[u] = n[u];
            s = i.call(t);
            for (u in n)
                t.style[u] = c[u];
            return s
        }
          , da = new RegExp(kt.join("|"),"i")
          , Fr = "[\\x20\\t\\r\\n\\f]"
          , ha = new RegExp("^" + Fr + "+|((?:^|[^\\\\])(?:\\\\.)*)" + Fr + "+$","g");
        (function() {
            function t() {
                if (b) {
                    p.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",
                    b.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",
                    re.appendChild(p).appendChild(b);
                    var A = e.getComputedStyle(b);
                    i = A.top !== "1%",
                    m = n(A.marginLeft) === 12,
                    b.style.right = "60%",
                    c = n(A.right) === 36,
                    s = n(A.width) === 36,
                    b.style.position = "absolute",
                    u = n(b.offsetWidth / 3) === 12,
                    re.removeChild(p),
                    b = null
                }
            }
            function n(A) {
                return Math.round(parseFloat(A))
            }
            var i, s, u, c, f, m, p = R.createElement("div"), b = R.createElement("div");
            b.style && (b.style.backgroundClip = "content-box",
            b.cloneNode(!0).style.backgroundClip = "",
            j.clearCloneStyle = b.style.backgroundClip === "content-box",
            o.extend(j, {
                boxSizingReliable: function() {
                    return t(),
                    s
                },
                pixelBoxStyles: function() {
                    return t(),
                    c
                },
                pixelPosition: function() {
                    return t(),
                    i
                },
                reliableMarginLeft: function() {
                    return t(),
                    m
                },
                scrollboxSize: function() {
                    return t(),
                    u
                },
                reliableTrDimensions: function() {
                    var A, x, T, w;
                    return f == null && (A = R.createElement("table"),
                    x = R.createElement("tr"),
                    T = R.createElement("div"),
                    A.style.cssText = "position:absolute;left:-11111px;border-collapse:separate",
                    x.style.cssText = "border:1px solid",
                    x.style.height = "1px",
                    T.style.height = "9px",
                    T.style.display = "block",
                    re.appendChild(A).appendChild(x).appendChild(T),
                    w = e.getComputedStyle(x),
                    f = parseInt(w.height, 10) + parseInt(w.borderTopWidth, 10) + parseInt(w.borderBottomWidth, 10) === x.offsetHeight,
                    re.removeChild(A)),
                    f
                }
            }))
        }
        )();
        function Cn(t, n, i) {
            var s, u, c, f, m = Di.test(n), p = t.style;
            return i = i || Kn(t),
            i && (f = i.getPropertyValue(n) || i[n],
            m && f && (f = f.replace(ha, "$1") || void 0),
            f === "" && !le(t) && (f = o.style(t, n)),
            !j.pixelBoxStyles() && Oi.test(f) && da.test(n) && (s = p.width,
            u = p.minWidth,
            c = p.maxWidth,
            p.minWidth = p.maxWidth = p.width = f,
            f = i.width,
            p.width = s,
            p.minWidth = u,
            p.maxWidth = c)),
            f !== void 0 ? f + "" : f
        }
        function Kr(t, n) {
            return {
                get: function() {
                    if (t()) {
                        delete this.get;
                        return
                    }
                    return (this.get = n).apply(this, arguments)
                }
            }
        }
        var Ur = ["Webkit", "Moz", "ms"]
          , Yr = R.createElement("div").style
          , zr = {};
        function pa(t) {
            for (var n = t[0].toUpperCase() + t.slice(1), i = Ur.length; i--; )
                if (t = Ur[i] + n,
                t in Yr)
                    return t
        }
        function Li(t) {
            var n = o.cssProps[t] || zr[t];
            return n || (t in Yr ? t : zr[t] = pa(t) || t)
        }
        var ga = /^(none|table(?!-c[ea]).+)/
          , ma = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        }
          , Gr = {
            letterSpacing: "0",
            fontWeight: "400"
        };
        function Xr(t, n, i) {
            var s = be.exec(n);
            return s ? Math.max(0, s[2] - (i || 0)) + (s[3] || "px") : n
        }
        function $i(t, n, i, s, u, c) {
            var f = n === "width" ? 1 : 0
              , m = 0
              , p = 0;
            if (i === (s ? "border" : "content"))
                return 0;
            for (; f < 4; f += 2)
                i === "margin" && (p += o.css(t, i + kt[f], !0, u)),
                s ? (i === "content" && (p -= o.css(t, "padding" + kt[f], !0, u)),
                i !== "margin" && (p -= o.css(t, "border" + kt[f] + "Width", !0, u))) : (p += o.css(t, "padding" + kt[f], !0, u),
                i !== "padding" ? p += o.css(t, "border" + kt[f] + "Width", !0, u) : m += o.css(t, "border" + kt[f] + "Width", !0, u));
            return !s && c >= 0 && (p += Math.max(0, Math.ceil(t["offset" + n[0].toUpperCase() + n.slice(1)] - c - p - m - .5)) || 0),
            p
        }
        function Qr(t, n, i) {
            var s = Kn(t)
              , u = !j.boxSizingReliable() || i
              , c = u && o.css(t, "boxSizing", !1, s) === "border-box"
              , f = c
              , m = Cn(t, n, s)
              , p = "offset" + n[0].toUpperCase() + n.slice(1);
            if (Oi.test(m)) {
                if (!i)
                    return m;
                m = "auto"
            }
            return (!j.boxSizingReliable() && c || !j.reliableTrDimensions() && ft(t, "tr") || m === "auto" || !parseFloat(m) && o.css(t, "display", !1, s) === "inline") && t.getClientRects().length && (c = o.css(t, "boxSizing", !1, s) === "border-box",
            f = p in t,
            f && (m = t[p])),
            m = parseFloat(m) || 0,
            m + $i(t, n, i || (c ? "border" : "content"), f, s, m) + "px"
        }
        o.extend({
            cssHooks: {
                opacity: {
                    get: function(t, n) {
                        if (n) {
                            var i = Cn(t, "opacity");
                            return i === "" ? "1" : i
                        }
                    }
                }
            },
            cssNumber: {
                animationIterationCount: !0,
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                gridArea: !0,
                gridColumn: !0,
                gridColumnEnd: !0,
                gridColumnStart: !0,
                gridRow: !0,
                gridRowEnd: !0,
                gridRowStart: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {},
            style: function(t, n, i, s) {
                if (!(!t || t.nodeType === 3 || t.nodeType === 8 || !t.style)) {
                    var u, c, f, m = It(n), p = Di.test(n), b = t.style;
                    if (p || (n = Li(m)),
                    f = o.cssHooks[n] || o.cssHooks[m],
                    i !== void 0) {
                        if (c = typeof i,
                        c === "string" && (u = be.exec(i)) && u[1] && (i = kr(t, n, u),
                        c = "number"),
                        i == null || i !== i)
                            return;
                        c === "number" && !p && (i += u && u[3] || (o.cssNumber[m] ? "" : "px")),
                        !j.clearCloneStyle && i === "" && n.indexOf("background") === 0 && (b[n] = "inherit"),
                        (!f || !("set"in f) || (i = f.set(t, i, s)) !== void 0) && (p ? b.setProperty(n, i) : b[n] = i)
                    } else
                        return f && "get"in f && (u = f.get(t, !1, s)) !== void 0 ? u : b[n]
                }
            },
            css: function(t, n, i, s) {
                var u, c, f, m = It(n), p = Di.test(n);
                return p || (n = Li(m)),
                f = o.cssHooks[n] || o.cssHooks[m],
                f && "get"in f && (u = f.get(t, !0, i)),
                u === void 0 && (u = Cn(t, n, s)),
                u === "normal" && n in Gr && (u = Gr[n]),
                i === "" || i ? (c = parseFloat(u),
                i === !0 || isFinite(c) ? c || 0 : u) : u
            }
        }),
        o.each(["height", "width"], function(t, n) {
            o.cssHooks[n] = {
                get: function(i, s, u) {
                    if (s)
                        return ga.test(o.css(i, "display")) && (!i.getClientRects().length || !i.getBoundingClientRect().width) ? Br(i, ma, function() {
                            return Qr(i, n, u)
                        }) : Qr(i, n, u)
                },
                set: function(i, s, u) {
                    var c, f = Kn(i), m = !j.scrollboxSize() && f.position === "absolute", p = m || u, b = p && o.css(i, "boxSizing", !1, f) === "border-box", A = u ? $i(i, n, u, b, f) : 0;
                    return b && m && (A -= Math.ceil(i["offset" + n[0].toUpperCase() + n.slice(1)] - parseFloat(f[n]) - $i(i, n, "border", !1, f) - .5)),
                    A && (c = be.exec(s)) && (c[3] || "px") !== "px" && (i.style[n] = s,
                    s = o.css(i, n)),
                    Xr(i, s, A)
                }
            }
        }),
        o.cssHooks.marginLeft = Kr(j.reliableMarginLeft, function(t, n) {
            if (n)
                return (parseFloat(Cn(t, "marginLeft")) || t.getBoundingClientRect().left - Br(t, {
                    marginLeft: 0
                }, function() {
                    return t.getBoundingClientRect().left
                })) + "px"
        }),
        o.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(t, n) {
            o.cssHooks[t + n] = {
                expand: function(i) {
                    for (var s = 0, u = {}, c = typeof i == "string" ? i.split(" ") : [i]; s < 4; s++)
                        u[t + kt[s] + n] = c[s] || c[s - 2] || c[0];
                    return u
                }
            },
            t !== "margin" && (o.cssHooks[t + n].set = Xr)
        }),
        o.fn.extend({
            css: function(t, n) {
                return $t(this, function(i, s, u) {
                    var c, f, m = {}, p = 0;
                    if (Array.isArray(s)) {
                        for (c = Kn(i),
                        f = s.length; p < f; p++)
                            m[s[p]] = o.css(i, s[p], !1, c);
                        return m
                    }
                    return u !== void 0 ? o.style(i, s, u) : o.css(i, s)
                }, t, n, arguments.length > 1)
            }
        });
        function xt(t, n, i, s, u) {
            return new xt.prototype.init(t,n,i,s,u)
        }
        o.Tween = xt,
        xt.prototype = {
            constructor: xt,
            init: function(t, n, i, s, u, c) {
                this.elem = t,
                this.prop = i,
                this.easing = u || o.easing._default,
                this.options = n,
                this.start = this.now = this.cur(),
                this.end = s,
                this.unit = c || (o.cssNumber[i] ? "" : "px")
            },
            cur: function() {
                var t = xt.propHooks[this.prop];
                return t && t.get ? t.get(this) : xt.propHooks._default.get(this)
            },
            run: function(t) {
                var n, i = xt.propHooks[this.prop];
                return this.options.duration ? this.pos = n = o.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = n = t,
                this.now = (this.end - this.start) * n + this.start,
                this.options.step && this.options.step.call(this.elem, this.now, this),
                i && i.set ? i.set(this) : xt.propHooks._default.set(this),
                this
            }
        },
        xt.prototype.init.prototype = xt.prototype,
        xt.propHooks = {
            _default: {
                get: function(t) {
                    var n;
                    return t.elem.nodeType !== 1 || t.elem[t.prop] != null && t.elem.style[t.prop] == null ? t.elem[t.prop] : (n = o.css(t.elem, t.prop, ""),
                    !n || n === "auto" ? 0 : n)
                },
                set: function(t) {
                    o.fx.step[t.prop] ? o.fx.step[t.prop](t) : t.elem.nodeType === 1 && (o.cssHooks[t.prop] || t.elem.style[Li(t.prop)] != null) ? o.style(t.elem, t.prop, t.now + t.unit) : t.elem[t.prop] = t.now
                }
            }
        },
        xt.propHooks.scrollTop = xt.propHooks.scrollLeft = {
            set: function(t) {
                t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
            }
        },
        o.easing = {
            linear: function(t) {
                return t
            },
            swing: function(t) {
                return .5 - Math.cos(t * Math.PI) / 2
            },
            _default: "swing"
        },
        o.fx = xt.prototype.init,
        o.fx.step = {};
        var nn, Un, va = /^(?:toggle|show|hide)$/, _a = /queueHooks$/;
        function Ii() {
            Un && (R.hidden === !1 && e.requestAnimationFrame ? e.requestAnimationFrame(Ii) : e.setTimeout(Ii, o.fx.interval),
            o.fx.tick())
        }
        function Jr() {
            return e.setTimeout(function() {
                nn = void 0
            }),
            nn = Date.now()
        }
        function Yn(t, n) {
            var i, s = 0, u = {
                height: t
            };
            for (n = n ? 1 : 0; s < 4; s += 2 - n)
                i = kt[s],
                u["margin" + i] = u["padding" + i] = t;
            return n && (u.opacity = u.width = t),
            u
        }
        function Zr(t, n, i) {
            for (var s, u = (Zt.tweeners[n] || []).concat(Zt.tweeners["*"]), c = 0, f = u.length; c < f; c++)
                if (s = u[c].call(i, n, t))
                    return s
        }
        function ya(t, n, i) {
            var s, u, c, f, m, p, b, A, x = "width"in n || "height"in n, T = this, w = {}, V = t.style, G = t.nodeType && Me(t), H = q.get(t, "fxshow");
            i.queue || (f = o._queueHooks(t, "fx"),
            f.unqueued == null && (f.unqueued = 0,
            m = f.empty.fire,
            f.empty.fire = function() {
                f.unqueued || m()
            }
            ),
            f.unqueued++,
            T.always(function() {
                T.always(function() {
                    f.unqueued--,
                    o.queue(t, "fx").length || f.empty.fire()
                })
            }));
            for (s in n)
                if (u = n[s],
                va.test(u)) {
                    if (delete n[s],
                    c = c || u === "toggle",
                    u === (G ? "hide" : "show"))
                        if (u === "show" && H && H[s] !== void 0)
                            G = !0;
                        else
                            continue;
                    w[s] = H && H[s] || o.style(t, s)
                }
            if (p = !o.isEmptyObject(n),
            !(!p && o.isEmptyObject(w))) {
                x && t.nodeType === 1 && (i.overflow = [V.overflow, V.overflowX, V.overflowY],
                b = H && H.display,
                b == null && (b = q.get(t, "display")),
                A = o.css(t, "display"),
                A === "none" && (b ? A = b : (Je([t], !0),
                b = t.style.display || b,
                A = o.css(t, "display"),
                Je([t]))),
                (A === "inline" || A === "inline-block" && b != null) && o.css(t, "float") === "none" && (p || (T.done(function() {
                    V.display = b
                }),
                b == null && (A = V.display,
                b = A === "none" ? "" : A)),
                V.display = "inline-block")),
                i.overflow && (V.overflow = "hidden",
                T.always(function() {
                    V.overflow = i.overflow[0],
                    V.overflowX = i.overflow[1],
                    V.overflowY = i.overflow[2]
                })),
                p = !1;
                for (s in w)
                    p || (H ? "hidden"in H && (G = H.hidden) : H = q.access(t, "fxshow", {
                        display: b
                    }),
                    c && (H.hidden = !G),
                    G && Je([t], !0),
                    T.done(function() {
                        G || Je([t]),
                        q.remove(t, "fxshow");
                        for (s in w)
                            o.style(t, s, w[s])
                    })),
                    p = Zr(G ? H[s] : 0, s, T),
                    s in H || (H[s] = p.start,
                    G && (p.end = p.start,
                    p.start = 0))
            }
        }
        function ba(t, n) {
            var i, s, u, c, f;
            for (i in t)
                if (s = It(i),
                u = n[s],
                c = t[i],
                Array.isArray(c) && (u = c[1],
                c = t[i] = c[0]),
                i !== s && (t[s] = c,
                delete t[i]),
                f = o.cssHooks[s],
                f && "expand"in f) {
                    c = f.expand(c),
                    delete t[s];
                    for (i in c)
                        i in t || (t[i] = c[i],
                        n[i] = u)
                } else
                    n[s] = u
        }
        function Zt(t, n, i) {
            var s, u, c = 0, f = Zt.prefilters.length, m = o.Deferred().always(function() {
                delete p.elem
            }), p = function() {
                if (u)
                    return !1;
                for (var x = nn || Jr(), T = Math.max(0, b.startTime + b.duration - x), w = T / b.duration || 0, V = 1 - w, G = 0, H = b.tweens.length; G < H; G++)
                    b.tweens[G].run(V);
                return m.notifyWith(t, [b, V, T]),
                V < 1 && H ? T : (H || m.notifyWith(t, [b, 1, 0]),
                m.resolveWith(t, [b]),
                !1)
            }, b = m.promise({
                elem: t,
                props: o.extend({}, n),
                opts: o.extend(!0, {
                    specialEasing: {},
                    easing: o.easing._default
                }, i),
                originalProperties: n,
                originalOptions: i,
                startTime: nn || Jr(),
                duration: i.duration,
                tweens: [],
                createTween: function(x, T) {
                    var w = o.Tween(t, b.opts, x, T, b.opts.specialEasing[x] || b.opts.easing);
                    return b.tweens.push(w),
                    w
                },
                stop: function(x) {
                    var T = 0
                      , w = x ? b.tweens.length : 0;
                    if (u)
                        return this;
                    for (u = !0; T < w; T++)
                        b.tweens[T].run(1);
                    return x ? (m.notifyWith(t, [b, 1, 0]),
                    m.resolveWith(t, [b, x])) : m.rejectWith(t, [b, x]),
                    this
                }
            }), A = b.props;
            for (ba(A, b.opts.specialEasing); c < f; c++)
                if (s = Zt.prefilters[c].call(b, t, A, b.opts),
                s)
                    return k(s.stop) && (o._queueHooks(b.elem, b.opts.queue).stop = s.stop.bind(s)),
                    s;
            return o.map(A, Zr, b),
            k(b.opts.start) && b.opts.start.call(t, b),
            b.progress(b.opts.progress).done(b.opts.done, b.opts.complete).fail(b.opts.fail).always(b.opts.always),
            o.fx.timer(o.extend(p, {
                elem: t,
                anim: b,
                queue: b.opts.queue
            })),
            b
        }
        o.Animation = o.extend(Zt, {
            tweeners: {
                "*": [function(t, n) {
                    var i = this.createTween(t, n);
                    return kr(i.elem, t, be.exec(n), i),
                    i
                }
                ]
            },
            tweener: function(t, n) {
                k(t) ? (n = t,
                t = ["*"]) : t = t.match(Nt);
                for (var i, s = 0, u = t.length; s < u; s++)
                    i = t[s],
                    Zt.tweeners[i] = Zt.tweeners[i] || [],
                    Zt.tweeners[i].unshift(n)
            },
            prefilters: [ya],
            prefilter: function(t, n) {
                n ? Zt.prefilters.unshift(t) : Zt.prefilters.push(t)
            }
        }),
        o.speed = function(t, n, i) {
            var s = t && typeof t == "object" ? o.extend({}, t) : {
                complete: i || !i && n || k(t) && t,
                duration: t,
                easing: i && n || n && !k(n) && n
            };
            return o.fx.off ? s.duration = 0 : typeof s.duration != "number" && (s.duration in o.fx.speeds ? s.duration = o.fx.speeds[s.duration] : s.duration = o.fx.speeds._default),
            (s.queue == null || s.queue === !0) && (s.queue = "fx"),
            s.old = s.complete,
            s.complete = function() {
                k(s.old) && s.old.call(this),
                s.queue && o.dequeue(this, s.queue)
            }
            ,
            s
        }
        ,
        o.fn.extend({
            fadeTo: function(t, n, i, s) {
                return this.filter(Me).css("opacity", 0).show().end().animate({
                    opacity: n
                }, t, i, s)
            },
            animate: function(t, n, i, s) {
                var u = o.isEmptyObject(t)
                  , c = o.speed(n, i, s)
                  , f = function() {
                    var m = Zt(this, o.extend({}, t), c);
                    (u || q.get(this, "finish")) && m.stop(!0)
                };
                return f.finish = f,
                u || c.queue === !1 ? this.each(f) : this.queue(c.queue, f)
            },
            stop: function(t, n, i) {
                var s = function(u) {
                    var c = u.stop;
                    delete u.stop,
                    c(i)
                };
                return typeof t != "string" && (i = n,
                n = t,
                t = void 0),
                n && this.queue(t || "fx", []),
                this.each(function() {
                    var u = !0
                      , c = t != null && t + "queueHooks"
                      , f = o.timers
                      , m = q.get(this);
                    if (c)
                        m[c] && m[c].stop && s(m[c]);
                    else
                        for (c in m)
                            m[c] && m[c].stop && _a.test(c) && s(m[c]);
                    for (c = f.length; c--; )
                        f[c].elem === this && (t == null || f[c].queue === t) && (f[c].anim.stop(i),
                        u = !1,
                        f.splice(c, 1));
                    (u || !i) && o.dequeue(this, t)
                })
            },
            finish: function(t) {
                return t !== !1 && (t = t || "fx"),
                this.each(function() {
                    var n, i = q.get(this), s = i[t + "queue"], u = i[t + "queueHooks"], c = o.timers, f = s ? s.length : 0;
                    for (i.finish = !0,
                    o.queue(this, t, []),
                    u && u.stop && u.stop.call(this, !0),
                    n = c.length; n--; )
                        c[n].elem === this && c[n].queue === t && (c[n].anim.stop(!0),
                        c.splice(n, 1));
                    for (n = 0; n < f; n++)
                        s[n] && s[n].finish && s[n].finish.call(this);
                    delete i.finish
                })
            }
        }),
        o.each(["toggle", "show", "hide"], function(t, n) {
            var i = o.fn[n];
            o.fn[n] = function(s, u, c) {
                return s == null || typeof s == "boolean" ? i.apply(this, arguments) : this.animate(Yn(n, !0), s, u, c)
            }
        }),
        o.each({
            slideDown: Yn("show"),
            slideUp: Yn("hide"),
            slideToggle: Yn("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(t, n) {
            o.fn[t] = function(i, s, u) {
                return this.animate(n, i, s, u)
            }
        }),
        o.timers = [],
        o.fx.tick = function() {
            var t, n = 0, i = o.timers;
            for (nn = Date.now(); n < i.length; n++)
                t = i[n],
                !t() && i[n] === t && i.splice(n--, 1);
            i.length || o.fx.stop(),
            nn = void 0
        }
        ,
        o.fx.timer = function(t) {
            o.timers.push(t),
            o.fx.start()
        }
        ,
        o.fx.interval = 13,
        o.fx.start = function() {
            Un || (Un = !0,
            Ii())
        }
        ,
        o.fx.stop = function() {
            Un = null
        }
        ,
        o.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        },
        o.fn.delay = function(t, n) {
            return t = o.fx && o.fx.speeds[t] || t,
            n = n || "fx",
            this.queue(n, function(i, s) {
                var u = e.setTimeout(i, t);
                s.stop = function() {
                    e.clearTimeout(u)
                }
            })
        }
        ,
        function() {
            var t = R.createElement("input")
              , n = R.createElement("select")
              , i = n.appendChild(R.createElement("option"));
            t.type = "checkbox",
            j.checkOn = t.value !== "",
            j.optSelected = i.selected,
            t = R.createElement("input"),
            t.value = "t",
            t.type = "radio",
            j.radioValue = t.value === "t"
        }();
        var ts, Nn = o.expr.attrHandle;
        o.fn.extend({
            attr: function(t, n) {
                return $t(this, o.attr, t, n, arguments.length > 1)
            },
            removeAttr: function(t) {
                return this.each(function() {
                    o.removeAttr(this, t)
                })
            }
        }),
        o.extend({
            attr: function(t, n, i) {
                var s, u, c = t.nodeType;
                if (!(c === 3 || c === 8 || c === 2)) {
                    if (typeof t.getAttribute > "u")
                        return o.prop(t, n, i);
                    if ((c !== 1 || !o.isXMLDoc(t)) && (u = o.attrHooks[n.toLowerCase()] || (o.expr.match.bool.test(n) ? ts : void 0)),
                    i !== void 0) {
                        if (i === null) {
                            o.removeAttr(t, n);
                            return
                        }
                        return u && "set"in u && (s = u.set(t, i, n)) !== void 0 ? s : (t.setAttribute(n, i + ""),
                        i)
                    }
                    return u && "get"in u && (s = u.get(t, n)) !== null ? s : (s = o.find.attr(t, n),
                    s ?? void 0)
                }
            },
            attrHooks: {
                type: {
                    set: function(t, n) {
                        if (!j.radioValue && n === "radio" && ft(t, "input")) {
                            var i = t.value;
                            return t.setAttribute("type", n),
                            i && (t.value = i),
                            n
                        }
                    }
                }
            },
            removeAttr: function(t, n) {
                var i, s = 0, u = n && n.match(Nt);
                if (u && t.nodeType === 1)
                    for (; i = u[s++]; )
                        t.removeAttribute(i)
            }
        }),
        ts = {
            set: function(t, n, i) {
                return n === !1 ? o.removeAttr(t, i) : t.setAttribute(i, i),
                i
            }
        },
        o.each(o.expr.match.bool.source.match(/\w+/g), function(t, n) {
            var i = Nn[n] || o.find.attr;
            Nn[n] = function(s, u, c) {
                var f, m, p = u.toLowerCase();
                return c || (m = Nn[p],
                Nn[p] = f,
                f = i(s, u, c) != null ? p : null,
                Nn[p] = m),
                f
            }
        });
        var Ea = /^(?:input|select|textarea|button)$/i
          , Ta = /^(?:a|area)$/i;
        o.fn.extend({
            prop: function(t, n) {
                return $t(this, o.prop, t, n, arguments.length > 1)
            },
            removeProp: function(t) {
                return this.each(function() {
                    delete this[o.propFix[t] || t]
                })
            }
        }),
        o.extend({
            prop: function(t, n, i) {
                var s, u, c = t.nodeType;
                if (!(c === 3 || c === 8 || c === 2))
                    return (c !== 1 || !o.isXMLDoc(t)) && (n = o.propFix[n] || n,
                    u = o.propHooks[n]),
                    i !== void 0 ? u && "set"in u && (s = u.set(t, i, n)) !== void 0 ? s : t[n] = i : u && "get"in u && (s = u.get(t, n)) !== null ? s : t[n]
            },
            propHooks: {
                tabIndex: {
                    get: function(t) {
                        var n = o.find.attr(t, "tabindex");
                        return n ? parseInt(n, 10) : Ea.test(t.nodeName) || Ta.test(t.nodeName) && t.href ? 0 : -1
                    }
                }
            },
            propFix: {
                for: "htmlFor",
                class: "className"
            }
        }),
        j.optSelected || (o.propHooks.selected = {
            get: function(t) {
                var n = t.parentNode;
                return n && n.parentNode && n.parentNode.selectedIndex,
                null
            },
            set: function(t) {
                var n = t.parentNode;
                n && (n.selectedIndex,
                n.parentNode && n.parentNode.selectedIndex)
            }
        }),
        o.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            o.propFix[this.toLowerCase()] = this
        });
        function Re(t) {
            var n = t.match(Nt) || [];
            return n.join(" ")
        }
        function He(t) {
            return t.getAttribute && t.getAttribute("class") || ""
        }
        function ki(t) {
            return Array.isArray(t) ? t : typeof t == "string" ? t.match(Nt) || [] : []
        }
        o.fn.extend({
            addClass: function(t) {
                var n, i, s, u, c, f;
                return k(t) ? this.each(function(m) {
                    o(this).addClass(t.call(this, m, He(this)))
                }) : (n = ki(t),
                n.length ? this.each(function() {
                    if (s = He(this),
                    i = this.nodeType === 1 && " " + Re(s) + " ",
                    i) {
                        for (c = 0; c < n.length; c++)
                            u = n[c],
                            i.indexOf(" " + u + " ") < 0 && (i += u + " ");
                        f = Re(i),
                        s !== f && this.setAttribute("class", f)
                    }
                }) : this)
            },
            removeClass: function(t) {
                var n, i, s, u, c, f;
                return k(t) ? this.each(function(m) {
                    o(this).removeClass(t.call(this, m, He(this)))
                }) : arguments.length ? (n = ki(t),
                n.length ? this.each(function() {
                    if (s = He(this),
                    i = this.nodeType === 1 && " " + Re(s) + " ",
                    i) {
                        for (c = 0; c < n.length; c++)
                            for (u = n[c]; i.indexOf(" " + u + " ") > -1; )
                                i = i.replace(" " + u + " ", " ");
                        f = Re(i),
                        s !== f && this.setAttribute("class", f)
                    }
                }) : this) : this.attr("class", "")
            },
            toggleClass: function(t, n) {
                var i, s, u, c, f = typeof t, m = f === "string" || Array.isArray(t);
                return k(t) ? this.each(function(p) {
                    o(this).toggleClass(t.call(this, p, He(this), n), n)
                }) : typeof n == "boolean" && m ? n ? this.addClass(t) : this.removeClass(t) : (i = ki(t),
                this.each(function() {
                    if (m)
                        for (c = o(this),
                        u = 0; u < i.length; u++)
                            s = i[u],
                            c.hasClass(s) ? c.removeClass(s) : c.addClass(s);
                    else
                        (t === void 0 || f === "boolean") && (s = He(this),
                        s && q.set(this, "__className__", s),
                        this.setAttribute && this.setAttribute("class", s || t === !1 ? "" : q.get(this, "__className__") || ""))
                }))
            },
            hasClass: function(t) {
                var n, i, s = 0;
                for (n = " " + t + " "; i = this[s++]; )
                    if (i.nodeType === 1 && (" " + Re(He(i)) + " ").indexOf(n) > -1)
                        return !0;
                return !1
            }
        });
        var Aa = /\r/g;
        o.fn.extend({
            val: function(t) {
                var n, i, s, u = this[0];
                return arguments.length ? (s = k(t),
                this.each(function(c) {
                    var f;
                    this.nodeType === 1 && (s ? f = t.call(this, c, o(this).val()) : f = t,
                    f == null ? f = "" : typeof f == "number" ? f += "" : Array.isArray(f) && (f = o.map(f, function(m) {
                        return m == null ? "" : m + ""
                    })),
                    n = o.valHooks[this.type] || o.valHooks[this.nodeName.toLowerCase()],
                    (!n || !("set"in n) || n.set(this, f, "value") === void 0) && (this.value = f))
                })) : u ? (n = o.valHooks[u.type] || o.valHooks[u.nodeName.toLowerCase()],
                n && "get"in n && (i = n.get(u, "value")) !== void 0 ? i : (i = u.value,
                typeof i == "string" ? i.replace(Aa, "") : i ?? "")) : void 0
            }
        }),
        o.extend({
            valHooks: {
                option: {
                    get: function(t) {
                        var n = o.find.attr(t, "value");
                        return n ?? Re(o.text(t))
                    }
                },
                select: {
                    get: function(t) {
                        var n, i, s, u = t.options, c = t.selectedIndex, f = t.type === "select-one", m = f ? null : [], p = f ? c + 1 : u.length;
                        for (c < 0 ? s = p : s = f ? c : 0; s < p; s++)
                            if (i = u[s],
                            (i.selected || s === c) && !i.disabled && (!i.parentNode.disabled || !ft(i.parentNode, "optgroup"))) {
                                if (n = o(i).val(),
                                f)
                                    return n;
                                m.push(n)
                            }
                        return m
                    },
                    set: function(t, n) {
                        for (var i, s, u = t.options, c = o.makeArray(n), f = u.length; f--; )
                            s = u[f],
                            (s.selected = o.inArray(o.valHooks.option.get(s), c) > -1) && (i = !0);
                        return i || (t.selectedIndex = -1),
                        c
                    }
                }
            }
        }),
        o.each(["radio", "checkbox"], function() {
            o.valHooks[this] = {
                set: function(t, n) {
                    if (Array.isArray(n))
                        return t.checked = o.inArray(o(t).val(), n) > -1
                }
            },
            j.checkOn || (o.valHooks[this].get = function(t) {
                return t.getAttribute("value") === null ? "on" : t.value
            }
            )
        }),
        j.focusin = "onfocusin"in e;
        var es = /^(?:focusinfocus|focusoutblur)$/
          , ns = function(t) {
            t.stopPropagation()
        };
        o.extend(o.event, {
            trigger: function(t, n, i, s) {
                var u, c, f, m, p, b, A, x, T = [i || R], w = Y.call(t, "type") ? t.type : t, V = Y.call(t, "namespace") ? t.namespace.split(".") : [];
                if (c = x = f = i = i || R,
                !(i.nodeType === 3 || i.nodeType === 8) && !es.test(w + o.event.triggered) && (w.indexOf(".") > -1 && (V = w.split("."),
                w = V.shift(),
                V.sort()),
                p = w.indexOf(":") < 0 && "on" + w,
                t = t[o.expando] ? t : new o.Event(w,typeof t == "object" && t),
                t.isTrigger = s ? 2 : 3,
                t.namespace = V.join("."),
                t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + V.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
                t.result = void 0,
                t.target || (t.target = i),
                n = n == null ? [t] : o.makeArray(n, [t]),
                A = o.event.special[w] || {},
                !(!s && A.trigger && A.trigger.apply(i, n) === !1))) {
                    if (!s && !A.noBubble && !Z(i)) {
                        for (m = A.delegateType || w,
                        es.test(m + w) || (c = c.parentNode); c; c = c.parentNode)
                            T.push(c),
                            f = c;
                        f === (i.ownerDocument || R) && T.push(f.defaultView || f.parentWindow || e)
                    }
                    for (u = 0; (c = T[u++]) && !t.isPropagationStopped(); )
                        x = c,
                        t.type = u > 1 ? m : A.bindType || w,
                        b = (q.get(c, "events") || Object.create(null))[t.type] && q.get(c, "handle"),
                        b && b.apply(c, n),
                        b = p && c[p],
                        b && b.apply && Ie(c) && (t.result = b.apply(c, n),
                        t.result === !1 && t.preventDefault());
                    return t.type = w,
                    !s && !t.isDefaultPrevented() && (!A._default || A._default.apply(T.pop(), n) === !1) && Ie(i) && p && k(i[w]) && !Z(i) && (f = i[p],
                    f && (i[p] = null),
                    o.event.triggered = w,
                    t.isPropagationStopped() && x.addEventListener(w, ns),
                    i[w](),
                    t.isPropagationStopped() && x.removeEventListener(w, ns),
                    o.event.triggered = void 0,
                    f && (i[p] = f)),
                    t.result
                }
            },
            simulate: function(t, n, i) {
                var s = o.extend(new o.Event, i, {
                    type: t,
                    isSimulated: !0
                });
                o.event.trigger(s, null, n)
            }
        }),
        o.fn.extend({
            trigger: function(t, n) {
                return this.each(function() {
                    o.event.trigger(t, n, this)
                })
            },
            triggerHandler: function(t, n) {
                var i = this[0];
                if (i)
                    return o.event.trigger(t, n, i, !0)
            }
        }),
        j.focusin || o.each({
            focus: "focusin",
            blur: "focusout"
        }, function(t, n) {
            var i = function(s) {
                o.event.simulate(n, s.target, o.event.fix(s))
            };
            o.event.special[n] = {
                setup: function() {
                    var s = this.ownerDocument || this.document || this
                      , u = q.access(s, n);
                    u || s.addEventListener(t, i, !0),
                    q.access(s, n, (u || 0) + 1)
                },
                teardown: function() {
                    var s = this.ownerDocument || this.document || this
                      , u = q.access(s, n) - 1;
                    u ? q.access(s, n, u) : (s.removeEventListener(t, i, !0),
                    q.remove(s, n))
                }
            }
        });
        var Sn = e.location
          , is = {
            guid: Date.now()
        }
          , Pi = /\?/;
        o.parseXML = function(t) {
            var n, i;
            if (!t || typeof t != "string")
                return null;
            try {
                n = new e.DOMParser().parseFromString(t, "text/xml")
            } catch {}
            return i = n && n.getElementsByTagName("parsererror")[0],
            (!n || i) && o.error("Invalid XML: " + (i ? o.map(i.childNodes, function(s) {
                return s.textContent
            }).join(`
`) : t)),
            n
        }
        ;
        var wa = /\[\]$/
          , rs = /\r?\n/g
          , Ca = /^(?:submit|button|image|reset|file)$/i
          , Na = /^(?:input|select|textarea|keygen)/i;
        function Mi(t, n, i, s) {
            var u;
            if (Array.isArray(n))
                o.each(n, function(c, f) {
                    i || wa.test(t) ? s(t, f) : Mi(t + "[" + (typeof f == "object" && f != null ? c : "") + "]", f, i, s)
                });
            else if (!i && X(n) === "object")
                for (u in n)
                    Mi(t + "[" + u + "]", n[u], i, s);
            else
                s(t, n)
        }
        o.param = function(t, n) {
            var i, s = [], u = function(c, f) {
                var m = k(f) ? f() : f;
                s[s.length] = encodeURIComponent(c) + "=" + encodeURIComponent(m ?? "")
            };
            if (t == null)
                return "";
            if (Array.isArray(t) || t.jquery && !o.isPlainObject(t))
                o.each(t, function() {
                    u(this.name, this.value)
                });
            else
                for (i in t)
                    Mi(i, t[i], n, u);
            return s.join("&")
        }
        ,
        o.fn.extend({
            serialize: function() {
                return o.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var t = o.prop(this, "elements");
                    return t ? o.makeArray(t) : this
                }).filter(function() {
                    var t = this.type;
                    return this.name && !o(this).is(":disabled") && Na.test(this.nodeName) && !Ca.test(t) && (this.checked || !wn.test(t))
                }).map(function(t, n) {
                    var i = o(this).val();
                    return i == null ? null : Array.isArray(i) ? o.map(i, function(s) {
                        return {
                            name: n.name,
                            value: s.replace(rs, `\r
`)
                        }
                    }) : {
                        name: n.name,
                        value: i.replace(rs, `\r
`)
                    }
                }).get()
            }
        });
        var Sa = /%20/g
          , xa = /#.*$/
          , Oa = /([?&])_=[^&]*/
          , Da = /^(.*?):[ \t]*([^\r\n]*)$/mg
          , La = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/
          , $a = /^(?:GET|HEAD)$/
          , Ia = /^\/\//
          , ss = {}
          , Ri = {}
          , os = "*/".concat("*")
          , Hi = R.createElement("a");
        Hi.href = Sn.href;
        function as(t) {
            return function(n, i) {
                typeof n != "string" && (i = n,
                n = "*");
                var s, u = 0, c = n.toLowerCase().match(Nt) || [];
                if (k(i))
                    for (; s = c[u++]; )
                        s[0] === "+" ? (s = s.slice(1) || "*",
                        (t[s] = t[s] || []).unshift(i)) : (t[s] = t[s] || []).push(i)
            }
        }
        function us(t, n, i, s) {
            var u = {}
              , c = t === Ri;
            function f(m) {
                var p;
                return u[m] = !0,
                o.each(t[m] || [], function(b, A) {
                    var x = A(n, i, s);
                    if (typeof x == "string" && !c && !u[x])
                        return n.dataTypes.unshift(x),
                        f(x),
                        !1;
                    if (c)
                        return !(p = x)
                }),
                p
            }
            return f(n.dataTypes[0]) || !u["*"] && f("*")
        }
        function ji(t, n) {
            var i, s, u = o.ajaxSettings.flatOptions || {};
            for (i in n)
                n[i] !== void 0 && ((u[i] ? t : s || (s = {}))[i] = n[i]);
            return s && o.extend(!0, t, s),
            t
        }
        function ka(t, n, i) {
            for (var s, u, c, f, m = t.contents, p = t.dataTypes; p[0] === "*"; )
                p.shift(),
                s === void 0 && (s = t.mimeType || n.getResponseHeader("Content-Type"));
            if (s) {
                for (u in m)
                    if (m[u] && m[u].test(s)) {
                        p.unshift(u);
                        break
                    }
            }
            if (p[0]in i)
                c = p[0];
            else {
                for (u in i) {
                    if (!p[0] || t.converters[u + " " + p[0]]) {
                        c = u;
                        break
                    }
                    f || (f = u)
                }
                c = c || f
            }
            if (c)
                return c !== p[0] && p.unshift(c),
                i[c]
        }
        function Pa(t, n, i, s) {
            var u, c, f, m, p, b = {}, A = t.dataTypes.slice();
            if (A[1])
                for (f in t.converters)
                    b[f.toLowerCase()] = t.converters[f];
            for (c = A.shift(); c; )
                if (t.responseFields[c] && (i[t.responseFields[c]] = n),
                !p && s && t.dataFilter && (n = t.dataFilter(n, t.dataType)),
                p = c,
                c = A.shift(),
                c) {
                    if (c === "*")
                        c = p;
                    else if (p !== "*" && p !== c) {
                        if (f = b[p + " " + c] || b["* " + c],
                        !f) {
                            for (u in b)
                                if (m = u.split(" "),
                                m[1] === c && (f = b[p + " " + m[0]] || b["* " + m[0]],
                                f)) {
                                    f === !0 ? f = b[u] : b[u] !== !0 && (c = m[0],
                                    A.unshift(m[1]));
                                    break
                                }
                        }
                        if (f !== !0)
                            if (f && t.throws)
                                n = f(n);
                            else
                                try {
                                    n = f(n)
                                } catch (x) {
                                    return {
                                        state: "parsererror",
                                        error: f ? x : "No conversion from " + p + " to " + c
                                    }
                                }
                    }
                }
            return {
                state: "success",
                data: n
            }
        }
        o.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: Sn.href,
                type: "GET",
                isLocal: La.test(Sn.protocol),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": os,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /\bxml\b/,
                    html: /\bhtml/,
                    json: /\bjson\b/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": JSON.parse,
                    "text xml": o.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(t, n) {
                return n ? ji(ji(t, o.ajaxSettings), n) : ji(o.ajaxSettings, t)
            },
            ajaxPrefilter: as(ss),
            ajaxTransport: as(Ri),
            ajax: function(t, n) {
                typeof t == "object" && (n = t,
                t = void 0),
                n = n || {};
                var i, s, u, c, f, m, p, b, A, x, T = o.ajaxSetup({}, n), w = T.context || T, V = T.context && (w.nodeType || w.jquery) ? o(w) : o.event, G = o.Deferred(), H = o.Callbacks("once memory"), _t = T.statusCode || {}, mt = {}, Pt = {}, rt = "canceled", z = {
                    readyState: 0,
                    getResponseHeader: function(et) {
                        var pt;
                        if (p) {
                            if (!c)
                                for (c = {}; pt = Da.exec(u); )
                                    c[pt[1].toLowerCase() + " "] = (c[pt[1].toLowerCase() + " "] || []).concat(pt[2]);
                            pt = c[et.toLowerCase() + " "]
                        }
                        return pt == null ? null : pt.join(", ")
                    },
                    getAllResponseHeaders: function() {
                        return p ? u : null
                    },
                    setRequestHeader: function(et, pt) {
                        return p == null && (et = Pt[et.toLowerCase()] = Pt[et.toLowerCase()] || et,
                        mt[et] = pt),
                        this
                    },
                    overrideMimeType: function(et) {
                        return p == null && (T.mimeType = et),
                        this
                    },
                    statusCode: function(et) {
                        var pt;
                        if (et)
                            if (p)
                                z.always(et[z.status]);
                            else
                                for (pt in et)
                                    _t[pt] = [_t[pt], et[pt]];
                        return this
                    },
                    abort: function(et) {
                        var pt = et || rt;
                        return i && i.abort(pt),
                        Ot(0, pt),
                        this
                    }
                };
                if (G.promise(z),
                T.url = ((t || T.url || Sn.href) + "").replace(Ia, Sn.protocol + "//"),
                T.type = n.method || n.type || T.method || T.type,
                T.dataTypes = (T.dataType || "*").toLowerCase().match(Nt) || [""],
                T.crossDomain == null) {
                    m = R.createElement("a");
                    try {
                        m.href = T.url,
                        m.href = m.href,
                        T.crossDomain = Hi.protocol + "//" + Hi.host != m.protocol + "//" + m.host
                    } catch {
                        T.crossDomain = !0
                    }
                }
                if (T.data && T.processData && typeof T.data != "string" && (T.data = o.param(T.data, T.traditional)),
                us(ss, T, n, z),
                p)
                    return z;
                b = o.event && T.global,
                b && o.active++ === 0 && o.event.trigger("ajaxStart"),
                T.type = T.type.toUpperCase(),
                T.hasContent = !$a.test(T.type),
                s = T.url.replace(xa, ""),
                T.hasContent ? T.data && T.processData && (T.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && (T.data = T.data.replace(Sa, "+")) : (x = T.url.slice(s.length),
                T.data && (T.processData || typeof T.data == "string") && (s += (Pi.test(s) ? "&" : "?") + T.data,
                delete T.data),
                T.cache === !1 && (s = s.replace(Oa, "$1"),
                x = (Pi.test(s) ? "&" : "?") + "_=" + is.guid++ + x),
                T.url = s + x),
                T.ifModified && (o.lastModified[s] && z.setRequestHeader("If-Modified-Since", o.lastModified[s]),
                o.etag[s] && z.setRequestHeader("If-None-Match", o.etag[s])),
                (T.data && T.hasContent && T.contentType !== !1 || n.contentType) && z.setRequestHeader("Content-Type", T.contentType),
                z.setRequestHeader("Accept", T.dataTypes[0] && T.accepts[T.dataTypes[0]] ? T.accepts[T.dataTypes[0]] + (T.dataTypes[0] !== "*" ? ", " + os + "; q=0.01" : "") : T.accepts["*"]);
                for (A in T.headers)
                    z.setRequestHeader(A, T.headers[A]);
                if (T.beforeSend && (T.beforeSend.call(w, z, T) === !1 || p))
                    return z.abort();
                if (rt = "abort",
                H.add(T.complete),
                z.done(T.success),
                z.fail(T.error),
                i = us(Ri, T, n, z),
                !i)
                    Ot(-1, "No Transport");
                else {
                    if (z.readyState = 1,
                    b && V.trigger("ajaxSend", [z, T]),
                    p)
                        return z;
                    T.async && T.timeout > 0 && (f = e.setTimeout(function() {
                        z.abort("timeout")
                    }, T.timeout));
                    try {
                        p = !1,
                        i.send(mt, Ot)
                    } catch (et) {
                        if (p)
                            throw et;
                        Ot(-1, et)
                    }
                }
                function Ot(et, pt, On, zn) {
                    var Mt, je, Ve, Dt, Ee, Bt = pt;
                    p || (p = !0,
                    f && e.clearTimeout(f),
                    i = void 0,
                    u = zn || "",
                    z.readyState = et > 0 ? 4 : 0,
                    Mt = et >= 200 && et < 300 || et === 304,
                    On && (Dt = ka(T, z, On)),
                    !Mt && o.inArray("script", T.dataTypes) > -1 && o.inArray("json", T.dataTypes) < 0 && (T.converters["text script"] = function() {}
                    ),
                    Dt = Pa(T, Dt, z, Mt),
                    Mt ? (T.ifModified && (Ee = z.getResponseHeader("Last-Modified"),
                    Ee && (o.lastModified[s] = Ee),
                    Ee = z.getResponseHeader("etag"),
                    Ee && (o.etag[s] = Ee)),
                    et === 204 || T.type === "HEAD" ? Bt = "nocontent" : et === 304 ? Bt = "notmodified" : (Bt = Dt.state,
                    je = Dt.data,
                    Ve = Dt.error,
                    Mt = !Ve)) : (Ve = Bt,
                    (et || !Bt) && (Bt = "error",
                    et < 0 && (et = 0))),
                    z.status = et,
                    z.statusText = (pt || Bt) + "",
                    Mt ? G.resolveWith(w, [je, Bt, z]) : G.rejectWith(w, [z, Bt, Ve]),
                    z.statusCode(_t),
                    _t = void 0,
                    b && V.trigger(Mt ? "ajaxSuccess" : "ajaxError", [z, T, Mt ? je : Ve]),
                    H.fireWith(w, [z, Bt]),
                    b && (V.trigger("ajaxComplete", [z, T]),
                    --o.active || o.event.trigger("ajaxStop")))
                }
                return z
            },
            getJSON: function(t, n, i) {
                return o.get(t, n, i, "json")
            },
            getScript: function(t, n) {
                return o.get(t, void 0, n, "script")
            }
        }),
        o.each(["get", "post"], function(t, n) {
            o[n] = function(i, s, u, c) {
                return k(s) && (c = c || u,
                u = s,
                s = void 0),
                o.ajax(o.extend({
                    url: i,
                    type: n,
                    dataType: c,
                    data: s,
                    success: u
                }, o.isPlainObject(i) && i))
            }
        }),
        o.ajaxPrefilter(function(t) {
            var n;
            for (n in t.headers)
                n.toLowerCase() === "content-type" && (t.contentType = t.headers[n] || "")
        }),
        o._evalUrl = function(t, n, i) {
            return o.ajax({
                url: t,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                converters: {
                    "text script": function() {}
                },
                dataFilter: function(s) {
                    o.globalEval(s, n, i)
                }
            })
        }
        ,
        o.fn.extend({
            wrapAll: function(t) {
                var n;
                return this[0] && (k(t) && (t = t.call(this[0])),
                n = o(t, this[0].ownerDocument).eq(0).clone(!0),
                this[0].parentNode && n.insertBefore(this[0]),
                n.map(function() {
                    for (var i = this; i.firstElementChild; )
                        i = i.firstElementChild;
                    return i
                }).append(this)),
                this
            },
            wrapInner: function(t) {
                return k(t) ? this.each(function(n) {
                    o(this).wrapInner(t.call(this, n))
                }) : this.each(function() {
                    var n = o(this)
                      , i = n.contents();
                    i.length ? i.wrapAll(t) : n.append(t)
                })
            },
            wrap: function(t) {
                var n = k(t);
                return this.each(function(i) {
                    o(this).wrapAll(n ? t.call(this, i) : t)
                })
            },
            unwrap: function(t) {
                return this.parent(t).not("body").each(function() {
                    o(this).replaceWith(this.childNodes)
                }),
                this
            }
        }),
        o.expr.pseudos.hidden = function(t) {
            return !o.expr.pseudos.visible(t)
        }
        ,
        o.expr.pseudos.visible = function(t) {
            return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length)
        }
        ,
        o.ajaxSettings.xhr = function() {
            try {
                return new e.XMLHttpRequest
            } catch {}
        }
        ;
        var Ma = {
            0: 200,
            1223: 204
        }
          , xn = o.ajaxSettings.xhr();
        j.cors = !!xn && "withCredentials"in xn,
        j.ajax = xn = !!xn,
        o.ajaxTransport(function(t) {
            var n, i;
            if (j.cors || xn && !t.crossDomain)
                return {
                    send: function(s, u) {
                        var c, f = t.xhr();
                        if (f.open(t.type, t.url, t.async, t.username, t.password),
                        t.xhrFields)
                            for (c in t.xhrFields)
                                f[c] = t.xhrFields[c];
                        t.mimeType && f.overrideMimeType && f.overrideMimeType(t.mimeType),
                        !t.crossDomain && !s["X-Requested-With"] && (s["X-Requested-With"] = "XMLHttpRequest");
                        for (c in s)
                            f.setRequestHeader(c, s[c]);
                        n = function(m) {
                            return function() {
                                n && (n = i = f.onload = f.onerror = f.onabort = f.ontimeout = f.onreadystatechange = null,
                                m === "abort" ? f.abort() : m === "error" ? typeof f.status != "number" ? u(0, "error") : u(f.status, f.statusText) : u(Ma[f.status] || f.status, f.statusText, (f.responseType || "text") !== "text" || typeof f.responseText != "string" ? {
                                    binary: f.response
                                } : {
                                    text: f.responseText
                                }, f.getAllResponseHeaders()))
                            }
                        }
                        ,
                        f.onload = n(),
                        i = f.onerror = f.ontimeout = n("error"),
                        f.onabort !== void 0 ? f.onabort = i : f.onreadystatechange = function() {
                            f.readyState === 4 && e.setTimeout(function() {
                                n && i()
                            })
                        }
                        ,
                        n = n("abort");
                        try {
                            f.send(t.hasContent && t.data || null)
                        } catch (m) {
                            if (n)
                                throw m
                        }
                    },
                    abort: function() {
                        n && n()
                    }
                }
        }),
        o.ajaxPrefilter(function(t) {
            t.crossDomain && (t.contents.script = !1)
        }),
        o.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /\b(?:java|ecma)script\b/
            },
            converters: {
                "text script": function(t) {
                    return o.globalEval(t),
                    t
                }
            }
        }),
        o.ajaxPrefilter("script", function(t) {
            t.cache === void 0 && (t.cache = !1),
            t.crossDomain && (t.type = "GET")
        }),
        o.ajaxTransport("script", function(t) {
            if (t.crossDomain || t.scriptAttrs) {
                var n, i;
                return {
                    send: function(s, u) {
                        n = o("<script>").attr(t.scriptAttrs || {}).prop({
                            charset: t.scriptCharset,
                            src: t.url
                        }).on("load error", i = function(c) {
                            n.remove(),
                            i = null,
                            c && u(c.type === "error" ? 404 : 200, c.type)
                        }
                        ),
                        R.head.appendChild(n[0])
                    },
                    abort: function() {
                        i && i()
                    }
                }
            }
        });
        var cs = []
          , Vi = /(=)\?(?=&|$)|\?\?/;
        o.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var t = cs.pop() || o.expando + "_" + is.guid++;
                return this[t] = !0,
                t
            }
        }),
        o.ajaxPrefilter("json jsonp", function(t, n, i) {
            var s, u, c, f = t.jsonp !== !1 && (Vi.test(t.url) ? "url" : typeof t.data == "string" && (t.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && Vi.test(t.data) && "data");
            if (f || t.dataTypes[0] === "jsonp")
                return s = t.jsonpCallback = k(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback,
                f ? t[f] = t[f].replace(Vi, "$1" + s) : t.jsonp !== !1 && (t.url += (Pi.test(t.url) ? "&" : "?") + t.jsonp + "=" + s),
                t.converters["script json"] = function() {
                    return c || o.error(s + " was not called"),
                    c[0]
                }
                ,
                t.dataTypes[0] = "json",
                u = e[s],
                e[s] = function() {
                    c = arguments
                }
                ,
                i.always(function() {
                    u === void 0 ? o(e).removeProp(s) : e[s] = u,
                    t[s] && (t.jsonpCallback = n.jsonpCallback,
                    cs.push(s)),
                    c && k(u) && u(c[0]),
                    c = u = void 0
                }),
                "script"
        }),
        j.createHTMLDocument = function() {
            var t = R.implementation.createHTMLDocument("").body;
            return t.innerHTML = "<form></form><form></form>",
            t.childNodes.length === 2
        }(),
        o.parseHTML = function(t, n, i) {
            if (typeof t != "string")
                return [];
            typeof n == "boolean" && (i = n,
            n = !1);
            var s, u, c;
            return n || (j.createHTMLDocument ? (n = R.implementation.createHTMLDocument(""),
            s = n.createElement("base"),
            s.href = R.location.href,
            n.head.appendChild(s)) : n = R),
            u = bt.exec(t),
            c = !i && [],
            u ? [n.createElement(u[1])] : (u = Hr([t], n, c),
            c && c.length && o(c).remove(),
            o.merge([], u.childNodes))
        }
        ,
        o.fn.load = function(t, n, i) {
            var s, u, c, f = this, m = t.indexOf(" ");
            return m > -1 && (s = Re(t.slice(m)),
            t = t.slice(0, m)),
            k(n) ? (i = n,
            n = void 0) : n && typeof n == "object" && (u = "POST"),
            f.length > 0 && o.ajax({
                url: t,
                type: u || "GET",
                dataType: "html",
                data: n
            }).done(function(p) {
                c = arguments,
                f.html(s ? o("<div>").append(o.parseHTML(p)).find(s) : p)
            }).always(i && function(p, b) {
                f.each(function() {
                    i.apply(this, c || [p.responseText, b, p])
                })
            }
            ),
            this
        }
        ,
        o.expr.pseudos.animated = function(t) {
            return o.grep(o.timers, function(n) {
                return t === n.elem
            }).length
        }
        ,
        o.offset = {
            setOffset: function(t, n, i) {
                var s, u, c, f, m, p, b, A = o.css(t, "position"), x = o(t), T = {};
                A === "static" && (t.style.position = "relative"),
                m = x.offset(),
                c = o.css(t, "top"),
                p = o.css(t, "left"),
                b = (A === "absolute" || A === "fixed") && (c + p).indexOf("auto") > -1,
                b ? (s = x.position(),
                f = s.top,
                u = s.left) : (f = parseFloat(c) || 0,
                u = parseFloat(p) || 0),
                k(n) && (n = n.call(t, i, o.extend({}, m))),
                n.top != null && (T.top = n.top - m.top + f),
                n.left != null && (T.left = n.left - m.left + u),
                "using"in n ? n.using.call(t, T) : x.css(T)
            }
        },
        o.fn.extend({
            offset: function(t) {
                if (arguments.length)
                    return t === void 0 ? this : this.each(function(u) {
                        o.offset.setOffset(this, t, u)
                    });
                var n, i, s = this[0];
                if (s)
                    return s.getClientRects().length ? (n = s.getBoundingClientRect(),
                    i = s.ownerDocument.defaultView,
                    {
                        top: n.top + i.pageYOffset,
                        left: n.left + i.pageXOffset
                    }) : {
                        top: 0,
                        left: 0
                    }
            },
            position: function() {
                if (this[0]) {
                    var t, n, i, s = this[0], u = {
                        top: 0,
                        left: 0
                    };
                    if (o.css(s, "position") === "fixed")
                        n = s.getBoundingClientRect();
                    else {
                        for (n = this.offset(),
                        i = s.ownerDocument,
                        t = s.offsetParent || i.documentElement; t && (t === i.body || t === i.documentElement) && o.css(t, "position") === "static"; )
                            t = t.parentNode;
                        t && t !== s && t.nodeType === 1 && (u = o(t).offset(),
                        u.top += o.css(t, "borderTopWidth", !0),
                        u.left += o.css(t, "borderLeftWidth", !0))
                    }
                    return {
                        top: n.top - u.top - o.css(s, "marginTop", !0),
                        left: n.left - u.left - o.css(s, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var t = this.offsetParent; t && o.css(t, "position") === "static"; )
                        t = t.offsetParent;
                    return t || re
                })
            }
        }),
        o.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(t, n) {
            var i = n === "pageYOffset";
            o.fn[t] = function(s) {
                return $t(this, function(u, c, f) {
                    var m;
                    if (Z(u) ? m = u : u.nodeType === 9 && (m = u.defaultView),
                    f === void 0)
                        return m ? m[n] : u[c];
                    m ? m.scrollTo(i ? m.pageXOffset : f, i ? f : m.pageYOffset) : u[c] = f
                }, t, s, arguments.length)
            }
        }),
        o.each(["top", "left"], function(t, n) {
            o.cssHooks[n] = Kr(j.pixelPosition, function(i, s) {
                if (s)
                    return s = Cn(i, n),
                    Oi.test(s) ? o(i).position()[n] + "px" : s
            })
        }),
        o.each({
            Height: "height",
            Width: "width"
        }, function(t, n) {
            o.each({
                padding: "inner" + t,
                content: n,
                "": "outer" + t
            }, function(i, s) {
                o.fn[s] = function(u, c) {
                    var f = arguments.length && (i || typeof u != "boolean")
                      , m = i || (u === !0 || c === !0 ? "margin" : "border");
                    return $t(this, function(p, b, A) {
                        var x;
                        return Z(p) ? s.indexOf("outer") === 0 ? p["inner" + t] : p.document.documentElement["client" + t] : p.nodeType === 9 ? (x = p.documentElement,
                        Math.max(p.body["scroll" + t], x["scroll" + t], p.body["offset" + t], x["offset" + t], x["client" + t])) : A === void 0 ? o.css(p, b, m) : o.style(p, b, A, m)
                    }, n, f ? u : void 0, f)
                }
            })
        }),
        o.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(t, n) {
            o.fn[n] = function(i) {
                return this.on(n, i)
            }
        }),
        o.fn.extend({
            bind: function(t, n, i) {
                return this.on(t, null, n, i)
            },
            unbind: function(t, n) {
                return this.off(t, null, n)
            },
            delegate: function(t, n, i, s) {
                return this.on(n, t, i, s)
            },
            undelegate: function(t, n, i) {
                return arguments.length === 1 ? this.off(t, "**") : this.off(n, t || "**", i)
            },
            hover: function(t, n) {
                return this.mouseenter(t).mouseleave(n || t)
            }
        }),
        o.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(t, n) {
            o.fn[n] = function(i, s) {
                return arguments.length > 0 ? this.on(n, null, i, s) : this.trigger(n)
            }
        });
        var Ra = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
        o.proxy = function(t, n) {
            var i, s, u;
            if (typeof n == "string" && (i = t[n],
            n = t,
            t = i),
            !!k(t))
                return s = _.call(arguments, 2),
                u = function() {
                    return t.apply(n || this, s.concat(_.call(arguments)))
                }
                ,
                u.guid = t.guid = t.guid || o.guid++,
                u
        }
        ,
        o.holdReady = function(t) {
            t ? o.readyWait++ : o.ready(!0)
        }
        ,
        o.isArray = Array.isArray,
        o.parseJSON = JSON.parse,
        o.nodeName = ft,
        o.isFunction = k,
        o.isWindow = Z,
        o.camelCase = It,
        o.type = X,
        o.now = Date.now,
        o.isNumeric = function(t) {
            var n = o.type(t);
            return (n === "number" || n === "string") && !isNaN(t - parseFloat(t))
        }
        ,
        o.trim = function(t) {
            return t == null ? "" : (t + "").replace(Ra, "$1")
        }
        ;
        var Ha = e.jQuery
          , ja = e.$;
        return o.noConflict = function(t) {
            return e.$ === o && (e.$ = ja),
            t && e.jQuery === o && (e.jQuery = Ha),
            o
        }
        ,
        typeof r > "u" && (e.jQuery = e.$ = o),
        o
    })
}
)(ru);
ln("#attributions-btn").on("click", function() {
    ln("#attributions-info").toggle()
});
new nu;
function su() {
    if (!localStorage.hasOwnProperty("lang")) {
        const a = ["en", "es"]
          , e = (navigator.language || navigator.userLanguage).split("-")[0]
          , r = a.includes(e) ? e : "en";
        localStorage.setItem("lang", r),
        document.documentElement.setAttribute("lang", r)
    }
}
function ou() {
    const a = document.getElementById("lang-btn")
      , e = to();
    a.innerHTML = e.toUpperCase()
}
function to() {
    return localStorage.getItem("lang") === "en" ? "es" : "en"
}
ln(function() {
    su(),
    ou(),
    ln("#change-language-btn").on("click", function(a) {
        a.preventDefault();
        const e = to();
        document.documentElement.setAttribute("lang", e),
        localStorage.setItem("lang", e),
        window.location.reload()
    })
});
var wt = "top"
  , jt = "bottom"
  , Vt = "right"
  , Ct = "left"
  , gi = "auto"
  , _n = [wt, jt, Vt, Ct]
  , Ye = "start"
  , fn = "end"
  , eo = "clippingParents"
  , mr = "viewport"
  , on = "popper"
  , no = "reference"
  , ur = _n.reduce(function(a, e) {
    return a.concat([e + "-" + Ye, e + "-" + fn])
}, [])
  , vr = [].concat(_n, [gi]).reduce(function(a, e) {
    return a.concat([e, e + "-" + Ye, e + "-" + fn])
}, [])
  , io = "beforeRead"
  , ro = "read"
  , so = "afterRead"
  , oo = "beforeMain"
  , ao = "main"
  , uo = "afterMain"
  , co = "beforeWrite"
  , lo = "write"
  , fo = "afterWrite"
  , ho = [io, ro, so, oo, ao, uo, co, lo, fo];
function ae(a) {
    return a ? (a.nodeName || "").toLowerCase() : null
}
function Yt(a) {
    if (a == null)
        return window;
    if (a.toString() !== "[object Window]") {
        var e = a.ownerDocument;
        return e && e.defaultView || window
    }
    return a
}
function ze(a) {
    var e = Yt(a).Element;
    return a instanceof e || a instanceof Element
}
function Kt(a) {
    var e = Yt(a).HTMLElement;
    return a instanceof e || a instanceof HTMLElement
}
function _r(a) {
    if (typeof ShadowRoot > "u")
        return !1;
    var e = Yt(a).ShadowRoot;
    return a instanceof e || a instanceof ShadowRoot
}
function au(a) {
    var e = a.state;
    Object.keys(e.elements).forEach(function(r) {
        var l = e.styles[r] || {}
          , h = e.attributes[r] || {}
          , _ = e.elements[r];
        !Kt(_) || !ae(_) || (Object.assign(_.style, l),
        Object.keys(h).forEach(function(E) {
            var C = h[E];
            C === !1 ? _.removeAttribute(E) : _.setAttribute(E, C === !0 ? "" : C)
        }))
    })
}
function uu(a) {
    var e = a.state
      , r = {
        popper: {
            position: e.options.strategy,
            left: "0",
            top: "0",
            margin: "0"
        },
        arrow: {
            position: "absolute"
        },
        reference: {}
    };
    return Object.assign(e.elements.popper.style, r.popper),
    e.styles = r,
    e.elements.arrow && Object.assign(e.elements.arrow.style, r.arrow),
    function() {
        Object.keys(e.elements).forEach(function(l) {
            var h = e.elements[l]
              , _ = e.attributes[l] || {}
              , E = Object.keys(e.styles.hasOwnProperty(l) ? e.styles[l] : r[l])
              , C = E.reduce(function(D, M) {
                return D[M] = "",
                D
            }, {});
            !Kt(h) || !ae(h) || (Object.assign(h.style, C),
            Object.keys(_).forEach(function(D) {
                h.removeAttribute(D)
            }))
        })
    }
}
const yr = {
    name: "applyStyles",
    enabled: !0,
    phase: "write",
    fn: au,
    effect: uu,
    requires: ["computeStyles"]
};
function se(a) {
    return a.split("-")[0]
}
var Ue = Math.max
  , fi = Math.min
  , dn = Math.round;
function cr() {
    var a = navigator.userAgentData;
    return a != null && a.brands ? a.brands.map(function(e) {
        return e.brand + "/" + e.version
    }).join(" ") : navigator.userAgent
}
function po() {
    return !/^((?!chrome|android).)*safari/i.test(cr())
}
function hn(a, e, r) {
    e === void 0 && (e = !1),
    r === void 0 && (r = !1);
    var l = a.getBoundingClientRect()
      , h = 1
      , _ = 1;
    e && Kt(a) && (h = a.offsetWidth > 0 && dn(l.width) / a.offsetWidth || 1,
    _ = a.offsetHeight > 0 && dn(l.height) / a.offsetHeight || 1);
    var E = ze(a) ? Yt(a) : window
      , C = E.visualViewport
      , D = !po() && r
      , M = (l.left + (D && C ? C.offsetLeft : 0)) / h
      , $ = (l.top + (D && C ? C.offsetTop : 0)) / _
      , Y = l.width / h
      , Q = l.height / _;
    return {
        width: Y,
        height: Q,
        top: $,
        right: M + Y,
        bottom: $ + Q,
        left: M,
        x: M,
        y: $
    }
}
function br(a) {
    var e = hn(a)
      , r = a.offsetWidth
      , l = a.offsetHeight;
    return Math.abs(e.width - r) <= 1 && (r = e.width),
    Math.abs(e.height - l) <= 1 && (l = e.height),
    {
        x: a.offsetLeft,
        y: a.offsetTop,
        width: r,
        height: l
    }
}
function go(a, e) {
    var r = e.getRootNode && e.getRootNode();
    if (a.contains(e))
        return !0;
    if (r && _r(r)) {
        var l = e;
        do {
            if (l && a.isSameNode(l))
                return !0;
            l = l.parentNode || l.host
        } while (l)
    }
    return !1
}
function ve(a) {
    return Yt(a).getComputedStyle(a)
}
function cu(a) {
    return ["table", "td", "th"].indexOf(ae(a)) >= 0
}
function Se(a) {
    return ((ze(a) ? a.ownerDocument : a.document) || window.document).documentElement
}
function mi(a) {
    return ae(a) === "html" ? a : a.assignedSlot || a.parentNode || (_r(a) ? a.host : null) || Se(a)
}
function ys(a) {
    return !Kt(a) || ve(a).position === "fixed" ? null : a.offsetParent
}
function lu(a) {
    var e = /firefox/i.test(cr())
      , r = /Trident/i.test(cr());
    if (r && Kt(a)) {
        var l = ve(a);
        if (l.position === "fixed")
            return null
    }
    var h = mi(a);
    for (_r(h) && (h = h.host); Kt(h) && ["html", "body"].indexOf(ae(h)) < 0; ) {
        var _ = ve(h);
        if (_.transform !== "none" || _.perspective !== "none" || _.contain === "paint" || ["transform", "perspective"].indexOf(_.willChange) !== -1 || e && _.willChange === "filter" || e && _.filter && _.filter !== "none")
            return h;
        h = h.parentNode
    }
    return null
}
function Hn(a) {
    for (var e = Yt(a), r = ys(a); r && cu(r) && ve(r).position === "static"; )
        r = ys(r);
    return r && (ae(r) === "html" || ae(r) === "body" && ve(r).position === "static") ? e : r || lu(a) || e
}
function Er(a) {
    return ["top", "bottom"].indexOf(a) >= 0 ? "x" : "y"
}
function Pn(a, e, r) {
    return Ue(a, fi(e, r))
}
function fu(a, e, r) {
    var l = Pn(a, e, r);
    return l > r ? r : l
}
function mo() {
    return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
}
function vo(a) {
    return Object.assign({}, mo(), a)
}
function _o(a, e) {
    return e.reduce(function(r, l) {
        return r[l] = a,
        r
    }, {})
}
var du = function(e, r) {
    return e = typeof e == "function" ? e(Object.assign({}, r.rects, {
        placement: r.placement
    })) : e,
    vo(typeof e != "number" ? e : _o(e, _n))
};
function hu(a) {
    var e, r = a.state, l = a.name, h = a.options, _ = r.elements.arrow, E = r.modifiersData.popperOffsets, C = se(r.placement), D = Er(C), M = [Ct, Vt].indexOf(C) >= 0, $ = M ? "height" : "width";
    if (!(!_ || !E)) {
        var Y = du(h.padding, r)
          , Q = br(_)
          , U = D === "y" ? wt : Ct
          , j = D === "y" ? jt : Vt
          , k = r.rects.reference[$] + r.rects.reference[D] - E[D] - r.rects.popper[$]
          , Z = E[D] - r.rects.reference[D]
          , R = Hn(_)
          , ht = R ? D === "y" ? R.clientHeight || 0 : R.clientWidth || 0 : 0
          , lt = k / 2 - Z / 2
          , X = Y[U]
          , nt = ht - Q[$] - Y[j]
          , o = ht / 2 - Q[$] / 2 + lt
          , at = Pn(X, o, nt)
          , ut = D;
        r.modifiersData[l] = (e = {},
        e[ut] = at,
        e.centerOffset = at - o,
        e)
    }
}
function pu(a) {
    var e = a.state
      , r = a.options
      , l = r.element
      , h = l === void 0 ? "[data-popper-arrow]" : l;
    h != null && (typeof h == "string" && (h = e.elements.popper.querySelector(h),
    !h) || go(e.elements.popper, h) && (e.elements.arrow = h))
}
const yo = {
    name: "arrow",
    enabled: !0,
    phase: "main",
    fn: hu,
    effect: pu,
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"]
};
function pn(a) {
    return a.split("-")[1]
}
var gu = {
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto"
};
function mu(a) {
    var e = a.x
      , r = a.y
      , l = window
      , h = l.devicePixelRatio || 1;
    return {
        x: dn(e * h) / h || 0,
        y: dn(r * h) / h || 0
    }
}
function bs(a) {
    var e, r = a.popper, l = a.popperRect, h = a.placement, _ = a.variation, E = a.offsets, C = a.position, D = a.gpuAcceleration, M = a.adaptive, $ = a.roundOffsets, Y = a.isFixed, Q = E.x, U = Q === void 0 ? 0 : Q, j = E.y, k = j === void 0 ? 0 : j, Z = typeof $ == "function" ? $({
        x: U,
        y: k
    }) : {
        x: U,
        y: k
    };
    U = Z.x,
    k = Z.y;
    var R = E.hasOwnProperty("x")
      , ht = E.hasOwnProperty("y")
      , lt = Ct
      , X = wt
      , nt = window;
    if (M) {
        var o = Hn(r)
          , at = "clientHeight"
          , ut = "clientWidth";
        if (o === Yt(r) && (o = Se(r),
        ve(o).position !== "static" && C === "absolute" && (at = "scrollHeight",
        ut = "scrollWidth")),
        o = o,
        h === wt || (h === Ct || h === Vt) && _ === fn) {
            X = jt;
            var ct = Y && o === nt && nt.visualViewport ? nt.visualViewport.height : o[at];
            k -= ct - l.height,
            k *= D ? 1 : -1
        }
        if (h === Ct || (h === wt || h === jt) && _ === fn) {
            lt = Vt;
            var gt = Y && o === nt && nt.visualViewport ? nt.visualViewport.width : o[ut];
            U -= gt - l.width,
            U *= D ? 1 : -1
        }
    }
    var vt = Object.assign({
        position: C
    }, M && gu)
      , ft = $ === !0 ? mu({
        x: U,
        y: k
    }) : {
        x: U,
        y: k
    };
    if (U = ft.x,
    k = ft.y,
    D) {
        var bt;
        return Object.assign({}, vt, (bt = {},
        bt[X] = ht ? "0" : "",
        bt[lt] = R ? "0" : "",
        bt.transform = (nt.devicePixelRatio || 1) <= 1 ? "translate(" + U + "px, " + k + "px)" : "translate3d(" + U + "px, " + k + "px, 0)",
        bt))
    }
    return Object.assign({}, vt, (e = {},
    e[X] = ht ? k + "px" : "",
    e[lt] = R ? U + "px" : "",
    e.transform = "",
    e))
}
function vu(a) {
    var e = a.state
      , r = a.options
      , l = r.gpuAcceleration
      , h = l === void 0 ? !0 : l
      , _ = r.adaptive
      , E = _ === void 0 ? !0 : _
      , C = r.roundOffsets
      , D = C === void 0 ? !0 : C
      , M = {
        placement: se(e.placement),
        variation: pn(e.placement),
        popper: e.elements.popper,
        popperRect: e.rects.popper,
        gpuAcceleration: h,
        isFixed: e.options.strategy === "fixed"
    };
    e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, bs(Object.assign({}, M, {
        offsets: e.modifiersData.popperOffsets,
        position: e.options.strategy,
        adaptive: E,
        roundOffsets: D
    })))),
    e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, bs(Object.assign({}, M, {
        offsets: e.modifiersData.arrow,
        position: "absolute",
        adaptive: !1,
        roundOffsets: D
    })))),
    e.attributes.popper = Object.assign({}, e.attributes.popper, {
        "data-popper-placement": e.placement
    })
}
const Tr = {
    name: "computeStyles",
    enabled: !0,
    phase: "beforeWrite",
    fn: vu,
    data: {}
};
var ei = {
    passive: !0
};
function _u(a) {
    var e = a.state
      , r = a.instance
      , l = a.options
      , h = l.scroll
      , _ = h === void 0 ? !0 : h
      , E = l.resize
      , C = E === void 0 ? !0 : E
      , D = Yt(e.elements.popper)
      , M = [].concat(e.scrollParents.reference, e.scrollParents.popper);
    return _ && M.forEach(function($) {
        $.addEventListener("scroll", r.update, ei)
    }),
    C && D.addEventListener("resize", r.update, ei),
    function() {
        _ && M.forEach(function($) {
            $.removeEventListener("scroll", r.update, ei)
        }),
        C && D.removeEventListener("resize", r.update, ei)
    }
}
const Ar = {
    name: "eventListeners",
    enabled: !0,
    phase: "write",
    fn: function() {},
    effect: _u,
    data: {}
};
var yu = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
};
function ui(a) {
    return a.replace(/left|right|bottom|top/g, function(e) {
        return yu[e]
    })
}
var bu = {
    start: "end",
    end: "start"
};
function Es(a) {
    return a.replace(/start|end/g, function(e) {
        return bu[e]
    })
}
function wr(a) {
    var e = Yt(a)
      , r = e.pageXOffset
      , l = e.pageYOffset;
    return {
        scrollLeft: r,
        scrollTop: l
    }
}
function Cr(a) {
    return hn(Se(a)).left + wr(a).scrollLeft
}
function Eu(a, e) {
    var r = Yt(a)
      , l = Se(a)
      , h = r.visualViewport
      , _ = l.clientWidth
      , E = l.clientHeight
      , C = 0
      , D = 0;
    if (h) {
        _ = h.width,
        E = h.height;
        var M = po();
        (M || !M && e === "fixed") && (C = h.offsetLeft,
        D = h.offsetTop)
    }
    return {
        width: _,
        height: E,
        x: C + Cr(a),
        y: D
    }
}
function Tu(a) {
    var e, r = Se(a), l = wr(a), h = (e = a.ownerDocument) == null ? void 0 : e.body, _ = Ue(r.scrollWidth, r.clientWidth, h ? h.scrollWidth : 0, h ? h.clientWidth : 0), E = Ue(r.scrollHeight, r.clientHeight, h ? h.scrollHeight : 0, h ? h.clientHeight : 0), C = -l.scrollLeft + Cr(a), D = -l.scrollTop;
    return ve(h || r).direction === "rtl" && (C += Ue(r.clientWidth, h ? h.clientWidth : 0) - _),
    {
        width: _,
        height: E,
        x: C,
        y: D
    }
}
function Nr(a) {
    var e = ve(a)
      , r = e.overflow
      , l = e.overflowX
      , h = e.overflowY;
    return /auto|scroll|overlay|hidden/.test(r + h + l)
}
function bo(a) {
    return ["html", "body", "#document"].indexOf(ae(a)) >= 0 ? a.ownerDocument.body : Kt(a) && Nr(a) ? a : bo(mi(a))
}
function Mn(a, e) {
    var r;
    e === void 0 && (e = []);
    var l = bo(a)
      , h = l === ((r = a.ownerDocument) == null ? void 0 : r.body)
      , _ = Yt(l)
      , E = h ? [_].concat(_.visualViewport || [], Nr(l) ? l : []) : l
      , C = e.concat(E);
    return h ? C : C.concat(Mn(mi(E)))
}
function lr(a) {
    return Object.assign({}, a, {
        left: a.x,
        top: a.y,
        right: a.x + a.width,
        bottom: a.y + a.height
    })
}
function Au(a, e) {
    var r = hn(a, !1, e === "fixed");
    return r.top = r.top + a.clientTop,
    r.left = r.left + a.clientLeft,
    r.bottom = r.top + a.clientHeight,
    r.right = r.left + a.clientWidth,
    r.width = a.clientWidth,
    r.height = a.clientHeight,
    r.x = r.left,
    r.y = r.top,
    r
}
function Ts(a, e, r) {
    return e === mr ? lr(Eu(a, r)) : ze(e) ? Au(e, r) : lr(Tu(Se(a)))
}
function wu(a) {
    var e = Mn(mi(a))
      , r = ["absolute", "fixed"].indexOf(ve(a).position) >= 0
      , l = r && Kt(a) ? Hn(a) : a;
    return ze(l) ? e.filter(function(h) {
        return ze(h) && go(h, l) && ae(h) !== "body"
    }) : []
}
function Cu(a, e, r, l) {
    var h = e === "clippingParents" ? wu(a) : [].concat(e)
      , _ = [].concat(h, [r])
      , E = _[0]
      , C = _.reduce(function(D, M) {
        var $ = Ts(a, M, l);
        return D.top = Ue($.top, D.top),
        D.right = fi($.right, D.right),
        D.bottom = fi($.bottom, D.bottom),
        D.left = Ue($.left, D.left),
        D
    }, Ts(a, E, l));
    return C.width = C.right - C.left,
    C.height = C.bottom - C.top,
    C.x = C.left,
    C.y = C.top,
    C
}
function Eo(a) {
    var e = a.reference, r = a.element, l = a.placement, h = l ? se(l) : null, _ = l ? pn(l) : null, E = e.x + e.width / 2 - r.width / 2, C = e.y + e.height / 2 - r.height / 2, D;
    switch (h) {
    case wt:
        D = {
            x: E,
            y: e.y - r.height
        };
        break;
    case jt:
        D = {
            x: E,
            y: e.y + e.height
        };
        break;
    case Vt:
        D = {
            x: e.x + e.width,
            y: C
        };
        break;
    case Ct:
        D = {
            x: e.x - r.width,
            y: C
        };
        break;
    default:
        D = {
            x: e.x,
            y: e.y
        }
    }
    var M = h ? Er(h) : null;
    if (M != null) {
        var $ = M === "y" ? "height" : "width";
        switch (_) {
        case Ye:
            D[M] = D[M] - (e[$] / 2 - r[$] / 2);
            break;
        case fn:
            D[M] = D[M] + (e[$] / 2 - r[$] / 2);
            break
        }
    }
    return D
}
function gn(a, e) {
    e === void 0 && (e = {});
    var r = e
      , l = r.placement
      , h = l === void 0 ? a.placement : l
      , _ = r.strategy
      , E = _ === void 0 ? a.strategy : _
      , C = r.boundary
      , D = C === void 0 ? eo : C
      , M = r.rootBoundary
      , $ = M === void 0 ? mr : M
      , Y = r.elementContext
      , Q = Y === void 0 ? on : Y
      , U = r.altBoundary
      , j = U === void 0 ? !1 : U
      , k = r.padding
      , Z = k === void 0 ? 0 : k
      , R = vo(typeof Z != "number" ? Z : _o(Z, _n))
      , ht = Q === on ? no : on
      , lt = a.rects.popper
      , X = a.elements[j ? ht : Q]
      , nt = Cu(ze(X) ? X : X.contextElement || Se(a.elements.popper), D, $, E)
      , o = hn(a.elements.reference)
      , at = Eo({
        reference: o,
        element: lt,
        strategy: "absolute",
        placement: h
    })
      , ut = lr(Object.assign({}, lt, at))
      , ct = Q === on ? ut : o
      , gt = {
        top: nt.top - ct.top + R.top,
        bottom: ct.bottom - nt.bottom + R.bottom,
        left: nt.left - ct.left + R.left,
        right: ct.right - nt.right + R.right
    }
      , vt = a.modifiersData.offset;
    if (Q === on && vt) {
        var ft = vt[h];
        Object.keys(gt).forEach(function(bt) {
            var Gt = [Vt, jt].indexOf(bt) >= 0 ? 1 : -1
              , ie = [wt, jt].indexOf(bt) >= 0 ? "y" : "x";
            gt[bt] += ft[ie] * Gt
        })
    }
    return gt
}
function Nu(a, e) {
    e === void 0 && (e = {});
    var r = e
      , l = r.placement
      , h = r.boundary
      , _ = r.rootBoundary
      , E = r.padding
      , C = r.flipVariations
      , D = r.allowedAutoPlacements
      , M = D === void 0 ? vr : D
      , $ = pn(l)
      , Y = $ ? C ? ur : ur.filter(function(j) {
        return pn(j) === $
    }) : _n
      , Q = Y.filter(function(j) {
        return M.indexOf(j) >= 0
    });
    Q.length === 0 && (Q = Y);
    var U = Q.reduce(function(j, k) {
        return j[k] = gn(a, {
            placement: k,
            boundary: h,
            rootBoundary: _,
            padding: E
        })[se(k)],
        j
    }, {});
    return Object.keys(U).sort(function(j, k) {
        return U[j] - U[k]
    })
}
function Su(a) {
    if (se(a) === gi)
        return [];
    var e = ui(a);
    return [Es(a), e, Es(e)]
}
function xu(a) {
    var e = a.state
      , r = a.options
      , l = a.name;
    if (!e.modifiersData[l]._skip) {
        for (var h = r.mainAxis, _ = h === void 0 ? !0 : h, E = r.altAxis, C = E === void 0 ? !0 : E, D = r.fallbackPlacements, M = r.padding, $ = r.boundary, Y = r.rootBoundary, Q = r.altBoundary, U = r.flipVariations, j = U === void 0 ? !0 : U, k = r.allowedAutoPlacements, Z = e.options.placement, R = se(Z), ht = R === Z, lt = D || (ht || !j ? [ui(Z)] : Su(Z)), X = [Z].concat(lt).reduce(function(Qt, Jt) {
            return Qt.concat(se(Jt) === gi ? Nu(e, {
                placement: Jt,
                boundary: $,
                rootBoundary: Y,
                padding: M,
                flipVariations: j,
                allowedAutoPlacements: k
            }) : Jt)
        }, []), nt = e.rects.reference, o = e.rects.popper, at = new Map, ut = !0, ct = X[0], gt = 0; gt < X.length; gt++) {
            var vt = X[gt]
              , ft = se(vt)
              , bt = pn(vt) === Ye
              , Gt = [wt, jt].indexOf(ft) >= 0
              , ie = Gt ? "width" : "height"
              , At = gn(e, {
                placement: vt,
                boundary: $,
                rootBoundary: Y,
                altBoundary: Q,
                padding: M
            })
              , Lt = Gt ? bt ? Vt : Ct : bt ? jt : wt;
            nt[ie] > o[ie] && (Lt = ui(Lt));
            var Qe = ui(Lt)
              , ue = [];
            if (_ && ue.push(At[ft] <= 0),
            C && ue.push(At[Lt] <= 0, At[Qe] <= 0),
            ue.every(function(Qt) {
                return Qt
            })) {
                ct = vt,
                ut = !1;
                break
            }
            at.set(vt, ue)
        }
        if (ut)
            for (var De = j ? 3 : 1, Nt = function(Jt) {
                var $e = X.find(function(ye) {
                    var qt = at.get(ye);
                    if (qt)
                        return qt.slice(0, Jt).every(function($t) {
                            return $t
                        })
                });
                if ($e)
                    return ct = $e,
                    "break"
            }, Le = De; Le > 0; Le--) {
                var Xt = Nt(Le);
                if (Xt === "break")
                    break
            }
        e.placement !== ct && (e.modifiersData[l]._skip = !0,
        e.placement = ct,
        e.reset = !0)
    }
}
const To = {
    name: "flip",
    enabled: !0,
    phase: "main",
    fn: xu,
    requiresIfExists: ["offset"],
    data: {
        _skip: !1
    }
};
function As(a, e, r) {
    return r === void 0 && (r = {
        x: 0,
        y: 0
    }),
    {
        top: a.top - e.height - r.y,
        right: a.right - e.width + r.x,
        bottom: a.bottom - e.height + r.y,
        left: a.left - e.width - r.x
    }
}
function ws(a) {
    return [wt, Vt, jt, Ct].some(function(e) {
        return a[e] >= 0
    })
}
function Ou(a) {
    var e = a.state
      , r = a.name
      , l = e.rects.reference
      , h = e.rects.popper
      , _ = e.modifiersData.preventOverflow
      , E = gn(e, {
        elementContext: "reference"
    })
      , C = gn(e, {
        altBoundary: !0
    })
      , D = As(E, l)
      , M = As(C, h, _)
      , $ = ws(D)
      , Y = ws(M);
    e.modifiersData[r] = {
        referenceClippingOffsets: D,
        popperEscapeOffsets: M,
        isReferenceHidden: $,
        hasPopperEscaped: Y
    },
    e.attributes.popper = Object.assign({}, e.attributes.popper, {
        "data-popper-reference-hidden": $,
        "data-popper-escaped": Y
    })
}
const Ao = {
    name: "hide",
    enabled: !0,
    phase: "main",
    requiresIfExists: ["preventOverflow"],
    fn: Ou
};
function Du(a, e, r) {
    var l = se(a)
      , h = [Ct, wt].indexOf(l) >= 0 ? -1 : 1
      , _ = typeof r == "function" ? r(Object.assign({}, e, {
        placement: a
    })) : r
      , E = _[0]
      , C = _[1];
    return E = E || 0,
    C = (C || 0) * h,
    [Ct, Vt].indexOf(l) >= 0 ? {
        x: C,
        y: E
    } : {
        x: E,
        y: C
    }
}
function Lu(a) {
    var e = a.state
      , r = a.options
      , l = a.name
      , h = r.offset
      , _ = h === void 0 ? [0, 0] : h
      , E = vr.reduce(function($, Y) {
        return $[Y] = Du(Y, e.rects, _),
        $
    }, {})
      , C = E[e.placement]
      , D = C.x
      , M = C.y;
    e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += D,
    e.modifiersData.popperOffsets.y += M),
    e.modifiersData[l] = E
}
const wo = {
    name: "offset",
    enabled: !0,
    phase: "main",
    requires: ["popperOffsets"],
    fn: Lu
};
function $u(a) {
    var e = a.state
      , r = a.name;
    e.modifiersData[r] = Eo({
        reference: e.rects.reference,
        element: e.rects.popper,
        strategy: "absolute",
        placement: e.placement
    })
}
const Sr = {
    name: "popperOffsets",
    enabled: !0,
    phase: "read",
    fn: $u,
    data: {}
};
function Iu(a) {
    return a === "x" ? "y" : "x"
}
function ku(a) {
    var e = a.state
      , r = a.options
      , l = a.name
      , h = r.mainAxis
      , _ = h === void 0 ? !0 : h
      , E = r.altAxis
      , C = E === void 0 ? !1 : E
      , D = r.boundary
      , M = r.rootBoundary
      , $ = r.altBoundary
      , Y = r.padding
      , Q = r.tether
      , U = Q === void 0 ? !0 : Q
      , j = r.tetherOffset
      , k = j === void 0 ? 0 : j
      , Z = gn(e, {
        boundary: D,
        rootBoundary: M,
        padding: Y,
        altBoundary: $
    })
      , R = se(e.placement)
      , ht = pn(e.placement)
      , lt = !ht
      , X = Er(R)
      , nt = Iu(X)
      , o = e.modifiersData.popperOffsets
      , at = e.rects.reference
      , ut = e.rects.popper
      , ct = typeof k == "function" ? k(Object.assign({}, e.rects, {
        placement: e.placement
    })) : k
      , gt = typeof ct == "number" ? {
        mainAxis: ct,
        altAxis: ct
    } : Object.assign({
        mainAxis: 0,
        altAxis: 0
    }, ct)
      , vt = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null
      , ft = {
        x: 0,
        y: 0
    };
    if (o) {
        if (_) {
            var bt, Gt = X === "y" ? wt : Ct, ie = X === "y" ? jt : Vt, At = X === "y" ? "height" : "width", Lt = o[X], Qe = Lt + Z[Gt], ue = Lt - Z[ie], De = U ? -ut[At] / 2 : 0, Nt = ht === Ye ? at[At] : ut[At], Le = ht === Ye ? -ut[At] : -at[At], Xt = e.elements.arrow, Qt = U && Xt ? br(Xt) : {
                width: 0,
                height: 0
            }, Jt = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : mo(), $e = Jt[Gt], ye = Jt[ie], qt = Pn(0, at[At], Qt[At]), $t = lt ? at[At] / 2 - De - qt - $e - gt.mainAxis : Nt - qt - $e - gt.mainAxis, Ai = lt ? -at[At] / 2 + De + qt + ye + gt.mainAxis : Le + qt + ye + gt.mainAxis, Tn = e.elements.arrow && Hn(e.elements.arrow), wi = Tn ? X === "y" ? Tn.clientTop || 0 : Tn.clientLeft || 0 : 0, It = (bt = vt == null ? void 0 : vt[X]) != null ? bt : 0, Ie = Lt + $t - It - wi, ke = Lt + Ai - It, q = Pn(U ? fi(Qe, Ie) : Qe, Lt, U ? Ue(ue, ke) : ue);
            o[X] = q,
            ft[X] = q - Lt
        }
        if (C) {
            var Et, Ci = X === "x" ? wt : Ct, Ni = X === "x" ? jt : Vt, ce = o[nt], Pe = nt === "y" ? "height" : "width", An = ce + Z[Ci], be = ce - Z[Ni], kt = [wt, Ct].indexOf(R) !== -1, re = (Et = vt == null ? void 0 : vt[nt]) != null ? Et : 0, le = kt ? An : ce - at[Pe] - ut[Pe] - re + gt.altAxis, Bn = kt ? ce + at[Pe] + ut[Pe] - re - gt.altAxis : be, Me = U && kt ? fu(le, ce, Bn) : Pn(U ? le : An, ce, U ? Bn : be);
            o[nt] = Me,
            ft[nt] = Me - ce
        }
        e.modifiersData[l] = ft
    }
}
const Co = {
    name: "preventOverflow",
    enabled: !0,
    phase: "main",
    fn: ku,
    requiresIfExists: ["offset"]
};
function Pu(a) {
    return {
        scrollLeft: a.scrollLeft,
        scrollTop: a.scrollTop
    }
}
function Mu(a) {
    return a === Yt(a) || !Kt(a) ? wr(a) : Pu(a)
}
function Ru(a) {
    var e = a.getBoundingClientRect()
      , r = dn(e.width) / a.offsetWidth || 1
      , l = dn(e.height) / a.offsetHeight || 1;
    return r !== 1 || l !== 1
}
function Hu(a, e, r) {
    r === void 0 && (r = !1);
    var l = Kt(e)
      , h = Kt(e) && Ru(e)
      , _ = Se(e)
      , E = hn(a, h, r)
      , C = {
        scrollLeft: 0,
        scrollTop: 0
    }
      , D = {
        x: 0,
        y: 0
    };
    return (l || !l && !r) && ((ae(e) !== "body" || Nr(_)) && (C = Mu(e)),
    Kt(e) ? (D = hn(e, !0),
    D.x += e.clientLeft,
    D.y += e.clientTop) : _ && (D.x = Cr(_))),
    {
        x: E.left + C.scrollLeft - D.x,
        y: E.top + C.scrollTop - D.y,
        width: E.width,
        height: E.height
    }
}
function ju(a) {
    var e = new Map
      , r = new Set
      , l = [];
    a.forEach(function(_) {
        e.set(_.name, _)
    });
    function h(_) {
        r.add(_.name);
        var E = [].concat(_.requires || [], _.requiresIfExists || []);
        E.forEach(function(C) {
            if (!r.has(C)) {
                var D = e.get(C);
                D && h(D)
            }
        }),
        l.push(_)
    }
    return a.forEach(function(_) {
        r.has(_.name) || h(_)
    }),
    l
}
function Vu(a) {
    var e = ju(a);
    return ho.reduce(function(r, l) {
        return r.concat(e.filter(function(h) {
            return h.phase === l
        }))
    }, [])
}
function qu(a) {
    var e;
    return function() {
        return e || (e = new Promise(function(r) {
            Promise.resolve().then(function() {
                e = void 0,
                r(a())
            })
        }
        )),
        e
    }
}
function Wu(a) {
    var e = a.reduce(function(r, l) {
        var h = r[l.name];
        return r[l.name] = h ? Object.assign({}, h, l, {
            options: Object.assign({}, h.options, l.options),
            data: Object.assign({}, h.data, l.data)
        }) : l,
        r
    }, {});
    return Object.keys(e).map(function(r) {
        return e[r]
    })
}
var Cs = {
    placement: "bottom",
    modifiers: [],
    strategy: "absolute"
};
function Ns() {
    for (var a = arguments.length, e = new Array(a), r = 0; r < a; r++)
        e[r] = arguments[r];
    return !e.some(function(l) {
        return !(l && typeof l.getBoundingClientRect == "function")
    })
}
function vi(a) {
    a === void 0 && (a = {});
    var e = a
      , r = e.defaultModifiers
      , l = r === void 0 ? [] : r
      , h = e.defaultOptions
      , _ = h === void 0 ? Cs : h;
    return function(C, D, M) {
        M === void 0 && (M = _);
        var $ = {
            placement: "bottom",
            orderedModifiers: [],
            options: Object.assign({}, Cs, _),
            modifiersData: {},
            elements: {
                reference: C,
                popper: D
            },
            attributes: {},
            styles: {}
        }
          , Y = []
          , Q = !1
          , U = {
            state: $,
            setOptions: function(R) {
                var ht = typeof R == "function" ? R($.options) : R;
                k(),
                $.options = Object.assign({}, _, $.options, ht),
                $.scrollParents = {
                    reference: ze(C) ? Mn(C) : C.contextElement ? Mn(C.contextElement) : [],
                    popper: Mn(D)
                };
                var lt = Vu(Wu([].concat(l, $.options.modifiers)));
                return $.orderedModifiers = lt.filter(function(X) {
                    return X.enabled
                }),
                j(),
                U.update()
            },
            forceUpdate: function() {
                if (!Q) {
                    var R = $.elements
                      , ht = R.reference
                      , lt = R.popper;
                    if (Ns(ht, lt)) {
                        $.rects = {
                            reference: Hu(ht, Hn(lt), $.options.strategy === "fixed"),
                            popper: br(lt)
                        },
                        $.reset = !1,
                        $.placement = $.options.placement,
                        $.orderedModifiers.forEach(function(gt) {
                            return $.modifiersData[gt.name] = Object.assign({}, gt.data)
                        });
                        for (var X = 0; X < $.orderedModifiers.length; X++) {
                            if ($.reset === !0) {
                                $.reset = !1,
                                X = -1;
                                continue
                            }
                            var nt = $.orderedModifiers[X]
                              , o = nt.fn
                              , at = nt.options
                              , ut = at === void 0 ? {} : at
                              , ct = nt.name;
                            typeof o == "function" && ($ = o({
                                state: $,
                                options: ut,
                                name: ct,
                                instance: U
                            }) || $)
                        }
                    }
                }
            },
            update: qu(function() {
                return new Promise(function(Z) {
                    U.forceUpdate(),
                    Z($)
                }
                )
            }),
            destroy: function() {
                k(),
                Q = !0
            }
        };
        if (!Ns(C, D))
            return U;
        U.setOptions(M).then(function(Z) {
            !Q && M.onFirstUpdate && M.onFirstUpdate(Z)
        });
        function j() {
            $.orderedModifiers.forEach(function(Z) {
                var R = Z.name
                  , ht = Z.options
                  , lt = ht === void 0 ? {} : ht
                  , X = Z.effect;
                if (typeof X == "function") {
                    var nt = X({
                        state: $,
                        name: R,
                        instance: U,
                        options: lt
                    })
                      , o = function() {};
                    Y.push(nt || o)
                }
            })
        }
        function k() {
            Y.forEach(function(Z) {
                return Z()
            }),
            Y = []
        }
        return U
    }
}
var Bu = vi()
  , Fu = [Ar, Sr, Tr, yr]
  , Ku = vi({
    defaultModifiers: Fu
})
  , Uu = [Ar, Sr, Tr, yr, wo, To, Co, yo, Ao]
  , xr = vi({
    defaultModifiers: Uu
});
const No = Object.freeze(Object.defineProperty({
    __proto__: null,
    afterMain: uo,
    afterRead: so,
    afterWrite: fo,
    applyStyles: yr,
    arrow: yo,
    auto: gi,
    basePlacements: _n,
    beforeMain: oo,
    beforeRead: io,
    beforeWrite: co,
    bottom: jt,
    clippingParents: eo,
    computeStyles: Tr,
    createPopper: xr,
    createPopperBase: Bu,
    createPopperLite: Ku,
    detectOverflow: gn,
    end: fn,
    eventListeners: Ar,
    flip: To,
    hide: Ao,
    left: Ct,
    main: ao,
    modifierPhases: ho,
    offset: wo,
    placements: vr,
    popper: on,
    popperGenerator: vi,
    popperOffsets: Sr,
    preventOverflow: Co,
    read: ro,
    reference: no,
    right: Vt,
    start: Ye,
    top: wt,
    variationPlacements: ur,
    viewport: mr,
    write: lo
}, Symbol.toStringTag, {
    value: "Module"
}));
/*!
  * Bootstrap v5.2.3 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
const Yu = 1e6
  , zu = 1e3
  , fr = "transitionend"
  , Gu = a=>a == null ? `${a}` : Object.prototype.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase()
  , Xu = a=>{
    do
        a += Math.floor(Math.random() * Yu);
    while (document.getElementById(a));
    return a
}
  , So = a=>{
    let e = a.getAttribute("data-bs-target");
    if (!e || e === "#") {
        let r = a.getAttribute("href");
        if (!r || !r.includes("#") && !r.startsWith("."))
            return null;
        r.includes("#") && !r.startsWith("#") && (r = `#${r.split("#")[1]}`),
        e = r && r !== "#" ? r.trim() : null
    }
    return e
}
  , xo = a=>{
    const e = So(a);
    return e && document.querySelector(e) ? e : null
}
  , pe = a=>{
    const e = So(a);
    return e ? document.querySelector(e) : null
}
  , Qu = a=>{
    if (!a)
        return 0;
    let {transitionDuration: e, transitionDelay: r} = window.getComputedStyle(a);
    const l = Number.parseFloat(e)
      , h = Number.parseFloat(r);
    return !l && !h ? 0 : (e = e.split(",")[0],
    r = r.split(",")[0],
    (Number.parseFloat(e) + Number.parseFloat(r)) * zu)
}
  , Oo = a=>{
    a.dispatchEvent(new Event(fr))
}
  , ge = a=>!a || typeof a != "object" ? !1 : (typeof a.jquery < "u" && (a = a[0]),
typeof a.nodeType < "u")
  , we = a=>ge(a) ? a.jquery ? a[0] : a : typeof a == "string" && a.length > 0 ? document.querySelector(a) : null
  , yn = a=>{
    if (!ge(a) || a.getClientRects().length === 0)
        return !1;
    const e = getComputedStyle(a).getPropertyValue("visibility") === "visible"
      , r = a.closest("details:not([open])");
    if (!r)
        return e;
    if (r !== a) {
        const l = a.closest("summary");
        if (l && l.parentNode !== r || l === null)
            return !1
    }
    return e
}
  , Ce = a=>!a || a.nodeType !== Node.ELEMENT_NODE || a.classList.contains("disabled") ? !0 : typeof a.disabled < "u" ? a.disabled : a.hasAttribute("disabled") && a.getAttribute("disabled") !== "false"
  , Do = a=>{
    if (!document.documentElement.attachShadow)
        return null;
    if (typeof a.getRootNode == "function") {
        const e = a.getRootNode();
        return e instanceof ShadowRoot ? e : null
    }
    return a instanceof ShadowRoot ? a : a.parentNode ? Do(a.parentNode) : null
}
  , di = ()=>{}
  , jn = a=>{
    a.offsetHeight
}
  , Lo = ()=>window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null
  , Gi = []
  , Ju = a=>{
    document.readyState === "loading" ? (Gi.length || document.addEventListener("DOMContentLoaded", ()=>{
        for (const e of Gi)
            e()
    }
    ),
    Gi.push(a)) : a()
}
  , Ut = ()=>document.documentElement.dir === "rtl"
  , zt = a=>{
    Ju(()=>{
        const e = Lo();
        if (e) {
            const r = a.NAME
              , l = e.fn[r];
            e.fn[r] = a.jQueryInterface,
            e.fn[r].Constructor = a,
            e.fn[r].noConflict = ()=>(e.fn[r] = l,
            a.jQueryInterface)
        }
    }
    )
}
  , he = a=>{
    typeof a == "function" && a()
}
  , $o = (a,e,r=!0)=>{
    if (!r) {
        he(a);
        return
    }
    const l = 5
      , h = Qu(e) + l;
    let _ = !1;
    const E = ({target: C})=>{
        C === e && (_ = !0,
        e.removeEventListener(fr, E),
        he(a))
    }
    ;
    e.addEventListener(fr, E),
    setTimeout(()=>{
        _ || Oo(e)
    }
    , h)
}
  , Or = (a,e,r,l)=>{
    const h = a.length;
    let _ = a.indexOf(e);
    return _ === -1 ? !r && l ? a[h - 1] : a[0] : (_ += r ? 1 : -1,
    l && (_ = (_ + h) % h),
    a[Math.max(0, Math.min(_, h - 1))])
}
  , Zu = /[^.]*(?=\..*)\.|.*/
  , tc = /\..*/
  , ec = /::\d+$/
  , Xi = {};
let Ss = 1;
const Io = {
    mouseenter: "mouseover",
    mouseleave: "mouseout"
}
  , nc = new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
function ko(a, e) {
    return e && `${e}::${Ss++}` || a.uidEvent || Ss++
}
function Po(a) {
    const e = ko(a);
    return a.uidEvent = e,
    Xi[e] = Xi[e] || {},
    Xi[e]
}
function ic(a, e) {
    return function r(l) {
        return Dr(l, {
            delegateTarget: a
        }),
        r.oneOff && L.off(a, l.type, e),
        e.apply(a, [l])
    }
}
function rc(a, e, r) {
    return function l(h) {
        const _ = a.querySelectorAll(e);
        for (let {target: E} = h; E && E !== this; E = E.parentNode)
            for (const C of _)
                if (C === E)
                    return Dr(h, {
                        delegateTarget: E
                    }),
                    l.oneOff && L.off(a, h.type, e, r),
                    r.apply(E, [h])
    }
}
function Mo(a, e, r=null) {
    return Object.values(a).find(l=>l.callable === e && l.delegationSelector === r)
}
function Ro(a, e, r) {
    const l = typeof e == "string"
      , h = l ? r : e || r;
    let _ = Ho(a);
    return nc.has(_) || (_ = a),
    [l, h, _]
}
function xs(a, e, r, l, h) {
    if (typeof e != "string" || !a)
        return;
    let[_,E,C] = Ro(e, r, l);
    e in Io && (E = (j=>function(k) {
        if (!k.relatedTarget || k.relatedTarget !== k.delegateTarget && !k.delegateTarget.contains(k.relatedTarget))
            return j.call(this, k)
    }
    )(E));
    const D = Po(a)
      , M = D[C] || (D[C] = {})
      , $ = Mo(M, E, _ ? r : null);
    if ($) {
        $.oneOff = $.oneOff && h;
        return
    }
    const Y = ko(E, e.replace(Zu, ""))
      , Q = _ ? rc(a, r, E) : ic(a, E);
    Q.delegationSelector = _ ? r : null,
    Q.callable = E,
    Q.oneOff = h,
    Q.uidEvent = Y,
    M[Y] = Q,
    a.addEventListener(C, Q, _)
}
function dr(a, e, r, l, h) {
    const _ = Mo(e[r], l, h);
    _ && (a.removeEventListener(r, _, !!h),
    delete e[r][_.uidEvent])
}
function sc(a, e, r, l) {
    const h = e[r] || {};
    for (const _ of Object.keys(h))
        if (_.includes(l)) {
            const E = h[_];
            dr(a, e, r, E.callable, E.delegationSelector)
        }
}
function Ho(a) {
    return a = a.replace(tc, ""),
    Io[a] || a
}
const L = {
    on(a, e, r, l) {
        xs(a, e, r, l, !1)
    },
    one(a, e, r, l) {
        xs(a, e, r, l, !0)
    },
    off(a, e, r, l) {
        if (typeof e != "string" || !a)
            return;
        const [h,_,E] = Ro(e, r, l)
          , C = E !== e
          , D = Po(a)
          , M = D[E] || {}
          , $ = e.startsWith(".");
        if (typeof _ < "u") {
            if (!Object.keys(M).length)
                return;
            dr(a, D, E, _, h ? r : null);
            return
        }
        if ($)
            for (const Y of Object.keys(D))
                sc(a, D, Y, e.slice(1));
        for (const Y of Object.keys(M)) {
            const Q = Y.replace(ec, "");
            if (!C || e.includes(Q)) {
                const U = M[Y];
                dr(a, D, E, U.callable, U.delegationSelector)
            }
        }
    },
    trigger(a, e, r) {
        if (typeof e != "string" || !a)
            return null;
        const l = Lo()
          , h = Ho(e)
          , _ = e !== h;
        let E = null
          , C = !0
          , D = !0
          , M = !1;
        _ && l && (E = l.Event(e, r),
        l(a).trigger(E),
        C = !E.isPropagationStopped(),
        D = !E.isImmediatePropagationStopped(),
        M = E.isDefaultPrevented());
        let $ = new Event(e,{
            bubbles: C,
            cancelable: !0
        });
        return $ = Dr($, r),
        M && $.preventDefault(),
        D && a.dispatchEvent($),
        $.defaultPrevented && E && E.preventDefault(),
        $
    }
};
function Dr(a, e) {
    for (const [r,l] of Object.entries(e || {}))
        try {
            a[r] = l
        } catch {
            Object.defineProperty(a, r, {
                configurable: !0,
                get() {
                    return l
                }
            })
        }
    return a
}
const Ae = new Map
  , Qi = {
    set(a, e, r) {
        Ae.has(a) || Ae.set(a, new Map);
        const l = Ae.get(a);
        if (!l.has(e) && l.size !== 0) {
            console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(l.keys())[0]}.`);
            return
        }
        l.set(e, r)
    },
    get(a, e) {
        return Ae.has(a) && Ae.get(a).get(e) || null
    },
    remove(a, e) {
        if (!Ae.has(a))
            return;
        const r = Ae.get(a);
        r.delete(e),
        r.size === 0 && Ae.delete(a)
    }
};
function Os(a) {
    if (a === "true")
        return !0;
    if (a === "false")
        return !1;
    if (a === Number(a).toString())
        return Number(a);
    if (a === "" || a === "null")
        return null;
    if (typeof a != "string")
        return a;
    try {
        return JSON.parse(decodeURIComponent(a))
    } catch {
        return a
    }
}
function Ji(a) {
    return a.replace(/[A-Z]/g, e=>`-${e.toLowerCase()}`)
}
const me = {
    setDataAttribute(a, e, r) {
        a.setAttribute(`data-bs-${Ji(e)}`, r)
    },
    removeDataAttribute(a, e) {
        a.removeAttribute(`data-bs-${Ji(e)}`)
    },
    getDataAttributes(a) {
        if (!a)
            return {};
        const e = {}
          , r = Object.keys(a.dataset).filter(l=>l.startsWith("bs") && !l.startsWith("bsConfig"));
        for (const l of r) {
            let h = l.replace(/^bs/, "");
            h = h.charAt(0).toLowerCase() + h.slice(1, h.length),
            e[h] = Os(a.dataset[l])
        }
        return e
    },
    getDataAttribute(a, e) {
        return Os(a.getAttribute(`data-bs-${Ji(e)}`))
    }
};
class Vn {
    static get Default() {
        return {}
    }
    static get DefaultType() {
        return {}
    }
    static get NAME() {
        throw new Error('You have to implement the static method "NAME", for each component!')
    }
    _getConfig(e) {
        return e = this._mergeConfigObj(e),
        e = this._configAfterMerge(e),
        this._typeCheckConfig(e),
        e
    }
    _configAfterMerge(e) {
        return e
    }
    _mergeConfigObj(e, r) {
        const l = ge(r) ? me.getDataAttribute(r, "config") : {};
        return {
            ...this.constructor.Default,
            ...typeof l == "object" ? l : {},
            ...ge(r) ? me.getDataAttributes(r) : {},
            ...typeof e == "object" ? e : {}
        }
    }
    _typeCheckConfig(e, r=this.constructor.DefaultType) {
        for (const l of Object.keys(r)) {
            const h = r[l]
              , _ = e[l]
              , E = ge(_) ? "element" : Gu(_);
            if (!new RegExp(h).test(E))
                throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${l}" provided type "${E}" but expected type "${h}".`)
        }
    }
}
const oc = "5.2.3";
class ee extends Vn {
    constructor(e, r) {
        super(),
        e = we(e),
        e && (this._element = e,
        this._config = this._getConfig(r),
        Qi.set(this._element, this.constructor.DATA_KEY, this))
    }
    dispose() {
        Qi.remove(this._element, this.constructor.DATA_KEY),
        L.off(this._element, this.constructor.EVENT_KEY);
        for (const e of Object.getOwnPropertyNames(this))
            this[e] = null
    }
    _queueCallback(e, r, l=!0) {
        $o(e, r, l)
    }
    _getConfig(e) {
        return e = this._mergeConfigObj(e, this._element),
        e = this._configAfterMerge(e),
        this._typeCheckConfig(e),
        e
    }
    static getInstance(e) {
        return Qi.get(we(e), this.DATA_KEY)
    }
    static getOrCreateInstance(e, r={}) {
        return this.getInstance(e) || new this(e,typeof r == "object" ? r : null)
    }
    static get VERSION() {
        return oc
    }
    static get DATA_KEY() {
        return `bs.${this.NAME}`
    }
    static get EVENT_KEY() {
        return `.${this.DATA_KEY}`
    }
    static eventName(e) {
        return `${e}${this.EVENT_KEY}`
    }
}
const _i = (a,e="hide")=>{
    const r = `click.dismiss${a.EVENT_KEY}`
      , l = a.NAME;
    L.on(document, r, `[data-bs-dismiss="${l}"]`, function(h) {
        if (["A", "AREA"].includes(this.tagName) && h.preventDefault(),
        Ce(this))
            return;
        const _ = pe(this) || this.closest(`.${l}`);
        a.getOrCreateInstance(_)[e]()
    })
}
  , ac = "alert"
  , uc = "bs.alert"
  , jo = `.${uc}`
  , cc = `close${jo}`
  , lc = `closed${jo}`
  , fc = "fade"
  , dc = "show";
class yi extends ee {
    static get NAME() {
        return ac
    }
    close() {
        if (L.trigger(this._element, cc).defaultPrevented)
            return;
        this._element.classList.remove(dc);
        const r = this._element.classList.contains(fc);
        this._queueCallback(()=>this._destroyElement(), this._element, r)
    }
    _destroyElement() {
        this._element.remove(),
        L.trigger(this._element, lc),
        this.dispose()
    }
    static jQueryInterface(e) {
        return this.each(function() {
            const r = yi.getOrCreateInstance(this);
            if (typeof e == "string") {
                if (r[e] === void 0 || e.startsWith("_") || e === "constructor")
                    throw new TypeError(`No method named "${e}"`);
                r[e](this)
            }
        })
    }
}
_i(yi, "close");
zt(yi);
const hc = "button"
  , pc = "bs.button"
  , gc = `.${pc}`
  , mc = ".data-api"
  , vc = "active"
  , Ds = '[data-bs-toggle="button"]'
  , _c = `click${gc}${mc}`;
class bi extends ee {
    static get NAME() {
        return hc
    }
    toggle() {
        this._element.setAttribute("aria-pressed", this._element.classList.toggle(vc))
    }
    static jQueryInterface(e) {
        return this.each(function() {
            const r = bi.getOrCreateInstance(this);
            e === "toggle" && r[e]()
        })
    }
}
L.on(document, _c, Ds, a=>{
    a.preventDefault();
    const e = a.target.closest(Ds);
    bi.getOrCreateInstance(e).toggle()
}
);
zt(bi);
const J = {
    find(a, e=document.documentElement) {
        return [].concat(...Element.prototype.querySelectorAll.call(e, a))
    },
    findOne(a, e=document.documentElement) {
        return Element.prototype.querySelector.call(e, a)
    },
    children(a, e) {
        return [].concat(...a.children).filter(r=>r.matches(e))
    },
    parents(a, e) {
        const r = [];
        let l = a.parentNode.closest(e);
        for (; l; )
            r.push(l),
            l = l.parentNode.closest(e);
        return r
    },
    prev(a, e) {
        let r = a.previousElementSibling;
        for (; r; ) {
            if (r.matches(e))
                return [r];
            r = r.previousElementSibling
        }
        return []
    },
    next(a, e) {
        let r = a.nextElementSibling;
        for (; r; ) {
            if (r.matches(e))
                return [r];
            r = r.nextElementSibling
        }
        return []
    },
    focusableChildren(a) {
        const e = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map(r=>`${r}:not([tabindex^="-"])`).join(",");
        return this.find(e, a).filter(r=>!Ce(r) && yn(r))
    }
}
  , yc = "swipe"
  , bn = ".bs.swipe"
  , bc = `touchstart${bn}`
  , Ec = `touchmove${bn}`
  , Tc = `touchend${bn}`
  , Ac = `pointerdown${bn}`
  , wc = `pointerup${bn}`
  , Cc = "touch"
  , Nc = "pen"
  , Sc = "pointer-event"
  , xc = 40
  , Oc = {
    endCallback: null,
    leftCallback: null,
    rightCallback: null
}
  , Dc = {
    endCallback: "(function|null)",
    leftCallback: "(function|null)",
    rightCallback: "(function|null)"
};
class hi extends Vn {
    constructor(e, r) {
        super(),
        this._element = e,
        !(!e || !hi.isSupported()) && (this._config = this._getConfig(r),
        this._deltaX = 0,
        this._supportPointerEvents = !!window.PointerEvent,
        this._initEvents())
    }
    static get Default() {
        return Oc
    }
    static get DefaultType() {
        return Dc
    }
    static get NAME() {
        return yc
    }
    dispose() {
        L.off(this._element, bn)
    }
    _start(e) {
        if (!this._supportPointerEvents) {
            this._deltaX = e.touches[0].clientX;
            return
        }
        this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX)
    }
    _end(e) {
        this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX - this._deltaX),
        this._handleSwipe(),
        he(this._config.endCallback)
    }
    _move(e) {
        this._deltaX = e.touches && e.touches.length > 1 ? 0 : e.touches[0].clientX - this._deltaX
    }
    _handleSwipe() {
        const e = Math.abs(this._deltaX);
        if (e <= xc)
            return;
        const r = e / this._deltaX;
        this._deltaX = 0,
        r && he(r > 0 ? this._config.rightCallback : this._config.leftCallback)
    }
    _initEvents() {
        this._supportPointerEvents ? (L.on(this._element, Ac, e=>this._start(e)),
        L.on(this._element, wc, e=>this._end(e)),
        this._element.classList.add(Sc)) : (L.on(this._element, bc, e=>this._start(e)),
        L.on(this._element, Ec, e=>this._move(e)),
        L.on(this._element, Tc, e=>this._end(e)))
    }
    _eventIsPointerPenTouch(e) {
        return this._supportPointerEvents && (e.pointerType === Nc || e.pointerType === Cc)
    }
    static isSupported() {
        return "ontouchstart"in document.documentElement || navigator.maxTouchPoints > 0
    }
}
const Lc = "carousel"
  , $c = "bs.carousel"
  , xe = `.${$c}`
  , Vo = ".data-api"
  , Ic = "ArrowLeft"
  , kc = "ArrowRight"
  , Pc = 500
  , In = "next"
  , rn = "prev"
  , an = "left"
  , ci = "right"
  , Mc = `slide${xe}`
  , Zi = `slid${xe}`
  , Rc = `keydown${xe}`
  , Hc = `mouseenter${xe}`
  , jc = `mouseleave${xe}`
  , Vc = `dragstart${xe}`
  , qc = `load${xe}${Vo}`
  , Wc = `click${xe}${Vo}`
  , qo = "carousel"
  , ni = "active"
  , Bc = "slide"
  , Fc = "carousel-item-end"
  , Kc = "carousel-item-start"
  , Uc = "carousel-item-next"
  , Yc = "carousel-item-prev"
  , Wo = ".active"
  , Bo = ".carousel-item"
  , zc = Wo + Bo
  , Gc = ".carousel-item img"
  , Xc = ".carousel-indicators"
  , Qc = "[data-bs-slide], [data-bs-slide-to]"
  , Jc = '[data-bs-ride="carousel"]'
  , Zc = {
    [Ic]: ci,
    [kc]: an
}
  , tl = {
    interval: 5e3,
    keyboard: !0,
    pause: "hover",
    ride: !1,
    touch: !0,
    wrap: !0
}
  , el = {
    interval: "(number|boolean)",
    keyboard: "boolean",
    pause: "(string|boolean)",
    ride: "(boolean|string)",
    touch: "boolean",
    wrap: "boolean"
};
class qn extends ee {
    constructor(e, r) {
        super(e, r),
        this._interval = null,
        this._activeElement = null,
        this._isSliding = !1,
        this.touchTimeout = null,
        this._swipeHelper = null,
        this._indicatorsElement = J.findOne(Xc, this._element),
        this._addEventListeners(),
        this._config.ride === qo && this.cycle()
    }
    static get Default() {
        return tl
    }
    static get DefaultType() {
        return el
    }
    static get NAME() {
        return Lc
    }
    next() {
        this._slide(In)
    }
    nextWhenVisible() {
        !document.hidden && yn(this._element) && this.next()
    }
    prev() {
        this._slide(rn)
    }
    pause() {
        this._isSliding && Oo(this._element),
        this._clearInterval()
    }
    cycle() {
        this._clearInterval(),
        this._updateInterval(),
        this._interval = setInterval(()=>this.nextWhenVisible(), this._config.interval)
    }
    _maybeEnableCycle() {
        if (this._config.ride) {
            if (this._isSliding) {
                L.one(this._element, Zi, ()=>this.cycle());
                return
            }
            this.cycle()
        }
    }
    to(e) {
        const r = this._getItems();
        if (e > r.length - 1 || e < 0)
            return;
        if (this._isSliding) {
            L.one(this._element, Zi, ()=>this.to(e));
            return
        }
        const l = this._getItemIndex(this._getActive());
        if (l === e)
            return;
        const h = e > l ? In : rn;
        this._slide(h, r[e])
    }
    dispose() {
        this._swipeHelper && this._swipeHelper.dispose(),
        super.dispose()
    }
    _configAfterMerge(e) {
        return e.defaultInterval = e.interval,
        e
    }
    _addEventListeners() {
        this._config.keyboard && L.on(this._element, Rc, e=>this._keydown(e)),
        this._config.pause === "hover" && (L.on(this._element, Hc, ()=>this.pause()),
        L.on(this._element, jc, ()=>this._maybeEnableCycle())),
        this._config.touch && hi.isSupported() && this._addTouchEventListeners()
    }
    _addTouchEventListeners() {
        for (const l of J.find(Gc, this._element))
            L.on(l, Vc, h=>h.preventDefault());
        const r = {
            leftCallback: ()=>this._slide(this._directionToOrder(an)),
            rightCallback: ()=>this._slide(this._directionToOrder(ci)),
            endCallback: ()=>{
                this._config.pause === "hover" && (this.pause(),
                this.touchTimeout && clearTimeout(this.touchTimeout),
                this.touchTimeout = setTimeout(()=>this._maybeEnableCycle(), Pc + this._config.interval))
            }
        };
        this._swipeHelper = new hi(this._element,r)
    }
    _keydown(e) {
        if (/input|textarea/i.test(e.target.tagName))
            return;
        const r = Zc[e.key];
        r && (e.preventDefault(),
        this._slide(this._directionToOrder(r)))
    }
    _getItemIndex(e) {
        return this._getItems().indexOf(e)
    }
    _setActiveIndicatorElement(e) {
        if (!this._indicatorsElement)
            return;
        const r = J.findOne(Wo, this._indicatorsElement);
        r.classList.remove(ni),
        r.removeAttribute("aria-current");
        const l = J.findOne(`[data-bs-slide-to="${e}"]`, this._indicatorsElement);
        l && (l.classList.add(ni),
        l.setAttribute("aria-current", "true"))
    }
    _updateInterval() {
        const e = this._activeElement || this._getActive();
        if (!e)
            return;
        const r = Number.parseInt(e.getAttribute("data-bs-interval"), 10);
        this._config.interval = r || this._config.defaultInterval
    }
    _slide(e, r=null) {
        if (this._isSliding)
            return;
        const l = this._getActive()
          , h = e === In
          , _ = r || Or(this._getItems(), l, h, this._config.wrap);
        if (_ === l)
            return;
        const E = this._getItemIndex(_)
          , C = U=>L.trigger(this._element, U, {
            relatedTarget: _,
            direction: this._orderToDirection(e),
            from: this._getItemIndex(l),
            to: E
        });
        if (C(Mc).defaultPrevented || !l || !_)
            return;
        const M = !!this._interval;
        this.pause(),
        this._isSliding = !0,
        this._setActiveIndicatorElement(E),
        this._activeElement = _;
        const $ = h ? Kc : Fc
          , Y = h ? Uc : Yc;
        _.classList.add(Y),
        jn(_),
        l.classList.add($),
        _.classList.add($);
        const Q = ()=>{
            _.classList.remove($, Y),
            _.classList.add(ni),
            l.classList.remove(ni, Y, $),
            this._isSliding = !1,
            C(Zi)
        }
        ;
        this._queueCallback(Q, l, this._isAnimated()),
        M && this.cycle()
    }
    _isAnimated() {
        return this._element.classList.contains(Bc)
    }
    _getActive() {
        return J.findOne(zc, this._element)
    }
    _getItems() {
        return J.find(Bo, this._element)
    }
    _clearInterval() {
        this._interval && (clearInterval(this._interval),
        this._interval = null)
    }
    _directionToOrder(e) {
        return Ut() ? e === an ? rn : In : e === an ? In : rn
    }
    _orderToDirection(e) {
        return Ut() ? e === rn ? an : ci : e === rn ? ci : an
    }
    static jQueryInterface(e) {
        return this.each(function() {
            const r = qn.getOrCreateInstance(this, e);
            if (typeof e == "number") {
                r.to(e);
                return
            }
            if (typeof e == "string") {
                if (r[e] === void 0 || e.startsWith("_") || e === "constructor")
                    throw new TypeError(`No method named "${e}"`);
                r[e]()
            }
        })
    }
}
L.on(document, Wc, Qc, function(a) {
    const e = pe(this);
    if (!e || !e.classList.contains(qo))
        return;
    a.preventDefault();
    const r = qn.getOrCreateInstance(e)
      , l = this.getAttribute("data-bs-slide-to");
    if (l) {
        r.to(l),
        r._maybeEnableCycle();
        return
    }
    if (me.getDataAttribute(this, "slide") === "next") {
        r.next(),
        r._maybeEnableCycle();
        return
    }
    r.prev(),
    r._maybeEnableCycle()
});
L.on(window, qc, ()=>{
    const a = J.find(Jc);
    for (const e of a)
        qn.getOrCreateInstance(e)
}
);
zt(qn);
const nl = "collapse"
  , il = "bs.collapse"
  , Wn = `.${il}`
  , rl = ".data-api"
  , sl = `show${Wn}`
  , ol = `shown${Wn}`
  , al = `hide${Wn}`
  , ul = `hidden${Wn}`
  , cl = `click${Wn}${rl}`
  , tr = "show"
  , cn = "collapse"
  , ii = "collapsing"
  , ll = "collapsed"
  , fl = `:scope .${cn} .${cn}`
  , dl = "collapse-horizontal"
  , hl = "width"
  , pl = "height"
  , gl = ".collapse.show, .collapse.collapsing"
  , hr = '[data-bs-toggle="collapse"]'
  , ml = {
    parent: null,
    toggle: !0
}
  , vl = {
    parent: "(null|element)",
    toggle: "boolean"
};
class Rn extends ee {
    constructor(e, r) {
        super(e, r),
        this._isTransitioning = !1,
        this._triggerArray = [];
        const l = J.find(hr);
        for (const h of l) {
            const _ = xo(h)
              , E = J.find(_).filter(C=>C === this._element);
            _ !== null && E.length && this._triggerArray.push(h)
        }
        this._initializeChildren(),
        this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()),
        this._config.toggle && this.toggle()
    }
    static get Default() {
        return ml
    }
    static get DefaultType() {
        return vl
    }
    static get NAME() {
        return nl
    }
    toggle() {
        this._isShown() ? this.hide() : this.show()
    }
    show() {
        if (this._isTransitioning || this._isShown())
            return;
        let e = [];
        if (this._config.parent && (e = this._getFirstLevelChildren(gl).filter(C=>C !== this._element).map(C=>Rn.getOrCreateInstance(C, {
            toggle: !1
        }))),
        e.length && e[0]._isTransitioning || L.trigger(this._element, sl).defaultPrevented)
            return;
        for (const C of e)
            C.hide();
        const l = this._getDimension();
        this._element.classList.remove(cn),
        this._element.classList.add(ii),
        this._element.style[l] = 0,
        this._addAriaAndCollapsedClass(this._triggerArray, !0),
        this._isTransitioning = !0;
        const h = ()=>{
            this._isTransitioning = !1,
            this._element.classList.remove(ii),
            this._element.classList.add(cn, tr),
            this._element.style[l] = "",
            L.trigger(this._element, ol)
        }
          , E = `scroll${l[0].toUpperCase() + l.slice(1)}`;
        this._queueCallback(h, this._element, !0),
        this._element.style[l] = `${this._element[E]}px`
    }
    hide() {
        if (this._isTransitioning || !this._isShown() || L.trigger(this._element, al).defaultPrevented)
            return;
        const r = this._getDimension();
        this._element.style[r] = `${this._element.getBoundingClientRect()[r]}px`,
        jn(this._element),
        this._element.classList.add(ii),
        this._element.classList.remove(cn, tr);
        for (const h of this._triggerArray) {
            const _ = pe(h);
            _ && !this._isShown(_) && this._addAriaAndCollapsedClass([h], !1)
        }
        this._isTransitioning = !0;
        const l = ()=>{
            this._isTransitioning = !1,
            this._element.classList.remove(ii),
            this._element.classList.add(cn),
            L.trigger(this._element, ul)
        }
        ;
        this._element.style[r] = "",
        this._queueCallback(l, this._element, !0)
    }
    _isShown(e=this._element) {
        return e.classList.contains(tr)
    }
    _configAfterMerge(e) {
        return e.toggle = !!e.toggle,
        e.parent = we(e.parent),
        e
    }
    _getDimension() {
        return this._element.classList.contains(dl) ? hl : pl
    }
    _initializeChildren() {
        if (!this._config.parent)
            return;
        const e = this._getFirstLevelChildren(hr);
        for (const r of e) {
            const l = pe(r);
            l && this._addAriaAndCollapsedClass([r], this._isShown(l))
        }
    }
    _getFirstLevelChildren(e) {
        const r = J.find(fl, this._config.parent);
        return J.find(e, this._config.parent).filter(l=>!r.includes(l))
    }
    _addAriaAndCollapsedClass(e, r) {
        if (e.length)
            for (const l of e)
                l.classList.toggle(ll, !r),
                l.setAttribute("aria-expanded", r)
    }
    static jQueryInterface(e) {
        const r = {};
        return typeof e == "string" && /show|hide/.test(e) && (r.toggle = !1),
        this.each(function() {
            const l = Rn.getOrCreateInstance(this, r);
            if (typeof e == "string") {
                if (typeof l[e] > "u")
                    throw new TypeError(`No method named "${e}"`);
                l[e]()
            }
        })
    }
}
L.on(document, cl, hr, function(a) {
    (a.target.tagName === "A" || a.delegateTarget && a.delegateTarget.tagName === "A") && a.preventDefault();
    const e = xo(this)
      , r = J.find(e);
    for (const l of r)
        Rn.getOrCreateInstance(l, {
            toggle: !1
        }).toggle()
});
zt(Rn);
const Ls = "dropdown"
  , _l = "bs.dropdown"
  , Ge = `.${_l}`
  , Lr = ".data-api"
  , yl = "Escape"
  , $s = "Tab"
  , bl = "ArrowUp"
  , Is = "ArrowDown"
  , El = 2
  , Tl = `hide${Ge}`
  , Al = `hidden${Ge}`
  , wl = `show${Ge}`
  , Cl = `shown${Ge}`
  , Fo = `click${Ge}${Lr}`
  , Ko = `keydown${Ge}${Lr}`
  , Nl = `keyup${Ge}${Lr}`
  , un = "show"
  , Sl = "dropup"
  , xl = "dropend"
  , Ol = "dropstart"
  , Dl = "dropup-center"
  , Ll = "dropdown-center"
  , Fe = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)'
  , $l = `${Fe}.${un}`
  , li = ".dropdown-menu"
  , Il = ".navbar"
  , kl = ".navbar-nav"
  , Pl = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)"
  , Ml = Ut() ? "top-end" : "top-start"
  , Rl = Ut() ? "top-start" : "top-end"
  , Hl = Ut() ? "bottom-end" : "bottom-start"
  , jl = Ut() ? "bottom-start" : "bottom-end"
  , Vl = Ut() ? "left-start" : "right-start"
  , ql = Ut() ? "right-start" : "left-start"
  , Wl = "top"
  , Bl = "bottom"
  , Fl = {
    autoClose: !0,
    boundary: "clippingParents",
    display: "dynamic",
    offset: [0, 2],
    popperConfig: null,
    reference: "toggle"
}
  , Kl = {
    autoClose: "(boolean|string)",
    boundary: "(string|element)",
    display: "string",
    offset: "(array|string|function)",
    popperConfig: "(null|object|function)",
    reference: "(string|element|object)"
};
class oe extends ee {
    constructor(e, r) {
        super(e, r),
        this._popper = null,
        this._parent = this._element.parentNode,
        this._menu = J.next(this._element, li)[0] || J.prev(this._element, li)[0] || J.findOne(li, this._parent),
        this._inNavbar = this._detectNavbar()
    }
    static get Default() {
        return Fl
    }
    static get DefaultType() {
        return Kl
    }
    static get NAME() {
        return Ls
    }
    toggle() {
        return this._isShown() ? this.hide() : this.show()
    }
    show() {
        if (Ce(this._element) || this._isShown())
            return;
        const e = {
            relatedTarget: this._element
        };
        if (!L.trigger(this._element, wl, e).defaultPrevented) {
            if (this._createPopper(),
            "ontouchstart"in document.documentElement && !this._parent.closest(kl))
                for (const l of [].concat(...document.body.children))
                    L.on(l, "mouseover", di);
            this._element.focus(),
            this._element.setAttribute("aria-expanded", !0),
            this._menu.classList.add(un),
            this._element.classList.add(un),
            L.trigger(this._element, Cl, e)
        }
    }
    hide() {
        if (Ce(this._element) || !this._isShown())
            return;
        const e = {
            relatedTarget: this._element
        };
        this._completeHide(e)
    }
    dispose() {
        this._popper && this._popper.destroy(),
        super.dispose()
    }
    update() {
        this._inNavbar = this._detectNavbar(),
        this._popper && this._popper.update()
    }
    _completeHide(e) {
        if (!L.trigger(this._element, Tl, e).defaultPrevented) {
            if ("ontouchstart"in document.documentElement)
                for (const l of [].concat(...document.body.children))
                    L.off(l, "mouseover", di);
            this._popper && this._popper.destroy(),
            this._menu.classList.remove(un),
            this._element.classList.remove(un),
            this._element.setAttribute("aria-expanded", "false"),
            me.removeDataAttribute(this._menu, "popper"),
            L.trigger(this._element, Al, e)
        }
    }
    _getConfig(e) {
        if (e = super._getConfig(e),
        typeof e.reference == "object" && !ge(e.reference) && typeof e.reference.getBoundingClientRect != "function")
            throw new TypeError(`${Ls.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
        return e
    }
    _createPopper() {
        if (typeof No > "u")
            throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
        let e = this._element;
        this._config.reference === "parent" ? e = this._parent : ge(this._config.reference) ? e = we(this._config.reference) : typeof this._config.reference == "object" && (e = this._config.reference);
        const r = this._getPopperConfig();
        this._popper = xr(e, this._menu, r)
    }
    _isShown() {
        return this._menu.classList.contains(un)
    }
    _getPlacement() {
        const e = this._parent;
        if (e.classList.contains(xl))
            return Vl;
        if (e.classList.contains(Ol))
            return ql;
        if (e.classList.contains(Dl))
            return Wl;
        if (e.classList.contains(Ll))
            return Bl;
        const r = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
        return e.classList.contains(Sl) ? r ? Rl : Ml : r ? jl : Hl
    }
    _detectNavbar() {
        return this._element.closest(Il) !== null
    }
    _getOffset() {
        const {offset: e} = this._config;
        return typeof e == "string" ? e.split(",").map(r=>Number.parseInt(r, 10)) : typeof e == "function" ? r=>e(r, this._element) : e
    }
    _getPopperConfig() {
        const e = {
            placement: this._getPlacement(),
            modifiers: [{
                name: "preventOverflow",
                options: {
                    boundary: this._config.boundary
                }
            }, {
                name: "offset",
                options: {
                    offset: this._getOffset()
                }
            }]
        };
        return (this._inNavbar || this._config.display === "static") && (me.setDataAttribute(this._menu, "popper", "static"),
        e.modifiers = [{
            name: "applyStyles",
            enabled: !1
        }]),
        {
            ...e,
            ...typeof this._config.popperConfig == "function" ? this._config.popperConfig(e) : this._config.popperConfig
        }
    }
    _selectMenuItem({key: e, target: r}) {
        const l = J.find(Pl, this._menu).filter(h=>yn(h));
        l.length && Or(l, r, e === Is, !l.includes(r)).focus()
    }
    static jQueryInterface(e) {
        return this.each(function() {
            const r = oe.getOrCreateInstance(this, e);
            if (typeof e == "string") {
                if (typeof r[e] > "u")
                    throw new TypeError(`No method named "${e}"`);
                r[e]()
            }
        })
    }
    static clearMenus(e) {
        if (e.button === El || e.type === "keyup" && e.key !== $s)
            return;
        const r = J.find($l);
        for (const l of r) {
            const h = oe.getInstance(l);
            if (!h || h._config.autoClose === !1)
                continue;
            const _ = e.composedPath()
              , E = _.includes(h._menu);
            if (_.includes(h._element) || h._config.autoClose === "inside" && !E || h._config.autoClose === "outside" && E || h._menu.contains(e.target) && (e.type === "keyup" && e.key === $s || /input|select|option|textarea|form/i.test(e.target.tagName)))
                continue;
            const C = {
                relatedTarget: h._element
            };
            e.type === "click" && (C.clickEvent = e),
            h._completeHide(C)
        }
    }
    static dataApiKeydownHandler(e) {
        const r = /input|textarea/i.test(e.target.tagName)
          , l = e.key === yl
          , h = [bl, Is].includes(e.key);
        if (!h && !l || r && !l)
            return;
        e.preventDefault();
        const _ = this.matches(Fe) ? this : J.prev(this, Fe)[0] || J.next(this, Fe)[0] || J.findOne(Fe, e.delegateTarget.parentNode)
          , E = oe.getOrCreateInstance(_);
        if (h) {
            e.stopPropagation(),
            E.show(),
            E._selectMenuItem(e);
            return
        }
        E._isShown() && (e.stopPropagation(),
        E.hide(),
        _.focus())
    }
}
L.on(document, Ko, Fe, oe.dataApiKeydownHandler);
L.on(document, Ko, li, oe.dataApiKeydownHandler);
L.on(document, Fo, oe.clearMenus);
L.on(document, Nl, oe.clearMenus);
L.on(document, Fo, Fe, function(a) {
    a.preventDefault(),
    oe.getOrCreateInstance(this).toggle()
});
zt(oe);
const ks = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"
  , Ps = ".sticky-top"
  , ri = "padding-right"
  , Ms = "margin-right";
class pr {
    constructor() {
        this._element = document.body
    }
    getWidth() {
        const e = document.documentElement.clientWidth;
        return Math.abs(window.innerWidth - e)
    }
    hide() {
        const e = this.getWidth();
        this._disableOverFlow(),
        this._setElementAttributes(this._element, ri, r=>r + e),
        this._setElementAttributes(ks, ri, r=>r + e),
        this._setElementAttributes(Ps, Ms, r=>r - e)
    }
    reset() {
        this._resetElementAttributes(this._element, "overflow"),
        this._resetElementAttributes(this._element, ri),
        this._resetElementAttributes(ks, ri),
        this._resetElementAttributes(Ps, Ms)
    }
    isOverflowing() {
        return this.getWidth() > 0
    }
    _disableOverFlow() {
        this._saveInitialAttribute(this._element, "overflow"),
        this._element.style.overflow = "hidden"
    }
    _setElementAttributes(e, r, l) {
        const h = this.getWidth()
          , _ = E=>{
            if (E !== this._element && window.innerWidth > E.clientWidth + h)
                return;
            this._saveInitialAttribute(E, r);
            const C = window.getComputedStyle(E).getPropertyValue(r);
            E.style.setProperty(r, `${l(Number.parseFloat(C))}px`)
        }
        ;
        this._applyManipulationCallback(e, _)
    }
    _saveInitialAttribute(e, r) {
        const l = e.style.getPropertyValue(r);
        l && me.setDataAttribute(e, r, l)
    }
    _resetElementAttributes(e, r) {
        const l = h=>{
            const _ = me.getDataAttribute(h, r);
            if (_ === null) {
                h.style.removeProperty(r);
                return
            }
            me.removeDataAttribute(h, r),
            h.style.setProperty(r, _)
        }
        ;
        this._applyManipulationCallback(e, l)
    }
    _applyManipulationCallback(e, r) {
        if (ge(e)) {
            r(e);
            return
        }
        for (const l of J.find(e, this._element))
            r(l)
    }
}
const Uo = "backdrop"
  , Ul = "fade"
  , Rs = "show"
  , Hs = `mousedown.bs.${Uo}`
  , Yl = {
    className: "modal-backdrop",
    clickCallback: null,
    isAnimated: !1,
    isVisible: !0,
    rootElement: "body"
}
  , zl = {
    className: "string",
    clickCallback: "(function|null)",
    isAnimated: "boolean",
    isVisible: "boolean",
    rootElement: "(element|string)"
};
class Yo extends Vn {
    constructor(e) {
        super(),
        this._config = this._getConfig(e),
        this._isAppended = !1,
        this._element = null
    }
    static get Default() {
        return Yl
    }
    static get DefaultType() {
        return zl
    }
    static get NAME() {
        return Uo
    }
    show(e) {
        if (!this._config.isVisible) {
            he(e);
            return
        }
        this._append();
        const r = this._getElement();
        this._config.isAnimated && jn(r),
        r.classList.add(Rs),
        this._emulateAnimation(()=>{
            he(e)
        }
        )
    }
    hide(e) {
        if (!this._config.isVisible) {
            he(e);
            return
        }
        this._getElement().classList.remove(Rs),
        this._emulateAnimation(()=>{
            this.dispose(),
            he(e)
        }
        )
    }
    dispose() {
        this._isAppended && (L.off(this._element, Hs),
        this._element.remove(),
        this._isAppended = !1)
    }
    _getElement() {
        if (!this._element) {
            const e = document.createElement("div");
            e.className = this._config.className,
            this._config.isAnimated && e.classList.add(Ul),
            this._element = e
        }
        return this._element
    }
    _configAfterMerge(e) {
        return e.rootElement = we(e.rootElement),
        e
    }
    _append() {
        if (this._isAppended)
            return;
        const e = this._getElement();
        this._config.rootElement.append(e),
        L.on(e, Hs, ()=>{
            he(this._config.clickCallback)
        }
        ),
        this._isAppended = !0
    }
    _emulateAnimation(e) {
        $o(e, this._getElement(), this._config.isAnimated)
    }
}
const Gl = "focustrap"
  , Xl = "bs.focustrap"
  , pi = `.${Xl}`
  , Ql = `focusin${pi}`
  , Jl = `keydown.tab${pi}`
  , Zl = "Tab"
  , tf = "forward"
  , js = "backward"
  , ef = {
    autofocus: !0,
    trapElement: null
}
  , nf = {
    autofocus: "boolean",
    trapElement: "element"
};
class zo extends Vn {
    constructor(e) {
        super(),
        this._config = this._getConfig(e),
        this._isActive = !1,
        this._lastTabNavDirection = null
    }
    static get Default() {
        return ef
    }
    static get DefaultType() {
        return nf
    }
    static get NAME() {
        return Gl
    }
    activate() {
        this._isActive || (this._config.autofocus && this._config.trapElement.focus(),
        L.off(document, pi),
        L.on(document, Ql, e=>this._handleFocusin(e)),
        L.on(document, Jl, e=>this._handleKeydown(e)),
        this._isActive = !0)
    }
    deactivate() {
        this._isActive && (this._isActive = !1,
        L.off(document, pi))
    }
    _handleFocusin(e) {
        const {trapElement: r} = this._config;
        if (e.target === document || e.target === r || r.contains(e.target))
            return;
        const l = J.focusableChildren(r);
        l.length === 0 ? r.focus() : this._lastTabNavDirection === js ? l[l.length - 1].focus() : l[0].focus()
    }
    _handleKeydown(e) {
        e.key === Zl && (this._lastTabNavDirection = e.shiftKey ? js : tf)
    }
}
const rf = "modal"
  , sf = "bs.modal"
  , ne = `.${sf}`
  , of = ".data-api"
  , af = "Escape"
  , uf = `hide${ne}`
  , cf = `hidePrevented${ne}`
  , Go = `hidden${ne}`
  , Xo = `show${ne}`
  , lf = `shown${ne}`
  , ff = `resize${ne}`
  , df = `click.dismiss${ne}`
  , hf = `mousedown.dismiss${ne}`
  , pf = `keydown.dismiss${ne}`
  , gf = `click${ne}${of}`
  , Vs = "modal-open"
  , mf = "fade"
  , qs = "show"
  , er = "modal-static"
  , vf = ".modal.show"
  , _f = ".modal-dialog"
  , yf = ".modal-body"
  , bf = '[data-bs-toggle="modal"]'
  , Ef = {
    backdrop: !0,
    focus: !0,
    keyboard: !0
}
  , Tf = {
    backdrop: "(boolean|string)",
    focus: "boolean",
    keyboard: "boolean"
};
class mn extends ee {
    constructor(e, r) {
        super(e, r),
        this._dialog = J.findOne(_f, this._element),
        this._backdrop = this._initializeBackDrop(),
        this._focustrap = this._initializeFocusTrap(),
        this._isShown = !1,
        this._isTransitioning = !1,
        this._scrollBar = new pr,
        this._addEventListeners()
    }
    static get Default() {
        return Ef
    }
    static get DefaultType() {
        return Tf
    }
    static get NAME() {
        return rf
    }
    toggle(e) {
        return this._isShown ? this.hide() : this.show(e)
    }
    show(e) {
        this._isShown || this._isTransitioning || L.trigger(this._element, Xo, {
            relatedTarget: e
        }).defaultPrevented || (this._isShown = !0,
        this._isTransitioning = !0,
        this._scrollBar.hide(),
        document.body.classList.add(Vs),
        this._adjustDialog(),
        this._backdrop.show(()=>this._showElement(e)))
    }
    hide() {
        !this._isShown || this._isTransitioning || L.trigger(this._element, uf).defaultPrevented || (this._isShown = !1,
        this._isTransitioning = !0,
        this._focustrap.deactivate(),
        this._element.classList.remove(qs),
        this._queueCallback(()=>this._hideModal(), this._element, this._isAnimated()))
    }
    dispose() {
        for (const e of [window, this._dialog])
            L.off(e, ne);
        this._backdrop.dispose(),
        this._focustrap.deactivate(),
        super.dispose()
    }
    handleUpdate() {
        this._adjustDialog()
    }
    _initializeBackDrop() {
        return new Yo({
            isVisible: !!this._config.backdrop,
            isAnimated: this._isAnimated()
        })
    }
    _initializeFocusTrap() {
        return new zo({
            trapElement: this._element
        })
    }
    _showElement(e) {
        document.body.contains(this._element) || document.body.append(this._element),
        this._element.style.display = "block",
        this._element.removeAttribute("aria-hidden"),
        this._element.setAttribute("aria-modal", !0),
        this._element.setAttribute("role", "dialog"),
        this._element.scrollTop = 0;
        const r = J.findOne(yf, this._dialog);
        r && (r.scrollTop = 0),
        jn(this._element),
        this._element.classList.add(qs);
        const l = ()=>{
            this._config.focus && this._focustrap.activate(),
            this._isTransitioning = !1,
            L.trigger(this._element, lf, {
                relatedTarget: e
            })
        }
        ;
        this._queueCallback(l, this._dialog, this._isAnimated())
    }
    _addEventListeners() {
        L.on(this._element, pf, e=>{
            if (e.key === af) {
                if (this._config.keyboard) {
                    e.preventDefault(),
                    this.hide();
                    return
                }
                this._triggerBackdropTransition()
            }
        }
        ),
        L.on(window, ff, ()=>{
            this._isShown && !this._isTransitioning && this._adjustDialog()
        }
        ),
        L.on(this._element, hf, e=>{
            L.one(this._element, df, r=>{
                if (!(this._element !== e.target || this._element !== r.target)) {
                    if (this._config.backdrop === "static") {
                        this._triggerBackdropTransition();
                        return
                    }
                    this._config.backdrop && this.hide()
                }
            }
            )
        }
        )
    }
    _hideModal() {
        this._element.style.display = "none",
        this._element.setAttribute("aria-hidden", !0),
        this._element.removeAttribute("aria-modal"),
        this._element.removeAttribute("role"),
        this._isTransitioning = !1,
        this._backdrop.hide(()=>{
            document.body.classList.remove(Vs),
            this._resetAdjustments(),
            this._scrollBar.reset(),
            L.trigger(this._element, Go)
        }
        )
    }
    _isAnimated() {
        return this._element.classList.contains(mf)
    }
    _triggerBackdropTransition() {
        if (L.trigger(this._element, cf).defaultPrevented)
            return;
        const r = this._element.scrollHeight > document.documentElement.clientHeight
          , l = this._element.style.overflowY;
        l === "hidden" || this._element.classList.contains(er) || (r || (this._element.style.overflowY = "hidden"),
        this._element.classList.add(er),
        this._queueCallback(()=>{
            this._element.classList.remove(er),
            this._queueCallback(()=>{
                this._element.style.overflowY = l
            }
            , this._dialog)
        }
        , this._dialog),
        this._element.focus())
    }
    _adjustDialog() {
        const e = this._element.scrollHeight > document.documentElement.clientHeight
          , r = this._scrollBar.getWidth()
          , l = r > 0;
        if (l && !e) {
            const h = Ut() ? "paddingLeft" : "paddingRight";
            this._element.style[h] = `${r}px`
        }
        if (!l && e) {
            const h = Ut() ? "paddingRight" : "paddingLeft";
            this._element.style[h] = `${r}px`
        }
    }
    _resetAdjustments() {
        this._element.style.paddingLeft = "",
        this._element.style.paddingRight = ""
    }
    static jQueryInterface(e, r) {
        return this.each(function() {
            const l = mn.getOrCreateInstance(this, e);
            if (typeof e == "string") {
                if (typeof l[e] > "u")
                    throw new TypeError(`No method named "${e}"`);
                l[e](r)
            }
        })
    }
}
L.on(document, gf, bf, function(a) {
    const e = pe(this);
    ["A", "AREA"].includes(this.tagName) && a.preventDefault(),
    L.one(e, Xo, h=>{
        h.defaultPrevented || L.one(e, Go, ()=>{
            yn(this) && this.focus()
        }
        )
    }
    );
    const r = J.findOne(vf);
    r && mn.getInstance(r).hide(),
    mn.getOrCreateInstance(e).toggle(this)
});
_i(mn);
zt(mn);
const Af = "offcanvas"
  , wf = "bs.offcanvas"
  , _e = `.${wf}`
  , Qo = ".data-api"
  , Cf = `load${_e}${Qo}`
  , Nf = "Escape"
  , Ws = "show"
  , Bs = "showing"
  , Fs = "hiding"
  , Sf = "offcanvas-backdrop"
  , Jo = ".offcanvas.show"
  , xf = `show${_e}`
  , Of = `shown${_e}`
  , Df = `hide${_e}`
  , Ks = `hidePrevented${_e}`
  , Zo = `hidden${_e}`
  , Lf = `resize${_e}`
  , $f = `click${_e}${Qo}`
  , If = `keydown.dismiss${_e}`
  , kf = '[data-bs-toggle="offcanvas"]'
  , Pf = {
    backdrop: !0,
    keyboard: !0,
    scroll: !1
}
  , Mf = {
    backdrop: "(boolean|string)",
    keyboard: "boolean",
    scroll: "boolean"
};
class Ne extends ee {
    constructor(e, r) {
        super(e, r),
        this._isShown = !1,
        this._backdrop = this._initializeBackDrop(),
        this._focustrap = this._initializeFocusTrap(),
        this._addEventListeners()
    }
    static get Default() {
        return Pf
    }
    static get DefaultType() {
        return Mf
    }
    static get NAME() {
        return Af
    }
    toggle(e) {
        return this._isShown ? this.hide() : this.show(e)
    }
    show(e) {
        if (this._isShown || L.trigger(this._element, xf, {
            relatedTarget: e
        }).defaultPrevented)
            return;
        this._isShown = !0,
        this._backdrop.show(),
        this._config.scroll || new pr().hide(),
        this._element.setAttribute("aria-modal", !0),
        this._element.setAttribute("role", "dialog"),
        this._element.classList.add(Bs);
        const l = ()=>{
            (!this._config.scroll || this._config.backdrop) && this._focustrap.activate(),
            this._element.classList.add(Ws),
            this._element.classList.remove(Bs),
            L.trigger(this._element, Of, {
                relatedTarget: e
            })
        }
        ;
        this._queueCallback(l, this._element, !0)
    }
    hide() {
        if (!this._isShown || L.trigger(this._element, Df).defaultPrevented)
            return;
        this._focustrap.deactivate(),
        this._element.blur(),
        this._isShown = !1,
        this._element.classList.add(Fs),
        this._backdrop.hide();
        const r = ()=>{
            this._element.classList.remove(Ws, Fs),
            this._element.removeAttribute("aria-modal"),
            this._element.removeAttribute("role"),
            this._config.scroll || new pr().reset(),
            L.trigger(this._element, Zo)
        }
        ;
        this._queueCallback(r, this._element, !0)
    }
    dispose() {
        this._backdrop.dispose(),
        this._focustrap.deactivate(),
        super.dispose()
    }
    _initializeBackDrop() {
        const e = ()=>{
            if (this._config.backdrop === "static") {
                L.trigger(this._element, Ks);
                return
            }
            this.hide()
        }
          , r = !!this._config.backdrop;
        return new Yo({
            className: Sf,
            isVisible: r,
            isAnimated: !0,
            rootElement: this._element.parentNode,
            clickCallback: r ? e : null
        })
    }
    _initializeFocusTrap() {
        return new zo({
            trapElement: this._element
        })
    }
    _addEventListeners() {
        L.on(this._element, If, e=>{
            if (e.key === Nf) {
                if (!this._config.keyboard) {
                    L.trigger(this._element, Ks);
                    return
                }
                this.hide()
            }
        }
        )
    }
    static jQueryInterface(e) {
        return this.each(function() {
            const r = Ne.getOrCreateInstance(this, e);
            if (typeof e == "string") {
                if (r[e] === void 0 || e.startsWith("_") || e === "constructor")
                    throw new TypeError(`No method named "${e}"`);
                r[e](this)
            }
        })
    }
}
L.on(document, $f, kf, function(a) {
    const e = pe(this);
    if (["A", "AREA"].includes(this.tagName) && a.preventDefault(),
    Ce(this))
        return;
    L.one(e, Zo, ()=>{
        yn(this) && this.focus()
    }
    );
    const r = J.findOne(Jo);
    r && r !== e && Ne.getInstance(r).hide(),
    Ne.getOrCreateInstance(e).toggle(this)
});
L.on(window, Cf, ()=>{
    for (const a of J.find(Jo))
        Ne.getOrCreateInstance(a).show()
}
);
L.on(window, Lf, ()=>{
    for (const a of J.find("[aria-modal][class*=show][class*=offcanvas-]"))
        getComputedStyle(a).position !== "fixed" && Ne.getOrCreateInstance(a).hide()
}
);
_i(Ne);
zt(Ne);
const Rf = new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"])
  , Hf = /^aria-[\w-]*$/i
  , jf = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i
  , Vf = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i
  , qf = (a,e)=>{
    const r = a.nodeName.toLowerCase();
    return e.includes(r) ? Rf.has(r) ? !!(jf.test(a.nodeValue) || Vf.test(a.nodeValue)) : !0 : e.filter(l=>l instanceof RegExp).some(l=>l.test(r))
}
  , ta = {
    "*": ["class", "dir", "id", "lang", "role", Hf],
    a: ["target", "href", "title", "rel"],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ["src", "srcset", "alt", "title", "width", "height"],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
};
function Wf(a, e, r) {
    if (!a.length)
        return a;
    if (r && typeof r == "function")
        return r(a);
    const h = new window.DOMParser().parseFromString(a, "text/html")
      , _ = [].concat(...h.body.querySelectorAll("*"));
    for (const E of _) {
        const C = E.nodeName.toLowerCase();
        if (!Object.keys(e).includes(C)) {
            E.remove();
            continue
        }
        const D = [].concat(...E.attributes)
          , M = [].concat(e["*"] || [], e[C] || []);
        for (const $ of D)
            qf($, M) || E.removeAttribute($.nodeName)
    }
    return h.body.innerHTML
}
const Bf = "TemplateFactory"
  , Ff = {
    allowList: ta,
    content: {},
    extraClass: "",
    html: !1,
    sanitize: !0,
    sanitizeFn: null,
    template: "<div></div>"
}
  , Kf = {
    allowList: "object",
    content: "object",
    extraClass: "(string|function)",
    html: "boolean",
    sanitize: "boolean",
    sanitizeFn: "(null|function)",
    template: "string"
}
  , Uf = {
    entry: "(string|element|function|null)",
    selector: "(string|element)"
};
class Yf extends Vn {
    constructor(e) {
        super(),
        this._config = this._getConfig(e)
    }
    static get Default() {
        return Ff
    }
    static get DefaultType() {
        return Kf
    }
    static get NAME() {
        return Bf
    }
    getContent() {
        return Object.values(this._config.content).map(e=>this._resolvePossibleFunction(e)).filter(Boolean)
    }
    hasContent() {
        return this.getContent().length > 0
    }
    changeContent(e) {
        return this._checkContent(e),
        this._config.content = {
            ...this._config.content,
            ...e
        },
        this
    }
    toHtml() {
        const e = document.createElement("div");
        e.innerHTML = this._maybeSanitize(this._config.template);
        for (const [h,_] of Object.entries(this._config.content))
            this._setContent(e, _, h);
        const r = e.children[0]
          , l = this._resolvePossibleFunction(this._config.extraClass);
        return l && r.classList.add(...l.split(" ")),
        r
    }
    _typeCheckConfig(e) {
        super._typeCheckConfig(e),
        this._checkContent(e.content)
    }
    _checkContent(e) {
        for (const [r,l] of Object.entries(e))
            super._typeCheckConfig({
                selector: r,
                entry: l
            }, Uf)
    }
    _setContent(e, r, l) {
        const h = J.findOne(l, e);
        if (h) {
            if (r = this._resolvePossibleFunction(r),
            !r) {
                h.remove();
                return
            }
            if (ge(r)) {
                this._putElementInTemplate(we(r), h);
                return
            }
            if (this._config.html) {
                h.innerHTML = this._maybeSanitize(r);
                return
            }
            h.textContent = r
        }
    }
    _maybeSanitize(e) {
        return this._config.sanitize ? Wf(e, this._config.allowList, this._config.sanitizeFn) : e
    }
    _resolvePossibleFunction(e) {
        return typeof e == "function" ? e(this) : e
    }
    _putElementInTemplate(e, r) {
        if (this._config.html) {
            r.innerHTML = "",
            r.append(e);
            return
        }
        r.textContent = e.textContent
    }
}
const zf = "tooltip"
  , Gf = new Set(["sanitize", "allowList", "sanitizeFn"])
  , nr = "fade"
  , Xf = "modal"
  , si = "show"
  , Qf = ".tooltip-inner"
  , Us = `.${Xf}`
  , Ys = "hide.bs.modal"
  , kn = "hover"
  , ir = "focus"
  , Jf = "click"
  , Zf = "manual"
  , td = "hide"
  , ed = "hidden"
  , nd = "show"
  , id = "shown"
  , rd = "inserted"
  , sd = "click"
  , od = "focusin"
  , ad = "focusout"
  , ud = "mouseenter"
  , cd = "mouseleave"
  , ld = {
    AUTO: "auto",
    TOP: "top",
    RIGHT: Ut() ? "left" : "right",
    BOTTOM: "bottom",
    LEFT: Ut() ? "right" : "left"
}
  , fd = {
    allowList: ta,
    animation: !0,
    boundary: "clippingParents",
    container: !1,
    customClass: "",
    delay: 0,
    fallbackPlacements: ["top", "right", "bottom", "left"],
    html: !1,
    offset: [0, 0],
    placement: "top",
    popperConfig: null,
    sanitize: !0,
    sanitizeFn: null,
    selector: !1,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    title: "",
    trigger: "hover focus"
}
  , dd = {
    allowList: "object",
    animation: "boolean",
    boundary: "(string|element)",
    container: "(string|element|boolean)",
    customClass: "(string|function)",
    delay: "(number|object)",
    fallbackPlacements: "array",
    html: "boolean",
    offset: "(array|string|function)",
    placement: "(string|function)",
    popperConfig: "(null|object|function)",
    sanitize: "boolean",
    sanitizeFn: "(null|function)",
    selector: "(string|boolean)",
    template: "string",
    title: "(string|element|function)",
    trigger: "string"
};
class En extends ee {
    constructor(e, r) {
        if (typeof No > "u")
            throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
        super(e, r),
        this._isEnabled = !0,
        this._timeout = 0,
        this._isHovered = null,
        this._activeTrigger = {},
        this._popper = null,
        this._templateFactory = null,
        this._newContent = null,
        this.tip = null,
        this._setListeners(),
        this._config.selector || this._fixTitle()
    }
    static get Default() {
        return fd
    }
    static get DefaultType() {
        return dd
    }
    static get NAME() {
        return zf
    }
    enable() {
        this._isEnabled = !0
    }
    disable() {
        this._isEnabled = !1
    }
    toggleEnabled() {
        this._isEnabled = !this._isEnabled
    }
    toggle() {
        if (this._isEnabled) {
            if (this._activeTrigger.click = !this._activeTrigger.click,
            this._isShown()) {
                this._leave();
                return
            }
            this._enter()
        }
    }
    dispose() {
        clearTimeout(this._timeout),
        L.off(this._element.closest(Us), Ys, this._hideModalHandler),
        this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")),
        this._disposePopper(),
        super.dispose()
    }
    show() {
        if (this._element.style.display === "none")
            throw new Error("Please use show on visible elements");
        if (!(this._isWithContent() && this._isEnabled))
            return;
        const e = L.trigger(this._element, this.constructor.eventName(nd))
          , l = (Do(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
        if (e.defaultPrevented || !l)
            return;
        this._disposePopper();
        const h = this._getTipElement();
        this._element.setAttribute("aria-describedby", h.getAttribute("id"));
        const {container: _} = this._config;
        if (this._element.ownerDocument.documentElement.contains(this.tip) || (_.append(h),
        L.trigger(this._element, this.constructor.eventName(rd))),
        this._popper = this._createPopper(h),
        h.classList.add(si),
        "ontouchstart"in document.documentElement)
            for (const C of [].concat(...document.body.children))
                L.on(C, "mouseover", di);
        const E = ()=>{
            L.trigger(this._element, this.constructor.eventName(id)),
            this._isHovered === !1 && this._leave(),
            this._isHovered = !1
        }
        ;
        this._queueCallback(E, this.tip, this._isAnimated())
    }
    hide() {
        if (!this._isShown() || L.trigger(this._element, this.constructor.eventName(td)).defaultPrevented)
            return;
        if (this._getTipElement().classList.remove(si),
        "ontouchstart"in document.documentElement)
            for (const h of [].concat(...document.body.children))
                L.off(h, "mouseover", di);
        this._activeTrigger[Jf] = !1,
        this._activeTrigger[ir] = !1,
        this._activeTrigger[kn] = !1,
        this._isHovered = null;
        const l = ()=>{
            this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(),
            this._element.removeAttribute("aria-describedby"),
            L.trigger(this._element, this.constructor.eventName(ed)))
        }
        ;
        this._queueCallback(l, this.tip, this._isAnimated())
    }
    update() {
        this._popper && this._popper.update()
    }
    _isWithContent() {
        return !!this._getTitle()
    }
    _getTipElement() {
        return this.tip || (this.tip = this._createTipElement(this._newContent || this._getContentForTemplate())),
        this.tip
    }
    _createTipElement(e) {
        const r = this._getTemplateFactory(e).toHtml();
        if (!r)
            return null;
        r.classList.remove(nr, si),
        r.classList.add(`bs-${this.constructor.NAME}-auto`);
        const l = Xu(this.constructor.NAME).toString();
        return r.setAttribute("id", l),
        this._isAnimated() && r.classList.add(nr),
        r
    }
    setContent(e) {
        this._newContent = e,
        this._isShown() && (this._disposePopper(),
        this.show())
    }
    _getTemplateFactory(e) {
        return this._templateFactory ? this._templateFactory.changeContent(e) : this._templateFactory = new Yf({
            ...this._config,
            content: e,
            extraClass: this._resolvePossibleFunction(this._config.customClass)
        }),
        this._templateFactory
    }
    _getContentForTemplate() {
        return {
            [Qf]: this._getTitle()
        }
    }
    _getTitle() {
        return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title")
    }
    _initializeOnDelegatedTarget(e) {
        return this.constructor.getOrCreateInstance(e.delegateTarget, this._getDelegateConfig())
    }
    _isAnimated() {
        return this._config.animation || this.tip && this.tip.classList.contains(nr)
    }
    _isShown() {
        return this.tip && this.tip.classList.contains(si)
    }
    _createPopper(e) {
        const r = typeof this._config.placement == "function" ? this._config.placement.call(this, e, this._element) : this._config.placement
          , l = ld[r.toUpperCase()];
        return xr(this._element, e, this._getPopperConfig(l))
    }
    _getOffset() {
        const {offset: e} = this._config;
        return typeof e == "string" ? e.split(",").map(r=>Number.parseInt(r, 10)) : typeof e == "function" ? r=>e(r, this._element) : e
    }
    _resolvePossibleFunction(e) {
        return typeof e == "function" ? e.call(this._element) : e
    }
    _getPopperConfig(e) {
        const r = {
            placement: e,
            modifiers: [{
                name: "flip",
                options: {
                    fallbackPlacements: this._config.fallbackPlacements
                }
            }, {
                name: "offset",
                options: {
                    offset: this._getOffset()
                }
            }, {
                name: "preventOverflow",
                options: {
                    boundary: this._config.boundary
                }
            }, {
                name: "arrow",
                options: {
                    element: `.${this.constructor.NAME}-arrow`
                }
            }, {
                name: "preSetPlacement",
                enabled: !0,
                phase: "beforeMain",
                fn: l=>{
                    this._getTipElement().setAttribute("data-popper-placement", l.state.placement)
                }
            }]
        };
        return {
            ...r,
            ...typeof this._config.popperConfig == "function" ? this._config.popperConfig(r) : this._config.popperConfig
        }
    }
    _setListeners() {
        const e = this._config.trigger.split(" ");
        for (const r of e)
            if (r === "click")
                L.on(this._element, this.constructor.eventName(sd), this._config.selector, l=>{
                    this._initializeOnDelegatedTarget(l).toggle()
                }
                );
            else if (r !== Zf) {
                const l = r === kn ? this.constructor.eventName(ud) : this.constructor.eventName(od)
                  , h = r === kn ? this.constructor.eventName(cd) : this.constructor.eventName(ad);
                L.on(this._element, l, this._config.selector, _=>{
                    const E = this._initializeOnDelegatedTarget(_);
                    E._activeTrigger[_.type === "focusin" ? ir : kn] = !0,
                    E._enter()
                }
                ),
                L.on(this._element, h, this._config.selector, _=>{
                    const E = this._initializeOnDelegatedTarget(_);
                    E._activeTrigger[_.type === "focusout" ? ir : kn] = E._element.contains(_.relatedTarget),
                    E._leave()
                }
                )
            }
        this._hideModalHandler = ()=>{
            this._element && this.hide()
        }
        ,
        L.on(this._element.closest(Us), Ys, this._hideModalHandler)
    }
    _fixTitle() {
        const e = this._element.getAttribute("title");
        e && (!this._element.getAttribute("aria-label") && !this._element.textContent.trim() && this._element.setAttribute("aria-label", e),
        this._element.setAttribute("data-bs-original-title", e),
        this._element.removeAttribute("title"))
    }
    _enter() {
        if (this._isShown() || this._isHovered) {
            this._isHovered = !0;
            return
        }
        this._isHovered = !0,
        this._setTimeout(()=>{
            this._isHovered && this.show()
        }
        , this._config.delay.show)
    }
    _leave() {
        this._isWithActiveTrigger() || (this._isHovered = !1,
        this._setTimeout(()=>{
            this._isHovered || this.hide()
        }
        , this._config.delay.hide))
    }
    _setTimeout(e, r) {
        clearTimeout(this._timeout),
        this._timeout = setTimeout(e, r)
    }
    _isWithActiveTrigger() {
        return Object.values(this._activeTrigger).includes(!0)
    }
    _getConfig(e) {
        const r = me.getDataAttributes(this._element);
        for (const l of Object.keys(r))
            Gf.has(l) && delete r[l];
        return e = {
            ...r,
            ...typeof e == "object" && e ? e : {}
        },
        e = this._mergeConfigObj(e),
        e = this._configAfterMerge(e),
        this._typeCheckConfig(e),
        e
    }
    _configAfterMerge(e) {
        return e.container = e.container === !1 ? document.body : we(e.container),
        typeof e.delay == "number" && (e.delay = {
            show: e.delay,
            hide: e.delay
        }),
        typeof e.title == "number" && (e.title = e.title.toString()),
        typeof e.content == "number" && (e.content = e.content.toString()),
        e
    }
    _getDelegateConfig() {
        const e = {};
        for (const r in this._config)
            this.constructor.Default[r] !== this._config[r] && (e[r] = this._config[r]);
        return e.selector = !1,
        e.trigger = "manual",
        e
    }
    _disposePopper() {
        this._popper && (this._popper.destroy(),
        this._popper = null),
        this.tip && (this.tip.remove(),
        this.tip = null)
    }
    static jQueryInterface(e) {
        return this.each(function() {
            const r = En.getOrCreateInstance(this, e);
            if (typeof e == "string") {
                if (typeof r[e] > "u")
                    throw new TypeError(`No method named "${e}"`);
                r[e]()
            }
        })
    }
}
zt(En);
const hd = "popover"
  , pd = ".popover-header"
  , gd = ".popover-body"
  , md = {
    ...En.Default,
    content: "",
    offset: [0, 8],
    placement: "right",
    template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
    trigger: "click"
}
  , vd = {
    ...En.DefaultType,
    content: "(null|string|element|function)"
};
class $r extends En {
    static get Default() {
        return md
    }
    static get DefaultType() {
        return vd
    }
    static get NAME() {
        return hd
    }
    _isWithContent() {
        return this._getTitle() || this._getContent()
    }
    _getContentForTemplate() {
        return {
            [pd]: this._getTitle(),
            [gd]: this._getContent()
        }
    }
    _getContent() {
        return this._resolvePossibleFunction(this._config.content)
    }
    static jQueryInterface(e) {
        return this.each(function() {
            const r = $r.getOrCreateInstance(this, e);
            if (typeof e == "string") {
                if (typeof r[e] > "u")
                    throw new TypeError(`No method named "${e}"`);
                r[e]()
            }
        })
    }
}
zt($r);
const _d = "scrollspy"
  , yd = "bs.scrollspy"
  , Ir = `.${yd}`
  , bd = ".data-api"
  , Ed = `activate${Ir}`
  , zs = `click${Ir}`
  , Td = `load${Ir}${bd}`
  , Ad = "dropdown-item"
  , sn = "active"
  , wd = '[data-bs-spy="scroll"]'
  , rr = "[href]"
  , Cd = ".nav, .list-group"
  , Gs = ".nav-link"
  , Nd = ".nav-item"
  , Sd = ".list-group-item"
  , xd = `${Gs}, ${Nd} > ${Gs}, ${Sd}`
  , Od = ".dropdown"
  , Dd = ".dropdown-toggle"
  , Ld = {
    offset: null,
    rootMargin: "0px 0px -25%",
    smoothScroll: !1,
    target: null,
    threshold: [.1, .5, 1]
}
  , $d = {
    offset: "(number|null)",
    rootMargin: "string",
    smoothScroll: "boolean",
    target: "element",
    threshold: "array"
};
class Ei extends ee {
    constructor(e, r) {
        super(e, r),
        this._targetLinks = new Map,
        this._observableSections = new Map,
        this._rootElement = getComputedStyle(this._element).overflowY === "visible" ? null : this._element,
        this._activeTarget = null,
        this._observer = null,
        this._previousScrollData = {
            visibleEntryTop: 0,
            parentScrollTop: 0
        },
        this.refresh()
    }
    static get Default() {
        return Ld
    }
    static get DefaultType() {
        return $d
    }
    static get NAME() {
        return _d
    }
    refresh() {
        this._initializeTargetsAndObservables(),
        this._maybeEnableSmoothScroll(),
        this._observer ? this._observer.disconnect() : this._observer = this._getNewObserver();
        for (const e of this._observableSections.values())
            this._observer.observe(e)
    }
    dispose() {
        this._observer.disconnect(),
        super.dispose()
    }
    _configAfterMerge(e) {
        return e.target = we(e.target) || document.body,
        e.rootMargin = e.offset ? `${e.offset}px 0px -30%` : e.rootMargin,
        typeof e.threshold == "string" && (e.threshold = e.threshold.split(",").map(r=>Number.parseFloat(r))),
        e
    }
    _maybeEnableSmoothScroll() {
        this._config.smoothScroll && (L.off(this._config.target, zs),
        L.on(this._config.target, zs, rr, e=>{
            const r = this._observableSections.get(e.target.hash);
            if (r) {
                e.preventDefault();
                const l = this._rootElement || window
                  , h = r.offsetTop - this._element.offsetTop;
                if (l.scrollTo) {
                    l.scrollTo({
                        top: h,
                        behavior: "smooth"
                    });
                    return
                }
                l.scrollTop = h
            }
        }
        ))
    }
    _getNewObserver() {
        const e = {
            root: this._rootElement,
            threshold: this._config.threshold,
            rootMargin: this._config.rootMargin
        };
        return new IntersectionObserver(r=>this._observerCallback(r),e)
    }
    _observerCallback(e) {
        const r = E=>this._targetLinks.get(`#${E.target.id}`)
          , l = E=>{
            this._previousScrollData.visibleEntryTop = E.target.offsetTop,
            this._process(r(E))
        }
          , h = (this._rootElement || document.documentElement).scrollTop
          , _ = h >= this._previousScrollData.parentScrollTop;
        this._previousScrollData.parentScrollTop = h;
        for (const E of e) {
            if (!E.isIntersecting) {
                this._activeTarget = null,
                this._clearActiveClass(r(E));
                continue
            }
            const C = E.target.offsetTop >= this._previousScrollData.visibleEntryTop;
            if (_ && C) {
                if (l(E),
                !h)
                    return;
                continue
            }
            !_ && !C && l(E)
        }
    }
    _initializeTargetsAndObservables() {
        this._targetLinks = new Map,
        this._observableSections = new Map;
        const e = J.find(rr, this._config.target);
        for (const r of e) {
            if (!r.hash || Ce(r))
                continue;
            const l = J.findOne(r.hash, this._element);
            yn(l) && (this._targetLinks.set(r.hash, r),
            this._observableSections.set(r.hash, l))
        }
    }
    _process(e) {
        this._activeTarget !== e && (this._clearActiveClass(this._config.target),
        this._activeTarget = e,
        e.classList.add(sn),
        this._activateParents(e),
        L.trigger(this._element, Ed, {
            relatedTarget: e
        }))
    }
    _activateParents(e) {
        if (e.classList.contains(Ad)) {
            J.findOne(Dd, e.closest(Od)).classList.add(sn);
            return
        }
        for (const r of J.parents(e, Cd))
            for (const l of J.prev(r, xd))
                l.classList.add(sn)
    }
    _clearActiveClass(e) {
        e.classList.remove(sn);
        const r = J.find(`${rr}.${sn}`, e);
        for (const l of r)
            l.classList.remove(sn)
    }
    static jQueryInterface(e) {
        return this.each(function() {
            const r = Ei.getOrCreateInstance(this, e);
            if (typeof e == "string") {
                if (r[e] === void 0 || e.startsWith("_") || e === "constructor")
                    throw new TypeError(`No method named "${e}"`);
                r[e]()
            }
        })
    }
}
L.on(window, Td, ()=>{
    for (const a of J.find(wd))
        Ei.getOrCreateInstance(a)
}
);
zt(Ei);
const Id = "tab"
  , kd = "bs.tab"
  , Xe = `.${kd}`
  , Pd = `hide${Xe}`
  , Md = `hidden${Xe}`
  , Rd = `show${Xe}`
  , Hd = `shown${Xe}`
  , jd = `click${Xe}`
  , Vd = `keydown${Xe}`
  , qd = `load${Xe}`
  , Wd = "ArrowLeft"
  , Xs = "ArrowRight"
  , Bd = "ArrowUp"
  , Qs = "ArrowDown"
  , Ke = "active"
  , Js = "fade"
  , sr = "show"
  , Fd = "dropdown"
  , Kd = ".dropdown-toggle"
  , Ud = ".dropdown-menu"
  , or = ":not(.dropdown-toggle)"
  , Yd = '.list-group, .nav, [role="tablist"]'
  , zd = ".nav-item, .list-group-item"
  , Gd = `.nav-link${or}, .list-group-item${or}, [role="tab"]${or}`
  , ea = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]'
  , ar = `${Gd}, ${ea}`
  , Xd = `.${Ke}[data-bs-toggle="tab"], .${Ke}[data-bs-toggle="pill"], .${Ke}[data-bs-toggle="list"]`;
class vn extends ee {
    constructor(e) {
        super(e),
        this._parent = this._element.closest(Yd),
        this._parent && (this._setInitialAttributes(this._parent, this._getChildren()),
        L.on(this._element, Vd, r=>this._keydown(r)))
    }
    static get NAME() {
        return Id
    }
    show() {
        const e = this._element;
        if (this._elemIsActive(e))
            return;
        const r = this._getActiveElem()
          , l = r ? L.trigger(r, Pd, {
            relatedTarget: e
        }) : null;
        L.trigger(e, Rd, {
            relatedTarget: r
        }).defaultPrevented || l && l.defaultPrevented || (this._deactivate(r, e),
        this._activate(e, r))
    }
    _activate(e, r) {
        if (!e)
            return;
        e.classList.add(Ke),
        this._activate(pe(e));
        const l = ()=>{
            if (e.getAttribute("role") !== "tab") {
                e.classList.add(sr);
                return
            }
            e.removeAttribute("tabindex"),
            e.setAttribute("aria-selected", !0),
            this._toggleDropDown(e, !0),
            L.trigger(e, Hd, {
                relatedTarget: r
            })
        }
        ;
        this._queueCallback(l, e, e.classList.contains(Js))
    }
    _deactivate(e, r) {
        if (!e)
            return;
        e.classList.remove(Ke),
        e.blur(),
        this._deactivate(pe(e));
        const l = ()=>{
            if (e.getAttribute("role") !== "tab") {
                e.classList.remove(sr);
                return
            }
            e.setAttribute("aria-selected", !1),
            e.setAttribute("tabindex", "-1"),
            this._toggleDropDown(e, !1),
            L.trigger(e, Md, {
                relatedTarget: r
            })
        }
        ;
        this._queueCallback(l, e, e.classList.contains(Js))
    }
    _keydown(e) {
        if (![Wd, Xs, Bd, Qs].includes(e.key))
            return;
        e.stopPropagation(),
        e.preventDefault();
        const r = [Xs, Qs].includes(e.key)
          , l = Or(this._getChildren().filter(h=>!Ce(h)), e.target, r, !0);
        l && (l.focus({
            preventScroll: !0
        }),
        vn.getOrCreateInstance(l).show())
    }
    _getChildren() {
        return J.find(ar, this._parent)
    }
    _getActiveElem() {
        return this._getChildren().find(e=>this._elemIsActive(e)) || null
    }
    _setInitialAttributes(e, r) {
        this._setAttributeIfNotExists(e, "role", "tablist");
        for (const l of r)
            this._setInitialAttributesOnChild(l)
    }
    _setInitialAttributesOnChild(e) {
        e = this._getInnerElement(e);
        const r = this._elemIsActive(e)
          , l = this._getOuterElement(e);
        e.setAttribute("aria-selected", r),
        l !== e && this._setAttributeIfNotExists(l, "role", "presentation"),
        r || e.setAttribute("tabindex", "-1"),
        this._setAttributeIfNotExists(e, "role", "tab"),
        this._setInitialAttributesOnTargetPanel(e)
    }
    _setInitialAttributesOnTargetPanel(e) {
        const r = pe(e);
        r && (this._setAttributeIfNotExists(r, "role", "tabpanel"),
        e.id && this._setAttributeIfNotExists(r, "aria-labelledby", `#${e.id}`))
    }
    _toggleDropDown(e, r) {
        const l = this._getOuterElement(e);
        if (!l.classList.contains(Fd))
            return;
        const h = (_,E)=>{
            const C = J.findOne(_, l);
            C && C.classList.toggle(E, r)
        }
        ;
        h(Kd, Ke),
        h(Ud, sr),
        l.setAttribute("aria-expanded", r)
    }
    _setAttributeIfNotExists(e, r, l) {
        e.hasAttribute(r) || e.setAttribute(r, l)
    }
    _elemIsActive(e) {
        return e.classList.contains(Ke)
    }
    _getInnerElement(e) {
        return e.matches(ar) ? e : J.findOne(ar, e)
    }
    _getOuterElement(e) {
        return e.closest(zd) || e
    }
    static jQueryInterface(e) {
        return this.each(function() {
            const r = vn.getOrCreateInstance(this);
            if (typeof e == "string") {
                if (r[e] === void 0 || e.startsWith("_") || e === "constructor")
                    throw new TypeError(`No method named "${e}"`);
                r[e]()
            }
        })
    }
}
L.on(document, jd, ea, function(a) {
    ["A", "AREA"].includes(this.tagName) && a.preventDefault(),
    !Ce(this) && vn.getOrCreateInstance(this).show()
});
L.on(window, qd, ()=>{
    for (const a of J.find(Xd))
        vn.getOrCreateInstance(a)
}
);
zt(vn);
const Qd = "toast"
  , Jd = "bs.toast"
  , Oe = `.${Jd}`
  , Zd = `mouseover${Oe}`
  , th = `mouseout${Oe}`
  , eh = `focusin${Oe}`
  , nh = `focusout${Oe}`
  , ih = `hide${Oe}`
  , rh = `hidden${Oe}`
  , sh = `show${Oe}`
  , oh = `shown${Oe}`
  , ah = "fade"
  , Zs = "hide"
  , oi = "show"
  , ai = "showing"
  , uh = {
    animation: "boolean",
    autohide: "boolean",
    delay: "number"
}
  , ch = {
    animation: !0,
    autohide: !0,
    delay: 5e3
};
class Ti extends ee {
    constructor(e, r) {
        super(e, r),
        this._timeout = null,
        this._hasMouseInteraction = !1,
        this._hasKeyboardInteraction = !1,
        this._setListeners()
    }
    static get Default() {
        return ch
    }
    static get DefaultType() {
        return uh
    }
    static get NAME() {
        return Qd
    }
    show() {
        if (L.trigger(this._element, sh).defaultPrevented)
            return;
        this._clearTimeout(),
        this._config.animation && this._element.classList.add(ah);
        const r = ()=>{
            this._element.classList.remove(ai),
            L.trigger(this._element, oh),
            this._maybeScheduleHide()
        }
        ;
        this._element.classList.remove(Zs),
        jn(this._element),
        this._element.classList.add(oi, ai),
        this._queueCallback(r, this._element, this._config.animation)
    }
    hide() {
        if (!this.isShown() || L.trigger(this._element, ih).defaultPrevented)
            return;
        const r = ()=>{
            this._element.classList.add(Zs),
            this._element.classList.remove(ai, oi),
            L.trigger(this._element, rh)
        }
        ;
        this._element.classList.add(ai),
        this._queueCallback(r, this._element, this._config.animation)
    }
    dispose() {
        this._clearTimeout(),
        this.isShown() && this._element.classList.remove(oi),
        super.dispose()
    }
    isShown() {
        return this._element.classList.contains(oi)
    }
    _maybeScheduleHide() {
        this._config.autohide && (this._hasMouseInteraction || this._hasKeyboardInteraction || (this._timeout = setTimeout(()=>{
            this.hide()
        }
        , this._config.delay)))
    }
    _onInteraction(e, r) {
        switch (e.type) {
        case "mouseover":
        case "mouseout":
            {
                this._hasMouseInteraction = r;
                break
            }
        case "focusin":
        case "focusout":
            {
                this._hasKeyboardInteraction = r;
                break
            }
        }
        if (r) {
            this._clearTimeout();
            return
        }
        const l = e.relatedTarget;
        this._element === l || this._element.contains(l) || this._maybeScheduleHide()
    }
    _setListeners() {
        L.on(this._element, Zd, e=>this._onInteraction(e, !0)),
        L.on(this._element, th, e=>this._onInteraction(e, !1)),
        L.on(this._element, eh, e=>this._onInteraction(e, !0)),
        L.on(this._element, nh, e=>this._onInteraction(e, !1))
    }
    _clearTimeout() {
        clearTimeout(this._timeout),
        this._timeout = null
    }
    static jQueryInterface(e) {
        return this.each(function() {
            const r = Ti.getOrCreateInstance(this, e);
            if (typeof e == "string") {
                if (typeof r[e] > "u")
                    throw new TypeError(`No method named "${e}"`);
                r[e](this)
            }
        })
    }
}
_i(Ti);
zt(Ti);
export {fh as M, $r as P, lh as a, ln as j, eu as m};
