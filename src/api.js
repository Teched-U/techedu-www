
import openSocket from 'socket.io-client';
import clip_data from 'assets/json/clip.json'


export const ENDPOINT = 'http://35.245.113.215:5000';
export const CDN_ENDPOINT = 'http://35.244.161.66/';

export const FAKE_DATA = true;


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
    let dummpy_data = [
        {
            'id': 'input1',
            'phrase': 'this is a fixed string',
            'type': 'slide',
            'timestamp': 12.3,
        },
        {
            'id': 'input2',
            'phrase': 'this is a fixed string from trnascript',
            'type': 'transcript',
            'timestamp': 12.3,
        }
    ]
    return dummpy_data

}
