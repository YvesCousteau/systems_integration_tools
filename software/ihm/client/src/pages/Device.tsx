import { useEffect, useState } from "react";
import Input from "../components/Input";
import Modal from "../components/Modal";
import Paper from "../components/Paper";
import * as Api from '../Api';
import Example from "../components/ListBox";

export default function Device(props) {
    const [modalAdd, setModalAdd] = useState(false);
    const [devices, setDevices] = useState(null);
    const [currentDevice, setCurrentDevice] = useState(null);
    const [created, setCreated] = useState(false);
    const [inputName, setInputName] = useState('');
    useEffect(() => {
        if(created) {
            console.log("Creat");
            let body = {name:inputName}
            Api.creatDevice(body)
            setModalAdd(false)
            setCreated(false)
        }
        Api.getDevices(setDevices);
    }, [created,currentDevice]);

    
    return(
        <div className="mx-8">
            <div className="rounded-[14px] shadow-md bg-gray-200 px-4 py-4 mx-auto">
                <div className="flex pb-4 justify-between mx-6 ">
                    <div className="font-bold text-2xl color-classic ">Devices</div>
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
            <Modal
                open={modalAdd}
                setOpen={setModalAdd}
                title="Add"
                subtitle="Setup your device">
                <div className='bg-gray-300 py-4 rounded-[12px] px-4 mx-6 grid grid-cols-1 gap-4'>
                    <Input label="Name :" placeholder="Text..." value={setInputName}/>
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
    if (props.device !== null) {list = ["Function Number : 0"];}

    useEffect(() => {
        if(updated) {
            let body = {name:inputName};
            Api.updateDevice(props.device.id,body);
            props.setCurrentDevice(!props.currentDevice);
            setUpdated(false);
            setModalUpdate(false);
        }
        if(deleted) {
            Api.deleteDevice(props.device.id);
            props.setCurrentDevice(!props.currentDevice);
            setDeleted(false);
        }
    }, [updated,deleted,inputName,props]);
    return(
        <div className=''>
            {props.device !== null && (
                <div className=''>
                    <Paper title={props.device.name} deleted={setDeleted} modalUpdate={setModalUpdate} modalRun={setModalRun} list={list}/>
                    <Modal
                        open={modalRun}
                        setOpen={setModalRun}
                        title={props.device.name}
                        subtitle="La j ai r">
                        <div className='bg-gray-300 py-4 rounded-[12px] mx-4'>
                            <div className="grid grid-cols-4 gap-2 mx-8 mb-4">
                                <p className="self-center text-lg font-semibold color-classic">
                                    Function :&nbsp;
                                </p>
                                <div className="col-span-2">
                                    <Example />
                                </div>
                                
                                <p className="self-center text-lg font-semibold color-classic">
                                    &nbsp;{">> Result"}
                                </p>
                            </div>
                            <div className="grid grid-cols-4 gap-2 mx-8 mb-4">
                                <p className="self-center text-lg font-semibold color-classic">
                                    Detail :&nbsp;
                                </p>
                                <div className="col-span-2">
                                    <Example />
                                </div>
                                
                                <p className="self-center text-lg font-semibold color-classic">
                                    &nbsp;{">> Result"}
                                </p>
                            </div>
                            <div className='grid grid-cols-3 w-full'>
                                <div className='mx-auto text-lg font-semibold'>Result :</div>
                                <button className='w-24 btn btn-open' onClick={(e) => (e)}>
                                    Success
                                </button>
                                <button className='w-24 btn btn-close' onClick={(e) => (e)}>
                                    Fail
                                </button>
                            </div>
                        </div>
                    </Modal>
                    <Modal
                        open={modalUpdate}
                        setOpen={setModalUpdate}
                        title="Update"
                        subtitle="Update your device">
                        <div className='bg-gray-300 py-4 rounded-[12px] px-4 mx-6 grid grid-cols-1 gap-4'>
                            <Input label="Name :" placeholder="Text..." value={setInputName}/>
                            <button className='btn btn-open w-32 mx-auto' onClick={() => setUpdated(true)}>Send</button>
                        </div>
                    </Modal>
                </div>
            )}
        </div>
    );
}