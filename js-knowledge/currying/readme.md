What is Currying?
===
- Currying helps you to avoid passing the same variable again and again.
- It helps to create a higher order function

Practical Example
---

1. **Reuse Function**

    For example, you own a store🏠 and you want to give 10%💵 discount to your fav customers:
    ```js
    function discount(price, discount) {
        return price * discount
    }
    ```
    Every time you calculate
    ```js
    const price = discount(1500,0.10); // $150
    // $1,500 - $150 = $1,350
    const price = discount(2000,0.10); // $200
    // $2,000 - $200 = $1,800
    const price = discount(50,0.10); // $5
    // $50 - $5 = $45
    const price = discount(5000,0.10); // $500
    // $5,000 - $500 = $4,500
    const price = discount(300,0.10); // $30
    // $300 - $30 = $270
    ```

    But if we use currying
    ```js
    function discount(discount) {
        return (price) => {
            return price * discount;
        }
    }
    const twentyPercentDiscount = discount(0.2);
    ```
    we can just
    ```js
    twentyPercentDiscount(500); // 100
    // $500 - $100 = $400
    twentyPercentDiscount(5000); // 1000
    // $5,000 - $1,000 = $4,000
    twentyPercentDiscount(1000000); // 200000
    // $1,000,000 - $200,000 = $600,000
    ```

2. **Avoid frequently calling a function with the same argument**

    For example, we have a function to calculate the volume of a cylinder
    ```js
    function volume(l, w, h) {
        return l * w * h;
    }
    volume(200,30,100) // 2003000l
    volume(32,45,100); //144000l
    volume(2322,232,100) // 53870400l
    ```
    but if we use currying
    ```js
    function volume(h) {
        return (w) => {
            return (l) => {
                return l * w * h
            }
        }
    }
    const hCylinderHeight = volume(100);
    hCylinderHeight(200)(30); // 600,000l
    hCylinderHeight(2322)(232); // 53,870,400l
    ```

  3. General Currying
  ```js
  const avg = function(...nums) {
    let tot = 0
    for (let i = 0; i < nums.length; i++) {
      tot += nums[i]
    }
    return tot/nums.length
  }
  const curry = function(fn, ...nums) {
    return function(...m) {
      return fn.apply(this, nums.concat(m));
    }
  }
  const doAvg = curry(avg, 1,2,3)
  console.log(doAvg(3,4,5))
  console.log(doAvg(6,7,8))
  ```    

Reference
---
- https://blog.bitsrc.io/understanding-currying-in-javascript-ceb2188c339