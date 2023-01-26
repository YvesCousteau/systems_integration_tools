import { useState, useEffect } from 'react';
import Unitest from "../components/Unitest";
import Intest from "../components/Intest";
import Modal from "../components/Modal";
import Input from "../components/Input";
function Home(props) {
    const [test_4, setTest_4] = useState({ 
        function: "Max7219 LED Scrolling", 
        component: "Seats", 
        state: false,
        api: "/test/unit/max7219_scrolling"
    });
    const [test_5, setTest_5] = useState({ 
        function: "Led Blinking External", 
        component: "Cluster", 
        state: false,
        api: "/test/unit/led_blinking"
    });
    const [test_6, setTest_6] = useState({ 
        function: "Led Blinking Internal", 
        component: "Ctr Console", 
        state: false,
        api: "/test/unit/led_blinking"
    });
    const int_tests = [test_4, test_5, test_6]
    const int_setTests = [setTest_4, setTest_5, setTest_6]

    const [server, setServer] = useState(null);
    const [unitTest, setUnitTest] = useState(null);
    useEffect(() => {
        try {
            let result = fetch("/api", {
                method: 'GET'
            })
            result.then((sucess) => { console.log(sucess) })
            result.then((res) => res.json()).then((data) => setServer(data.message));
        } catch (error) {
            console.log(error)
        }
        if (props.index === 0) {
            try {
                let result = fetch("/api/test/units/", {
                    method: 'GET'
                })
                result.then((sucess) => { console.log(sucess) })
                result.then((res) => res.json()).then((data) => setUnitTest(data.data));
            } catch (error) {
                console.log(error)
            }
        }
        if (props.index === 1) {}
    }, [server,props.index]);

    return (
        <div className="px-8 pt-4">
            <Header />
            <p className='text-lg font-semibold pb-2'>{!server ? "Server is Down !" : server}</p>
            {props.index === 0 && <Unit tests={unitTest} />}
            {props.index === 1 && <Integration tests={int_tests} setTests={int_setTests} />} 
        </div>
    );
}

function Header() {
    return (
        <div>
            <p className="text-3xl font-bold color-classic pb-1">Communication Manager</p>
            <p className="text-gray-500 text-lg">Test your communication with me.</p>
        </div>
    );
}

function Unit(props) {
    const [modal, setModal] = useState(false);
    return (
        <div className="rounded-[14px] shadow-md bg-gray-200 px-8 py-4 mx-auto">
            <div className="flex pb-4 justify-between mx-6 ">
                <div className="font-bold text-2xl color-classic ">Units Tests</div>
                <button className=' btn btn-classic h-8 w-24 ' onClick={() => setModal(true)}>+ ADD</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-4 pb-4 justify-items-center">
                {props.tests !== null && props.tests.map((test) => <Unitest test={test} />)}
                {props.tests === null && [1,2,3].map(function (object, i) {
                    return <div className='animate-pulse w-60 h-34 bg-gray-900 rounded-[12px]' />;
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
/* 
{props.tests ? (
                    props.tests.map((test) => <Unitest test={props.test} />)
                ):(
                    <div className='animate-pulse w-48 h-48 bg-gray-900'/>
                )}
                {props.tests.map((test) => <Unitest test={props.test}/>)}
*/



function Integration(props) {
    const [modal, setModal] = useState(false);
    return (
        <div className="rounded-[14px] shadow-md bg-gray-200 px-8 py-4 mx-auto">
            <div className="flex pb-4 justify-between mx-2 ">
                <div className="font-bold text-2xl color-classic ">Integrations Tests</div>
                <button className=' btn btn-classic h-8 w-24 ' onClick={() => setModal(true)}>+ ADD</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-4 pb-4">
                <Intest test={props.tests[0]} setTest={props.setTests[0]} />
                <Intest test={props.tests[1]} setTest={props.setTests[1]} />
                <Intest test={props.tests[2]} setTest={props.setTests[2]} />
            </div>
            <Modal
                open={modal}
                setOpen={setModal}
                title="Add Test"
                subtitle="Setup your test and remind to config the server for now">
                <div className='bg-gray-300 py-4 rounded-[12px] px-4 mx-6 grid grid-cols-1 gap-4'>
                    <Input label="Function :" placeholder="Text..." />
                    <Input label="Component :" placeholder="Text..." />
                    <Input label="API :" placeholder="URL..." />
                    <button className='btn btn-open w-32 mx-auto' onClick={() => setModal(false)}>Send</button>
                </div>
            </Modal>
        </div>
    );
}
export default Home;
