var base = require('./install.template.json');
var fs = require('fs');
var formatJSON = require('format-json');
var buttons = {
  email: {
    options: ['subject']
  },
  facebook: {
    'default': true
  },
  tumblr: {},
  linkedin: {
    title: 'LinkedIn',
    options: ['title', 'summary']
  },
  twitter: {
    options: ['text'],
    'default': true
  },
  reddit: {
    title: 'reddit',
    options: ['title', 'text']
  },
  hackernews: {
    title: 'Hacker News',
    options: ['title', 'text']
  },
  googleplus: {
    title: 'Google+',
    options: ['text'],
    'default': true
  },
  pinterest: {
    options: ['description']
  },
  pocket: {},
  vk: {}
};

var capitalize = function(string) {
  return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase();
};

var buttonObj = base.options.properties.buttons.properties;
var buttonResources = [];
var i = 0;
for (var key in buttons) {
  i++;
  var obj = buttons[key];
  buttonResources.push({
    'type': 'script',
    'if': 'options.buttons.' + key + '.enabled',
    'src': './install/templates/' + key + '.js'
  });
  buttonObj[key] = {
    'order': i,
    'title': obj.title || capitalize(key),
    'type': 'object',
    'properties': {
      'enabled': {
        'title': 'Show',
        'type': 'boolean',
        'default': obj.default || false
      }
    }
  };
  if (obj.options) {
    for (var j = 0; j < obj.options.length; j++) {
      var option = obj.options[j];
      buttonObj[key].properties[option] = {
        'order': j + 1,
        'showIf': {},
        'title': capitalize(option),
        'type': 'string'
      };
      buttonObj[key].properties[option].showIf['buttons.' + key + '.enabled'] = true;
    }
  }
}
[].splice.apply(base.resources.body, [1, 0].concat(buttonResources));

fs.writeFileSync('install.json', formatJSON.plain(base), {flag: 'w'});