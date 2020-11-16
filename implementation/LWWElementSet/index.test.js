const LWWElementSet = require('./index');

describe('basic operations: insert, remove, has, get', () => {
    test('insert a key', () => {
        const s = new LWWElementSet()
        s.insert('AAA')
        expect(s.has('AAA'))
    });
    
    test('remove a key', async () => {
        const s = new LWWElementSet()
        s.insert('AAA', 1)
        s.remove('AAA', 2)
        expect(s.has('AAA')).toBe(false)
        expect(s.addSet['AAA']).toBeLessThan(s.removeSet['AAA'])
    });

    test('get a key', () => {
        const s = new LWWElementSet()
        s.insert('AAA', 1337)
        expect(s.has('AAA'))
        expect(s.get('AAA')).toBe(1337)
    });
    
    test('remove a key, insert it back with differnt timestamps', () => {
        const s = new LWWElementSet()
        s.insert('AAA', 1)
        s.remove('AAA', 2)
        s.insert('AAA', 3)
        expect(s.has('AAA')).toBe(true)
        expect(s.removeSet['AAA']).toBeLessThanOrEqual(s.addSet['AAA'])
    });

    test('remove a key, insert it back with the same timestamp <= check my bias strategy(adds)', () => {
        const s = new LWWElementSet()
        s.insert('AAA', 1)
        s.remove('AAA', 1)
        expect(s.has('AAA')).toBe(true)
        expect(s.addSet['AAA']).toBe(s.removeSet['AAA'])
    });
})

describe('operation: merge', () => {
    test('merge 2 sets that they dont have common keys', () => {
        const s1 = new LWWElementSet()
        s1.insert('AAA')
        const s2 = new LWWElementSet()
        s2.insert('BBB')
        const s3 = LWWElementSet.merge(s1, s2)
        expect(s3.has('AAA'))
        expect(s3.has('BBB'))
    });
    
    test('merge 2 sets that they have a common key, store the latest timestamp of it', () => {
        const s1 = new LWWElementSet()
        s1.insert('AAA', 100)
        const s2 = new LWWElementSet()
        s2.insert('AAA', 99)
        const s3 = LWWElementSet.merge(s1, s2)
        console.log(s3)
        expect(s3.has('AAA'))
        expect(s3.get('AAA')).toBe(100)
    });
    
    test('merge 2 sets that they have a common key with the same timestamp', () => {
        const s1 = new LWWElementSet()
        s1.insert('AAA', 99)
        const s2 = new LWWElementSet()
        s2.insert('AAA', 99)
        const s3 = LWWElementSet.merge(s1, s2)
        console.log(s3)
        expect(s3.has('AAA'))
        expect(s3.get('AAA')).toBe(99)
    });
})