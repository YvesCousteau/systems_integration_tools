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
    
    const [functions, setFunctions] = useState(null);
    const [devices, setDevices] = useState(null);
   

    const [currentFunction, setCurrentFunction] = useState(null);

    useEffect(() => {
        if(id) {
            console.log("load functions");
            Api.getFunctions(setFunctions,id);
        }
        Api.getDevices(setDevices);
    }, [currentFunction]);
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
            currentFunction={currentFunction}
            setCurrentFunction={setCurrentFunction}
            devices={devices}/>
        </div>
        
    );
}

function Item(props) {
    const [modalRun, setModalRun] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    return(
        <div className=''>
            {props.function !== null && (
                <div className=''>
                    <Paper title={"Function : "+props.function.name} deleted={setModalDelete} modalUpdate={setModalUpdate}>
                        <p className="text-classic pb-1">{"Device : " + props.function.device}</p>
                        <p className="text-classic pb-2">{"Commande : " + props.function.cmd}</p>
                        <button onClick={() => setModalRun(true)} className="w-full btn btn-classic ">Run</button>
                    </Paper>
                    <RunModal 
                    modal={modalRun} 
                    setModal={setModalRun}
                    function={props.function}/>
                    <UpdateModal 
                    modal={modalUpdate} 
                    setModal={setModalUpdate}
                    currentFunction={props.currentFunction}
                    setCurrentFunction={props.setCurrentFunction}
                    function={props.function}
                    devices={props.devices} />
                    <DeleteModal 
                    modal={modalDelete} 
                    setModal={setModalDelete}
                    currentFunction={props.currentFunction}
                    setCurrentFunction={props.setCurrentFunction}
                    function={props.function}/>
                </div>
            )}
        </div>
    );
}

function AddModal(props) {
    let { id } = useParams();
    const [inputName, setInputName] = useState('');
    const [inputDevice, setInputDevice] = useState('');
    const [inputCmd, setInputCmd] = useState('');
    const [created, setCreated] = useState(false);
    useEffect(() => {
        if(created) {
            console.log("Creat");
            let device;
            if(id) {device = id}
            else {device = inputDevice}
            let body = {name:inputName,device:device,cmd:inputCmd,}
            Api.creatFunction(body)
            props.setCurrentFunction(!props.currentFunction);
            props.setModal(false)
            setCreated(false)
        }
    }, [created]);
    return (
        <Modal
            open={props.modal}
            setOpen={props.setModal}
            title="Add"
            subtitle="Setup your device">
            <div className='bg-gray-300 py-4 rounded-[12px] px-4 mx-6 grid grid-cols-1 gap-4'>
                <Input label="Name :" placeholder="Text..." onChange={setInputName}/>
                <div className="grid grid-cols-4">
                    <p className="self-center text-classic">Device :</p>
                    {id && <p className="text-lg font-semibold text-gray-800">{id}</p>}
                    {!id && props.devices && 
                        <div className="col-span-3 relative rounded-md shadow-sm h-full">
                            <ListBox data={props.devices} device={setInputDevice} init={id} />
                        </div>
                    }
                </div>
                <Input label="Command :" placeholder="Text..." onChange={setInputCmd}/>
                <button className='btn btn-open w-32 mx-auto' disabled={inputName === '' || inputCmd === ''} onClick={() => setCreated(true)}>Send</button>
            </div>
        </Modal>
    );
}

function UpdateModal(props) {
    let { id } = useParams();
    const [inputName, setInputName] = useState(props.function.name);
    const [inputDevice, setInputDevice] = useState(props.function.device);
    const [inputCmd, setInputCmd] = useState(props.function.cmd);
    const [updated, setUpdated] = useState(false);
    useEffect(() => {
        if(updated) {
            let body = {name:inputName,device:inputDevice,cmd:inputCmd};
            Api.updateFunction(props.function.id,body);
            props.setCurrentFunction(!props.currentFunction);
            props.setModal(false);
            setUpdated(false);
            
        }
    }, [updated]);
    return (
        <Modal
            open={props.modal}
            setOpen={props.setModal}
            title="Update"
            subtitle="Update your function">
            <div className='bg-gray-300 py-4 rounded-[12px] px-4 mx-6 grid grid-cols-1 gap-4'>
                <Input label="Name :" placeholder="Text..." onChange={setInputName} value={inputName}/>
                <div className="grid grid-cols-4">
                    <p className="self-center text-classic">Device :&nbsp;</p>
                    <div className=" col-span-3 relative rounded-md shadow-sm h-full">
                        <ListBox data={props.devices} device={setInputDevice} init={id}/>
                    </div>
                </div>
                
                <Input label="Commande :" placeholder="Text..." onChange={setInputCmd} value={inputCmd}/>
                <button className='btn btn-open w-32 mx-auto' disabled={inputName === '' || inputCmd === ''} onClick={() => setUpdated(true)}>Send</button>
            </div>
        </Modal>
    );
}

function RunModal(props) {
    const [ran, setRan] = useState(false);
    const [inputValue, setInputValue] = useState('');
    useEffect(() => {
        if(ran) {
            if(inputValue) {Api.exec(inputValue)} 
            else {Api.exec("sexe")}
            props.setModal(false);
            setRan(false);
        }
    }, [ran]);
    return (
        <Modal
            open={props.modal}
            setOpen={props.setModal}
            title="Update"
            subtitle="Update your function">
            <div className='bg-gray-300 py-4 rounded-[12px] px-4 mx-6 grid grid-cols-1 gap-4'>
                <Input label="Value :" placeholder="Text..." onChange={setInputValue}/>
                <button className='btn btn-open w-full mx-auto'  disabled={inputValue === ''} onClick={() => setRan(true)}>{"Run : "+props.function.cmd+" "+inputValue}</button>
            </div>
        </Modal>
    );
}

function DeleteModal(props) {
    const [deleted, setDeleted] = useState(false);
    useEffect(() => {
        if(deleted) {
            Api.deleteFunction(props.function.id);
            props.setCurrentFunction(!props.currentFunction);
            props.setModal(false)
            setDeleted(false);
        }
    }, [deleted]);
    
    return (
        <Modal
            open={props.modal}
            setOpen={props.setModal}
            title="Remove"
            subtitle="All functions associated with this devices will be remove">
            <div className='bg-gray-300 py-4 rounded-[12px] px-4 mx-6 grid grid-cols-1 gap-4'>
                <button className='btn btn-open w-32 mx-auto' onClick={() => setDeleted(true)}>Remove</button>
            </div>
        </Modal>
    );
}