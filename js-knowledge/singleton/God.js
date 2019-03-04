class God {
  constructor() {
    if (God.instance) {
      return God.instance;
    }
    // set singleton
    God.instance = this
  }
  static getInstance() {
    if (God.instance) {
      return God.instance
    }
    throw new Error("Please init first")
  }
}
// declare singleton
God.instance = null

module.exports = God