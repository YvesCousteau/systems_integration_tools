export default function Input(props) {
    return (
        <div className='grid grid-cols-4'>
            <label className="text-lg font-medium text-gray-700">{props.label}</label>
            <div className="col-span-3 relative rounded-md shadow-sm h-full">
                <input type="text" name="price" id="price"
                    className="w-full rounded-md shadow-md font-medium pl-2 pr-2 focus:ring-4 focus:ring-black sm:text-lg h-full"
                    placeholder={props.placeholder}
                />
            </div>
        </div>
    );
}