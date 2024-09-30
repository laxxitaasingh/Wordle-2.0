import {React, useEffect, useState, createContext} from 'react'
import { InputBoxRow } from '../../components/InputBoxRow/InputBoxRow'
import { Keyboard } from '../../components/Keyboard/Keyboard'
import config from '../../constants'
import './Game.css'
import { useSelector } from 'react-redux'

export const Context = createContext();

const Game = () => {
    const rows= 6
    const [wordLength, setWordLength] = useState(5)
    const [disabledRows, setDisabledRows] = useState(['false',...Array(rows-1).fill('true')])
    const [keyboardcolor, setKeyboardcolor] = useState()
    const isOwner = useSelector((state) => state.roomOwner.owner?.isOwner);
    // let disabled = [...disabledRows]
    // disabled[0] = 'false'
    // setDisabledRows([...disabled])

    useEffect(()=>{
      if(isOwner===false) {
        setDisabledRows(Array(rows).fill('true'))
      }
    },[isOwner])

    useEffect(()=>{
      let currentDisabled = Array(rows).fill('true')
      currentDisabled[0] = 'false'
      setDisabledRows([...currentDisabled])
      if (keyboardcolor) {
        let keyboardcolors = {...keyboardcolor}
        for (let key in keyboardcolors) {
          keyboardcolors[key]= ""
        }
        setKeyboardcolor({...keyboardcolors})  
      }
// eslint-disable-next-line react-hooks/exhaustive-deps
    },[wordLength])

    function setRowsDisabled() {
        let disabledIndex = disabledRows.indexOf('false')
        let disabledValues = [...disabledRows]
        disabledValues[disabledIndex] = 'true'
        if (rows > disabledIndex ) {
            disabledValues[disabledIndex+1] = 'false'
        }
        setDisabledRows([...disabledValues])
    }

    return (
        <Context.Provider value={[keyboardcolor, setKeyboardcolor]}>
          <div>
            <div className='wordle-heading'>
            Wordle
            </div>
            <hr className='horizontal-line'></hr>
            <div className='letter-container'>
               {
                config.letterWord.map((item, index) => {
                    return (
                        <>
                        <button disabled={!isOwner} key={index} className='letter-length' onClick={()=>{setWordLength(item)}}>{item}</button>
                        </>
                    )
                })
               }
            </div>
            <div className='input-container'>
                {Array.from({ length: rows }, (_, index) => index).map((item,index)=>{
                    return  <InputBoxRow wordLength={wordLength} disable={disabledRows[index]} setRowsDisabled={setRowsDisabled}key={index}/>
                })}
            </div>
          </div>

          <div className='keyboard-container-wrapper'>
             <Keyboard/>
          </div>
        </Context.Provider>
    )
}

export {Game}