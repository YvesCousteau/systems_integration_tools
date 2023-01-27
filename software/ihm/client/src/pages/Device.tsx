import { useEffect, useState } from "react";
import Input from "../components/Input";
import Modal from "../components/Modal";
import Paper from "../components/Paper";
import * as Api from '../components/Api';

export default function Device(props) {
    const [modalAdd, setModalAdd] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    
    const [devices, setDevices] = useState(null);

    const [created, setCreated] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const [currentId, setCurrentId] = useState(null);
    const [inputName, setInputName] = useState('');
    useEffect(() => {
        
        if(created) {
            let body = {name:inputName}
            Api.creatDevice(body)
            setModalAdd(false)
        }
        if(updated) {
            let body = {name:"updated"};
            Api.updateDevice(currentId,body);
            setDeleted(false);
            setModalUpdate(false);
        }
        if(deleted) {
            Api.deleteDevice(currentId);
            setDeleted(false);
        }
        Api.getDevices(setDevices);
    }, [created,deleted,updated]);

    
    return(
        <div>
            <div className="rounded-[14px] shadow-md bg-gray-200 px-4 py-4 mx-auto">
                <div className="flex pb-4 justify-between mx-6 ">
                    <div className="font-bold text-2xl color-classic ">Devices</div>
                    <button className=' btn btn-classic h-8 w-24 ' onClick={() => setModalAdd(true)}>+ ADD</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4  gap-4 justify-items-center mx-6">
                    {devices !== null && devices.map((device) => 
                        <Item 
                            data={device} 
                            currentId={setCurrentId} 
                            updated={setUpdated} 
                            deleted={setDeleted} 
                            modal={modalUpdate} 
                            setModal={setModalUpdate} 
                        />
                    )}
                    {devices === null && [1,2,3].map(function (object, i) {
                        return <div className='animate-pulse w-80 h-34 bg-gray-900 rounded-[12px]' />;
                    })}
                </div>
            </div>
            <Modal
                open={modalAdd}
                setOpen={setModalAdd}
                title="Add Test"
                subtitle="Setup your test and remind to config the server for now">
                <div className='bg-gray-300 py-4 rounded-[12px] px-4 mx-6 grid grid-cols-1 gap-4'>
                    <Input label="Name :" placeholder="Text..." value={setInputName}/>
                    <button className='btn btn-open w-32 mx-auto' onClick={() => setCreated(true)}>Send</button>
                </div>
            </Modal>
        </div>
        
    );
}

function Item(props) {
    let list = []
    if (props.data !== null) {list = ["Functions : ","Details : ",];}
    useEffect(() => {
        console.log(props.data.id);
    }, [props.deleted,props.updated]);
    return(
        <div className=''>
            {props.data !== null && (
                <div className=''>
                    <Paper title={props.data.name} deleted={props.deleted} modal={props.setModal} list={list}/>
                    <Modal
                        open={props.modal}
                        setOpen={props.setModal}
                        title={props.data.function}
                        subtitle="La j ai r">
                        <p className="flex justify-center text-xl font-bold color-classic">
                            State :&nbsp;{props.data.state ? (<div className='text-green-700'>Success</div>) : (<div className='text-red-700'>Fail</div>)}
                        </p>
                        <div className='bg-gray-300 py-4 my-2 rounded-[12px] mx-4'>
                            <div className='grid grid-cols-3 w-full'>
                                <div className='mx-auto text-lg font-semibold'>Result :</div>
                                <button className='w-24 btn btn-open' onClick={() => props.updated(true)}>
                                    Success
                                </button>
                                <button className='w-24 btn btn-close' onClick={() => props.updated(true)}>
                                    Fail
                                </button>
                            </div>
                        </div>
                    </Modal>
                </div>
            )}
        </div>
    );
}