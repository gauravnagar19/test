// MrBukLau's Scriptlets

"use strict";

/**********************/
/* Generic Scriptlets */
/**********************/
///bpass-paywalls-clean.js
/// alias bpc.js
(function() {
    "use strict";
    function removeDOMElement() {
        for (var i = 0; i < arguments.length; i++) {
            var element = arguments[i];
            if (element)
                element.remove();
        }
    }

    function matchDomain(domains, hostname) {
        var matched_domain = false;
        if (!hostname)
            hostname = window.location.hostname;
        if (typeof domains === 'string')
            domains = [domains];
        domains.some(function(domain) {
            if ((hostname === domain || hostname.endsWith('.' + domain))) {
                matched_domain = domain;
                return true;
            }
        });
        return matched_domain;
    }

    function amp_iframes_replace(weblink, source) {
        var amp_iframes = document.querySelectorAll('amp-iframe' + (source ? '[src*="'+ source + '"]' : ''));
        var par, elem;
        for (var i = 0; i < amp_iframes.length; i++) {
            var amp_iframe = amp_iframes[i];
            if (!weblink) {
                elem = document.createElement('iframe');
                elem.src = amp_iframe.getAttribute('src');
                elem.sandbox = amp_iframe.getAttribute('sandbox');
                elem.height = amp_iframe.getAttribute('height');
                elem.width = 'auto';
                elem.style.border = '0px';
                amp_iframe.parentNode.replaceChild(elem, amp_iframe);
            } else {
                par = document.createElement('p');
                elem = document.createElement('a');
                elem.innerText = 'Media-link';
                elem.setAttribute('href', amp_iframe.getAttribute('src'));
                elem.setAttribute('target', '_blank');
                par.appendChild(elem);
                amp_iframe.parentNode.replaceChild(par, amp_iframe);
            }
        }
    }

    function amp_unhide_subscr_section(amp_ads_sel, replace_iframes, amp_iframe_link, source) {
        var preview = document.querySelectorAll('[subscriptions-section="content-not-granted"]');
        removeDOMElement.apply(null, preview);
        var subscr_section = document.querySelectorAll('[subscriptions-section="content"]');
        for (var i = 0; i < subscr_section.length; i++) {
            var elem = subscr_section[i];
            elem.removeAttribute('subscriptions-section');
        }
        var amp_ads = document.querySelectorAll(amp_ads_sel);
        removeDOMElement.apply(null, amp_ads);
        if (replace_iframes)
            amp_iframes_replace(amp_iframe_link, source);
    }

    if (matchDomain('wsj.com')) {
        var url = window.location.href;
        if (location.href.indexOf('/articles/') !== -1) {
            var close_button = document.querySelector('div.close-btn[role="button"]');
            if (close_button)
                close_button.click();
        }
        var wsj_ads = document.querySelectorAll('div[class*="wsj-ad"], div[class*="BodyAdWrapper"]');
        removeDOMElement.apply(null, wsj_ads);
        if (url.indexOf('/amp/') !== -1) {
            var masthead_link = document.querySelector('div.masthead > a[href*="/articles/"]');
            if (masthead_link)
                masthead_link.href = 'https://www.wsj.com';
            amp_unhide_subscr_section(null, true, null, null);
            var login = document.querySelector('div.login-section-container');
            removeDOMElement(login);
            var amp_images = document.querySelectorAll('amp-img');
            for (var i = 0; i < amp_images.length; i++) {
                var amp_img = amp_images[i];
                var img_new = document.createElement('img');
                img_new.src = amp_img.getAttribute('src');
                amp_img.parentNode.replaceChild(img_new, amp_img);
            }
        } else {
            var snippet = document.querySelector('.snippet-promotion, div#cx-snippet-overlay');
            var wsj_pro = document.querySelector('meta[name="page.site"][content="wsjpro"]');
            if (snippet || wsj_pro) {
                removeDOMElement(snippet, wsj_pro);
                window.location.href = url.replace('wsj.com', 'wsj.com/amp');
            }
        }
    }
})();

/// bypass-streaming-url-shortener.js
/// alias bsus.js
(function() {
    window.addEventListener("DOMContentLoaded", function() {
        document.querySelector("a[id^='newskip-btn-']").click();
    });
})();

/// get-url-parameter.js
/// alias gup.js
(function() {
    if (window.location.href.includes("?url=") || window.location.href.includes("&url=")) {
        let urlParams = new URLSearchParams(window.location.search);
        let urlReplacement = urlParams.get("url");
        if (window.location.href.match("url=http")) {
            window.location.replace(urlReplacement);
        } else {
            window.location.replace("https://" + urlReplacement);
        }
    }
})();

/***********************/
/* Specific Scriptlets */
/***********************/
/// amazon-url-cleaner.js
/// alias auc.js
(function() {
    window.addEventListener("load", function() {
        let asin = document.getElementById("ASIN");
        if (asin) {
            let url = document.location.protocol + "//" + document.location.host + "/dp/" + asin.value + "/";
            if (url === document.location.href) {
                return;
            }
            window.history.replaceState(null, null, url);
        }
    });
})();

/// apple-music-artwork-format-and-size-changer.js
/// alias amafasc.js
(function() {
    if (window.location.href.includes(".mzstatic.com/image/thumb/")) {
        if (window.location.href.match("190x190") && window.location.href.match(".webp")) {
            window.location.replace(window.location.toString().replace("190x190", "2000x2000").replace(".webp", ".jpeg"));
        } else if (window.location.href.match("200x200") && window.location.href.match(".webp")) {
            window.location.replace(window.location.toString().replace("200x200", "2000x2000").replace(".webp", ".jpeg"));
        } else if (window.location.href.match("270x270") && window.location.href.match(".webp")) {
            window.location.replace(window.location.toString().replace("270x270", "2000x2000").replace(".webp", ".jpeg"));
        } else if (window.location.href.match("296x296") && window.location.href.match(".webp")) {
            window.location.replace(window.location.toString().replace("296x296", "2000x2000").replace(".webp", ".jpeg"));
        } else if (window.location.href.match("300x300") && window.location.href.match(".webp")) {
            window.location.replace(window.location.toString().replace("300x300", "2000x2000").replace(".webp", ".jpeg"));
        } else if (window.location.href.match("305x305") && window.location.href.match(".webp")) {
            window.location.replace(window.location.toString().replace("305x305", "2000x2000").replace(".webp", ".jpeg"));
        } else if (window.location.href.match("316x316") && window.location.href.match(".webp")) {
            window.location.replace(window.location.toString().replace("316x316", "2000x2000").replace(".webp", ".jpeg"));
        } else if (window.location.href.match("380x380") && window.location.href.match(".webp")) {
            window.location.replace(window.location.toString().replace("380x380", "2000x2000").replace(".webp", ".jpeg"));
        } else if (window.location.href.match("400x400") && window.location.href.match(".webp")) {
            window.location.replace(window.location.toString().replace("400x400", "2000x2000").replace(".webp", ".jpeg"));
        } else if (window.location.href.match("500x500") && window.location.href.match(".webp")) {
            window.location.replace(window.location.toString().replace("500x500", "2000x2000").replace(".webp", ".jpeg"));
        } else if (window.location.href.match("540x540") && window.location.href.match(".webp")) {
            window.location.replace(window.location.toString().replace("540x540", "2000x2000").replace(".webp", ".jpeg"));
        } else if (window.location.href.match("592x592") && window.location.href.match(".webp")) {
            window.location.replace(window.location.toString().replace("592x592", "2000x2000").replace(".webp", ".jpeg"));
        } else if (window.location.href.match("600x600") && window.location.href.match(".webp")) {
            window.location.replace(window.location.toString().replace("600x600", "2000x2000").replace(".webp", ".jpeg"));
        } else if (window.location.href.match("610x610") && window.location.href.match(".webp")) {
            window.location.replace(window.location.toString().replace("610x610", "2000x2000").replace(".webp", ".jpeg"));
        } else if (window.location.href.match("632x632") && window.location.href.match(".webp")) {
            window.location.replace(window.location.toString().replace("632x632", "2000x2000").replace(".webp", ".jpeg"));
        } else if (window.location.href.match("1000x1000") && window.location.href.match(".webp")) {
            window.location.replace(window.location.toString().replace("1000x1000", "2000x2000").replace(".webp", ".jpeg"));
        }
    }
})();

/// apple-music-japanese-to-english-album-translator.js
/// alias amjteat.js
(function() {
    if (window.location.href.includes("/music.apple.com/jp/album/")) {
        let oldUrlSearch = window.location.search;
        let urlParams = new URLSearchParams(oldUrlSearch);
        if (urlParams.has("l") === false) {
            if (oldUrlSearch.indexOf("?") === -1) {
                if (!/\?l=en/.test(oldUrlSearch)) {
                    window.location.replace(window.location.protocol + "//" + window.location.host + window.location.pathname + oldUrlSearch + "?l=en" + window.location.hash);
                }
            } else {
                if (!/\&l=en/.test(oldUrlSearch)) {
                    window.location.replace(window.location.protocol + "//" + window.location.host + window.location.pathname + oldUrlSearch + "&l=en" + window.location.hash);
                }
            }
        }
    }
})();

/// github-gist-target-attribute-setter.js
/// alias ggtas.js
(function() {
    window.addEventListener("load", function() {
        document.querySelectorAll("article[itemprop='text'] > p[dir='auto'] > a[href^='http']").forEach(function(a) {
            a.setAttribute("target", "_blank");
        });
        document.querySelectorAll("article[itemprop='text'] > ul[dir='auto'] > li > a[href^='http']").forEach(function(b) {
            b.setAttribute("target", "_blank");
        });
    });
})();

/// hikarinoakariost-bypasser.js
/// alias hnab.js
(function() {
    if (window.location.href.includes("/hikarinoakari.com/out/")) {
        setTimeout(function() {
            document.querySelector("a[class='link']").click();
        }, 750);
    }
})();

/// nyaa-dark-mode-enabler.js
/// alias ndme.js
(function() {
    window.addEventListener("DOMContentLoaded", function() {
        if (!document.body.classList.contains("dark")) {
            document.querySelector("a[id='themeToggle']").click();
        }
    });
})();

/// old-reddit-redirector.js
/// alias orr.js
(function() {
    if (window.location.href.includes("/www.reddit.com/") && !window.location.href.includes("/www.reddit.com/gallery/") && !window.location.href.includes("/www.reddit.com/poll/")) {
        window.location.replace(window.location.toString().replace("/www.reddit.com/", "/old.reddit.com/"));
    }
})();

/// ouo-io-bypasser.js
/// alias oib.js
(function() {
    window.addEventListener("load", function() {
        if (document.getElementById("form-captcha") === null) {
            document.getElementsByTagName("form")[0].submit();
        }
        if (document.getElementById("form-captcha").click) {
            document.getElementsByTagName("form")[0].submit();
        }
    });
})();

/// rentry-target-attribute-setter.js
/// alias rtas.js
(function() {
    window.addEventListener("load", function() {
        document.querySelectorAll("a[href^='http']").forEach(function(a) {
            a.setAttribute("target", "_blank");
        });
    });
})();

/// youtube-shorts-redirector.js
/// alias ysr.js
(function() {
    let oldHref = document.location.href;
    if (window.location.href.indexOf("youtube.com/shorts") > -1) {
        window.location.replace(window.location.toString().replace("/shorts/", "/watch?v="));
    }
    window.onload = function() {
        let bodyList = document.querySelector("body");
        let observer = new MutationObserver(function(mutations) {
            mutations.forEach(function() {
                if (oldHref !== document.location.href) {
                    oldHref = document.location.href;
                    if (window.location.href.indexOf("youtube.com/shorts") > -1) {
                        window.location.replace(window.location.toString().replace("/shorts/", "/watch?v="));
                    }
                }
            });
        });
        let config = {
            childList: true,
            subtree: true
        };
        observer.observe(bodyList, config);
    };
})();
