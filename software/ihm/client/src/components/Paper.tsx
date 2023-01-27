export default function Paper(props) {
    return (
        <div className="rounded-[14px] shadow-md px-3 py-3 bg-gray-300 mx-auto w-80">
            <div className='flex justify-between w-full'>
                <p className="font-semibold text-gray-800 pb-1">
                    {props.title}
                </p>
                <button className='btn btn-close' onClick={() => props.del(true)}>X</button>
            </div>
            {props.list.map(function (item, index) {
                return <p className="font-semibold text-gray-800 pb-1">{item}</p>;
            })}
            <button className="btn btn-classic w-full" onClick={() => props.modal(true)}>
                Run
            </button>
        </div>
    );
}