import { useEffect, useState } from "react";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import Paper from "../../components/Paper";
import Alert from "../../components/Alert";
import * as Api from "./Api";
import { Link } from "react-router-dom";

export default function Device(props) {
    const [devices, setDevices] = useState(null);
    // Alert Message
    const [alertData, setAlertData] = useState({
        active:false,
        type:null,
        status:null,
        url:null
    });
    useEffect(() => {
        Api.getDevices(setDevices,setAlertData,alertData);
    }, []);
    return(
        <div className="mx-8">
            <div className="rounded-[14px] shadow-md bg-gray-200 px-4 py-4 mx-auto">
                <div className="flex pb-4 justify-between mx-6 ">
                    <div className="text-classic ">Devices</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4  gap-4 justify-items-center mx-6">
                    {devices !== null && devices.map((device) => 
                        <Item  device={device} alertData={alertData} setAlertData={setAlertData}/>
                    )}
                </div>
            </div>
        </div>
    );
}
function Item(props) {
    return(
        <div className=''>
            {props.device !== null && (
                <div className=''>
                    <Paper title={"Device : "+props.device.name} removable={false}>
                        <p className="text-classic pb-1">{"IP : "+props.device.ip}</p>
                        <p className="text-classic pb-2">
                            {props.device && "Functions Numbers : "+props.device.functions.length}
                        </p>
                        <Link to={'device/'+props.device.name} className="flex justify-center btn btn-classic ">Functions</Link>
                    </Paper>
                </div>
            )}
        </div>
    );
}
