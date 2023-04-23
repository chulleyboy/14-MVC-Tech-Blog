const Handlebars = require('handlebars');

// Define the helper function
Handlebars.registerHelper('equals', function (value1, value2, options) {
  if (value1 === value2) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
