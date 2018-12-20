1 sentence
----
Garbage Collection: clear the heap memory by releasing the memory of the objects which the program no longer references to.

Detail
----
According to [google](https://developers.google.com/web/tools/chrome-devtools/memory-problems/memory-101), we can think of V8 storing objects in a graph. Periodically, the V8 garbage-collector starts traversing the nodes from the root, find all nodes that are not referenced from the root and then eliminate them to free some space(memory).

**Mark and Sweep Algorithm**

**Mark phase**
```
Mark(root)
    If markedBit(root) == false then
        markedBit(root) = true
        For each child of root
             Mark(child)
```

**Sweep phase**
```
Sweep()
For each obj in heap
    If markedBit(obj) == true then
        markedBit(obj) = false
    else
        heap.release(obj)
```

Pros:
- prevent retain cycle
- no additional overheads incurred during the execution of the algorithm

Cons:
- the program needs to be suspended while the garbage collection runs
- fragmentation: there will be unused memory regions after mark-and-sweep runs. To optimize, the fragmentation can be reduced by memory heap compaction