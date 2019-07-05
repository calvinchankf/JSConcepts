How to optimize performance? [WIP]
----
- memory leak: 
    - Profile/monitor your app, find and fix memory leaks by capturing snapshots of your app while it is running, to see if there is any memory leak. If the memory usage keeps piling up and not going down after a certain period of time(after several mark&sweep), it means that there is a memory leak. 
    - memory leaks usually happen with Global Variables, Multiple References, Closures 
    - Tools: node-inspector, node-memwatch, chrome-devtools(browser) 
- check the time&space complexity of your algorithms 
- testcases: corner cases caught? any crash?
- compress your source code(build) for production