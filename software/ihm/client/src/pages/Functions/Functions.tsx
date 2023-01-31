import { useEffect, useState } from "react";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import * as Api from './Api';
import ListBox from "../../components/ListBox";
import {useParams, Link} from "react-router-dom";

import Paper from "../../components/Paper";

export default function Functions(props) {
    let { id } = useParams();
    const [modalAdd, setModalAdd] = useState(false);
    const [created, setCreated] = useState(false);
    const [functions, setFunctions] = useState(null);
    const [devices, setDevices] = useState(null);
    const [inputName, setInputName] = useState('');
    const [inputDevice, setInputDevice] = useState('');
    const [inputCmd, setInputCmd] = useState('');
    const [currentFunction, setCurrentFunction] = useState(null);

    useEffect(() => {
        if(created) {
            console.log("Creat");
            let device;
            if(id) {device = id}
            else {device = inputDevice}
            let body = {name:inputName,device:device,cmd:inputCmd,}
            Api.creatFunction(body)
            setModalAdd(false)
            setCreated(false)
        }
        if(id) {
            console.log("load functions");
            Api.getFunctions(setFunctions,id);
        }
        Api.getDevices(setDevices);
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
                    {functions && functions.length > 0 && functions.map((fct) => 
                        <Item 
                        function={fct}
                        devices={devices}
                        currentFunction={currentFunction}
                        setCurrentFunction={setCurrentFunction}/>
                    )}
                </div>
            </div>
            <AddModal 
            modal={modalAdd} 
            setModal={setModalAdd} 
            setInputName={setInputName} 
            setInputDevice={setInputDevice} 
            setInputCmd={setInputCmd}
            devices={devices} 
            setCreated={setCreated}/>
        </div>
        
    );
}

function Item(props) {
    const [modalRun, setModalRun] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [ran, setRan] = useState(false);
    const [inputName, setInputName] = useState(props.function.name);
    const [inputDevice, setInputDevice] = useState(props.function.device);
    const [inputCmd, setInputCmd] = useState(props.function.cmd);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if(updated) {
            let body = {name:inputName,device:inputDevice,cmd:inputCmd};
            Api.updateFunction(props.function.id,body);
            props.setCurrentFunction(!props.currentFunction);
            setUpdated(false);
            setModalUpdate(false);
        }
        if(deleted) {
            Api.deleteFunction(props.function.id);
            props.setCurrentFunction(!props.currentFunction);
            setDeleted(false);
        }
        if(ran) {
            if(inputValue) {Api.exec(inputValue)} 
            else {Api.exec("sexe")}
            setModalRun(false);
            setRan(false);
        }
    }, [updated,deleted,ran]);
    return(
        <div className=''>
            {props.function !== null && (
                <div className=''>
                    <Paper title={"Function : "+props.function.name} deleted={setDeleted} modalUpdate={setModalUpdate}>
                        <p className="text-classic pb-1">{"Device : " + props.function.device}</p>
                        <p className="text-classic pb-2">{"Commande : " + props.function.cmd}</p>
                        <button onClick={() => setModalRun(true)} className="w-full btn btn-classic ">Run</button>
                    </Paper>
                    <RunModal 
                    modal={modalRun} 
                    setModal={setModalRun} 
                    setInputValue={setInputValue} 
                    setRan={setRan} 
                    cmd={props.function.cmd}/>
                    <UploadModal 
                    modal={modalUpdate} 
                    setModal={setModalUpdate} 
                    setInputCmd={setInputCmd} 
                    setInputName={setInputName} 
                    setInputDevice={setInputDevice} 
                    inputName={inputName}
                    inputCmd={inputCmd}
                    setUpdated={setUpdated}
                    devices={props.devices} />
                </div>
            )}
        </div>
    );
}

function AddModal(props) {
    let { id } = useParams();
    return (
        <Modal
            open={props.modal}
            setOpen={props.setModal}
            title="Add"
            subtitle="Setup your device">
            <div className='bg-gray-300 py-4 rounded-[12px] px-4 mx-6 grid grid-cols-1 gap-4'>
                <Input label="Name :" placeholder="Text..." onChange={props.setInputName}/>
                <div className="grid grid-cols-4">
                    <p className="self-center text-classic">Device :</p>
                    {id && <p className="text-lg font-semibold text-gray-800">{id}</p>}
                    {!id && props.devices && 
                        <div className="col-span-3 relative rounded-md shadow-sm h-full">
                            <ListBox data={props.devices} device={props.setInputDevice} init={id} />
                        </div>
                    }
                </div>
                <Input label="Command :" placeholder="Text..." onChange={props.setInputCmd}/>
                <button className='btn btn-open w-32 mx-auto' onClick={() => props.setCreated(true)}>Send</button>
            </div>
        </Modal>
    );
}

function UploadModal(props) {
    let { id } = useParams();
    return (
        <Modal
            open={props.modal}
            setOpen={props.setModal}
            title="Update"
            subtitle="Update your function">
            <div className='bg-gray-300 py-4 rounded-[12px] px-4 mx-6 grid grid-cols-1 gap-4'>
                <Input label="Name :" placeholder="Text..." onChange={props.setInputName} value={props.inputName}/>
                <div className="grid grid-cols-4">
                    <p className="self-center text-classic">Device :&nbsp;</p>
                    <div className=" col-span-3 relative rounded-md shadow-sm h-full">
                        <ListBox data={props.devices} device={props.setInputDevice} init={id}/>
                    </div>
                </div>
                
                <Input label="Commande :" placeholder="Text..." onChange={props.setInputCmd} value={props.inputCmd}/>
                <button className='btn btn-open w-32 mx-auto' onClick={() => props.setUpdated(true)}>Send</button>
            </div>
        </Modal>
    );
}

function RunModal(props) {
    const [inputValue, setInputValue] = useState('');
    useEffect(() => {
        props.setInputValue(inputValue)
    }, [inputValue]);
    return (
        <Modal
            open={props.modal}
            setOpen={props.setModal}
            title="Update"
            subtitle="Update your function">
            <div className='bg-gray-300 py-4 rounded-[12px] px-4 mx-6 grid grid-cols-1 gap-4'>
                <Input label="Value :" placeholder="Text..." onChange={setInputValue}/>
                <button className='btn btn-open w-full mx-auto' onClick={() => props.setRan(true)}>{"Run : "+props.cmd+" "+inputValue}</button>
            </div>
        </Modal>
    );
}