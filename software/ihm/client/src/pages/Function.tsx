import { useState } from "react";

export default function Function(props) {
    const [modalAdd, setModalAdd] = useState(false);
    return(
        <div className="rounded-[14px] shadow-md bg-gray-200 px-4 py-4 mx-auto">
            <div className="flex pb-4 justify-between mx-6 ">
                <div className="font-bold text-2xl color-classic ">Functions of {props.name}</div>
                <button className=' btn btn-classic h-8 w-24 ' onClick={() => setModalAdd(true)}>+ ADD</button>
            </div>
        </div>
    );
}