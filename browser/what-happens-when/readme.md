What happens when you click a link on a webpage?
===

Short 
------- 
When we click a URL in a browser, our browser first split the URL into 3 parts, protocol, domain name, path and uses DNS to look up the IP address for that domain, and then sends a request (packet) to the right IP address for the website. And when the server at that address responds, it will send us the content of the website in a packet with our address as the destination. 

Details: 
------ 
1. the browser knows where you have clicked and it gets the URL from it
2. split the URL into protocol, domain name, path 
3. translate the domain name into an IP address(looks up from browser cache > router cache > ISP cache > recursive search on DNS servers) 
4. once the browser receives the IP address, it will build a connection with IP address with TCP 3 ways **handshake**(see TCP handshake) 
5. once the connection is established, the browser will send a GET request, in a package, of the **path** to the IP address over the **protocol**
6. the server receives the request from your browser and send back a response 
7. your browser receives the response and render the content from the response on the canvas(see [render](../render/readme.md))

Reference: 
- https://www.youtube.com/watch?v=keo0dglCj7I