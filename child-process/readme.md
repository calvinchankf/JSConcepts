Child Prcocess
===
Node is single-threaded. If we want to work on tasks parallelly, we can try to use child_process. Which helps us to 'spawn' a new process in our machine, and the processes can communicate through IPC(Inter Process Communication)

Some commands
---
create an instance of node with IPC support 
```
child_process.fork()
```

run any command and creat IPC channel
```
child_process.spawn()
```

run any command in the child process
```
child_process.exec()
```

...i am no gonna include all

example
---
```
node parent.js
```