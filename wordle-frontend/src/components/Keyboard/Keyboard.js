import React, { useEffect, useContext } from 'react';
import './Keyboard.css'
import { Context } from '../../pages/Game/Game';

export const Keyboard = () => {

    const keys = [
        { id: 1, value: 'Q' },
        { id: 2, value: 'W' },
        { id: 3, value: 'E' },
        { id: 4, value: 'R' },
        { id: 5, value: 'T' },
        { id: 6, value: 'Y' },
        { id: 7, value: 'U' },
        { id: 8, value: 'I' },
        { id: 9, value: 'O' },
        { id: 10, value: 'P' },
        { id: 11, value: 'A' },
        { id: 12, value: 'S' },
        { id: 13, value: 'D' },
        { id: 14, value: 'F' },
        { id: 15, value: 'G' },
        { id: 16, value: 'H' },
        { id: 17, value: 'J' },
        { id: 18, value: 'K' },
        { id: 19, value: 'L' },
        { id: 20, value: 'Enter', specialKey: true },
        { id: 21, value: 'Z' },
        { id: 22, value: 'X' },
        { id: 23, value: 'C' },
        { id: 24, value: 'V' },
        { id: 25, value: 'B' },
        { id: 26, value: 'N' },
        { id: 27, value: 'M' },
        { id: 28, value: '<x', specialKey: true },
    ];

    const [keyboardcolor, setKeyboardcolor] = useContext(Context)

    useEffect(() => {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const letterSet = {};
    
        for (let letter of alphabet) {
            letterSet[letter] = "";
        }
        setKeyboardcolor({...letterSet})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    return (
        <>
            <div class="keyboard-container">
                {keys.map((item) => {
                    return (<button class={keyboardcolor?.[item.value] || "keyboard-keys" }>{item.value}</button>)
                })}
            </div>
        </>
    )
}