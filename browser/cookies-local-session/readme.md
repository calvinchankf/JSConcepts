Cookies vs LocalStorage vs SessionStorage
===
Cookies 
- stays until the expiry date set by the server. But if the server doesn't set the expiry date, the cookies will be pruned once the user leaves the website 
- can be made secure by setting the httpOnly=true. This prevents client-side access to that cookie 
- 4kb 

LocalStorage 
- stays on a browser forever unless be cleaned explicitly 
- 5Mb 
- use case: shopping cart/ads BUT browsers cannot share localStorage!!! 

SessionStorage 
- stays on a browser until a user leaves the website 
- 5Mb