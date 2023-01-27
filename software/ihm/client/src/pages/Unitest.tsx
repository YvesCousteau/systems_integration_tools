import { useState,useEffect } from 'react';
import Modal from "../components/Modal";
import Input from "../components/Input";
import Paper from "../components/Paper";

export default function Unitest(props) {
    const [modal, setModal] = useState(false);
    return(
        <div className="rounded-[14px] shadow-md bg-gray-200 px-8 py-4 mx-auto">
            <div className="flex pb-4 justify-between mx-6 ">
                <div className="font-bold text-2xl color-classic ">Units Tests</div>
                <button className=' btn btn-classic h-8 w-24 ' onClick={() => setModal(true)}>+ ADD</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-4 pb-4 justify-items-center">
                {props.tests !== null && props.tests.map((test) => <Unit test={test} />)}
                {props.tests === null && [1,2,3].map(function (object, i) {
                    return <div className='animate-pulse w-80 h-34 bg-gray-900 rounded-[12px]' />;
                })}
            </div>
            <Modal
                open={modal}
                setOpen={setModal}
                title="Add Test"
                subtitle="Setup your test and remind to config the server for now">
                <div className='bg-gray-300 py-4 rounded-[12px] px-4 mx-6 grid grid-cols-1 gap-4'>
                    <Input label="Function :" placeholder="Text..." />
                    <Input label="Device :" placeholder="Text..." />
                    <Input label="API :" placeholder="URL..." />
                    <button className='btn btn-open w-32 mx-auto' onClick={() => setModal(false)}>Send</button>
                </div>
            </Modal>
        </div>
    );
}

function Unit(props) {
    const [modal, setModal] = useState(false);
    const [update, setUpdate] = useState({ activity: false, value: false });
    const [del, setDel] = useState(false);
    const [data, setData] = useState(props.test);
    let list = []
    if (data !== null) {
        list = [
            "Device : " + data.device,
            "State : " + Boolean(data.state),
        ];
    }
    
    useEffect(() => {
        if (update.activity) {
            let body = { function: data.function, device: data.device, state: update.value }
            try {
                let result = fetch("/api/test/unit/" + data.id, {
                    method: 'PATCH',
                    headers: {
                        Accept: 'application.json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                })
                result.then((sucess) => { console.log(sucess) })
                result.then((res) => res.json()).then((data) => setData(data.data));
            } catch (error) {
                console.log(error)
            }
            setUpdate({ activity: false, value: false })
        }
        if (del) {
            try {
                let result = fetch("/api/test/unit/" + data.id, {
                    method: 'DELETE'
                })
                result.then((sucess) => { console.log(sucess) })
                result.then((res) => res.json()).then((data) => setData(null));
            } catch (error) {
                console.log(error)
            }
            setDel(false)
            setModal(false)
        }
        /*
        if (modal) {
            fetch("/api/",{method: 'POST'})
                .then((res) => res.json())
                .then((data) => setServer(data.message));
        }
        if (!modal) {
            fetch("/test/unit/uart/close",{method: 'POST'})
                .then((res) => res.json())
                .then((data) => setServer(data.message));
        }
        */

    }, [modal, update, del, data]);
    return(
        <div className=''>
            {data !== null && (
                <div className=''>
                    <Paper title={data.function} del={setDel} modal={setModal} list={list}/>
                    <Modal
                        open={modal}
                        setOpen={setModal}
                        title={data.function}
                        subtitle="La j ai r">
                        <p className="flex justify-center text-xl font-bold color-classic">
                            State :&nbsp;{data.state ? (<div className='text-green-700'>Success</div>) : (<div className='text-red-700'>Fail</div>)}
                        </p>
                        <div className='bg-gray-300 py-4 my-2 rounded-[12px] mx-4'>
                            <div className='grid grid-cols-3 w-full'>
                                <div className='mx-auto text-lg font-semibold'>Result :</div>
                                <button className='w-24 btn btn-open' onClick={() => setUpdate({ activity: true, value: true })}>
                                    Success
                                </button>
                                <button className='w-24 btn btn-close' onClick={() => setUpdate({ activity: true, value: false })}>
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