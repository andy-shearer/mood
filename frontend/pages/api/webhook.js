
export default function handler(req, res) {
  // TODO: Authenticate 'X-Twilio-Signature' header
  res.status(200).json({
    message: 'Received!'
  });

  // Just debug the inbound request currently
  console.log("\n====================================\n", new Date().toLocaleTimeString("en-GB"));

  console.log(req.method, req.url, 'HTTP/' + req.httpVersion);
//  for (var name in req.headers) {
//    console.log(name + ':', req.headers[name]);
//  }
  console.log(req.body);
  //console.debug(req);
  console.log("\n====================================\n");
}