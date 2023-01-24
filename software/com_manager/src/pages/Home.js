import React, { useState } from 'react';
import Unitest from "../components/Unitest";


function Home() {
    return (
        <div className="px-8 pt-4">
            <Header/>
            <Body />
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

function Body() {

    const [test_1, setTest_1] = useState({function: "Max7219 LED Scrolling", device: "Raspberry Pico", state: false});
    const [test_2, setTest_2] = useState({function: "Led Blinking External", device: "Raspberry Pico", state: false});
    const [test_3, setTest_3] = useState({function: "Led Blinking Internal", device: "Raspberry Pico", state: false});
    return (
        <div className="rounded-[14px] shadow-md bg-gray-200 px-8 py-4 mx-auto">
            <div className="flex justify-center font-bold text-2xl pb-4 color-classic">Units Tests</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-4 pb-4">
                <Unitest test={test_1} setTest={setTest_1}/>
                <Unitest test={test_2} setTest={setTest_2}/>
                <Unitest test={test_3} setTest={setTest_3}/>
            </div>
        </div>
    );
}
export default Home;