import React, { useMemo, useState } from 'react';
import Modal from "../components/Modal";

export default function Unitest(props) {
    const [modal, setModal] = useState(false);

    return(
        <div className="rounded-[14px] shadow-md px-4 py-4 bg-gray-300 mx-auto w-60">
            <p className="font-semibold text-gray-800 pb-1">
                Fct : {props.test.function}
            </p>
            <p className="font-semibold text-gray-800 pb-1">
                Device : {props.test.device}
            </p>
            <p className="flex font-semibold text-gray-800 pb-1">
                State :&nbsp;{props.test.state?(<div className='text-green-700'>Valid</div>):(<div className='text-red-700'>Error</div>)}
            </p>
            <button class="btn btn-classic" onClick={() => setModal(true)}>
                Run
            </button>
            <Modal open={modal} setOpen={setModal} test={props.test} setTest={props.setTest}/>
        </div>
    );
}