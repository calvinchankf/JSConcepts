How to optimize performance? [WIP]
----
- memory leak: find and fix memory leaks by capturing snapshots of your applications while it is running, to monitor if the memory usage. If the memory usage keeps piling up and not going down after a certain period of time(mark&sweep), it means that there is a memory leak. Tools: node-inspector, node-memwatch, chrome-devtools(browser) 
- memory leaks usually happen with Global Variables, Multiple References, Closures 
- check the time&space complexity of your algorithms 
- testcases: corner cases caught? any crash?