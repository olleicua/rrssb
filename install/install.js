(function() {
  var extend = function(out) {
    out = out || {};
    for (var i = 1; i < arguments.length; i++) {
    if (!arguments[i])
      continue;
      for (var key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key))
          out[key] = arguments[i][key];
      }
    }
    return out;
  };

  var map = function(arr, fn) {
    var results = [];
    for (var i = 0; i < arr.length; i++)
      results.push(fn(arr[i], i));
    return results;
  }

  window.INSTALL_RRSSB = {
    buttons: [],
    buildButtons: function() {
      return map(this.buttons, function(buttonTemplate) {
        return buttonTemplate(this.options);
      }).join('');
    },
    shareUri: function() {
      if (this.options.advancedOptions.keepUrlParameters) {
        return window.location.href;
      } else {
        return window.location.protocol + '//' + window.location.hostname + window.location.pathname;
      }
    },
    processOptions: function() {
      var shareUri = this.shareUri();
      return extend({}, this.options, {
        shareUri: shareUri,
        uriEncodedShareUri: encodeURIComponent(shareUri)
      });
    },
    register: function(name, template) {
      this.buttons.push(template);
    },
    init: function(element, options) {
      this.options = options;
      if (!element) {
        return;
      }
      options = this.processOptions(options);
      element.innerHTML = '<ul class="rrssb-buttons">' + this.buildButtons() + '</ul>';
    }
  }
}).call(this);
