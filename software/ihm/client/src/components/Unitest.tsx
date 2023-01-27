import { useState,useEffect } from 'react';
import Modal from "./Modal";

export default function Unitest(props) {
    const [modal, setModal] = useState(false);
    const [update, setUpdate] = useState({activity:false,value:false});
    const [del, setDel] = useState(false);
    const [data, setData] = useState(props.test);
    useEffect(() => {
        if (update.activity) {
            let body = {function: data.function,device: data.device,state: update.value}
            try {
                let result = fetch("/api/test/unit/" + data.id, {
                    method: 'PATCH',
                    headers: {
                        Accept: 'application.json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                })
                result.then((sucess) => { console.log(sucess) })
                result.then((res) => res.json()).then((data) => setData(data.data));
            } catch (error) {
                console.log(error)
            }
            setUpdate({ activity: false, value: false })
        }
        if (del) {
            try {
                let result = fetch("/api/test/unit/" + data.id, {
                    method: 'DELETE'
                })
                result.then((sucess) => { console.log(sucess) })
                result.then((res) => res.json()).then((data) => setData(null));
            } catch (error) {
                console.log(error)
            }
            setDel(false)
            setModal(false)
        }
        /*
        if (modal) {
            fetch("/api/",{method: 'POST'})
                .then((res) => res.json())
                .then((data) => setServer(data.message));
        }
        if (!modal) {
            fetch("/test/unit/uart/close",{method: 'POST'})
                .then((res) => res.json())
                .then((data) => setServer(data.message));
        }
        */
        
    }, [modal, update, del,data]);
    

    return(
        <div>
            {data !== null && (
                <div className="rounded-[14px] shadow-md px-3 py-3 bg-gray-300 mx-auto w-80">
                    <div className='flex justify-between w-full'>
                        <p className="font-semibold text-gray-800 pb-1">
                            Fct : {data.function}
                        </p>
                        <button className='btn btn-close' onClick={() => setDel(true)}>X</button>
                    </div>

                    <p className="font-semibold text-gray-800 pb-1">
                        Device : {!data.device ? "Loading .." : data.device}
                    </p>
                    <p className="flex font-semibold text-gray-800 pb-1">
                        State :&nbsp;{data.state ? (<div className='text-green-700'>Success</div>) : (<div className='text-red-700'>Fail</div>)}
                    </p>
                    <button className="btn btn-classic w-full" onClick={() => setModal(true)}>
                        Run
                    </button>
                    <Modal
                        open={modal}
                        setOpen={setModal}
                        title={data.function}
                        subtitle="La j ai r">
                        <p className="flex justify-center text-xl font-bold color-classic">
                            State :&nbsp;{data.state ? (<div className='text-green-700'>Success</div>) : (<div className='text-red-700'>Fail</div>)}
                        </p>
                        <div className='bg-gray-300 py-4 my-2 rounded-[12px] mx-4'>
                            <div className='grid grid-cols-3 w-full'>
                                <div className='mx-auto text-lg font-semibold'>Result :</div>
                                <button className='w-24 btn btn-open' onClick={() => setUpdate({ activity: true, value: true })}>
                                    Success
                                </button>
                                <button className='w-24 btn btn-close' onClick={() => setUpdate({ activity: true, value: false })}>
                                    Fail
                                </button>
                            </div>
                        </div>
                    </Modal>
                </div>
            )}
        </div>
    );
}
