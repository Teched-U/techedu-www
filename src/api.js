
import openSocket from 'socket.io-client';
import clip_data from 'assets/json/clip.json'

var moment = require('moment');


export const ENDPOINT = 'http://35.245.113.215:5000';
export const CDN_ENDPOINT = 'http://35.244.161.66/';

export const FAKE_DATA = false;

export function format_time(time) {
    return moment.utc(moment.duration(time, 'seconds').asMilliseconds()).format('mm:ss')
}

export function connectSocket(cb, video_name) {
    console.log("Connecting to " + ENDPOINT + "with " + video_name);
    if (FAKE_DATA) {
        let result = clip_data;

        setTimeout(()=>{
            cb(null, result);
        }, 3000);

        return null;
    } else {
        const socket = openSocket(ENDPOINT);

        // Send pool request for update
        setInterval(() => {
            socket.emit('analysis', video_name)
        }, 5000)

        socket.on('result', result => cb(null, result));

        return socket
    }
}

export function disconnectSocket(socket) {
    if(!!socket) {
        socket.disconnect();
    }
}

// TODO
export function getSearchResult(user_input, seg_data) {
    /*
    Input: 
        user_input: string Search string
        seg_data: [dict] list of segment data :
            {
                
            }

    
    Return: 
        search_result [dict] list of search result: 
        {
            "phrase": "this is a SEARCHED string",
            "type": "slide" or "transcript",
            "timestamp": aaaa, 
        }
     */
    if(user_input == "") {
        return null;
    }
}
