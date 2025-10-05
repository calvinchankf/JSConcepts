/*
    Implement a function that returns a new object after squashing the input object 
    into a single level of depth where nested keys are "squashed" together with a period delimiter (.)

    e.g.1
    const object = {
        a: 5,
        b: 6,
        c: {
            f: 9,
            g: {
            m: 17,
            n: 3,
            },
        },
    };
    squashObject(object); // { a: 5, b: 6, 'c.f': 9, 'c.g.m': 17, 'c.g.n': 3 }

    e.g.2
    const object = {
        a: { b: null, c: undefined },
    };
    squashObject(object); // { 'a.b': null, 'a.c': undefined }

    e.g.3
    const object = { a: { b: [1, 2, 3], c: ['foo'] } };
    squashObject(object); // { 'a.b.0': 1, 'a.b.1': 2, 'a.b.2': 3, 'a.c.0': 'foo' }

    e.g.4
    const object = {
        foo: {
            '': { '': 1, bar: 2 },
        },
    };
    squashObject(object); // { foo: 1, 'foo.bar': 2 }
*/
export default function squashObject(obj: Object): Object {

  const output: Record<string, any> = {}

  const dfs = (obj: Object, path: Array<string>) => {
    for (const [key, value] of Object.entries(obj)) {
      const newPath = path.concat(key)
      if (typeof value !== 'object' || value === null || value === undefined) {
        output[newPath.filter(Boolean).join('.')] = value
      } else {
        dfs(value, newPath)
      }
    }
  }
  
  dfs(obj, [])
  return output
}