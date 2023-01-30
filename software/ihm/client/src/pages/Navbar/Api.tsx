export function getApi(setValue) {
    try {
        let result = fetch("/api", {
            method: 'GET'
        })
        result.then((sucess) => { console.log(sucess) })
        result.then((res) => res.json()).then((data) => setValue(data.message));
    } catch (error) {
        console.log(error);
    }
}