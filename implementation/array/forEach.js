/*
  classic interivew question
  Implementation the Array Map
  here is my least implementation to extend the Array class using protoype
*/
if (!Array.prototype.myForEach) {
	Array.prototype.myForEach = function (callback) {
		if (typeof callback !== "function") {
			throw new Error(callback + " is not a function");
		}
		for (let i = 0; i < this.length; i++) {
			callback(this[i], i);
		}
	};
}

const a = [1, 2, 3];
a.myForEach((item, idx) => {
	console.log(item, idx);
});
