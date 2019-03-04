What is OAuth?
===
OAuth2 is an authorization framework that enables third-party applications to obtain limited access to user accounts on an Web Service, such as GitHub, Taobao, Lazada.

It works by delegating user authentication to the service that hosts the user account, and authorizing third-party applications to access the user account. OAuth2 provides authorization flows for web, desktop and mobile apps.

1. Guide the user to the authorization
```
https://auth.lazada.com/oauth/authorize?response_type=code&force_auth=true&redirect_uri=${app call back url}&client_id=${appkey}
```

2. once the user agrees to the terms, the provider(lazada) will request your server(developer) via redirect_uri(callback url)
```
https://app.branch8.com/callback?code={auth code}
```

3. your server(developer) use that code to get an access token and refresh token
```
https://auth.lazada.com/v1/oauth/token?client_id={appkey}&code={auth code}
```

4. save the tokens for later requests

5. schedule your server/request on demand to get the refresh token before it expires

Reminder
------
Since cookies are not involved, we dont need csrf_token to protect the endpoint, either the apikey approach

Reference:
---
https://open.lazada.com/doc/doc.htm?spm=a2o9m.11193487.0.0.3ac413feOdB03F#?nodeId=10777&docId=108260