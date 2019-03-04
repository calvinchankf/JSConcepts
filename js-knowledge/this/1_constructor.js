// it prints { value: 10}
// it means that 'this' is refering to the 'ConstructorExample'
function ConstructorExample() {
  console.log(this);
  this.value = 10;
  console.log(this);
}

new ConstructorExample();

// for example, it is how leetcode defines a Binary Tree 
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}