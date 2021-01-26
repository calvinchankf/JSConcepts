/*
    https://dmitripavlutin.com/timeout-fetch-request/
*/
const fetchWithTimeout = async (url, timeout = 5000) => {
    
    const controller = new AbortController();

    const ref = setTimeout(() => controller.abort(), timeout);
  
    const response = await fetch(url, {
      signal: controller.signal  
    });

    clearTimeout(ref);
    return response;
}

/*
    Usage
*/
const loadSomething = async () => {
    try {
      const response = await fetchWithTimeout('/something', 3000);
      const games = await response.json();
      return games;
    } catch (error) {
      console.log(error.name === 'AbortError');
    }
}

/*
    followup: with retry
*/
const retryFetchWithTimeout = async (url, maxCount = 5) => {
    let count = 0
    while (count < maxCount) {
        try {
            const res = await fetchWithTimeout(url)
            return res
        } catch (error) {
            if (error.name === 'AbortError') {
                count += 1
            } else {
                return error
            }
        }
    }
}
/*
    Usage
*/
const loadSomethingAtMostKTimes = async (k) => {
    try {
      const response = await retryFetchWithTimeout('/something', 3);
      const games = await response.json();
      return games;
    } catch (error) {
      console.log(error.name === 'AbortError');
    }
}