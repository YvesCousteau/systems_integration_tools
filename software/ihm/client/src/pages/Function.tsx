import { useEffect, useState } from "react";
import Input from "../components/Input";
import Modal from "../components/Modal";
import * as Api from '../components/Api';
import ListBox from "../components/ListBox";

export default function Function(props) {
    const [modalAdd, setModalAdd] = useState(false);
    const [created, setCreated] = useState(false);
    const [functions, setFunctions] = useState(null);
    const [devices, setDevices] = useState(null);
    const [inputName, setInputName] = useState('');
    const [inputDevice, setInputDevice] = useState('');
    const [inputCmd, setInputCmd] = useState('');
    const [inputValue, setInputValue] = useState('');
    useEffect(() => {
        if(created) {
            console.log("Creat");
            let body = {
                name:inputName,
                device:inputDevice,
                cmd:inputCmd,
                value:inputValue,
            }
            Api.creatFunction(body)
            setModalAdd(false)
            setCreated(false)
        }
        Api.getDevices(setDevices);
        Api.getFunctions(setFunctions);
    }, [created]);
    return(
        <div className="mx-8">
            <div className="rounded-[14px] shadow-md bg-gray-200 px-4 py-4 mx-auto">
                <div className="flex pb-4 justify-between mx-6 ">
                    <div className="font-bold text-2xl color-classic ">Functions of {props.name}</div>
                    <button className=' btn btn-classic h-8 w-24 ' onClick={() => setModalAdd(true)}>+ ADD</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4  gap-4 justify-items-center mx-6">
                    {functions === null && [1,2,3].map(function (object, i) {
                        return <div className='animate-pulse w-80 h-34 bg-gray-900 rounded-[12px]' />;
                    })}
                </div>
            </div>
            <Modal
                open={modalAdd}
                setOpen={setModalAdd}
                title="Add"
                subtitle="Setup your device">
                <div className='bg-gray-300 py-4 rounded-[12px] px-4 mx-6 grid grid-cols-1 gap-4'>
                    <Input label="Name :" placeholder="Text..." value={setInputName}/>
                    <div className="grid grid-cols-4">
                        <p className="self-center text-lg font-medium text-gray-700">Device :</p>
                        <div className="col-span-3 relative rounded-md shadow-sm h-full">
                            <ListBox data={devices} device={setInputDevice}/>
                        </div>
                    </div>
                    
                    <Input label="Command :" placeholder="Text..." value={setInputCmd}/>
                    <Input label="Value :" placeholder="(optional)" value={setInputValue}/>
                    <button className='btn btn-open w-32 mx-auto' onClick={() => setCreated(true)}>Send</button>
                </div>
            </Modal>
        </div>
        
    );
}