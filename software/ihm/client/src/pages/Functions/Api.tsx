export function getDevice(setValue,name,setAlertData,alertData) {
    try {
        let result = fetch("/api/device/"+name, {
            method: 'GET'
        })
        result.then((sucess) => { 
            console.log(sucess);
            let type;
            if(sucess.ok){type = 'Success'}else{type = 'Error'}
            setAlertData({...alertData,...{active:true,type:type,status:sucess.status,url:sucess.url}});
        })
        result.then((res) => res.json()).then((data) => setValue(data.data));
    } catch (error) {
        console.log(error);
    }
}

export function getFunctions(setValue,setAlertData,alertData) {
    try {
        let result = fetch("/api/functions/", {
            method: 'GET'
        })
        result.then((sucess) => { 
            console.log(sucess);
            let type;
            if(sucess.ok){type = 'Success'}else{type = 'Error'}
            setAlertData({...alertData,...{active:true,type:type,status:sucess.status,url:sucess.url}});
        })
        result.then((res) => res.json()).then((data) => setValue(data.data.functions));
    } catch (error) {
        console.log(error);
    }
}

export function creatFunction(body,name,setAlertData,alertData) {
    try {
        let result = fetch("/api/device/"+name, {
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
export function deleteFunction(body,name,setAlertData,alertData) {
    try {
        let result = fetch("/api/device/"+name, {
            method: 'DELETE',
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
// ===================================================================================================== //



export function updateFunction(id,body,setAlertData,alertData) {
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




export function service_max7219(ip,name) {
    try {
        let result = fetch("/api/run/max7219/"+ip+"/"+name, {
            method: 'POST',
        })
        result.then((sucess) => { console.log(sucess)})
    } catch (error) {
        console.log(error);
    }
}

export function service_hmi(ip) {
    try {
        let result = fetch("/api/run/hmi/"+ip, {
            method: 'POST',
        })
        result.then((sucess) => { console.log(sucess)})
    } catch (error) {
        console.log(error);
    }
}

export function services(setServices) {
    try {
        let result = fetch("/api/services", {
            method: 'GET',
        })
        result.then((sucess) => { console.log(sucess)})
        result.then((res) => res.json()).then((data) => setServices(data.data));
    } catch (error) {
        console.log(error);
    }
}