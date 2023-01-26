import { useState,useEffect } from 'react';
import Modal from "./Modal";

export default function Unitest(props) {
    const [modal, setModal] = useState(false);
    const [update, setUpdate] = useState({activity:false,value:false});
    const [del, setDel] = useState(false);
    const [server, setServer] = useState(null);
    useEffect(() => {
        if (update.activity) {
            let data = {function: props.test.function,device: props.test.device,state: update.value}
            setUpdate({ activity: false, value: false })
            try {
                let result = fetch("/api/test/unit/" + props.test.id, {
                    method: 'PATCH',
                    headers: {
                        Accept: 'application.json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                result.then((sucess) => { console.log(sucess) })
            } catch (error) {
                console.log(error)
            }
        }
        if (del) {
            setDel(false)
            setModal(false)
            try {
                let result = fetch("/api/test/unit/" + props.test.id, {
                    method: 'DELETE'
                })
                result.then((sucess) => { console.log(sucess) })
            } catch (error) {
                console.log(error)
            }
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
        
    }, [modal, update, del,props.test]);
    

    return(
        <div className="rounded-[14px] shadow-md px-4 py-4 bg-gray-300 mx-auto w-60">
            <p className="font-semibold text-gray-800 pb-1">
                Fct : {props.test.function}
            </p>
            <p className="font-semibold text-gray-800 pb-1">
                Device : {!props.test.device ? "Loading .." : props.test.device}
            </p>
            <p className="flex font-semibold text-gray-800 pb-1">
                State :&nbsp;{props.test.state?(<div className='text-green-700'>Valid</div>):(<div className='text-red-700'>Error</div>)}
            </p>
            <button className="btn btn-classic w-full" onClick={() => setModal(true)}>
                Run
            </button>
            <Modal 
            open={modal} 
            setOpen={setModal}
            title={props.test.function}
            subtitle={server}>
                <p className="flex justify-center text-xl font-bold color-classic">
                    State run :&nbsp;{props.test.state ? (<div className='text-green-700'>Actif</div>) : (<div className='text-red-700'>Inactif</div>)}
                </p>
                <div className='flex px-8 pt-4'>
                    <div className='bg-gray-300 py-4 rounded-[12px] grid grid-cols-3 w-full '>
                        <div className='mx-auto text-lg font-semibold'>Result :</div>
                        <button className='w-24 btn btn-open' onClick={() => setUpdate({ activity: true, value: true })}>
                            Valid
                        </button>
                        <button className='w-24 btn btn-close' onClick={() => setUpdate({ activity: true, value: false })}>
                            Unvalid
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}