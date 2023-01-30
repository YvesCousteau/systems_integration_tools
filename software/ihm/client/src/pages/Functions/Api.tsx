export function getDevices(setValue) {
    try {
        let result = fetch("/api/devices/", {
            method: 'GET'
        })
        result.then((sucess) => { console.log(sucess) })
        result.then((res) => res.json()).then((data) => setValue(data.data));
    } catch (error) {
        console.log(error);
    }
}

export function updateFunction(id,body) {
    try {
        let result = fetch("/api/function/"+id, {
            method: 'PATCH',
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        result.then((sucess) => { console.log(sucess) })
    } catch (error) {
        console.log(error);
    }
}

export function deleteFunction(id) {
    try {
        let result = fetch("/api/function/"+id, {
            method: 'DELETE'
        })
        result.then((sucess) => { console.log(sucess) })
    } catch (error) {
        console.log(error);
    }
}

export function getFunctions(setValue,name) {
    try {
        let result = fetch("/api/functions/"+name, {
            method: 'GET'
        })
        result.then((sucess) => { console.log(sucess) })
        result.then((res) => res.json()).then((data) => setValue(data.data));
    } catch (error) {
        console.log(error);
    }
}

export function creatFunction(body) {
    try {
        let result = fetch("/api/function/", {
            method: 'POST',
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        result.then((sucess) => { console.log(sucess)})
    } catch (error) {
        console.log(error);
    }
}



