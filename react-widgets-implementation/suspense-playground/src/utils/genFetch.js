// This is the most critical part for using Suspend
// aka. Suspense-enabled data sources
function genFetch(url) {
    let status = "pending";
    let result;
    let suspender = fetch(url)
        .then((res) => res.json())
        // Fetch request has gone well
        .then((success) => {
            status = "fulfilled";
            result = success;
        })
        // Fetch request has failed
        .catch((error) => {
            status = "rejected";
            result = error;
        });

    const read = () => {
        if (status === "pending") {
            throw suspender; // Suspend(A way to tell React data is still fetching)
        } else if (status === "rejected") {
            throw result; // Result is an error
        } else if (status === "fulfilled") {
            return result; // Result is a fulfilled promise
        }
    };

    return { read }
}

export default genFetch;