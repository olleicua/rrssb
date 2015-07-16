(function() {
  window.INSTALL_RRSSB.register('hackernews', function(options, page) {
    var title;
    if (options.buttons.hackernews.auto) {
      title = page.title || page.description || '';
    } else {
      title = options.buttons.hackernews.title || '';
    }
    return '<li class="rrssb-hackernews"><a target="_blank" href="https://news.ycombinator.com/submitlink?u=' + encodeURIComponent(page.url) + '&t=' + encodeURIComponent(title) + '"><span class="rrssb-icon"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28"><path fill="#FFF" d="M14 13.626l-4.508-9.19H6.588l6.165 12.208v6.92h2.51v-6.92l6.15-12.21H18.69" /></svg></span><span class="rrssb-text">hackernews</span></a></li>';
  });
}).call(this);
