export function getDevices(setValue,setAlertData,alertData) {
    try {
        let result = fetch("/api/devices/", {
            method: 'GET'
        })
        result.then((sucess) => { 
            console.log(sucess);
            let type;
            if(sucess.ok){type = 'Success'}else{type = 'Error'}
            setAlertData({...alertData,...{active:true,type:type,status:sucess.status,url:sucess.url}});
        })
        result.then((res) => res.json()).then((data) => setValue(data.data.devices));
    } catch (error) {
        console.log(error);
    }
}
// ===================================================================================================== //
export function creatDevice(body,setAlertData,alertData) {
    try {
        let result = fetch("/api/device/", {
            method: 'POST',
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        result.then((sucess) => {
            console.log(sucess);
            let type;
            if(sucess.ok){type = 'Success'}else{type = 'Error'}
            setAlertData({...alertData,...{
                active:true,
                type:type,
                status:sucess.status,
                url:sucess.url
            }});
        })
    } catch (error) {
        console.log(error);
    }
}

export function updateDevice(id,body,setAlertData,alertData) {
    try {
        let result = fetch("/api/device/"+id, {
            method: 'PATCH',
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        result.then((sucess) => {
            console.log(sucess);
            let type;
            if(sucess.ok){type = 'Success'}else{type = 'Error'}
            setAlertData({...alertData,...{
                active:true,
                type:type,
                status:sucess.status,
                url:sucess.url
            }});
        })
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
        result.then((sucess) => {
            console.log(sucess);
        })
    } catch (error) {
        console.log(error);
    }
}

export function deleteDevice(id,setAlertData,alertData ) {
    try {
        let result = fetch("/api/device/"+id, {
            method: 'DELETE'
        })
        result.then((sucess) => {
            console.log(sucess);
            let type;
            if(sucess.ok){type = 'Success'}else{type = 'Error'}
            setAlertData({...alertData,...{
                active:true,
                type:type,
                status:sucess.status,
                url:sucess.url
            }});
        })
    } catch (error) {
        console.log(error);
    }
}

export function getFunctions(setValue,name) {
    try {
        let result = fetch("/api/functions/"+name, {
            method: 'GET'
        })
        result.then((sucess) => {
            console.log(sucess);
        })
        result.then((res) => res.json()).then((data) => setValue(data.data));
    } catch (error) {
        console.log(error);
    }
}

export function power(ip,option) {
    try {
        let result = fetch("/api/run/power/"+option+"/"+ip, {
            method: 'POST',
        })
        result.then((sucess) => { console.log(sucess)})
    } catch (error) {
        console.log(error);
    }
}




