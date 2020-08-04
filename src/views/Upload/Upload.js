import React, {useCallback, useState} from 'react';
import superagent from 'superagent';
import {useDropzone} from 'react-dropzone';
import { useHistory } from "react-router-dom";
import LinearProgress from '@material-ui/core/LinearProgress';


import {ENDPOINT, FAKE_DATA, CDN_ENDPOINT,connectSocket,disconnectSocket} from 'api';

import {DropzoneArea} from 'material-ui-dropzone'
import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function UploadComponent(props) {

  const [uploading, setUpload] = useState(false)

  const uploadFiles = (acceptedFiles) => {
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
          setUpload(true)
          superagent
            .post(ENDPOINT+ '/api'+'/upload')
            .attach('upload_file', file)
            .end((err, res) => {
              console.log(res.body);
              video_name = res.body.path;
              video_url= res.body.video_url;
              let estimated_time = res.body.estimated_time;
              // connectSocket((socket,res)=>{
              //   console.log(res);
                 props.onUpload(video_name, video_url, estimated_time)
              //   disconnectSocket(socket);
              // },video_name)
            });
        }
      });
  }

  return (
    <Grid container direction="column" alignItems="stretch">
      <Grid item>
        <DropzoneArea
          onChange={uploadFiles}
          dropzoneText={"拖拽或点击上传视频"}
          maxFileSize={20000000}
          acceptedFiles={['.mp4', '.mov']}
          showPreviewsInDropzone={false}
          getFileAddedMessage={(fileName) => `视频 ${fileName} 上传中...`}
        />
      </Grid>
      {(uploading) ? <Grid item xs={12} md={12}>
        <LinearProgress size={150}/>
      </Grid>:null}
    </Grid>
  )

  //return (
  //  <section className="container">
  //    <div {...getRootProps({className: 'dropzone'})}>
  //      <input {...getInputProps()} />
  //      <p>点击上传（或拖拽文件至此）</p>
  //    </div>
  //    <aside>
  //      <h4>文件信息</h4>
  //      <ul>{files}</ul>
  //    </aside>
  //  </section>
  //);
}