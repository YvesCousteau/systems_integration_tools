import React, { useState } from 'react';

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
            <p className="text-3xl font-bold color-classic pb-1">
                Communication Manager
            </p>
            <p className="text-gray-500 text-lg">
                Test your communication with me.
            </p>
        </div>
    );
}

function Body() {
    const [state, setState] = useState("None");

    return (
        <div className="rounded-[14px] shadow-md bg-gray-200 px-8 py-4 mx-auto">
            <div className="flex justify-center font-bold text-2xl pb-4 color-classic">Units Tests</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-4 pb-4">
                <Unitest function="Max7219 LED Scrolling" device="Raspberry Pico" state={state} />
                <Unitest function="Led Blinking External" device="Raspberry Pico" state={state} />
                <Unitest function="Led Blinking Internal-" device="Raspberry Pico" state={state} />
            </div>
            
        </div>
    );
}

function Unitest(props) {
    return(
        <div className="rounded-[14px] shadow-md px-4 py-4 bg-gray-300 mx-auto w-60">
            <p className="font-semibold text-gray-800 pb-1">
                Fct : {props.function}
            </p>
            <p className="font-semibold text-gray-800 pb-1">
                Device : {props.device}
            </p>
            <p className="font-semibold text-gray-800 pb-1">
                State : {props.state}
            </p>
            <button class="btn btn-classic">
                Run
            </button>
        </div>
    );
}
export default Home;