function* gen(param) {
  for (let i = 0; i < 3; i++) {
    yield (i + 1) * param
  }
  return 4 * param
}

var g = gen(2); // "Generator { }"
console.log(g.next()) // 2 false
console.log(g.next()) // 4 false
console.log(g.next()) // 6 false
console.log(g.next()) // 8 true