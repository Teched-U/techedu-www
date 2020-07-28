import React, {useCallback} from 'react';
import superagent from 'superagent';
import {useDropzone} from 'react-dropzone';
import { useHistory } from "react-router-dom";

import {ENDPOINT, FAKE_DATA, CDN_ENDPOINT,connectSocket,disconnectSocket} from 'api';


export default function UploadComponent(props) {

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach(file => {
        let video_name;
        let video_url;
        if(FAKE_DATA){
          // Set the state with the dummy video name
          console.log('Setting to Fake Data')
          video_name = 'clip.mp4';
          video_url =CDN_ENDPOINT + 'clip.mp4';
        } else {
          // Send the video for processing if API enabled
          superagent
            .post(ENDPOINT+ '/api'+'/upload')
            .attach('upload_file', file)
            .end((err, res) => {
              console.log(res.body);
              video_name = res.body.path;
              video_url= res.body.video_url;
              // connectSocket((socket,res)=>{
              //   console.log(res);
                 props.onUpload(video_name, video_url)
              //   disconnectSocket(socket);
              // },video_name)
            });
            
            
        }

        

        // TODO(这里应该隐去这个模块)
      });
    },
    [],
  )
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({onDrop});
  
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      上传 {file.path} 中... 
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>点击上传（或拖拽文件至此）</p>
      </div>
      <aside>
        <h4>文件信息</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}