import { useEffect, useState } from "react";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import * as Api from './Api';
import Alert from "../../components/Alert";
import ListBox from "../../components/ListBox";
import {useParams, Link} from "react-router-dom";

import Paper from "../../components/Paper";

export default function Functions(props) {
    let { name } = useParams();
    const [functions, setFunctions] = useState(null);
    const [functionsName, setFunctionsName] = useState(null);
    const [device, setDevice] = useState(null);
    const [deviceFunctions, setDeviceFunctions] = useState(null);
    // Alert Message
    const [alertData, setAlertData] = useState({
        active:false,
        type:null,
        status:null,
        url:null
    });

    const [render, setRender] = useState(null);

    useEffect(() => {
        console.log("TEST0");
        Api.getDevice(setDevice,name,setAlertData,alertData);
        Api.getFunctions(setFunctions,setAlertData,alertData);
    }, [render]);
    
    useEffect(() => {
        if(device && functions) {
            const listFunctions = [];
            for(const item of functions) {
                listFunctions.push(item.name);
            }
            setFunctionsName(listFunctions);
        }
    }, [device]);
    useEffect(() => {
        if(device && functionsName) {
            const listDeviceFunctions = [];
            for(const item of device.functions) {  
                if (functionsName.includes(item)) {
                    listDeviceFunctions.push(item);
                }
            }
            setDeviceFunctions(listDeviceFunctions);
        }
    }, [functionsName]);

    const [modalAdd, setModalAdd] = useState(false);
    return(
        <div className="mx-8">
            <div className="rounded-[14px] shadow-md bg-gray-200 px-4 py-4 mx-auto">
                <div className="flex pb-4 justify-between mx-6 ">
                    {name && <div className="font-bold text-2xl color-classic ">Functions of {name}</div>}
                    <button className=' btn btn-classic h-8 w-24 ' onClick={() => setModalAdd(true)}>+ ADD</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4  gap-4 justify-items-center mx-6">
                    {deviceFunctions && deviceFunctions.length > 0 && deviceFunctions.map((fct) => 
                        <Item 
                        function={fct}
                        device={device}
                        setRender={setRender}
                        render={render}
                        alertData={alertData}
                        setAlertData={setAlertData}/>
                    )}
                </div>
            </div>
            {functionsName && <>
                <AddModal 
                modal={modalAdd}
                setModal={setModalAdd} 
                functions={functionsName}
                device={device}
                setRender={setRender}
                render={render}
                alertData={alertData}
                setAlertData={setAlertData}/>
                <Alert data={alertData} setData={setAlertData}/>
            </>}
        </div>
        
    );
}

function Item(props) {
    const [modalRun, setModalRun] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    return(
        <div className=''>
            {props.function !== null && (
                <div className=''>
                    <Paper title={"Function : "+props.function} deleted={setModalDelete} removable={true}>
                        <p className="text-classic pb-1">{"Device : " + props.device.name}</p>
                        <button onClick={() => setModalRun(true)} className="w-full btn btn-classic ">Run</button>
                    </Paper>
                    <RunModal modal={modalRun} setModal={setModalRun} item={props}/>
                    <DeleteModal modal={modalDelete} setModal={setModalDelete} item={props}/>
                </div>
            )}
        </div>
    );
}

function AddModal(props) {
    let { name } = useParams();
    const [inputName, setInputName] = useState();
    const [created, setCreated] = useState(false);
    useEffect(() => {
        if(created) {
            let body = {name:inputName};
            Api.creatFunction(body,name,props.setAlertData,props.alertData);
            props.setRender(!props.render);
            props.setModal(false);
            setCreated(false);
        }
    }, [created]);
    
    return (
        <Modal
            open={props.modal}
            setOpen={props.setModal}
            title="Add"
            subtitle="Setup your device">
            <div className='bg-gray-300 py-4 rounded-[12px] px-4 mx-6 grid grid-cols-1 gap-4'>
                <div className="grid grid-cols-4">
                    <p className="self-center text-classic">Name :&nbsp;</p>
                    <div className=" col-span-3 relative rounded-md shadow-sm h-full">
                        {props.functions.length > 0  && <ListBox data={props.functions} setSelected={setInputName} init={props.functions[0]}/>}
                    </div>
                </div>
                <div className="grid grid-cols-4">
                    <p className="self-center text-classic">Device :</p>
                    {name && <p className="text-lg font-semibold text-gray-800">{name}</p>}
                </div>
                <button className='btn btn-open w-32 mx-auto' disabled={inputName === ''} onClick={() => setCreated(true)}>Send</button>
            </div>
        </Modal>
    );
}

function RunModal(props) {
    const [ran, setRan] = useState(false);
    const [inputValue, setInputValue] = useState('');
    // useEffect(() => {
    //     if(ran) {
    //         switch(props.item.function.name)
    //         {
    //             case "max7219":
    //                 Api.service_max7219(ip,inputValue)
    //                 break;
    //             case "hmi":
    //                 Api.service_hmi(ip)
    //                 break;
    //             default:
    //                 break;
    //         }
    //         props.setModal(false);
    //         setRan(false);
    //     }
    // }, [ran]);
    return (
        <Modal
            open={props.modal}
            setOpen={props.setModal}
            title="Update"
            subtitle="Update your function">
            <div className='bg-gray-300 py-4 rounded-[12px] px-4 mx-6 grid grid-cols-1 gap-4'>
                <Input label="Value :" placeholder="Text..." onChange={setInputValue}/>
                <button className='btn btn-open w-full mx-auto'  disabled={inputValue === ''} onClick={() => setRan(true)}>{"Run : "+props.item.function.cmd+" "+inputValue}</button>
            </div>
        </Modal>
    );
}

function DeleteModal(props) {
    let { name } = useParams();
    const [deleted, setDeleted] = useState(false);
    useEffect(() => {
        if(deleted) {
            let body = {name:props.item.function};
            Api.deleteFunction(body,name,props.item.setAlertData,props.item.alertData);
            props.item.setRender(!props.item.render);
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