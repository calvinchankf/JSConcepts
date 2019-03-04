const fetchData = () => {

  // e.g. 1
  // return Promise.resolve('hi, i am from promise')

  // e.g. 2
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("hi, i am from promise");
    }, 250);
  });
}

const runit = async () => {
  try {
    const result = await fetchData()
    console.log(result)
  } catch (error) {
    console.error(error)
  }
}

runit()