var base = require('./install.template.json');
var fs = require('fs');
var formatJSON = require('format-json');
var buttons = {
  twitter: {
    options: ['text'],
    'default': true
  },
  facebook: {
    'default': true
  },
  googleplus: {
    title: 'Google+',
    'default': true
  },
  pinterest: {},
  linkedin: {
    title: 'LinkedIn',
    options: ['title', 'summary']
  },
  tumblr: {},
  reddit: {
    title: 'reddit',
    options: ['title']
  },
  hackernews: {
    title: 'Hacker News',
    options: ['title']
  },
  pocket: {},
  vk: {
    title: 'VK'
  },
  email: {
    options: ['subject', 'body']
  }
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
        'order': 1,
        'title': 'Show',
        'type': 'boolean',
        'default': obj.default || false
      }
    }
  };
  if (obj.options) {
    buttonObj[key].properties.auto = {
      'order': 2,
      'showIf': {},
      'title': 'Automatically set sharing text from page contents',
      'type': 'boolean',
      'default': true
    };
    buttonObj[key].properties.auto.showIf['buttons.' + key + '.enabled'] = true;
    for (var j = 0; j < obj.options.length; j++) {
      var option = obj.options[j];
      buttonObj[key].properties[option] = {
        'order': j + 3,
        'showIf': {},
        'title': capitalize(option),
        'type': 'string'
      };
      buttonObj[key].properties[option].showIf['buttons.' + key + '.enabled'] = true;
      buttonObj[key].properties[option].showIf['buttons.' + key + '.auto'] = false;
    }
  }
}
[].splice.apply(base.resources.body, [1, 0].concat(buttonResources));

fs.writeFileSync('install.json', formatJSON.plain(base), {flag: 'w'});
