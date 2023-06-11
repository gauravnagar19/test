// MrBukLau's Scriptlets

"use strict";

/**********************/
/* Generic Scriptlets */
/**********************/
/// namedFunction.js
/// alias named.js
function namedFunction() {
	console.log("named");
        // General Functions
        function matchDomain(domains, hostname) {
          var matched_domain = false;
          if (!hostname)
            hostname = window.location.hostname;
          if (typeof domains === 'string')
            domains = [domains];
          domains.some(domain => (hostname === domain || hostname.endsWith('.' + domain)) && (matched_domain = domain));
          return matched_domain;
        }
        function urlHost(url) {
          if (/^http/.test(url)) {
            try {
              return new URL(url).hostname;
            } catch (e) {
              console.log(`url not valid: ${url} error: ${e}`);
            }
          }
          return url;
        }
        function matchUrlDomain(domains, url) {
          return matchDomain(domains, urlHost(url));
        }
        function matchCookies(name) {
          return document.cookie.split(';').filter(x => x.trim().match(name)).map(y => y.split('=')[0].trim())
        }
        function setCookie(names, value, domain = '', path = '/', days = 0) {
          var max_age = days * 24 * 60 * 60;
          let ck_names = Array.isArray(names) ? names : [];
          if (names instanceof RegExp)
            ck_names = matchCookies(names);
          else if (typeof names === 'string')
            ck_names = [names];
          for (let ck_name of ck_names) {
            document.cookie = ck_name + "=" + (value || "") + (domain ? "; domain=" + domain : '') + (path ? "; path=" + path : '') + "; max-age=" + max_age;
          }
          window.localStorage.clear();
        }
        function cookieExists(name) {
          return document.cookie.split(';').some(ck => ck.trim().indexOf(name + '=') === 0)
        }
        function removeDOMElement(...elements) {
          for (let element of elements) {
            if (element)
              element.remove();
          }
        }
        function hideDOMElement(...elements) {
          for (let element of elements) {
            if (element)
              element.style = 'display:none;';
          }
        }
        function waitDOMElement(selector, tagName = '', callback, multiple = false) {
          new window.MutationObserver(function (mutations) {
            for (let mutation of mutations) {
              for (let node of mutation.addedNodes) {
                if (!tagName || (node.tagName === tagName)) {
                  if (node.matches(selector)) {
                    callback(node);
                    if (!multiple)
                      this.disconnect();
                  }
                }
              }
            }
          }).observe(document, {
            subtree: true,
            childList: true
          });
        }
        function waitDOMAttribute(selector, tagName = '', attributeName = '', callback, multiple = false) {
          let targetNode = document.querySelector(selector);
          if (!targetNode)
            return;
          new window.MutationObserver(function (mutations) {
            for (let mutation of mutations) {
              if (mutation.target.attributes[attributeName]) {
                callback(mutation.target);
                if (!multiple)
                  this.disconnect();
              }
            }
          }).observe(targetNode, {
            attributes: true,
            attributeFilter: [attributeName]
          });
        }
        function parseHtmlEntities(encodedString) {
          let parser = new DOMParser();
          let doc = parser.parseFromString('<textarea>' + encodedString + '</textarea>', 'text/html');
          let dom = doc.querySelector('textarea');
          return dom.value;
        }
        function encode_utf8(str) {
          return unescape(encodeURIComponent(str));
        }
        function decode_utf8(str) {
          return decodeURIComponent(escape(str));
        }
        function replaceDomElementExt(url, proxy, base64, selector, text_fail = '', selector_source = selector) {
          let proxyurl = proxy ? '' : '';
          let article = document.querySelector(selector);
          let options = { headers: { "Content-Type": "text/plain", "X-Requested-With": "XMLHttpRequest" } };
          if (matchUrlDomain('espn.com', url))
            options.headers['X-Forwarded-For'] = randomIP(185, 185);
          fetch(proxyurl + url, options)
            .then(response => {
              if (response.ok) {
                response.text().then(html => {
                  if (base64) {
                    html = decode_utf8(atob(html));
                    selector_source = 'body';
                  }
                  let parser = new DOMParser();
                  let doc = parser.parseFromString(html, 'text/html');
                  let article_new = doc.querySelector(selector_source);
                  if (article_new) {
                    if (article && article.parentNode)
                      article.parentNode.replaceChild(article_new, article);
                  }
                });
              } else {
                console.log('no content/article');
              }
            }).catch(function (err) {
              console.log('no content/article');
            });
        }
        function refreshCurrentTab() {
          window.location.reload(true);
        }
        function archiveLink(url, text_fail = 'BPC > Full article text (only report issue if not working for over a week):\r\n') {
          return externalLink(['archive.today', 'archive.is'], 'https://{domain}?run=1&url={url}', url, text_fail);
        }
        function googleWebcacheLink(url, text_fail = 'BPC > Full article text:\r\n') {
          return externalLink(['webcache.googleusercontent.com'], 'https://{domain}/search?q=cache:{url}', url, text_fail);
        }
        function ext_12ftLink(url, text_fail = 'BPC > Full article text:\r\n') {
          return externalLink(['12ft.io'], 'https://{domain}/{url}', url, text_fail);
        }
        function externalLink(domains, ext_url_templ, url, text_fail = 'BPC > Full article text:\r\n') {
          let text_fail_div = document.createElement('div');
          text_fail_div.id = 'bpc_archive';
          text_fail_div.setAttribute('style', 'margin: 20px; font-weight: bold; color: red;');
          let parser = new DOMParser();
          text_fail = text_fail.replace(/\[([^\]]+)\]/g, "<a href='$1' target='_blank' style='color: red'>$1</a>");
          let doc = parser.parseFromString('<span>' + text_fail + '</span>', 'text/html');
          let elem = doc.querySelector('span');
          text_fail_div.appendChild(elem);
          for (let domain of domains) {
            let ext_url = ext_url_templ.replace('{domain}', domain).replace('{url}', url.split('?')[0]);
            let a_link = document.createElement('a');
            a_link.innerText = domain;
            a_link.href = ext_url;
            a_link.target = '_blank';
            text_fail_div.appendChild(document.createTextNode(' | '));
            text_fail_div.appendChild(a_link);
          }
          return text_fail_div;
        }
        function removeClassesByPrefix(el, prefix) {
          let el_classes = el.classList;
          for (let el_class of el_classes) {
            if (el_class.startsWith(prefix))
              el_classes.remove(el_class);
          }
        }
        function removeClassesList(list) {
          for (let class_item of list) {
            let elems = document.querySelectorAll('.' + class_item);
            for (let elem of elems)
              elem.classList.remove(class_item);
          }
        }
        function amp_iframes_replace(weblink = false, source = '') {
          let amp_iframes = document.querySelectorAll('amp-iframe' + (source ? '[src*="' + source + '"]' : ''));
          let par, elem;
          for (let amp_iframe of amp_iframes) {
            if (!weblink) {
              elem = document.createElement('iframe');
              Object.assign(elem, {
                src: amp_iframe.getAttribute('src'),
                sandbox: amp_iframe.getAttribute('sandbox'),
                height: amp_iframe.getAttribute('height'),
                width: 'auto',
                style: 'border: 0px;'
              });
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
        function amp_unhide_subscr_section(amp_ads_sel = 'amp-ad, .ad', replace_iframes = true, amp_iframe_link = false, source = '') {
          let preview = document.querySelectorAll('[subscriptions-section="content-not-granted"]');
          removeDOMElement(...preview);
          let subscr_section = document.querySelectorAll('[subscriptions-section="content"]');
          for (let elem of subscr_section)
            elem.removeAttribute('subscriptions-section');
          let amp_ads = document.querySelectorAll(amp_ads_sel);
          removeDOMElement(...amp_ads);
          if (replace_iframes)
            amp_iframes_replace(amp_iframe_link, source);
        }
        function amp_unhide_access_hide(amp_access = '', amp_access_not = '', amp_ads_sel = 'amp-ad, .ad', replace_iframes = true, amp_iframe_link = false, source = '') {
          let access_hide = document.querySelectorAll('[amp-access' + amp_access + '][amp-access-hide]:not([amp-access="error"], [amp-access^="message"], .piano)');
          for (let elem of access_hide)
            elem.removeAttribute('amp-access-hide');
          if (amp_access_not) {
            let amp_access_not_dom = document.querySelectorAll('[amp-access' + amp_access_not + ']');
            removeDOMElement(...amp_access_not_dom);
          }
          let amp_ads = document.querySelectorAll(amp_ads_sel);
          removeDOMElement(...amp_ads);
          if (replace_iframes)
            amp_iframes_replace(amp_iframe_link, source);
        }
        function insert_script(func, insertAfterDom) {
          let bpc_script = document.querySelector('script#bpc_script');
          if (!bpc_script) {
            let script = document.createElement('script');
            script.setAttribute('id', 'bpc_script');
            script.appendChild(document.createTextNode('(' + func + ')();'));
            let insertAfter = insertAfterDom ? insertAfterDom : (document.body || document.head || document.documentElement);
            insertAfter.appendChild(script);
          }
        }
        function getArticleJsonScript() {
          let scripts = document.querySelectorAll('script[type="application/ld+json"]');
          let json_script;
          for (let script of scripts) {
            if (script.innerText.match(/"(articlebody|text)":/i)) {
              json_script = script;
              break;
            }
          }
          return json_script;
        }
        function randomInt(max) {
          return Math.floor(Math.random() * Math.floor(max));
        }
        function randomIP(range_low = 0, range_high = 223) {
          let rndmIP = [];
          for (let n = 0; n < 4; n++) {
            if (n === 0)
              rndmIP.push(range_low + randomInt(range_high - range_low + 1));
            else
              rndmIP.push(randomInt(255) + 1);
          }
          return rndmIP.join('.');
        }
        function pageContains(selector, text) {
          let elements = document.querySelectorAll(selector);
          return Array.prototype.filter.call(elements, function (element) {
            return RegExp(text).test(element.textContent);
          });
        }
    //   window.addEventListener("DOMContentLoaded", function() { 
    //     let snippet = document.querySelector('.snippet-promotion, div#cx-snippet-overlay');
    //     let wsj_pro = document.querySelector('meta[name="page.site"][content="wsjpro"]');
    //     console.log("named1: ",wsj_pro, snippet);
    //     if (snippet || wsj_pro) {
    //       removeDOMElement(snippet, wsj_pro);
    //       window.location.href = url.replace('wsj.com', 'wsj.com/amp');
    //     }
    //   });
    window.addEventListener("DOMContentLoaded", function() {
      if (matchDomain('wsj.com')) {
          let url = window.location.href;
          if (location.href.includes('/articles/')) {
            let close_button = document.querySelector('div.close-btn[role="button"]');
            if (close_button)
              close_button.click();
          }
          let wsj_ads = document.querySelectorAll('div[class*="wsj-ad"], div[class*="BodyAdWrapper"]');
          removeDOMElement(...wsj_ads);
          if (url.includes('/amp/')) {
            let masthead_link = document.querySelector('div.masthead > a[href*="/articles/"]');
            if (masthead_link)
              masthead_link.href = 'https://www.wsj.com';
            amp_unhide_subscr_section();
            let login = document.querySelector('div.login-section-container');
            removeDOMElement(login);
            let amp_images = document.querySelectorAll('amp-img');
            for (let amp_img of amp_images) {
              let img_new = document.createElement('img');
              img_new.src = amp_img.getAttribute('src');
              amp_img.parentNode.replaceChild(img_new, amp_img);
            }
          } else {
            let snippet = document.querySelector('.snippet-promotion, div#cx-snippet-overlay');
            let wsj_pro = document.querySelector('meta[name="page.site"][content="wsjpro"]');
            if (snippet || wsj_pro) {
              removeDOMElement(snippet, wsj_pro);
              window.location.href = url.replace('wsj.com', 'wsj.com/amp');
            }
          }
        }
  });
}
namedFunction();
/// bpass-paywalls-clean.js
/// alias bpc.js
(function() {
    if (window.location.href.indexOf("wsj.com") > -1) { 
      window.addEventListener("DOMContentLoaded", function() {
          console.log("start 1");
          document.querySelectorAll('.snippet-promotion, div#cx-snippet-overlay').forEach(e => console.log("e1: ",e));
          let myDiv = document.getElementById("cx-snippet-overlay");
          console.log("myDiv1: ",myDiv);
          console.log("end 1");
      });
      window.addEventListener("load", function() { 
          console.log("start 2");
          document.querySelectorAll('.snippet-promotion, div#cx-snippet-overlay').forEach(e => console.log("e2: ",e));
          let myDiv = document.getElementById("cx-snippet-overlay");
          console.log("myDiv2: ",myDiv);
          console.log("end 2");
      });
      window.addEventListener("load", function() { 
          var snippet = document.querySelector('.snippet-promotion, div#cx-snippet-overlay');
          var wsj_pro = document.querySelector('meta[name="page.site"][content="wsjpro"]');
          console.log("myDiv31: ",snippet, wsj_pro);
          if (snippet || wsj_pro) {
            //removeDOMElement(snippet, wsj_pro);
            console.log("myDiv32: ",snippet, wsj_pro);
            window.location.href = url.replace('wsj.com', 'wsj.com/amp');
          }
      });
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
    if (window.location.href.indexOf("nytimes.com") > -1) { 
      console.log("G2");
    }
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
