Function.prototype.bindPolyfill = function(obj) {
    const context = this;
    return function(...args){
        return context.call(obj, ...args)
    }
}