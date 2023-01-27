import { useState } from 'react';
import Modal from "../components/Modal";

export default function Intest(props) {
    const [modal, setModal] = useState(false);

    return(
        <div className="rounded-[14px] shadow-md px-4 py-4 bg-gray-300 mx-auto w-60">
            <p className="font-semibold text-gray-800 pb-1">
                Fct : {props.test.function}
            </p>
            <p className="font-semibold text-gray-800 pb-1">
                Component : {props.test.component}
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
            subtitle="Here you can describe what you want with this function.">
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