import React, { useState } from 'react';
import Unitest from "../components/Unitest";
import Intest from "../components/Intest";

function Home(props) {
    //const pathname = window.location.pathname
    /* Must be optimized */
    const [test_1, setTest_1] = useState({ 
        function: "Max7219 LED Scrolling", 
        device: "Raspberry Pico", 
        state: false,
        api: "/max7219_scrolling"
    });
    const [test_2, setTest_2] = useState({ 
        function: "Led Blinking External", 
        device: "Raspberry Pico", 
        state: false,
        api: "/led_blinking"
    });
    const [test_3, setTest_3] = useState({ 
        function: "Led Blinking Internal", 
        device: "Raspberry Pico", 
        state: false,
        api: "/led_blinking"
    });
    const [test_4, setTest_4] = useState({ 
        function: "Max7219 LED Scrolling", 
        component: "Seats", 
        state: false,
        api: "/max7219_scrolling"
    });
    const [test_5, setTest_5] = useState({ 
        function: "Led Blinking External", 
        component: "Cluster", 
        state: false,
        api: "/led_blinking"
    });
    const [test_6, setTest_6] = useState({ 
        function: "Led Blinking Internal", 
        component: "Ctr Console", 
        state: false,
        api: "/led_blinking"
    });

    const unit_tests = [test_1, test_2, test_3]
    const unit_setTests = [setTest_1, setTest_2, setTest_3]
    const int_tests = [test_4, test_5, test_6]
    const int_setTests = [setTest_4, setTest_5, setTest_6]
    
    const [server, setServer] = React.useState(null);
    React.useEffect(() => {
        fetch("/api",{methode:"post"})
            .then((res) => res.json())
            .then((data) => setServer(data.message));
    }, []);

    return (
        <div className="px-8 pt-4">
            <Header />
            <p className='text-lg font-semibold pb-2'>{!server ? "Server is Down !" : server}</p>
            {props.index === 0 && <Unit tests={unit_tests} setTests={unit_setTests}/>}
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
    return (
        <div className="rounded-[14px] shadow-md bg-gray-200 px-8 py-4 mx-auto">
            <div className="flex justify-center font-bold text-2xl pb-4 color-classic">Units Tests</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-4 pb-4">
                <Unitest test={props.tests[0]} setTest={props.setTests[0]} />
                <Unitest test={props.tests[1]} setTest={props.setTests[1]} />
                <Unitest test={props.tests[2]} setTest={props.setTests[2]} />
            </div>
        </div>
    );
}

function Integration(props) {
    return (
        <div className="rounded-[14px] shadow-md bg-gray-200 px-8 py-4 mx-auto">
            <div className="flex justify-center font-bold text-2xl pb-4 color-classic">Integrations Tests</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-4 pb-4">
                <Intest test={props.tests[0]} setTest={props.setTests[0]} />
                <Intest test={props.tests[1]} setTest={props.setTests[1]} />
                <Intest test={props.tests[2]} setTest={props.setTests[2]} />
            </div>
        </div>
    );
}
export default Home;