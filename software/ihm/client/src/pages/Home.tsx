import { useState, useEffect } from 'react';
import Device from './Device';
import * as Api from '../components/Api';

function Home(props) {
    const [server, setServer] = useState(null);
    useEffect(() => {
        Api.getApi(setServer);
       
        if (props.index === 0) {}
        if (props.index === 1) {}
        if (props.index === 2) {}
    }, [props.index]);

    return (
        <div className="px-8 pt-4">
            <Header />
            <p className='text-lg font-semibold pb-2'>{!server ? "Server is Down !" : server}</p>
            {props.index === 0 && <Device />}
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
export default Home;
