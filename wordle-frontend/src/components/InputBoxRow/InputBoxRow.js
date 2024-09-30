import React, { useContext, useEffect, useRef, useState } from 'react';
import './InputBoxRow.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios'
import { Context } from '../../pages/Game/Game';


const InputBoxRow = ({ wordLength, disable, setRowsDisabled }) => {
  let inputRefs = useRef([]);
  const [open, setOpen] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [word, setWord] = useState(Array(wordLength).fill(''))
  const regex = /^[a-zA-Z]+$/;
  const [disableRow, setDisableRow] = useState(disable)
  const [className, setClassName] = useState(['initial-box'])
  const [keyboardcolor, setKeyboardcolor] = useContext(Context)

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  useEffect(()=>{
    setWord(Array(wordLength).fill(''))
    setDisableRow(disable)
    setClassName(Array(wordLength).fill('initial-box'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[wordLength])

  useEffect(()=>{
    setDisableRow(disable)
  },[disable])

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSnackbarClose = () => setOpenSnackbar(false)
  const handleKeyUp = async (index, e) => {

    const value = e.target.value;
    const key = e.key;
    const nextIndex = index + 1;
    const prevIndex = index - 1;
    let filledLetters = word.join('')
    inputRefs.current = inputRefs.current.filter((item)=> {return item !== null })
    if (regex.test(e.target.value) && value && nextIndex < inputRefs.current.length) {
      const nextInput = inputRefs.current[nextIndex];
      if (nextInput) {
        nextInput.focus();
      }
    } else if (key === 'Backspace' && prevIndex >= 0) {
      const prevInput = inputRefs.current[prevIndex];
      if (prevInput) {
        prevInput.focus();
      }
    } else if (e.key === 'Enter' && filledLetters.length === wordLength) {
      let wordToCheck = word.join('')
      try {
        let data1 = await axios.post(`http://localhost:3200/game/check/${wordToCheck.length}`, { data: { "word": wordToCheck } })
        let {data, status} = data1
        if (status !== 203) {
        let correctPositions = data.correctPositions.map((item) => { return (item.index) })
        let incorrectPositions = data.incorrectPositions.reduce((acc, item) => {
          if (item.present === true) {
            acc.push(item.index);
          }
          return acc;
        }, []);
        let classNameBackground = []
        for (let index = 0; index < wordToCheck.length; index++) {
          if (correctPositions.includes(index)) {
            classNameBackground[index] = 'initial-box green'
          } else if (incorrectPositions.includes(index)) {
            classNameBackground[index] = 'initial-box yellow'
          } else {
            classNameBackground[index] = 'initial-box grey'
          }
        }
        setClassName([...classNameBackground])
        setKeyboardClasses(correctPositions, incorrectPositions, wordToCheck)
        if (correctPositions.length === wordToCheck.length) {
          handleOpen()
        } else {
          setRowsDisabled()
        }
      } else {
         setOpenSnackbar(true)
      }
      } catch (error) {
        console.log("Some Error Occured")
      }
    }
  };

  const setKeyboardClasses = (correctPositions, incorrectPositions, wordToCheck) => {
    let keyboardColorTemp = JSON.parse(JSON.stringify(keyboardcolor))

      for (let index = 0; index < wordToCheck.length; index++) {
        let letter = wordToCheck.charAt(index)
        if (correctPositions.includes(index)) {
          keyboardColorTemp[letter] = 'keyboard-keys green-bg'
        } else if (incorrectPositions.includes(index)) {
          if(!(keyboardColorTemp[letter].includes("green"))) {
            keyboardColorTemp[letter] = 'keyboard-keys yellow-bg'        
          }
        } else {
          if(!(keyboardColorTemp[letter].includes("green") || keyboardColorTemp[letter].includes("yellow"))) {
            keyboardColorTemp[letter] = 'keyboard-keys grey-bg'  
          }
        }
      }
      setKeyboardcolor({...keyboardColorTemp})
  }

  const handlePaste = (e) => {
  };
  
  const handleChange = (index, e) => {
    let currentWord = word
    currentWord[index] = e.target.value.toUpperCase()
    setWord([...currentWord])
  };

  const action = (
    <React.Fragment>

    </React.Fragment>
  );


  return (
    <div>
      {Array.from({ length: wordLength }, (_, index) => (
        <input
          key={index}
          maxLength="1"
          type="text"
          className={className[index]}
          disabled={disableRow === 'true'}
          value={word[index]}
          onKeyUp={(e) => handleKeyUp(index, e)}
          ref={el => inputRefs.current[index] = el}
          onChange={(e) => handleChange(index, e)}
          onPaste={handlePaste}
        />
      ))}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h3" component="h2" className='modal-heading'>
            Great ✨
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} className='modal-description'>
            Congratulations, You guessed the word. 💐
          </Typography>
        </Box>
      </Modal>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message="Word does not exist"
        action={action}
      />

    </div>
  );
};

export { InputBoxRow };
