import React, { useMemo, useState } from 'react';
import Modal from "../components/Modal";

export default function Unitest(props) {
    const [modal, setModal] = useState(false);

    return(
        <div className="rounded-[14px] shadow-md px-4 py-4 bg-gray-300 mx-auto w-60">
            <p className="font-semibold text-gray-800 pb-1">
                Fct : {props.function}
            </p>
            <p className="font-semibold text-gray-800 pb-1">
                Device : {props.device}
            </p>
            <p className="font-semibold text-gray-800 pb-1">
                State : {props.state}
            </p>
            <button class="btn btn-classic" onClick={() => setModal(true)}>
                Run
            </button>
            <Modal open={modal} setOpen={setModal} function={props.function}/>
        </div>
    );
}