let Foo, f

Foo = function(a) {
    function bar() {
        return a;
    }
    this.baz = function() {
        return a;
    };
};
Foo.prototype = {
    biz: function(a) {
        return a;
    }
};

f = new Foo(7);
// what will be the output?
// console.log(f.bar()); // not a function error
// console.log(f.baz()); // 7 <- because when Foo is init-ed, 'a' is captured within the instance, so its method can access 'a'
console.log(f.biz()); // undefined

console.log("-----")

/*
    How to make the first and third also return 7?
*/

Foo = function(a) {
    this.a = a
    this.bar = function() {
        return this.a;
    }
    this.baz = function() {
        return this.a;
    };
};
Foo.prototype = {
    biz: function() {
        return this.a;
    }
};

f = new Foo(7);
// what will be the output?
console.log(f.bar()); // not a function error
console.log(f.baz()); // 7
console.log(f.biz()); // 

/*
    Reminder: this is how leetcode declare a binary tree node

    function TreeNode(val) {
        this.val = val;
        this.left = this.right = null;
    }
*/
