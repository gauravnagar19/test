// MrBukLau's Scriptlets

"use strict";

/**********************/
/* Generic Scriptlets */
/**********************/
/// Bypass-Paywall.js
/// alias bpc.js
(function () {
  'use strict';
  console.log("g1");
  if (matchDomain('nzherald.co.nz')) {
    function nzherald_main() {
      if (window.Fusion)
        window.Fusion.globalContent.isPremium = false;
    }
    window.setTimeout(function () {
      insert_script(nzherald_main);
    }, 100);
  }
  else if (matchDomain(['thehindu.com', 'thehindubusinessline.com'])) {
    function hindu_main() {
      if (window) {
        window.Adblock = false;
        window.isNonSubcribed = false;
      }
    }
    window.setTimeout(function () {
      insert_script(hindu_main);
    }, 100);
  }
  else if (matchDomain('thetimes.co.uk')) {
    waitDOMAttribute('body', 'BODY', 'style', node => node.removeAttribute('style'), true);
    waitDOMAttribute('html', 'HTML', 'style', node => node.removeAttribute('style'), true);
  }
  else if (matchDomain('webcache.googleusercontent.com')) {
    window.setTimeout(function () {
      if (window.location.search.includes('q=cache:https://www.dn.no')) {
        let preview = document.querySelector('html.dn-preview-page');
        if (preview)
          preview.removeAttribute('class');
        let infobox_content = document.querySelector('div.infobox__content');
        if (infobox_content)
          infobox_content.removeAttribute('class');
        let lazy_images = document.querySelectorAll('img[class*="lazy"][data-srcset]:not([src])');
        for (let elem of lazy_images) {
          elem.src = elem.getAttribute('data-srcset').split(' ')[0];
          if (elem.classList.contains('lazy'))
            elem.classList.remove('lazy');
          else
            elem.removeAttribute('class');
        }
        let ads = document.querySelectorAll('div[id^="googlead-"]');
        removeDOMElement(...ads);
      } else if (window.location.search.includes('q=cache:https://www.newscientist.com')) {
        let lazy_images = document.querySelectorAll('img.lazyload[data-src]:not([src])');
        for (let elem of lazy_images)
          elem.src = elem.getAttribute('data-src').split('?')[0] + '?width=800';
        let ads = document.querySelectorAll('div[class*="Advert"]');
        removeDOMElement(...ads);
      }
    }, 1000);
  }
  window.setTimeout(function () {
    var mobile = window.navigator.userAgent.toLowerCase().includes('mobile');
    var csDoneOnce;
    var ca_torstar_domains = ['niagarafallsreview.ca', 'stcatharinesstandard.ca', 'thepeterboroughexaminer.com', 'therecord.com', 'thespec.com', 'thestar.com', 'wellandtribune.ca'];
    var no_nhst_media_domains = ['europower-energi.no', 'fiskeribladet.no', 'intrafish.com', 'intrafish.no', 'rechargenews.com', 'tradewindsnews.com', 'upstreamonline.com'];
    var uk_nat_world_domains = ['scotsman.com', 'yorkshirepost.co.uk'];
    var usa_adv_local_domains = ['al.com', 'cleveland.com', 'lehighvalleylive.com', 'masslive.com', 'mlive.com', 'nj.com', 'oregonlive.com', 'pennlive.com', 'silive.com', 'syracuse.com'];
    var usa_arizent_custom_domains = ['accountingtoday.com', 'benefitnews.com', 'bondbuyer.com', 'dig-in.com', 'financial-planning.com', 'nationalmortgagenews.com'];
    var usa_conde_nast_domains = ['architecturaldigest.com', 'bonappetit.com', 'epicurious.com,', 'gq.com', 'newyorker.com', 'vanityfair.com', 'vogue.com', 'wired.com'];
    var usa_craincomm_domains = ['adage.com', 'autonews.com', 'chicagobusiness.com', 'crainscleveland.com', 'crainsdetroit.com', 'crainsnewyork.com', 'modernhealthcare.com'];
    var usa_hearst_comm_domains = ['expressnews.com', 'houstonchronicle.com', 'sfchronicle.com'];
    var domain;
    var usa_lee_ent_domains = ['buffalonews.com', 'journalnow.com', 'omaha.com', 'richmond.com', 'tucson.com', 'tulsaworld.com'];
    var usa_madavor_domains = ['birdwatchingdaily.com', 'digitalphotopro.com', 'dpmag.com', 'jazztimes.com', 'outdoorphotographer.com', 'planeandpilotmag.com', 'writermag.com'];
    var usa_mcc_domains = ['bnd.com', 'charlotteobserver.com', 'fresnobee.com', 'kansas.com', 'kansascity.com', 'kentucky.com', 'mcclatchydc.com', 'miamiherald.com', 'newsobserver.com', 'sacbee.com', 'star-telegram.com', 'thestate.com', 'tri-cityherald.com'];
    var usa_mng_domains = ['denverpost.com', 'eastbaytimes.com', 'mercurynews.com', 'ocregister.com', 'pe.com', 'twincities.com'];
    var usa_outside_mag_domains = ["backpacker.com", "betamtb.com", "betternutrition.com", "cleaneatingmag.com", "climbing.com", "cyclingtips.com", "gymclimber.com", "outsideonline.com", "oxygenmag.com", "pelotonmagazine.com", "podiumrunner.com", "rockandice.com", "skimag.com", "trailrunnermag.com", "triathlete.com", "vegetariantimes.com", "velonews.com", "womensrunning.com", "yogajournal.com"];
    var usa_tribune_domains = ['baltimoresun.com', 'chicagotribune.com', 'courant.com', 'dailypress.com', 'mcall.com', 'nydailynews.com', 'orlandosentinel.com', 'pilotonline.com', 'sun-sentinel.com'];
    if (matchDomain('gitlab.com') && window.location.pathname.startsWith('/magnolia1234')) {
      let bio = document.querySelector('p.profile-user-bio');
      if (bio) {
        let split = bio.innerText.split(/(https:[\w\-/.]+)|\|/g).filter(x => x && x.trim());
        bio.innerText = '';
        for (let part of split) {
          let elem;
          if (part.startsWith('https')) {
            elem = document.createElement('a');
            elem.innerText = part;
            elem.href = part;
            elem.appendChild(document.createElement('br'));
          } else {
            elem = document.createElement('b');
            elem.appendChild(document.createTextNode(part));
            if (!part.includes(':'))
              elem.appendChild(document.createElement('br'));
          }
          bio.appendChild(elem);
        }
      }
    }
    else if (window.location.hostname.match(/\.(com|net)\.au$/)) {//australia
      if (matchDomain('thesaturdaypaper.com.au')) {
        let hide_end = document.querySelector('div.hide-end');
        if (hide_end)
          refreshCurrentTab();
        let paywall = document.querySelector('div.paywall-hard-always-show');
        removeDOMElement(paywall);
      }
      else if (matchDomain(['brisbanetimes.com.au', 'smh.com.au', 'theage.com.au', 'watoday.com.au'])) {
        if (!window.location.hostname.startsWith('amp.')) {
          let paywall = document.querySelector('meta[content^="FOR SUBSCRIBERS"], #paywall_prompt');
          let amphtml = document.querySelector('link[rel="amphtml"]');
          if (paywall && amphtml) {
            removeDOMElement(paywall);
            window.location.href = amphtml.href;
          }
        } else {
          amp_unhide_subscr_section();
        }
      }
      else {
        // Australian Community Media newspapers
        let au_comm_media_domains = ['bendigoadvertiser.com.au', 'bordermail.com.au', 'canberratimes.com.au', 'centralwesterndaily.com.au', 'dailyadvertiser.com.au', 'dailyliberal.com.au', 'examiner.com.au', 'illawarramercury.com.au', 'newcastleherald.com.au', 'northerndailyleader.com.au', 'standard.net.au', 'theadvocate.com.au', 'thecourier.com.au', 'westernadvocate.com.au'];
        if (matchDomain(au_comm_media_domains)) {
          let mask = document.querySelector('div[style*="mask-image"]');
          if (mask) {
            mask.removeAttribute('style');
            let div_hidden = document.querySelectorAll('div.hidden');
            for (let elem of div_hidden)
              elem.classList.remove('hidden');
          } else {
            let subscribe_truncate = document.querySelector('.subscribe-truncate');
            if (subscribe_truncate)
              subscribe_truncate.classList.remove('subscribe-truncate');
            let subscriber_hiders = document.querySelectorAll('.subscriber-hider');
            for (let subscriber_hider of subscriber_hiders)
              subscriber_hider.classList.remove('subscriber-hider');
          }
          let blocker = document.querySelector('div.blocker');
          let overlays = document.querySelectorAll('div.transition-all, div[id^="headlessui-dialog"]');
          let noscroll = document.querySelectorAll('html[style], body[style]');
          for (let elem of noscroll)
            elem.removeAttribute('style');
          let story_generic_iframe = document.querySelector('.story-generic__iframe');
          let ads = document.querySelectorAll('.ad-placeholder, .sticky, [id*="-container"], #hindsight-ads-iframe');
          removeDOMElement(story_generic_iframe, blocker, ...overlays, ...ads);
        } else if (window.location.hostname.endsWith('.com.au')) {
          // Australia News Corp
          let au_news_corp_domains = ['adelaidenow.com.au', 'cairnspost.com.au', 'codesports.com.au', 'couriermail.com.au', 'dailytelegraph.com.au', 'geelongadvertiser.com.au', 'goldcoastbulletin.com.au', 'heraldsun.com.au', 'ntnews.com.au', 'theaustralian.com.au', 'thechronicle.com.au', 'themercury.com.au', 'townsvillebulletin.com.au', 'weeklytimesnow.com.au'];
          let au_news_corp_no_amp_fix = ['adelaidenow.com.au', 'codesports.com.au', 'goldcoastbulletin.com.au', 'ntnews.com.au', 'thechronicle.com.au', 'themercury.com.au', 'weeklytimesnow.com.au'];
          if (matchDomain(au_news_corp_domains)) {
            let url = window.location.href;
            if (url.includes('/subscribe/') && !matchDomain(au_news_corp_no_amp_fix)) {
              if (!url.includes('/digitalprinteditions') && url.includes('dest=') && url.split('dest=')[1].split('&')[0]) {
                let url_new = decodeURIComponent(url.split('dest=')[1].split('&')[0]) + '?amp';
                window.setTimeout(function () {
                  window.location.href = url_new;
                }, 500);
              }
            } else if (window.location.hostname.startsWith('amp.') || window.location.search.match(/(\?|&)amp/)) {
              let figure_stretch = document.querySelectorAll('figure.stretch');
              for (let elem of figure_stretch)
                elem.classList.remove('stretch');
              let amp_ads_sel = 'amp-ad, amp-embed, [id^="ad-mrec-"], [class*="ad-container"]';
              let comments;
              if (window.location.hostname.startsWith('amp.')) {
                amp_unhide_subscr_section(amp_ads_sel, true, true, '.newscdn.com.au');
                comments = document.querySelector('#story-comments, .comments-wrapper');
              } else if (window.location.search.match(/(\?|&)amp/)) {
                amp_unhide_subscr_section(amp_ads_sel, true, true, '.newscdn.com.au');
                comments = document.querySelector('#comments-load, .comments-module');
                let amp_iframe_sizers = document.querySelectorAll('amp-iframe > i-amphtml-sizer');
                removeDOMElement(...amp_iframe_sizers)
              }
              removeDOMElement(comments);
            } else {
              if (matchDomain('codesports.com.au')) {
                let lazy_images = document.querySelectorAll('img.lazyload[data-src]:not([src])');
                for (let elem of lazy_images) {
                  elem.src = elem.getAttribute('data-src');
                  elem.classList.remove('lazyload');
                }
              }
              let ads = document.querySelectorAll('.header_ads-container, .ad-block, .ad-container');
              removeDOMElement(...ads);
            }
          } else {
            // Australian Seven West Media
            if (matchDomain('thewest.com.au') || document.querySelector('li > a[href*=".sevenwestmedia.com.au"]')) {
              window.setTimeout(function () {
                let breach_screen = document.querySelector('div.paywall div[data-testid*="BreachScreen"], div[class*="StyledBreachWallContent"]');
                if (breach_screen) {
                  let scripts = document.querySelectorAll('script:not([src], [type])');
                  let json_script;
                  for (let script of scripts) {
                    if (script.text.includes('window.PAGE_DATA =')) {
                      json_script = script;
                      break;
                    }
                  }
                  if (json_script) {
                    let json_text = json_script.text.split('window.PAGE_DATA =')[1].split('</script')[0];
                    json_text = json_text.replace(/:undefined([,}])/g, ':"undefined"$1');
                    try {
                      let json_article = JSON.parse(json_text);
                      let json_pub;
                      for (let key in json_article) {
                        let json_resolution = json_article[key].data.result.resolution;
                        if (json_resolution && json_resolution.publication) {
                          json_pub = json_resolution.publication;
                          break;
                        }
                      }
                      let json_content = [];
                      let url_loaded;
                      if (json_pub) {
                        json_content = json_pub.content.blocks;
                        url_loaded = json_pub._self;
                      } else
                        window.location.reload(true);
                      //let json_video = json_pub.mainVideo;
                      let url = window.location.href;
                      if (!url_loaded || !url.includes(url_loaded.slice(-10)))
                        window.location.reload(true);
                      let par_elem, par_sub1, par_sub2;
                      let par_dom = document.createElement('div');
                      let tweet_id = 1;
                      for (let par of json_content) {
                        par_elem = '';
                        if (par.kind === 'text') {
                          par_elem = document.createElement('p');
                          par_elem.innerText = par.text;
                        } else if (par.kind === 'subhead') {
                          par_elem = document.createElement('h2');
                          par_elem.innerText = par.text;
                        } else if (par.kind === 'pull-quote') {
                          par_elem = document.createElement('i');
                          par_elem.innerText = (par.attribution ? par.attribution + ': ' : '') + par.text;
                        } else if (par.kind === 'embed') {
                          if (par.reference.includes('https://omny.fm/') || par.reference.includes('https://docdro.id/')) {
                            par_elem = document.createElement('embed');
                            par_elem.src = par.reference;
                            par_elem.style = 'height:500px; width:100%';
                            par_elem.frameborder = '0';
                          } else {
                            par_elem = document.createElement('a');
                            par_elem.href = par.reference;
                            par_elem.innerText = par.reference.split('?')[0];
                            console.log('embed: ' + par.reference);
                          }
                        } else if (par.kind === 'unordered-list') {
                          if (par.items) {
                            par_elem = document.createElement('ul');
                            for (let item of par.items)
                              if (item.text) {
                                par_sub1 = document.createElement('li');
                                if (item.intentions[0] && item.intentions[0].href) {
                                  par_sub2 = document.createElement('a');
                                  par_sub2.href = item.intentions[0].href;
                                } else {
                                  par_sub2 = document.createElement('span');
                                }
                                par_sub2.innerText = item.text;
                                par_sub1.appendChild(par_sub2);
                                par_elem.appendChild(par_sub1);
                              }
                          }
                        } else if (par.kind === 'inline') {
                          if (par.asset.kind === 'image') {
                            par_elem = document.createElement('figure');
                            par_sub1 = document.createElement('img');
                            par_sub1.src = par.asset.original.reference;
                            par_sub1.style = 'width:100%';
                            par_elem.appendChild(par_sub1);
                            if (par.asset.captionText) {
                              par_sub2 = document.createElement('figcaption');
                              par_sub2.innerText = par.asset.captionText + ' ' + (par.asset.copyrightByline ? par.asset.copyrightByline : '') +
                                ((par.asset.copyrightCredit && par.asset.captionText !== par.asset.copyrightByline) ? '/' + par.asset.copyrightCredit : '');
                              par_elem.appendChild(par_sub2);
                            }
                          }
                        } else if (par.kind === 'inline-related') {
                          par_elem = document.createElement('p');
                          if (par.publications) {
                            for (let elem of par.publications) {
                              let par_link = document.createElement('a');
                              par_link.href = elem._self;
                              par_link.innerText = elem.heading;
                              par_elem.appendChild(par_link);
                              par_elem.appendChild(document.createElement('br'));
                            }
                          }
                        } else {
                          par_elem = document.createElement('p');
                          par_elem.innerText = par.text;
                          console.log(par.kind);
                        }
                        if (par_elem)
                          par_dom.appendChild(par_elem);
                      }
                      let content = document.querySelector('div[class*="StyledArticleContent"]');
                      if (content) {
                        content.innerHTML = '';
                        content.appendChild(par_dom);
                      } else {
                        par_dom.setAttribute('style', 'margin: 20px;');
                        breach_screen.before(par_dom);
                      }
                    } catch (err) {
                      console.log(err);
                    }
                  }
                  removeDOMElement(breach_screen);
                }
              }, 2000);
              let header_advert = document.querySelector('.headerAdvertisement');
              hideDOMElement(header_advert);
            }
          }
        }
      }
    } else if (window.location.hostname.match(/\.(ie|uk)$/) || matchDomain(['citywire.com', 'ft.com', 'scotsman.com', 'tes.com'])) {//united kingdom/ireland
      if (matchDomain(['belfasttelegraph.co.uk', 'independent.ie'])) {
        let flip_pay = document.querySelector('div#flip-pay[style]');
        if (flip_pay) {
          let content = document.querySelector('script[data-fragment-type="ArticleContent"]');
          if (content) {
            removeDOMElement(flip_pay);
            let intro = document.querySelector('div[data-auth-intro="article"]');
            if (intro && intro.parentNode) {
              let content_text = content.innerText;
              if (content_text.includes('__PRELOADED_STATE_GRAPH')) {
                content_text = content_text.replace(/window\["__PRELOADED_STATE_GRAPH__.+"\]\s=\s/, '');
                try {
                  let json = JSON.parse(content_text);
                  if (Object.keys(json).length) {
                    let key = Object.keys(json)[0];
                    let pars = json[key].data.article.body;
                    let parser = new DOMParser();
                    for (let par of pars) {
                      for (let type in par) {
                        let item = par[type];
                        let elem = document.createElement('p');
                        elem.setAttribute('style', "margin: 10px;");
                        if (type === 'bullet_list') {
                          let ul = document.createElement('ul');
                          for (let sub_item of item) {
                            let li = document.createElement('li');
                            li.innerText = sub_item;
                            ul.appendChild(li);
                          }
                          elem.appendChild(ul);
                        } else if (type === 'image') {
                          let figure = document.createElement('figure');
                          let img = document.createElement('img');
                          img.src = item.url;
                          figure.appendChild(img);
                          let caption = document.createElement('figcaption');
                          caption.innerText = item.caption;
                          figure.appendChild(caption);
                          elem.appendChild(figure);
                        } else if (type === 'related') {
                          if (item.articles) {
                            let articles = item.articles;
                            for (let article of articles) {
                              let elem_link = document.createElement('a');
                              elem_link.href = article.webcmsRelativeUrl;
                              elem_link.innerText = article.title;
                              elem.appendChild(elem_link);
                              elem.appendChild(document.createElement('br'));
                            }
                          }
                        } else if (type !== 'ad') {
                          let html = parser.parseFromString('<p style="font-size: 18px; font-family: Georgia, serif; margin: 10px;">' + DOMPurify.sanitize(item, { ADD_TAGS: ['iframe'] }) + '</p>', 'text/html');
                          elem = html.querySelector('p');
                          if (!['p', 'subhead', 'legacy-ml'].includes(type)) {
                            console.log(type);
                            console.log(item);
                          }
                        }
                        window.setTimeout(function () {
                          if (elem)
                            intro.parentNode.appendChild(elem);
                        }, 500);
                      }
                    }
                  }
                } catch (err) {
                  console.log(err);
                }
              }
            }
          } else
            flip_pay.removeAttribute('style');
        }
        let ads = document.querySelectorAll('div[id^="ad_article"]');
        hideDOMElement(...ads);
      }
      else if (matchDomain('businesspost.ie')) {
        function bpie_main() {
          if ($) {
            let article_id_dom = document.querySelector('article[id]');
            let article_id;
            if (article_id_dom)
              article_id = article_id_dom.id;
            if (article_id) {
              let bp_ajaxurl = 'https://www.businesspost.ie/wp-admin/admin-ajax.php';
              let data_ajax = {
                action: 'fetch_article_content',
                type: 'POST',
                data: {
                  id: article_id
                },
                dataType: 'json',
                contentType: 'application/json'
              };
              $.ajax({
                type: 'POST',
                url: bp_ajaxurl,
                data: data_ajax,
                success: function (data) {
                  $('main article .article-body-section').html(data);
                }
              });
            }
          } else
            window.location.reload(true);
        }
        window.setTimeout(function () {
          let paywall = document.querySelector('div#bp_paywall_content');
          let article_id_dom = document.querySelector('article[id]');
          let article_id;
          if (article_id_dom)
            article_id = article_id_dom.id;
          if (paywall || article_id) {
            removeDOMElement(paywall);
            insert_script(bpie_main);
          }
        }, 500);
      }
      else if (matchDomain('citywire.com')) {
        let url = window.location.href;
        let paywall = document.querySelector('div.locked-content.cw-article-body');
        if (paywall) {
          paywall.classList.remove('locked-content');
          let article = document.querySelector('div.cw-article-body');
          if (article)
            article.firstChild.before(googleWebcacheLink(url));
        }
      }
      else if (matchDomain('ft.com')) {
        let url = window.location.href;
        let paywall = document.querySelectorAll('div.barrier__util-padding--single, .barrier__university, div.js-primary-offers-container');
        if (paywall.length) {
          removeDOMElement(...paywall);
          let site_content = document.querySelector('div#site-content');
          site_content.appendChild(ext_12ftLink(url));
        }
      }
      else if (matchDomain('independent.co.uk')) {
        let url = window.location.href;
        if (window.location.search.match(/(\?|&)amp/)) {
          let ads = document.querySelectorAll('amp-ad, amp-embed, [id^="ad-"]');
          removeDOMElement(...ads);
        } else {
          let paywall = document.querySelector('div.article-premium');
          let related = document.querySelector('div.related');
          let msg = document.querySelector('div#bpc_archive');
          if (paywall && !related && !msg) {
            paywall.classList.remove('article-premium');
            let article = document.querySelector('div#main');
            if (article)
              article.firstChild.before(archiveLink(url));
          }
        }
      }
      else if (matchDomain('prospectmagazine.co.uk')) {
        let url = window.location.href;
        let paywall = document.querySelector('div.paywall_overlay_blend, div.paywall');
        if (paywall) {
          removeDOMElement(paywall);
          let article = document.querySelector('main');
          if (article)
            article.firstChild.before(googleWebcacheLink(url));
        }
      }
      else if (matchDomain('spectator.co.uk')) {
        let url = window.location.href;
        let paywall = document.querySelector('section.paywall');
        if (paywall) {
          removeDOMElement(paywall);
          let article = document.querySelector('div.entry-content__wrapper');
          if (article)
            article.firstChild.before(ext_12ftLink(url));
        }
        let banner = document.querySelector('#subscribe-ribbon');
        removeDOMElement(banner);
      }
      else if (matchDomain('stylist.co.uk')) {
        let paywall = document.querySelector('div.css-1agpii8');
        if (paywall) {
          removeDOMElement(paywall);
          let json_script = document.querySelector('script#__NEXT_DATA__');
          if (json_script) {
            try {
              let json = JSON.parse(json_script.text);
              if (json.props.pageProps.data.post.acf.widgets) {
                let url_next = json.props.pageProps.data.post.id;
                if (url_next && !window.location.pathname.endsWith(url_next))
                  refreshCurrentTab();
                let pars = json.props.pageProps.data.post.acf.widgets;
                let first_par = document.querySelector('p.css-12ac4a9');
                if (first_par) {
                  let par_class = first_par.getAttribute('class');
                  let article = first_par.parentNode;
                  let teaser = article.querySelectorAll('div.css-1q9dbt6 > p');
                  removeDOMElement(...teaser);
                  if (article) {
                    let parser = new DOMParser();
                    for (let par of pars) {
                      let elem = document.createElement('p');
                      elem.style = 'font-family: "Source Serif Pro"; font-size: 20px; line-height: 34px;';
                      if (par.paragraph) {
                        let content = par.paragraph;
                        let content_new = parser.parseFromString('<div class="css-1q9dbt6">' + DOMPurify.sanitize(content) + '</div>', 'text/html');
                        elem = content_new.querySelector('div');
                      } else if (par.acf_fc_layout === 'heading') {
                        if (par.text)
                          elem.appendChild(document.createTextNode(par.text));
                      } else if (par.image) {
                        let figure = document.createElement('figure');
                        let img = document.createElement('img');
                        img.src = par.image.url;
                        img.alt = par.image.alt;
                        img.style = mobile ? 'width: 320px;' : 'width: 640px;';
                        figure.appendChild(img);
                        if (par.image.caption || par.image.description) {
                          let caption = document.createElement('figcaption');
                          caption.innerText = par.image.caption + ' ' + par.image.description;
                          figure.appendChild(caption);
                        }
                        elem.appendChild(figure);
                      } else if (par.acf_fc_layout === 'listicle') {
                        let ul = document.createElement('ul');
                        for (let sub_item of par.item) {
                          let li = document.createElement('li');
                          if (sub_item.url) {
                            let par_link = document.createElement('a');
                            par_link.href = sub_item.url;
                            par_link.innerText = sub_item.title;
                            par_link.target = '_blank';
                            li.appendChild(par_link);
                          } else
                            li.innerText = sub_item.title;
                          if (sub_item.paragraph) {
                            let content = sub_item.paragraph;
                            let content_new = parser.parseFromString('<div class="css-1q9dbt6">' + DOMPurify.sanitize(content) + '</div>', 'text/html');
                            let par_elem = content_new.querySelector('div');
                            li.appendChild(par_elem);
                          }
                          if (sub_item.image) {
                            let img = document.createElement('img');
                            img.src = sub_item.image.url;
                            img.alt = sub_item.image.alt;
                            img.style = mobile ? 'width: 320px;' : 'width: 640px;';
                            li.appendChild(img);
                            li.appendChild(document.createElement('br'));
                          }
                          li.style = 'font-size: 20px; margin: 20px 0px;';
                          ul.appendChild(li);
                        }
                        elem.appendChild(ul);
                      } else if (par.embed_link) {
                        let par_link = document.createElement('a');
                        par_link.href = par.embed_link;
                        par_link.innerText = 'Embedded link: ' + par.embed_link;
                        par_link.target = '_blank';
                        elem.appendChild(par_link);
                      } else if (par.acf_fc_layout === 'divider') {
                        elem.appendChild(document.createElement('hr'));
                      } else if (par.acf_fc_layout === 'related_articles') {
                        if (par.posts) {
                          for (let post of par.posts) {
                            if (post.link && post.title.rendered) {
                              let par_link = document.createElement('a');
                              par_link.href = post.link;
                              par_link.innerText = 'You may also like: ' + post.title.rendered;
                              elem.appendChild(par_link);
                              elem.appendChild(document.createElement('br'));
                            }
                          }
                        }
                      } else if (!['newsletter_signup', 'pull-quote'].includes(par.acf_fc_layout))
                        console.log(par);
                      if (elem.hasChildNodes)
                        article.appendChild(elem);
                    }
                    let div_nostyle = document.querySelectorAll('div.css-1q9dbt6 > *');
                    for (let elem of div_nostyle)
                      elem.style = 'font-family: "Source Serif Pro"; font-size: 20px; line-height: 34px;';
                  }
                }
              }
            } catch (err) {
              console.log(err);
            }
          }
        }
      }
      else if (matchDomain('telegraph.co.uk')) {
        if (window.location.pathname.endsWith('/amp/')) {
          let paywall = document.querySelectorAll('.premium-paywall');
          if (paywall.length) {
            let truncated_content = document.querySelector('.truncated-content');
            removeDOMElement(...paywall, truncated_content);
            amp_unhide_access_hide('="c.result=\'ALLOW_ACCESS\'"', '', 'amp-ad, amp-embed', false);
          } else {
            let amp_ads = document.querySelectorAll('amp-ad, amp-embed');
            removeDOMElement(...amp_ads);
          }
        } else {
          let subwall = document.querySelectorAll('[class^="subwall"]');
          let ads = document.querySelectorAll('.advert, .commercial-unit');
          removeDOMElement(...subwall, ...ads);
        }
      }
      else if (matchDomain('tes.com')) {
        let overlay = document.querySelector('div.tg-paywall-body-overlay');
        if (overlay)
          overlay.removeAttribute('class');
        let banners = document.querySelectorAll('div.js-paywall-info, div.tg-paywall-message');
        removeDOMElement(...banners);
      }
      else if (matchDomain('thetimes.co.uk')) {
        let url = window.location.href;
        if (window.location.hostname !== 'epaper.thetimes.co.uk') {
          let paywall = document.querySelector('div#paywall-portal-article-footer');
          if (paywall && !url.includes('?shareToken=')) {
            removeDOMElement(paywall);
            let article = document.querySelector('article[class^="responsive__BodyContainer"]');
            if (article)
              article.firstChild.before(archiveLink(url));
          }
          let paywall_page = document.querySelector('div#paywall-portal-page-footer');
          let block = document.querySelector('.subscription-block');
          let ads = document.querySelectorAll('#ad-article-inline, #sticky-ad-header, div[class*="InlineAdWrapper"], div[class*="NativeAd"], div.gyLkkj');
          removeDOMElement(paywall_page, block, ...ads);
        }
      }
      else if (matchDomain(uk_nat_world_domains) || document.querySelector('footer > div a[href^="https://www.nationalworldplc.com"]')) {
        let premium = document.querySelector('div.premium');
        if (premium)
          premium.removeAttribute('class');
        let amp_images = document.querySelectorAll('article amp-img[src^="https://"]');
        for (let amp_image of amp_images) {
          let elem = document.createElement('img');
          Object.assign(elem, {
            src: amp_image.getAttribute('src'),
            alt: amp_image.getAttribute('alt')
          });
          amp_image.parentNode.replaceChild(elem, amp_image);
        }
        let ads = document.querySelectorAll('div[class^="MarkupAds__Container-"], div[class*="_AdContainer-"], div[class^="Dailymotion__Wrapper-"], div.OUTBRAIN');
        removeDOMElement(...ads);
      }
    } else {
      if (matchDomain(usa_adv_local_domains)) {
        let url = window.location.href;
        if (url.includes('?outputType=amp')) {
          let amp_ads = document.querySelectorAll('.amp-ad-container, amp-embed');
          removeDOMElement(...amp_ads);
        } else {
          let paywall = document.querySelector('.paywall');
          let amphtml = document.querySelector('link[rel="amphtml"]');
          if (!amphtml)
            amphtml = { href: window.location.pathname + '?outputType=amp' };
          if (paywall && amphtml) {
            removeDOMElement(paywall);
            window.location.href = amphtml.href;
          }
          let ads = document.querySelectorAll('div.ad');
          removeDOMElement(...ads);
        }
      }
      else if (matchDomain('adweek.com')) {
        let url = window.location.href;
        let paywall = document.querySelector('div#paywall-subscribe');
        if (paywall) {
          removeDOMElement(paywall);
          let article = document.querySelector('div.adw-article-body');
          article.appendChild(ext_12ftLink(url));
        }
      }
      else if (matchDomain('americanbanker.com') || matchDomain(usa_arizent_custom_domains)) {
        let inline_gate = document.querySelector('.inline-gate');
        if (inline_gate) {
          inline_gate.classList.remove('inline-gate');
          let inline_gated = document.querySelectorAll('.inline-gated');
          for (let elem of inline_gated)
            elem.classList.remove('inline-gated');
        }
      }
      else if (matchDomain('artnet.com')) {
        if (window.location.pathname.endsWith('/amp-page')) {
          amp_unhide_subscr_section();
        } else {
          let body_hidden = document.querySelector('.article-body');
          if (body_hidden)
            body_hidden.style = 'display:block;';
        }
      }
      else if (matchDomain('asia.nikkei.com')) {
        setCookie('xbc', '', 'nikkei.com', '/', 0);
        let popup = document.querySelector('#pianoj_ribbon');
        removeDOMElement(popup);
      }
      else if (matchDomain('axios.com')) {
        function axios_noscroll(node) {
          node.removeAttribute('style');
          let overlay = document.querySelector('div[class^="Modal_paywallContainer"]');
          hideDOMElement(overlay);
        }
        waitDOMAttribute('html', 'HTML', 'style', axios_noscroll, true);
        let banners = document.querySelectorAll('div[data-vars-experiment="pro-paywall"], .apexAd');
        hideDOMElement(...banners);
      }
      else if (matchDomain('barrons.com')) {
        let url = window.location.href;
        if (!url.includes('barrons.com/amp/')) {
          let body_continuous = document.querySelector('body.is-continuous');
          let snippet = document.querySelector('meta[content="snippet"]');
          if (body_continuous && snippet) {
            removeDOMElement(snippet);
            window.location.href = url.replace('barrons.com', 'barrons.com/amp');
          }
          let continue_buttons = document.querySelectorAll('button.snippet__buttons--continue');
          for (let elem of continue_buttons)
            elem.addEventListener('click', function () { window.location.reload(); });
          let barrons_ads = document.querySelectorAll('.barrons-body-ad-placement');
          removeDOMElement(...barrons_ads);
        } else {
          amp_unhide_subscr_section('.wsj-ad, amp-ad');
          let login = document.querySelector('div.login-section-container');
          removeDOMElement(login);
          let amp_images = document.querySelectorAll('amp-img');
          for (let amp_img of amp_images) {
            let img_new = document.createElement('img');
            img_new.src = amp_img.getAttribute('src');
            amp_img.parentNode.replaceChild(img_new, amp_img);
          }
        }
      }
      else if (matchDomain('billboard.com')) {
        if (window.location.pathname.endsWith('/amp/')) {
          amp_unhide_subscr_section('amp-ad, amp-embed');
        }
      }
      else if (matchDomain('bloomberg.com')) {
        function bloomberg_noscroll(node) {
          node.removeAttribute('data-paywall-overlay-status');
        }
        waitDOMElement('div[id^="fortress-"]', 'DIV', removeDOMElement, true);
        waitDOMAttribute('body', 'BODY', 'data-paywall-overlay-status', bloomberg_noscroll, true);
        let paywall = document.querySelectorAll('div[id^="fortress-"]');
        let leaderboard = document.querySelector('div[id^="leaderboard"], div[class^="leaderboard"], div.canopy-container');
        let noscroll = document.querySelector('body[data-paywall-overlay-status]');
        if (noscroll)
          noscroll.removeAttribute('data-paywall-overlay-status');
        hideDOMElement(...paywall, leaderboard);
        let url = window.location.href;
        if (url.match(/s\/\d{4}-/)) {
          let page_ad = document.querySelectorAll('div.page-ad, div[data-ad-placeholder], div[class*="-ad-top"]');
          let reg_ui_client = document.querySelector('div#reg-ui-client');
          hideDOMElement(...page_ad, reg_ui_client);
          let hidden_images = document.querySelectorAll('img.lazy-img__image[src][data-native-src]');
          for (let hidden_image of hidden_images) {
            if (hidden_image.src.match(/\/(60|150)x-1\.(png|jpg)$/))
              hidden_image.setAttribute('src', hidden_image.getAttribute('data-native-src'));
            hidden_image.style.filter = 'none';
          }
          let hidden_charts = document.querySelectorAll('div[data-toaster-id][data-src]');
          for (let hidden_chart of hidden_charts) {
            let elem = document.createElement('iframe');
            Object.assign(elem, {
              src: hidden_chart.getAttribute('data-src'),
              frameborder: 0,
              height: hidden_chart.getAttribute('style').replace('min-height: ', ''),
              scrolling: 'no'
            });
            hidden_chart.parentNode.replaceChild(elem, hidden_chart);
          }
          let blur = document.querySelector('div.blur[style]');
          if (blur) {
            blur.classList.remove('blur');
            blur.removeAttribute('style');
          }
          let shimmering_content = document.querySelectorAll('div.shimmering-text');
          let body_transparent = document.querySelector('div[class*="nearly-transparent-text-blur"]');
          if (shimmering_content.length || body_transparent) {
            removeDOMElement(...shimmering_content);
            if (body_transparent)
              removeClassesByPrefix(body_transparent, 'nearly-transparent-text-blur');
            let json_script = document.querySelector('script[data-component-props="ArticleBody"], script[data-component-props="FeatureBody"]');
            if (json_script) {
              let json = JSON.parse(json_script.text);
              if (json) {
                let json_text;
                if (json.body)
                  json_text = json.body;
                else if (json.story && json.story.body)
                  json_text = json.story.body;
                if (json_text) {
                  removeDOMElement(json_script);
                  let article = document.querySelector('div.body-copy-v2:not(.art_done)');
                  let article_class = 'body-copy-v2';
                  if (!article) {
                    article = document.querySelector('div.body-copy:not(.art_done)');
                    article_class = 'body-copy';
                  }
                  if (!article) {
                    article = document.querySelector('div.body-content:not(.art_done)');
                    article_class = 'body-content';
                  }
                  if (article) {
                    article_class += ' art_done';
                    let parser = new DOMParser();
                    let doc = parser.parseFromString('<div class="' + article_class + '">' + json_text + '</div>', 'text/html');
                    let article_new = doc.querySelector('div');
                    if (article_new) {
                      article.parentNode.replaceChild(article_new, article);
                      let teaser_body = document.querySelector('div.body-content[class*="teaser-content_"]');
                      removeDOMElement(teaser_body);
                      let thirdparty_embed = document.querySelector('div.thirdparty-embed__container[style*="height: 0;"]');
                      if (thirdparty_embed)
                        thirdparty_embed.setAttribute('style', 'height: 550px !important;');
                    }
                  }
                }
              }
            }
          }
        }
        window.sessionStorage.clear();
        if (window.location.pathname.startsWith('/live/')) {
          setInterval(function () {
            window.localStorage.clear();
          }, 15 * 60 * 1000);
        } else
          setCookie('gatehouse_id', '', 'bloomberg.com', '/', 0);
      }
      else if (matchDomain('bloombergadria.com')) {
        let article_hidden = document.querySelector('article[style]');
        if (article_hidden)
          article_hidden.removeAttribute('style');
        let ads = document.querySelectorAll('.banner');
        removeDOMElement(...ads);
      }
      else if (matchDomain('bostonglobe.com')) {
        if (window.location.search.startsWith('?outputType=amp')) {
          amp_unhide_subscr_section();
        } else {
          let ads = document.querySelectorAll('div.arc_ad');
          hideDOMElement(...ads);
        }
      }
      else if (matchDomain('bqprime.com')) {
        if (window.location.pathname.startsWith('/amp/')) {
          amp_unhide_subscr_section('.ad-container');
        }
      }
      else if (matchDomain('businessinsider.com')) {
        let ads = document.querySelectorAll('div.l-ad, div.in-post-sticky, aside.has-video-ad');
        hideDOMElement(...ads);
      }
      else if (matchDomain('businessoffashion.com')) {
        if (window.location.search.startsWith('?outputType=amp')) {
          amp_unhide_access_hide();
        } else {
          let ads = document.querySelectorAll('div[class^="default__AdsBlockWrapper"]');
          removeDOMElement(...ads);
        }
      }
      else if (matchDomain(ca_torstar_domains)) {
        let meter_banner = document.querySelector('.c-article-meter-banner');
        let ads = document.querySelectorAll('.seo-media-query, .c-googleadslot, .ad-slot');
        removeDOMElement(meter_banner, ...ads);
        let end_of_article = document.querySelector('#end-of-article');
        hideDOMElement(end_of_article);
        let rightrail = document.querySelector('.c-article-body__rightrail');
        hideDOMElement(rightrail);
      }
      else if (matchDomain('cen.acs.org')) {
        setCookie('paywall-cookie', '', 'cen.acs.org', '/', 0);
        let meteredBar = document.querySelector('.meteredBar');
        removeDOMElement(meteredBar);
      }
      else if (matchDomain(['chronicle.com', 'philanthropy.com'])) {
        let preview = document.querySelector('div[data-content-summary]');
        removeDOMElement(preview);
        let article_hidden = document.querySelector('div.contentBody[hidden]');
        if (article_hidden) {
          let attributes = article_hidden.attributes;
          for (let elem of attributes) {
            let name = elem.name;
            if (name !== 'class')
              article_hidden.removeAttribute(name);
          }
        }
      }
      else if (matchDomain('cnbc.com')) {
        let paywall = document.querySelector('div.ArticleGate-proGate');
        if (paywall) {
          removeDOMElement(paywall);
          let article = document.querySelector('div.ArticleBody-articleBody');
          if (article)
            article.style = "margin: 20px 0px; font-family: Lyon,Helvetica,Arial,sans-serif; font-size: 18px; line-height: 1.66";
          let span_hidden = document.querySelectorAll('span[hidden]');
          for (let elem of span_hidden) {
            elem.removeAttribute('hidden');
            elem.removeAttribute('class');
          }
        }
      }
      else if (matchDomain('csmonitor.com')) {
        let paywall = document.querySelector('div.paywall');
        removeDOMElement(paywall);
        window.localStorage.clear();
      }
      else if (matchDomain('dailywire.com')) {
        let paywall = document.querySelector('#post-body-text > div > div[class]');
        if (paywall)
          paywall.removeAttribute('class');
      }
      else if (matchDomain('dallasnews.com')) {
        if (window.location.search.startsWith('?outputType=amp')) {
          amp_unhide_subscr_section('amp-ad, amp-embed');
        } else {
          let overlay = document.querySelector('div.sl-overlay');
          removeDOMElement(overlay);
          let noscroll = document.querySelector('div#courier-body-wrapper[style]');
          if (noscroll)
            noscroll.removeAttribute('style');
        }
      }
      else if (matchDomain('digiday.com')) {
        if (window.location.pathname.endsWith('/amp/')) {
          amp_unhide_access_hide('="NOT p.showPageviewExpired AND NOT p.showPayWall"', '', 'amp-ad, .advertisement, .ad-wrapper');
        }
      }
      else if (matchDomain('dn.no')) {
        let url = window.location.href;
        let paywall = document.querySelector('div#dn-ncp-popup, div.paywall, iframe[title="Paywall"]');
        if (paywall) {
          removeDOMElement(paywall);
          let article = document.querySelector('article, main#main-story, main.lp_article_content');
          if (article)
            article.firstChild.before(googleWebcacheLink(url));
        }
      }
      else if (matchDomain('economictimes.com')) {
        if (window.location.pathname.includes('/amp_')) {
          let paywall = document.querySelector('.paywall_wrap');
          if (paywall) {
            let content = document.querySelector('.paywall[style="display:none;"]');
            if (content)
              content.setAttribute('style', 'display:block;');
            let intro = document.querySelector('.art_wrap');
            let article_blocker = document.querySelector('.articleBlocker');
            let amp_ads = document.querySelectorAll('amp-ad');
            removeDOMElement(paywall, intro, article_blocker, ...amp_ads);
          }
        } else {
          window.setTimeout(function () {
            let paywall = document.querySelector('div#blocker_layer');
            let data_prime = document.querySelector('div[data-prime="1"]');
            let amphtml = document.querySelector('link[rel="amphtml"]');
            if ((paywall || data_prime) && amphtml) {
              removeDOMElement(paywall);
              if (data_prime)
                data_prime.removeAttribute('data-prime');
              window.location.href = amphtml.href;
            }
          }, 500);
        }
      }
      else if (matchDomain('economictimes.indiatimes.com')) {
        let paywall = document.querySelector('section.prime_paywall');
        if (paywall) {
          removeDOMElement(paywall);
          let content = document.querySelector('div.content1, div.artText');
          let full_text = document.querySelector('div.paywall.p1');
          if (content && full_text)
            content.innerText = full_text.innerText;
          let page_content = document.querySelector('div.pageContent:not([style])');
          if (page_content)
            page_content.setAttribute('style', 'height: auto !important;');
        }
      }
      else if (matchDomain('economist.com')) {
        let subscribe = document.querySelector('.subscription-proposition');
        let wrapper = document.getElementById('bottom-page-wrapper');
        let adverts = document.querySelectorAll('div.advert');
        removeDOMElement(subscribe, wrapper, ...adverts);
        let p_articles = document.querySelectorAll('p.article__body-text');
        let href;
        for (let p_article of p_articles) {
          let e_anchors = document.querySelectorAll('a');
          href = '';
          for (let e_anchor of e_anchors) {
            if (e_anchor.href) {
              href = e_anchor.href;
            } else {
              e_anchor.href = href;
            }
          }
        }
      }
      else if (matchDomain('enotes.com')) {
        let paywall = document.querySelectorAll('section.c-cta-section');
        if (paywall.length) {
          removeDOMElement(...paywall);
          let blurred = document.querySelectorAll('div[class^="_"]');
          for (let elem of blurred)
            elem.removeAttribute('class');
          let intro = document.querySelectorAll('div.o-rte-text > p:not([class]), div.o-rte-text > h3');
          for (let elem of intro)
            removeDOMElement(elem);
          let section_words = pageContains('p[class="u-align--center"]', /\(The entire section contains/);
          let ads = document.querySelectorAll('.ad-hfu');
          removeDOMElement(...section_words, ...ads);
        }
      }
      else if (matchDomain('espn.com')) {
        let url = window.location.href;
        let paywall = document.querySelector('aside.espn-plus-container-wrapper');
        if (paywall) {
          removeDOMElement(paywall);
          replaceDomElementExt(url, false, false, 'div.article-body');
        }
      }
      else if (matchDomain('fieldandstream.com')) {
        let overlay = document.querySelectorAll('div[class^="mailmunch-"]');
        removeDOMElement(...overlay);
        let noscroll = document.querySelector('html.mailmunch-pop-open');
        if (noscroll)
          noscroll.removeAttribute('class');
      }
      else if (matchDomain('financialexpress.com')) {
        let paywall = document.querySelector('div.paywall');
        if (paywall)
          paywall.classList.remove('paywall');
        let register = document.querySelector('div.pcl-wrap');
        let ads_selector = window.location.pathname.endsWith('/lite/') ? 'amp-ad, amp-embed, .ad-bg-container' : 'div[class*="-ads-blocks-ad-unit"]';
        let ads = document.querySelectorAll(ads_selector);
        removeDOMElement(register, ...ads);
      }
      else if (matchDomain('foreignaffairs.com')) {
        let paywall = document.querySelector('.paywall');
        let loading_indicator = document.querySelector('.loading-indicator');
        let msg_bottom = document.querySelector('.messages--container--bottom');
        removeDOMElement(paywall, loading_indicator, msg_bottom);
        let article_dropcap = document.querySelectorAll('.article-dropcap');
        for (let elem of article_dropcap)
          elem.classList.add('loaded');
      }
      else if (matchDomain('foreignpolicy.com')) {
        let content_ungated = document.querySelector('div.content-ungated');
        removeDOMElement(content_ungated);
        let content_gated = document.querySelector('div.content-gated');
        if (content_gated)
          content_gated.classList.remove('content-gated');
      }
      else if (matchDomain('fortune.com')) {
        let paywall = document.querySelector('.paywall');
        if (window.location.pathname.match(/\/amp(\/)?/)) {
          amp_unhide_access_hide('="NOT p.showRegWall AND NOT p.showPayWall"', '', '[class^="amp-ad"]');
          removeDOMElement(paywall);
        } else {
          if (paywall)
            paywall.removeAttribute('class');
        }
      }
      else if (matchDomain('harpers.org')) {
        setCookie('hr_session', '', 'harpers.org', '/', 0);
      }
      else if (matchDomain('hbrchina.org')) {
        let div_hidden = document.querySelector('div#the_content');
        if (div_hidden)
          div_hidden.removeAttribute('style');
      }
      else if (matchDomain('hilltimes.com')) {
        let paywall = document.querySelectorAll('div[class^="paywallcont"]');
        if (paywall.length) {
          removeDOMElement(...paywall);
          let json_script = document.querySelector('script.saswp-schema-markup-output');
          if (json_script) {
            try {
              let json = JSON.parse(json_script.text);
              json_text = json.filter(x => x.articleBody)[0].articleBody.replace(/\s{2,}/g, '\r\n\r\n');
              let article = document.querySelector('div#fadebg > p');
              if (article)
                article.innerText = parseHtmlEntities(json_text);
            } catch (err) {
              console.log(err);
            }
          }
        }
        let banner = document.querySelector('section.hide_this_section');
        hideDOMElement(banner);
      }
      else if (matchDomain('hindustantimes.com')) {
        let paywall = document.querySelector('.freemium-card');
        if (paywall) {
          removeDOMElement(paywall);
          let freemium_text = document.querySelector('.freemiumText');
          if (freemium_text)
            freemium_text.classList.remove('freemiumText');
        }
        let noscroll = document.querySelector('body.open-popup');
        if (noscroll)
          noscroll.classList.remove('open-popup');
        let close_story = document.querySelector('.closeStory');
        let ads = document.querySelectorAll('div[class^="adHeight"]');
        removeDOMElement(close_story, ...ads);
      }
      else if (matchDomain('historyextra.com')) {
        let article_masked = document.querySelector('.template-article__masked');
        if (article_masked) {
          let extra_pars = document.querySelectorAll('div.template-article__masked > p');
          removeDOMElement(...extra_pars);
          article_masked.classList.remove('template-article__masked');
        }
        let ad_banner = document.querySelector('.ad-banner-container');
        removeDOMElement(ad_banner);
      }
      else if (matchDomain(usa_hearst_comm_domains)) {
        let wrapper = document.querySelector('.belowMastheadWrapper');
        let ads = document.querySelectorAll('div.adModule');
        removeDOMElement(wrapper, ...ads);
      }
      else if (matchDomain('inc42.com')) {
        let url = window.location.href;
        let paywall = document.querySelector('div#inc42_article_content_lock');
        let article_sel = 'div.content-wrapper, section[amp-access="status"]';
        if (paywall) {
          removeDOMElement(paywall);
          let article = document.querySelector(article_sel);
          if (article)
            article.firstChild.before(ext_12ftLink(url));
        }
        window.setTimeout(function () {
          if (window.location.pathname.endsWith('/amp/')) {
            let lazy_images = document.querySelectorAll('img.lazyload[src^="data:image/"][data-src]');
            for (let elem of lazy_images) {
              elem.src = elem.getAttribute('data-src');
              elem.classList.remove('lazyload');
              if (elem.width > 1000) {
                let ratio = elem.width / 640;
                if (window.navigator.userAgent.toLowerCase().includes('mobile'))
                  ratio = elem.width / 320;
                elem.width = elem.width / ratio;
                elem.height = elem.height / ratio;
              }
            }
          }
          let also_read = document.querySelector('div > .also-read');
          if (also_read) {
            let article = document.querySelector(article_sel);
            if (article)
              article.appendChild(also_read.parentNode);
          }
        }, 1000);
      }
      else if (matchDomain('indianexpress.com')) {
        if (window.location.pathname.endsWith('/lite/'))
          amp_unhide_access_hide('="metering.result=\'ALLOW_ACCESS\'"', '', 'amp-ad, amp-embed');
        else {
          let paywall = document.querySelector('div#pcl-rest-content[style]');
          if (paywall)
            paywall.removeAttribute('style');
          let register = document.querySelector('div#app-pcl');
          let ads = document.querySelectorAll('div[class^="adsbox"]');
          removeDOMElement(register, ...ads);
        }
      }
      else if (matchDomain('indiatoday.in')) {
        if (window.location.pathname.match(/(\/amp)?\/magazine\//)) {
          let url = window.location.href;
          if (!url.includes('/amp/')) {
            let paywall = document.querySelector('#csc-paywall');
            let amphtml = document.querySelector('link[rel="amphtml"]');
            if (paywall && amphtml) {
              removeDOMElement(paywall);
              window.location.href = amphtml.href;
            }
          } else {
            amp_unhide_access_hide('="granted"', '="NOT NOT granted"', 'amp-ad, amp-embed');
          }
        }
      }
      else if (matchDomain('infzm.com')) {
        let url = window.location.href;
        if (url.includes('/wap/#/')) {
          let container = document.querySelector('section.container');
          if (container)
            container.classList.remove('container');
          let overlay = document.querySelector('div.article-content[style]');
          if (overlay)
            overlay.removeAttribute('style');
        } else if (url.includes('.com/contents/')) {
          window.setTimeout(function () {
            window.location.href = url.replace('.com/contents/', '.com/wap/#/content/');
          }, 500);
        }
      }
      if (matchDomain('inkl.com')) {
        let url = window.location.href;
        if (url.includes('/signin?') && url.includes('redirect_to=')) {
          window.setTimeout(function () {
            window.location.href = 'https://www.inkl.com' + decodeURIComponent(url.split('redirect_to=')[1]);
          }, 500);
        } else {
          let paywall = document.querySelector('div.paywall');
          if (paywall) {
            paywall.removeAttribute('class');
            let gradient_container = document.querySelector('div.gradient-container');
            removeDOMElement(gradient_container);
          }
          let what_is_inkl = document.querySelector('.what-is-inkl-container, .features-panel');
          let signup = document.querySelectorAll('.article-signup-container, .locked-sign-up-container, div[class*="/inkl-watermark.svg"]');
          let shared_banner = document.querySelector('div.shared-article-inline-banner');
          removeDOMElement(what_is_inkl, ...signup, shared_banner);
          let dismiss_button = document.querySelector('div.dismiss-button-container button.btn');
          if (dismiss_button)
            dismiss_button.click();
          let dive_deeper_summary_bodies = document.querySelectorAll('div.dive-deeper-container div.summary-body');
          if (dive_deeper_summary_bodies) {
            for (let summary_body of dive_deeper_summary_bodies) {
              if (!summary_body.querySelector('a')) {
                let ng_click = summary_body.getAttribute('ng-click').replace("showArticle('", '').replace("')", '');
                let weblink = document.createElement('a');
                weblink.text = 'open';
                weblink.href = 'https://www.inkl.com/news/' + ng_click;
                summary_body.appendChild(weblink);
              }
            }
          }
        }
      }
      else if (matchDomain('ipolitics.ca')) {
        let login = document.querySelector('div.login');
        if (login) {
          removeDOMElement(login);
          let json_script = document.querySelector('script#__NEXT_DATA__');
          if (json_script) {
            try {
              let json = JSON.parse(json_script.innerText);
              if (json && json.props.pageProps.post && json.props.pageProps.post.content) {
                let url_next = json.props.pageProps.post.slug;
                if (url_next && !window.location.pathname.includes(url_next))
                  refreshCurrentTab();
                let article_new = json.props.pageProps.post.content;
                let article = document.querySelector('.post-body');
                if (article) {
                  article.innerHTML = '';
                  article.classList.remove('locked');
                  let parser = new DOMParser();
                  let doc = parser.parseFromString('<div>' + article_new + '</div>', 'text/html');
                  let content_new = doc.querySelector('div');
                  article.appendChild(content_new);
                }
              } else {
                refreshCurrentTab();
              }
            } catch (err) {
              console.log(err);
            }
          }
        }
      }
      else if (matchDomain('japantimes.co.jp')) {
        setCookie('xbc', '', 'japantimes.co.jp', '/', 0);
      }
      else if (matchDomain('jpost.com')) {
        let premium_banners = document.querySelectorAll('.hide-for-premium, #hiddenPremiumForm, #hiddenLink');
        removeDOMElement(...premium_banners);
      }
      else if (matchDomain(['latimes.com', 'sandiegouniontribune.com'])) {
        let ads = document.querySelectorAll('div.enhancement, div.google-dfp-ad-wrapper');
        removeDOMElement(...ads);
      }
      else if (matchDomain('livelaw.in')) {
        let paywall = document.querySelector('div#subscription_paid_message, div.subscribeNow');
        if (paywall) {
          let intro = document.querySelector('div.story');
          removeDOMElement(paywall, intro);
          let restricted_message = document.querySelector('div.restricted_message');
          if (restricted_message)
            restricted_message.classList.remove('restricted_message');
          let paywall_content = document.querySelector('div.paywall-content.hide');
          if (paywall_content)
            paywall_content.classList.remove('hide');
        }
        let ads = document.querySelectorAll('inside-post-ad, amp-ad');
        removeDOMElement(...ads);
      }
      else if (matchDomain('livemint.com')) {
        if (window.location.pathname.includes('/amp-')) {
          let paywall = document.querySelectorAll('[amp-access="NOT subscribed"]');
          removeDOMElement(...paywall);
        } else {
          let paywall = document.querySelector('div.paywall');
          if (paywall)
            paywall.classList.remove('paywall');
          let ads = document.querySelectorAll('[class^="ad"], [id^="ad"], #subscribeAd, .taboolaHeight');
          removeDOMElement(...ads);
        }
      }
      else if (matchDomain('magazine.atavist.com')) {
        let bottom_notification = document.querySelector('div.bottom-notification');
        let overlay = document.querySelector('div.notification-overlay');
        removeDOMElement(bottom_notification, overlay);
        let paywall = document.querySelector('body.paywall-notification-visible');
        if (paywall)
          paywall.classList.remove('paywall-notification-visible');
        window.localStorage.clear();
      }
      else if (matchDomain('marketwatch.com')) {
        let premium = document.querySelector('html.is-paywall');
        let url = window.location.href;
        if (!url.includes('/amp/')) {
          if (premium) {
            premium.classList.remove('is-paywall');
            window.location.href = url.replace('.marketwatch.com/', '.marketwatch.com/amp/');
          }
        } else {
          let meter = document.querySelector('div.meter');
          let container_sponsored = document.querySelector('div.container--sponsored');
          removeDOMElement(meter, container_sponsored);
          amp_unhide_subscr_section('.display-ad');
        }
        let ads = document.querySelectorAll('div.element--ad, div.j-ad');
        removeDOMElement(...ads);
      }
      else if (matchDomain('medscape.com')) {
        let ads = document.querySelectorAll('.AdUnit, [id^="ads-"]');
        removeDOMElement(...ads);
      }
      else if (matchDomain('mid-day.com')) {
        if (window.location.pathname.startsWith('/amp/')) {
          amp_unhide_access_hide('="granted"', '="NOT granted"', 'amp-ad, amp-embed, [class*="BannerAd"]');
        } else {
          let paywall = document.querySelector('div#widget-_csc');
          let amphtml = document.querySelector('link[rel="amphtml"]');
          if (paywall && amphtml) {
            removeDOMElement(paywall);
            window.location.href = amphtml.href;
          } else {
            let read_more = document.querySelector('#read-more-my');
            if (read_more)
              read_more.click();
          }
        }
      }
      else if (matchDomain('nationalgeographic.com')) {
        function natgeo_func(node) {
          removeDOMElement(node);
          let body = document.querySelector('body[class]');
          if (body) {
            body.removeAttribute('class');
            body.removeAttribute('style');
          }
        }
        waitDOMElement('div[id^="fittPortal"]', 'DIV', natgeo_func, false);
        let url = window.location.href;
        let subscribed = document.querySelector('.Article__Content--gated');
        let overlay = document.querySelector('.Article__Content__Overlay--gated');
        let msg = document.querySelector('div#bpc_archive');
        if (subscribed && !msg) {
          subscribed.appendChild(archiveLink(url));
          subscribed.setAttribute('style', 'overflow: visible !important;');
          if (overlay)
            overlay.classList.remove('Article__Content__Overlay--gated');
        }
        let ads = document.querySelectorAll('div.ad-slot, div.InsertedAd');
        removeDOMElement(...ads);
      }
      else if (matchDomain('nautil.us')) {
        setCookie(['arc', 'sfa'], '');
        let banners = document.querySelectorAll('div[class^="a__sc-np"], div.subscibe-bar');
        removeDOMElement(...banners);
      }
      else if (matchDomain('newleftreview.org')) {
        window.setTimeout(function () {
          let url = window.location.href;
          let paywall = document.querySelector('div.promo-wrapper');
          if (paywall) {
            removeDOMElement(paywall);
            let article = document.querySelector('div.article-page');
            if (article)
              article.firstChild.before(googleWebcacheLink(url));
          }
        }, 500);
      }
      else if (matchDomain('newrepublic.com')) {
        let modal = document.querySelector('div.article-scheduled-modal');
        let pw_popups = document.querySelector('div#pwPopups');
        let ads = document.querySelectorAll('.ad-unit, .ad-container');
        removeDOMElement(modal, pw_popups, ...ads);
      }
      else if (matchDomain('newscientist.com')) {
        let url = window.location.href;
        let paywall = document.querySelector('#subscription-barrier');
        if (paywall) {
          removeDOMElement(paywall);
          let article = document.querySelector('div.article-body, article');
          if (article)
            article.firstChild.before(googleWebcacheLink(url));
        }
      }
      else if (matchDomain('newsday.com')) {
        if (window.location.pathname.startsWith('/amp/')) {
          amp_unhide_access_hide('="AccessLevel = \'Full Content Access\' OR Error = true"', '="Error != true AND UserState != \'Subscribed\'"');
        } else {
          let nd_lock = document.querySelector('html[class]');
          if (nd_lock)
            nd_lock.removeAttribute('class');
          let ads = document.querySelectorAll('div[class^="ad_full-banner_"]');
          hideDOMElement(...ads);
        }
      }
      else if (matchDomain(['nola.com', 'theadvocate.com'])) {
        if (window.location.pathname.endsWith('.amp.html')) {
          let body_hidden = document.querySelector('.site-container');
          if (body_hidden)
            body_hidden.setAttribute('style', 'display:block;');
        }
      }
      else if (matchDomain('nybooks.com')) {
        let paywall_article = document.querySelector('.paywall-article');
        if (paywall_article)
          paywall_article.classList.remove('paywall-article');
        let banner = document.querySelector('div.toast-cta, div.inline-ad');
        removeDOMElement(banner);
      }
      else if (matchDomain('nytimes.com')) {
        let banners = document.querySelectorAll('div[data-testid="inline-message"], div[id^="ad-"], div.expanded-dock, div.pz-ad-box');
        removeDOMElement(...banners);
      }
      else if (matchDomain('nzherald.co.nz')) {
        // use bpc adblocker filter
        let premium_toaster = document.querySelector('#premium-toaster');
        let ads = document.querySelectorAll('.ad');
        hideDOMElement(premium_toaster, ...ads);
      }
      else if (matchDomain('outlookbusiness.com')) {
        let paywall = document.querySelector('div#csc-paywall');
        if (paywall) {
          removeDOMElement(paywall);
          let json_script = document.querySelector('script#__NEXT_DATA__');
          if (json_script) {
            let json = JSON.parse(json_script.innerText);
            if (json && json.props.initialState.dashboard.ARTICLE_POST_DETAIL_API.data.article_data.description) {
              let article_new = json.props.initialState.dashboard.ARTICLE_POST_DETAIL_API.data.article_data.description;
              let article = document.querySelector('div.story-content');
              if (article) {
                article.innerHTML = '';
                let parser = new DOMParser();
                let doc = parser.parseFromString('<div>' + article_new + '</div>', 'text/html');
                let content_new = doc.querySelector('div');
                article.appendChild(content_new);
              }
            }
          }
        }
      }
      else if (matchDomain('outlookindia.com')) {
        let paywall = document.querySelector('div.paywall');
        if (paywall) {
          removeDOMElement(paywall);
          let json_script = getArticleJsonScript();
          if (json_script) {
            let json = JSON.parse(json_script.text);
            if (json) {
              let json_text = parseHtmlEntities(json.articleBody).replace(/\n/g, "$&\r\n");
              let content = document.querySelector('div#articleBody');
              if (json_text && content) {
                content.innerHTML = '';
                let article_new = document.createElement('p');
                article_new.innerText = json_text;
                content.appendChild(article_new);
              }
            }
          }
        }
      }
      else if (matchDomain('project-syndicate.org')) {
        let url = window.location.href;
        let paywall = document.querySelector('div.paywall--base');
        if (paywall) {
          removeDOMElement(paywall);
          let article = document.querySelector('div[data-page-area="article-body"]');
          if (article)
            article.firstChild.before(archiveLink(url));
        }
      }
      else if (matchDomain('quora.com')) {
        let overlays = document.querySelectorAll('div[class*="_overlay"]');
        removeDOMElement(...overlays);
        let mask_image = document.querySelector('div.ePDXbR');
        if (mask_image)
          mask_image.classList.remove('ePDXbR');
      }
      else if (matchDomain('rugbypass.com')) {
        if (window.location.pathname.startsWith('/plus/')) {
          let paywall = document.querySelector('.premium-fold-bottom');
          if (paywall) {
            paywall.classList.remove('premium-fold-bottom');
            let offer = document.querySelector('.plus-article-offer');
            removeDOMElement(offer);
            let fade = document.querySelector('.fade');
            if (fade)
              fade.classList.remove('fade');
          }
        }
      }
      else if (matchDomain('science.org')) {
        let paywall = document.querySelector('div.alert-read-limit');
        removeDOMElement(paywall);
        let overlay = document.querySelector('body.alert-read-limit__overlay');
        if (overlay)
          overlay.classList.remove('alert-read-limit__overlay');
      }
      else if (matchDomain('scmp.com')) {
        if (window.location.href.includes('/amp.')) {
          let div_hidden = document.querySelectorAll('div.article-body[amp-access][amp-access-hide]');
          for (let elem of div_hidden)
            elem.removeAttribute('amp-access-hide');
          let default_meters = document.querySelectorAll('div.default-meter, div#archive-article-meter');
          let adverts = document.querySelectorAll('amp-ad, div.ad-banner, div.advert-fly-carpet-container, div.inline-advert');
          removeDOMElement(...default_meters, ...adverts);
        }
      }
      else if (matchDomain('seattletimes.com')) {
        let ads = document.querySelectorAll('.top-ad-wrapper, .ad-container');
        removeDOMElement(...ads);
      }
      else if (matchDomain('seekingalpha.com')) {
        if (!window.location.pathname.startsWith('/amp/')) {
          let locked = document.querySelector('div[data-test-id="post-locked-banner"]');
          let amphtml = document.querySelector('link[rel="amphtml"]');
          if (locked && amphtml) {
            locked.removeAttribute('data-test-id');
            window.location.href = amphtml.href;
          } else {
            let read_more = document.querySelector('button[id^="continueReadingButton"]');
            if (read_more)
              read_more.click();
          }
        } else {
          amp_unhide_access_hide('*="premium_access OR"', '', '.ad-wrap');
          let paywall = document.querySelector('[class*="paywall-container"]');
          removeDOMElement(paywall);
        }
      }
      else if (matchDomain('slate.com')) {
        let slate_roadblock = document.querySelector('.slate-roadblock');
        let ads = document.querySelectorAll('section[class*="-ad"]');
        removeDOMElement(slate_roadblock, ...ads);
      }
      else if (matchDomain('slideshare.net')) {
        window.localStorage.clear();
        let limit_overlay = document.querySelector('.limit-overlay');
        if (limit_overlay)
          limit_overlay.classList.remove('limit-overlay');
      }
      else if (matchDomain('sloanreview.mit.edu')) {
        let url = window.location.href;
        let paywall = document.querySelector('body.is-paywall');
        if (paywall) {
          paywall.classList.remove('is-paywall');
          let article = document.querySelector('div#article-content');
          if (article)
            article.firstChild.before(googleWebcacheLink(url));
        }
      }
      else if (matchDomain('sofrep.com')) {
        setCookie('sofrep_news_ids', '', 'sofrep.com', '/', 0);
        let paywall = document.querySelector('div.paywall');
        if (paywall) {
          paywall.removeAttribute('class');
          let intro = document.querySelector('div.non-paywall');
          removeDOMElement(intro);
          waitDOMElement('div#paywall_wrap', 'DIV', node => removeDOMElement(node.parentNode));
        }
        let banners = document.querySelectorAll('#scrollerCTA, #botCta');
        removeDOMElement(...banners);
      }
      else if (matchDomain('spglobal.com')) {
        let overlay = document.querySelector('.article__overlay');
        removeDOMElement(overlay);
        let html_noscroll = document.querySelector('html[class]');
        if (html_noscroll)
          html_noscroll.removeAttribute('class');
      }
      else if (matchDomain('sportico.com')) {
        if (window.location.pathname.endsWith('/amp/'))
          amp_unhide_subscr_section('amp-ad, amp-embed', false);
      }
      else if (matchDomain('staradvertiser.com')) {
        if (window.location.pathname.endsWith('/amp/')) {
          amp_unhide_subscr_section();
        } else {
          let paywall = document.querySelector('div#hsa-paywall-overlay');
          if (paywall) {
            removeDOMElement(paywall);
            let div_hidden = document.querySelector('div#hsa-paywall-content[style]');
            if (div_hidden)
              div_hidden.removeAttribute('style');
          }
        }
      }
      else if (matchDomain('startribune.com')) {
        let ads = document.querySelectorAll('div.ad-placeholder');
        removeDOMElement(...ads);
      }
      else if (matchDomain('stocknews.com')) {
        let hideme = document.querySelector('div#hideme');
        removeDOMElement(hideme);
        let blurmes = document.querySelectorAll('div[id^="blurme"]');
        for (let i = 0; i < blurmes.length; i++)
          blurmes[i].setAttribute('id', 'blurmenot' + i);
      }
      else if (matchDomain('stratfor.com')) {//articles bingbot
        let banner = document.querySelector('.free-cta-container, .paywall-banner');
        removeDOMElement(banner);
        let hidden_images = document.querySelectorAll('img[src^="data:image/gif"][data-src]');
        for (let hidden_image of hidden_images)
          hidden_image.setAttribute('src', hidden_image.getAttribute('data-src'));
        if (window.location.pathname.match(/(\/(\d){4}-([a-z]|-)+-forecast(-([a-z]|-)+)?|-forecast-(\d){4}-([a-z]|[0-9]|-)+)$/)) {
          let json_script = document.querySelector('script#__NEXT_DATA__');
          if (json_script) {
            let json = JSON.parse(json_script.innerText);
            if (json && json.props.pageProps.data) {
              let overview_div = document.querySelector('div[class^="overview_overview__"] > div');
              if (overview_div) {
                let data = json.props.pageProps.data;
                let parser = new DOMParser();
                let data_overview = data.overview;
                if (!parseHtmlEntities(data_overview).includes(data.teaser_body))
                  data_overview = '<p>' + data.teaser_body + '</p>' + data_overview;
                let doc = parser.parseFromString('<div>' + data_overview + '<p><h2>Sections</h2></p>' + '</div>', 'text/html');
                let content_new = doc.querySelector('div');
                let sections = data.section;
                for (let section of sections) {
                  let section_link = document.createElement('a');
                  section_link.innerText = section.title;
                  section_link.href = 'https://' + window.location.hostname + '/' + section.path_alias;
                  content_new.appendChild(section_link);
                  content_new.appendChild(document.createElement('br'));
                }
                overview_div.parentNode.replaceChild(content_new, overview_div);
              }
            }
          }
          waitDOMElement('div.paywall-banner', 'DIV', removeDOMElement, false);
        } else if (window.location.pathname.match(/\/article\/.+-forecast(-.+)?\//)) {
          let next_section_buttons = document.querySelectorAll('div[class^="nextSection_nextSection__"] > button');
          for (let elem of next_section_buttons) {
            let section_link = document.createElement('a');
            section_link.innerText = elem.innerText;
            section_link.href = url.replace(/[^\/]+$/, '') + elem.innerText.split(': ')[1].toLowerCase().split(' ').filter(x => !['a', 'an', 'of', 'the'].includes(x)).join('-');
            elem.parentNode.replaceChild(section_link, elem);
          }
        }
      }
      else if (matchDomain('studocu.com')) {
        window.setTimeout(function () {
          let paywall = document.querySelector('button[data-test-selector^="preview-banner-"]');
          if (paywall) {
            let paywall_banner = document.querySelector('#document-wrapper > div:not([style])');
            let banners = document.querySelectorAll('div.pf > :not(.page-content), div#premium-page-header');
            removeDOMElement(paywall_banner, ...banners);
            window.setTimeout(function () {
              let blurred_pages = document.querySelectorAll('div.page-content[style]');
              for (let blurred_page of blurred_pages) {
                let page = document.createElement('span');
                page.setAttribute('class', 'page-content');
                page.appendChild(blurred_page.firstChild);
                blurred_page.parentNode.replaceChild(page, blurred_page);
              }
            }, 2000);
          }
        }, 1000);
      }
      else if (matchDomain('techinasia.com')) {
        let paywall = document.querySelector('.paywall-content');
        if (paywall) {
          paywall.classList.remove('paywall-content');
          let url = window.location.href;
          let url_xhr = url.replace('.com/', '.com/wp-json/techinasia/2.0/posts/').replace('/visual-story/', '/');
          fetch(url_xhr)
            .then(response => {
              if (response.ok) {
                response.json().then(json => {
                  let json_text = json.posts[0].content;
                  json_text = json_text.replace(/width\=\"(\d){3,}\"/g, 'width="100%"').replace(/height\=\"(\d){3,}\"/g, 'height="100%"');
                  let content = document.querySelector('div.content');
                  if (json_text && content) {
                    let parser = new DOMParser();
                    let doc = parser.parseFromString('<div class="jsx-1794864983 content">' + json_text + '</div>', 'text/html');
                    let content_new = doc.querySelector('div.content');
                    content.parentNode.replaceChild(content_new, content);
                  }
                });
              }
            });
        }
        let splash_subscribe = document.querySelector('.splash-subscribe');
        let paywall_hard = document.querySelector('.paywall-hard');
        removeDOMElement(splash_subscribe, paywall_hard);
      }
      else if (matchDomain(['techtarget.com', 'computerweekly.com'])) {
        let paywall = document.querySelector('div.paywall');
        if (paywall) {
          paywall.classList.remove('paywall');
          let banners = document.querySelectorAll('p#firstP, div#inlineRegistrationWrapper');
          removeDOMElement(...banners);
        }
      }
      else if (matchDomain('the-american-interest.com')) {
        let counter = document.getElementById('article-counter');
        removeDOMElement(counter);
      }
      else if (matchDomain('theathletic.com')) {
        if (!(window.location.search.match(/(\?|&)amp/) && !document.querySelector('link[rel="amphtml"]'))) {
          let paywall = document.querySelector('div[id^="slideup-"]');
          if (paywall) {
            removeDOMElement(paywall);
            let overlays = document.querySelectorAll('div[id*="overlay"], div:empty:not([data-rjs])');
            hideDOMElement(...overlays);
            let body = document.querySelector('body');
            if (body) {
              body.style.overflow = 'visible';
              body.style.position = 'relative';
            }
          } else {
            let headline_paywall = document.querySelectorAll('a.headline-paywall');
            let amphtml = document.querySelector('link[rel="amphtml"]');
            if (headline_paywall.length && amphtml) {
              removeDOMElement(...headline_paywall);
              window.setTimeout(function () {
                window.location.href = amphtml.href;
              }, 1000);
            }
          }
        } else {
          amp_unhide_subscr_section();
          amp_unhide_access_hide('', '*="NOT granted"');
        }
        let apron = document.querySelector('div#free-apron-cta, div.slideup-free-apron-container');
        let ads = document.querySelectorAll('div.ad-container');
        removeDOMElement(apron, ...ads);
      }
      else if (matchDomain('theatlantic.com')) {
        setCookie('articleViews', '', 'theatlantic.com', '/', 0);
        let lazy_images = document.querySelectorAll('img.Image_lazy__tutlP');
        for (let elem of lazy_images)
          elem.classList.remove('Image_lazy__tutlP');
        let banners = document.querySelectorAll('.c-nudge__container, .c-non-metered-nudge, div[class^="ArticleInjector_"]');
        removeDOMElement(...banners);
      }
      else if (matchDomain('thebulletin.org')) {
        let url = window.location.href;
        let paywall = document.querySelector('div.article--cropped');
        if (paywall) {
          removeDOMElement(paywall);
          let article = document.querySelector('div#body-copy');
          if (article)
            article.firstChild.before(googleWebcacheLink(url));
        }
      }
      else if (matchDomain('thedailybeast.com')) {
        let paywall = document.querySelector('div.Body__paywall-container');
        if (paywall) {
          removeDOMElement(paywall);
          let json_script = document.querySelector('script[displayName="initialState"]');
          if (json_script) {
            let json_str = json_script.text.substring(json_script.textContent.indexOf('{'));
            try {
              let json = JSON.parse(json_str);
              if (json.body) {
                let pars = json.body.sections;
                let cards = json.body.cards;
                if (pars) {
                  let mobile_doc = document.querySelector('div.Mobiledoc');
                  if (mobile_doc) {
                    let mobile_doc_text = mobile_doc.innerText.replace(/(\r|\n)/g, '');
                    for (let elem of pars) {
                      let par_elem = '';
                      if (elem[0] === 1) {
                        if (elem[1] === 'p') {
                          let par = '';
                          for (let part of elem[2])
                            par += part[3];
                          if (par && !mobile_doc_text.includes(par)) {
                            par_elem = document.createElement('p');
                            par_elem.innerText = par;
                          }
                        }
                      } else if (elem[0] === 10) {
                        if (cards && cards[elem[1]]) {
                          let card = cards[elem[1]];
                          if (card[0] === 'pt-image') {
                            par_elem = document.createElement('p');
                            let par_fig = document.createElement('figure');
                            let par_img = document.createElement('img');
                            par_img.src = card[1].url;
                            par_fig.appendChild(par_img);
                            par_elem.appendChild(par_fig);
                            let par_cap = document.createElement('figcaption');
                            par_cap.innerText = card[1].title + ' ' + card[1].credit;
                            par_elem.appendChild(par_cap);
                          } else if (card[0] === 'pt-fancy-links-card') {
                            par_elem = document.createElement('p');
                            let par_link = document.createElement('a');
                            par_link.href = card[1].links;
                            par_link.innerText = card[1].linksData[0].long_headline;
                            par_elem.appendChild(par_link);
                          }
                        }
                      }
                      if (par_elem)
                        mobile_doc.appendChild(par_elem);
                    }
                  }
                }
              }
            } catch (err) {
              console.log(err);
            }
          }
        }
      }
      else if (matchDomain('thediplomat.com')) {
        setCookie('dpl-pw', '', 'thediplomat.com', '/', 0);
        let preview = document.querySelector('.dpl-preview');
        if (preview)
          preview.classList.remove('dpl-preview');
      }
      else if (matchDomain('theglobeandmail.com')) {
        let article_body_subscribed = document.querySelector('.c-article-body--subscribed');
        if (article_body_subscribed)
          article_body_subscribed.removeAttribute('class');
        let lazy_images = document.querySelectorAll('img[src^="data:image/"][data-src]');
        for (let elem of lazy_images)
          elem.src = elem.getAttribute('data-src');
        let banners = document.querySelectorAll('div.c-ad, div#subscription-pencil-area, div.marketing-container-wrapper');
        hideDOMElement(...banners);
      }
      else if (matchDomain(['thehindu.com', 'thehindubusinessline.com'])) {
        if (!window.location.pathname.endsWith('/amp/')) {
          let counter = document.querySelector('#test');
          let ads = document.querySelectorAll('.ad, .article-ad, .dfp-ad');
          removeDOMElement(counter, ...ads);
        } else {
          let ads = document.querySelectorAll('amp-ad, amp-embed, [class^="height"], [class^="advt"], [id^="piano"]');
          removeDOMElement(...ads);
        }
      }
      else if (matchDomain(['thejuggernaut.com', 'jgnt.co'])) {
        let paywall = pageContains('div.font-mono', /\Read this article and many more by subscribing today/);
        if (paywall.length) {
          removeDOMElement(paywall[0].parentNode);
          let json_script = document.querySelector('script#__NEXT_DATA__');
          if (json_script) {
            try {
              let json = JSON.parse(json_script.innerText);
              if (json && json.props.pageProps.post) {
                let url_next = json.query.slug;
                if (url_next && !window.location.pathname.includes(url_next))
                  refreshCurrentTab();
                let pars = json.props.pageProps.post.fields.textEssay.fields.body.content;
                let article = document.querySelector('div.opacity-50');
                if (article) {
                  article.innerHTML = '';
                  article.removeAttribute('class');
                  let par_first = true;
                  function attach_text(sub_item, elem) {
                    if (sub_item.value) {
                      let sub_elem = document.createElement('span');
                      sub_elem.innerText = sub_item.value;
                      if (sub_item.marks && sub_item.marks.length) {
                        let style = '';
                        for (let mark of sub_item.marks) {
                          if (mark.type === 'bold')
                            style += 'font-weight: bold;';
                          else if (mark.type === 'italic')
                            style += 'font-style: italic;';
                          else if (mark.type === 'underline')
                            style += 'text-decoration: underline;';
                        }
                        sub_elem.style = style;
                      }
                      elem.appendChild(sub_elem);
                    }
                  }
                  function attach_hyperlink(sub_item, elem) {
                    if (sub_item.content && sub_item.content[0] && sub_item.content[0].value && sub_item.data && sub_item.data.uri) {
                      let sub_elem = document.createElement('a');
                      sub_elem.href = sub_item.data.uri;
                      sub_elem.innerText = sub_item.content[0].value;
                      if (!matchUrlDomain(['thejuggernaut.com', 'jgnt.co'], sub_item.data.uri))
                        sub_elem.target = '_blank';
                      sub_elem.style = 'text-decoration: underline;';
                      elem.appendChild(sub_elem);
                    }
                  }
                  function attach_paragraph(par, elem) {
                    if (par.content && par.content.length) {
                      let span_elem = document.createElement('span');
                      for (let item of par.content) {
                        if (item.nodeType === 'text') {
                          attach_text(item, span_elem);
                        } else if (item.nodeType === 'hyperlink') {
                          attach_hyperlink(item, span_elem);
                        } else
                          console.log(item);
                      }
                      elem.appendChild(span_elem);
                    }
                  }
                  for (let par of pars) {
                    let elem = document.createElement('p');
                    if (['paragraph', 'heading-1'].includes(par.nodeType)) {
                      attach_paragraph(par, elem);
                    } else if (['blockquote'].includes(par.nodeType)) {
                      if (par.content && par.content.length) {
                        for (let item of par.content) {
                          if (item.nodeType === 'paragraph') {
                            elem.style = 'margin: 0px 20px; font-style: italic;';
                            attach_paragraph(item, elem);
                          } else
                            console.log(item);
                        }
                      }
                    } else if (par.nodeType === 'hr') {
                      elem.appendChild(document.createElement('hr'));
                    } else if (par.nodeType === 'embedded-asset-block') {
                      if (!par_first) {
                        if (par.data && par.data.target && par.data.target.fields) {
                          if (par.data.target.fields.file && par.data.target.fields.file.url) {
                            let figure = document.createElement('figure');
                            let img = document.createElement('img');
                            img.src = par.data.target.fields.file.url;
                            figure.appendChild(img);
                            if (par.data.target.fields.description) {
                              let caption = document.createElement('figcaption');
                              caption.innerText = par.data.target.fields.description;
                              figure.appendChild(caption);
                            }
                            elem.appendChild(figure);
                          }
                        }
                      } else
                        par_first = false;
                    } else if (par.nodeType === 'unordered-list') {
                      if (par.content && par.content.length) {
                        let ul = document.createElement('ul');
                        for (let item of par.content) {
                          if (item.nodeType === 'list-item') {
                            if (item.content) {
                              for (let sub_item_par of item.content) {
                                if (sub_item_par.nodeType === 'paragraph') {
                                  let li = document.createElement('li');
                                  attach_paragraph(sub_item_par, li);
                                  ul.appendChild(li);
                                }
                              }
                            }
                          } else
                            console.log(item);
                        }
                        elem.appendChild(ul);
                      }
                    } else {
                      console.log(par);
                    }
                    if (elem.hasChildNodes) {
                      article.appendChild(document.createElement('br'));
                      article.appendChild(elem);
                    }
                  }
                }
              } else
                refreshCurrentTab();
            } catch (err) {
              console.log(err);
            }
          }
        }
      }
      else if (matchDomain('thenewatlantis.com')) {
        let article_gated = document.querySelector('.article-gated');
        if (article_gated)
          article_gated.classList.remove('article-gated');
      }
      else if (matchDomain('theneweuropean.co.uk')) {
        let paywall = document.querySelector('div[data-show-fade-on-noaccess]');
        if (paywall) {
          removeDOMElement(paywall);
          let content = document.querySelector('div[data-show-has-access]');
          if (content)
            content.removeAttribute('data-show-has-access');
        }
        let banners = document.querySelectorAll('div[data-show-subs-blocked]');
        removeDOMElement(...banners);
      }
      else if (matchDomain('thepointmag.com')) {
        setCookie('monthly_history', '', 'thepointmag.com', '/', 0);
        let overlay = document.querySelectorAll('div.overlay, div#tpopup-');
        removeDOMElement(...overlay);
      }
      else if (matchDomain('thequint.com')) {
        let paywall = document.querySelector('div.zsqcu');
        if (paywall) {
          removeDOMElement(paywall);
          let body_hidden = document.querySelector('div#story-body-wrapper');
          if (body_hidden)
            body_hidden.removeAttribute('class');
          function thequint_unhide(node) {
            node.removeAttribute('class');
          }
          waitDOMAttribute('div#story-body-wrapper', 'DIV', 'class', thequint_unhide, true);
        }
      }
      else if (matchDomain('thewrap.com')) {
        let paywall = document.querySelector('.wrappro-paywall');
        if (paywall)
          paywall.classList.remove('wrappro-paywall');
      }
      else if (matchDomain('time.com')) {
        let body = document.querySelector('body');
        if (body && !matchDomain('api.time.com'))
          body.setAttribute('style', 'position:relative !important;');
        let ads = document.querySelectorAll('div[id*="inline-ad-"]');
        removeDOMElement(...ads);
      }
      else if (matchDomain('timeshighereducation.com')) {
        let paywall_cta = document.querySelector('div.paywall-cta');
        if (paywall_cta) {
          paywall_cta.removeAttribute('style');
          let hidden_divs = document.querySelectorAll('div[style="display: none;"]');
          for (let hidden_div of hidden_divs)
            hidden_div.removeAttribute('style');
          let paywall_fade = document.querySelector('div.paywall-fade');
          if (paywall_fade)
            paywall_fade.classList.remove('paywall-fade');
        }
        let hidden_images = document.querySelectorAll('img.b-lazy[src^="data:image/"][data-src]');
        for (let hidden_image of hidden_images) {
          hidden_image.setAttribute('src', hidden_image.getAttribute('data-src'));
          hidden_image.classList.remove('b-lazy');
          hidden_image.parentElement.classList.remove('media--loading');
        }
        let ads = document.querySelectorAll('div[id^="div-gpt-in-article-ad-"], div[class^="the-dfp__in-article-ATD"]');
        removeDOMElement(...ads);
      }
      else if (matchDomain(no_nhst_media_domains)) {
        let url = window.location.href;
        if (url.includes('.tradewindsnews.com/markets/')) {
          let paywall = document.querySelector('iframe[src]');
          removeDOMElement(paywall);
          let overflow = document.querySelector('body[style]');
          if (overflow)
            overflow.removeAttribute('style');
          let blurred = document.querySelector('body > div[style]');
          if (blurred)
            blurred.removeAttribute('style');
        } else {
          window.setTimeout(function () {
            let paywall = document.querySelector('iframe#paywall-iframe');
            if (paywall) {
              let intro = document.querySelector('div.global-article-selector');
              let article = paywall.parentNode;
              removeDOMElement(paywall, intro);
              fetch(url)
                .then(response => {
                  if (response.ok) {
                    response.text().then(html => {
                      let split1 = html.split('window.__INITIAL_STATE__=')[1];
                      let state = (split1.split('};')[0] + '}').split('</script>')[0];
                      if (state) {
                        let json = JSON.parse(state);
                        if (json) {
                          let json_text = json.article.body;
                          let parser = new DOMParser();
                          let doc = parser.parseFromString('<div>' + json_text + '</div>', 'text/html');
                          let article_new = doc.querySelector('div');
                          if (article_new) {
                            if (article)
                              article.appendChild(article_new);
                          }
                        }
                      }
                    })
                  }
                })
            }
          }, 500);
        }
      }
      else if (domain = matchDomain(usa_conde_nast_domains)) {
        setCookie(/^pay_ent_/, '', domain, '/', 0);
        if (window.location.pathname.endsWith('/amp')) {
          amp_unhide_subscr_section('amp-ad, amp-embed, .ad');
        } else {
          let paywall_bar = document.querySelector('.paywall-bar');
          removeDOMElement(paywall_bar);
        }
      }
      else if (matchDomain(usa_craincomm_domains)) {
        let body_hidden = document.querySelector('body[class]');
        if (body_hidden)
          body_hidden.removeAttribute('class');
        let lazy_images = document.querySelectorAll('img.lazy[data-src]');
        for (let lazy_image of lazy_images) {
          lazy_image.src = lazy_image.getAttribute('data-src');
          lazy_image.removeAttribute('class');
        }
        let lazy_sources = document.querySelectorAll('source[srcset^="data:image"]');
        removeDOMElement(...lazy_sources);
        let sponsored_article = document.querySelector('div.sponsored-article');
        if (sponsored_article)
          sponsored_article.classList.remove('sponsored-article');
      }
      else if (matchDomain(usa_outside_mag_domains)) {
        window.localStorage.clear();
        let paywall = document.querySelector('div.o-membership-overlay');
        if (paywall) {
          let is_gated = document.querySelectorAll('[class*="is-gated"]');
          for (let elem of is_gated)
            removeClassesByPrefix(elem, 'is-gated');
          removeDOMElement(paywall);
        }
        if (matchDomain('cyclingtips.com')) {
          let ads = document.querySelectorAll('div[data-block-name="ads"], div#takeover');
          removeDOMElement(...ads);
        }
      }
      else if (matchDomain(usa_tribune_domains)) {
        let overlay = document.querySelector('div#zephr-overlay');
        removeDOMElement(overlay);
      }
      else if (matchDomain('usatoday.com')) {
        if (window.location.hostname.startsWith('amp.')) {
          amp_unhide_access_hide('="gup.hasAssetAccess"', '', 'div[class*="ad-"]');
        } else {
          let paywall = document.querySelector('div.gnt_rb');
          let amphtml = document.querySelector('link[rel="amphtml"]');
          if (paywall && amphtml) {
            removeDOMElement(paywall);
            window.location.href = amphtml.href;
          }
          let roadblock = document.querySelector('.roadblock-container');
          if (roadblock) {
            removeDOMElement(roadblock);
            article_next = document.querySelector('article.next-in-depth-story > div.article-inner');
            if (article_next) {
              let url = article_next.getAttribute('data-url');
              let weblink = document.createElement('a');
              weblink.href = url;
              weblink.innerText = 'open next in-depth story';
              article_next.appendChild(weblink);
            }
          }
        }
      }
      else if (matchDomain('venturebeat.com')) {
        let paywall = document.querySelector('div.paywall');
        if (paywall)
          paywall.classList.remove('paywall');
      }
      else if (domain = matchDomain(usa_madavor_domains)) {
        setCookie(/^article_/, '');
        let banner = document.querySelector('div.free-articles-remaining');
        hideDOMElement(banner);
      }
      else if (matchDomain('washingtonpost.com')) {
        let leaderboard = document.querySelector('#leaderboard-wrapper');
        let adverts = document.querySelectorAll('div[data-qa$="-ad"]');
        removeDOMElement(leaderboard, ...adverts);
      }
      else if (matchDomain('winnipegfreepress.com')) {
        let ads = document.querySelectorAll('.billboard-ad-space, .ad, .article-ad, .fixed-sky');
        removeDOMElement(...ads);
      }
      else if (matchDomain('wsj.com')) {
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
      else if (matchDomain('zerohedge.com')) {
        let paywall = document.querySelector('div[class^="PremiumOverlay_container__"]');
        if (paywall) {
          removeDOMElement(paywall);
          let json_script = document.querySelector('script#__NEXT_DATA__');
          if (json_script) {
            try {
              let json = JSON.parse(json_script.innerText);
              if (json && json.props.pageProps.node.body) {
                let article_new = parseHtmlEntities(decode_utf8(atob(json.props.pageProps.node.body.substring(21))));
                let article = document.querySelector('div[class^="NodeContent_mainContent__"');
                if (article) {
                  article.innerHTML = '';
                  let parser = new DOMParser();
                  let doc = parser.parseFromString('<div>' + article_new + '</div>', 'text/html');
                  let content_new = doc.querySelector('div');
                  article.appendChild(content_new);
                }
              }
            } catch (err) {
              console.log(err);
            }
          }
        }
      }
      else if ((domain = matchDomain(usa_lee_ent_domains)) || document.querySelector('script[src*=".townnews.com/"][src*="/tncms/"]')) {
        if (window.location.pathname.endsWith('.amp.html')) {
          amp_unhide_access_hide('="hasAccess"', '="NOT hasAccess"', 'amp-ad, amp-embed, .amp-ads-container');
          let elem_hidden = document.querySelectorAll('html[class], body[class]');
          for (let elem of elem_hidden)
            elem.removeAttribute('class');
        } else {
          if (!domain) {
            function unscramble(t) {
              for (var n = "", i = 0, r = t.length; i < r; i++) {
                var s = t.charCodeAt(i);
                if (s >= 33 && s <= 126) {
                  var sTmp = String.fromCharCode(33 + (s - 33 + 47) % 94);
                  n += sTmp;
                } else
                  n += t.charAt(i);
              }
              return n;
            }
            let subscriber_only = document.querySelectorAll('div.subscriber-only');
            for (let elem of subscriber_only) {
              if (elem.classList.contains('encrypted-content')) {
                elem.innerHTML = unscramble(elem.textContent);
              }
              elem.removeAttribute('style');
              elem.removeAttribute('class');
            }
            let banners = document.querySelectorAll('div.subscription-required, div.redacted-overlay');
            removeDOMElement(...banners);
          }
          let ads = document.querySelectorAll('div.tnt-ads-container');
          removeDOMElement(...ads);
        }
      }
      else if (domain = matchDomain(usa_mcc_domains) || document.querySelector('meta[content^="https://www.mcclatchy-wires.com/"], a[href^="https://classifieds.mcclatchy.com/"], script[src*=".mcclatchyinteractive.com/"]')) {
        let url = window.location.href;
        let hostname = window.location.hostname;
        if (!domain)
          domain = hostname.replace(/^(www|account|amp)\./, '');
        setCookie('sessionz', '', domain, '/', 0);
        if (hostname.startsWith('account.') && window.location.search.startsWith('?resume=')) {
          window.setTimeout(function () {
            window.location.href = 'https://amp.' + domain + '/article' + url.split('resume=')[1].split(/[#&]/)[0] + '.html';
          }, 500);
        } else if (url.includes('amp.' + domain + '/')) {
          amp_unhide_subscr_section('amp-ad, amp-embed', false);
          let subscriptions_action = document.querySelector('div[subscriptions-action][subscriptions-display="NOT data.hasError"]');
          if (subscriptions_action)
            subscriptions_action.removeAttribute('subscriptions-action');
          let subscr_tag = document.querySelector('div#subscriber-exclusive-tag');
          let amp_players = document.querySelectorAll('amp-connatix-player');
          removeDOMElement(subscr_tag, ...amp_players);
        }
        let premium_svgs = document.querySelectorAll('h3 > a > svg');
        let premium_link;
        for (let premium_svg of premium_svgs) {
          premium_link = premium_svg.parentElement;
          if (premium_link.href.includes('www.'))
            premium_link.href = premium_link.href.replace('www.', 'amp.');
        }
        let ads = document.querySelectorAll('div[id^="zone-el-"]');
        removeDOMElement(...ads);
      }
      else if (matchDomain(usa_mng_domains) || (window.location.href.match(/\.com\/(\d){4}\/(\d){2}\/(\d){2}\/.+\/amp\//) && document.querySelector('amp-img#paywall[src*=".com/wp-content/plugins/dfm-amp-mods/"]'))) {
        if (window.location.pathname.endsWith('/amp/')) {
          amp_unhide_subscr_section('amp-ad, amp-embed, div.ampWrapperInside');
        }
      }
      else if (document.querySelector('script[src*=".axate.io/"]')) {
        let premium = document.querySelector('.premium, div[class*="-premium"]');
        if (premium)
          premium.removeAttribute('class');
      }
      else if (document.querySelector('img[srcset^="https://www.gannett-cdn.com/"], link[href*=".gannett-cdn.com/"]')) {
        var domain = window.location.hostname.replace(/^(www|amp)\./, '');
        setCookie('firefly_akamai_meter', '', domain, '/', 0);
        if (window.location.pathname.endsWith('/restricted/') && window.location.search.startsWith('?return=')) {
          let url = decodeURIComponent(window.location.href.split('?return=')[1]);
          let paywall = pageContains('div.message', 'This content is only available to subscribers.');
          if (paywall.length) {
            removeDOMElement(...paywall);
            let article = document.querySelector('article');
            if (article)
              article.firstChild.before(archiveLink(url));
          }
        }
      }
    }
  }, 1000);
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
