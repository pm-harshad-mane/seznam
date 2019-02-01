(function() {
    var a = "area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,source,path,animateanimateColor,circle,ellipse,glyph,hatchpath,image,line,mpath,path,polygon,polyline,rect,solidcolorstop,tref,use,view,"
      , a = a.split(",")
      , b = {
        current: null,
        queue: {
            local: [],
            global: []
        },
        enqueue: function(a) {
            this.queue.local = this.queue.local.concat(a);
            setTimeout(function() {
                b.processQueue()
            }, 0)
        },
        processQueue: function() {
            if (!this.current) {
                for (; this.queue.local.length; )
                    this.queue.global.unshift(this.queue.local.pop());
                if (this.queue.global.length) {
                    var a = this.queue.global.shift()
                      , c = document.getElementById(a.id);
                    switch (a.type) {
                    case "external":
                        var e = document.createElement("script");
                        this.current = e;
                        var f = function() {
                            e.onload = e.onerror = e.onreadystatechange = null;
                            b.current = null;
                            b.processQueue()
                        };
                        "onload"in e ? (e.onload = f,
                        e.onerror = f) : e.onreadystatechange = function() {
                            "loaded" == e.readyState && f()
                        }
                        ;
                        e.src = a.src;
                        c.parentNode.replaceChild(e, c);
                        break;
                    case "inline":
                        b.current = c,
                        (0,
                        eval)(a.code),
                        b.current = null,
                        c.parentNode && c.parentNode.removeChild(c),
                        b.processQueue()
                    }
                }
            }
        }
    }
      , c = 0
      , e = function(a, c) {
        var b = document.createDocumentFragment()
          , e = document.createElement("div");
        for (e.innerHTML = c; e.firstChild; )
            b.appendChild(e.firstChild);
        "script" == a.nodeName.toLowerCase() || 0 == a.id.indexOf("dw-tmp-") ? a.parentNode.insertBefore(b, a) : a.appendChild(b)
    }
      , f = function(a, f) {
        var g = []
          , h = /src=['"]?([^\s'"]+)/i
          , n = /src=['"]?([^\s'"]+['"]?)/i
          , p = f.replace(/<script(.*?)>([\s\S]*?)<\/script>/ig, function(a, b, e) {
            a = "dw-tmp-" + c++;
            var f = b.match(h);
            f ? g.push({
                type: "external",
                id: a,
                src: f[1]
            }) : g.push({
                type: "inline",
                id: a,
                code: e
            });
            b = ("<script" + b + ">\x3c/script>").replace(n, "");
            return "<span id='" + a + "'></span>" + b
        });
        e(a, p);
        b.enqueue(g)
    }
      , h = {
        code: "",
        node: null,
        append: function(a, b) {
            this.node != a && (this.code = "",
            this.node = a);
            this.code += b;
            this.isWritable() && (b = this.code,
            this.code = "",
            f(this.node, b))
        },
        isWritable: function() {
            for (var b = this.code.replace(/<script[\s\S]*?<\/script>/gi, ""), c = b.match(/<[a-z0-9-]+[\s>]/ig) || [], e = b.match(/<\/[a-z0-9-]+/ig) || [], f = [], g = [], h = b = 0; h < c.length; h++) {
                var k = c[h].substring(1).toLowerCase()
                  , k = k.substring(0, k.length - 1);
                -1 < a.indexOf(k) || -1 < "colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,path,animateanimateColor,circle,ellipse,glyph,hatchpath,image,line,mpath,path,polygon,polyline,rect,solidcolorstop,tref,use,view,".indexOf(k) || (b++,
                f.push(k))
            }
            for (h = c = 0; h < e.length; h++)
                k = e[h].substring(2).toLowerCase(),
                -1 < "colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,path,animateanimateColor,circle,ellipse,glyph,hatchpath,image,line,mpath,path,polygon,polyline,rect,solidcolorstop,tref,use,view,".indexOf(k) || (c++,
                g.push(k));
            "DCWRT_DEBUG"in window && "function" === typeof window.CustomEvent && "function" === typeof window.dispatchEvent && (e = {
                status: !0,
                tagsOpen: f,
                tagsClose: g,
                countOpen: b,
                countClose: c
            },
            b != c && (e.status = !1),
            e = new CustomEvent("documentWriteIsWritable",{
                detail: e
            }),
            window.dispatchEvent(e));
            return b != c ? !1 : !0
        }
    }
      , g = function() {
        for (var a = document.getElementsByTagName("script"), a = b.current || a[a.length - 1] || document.body, c = "", e = 0; e < arguments.length; e++)
            c += arguments[e];
        h.append(a, c)
    };
    window.replaceDocumentWrite = function() {
        document.write = g;
        document.writeln = g;
        document.writeTo = f
    }
}
)();
(function() {
    function a(a, c) {
        c = c || {
            bubbles: !1,
            cancelable: !1,
            detail: void 0
        };
        var e = document.createEvent("CustomEvent");
        e.initCustomEvent(a, c.bubbles, c.cancelable, c.detail);
        return e
    }
    if ("function" === typeof window.CustomEvent)
        return !1;
    a.prototype = window.Event.prototype;
    window.CustomEvent = a
}
)();
if (!window.im) {
    var im = {
        returnedAds: []
    };
    if (document.body)
        var elm = document.body;
    else
        document.head && (elm = document.head);
    im._createIframeSync = function() {
        var a = document.createElement("iframe");
        a.width = 0;
        a.height = 0;
        a.style.display = "none";
        return a
    }
    ;
    im._pubmaticSync = function() {
        var a = im._createIframeSync();
        a.src = "//ads.pubmatic.com/AdServer/js/user_sync.html?p=49307&predirect=" + encodeURIComponent("//" + im.conf.server + "/html/pub_sync.html?pmId=");
        elm.insertBefore(a, elm.firstChild)
    }
    ;
    im._appnexusSync = function() {
        var a = im._createIframeSync();
        a.src = "//secure.adnxs.com/getuid?//" + im.conf.server + "/html/apn_sync.html?uid=$UID";
        elm.insertBefore(a, elm.firstChild)
    }
    ;
    var sync_script = document.createElement("script");
    sync_script.src = "//i.imedia.cz/js/sync_codes.js";
    elm.insertBefore(sync_script, elm.firstChild);
    im.conf = {
        urlLength: 2E3,
        params: "zoneId section collocation source passon flag spotId".split(" "),
        protocol: location.protocol.match(/s/i) ? "https" : "http",
        server: "i.imedia.cz",
        charset: "utf-8",
        referer: window.location.href ? window.location.href : ""
    };
    im._browserHash = {
        computeHash: function() {
            var a = [], b;
            for (b in screen)
                a.push(screen[b]);
            var c = this.getPlugins();
            for (b = 0; b < c.length; b++)
                a.push(c[b]);
            var a = a.join("").toLowerCase()
              , c = [0, 0, 0, 0]
              , e = 0;
            for (b = 0; b < a.length; b++)
                c[e] = (c[e] + a.charCodeAt(b)) % 65535,
                e = (e + 1) % c.length;
            return c.join("")
        },
        getPlugins: function() {
            var a = [];
            if (navigator.plugins && navigator.plugins.length)
                for (var b = 0; b < navigator.plugins.length; b++) {
                    var c = navigator.plugins[b]
                      , c = c.name.match(/[0-9]/) ? c.name : c.description;
                    a.push(c)
                }
            else if (window.ActiveXObject) {
                var b = {
                    "AcroPDF.PDF": function() {
                        return this.GetVersions()
                    },
                    "PDF.PdfCtrl": function() {
                        return this.GetVersions()
                    },
                    "ShockwaveFlash.ShockwaveFlash": function() {
                        return this.GetVariable("$version")
                    },
                    "QuickTime.QuickTime": function() {
                        return this.QuickTimeVersion
                    },
                    "rmocx.RealPlayer G2 Control": function() {
                        return this.GetVersionInfo()
                    },
                    "rmocx.RealPlayer G2 Control.1": function() {
                        return this.GetVersionInfo()
                    },
                    "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)": function() {
                        return this.GetVersionInfo()
                    },
                    "RealVideo.Rep.CalVideo(tm) ActiveX Control (32-bit)": function() {
                        return this.GetVersionInfo()
                    },
                    RealPlayer: function() {
                        return this.GetVersionInfo()
                    },
                    "WMPlayer.OCX": function() {
                        return this.versionInfo
                    }
                }, e, f;
                for (f in b) {
                    try {
                        e = new ActiveXObject(f),
                        c = f
                    } catch (h) {
                        continue
                    }
                    try {
                        c += " " + b[f].call(e)
                    } catch (g) {}
                    a.push(c)
                }
            }
            return a
        }
    };
    im._onReadyStateChange = function(a, b, c) {
        a = a.target;
        4 == a.readyState && 200 == a.status && (a.onreadystatechange = null,
        this._done(a.responseText, b, c))
    }
    ;
    im._onXDomainRequestLoad = function(a, b, c) {
        this._done(a.responseText, b, c)
    }
    ;
    im._done = function(a, b, c) {
        try {
            var e = JSON.parse(a)
        } catch (f) {
            return
        }
        a = e.ads;
        (e = e.opt) && im._parseOpt(e);
        if (c && c.AMPcallback) {
            var h = new CustomEvent("im3adsloaded",{
                detail: {
                    ads: a,
                    amp: !0
                }
            });
            window.dispatchEvent(h);
            c.AMPcallback(a)
        } else
            for (im.returnedAds.push(im._setMapping(b, a)),
            c = 0; c < a.length; c++) {
                var g = a[c]
                  , e = b[c]
                  , h = new CustomEvent("im3adsloaded",{
                    detail: {
                        ad: g,
                        data: e
                    }
                });
                window.dispatchEvent(h);
                e.callback ? e.callback(g, e) : this.writeAd(g, e)
            }
    }
    ;
    im._setMapping = function(a, b) {
        for (var c = [], e = 0; e < a.length; e++) {
            var f = a[e]
              , h = b[e].spots;
            if (h) {
                f.spots = [];
                for (var g = 0; g < h.length; g++)
                    f.spots.push(h[g].spotId)
            }
            c.push(f)
        }
        return c
    }
    ;
    im.getAds = function(a, b) {
        if (a.length) {
            window.replaceDocumentWrite();
            this._logAds(a);
            for (var c = this._buildPrefix(), e = this.conf.protocol + "://" + this.conf.server + "/json", f = 0; f < a.length; f++)
                var h = this._buildItem(a[f], f, b)
                  , c = c + ("&" + h);
            if (window.XMLHttpRequest) {
                var g = new XMLHttpRequest;
                this._xdomain = !1;
                window.XDomainRequest && !g.upload && (this._xdomain = !0,
                g = new XDomainRequest,
                g.onprogress = function() {}
                ,
                g.ontimeout = function() {}
                ,
                g.onerror = function() {}
                )
            } else
                throw Error("No XHR available");
            (function(a, b, f) {
                f._xdomain ? g.onload = function(c) {
                    f._onXDomainRequestLoad(g, a, b)
                }
                : g.onreadystatechange = function(c) {
                    f._onReadyStateChange(c, a, b)
                }
                ;
                g.open("POST", e);
                g.withCredentials = !0;
                f._xdomain || g.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                g.send(c)
            }
            )(a, b, this)
        }
    }
    ;
    im.writeAd = function(a, b, c) {
        if (c = "string" == typeof b.id ? document.getElementById(b.id) : b.id) {
            for (var e = 0; e < a.spots.length; e++)
                im._writeSpot(a.spots[e], c, b);
            a.impress && (c.className += " adFull");
            a.miss && document.writeTo(c, a.miss);
            b.scroll && im._scroll(c)
        }
    }
    ;
    im._writeSpot = function(a, b, c) {
        var e = "iframe" == b.nodeName.toLowerCase();
        if (a.iframe) {
            var f = document.createElement("iframe");
            f.id = "im-" + Math.random().toString(16).replace(".", "");
            f.frameBorder = "0";
            e ? (f.width = b.width,
            f.height = b.height,
            b.parentNode.replaceChild(f, b)) : (f.width = "100%",
            f.height = "100%",
            "width"in a && (f.width = a.width + 2),
            "height"in a && (f.height = a.height + 2),
            b.appendChild(f));
            var h = "<script>window.__im_passback_iframe_id = '" + f.id + "'\x3c/script>" + a.content;
            f.onload = function() {
                var a = new CustomEvent("xiframe",{
                    detail: {
                        id: f.id
                    }
                });
                window.dispatchEvent(a);
                f.onload = null;
                f.contentWindow.postMessage(h, "*")
            }
            ;
            f.onerror = function(a) {
                a = new CustomEvent("xiframe",{
                    detail: {
                        id: f.id
                    }
                });
                window.dispatchEvent(a)
            }
            ;
            f.src = im.conf.protocol + "://" + im.conf.server + "/html/" + window.location.host + "/reklama.html?url=" + encodeURIComponent(window.location.href);
            this._iframes.push({
                iframe: f,
                position: c
            })
        } else
            e && (e = document.createElement("div"),
            b.parentNode.replaceChild(e, b),
            b = e),
            c.secure ? b.innerHTML += a.content : document.writeTo(b, a.content)
    }
    ;
    im.clearContext = function() {
        this.zoneToId = {};
        this._iframes = []
    }
    ;
    im.clearContext();
    im._scroll = function(a) {
        for (var b = a.offsetHeight, c = 0; a; )
            c += a.offsetTop,
            a = a.offsetParent;
        a = document.documentElement.scrollTop || document.body.scrollTop;
        var e = document.documentElement.scrollLeft || document.body.scrollLeft;
        a > c + b && scrollTo(e, a + b)
    }
    ;
    im.videoAds = function(a, b, c, e) {
        function f(b, c) {
            h--;
            var e = c.zoneId.split(".").pop().replace(/-/g, "")
              , f = b.spots
              , k = "";
            "" != b.miss && (k += b.miss);
            for (var l = 0; l < f.length; l++)
                k += f[l].content;
            f = document.getElementById(a);
            (k = im._parseVideoAd(k, f)) && (g[e] = k);
            !h && (e = document.getElementById(a)) && (k = e.getElementsByTagName("embed"),
            k.length && (e = k[0]),
            e.setAds(g))
        }
        b = b.split(",");
        for (var h = b.length, g = {}, l = [], m = 0; m < b.length; m++)
            l.push({
                callback: f,
                zoneId: b[m],
                section: c,
                collocation: e
            });
        this.getAds(l, !0);
        return !0
    }
    ;
    im._buildPrefix = function() {
        var a = {
            charset: this.conf.charset,
            cookieEnabled: navigator.cookieEnabled ? 1 : 0,
            lang: (navigator.language || navigator.systemLanguage || "").substring(0, 2),
            bhash: im._browserHash.computeHash()
        };
        "" != this.conf.referer && (a.referer = this.conf.referer);
        var b = [], c;
        for (c in a)
            b.push(encodeURIComponent(c) + "=" + encodeURIComponent(a[c]));
        return "mode=json2&" + b.join("&")
    }
    ;
    im._buildItem = function(a, b, c) {
        this.zoneToId[a.zoneId] = a.id;
        a.passons && (a.passon = a.passons);
        if (!(c && c.AMPcallback || a.callback || ("string" == typeof a.id ? document.getElementById(a.id) : a.id)))
            throw Error("No callback and invalid ID passed to IM (" + a.id + ")");
        c = [];
        for (var e = 0; e < this.conf.params.length; e++) {
            var f = this.conf.params[e];
            if (f in a) {
                var h = a[f]
                  , f = encodeURIComponent(f) + "-" + b;
                if ("object" == typeof h)
                    for (var g in h)
                        c.push(f + "." + encodeURIComponent(g) + "=" + encodeURIComponent(h[g]));
                else
                    c.push(f + "=" + encodeURIComponent(h))
            }
        }
        return c.join("&")
    }
    ;
    im._logAds = function(a) {
        if (window.DOT) {
            for (var b = {}, c = 0; c < a.length; c++)
                b[a[c].zoneId] = !0;
            a = [];
            for (var e in b)
                e in {} || a.push(e);
            DOT.hit("ad", {
                d: {
                    zones: a.join(",")
                }
            })
        }
    }
    ;
    im._parseVideoAd = function(a, b) {
        var c, e = [];
        c = a.replace(/\x3c!--(.*?)--\x3e/g, function(a, b) {
            e.push(b);
            return ""
        });
        for (var f = 0; f < e.length; f++) {
            var h = document.createComment(e[f]);
            0 == f ? b.parentNode.insertBefore(h, b) : b.parentNode.insertBefore(h, b.nextSibling)
        }
        c = c.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'");
        if (f = c.match(/^\s*<img *src *= *(['"])(.*?)\1[^>]*\/>\s*$/i))
            return [{
                miss: f[2]
            }];
        c = c.replace(/<img.*?\/>/g, "");
        c = c.replace(/}\s*{/g, "},{");
        return c.match(/^[\s]*$/) ? null : eval("[" + c + "]")
    }
    ;
    im._receiveMessage = function(a) {
        var b = a.data;
        if ("string" == typeof edata)
            try {
                b = JSON.parse(b)
            } catch (c) {
                return
            }
        if ("fallback" == b.msg || "passback" == b.msg)
            for (b = 0; b < im._iframes.length; b++)
                if (im._iframes[b] && im._iframes[b].iframe && im._iframes[b].iframe.contentWindow == a.source) {
                    d = im._iframes[b];
                    break
                }
    }
    ;
    window.addEventListener ? window.addEventListener("message", im._receiveMessage, !1) : window.attachEvent && window.attachEvent("onmessage", im._receiveMessage);
    im._parseOpt = function(a) {}
}
;//# sourceMappingURL=im3.js.map
