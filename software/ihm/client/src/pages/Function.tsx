import { useEffect, useState } from "react";
import Input from "../components/Input";
import Modal from "../components/Modal";
import * as Api from '../Api';
import ListBox from "../components/ListBox";
import {useParams} from "react-router-dom";
import Paper from "../components/Paper";
export default function Function(props) {
    let { id } = useParams();
    const [modalAdd, setModalAdd] = useState(false);
    const [created, setCreated] = useState(false);
    const [functions, setFunctions] = useState(null);
    const [devices, setDevices] = useState(null);
    const [inputName, setInputName] = useState('');
    const [inputDevice, setInputDevice] = useState('');
    const [inputCmd, setInputCmd] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [currentFunction, setCurrentFunction] = useState(null);

    useEffect(() => {
        if(created) {
            console.log("Creat");
            let device;
            if(id) {device = id}
            else {device = inputDevice}
            let body = {
                name:inputName,
                device:device,
                cmd:inputCmd,
                value:inputValue,
            }
            console.log(body);
            
            Api.creatFunction(body)
            setModalAdd(false)
            setCreated(false)
        }
        if(id) {
            console.log("load functions");
            Api.getFunctions(setFunctions,id);
        } else {
            console.log("load devices");
            Api.getDevices(setDevices);
        }
    }, [created,currentFunction]);
    return(
        <div className="mx-8">
            <div className="rounded-[14px] shadow-md bg-gray-200 px-4 py-4 mx-auto">
                <div className="flex pb-4 justify-between mx-6 ">
                    {id && <div className="font-bold text-2xl color-classic ">Functions of {id}</div>}
                    <button className=' btn btn-classic h-8 w-24 ' onClick={() => setModalAdd(true)}>+ ADD</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4  gap-4 justify-items-center mx-6">
                    {!functions && [1,2,3].map(function (object, i) {
                        return <div className='animate-pulse w-80 h-34 bg-gray-900 rounded-[12px]' />;
                    })}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4  gap-4 justify-items-center mx-6">
                    {(functions && functions.length > 0) ? (
                        functions.map((fct) => 
                            <Item 
                            function={fct}
                            currentFunction={currentFunction}
                            setCurrentFunction={setCurrentFunction}/>)
                    ):(
                        <Item 
                        function={functions}
                        currentFunction={currentFunction}
                        setCurrentFunction={setCurrentFunction}/>)}
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
                        {id && <p className="text-lg font-semibold text-gray-800">{id}</p>}
                        {id === undefined && devices && 
                            <div className="col-span-3 relative rounded-md shadow-sm h-full">
                                <ListBox data={devices} device={setInputDevice}/>
                            </div>
                        }
                    </div>
                    
                    <Input label="Command :" placeholder="Text..." value={setInputCmd}/>
                    <Input label="Value :" placeholder="(optional)" value={setInputValue}/>
                    <button className='btn btn-open w-32 mx-auto' onClick={() => setCreated(true)}>Send</button>
                </div>
            </Modal>
        </div>
        
    );
}

function Item(props) {
    const [modalRun, setModalRun] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [inputName, setInputName] = useState('');
    
    let list = []
    if (props.function !== null) {list = ["Function Number : 0"];}

    useEffect(() => {
        if(updated) {
            let body = {name:inputName};
            Api.updateDevice(props.function.id,body);
            props.setCurrentFunction(!props.currentFunction);
            setUpdated(false);
            setModalUpdate(false);
        }
        if(deleted) {
            Api.deleteFunction(props.function.id);
            props.setCurrentFunction(!props.currentFunction);
            setDeleted(false);
        }
    }, [updated,deleted,inputName,props]);
    return(
        <div className=''>
            {props.function !== null && (
                <div className=''>
                    <Paper title={props.function.name} deleted={setDeleted} modalUpdate={setModalUpdate} modalRun={setModalRun} list={list}/>
                </div>
            )}
        </div>
    );
}