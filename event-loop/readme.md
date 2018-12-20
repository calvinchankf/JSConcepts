Event Loop
===
1 sentence
---
Basically, it helps NodeJS to run async actions given that NodeJS is single-thread

Detail
---
Node is single-thread, it executes the code line by line, so how does it run async actions? 

**Event Loop** 

1. push the sync actions in call-stack and execute them LIFO but it enqueues the async actions in the task-queue 
1. periodically checks if the call-stack is empty. if it does, it dequeue the actions from the task-queue and push it to the call-stack for execution

[Video Explanation](https://www.youtube.com/watch?v=8aGhZQkoFbQ)