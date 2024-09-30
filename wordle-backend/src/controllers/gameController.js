const fs = require('fs')
const path = require('path')
const moment = require('moment')
const axios = require('axios')
const filePath = path.resolve(__dirname, '../../words.json')

const checkWordController = async (req, res) => {
    const filePath = path.resolve(__dirname, '../../wordle.json');
    let finalObject
    let wordExistFlag = await wordExist(req.body.data.word, res)

    await fs.readFile(filePath, 'utf-8', (err, response) => {
        let date = moment().format("YYYY-MM-DD")
        let word = JSON.parse(response)[`${date}`][`${req.params.letters}`]
        let guessedWord = req.body.data.word.toUpperCase()
        let { correctPositions, incorrectPositions } = wordleChecker(word.toUpperCase(), guessedWord)
        finalObject = {
            correctPositions,
            incorrectPositions
        }
        if (wordExistFlag || (word.toUpperCase() === guessedWord)) {
            return res.status(200).send(finalObject)
        } else {
            return res.status(203).send(
                {
                    message: "word does not exist"
                }
            )
        }
    })

}

async function wordExist(word, res) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        let worlist = JSON.parse(data)
        let isPresent = worlist.includes(word.toLowerCase())
        return isPresent
    } catch (error) {
        return res.status(203).send({
            message: "word does not exist"
        })
    }
}

function wordleChecker(correctWord, guessedWord) {
    if (correctWord.length !== guessedWord.length) {
        throw new Error("The length of the correct word and guessed word must be the same.");
    }

    let correctPositions = [];
    let incorrectPositions = [];
    let matchedLetters = {};

    for (let i = 0; i < correctWord.length; i++) {
        if (guessedWord[i] === correctWord[i]) {
            correctPositions.push({ index: i, letter: guessedWord[i], present: true });
            matchedLetters[guessedWord[i]] = (matchedLetters[guessedWord[i]] || 0) + 1;
        }
    }

    for (let i = 0; i < correctWord.length; i++) {
        if (guessedWord[i] !== correctWord[i]) {
            const guessedLetter = guessedWord[i];
            const correctIndex = correctWord.indexOf(guessedLetter);

            if (correctIndex !== -1 && (!matchedLetters[guessedLetter] || matchedLetters[guessedLetter] < correctWord.split(guessedLetter).length - 1)) {
                incorrectPositions.push({ index: i, letter: guessedLetter, present: true, correctIndex });
                matchedLetters[guessedLetter] = (matchedLetters[guessedLetter] || 0) + 1;
            } else {
                incorrectPositions.push({ index: i, letter: guessedLetter, present: false, correctIndex: -1 });
            }
        }
    }

    return { correctPositions, incorrectPositions };
}



module.exports = {
    checkWordController,
}