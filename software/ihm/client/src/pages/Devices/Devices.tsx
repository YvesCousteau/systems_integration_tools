import { useEffect, useState } from "react";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import Paper from "../../components/Paper";
import * as Api from "./Api";
import { Link } from "react-router-dom";

export default function Device(props) {
    const [modalAdd, setModalAdd] = useState(false);
    const [devices, setDevices] = useState(null);
    const [currentDevice, setCurrentDevice] = useState(null);
    useEffect(() => {
        Api.getDevices(setDevices);
    }, [currentDevice]);
    return(
        <div className="mx-8">
            <div className="rounded-[14px] shadow-md bg-gray-200 px-4 py-4 mx-auto">
                <div className="flex pb-4 justify-between mx-6 ">
                    <div className="text-classic ">Devices</div>
                    <button className=' btn btn-classic h-8 w-24 ' onClick={() => setModalAdd(true)}>+ ADD</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4  gap-4 justify-items-center mx-6">
                    {devices !== null && devices.map((device) => 
                        <Item 
                        device={device}
                        currentDevice={currentDevice}
                        setCurrentDevice={setCurrentDevice}/>
                    )}
                </div>
            </div>
            <AddModal
            modal={modalAdd} 
            setModal={setModalAdd}
            currentDevice={currentDevice}
            setCurrentDevice={setCurrentDevice}/>
        </div>
        
    );
}

function Item(props) {
    const [modalUpdate, setModalUpdate] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [functions, setFunctions] = useState(null);

    useEffect(() => {
        if(deleted) {
            Api.deleteDevice(props.device.id);
            props.setCurrentDevice(!props.currentDevice);
            setDeleted(false);
        }
        Api.getFunctions(setFunctions,props.device.name)
    }, [deleted]);
    return(
        <div className=''>
            {props.device !== null && (
                <div className=''>
                    <Paper title={"Device : "+props.device.name} deleted={setDeleted} modalUpdate={setModalUpdate}>
                        <p className="text-classic pb-2">
                            {functions && "Functions Numbers : "+functions.length}
                        </p>
                        <Link to={"/functions/"+props.device.name} className="flex justify-center btn btn-classic ">Functions</Link>
                    </Paper>
                    <UpdateModal 
                    modal={modalUpdate} 
                    setModal={setModalUpdate}
                    currentDevice={props.currentDevice}
                    setCurrentDevice={props.setCurrentDevice}
                    functions={functions}
                    device={props.device}
                    />
                </div>
            )}
        </div>
    );
}

function AddModal(props) {
    const [inputName, setInputName] = useState('');
    const [created, setCreated] = useState(false);
    useEffect(() => {
        if(created) {
            console.log("Creat");
            let body = {name:inputName}
            Api.creatDevice(body)
            props.setCurrentDevice(!props.currentDevice);
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
                <button className='btn btn-open w-32 mx-auto' disabled={inputName === ''} onClick={() => setCreated(true)}>Send</button>
            </div>
        </Modal>
    );
}

function UpdateModal(props) {
    const [inputName, setInputName] = useState(props.device.name);
    const [updated, setUpdated] = useState(false);
    useEffect(() => {
        if(updated) {
            let body = {name:inputName};
            Api.updateDevice(props.device.id,body);
            for (const fct of props.functions) {
                let body = {name:fct.name,device:inputName,cmd:fct.cmd};
                Api.updateFunction(fct.id,body);
            }
            props.setCurrentDevice(!props.currentDevice);
            props.setModal(false);
            setUpdated(false);
        }
    }, [updated]);
    return (
        <Modal
            open={props.modal}
            setOpen={props.setModal}
            title="Update"
            subtitle="Update your device">
            <div className='bg-gray-300 py-4 rounded-[12px] px-4 mx-6 grid grid-cols-1 gap-4'>
                <Input label="Name :" placeholder="Text..." onChange={setInputName} value={inputName}/>
                <button className='btn btn-open w-32 mx-auto' onClick={() => setUpdated(true)}>Send</button>
            </div>
        </Modal>
    );
}