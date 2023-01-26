import React, { useState,useEffect } from 'react';
import Modal from "../components/Modal";

export default function Unitest(props) {
    const [modal, setModal] = useState(false);
    const [server, setServer] = React.useState(null);
    useEffect(() => {
        if (modal) {
            fetch(props.test.api,{method: 'POST'})
                .then((res) => res.json())
                .then((data) => setServer(data.message));
        }
        if (!modal) {
            fetch("/close_uart",{method: 'POST'})
                .then((res) => res.json())
                .then((data) => setServer(data.message));
        }
    }, [modal]);
    

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
            <button class="btn btn-classic w-full" onClick={() => setModal(true)}>
                Run
            </button>
            <Modal 
            open={modal} 
            setOpen={setModal}
            title={props.test.function}
            subtitle={server}>
                <p className="flex justify-center text-xl font-bold color-classic">State run :&nbsp;{props.test.state ? (<div className='text-green-700'>Actif</div>) : (<div className='text-red-700'>Inactif</div>)}</p>
                <div className='flex px-8 pt-4'>

                    <div className='bg-gray-300 py-4 rounded-[12px] grid grid-cols-3 w-full '>
                        <div className='mx-auto text-lg font-semibold'>Result :</div>
                        <button className='w-24 btn btn-open' onClick={() => props.setTest({ ...props.test, state: true })}>
                            Valid
                        </button>
                        <button className='w-24 btn btn-close' onClick={() => props.setTest({ ...props.test, state: false })}>
                            Unvalid
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
