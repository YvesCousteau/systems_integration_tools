export function getApi(setValue) {
    let response;
    try {
        let result = fetch("/api", {
            method: 'GET'
        })
        result.then((sucess) => { console.log(sucess) })
        result.then((res) => res.json()).then((data) => setValue(data.message));
    } catch (error) {
        console.log(error);
    }
    
    
    return response;
}

export function getDevices(setValue) {
    let response;
    try {
        let result = fetch("/api/devices/", {
            method: 'GET'
        })
        result.then((sucess) => { console.log(sucess) })
        result.then((res) => res.json()).then((data) => setValue(data.data));
    } catch (error) {
        console.log(error);
    }
    return response;
}

export function getDevice(setValue,id) {
    let response;
    try {
        let result = fetch("/api/device/"+id, {
            method: 'GET'
        })
        result.then((sucess) => { console.log(sucess) })
        result.then((res) => res.json()).then((data) => setValue(data));
    } catch (error) {
        console.log(error);
    }
    return response;
}

export function creatDevice(body) {
    // let body = { name: props.name, functions: props.functions, details: props.details }

    try {
        let result = fetch("/api/device/creat/", {
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
    // let body = { name: props.name, functions: props.functions, details: props.details }
    try {
        let result = fetch("/api/device/"+id+"/update/", {
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
        let result = fetch("/api/device/"+id+"/delete/", {
            method: 'DELETE'
        })
        result.then((sucess) => { console.log(sucess) })
    } catch (error) {
        console.log(error);
    }
}