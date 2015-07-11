(function() {
  window.INSTALL_RRSSB.register('email', function(options) {
    return '<li class="rrssb-tumblr">\
          <a href="http://tumblr.com/share/link?url=' + options.uriEncodedShareUri + '">\
            <span class="rrssb-icon">\
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">\
                <path d="M18.02 21.842c-2.03.052-2.422-1.396-2.44-2.446v-7.294h4.73V7.874H15.6V1.592h-3.714s-.167.053-.182.186c-.218 1.935-1.144 5.33-4.988 6.688v3.637h2.927v7.677c0 2.8 1.7 6.7 7.3 6.6 1.863-.03 3.934-.795 4.392-1.453l-1.22-3.54c-.52.213-1.415.413-2.115.455z"\
                />\
              </svg>\
            </span>\
            <span class="rrssb-text">tumblr</span>\
          </a>\
        </li>';
  });
}).call(this);
