export function getApi() {
    let response;
    try {
        let result = fetch("/api", {
            method: 'GET'
        })
        result.then((sucess) => { console.log(sucess) })
        result.then((res) => res.json()).then((data) => console.log(data.message));
        console.log();
    } catch (error) {
        console.log(error);
    }
    
    
    return response;
}

export function getDevices() {
    let response;
    try {
        let result = fetch("/api/devices", {
            method: 'GET'
        })
        result.then((sucess) => { console.log(sucess) })
        result.then((res) => res.json()).then((data) => response = data.message);
    } catch (error) {
        console.log(error);
    }
    return response;
}

export function creatDevice(props) {
    let body = { name: props.name, functions: props.functions, details: props.details }
    let response;
    try {
        let result = fetch("/api/device/"+props.id+"/creat/", {
            method: 'POST',
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        result.then((sucess) => { console.log(sucess) })
        result.then((res) => res.json()).then((data) => response = data.message);
    } catch (error) {
        console.log(error);
    }
    return response;
}

export function updateDevice(props) {
    let body = { name: props.name, functions: props.functions, details: props.details }
    let response;
    try {
        let result = fetch("/api/device/"+props.id+"/update/", {
            method: 'PATCH',
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        result.then((sucess) => { console.log(sucess) })
        result.then((res) => res.json()).then((data) => response = data.message);
    } catch (error) {
        console.log(error);
    }
    return response;
}

export function deleteDevice(props) {
    let response;
    try {
        let result = fetch("/api/device/"+props.id+"/delete/", {
            method: 'DELETE'
        })
        result.then((sucess) => { console.log(sucess) })
        result.then((res) => res.json()).then((data) => response = data.message);
    } catch (error) {
        console.log(error);
    }
    return response;
}