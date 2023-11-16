# How does cross-site scripting (XSS) work?

There are many ways to trigger an XSS attack. For example, the execution could be triggered automatically when the page loads or when a user hovers over specific elements of the page (e.g., hyperlinks).

To carry out a cross-site scripting attack, an attacker injects a malicious script into user-provided input. Attackers can also carry out an attack by modifying a request. If the web app is vulnerable to XSS attacks, the user-supplied input executes as code. For example, in the request below, the script displays a message box with the text “xss.”

```
http://www.site.com/page.php?var=<script>alert('xss');</script>
```

Potential consequences of cross-site scripting attacks include:

- Capturing the keystrokes of a user
- Redirecting a user to a malicious website
- Running web browser–based exploits (e.g., crashing the browser)
- Obtaining the cookie information of a user who is logged into a website, thus compromising the victim’s account

## Stored XSS

takes place when the malicious payload is stored in a database. It renders to other users when data is requested if there is no output encoding or sanitization.

## Reflected XSS

occurs when a web application sends attacker-provided strings to a victim’s browser so that the browser executes part of the string as code. The payload echoes back in response since it doesn’t have any server-side output encoding.

## DOM-based XSS

takes place when an attacker injects a script into a response. The attacker can read and manipulate the document object model (DOM) data to craft a malicious URL. The attacker uses this URL to trick a user into clicking it. If the user clicks the link, the attacker can steal the user’s active session information, keystrokes, and so on. Unlike stored XSS and reflected XSS, the entire DOM-based XSS attack happens on the client browser (i.e., nothing goes back to the server).

# How to avoid

### 1. Never trust user input

Always perform input validation and sanitization on input originating from untrusted sources as soon as you receive it.

### 2. Implement output encoding

This step is performed prior to writing user-controllable data. Output encoding escapes user input and ensures that the browser interprets it as benign data and not as code.

### 3. Perform penetration testing

to confirm remediation was successful. Seasoned penetration testers can implement the right real-world attack scenarios to ensure that your high-risk XSS vulnerabilities are fortified.
