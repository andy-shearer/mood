const ngrok = require('ngrok');

(async function() {
  const url = await ngrok.connect(1337);
  console.log(url);
})();

// To run this script:
// $ node runNgrok.js