type Callback = (...args: any[]) => any;

class EventEmitter {
    ht: {[key: string]: Map<Callback, number>} = {}
    
	subscribe(eventName: string, callback: Callback, freq=Infinity): EventEmitter {
		this.ht[eventName] = this.ht[eventName] || new Map()
        this.ht[eventName].set(callback, freq) // Infinity by default
        return this
	}
    once(eventName: string, callback: Callback) {
        this.subscribe(eventName, callback, 1)
    }
    unsubscribe(eventName: string, callback: Callback): void {
        this.ht[eventName].delete(callback)
        if (this.ht[eventName].size === 0) {
            delete this.ht[eventName]
        }
    }
	emit(eventName: string, args: any[] = []): any[] {
		if (eventName in this.ht === false) { return []}
        const res: any = []
        this.ht[eventName].forEach((freq, callback) => {
            const temp = callback(...args)
            res.push(temp)
            freq -= 1
            if (freq === 0) {
                this.unsubscribe(eventName, callback)
            } else {
                this.ht[eventName].set(callback, freq)
            }
        })
        return res
	}
}