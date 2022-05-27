function getGoogleOAuthURL() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

  const options = {
    redirect_uri: "https://mood-nft.herokuapp.com/api/sessions/oauth/google",
    client_id: "652470402054-qnlbt8p80d67b7kg236540rj3s8bsrdo.apps.googleusercontent.com",
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  // console.log({ options });

  const qs = new URLSearchParams(options);

  // console.log(qs.toString());

  return `${rootUrl}?${qs.toString()}`;
}

export default getGoogleOAuthURL;
