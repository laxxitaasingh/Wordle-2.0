import axios from 'axios'
import {base_url} from '../constants'

const checkword = async (word) => {
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: base_url + '/game/check',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : JSON.stringify({"word": word})
    };
    return await axios.request(config)
}

export {checkword}