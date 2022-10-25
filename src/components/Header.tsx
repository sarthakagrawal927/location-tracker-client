import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { LocationObject } from '../helpers/types';

const Header = () => {

    useEffect(() => {
        const socket = io('http://localhost:8080')
        window.addEventListener('subscribe', () => { })
        socket.on('connect', () => console.log(socket.id))
        socket.on('connect_error', () => {
            setTimeout(() => socket.connect(), 8080)
        })
        socket.on('newPosition', (data: LocationObject) => {
            window.dispatchEvent(new CustomEvent('newPosition', { detail: data }))
        });
    }, [])

    return (
        <>
        </>
    );
};

export default Header;