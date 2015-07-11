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

    // an array of registered button generating templates
    buttons: [],

    // build up a string with an li in it for each registered button
    buildButtons: function() {
      var options = this.options
      return map(this.buttons, function(buttonTemplate) {
        return buttonTemplate(options);
      }).join('');
    },

    // generate the uri that will be shared
    shareUri: function() {
      if (this.options.advancedOptions &&
          this.options.advancedOptions.keepUrlParameters) {
        // include url parameters (e.g. 'example.com?parameter=value'
        return window.location.href;
      } else {
        return window.location.protocol + '//' + window.location.hostname + window.location.pathname;
      }
    },

    // add the share uri and a url encoded version of it to the options
    processOptions: function() {
      var shareUri = this.shareUri();
      return extend({}, this.options, {
        shareUri: shareUri,
        uriEncodedShareUri: encodeURIComponent(shareUri)
      });
    },

    // add a button template function to the array of registered buttons
    register: function(name, template) {
      this.buttons.push(template);
    },

    // add the buttons to the DOM
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
