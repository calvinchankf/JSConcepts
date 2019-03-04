function fn() {
  console.log(this);
}
// If called in browser:
fn(); // it prints the node contextd because node executes it