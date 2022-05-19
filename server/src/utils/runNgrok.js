// Configures HTTP tunnelling on port 1337 to allow the webhook endpoint to be publicly reachable
// To run this script:
// $ node runNgrok.js
const ngrok = require('ngrok');

(async function() {
  const url = await ngrok.connect(1337);
  console.log(url);
})();
