Optimization
===

HTML
--

1. **Minified HTML**: The HTML code is minified, comments, white spaces and new lines are removed from production files.

    Why:

    Removing all unnecessary spaces, comments and break will reduce the size of your HTML and speed up your site's page load times and obviously lighten the download for your user.

    How:

    Most of the frameworks have plugins to facilitate the minification of the webpages. You can use a bunch of NPM modules that can do the job for you automatically.

2. **Place CSS tags always before JavaScript tags**: Ensure that your CSS is always loaded before having JavaScript code.

    ```html
    <!-- Not recommended -->
    <script src="jquery.js"></script>
    <script src="foo.js"></script>
    <link rel="stylesheet" href="foo.css"/>

    <!-- Recommended -->
    <link rel="stylesheet" href="foo.css"/>
    <script src="jquery.js"></script>
    <script src="foo.js"></script>
    ```

    Why:

    Having your CSS tags before any JavaScript enables better, parallel download which speed up browser rendering time.

    How:
    Ensure that `<link>` and `<style>` in your `<head>` are always before your `<script>`.

3. **Remove unnecessary attributes**: Type attributes like `type="text/javascript"` or `type="text/css"` are not required anymore and should be removed.

    ```html
    <!-- Before HTML5 -->
    <script type="text/javascript">
        // JavaScript code
    </script>

    <!-- Today -->
    <script>
        // JavaScript code
    </script>
    ```
    Why:

    Type attributes are not necessary as HTML5 implies text/css and text/javascript as defaults. Unused code should be removed when not used by your website or app as they add more weight to your pages.

    How:

    ⁃ Ensure that all your `<link>` and `<script>` tags don't have any type attribute.

CSS
---

1. **Minification**: All CSS files are minified, comments, white spaces and new lines are removed from production files.

    Why:

    When CSS files are minified, the content is loaded faster and less data is sent to the client. It's important to always minify CSS files in production. It is beneficial for the user as it is for any business who wants to lower bandwidth costs and lower resource usage.

    How:

    ⁃ Use tools to minify your files automatically before or during your build or your deployment. e.g. uglify

2. **Non-blocking**: CSS files need to be non-blocking to prevent the DOM from taking time to load.
    ```html
    <link rel="preload" href="global.min.css" as="style" onload="this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="global.min.css"></noscript>
    Why:
    ```

    CSS files can block the page load and delay the rendering of your page. Using preload can actually load the CSS files before the browser starts showing the content of the page.

    How:

    ⁃ You need to add the rel attribute with the preload value and add as="style" on the <link> element.

Image
---
1. **Images optimization**: Your images are optimized, compressed without direct impact to the end user.

    Why:

    Optimized images load faster in your browser and consume less data.

    How:

    ⁃ Try using CSS3 effects when it's possible (instead of a small image) 
    ⁃ When it's possible, use fonts instead of text encoded in your images 
    ⁃ Use SVG 
    ⁃ Use a tool and specify a level compression under 85.
2. **Responsive images**: Ensure to serve images that are close to your display size.

    Why:

    Small devices don't need images bigger than their viewport. It's recommended to have multiple versions of one image on different sizes.

    How:

    ⁃ Create different image sizes for the devices you want to target. 
    ⁃ Use srcset and picture to deliver multiple variants of each image.
3. **Lazy loading**: medium Offscreen images are loaded lazily (A noscript fallback is always provided).

    Why:

    It will improve the response time of the current page and then avoid loading unnecessary images that the user may not need.

    How:

    ⁃ Use Lighthouse to identify how many images are offscreen. 
    ⁃ Use a JavaScript plugin like the following to lazyload your images. Make sure you target offscreen images only. 
    ⁃ Also make sure to lazyload alternative images shown at mouseover or upon other user actions.

Javascript
---
1. **JS Minification**: All JavaScript files are minified, comments, white spaces and new lines are removed from production files (still valid if using HTTP/2).

    Why:

    Removing all unnecessary spaces, comments and break will reduce the size of your JavaScript files and speed up your site's page load times and obviously lighten the download for your user.

    How:

    ⁃ Use the tools suggested below to minify your files automatically before or during your build or your deployment. e.g. **uglify**

2. **No JavaScript inside HTML**: (Only valid for website) Avoid having multiple JavaScript codes embedded in the middle of your body. Regroup your JavaScript code inside external files or eventually in the `<head>` or at the end of your page (before `</body>`).

    Why:

    Placing JavaScript embedded code directly in your `<body>` can slow down your page because it loads while the DOM is being built. The best option is to use external files with async or defer to avoid blocking the DOM. Another option is to place some scripts inside your `<head>`. Most of the time analytics code or small script that need to load before the DOM gets to main processing.

    How:

    Ensure that all your files are loaded using async or defer and decide wisely the code that you will need to inject in your `<head>`.

3. **Non-blocking JavaScript**: JavaScript files are loaded asynchronously using async or deferred using defer attribute.

    ```html
    <!-- Defer Attribute -->
    <script defer src="foo.js"></script>

    <!-- Async Attribute -->
    <script async src="foo.js"></script>
    Why:
    ```

    JavaScript blocks the normal parsing of the HTML document, so when the parser reaches a `<script>` tag (particularly is inside the `<head>`), it stops to fetch and run it. Adding async or defer are highly recommended if your scripts are placed in the top of your page but less valuable if just before your `</body>` tag. But it's a good practice to always use these attributes to avoid any performance issue.

    How:

    ⁃ Add async (if the script don't rely on other scripts) or defer (if the script relies upon or relied upon by an async script) as an attribute to your script tag. 
    ⁃ If you have small scripts, maybe use inline script place above async scripts.

Others
---
1. Enable Prefetching

    Prefetching can improve your visitors’ browsing experience by fetching necessary resources and related data before they are needed. There are 3 main types of prefetching:

    - Link Prefetching
    - DNS Prefetching
    - Prerendering

2. Use CDN and Caching

    When you use a CDN, you link your website’s static content to an extended network of servers across the globe. This is especially important if your website caters to a global audience. The CDN allows your site’s visitors to load data from their nearest server