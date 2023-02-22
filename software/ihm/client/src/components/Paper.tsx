import { Children } from "react";
export default function Paper(props) {
    return (
        <div className="rounded-[14px] shadow-md px-3 py-3 bg-gray-300 mx-auto w-80">
            <div className='flex justify-between w-full mb-1'>
                <p className=" self-center text-classic pb-1">
                    {props.title}
                </p>
                <div>
                    {props.removable && <button className='ml-2 text-center btn btn-close' onClick={() => props.deleted(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>}
                </div>
                
            </div>
            {props.children}
        </div>
    );
}