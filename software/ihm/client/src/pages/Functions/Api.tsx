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


/*
export async function arraysum() {
  
    // This variable contains the data
    // you want to send 
    var data = {
        array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  
    var options = {
        method: 'POST',
  
        // http:flaskserverurl:port/route
        uri: 'http://127.0.0.1:5000/arraysum',
        body: data,
  
        // Automatically stringifies
        // the body to JSON 
        json: true
    };
  
    var sendrequest = await request(options)
  
        // The parsedBody contains the data
        // sent back from the Flask server 
        .then(function (parsedBody) {
            console.log(parsedBody);
              
            // You can do something with
            // returned data
            let result;
            result = parsedBody['result'];
            console.log("Sum of Array from Python: ", result);
        })
        .catch(function (err) {
            console.log(err);
        });
}
*/
