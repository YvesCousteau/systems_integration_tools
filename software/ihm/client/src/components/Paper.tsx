export default function Paper(props) {
    return (
        <div className="rounded-[14px] shadow-md px-3 py-3 bg-gray-300 mx-auto w-80">
            <div className='flex justify-between w-full'>
                <p className="font-semibold text-gray-800 pb-1">
                    {props.title}
                </p>
                <div>
                    <button className='text-center btn btn-open w-10' onClick={() => props.modalUpdate(true)}>?</button>
                    <button className='ml-2 text-center btn btn-close w-10' onClick={() => props.deleted(true)}>X</button>
                </div>
                
            </div>
            {props.list.map(function (item, index) {
                return <p className="font-semibold text-gray-800 pb-1">{item}</p>;
            })}
            <button className="btn btn-classic w-full" onClick={() => props.modalRun(true)}>
                Run
            </button>
        </div>
    );
}