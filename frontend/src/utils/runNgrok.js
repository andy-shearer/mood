const ngrok = require('ngrok');

(async function() {
  const url = await ngrok.connect(3000);
  console.log(url);
})();

// To run this script:
// $ node runNgrok.js