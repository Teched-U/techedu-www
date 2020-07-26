
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
        return [];
    }

    let story_list = seg_data.story_list

    let results  = []
    for (let story of story_list) {
        let words = story.words
        for (let i = 0; i < words.length ; i++) {
            let word = words[i]
            if(word.word == user_input) {
                // Gather the previous 5 words
                let prev_words = []
                for(let j = Math.max(0, i - 5); j < i; j++){
                    prev_words.push(words[j].word)
                }

                let next_words = []
                for(let j= i+1; j < Math.min(words.length, i + 5); j++){
                    next_words.push(words[j].word)
                }
                
                let j = Math.max(0, i-5)
                let ts = words[j].start_time
                let prev_phrase = prev_words.join(' ')
                let next_phrase = next_words.join(' ')
                results.push({
                    prev_phrase: prev_phrase,
                    next_phrase: next_phrase,
                    start: ts,
                    word: word.word
                })
            }
        }
    }

    return results
}
