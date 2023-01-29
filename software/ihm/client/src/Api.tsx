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

export function getDevice(setValue,id) {
    try {
        let result = fetch("/api/device/"+id, {
            method: 'GET'
        })
        result.then((sucess) => { console.log(sucess) })
        result.then((res) => res.json()).then((data) => setValue(data.data));
    } catch (error) {
        console.log(error);
    }
}

export function creatDevice(body) {
    try {
        let result = fetch("/api/device/", {
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

export function updateDevice(id,body) {
    try {
        let result = fetch("/api/device/"+id, {
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

export function deleteDevice(id) {
    try {
        let result = fetch("/api/device/"+id, {
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