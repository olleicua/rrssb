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
  };

  var getFullPath = function(path) {
    var a = document.createElement('a');
    a.href = path;
    return a.href;
  };

  var getMeta = function(selector, property, isURL) {
    var el, value;
    value = null;
    if (document.head && (el = document.head.querySelector(selector))) {
      value = el.getAttribute(property);
      if (isURL) {
        value = getFullPath(value);
      }
    }
    return value;
  };

  var getPageAttributes = function(options) {
    var page = {
      url: window.location.protocol + '//' + window.location.hostname + window.location.pathname,
      title: document.title,
      description: getMeta('meta[name="description"][content], meta[property="og:description"][content]', 'content'),
      image: getMeta('meta[property="og:image"][content]', 'content', true)
    };

    if (options.advancedOptions && options.advancedOptions.keepUrlParameters) {
      page.url = window.location.href;
    }
    page.url = getMeta('meta[rel="canonical"][href]', 'href', true) || page.url;
    page.url = getMeta('meta[property="og:url"][content]', 'content', true) || page.url;
    page.title = getMeta('meta[property="og:title"][content]', 'content') || page.title;

    return page;
  };

  window.INSTALL_RRSSB = {

    // an array of registered button generating templates
    buttons: [],

    // build up a string with an li in it for each registered button
    buildButtons: function() {
      var options = this.options;
      var page = getPageAttributes(options);
      return map(this.buttons, function(buttonTemplate) {
        var name = buttonTemplate[0], templateFunction = buttonTemplate[1];
        if (options.buttons[name].enabled) {
          return templateFunction(options, page);
        } else {
          return '';
        }
      }).join('');
    },

    // add a button template function to the array of registered buttons
    register: function(name, template) {
      this.buttons.push([name, template]);
    },

    // add the buttons to the DOM
    init: function(element, options) {
      this.options = options;
      if (!element) {
        return;
      }
      element.innerHTML = '<ul class="rrssb-buttons">' + this.buildButtons() + '</ul>';
    }
  }
}).call(this);
