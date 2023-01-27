import { useState } from "react";

export default function Device(props) {
const [, setModal] = useState(false);
    return(
        <div className="rounded-[14px] shadow-md bg-gray-200 px-8 py-4 mx-auto">
            <div className="flex pb-4 justify-between mx-6 ">
                <div className="font-bold text-2xl color-classic ">Devices</div>
                <button className=' btn btn-classic h-8 w-24 ' onClick={() => setModal(true)}>+ ADD</button>
            </div>
        </div>
    );
}