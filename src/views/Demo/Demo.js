import React from "react";
// @material-ui/core components
import { withStyles, makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import superagent from 'superagent';
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Search from "@material-ui/icons/Search";

import avatar from "assets/img/faces/marc.jpg";
import xiaoxin from "assets/img/xiaoxin.jpg";
import video from "assets/video/03_linear-algebra-review.mp4"
import { List, ListItem,ListItemText, Typography } from '@material-ui/core';

// Import for Video
import "video-react/dist/video-react.css"; // import css
import { Player } from 'video-react';
import { render } from "react-dom";
import {getSegResult, getSearchResult} from 'api';
import { Grid } from "@material-ui/core";
import {ENDPOINT} from 'api.js';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';



// Dependency for Upload
import UploadComponent from 'views/Upload/Upload.js'
import AnalysisTabComponent from 'views/Analyze/AnalyzeTab.js'
import WatchComponent from "views/Watch/Watch.js"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Grow from '@material-ui/core/Grow';
import {
  grayColor,
  hexToRgb
} from "assets/jss/material-dashboard-react.js";
import Divider from '@material-ui/core/Divider';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "white",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};



class DemoPage extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)

    let video_name = ''
    let video_url = ''

    if(props.location.state) {
      video_name = props.location.state.video_name;
      video_url = props.location.state.video_url;
    }
    this.state = {
      input: '',
      searchResult: [],
      
      // Upload state 
      video_name: video_name,
      //video_name: '07_regularization.mp4',
      video_url: video_url,

      disconnect: false,

      // Analysis Data 
      seg_update:[],
      //seg_update: fake_data, 
      seg_result: {},
      modelView:false,

      videoView: false,

      estimated_time: null,

      //videoView: true
    }
  }

  cancelNow() {
    console.log("Cancelling " + this.state.video_name)
    superagent
    .get(ENDPOINT+'/api/cancel/'+this.state.video_name)
    .then(res=> {
      console.log(res.body)
      // Toggle the UI view here
    })
    .catch(err => {
      console.log('Cancel failed: ')
      console.log(err)
      // Toggle the UI view here
    })

    this.setState({
      video_name: ''
    })
  }

  /**
   *  Logic for upload Component
   */
   handleUploadFile(video_name, video_url, estimated_time) {
     console.log('Upload Video :' + video_name)
     console.log('Video URL: ' + video_url)

     this.setState({
       video_name: video_name,
       video_url: video_url,
       estimated_time: estimated_time
     });
   }


   /**
    * Logic for analysis component
    */
    handleSegResultUpdate(result) {
      let isDone = false 
      let final_result = null

      // Iterate all states
      for(let state_result of result) {
        if(state_result.done) {
          final_result = state_result
          isDone = true
          console.log("I am done")
        }
      }

      this.setState({
        seg_update: result,
      });

      if(isDone) {
        this.setState({
          seg_result: final_result,
          disconnect: true,
        });
        console.log(this.state.seg_result)

      }

      this.setState({
        modelView: isDone,
        videoView:isDone
      })
    }
    toggleVideo(value){
      console.log(this)
      this.setState({
        videoView:value
      })
    }
  render() {
    const { classes } = this.props
    return (
      <div>
        {/* 视频最终结果观看页面 */}
        {this.state.videoView?<div>
          <Grow in={this.state.videoView}>

          
          <GridContainer>
            <Card>
              <CardHeader>
                  {/* <Button className={classes.box} style={{ width: "50px", fontSize: "20px", background: "rgba(1,1,1,0)", marginTop: "-1px", fontWeight: "bold" }} variant="outlined" onClick={this.toggleVideo.bind(this, false)}><ArrowBackIcon></ArrowBackIcon></Button><Typography color="primary" variant="h4" style={{display: 'inline'}} >切割视频展示</Typography>  */}
              <Divider />
              </CardHeader>
              <CardBody>
                <WatchComponent
                videoName={this.state.video_name}
                videoUrl={this.state.video_url}
                segresult={this.state.seg_result}
                segupdate={this.state.seg_update}
                >
                </WatchComponent>
              </CardBody>
            </Card>
          </GridContainer>
          </Grow>
        </div>
        :null
      }
        {/* 视频上传部分 */}
        {(!this.state.video_name)?<GridContainer>
          <Card>
            <CardHeader color="primary" >
              <h3 className={classes.cardTitleWhite} style={{fontWeight:"bold"}}>上传视频</h3>
              <Typography variant="subtitle1">
                请上传英文带PPT的视频。视频处理可能需要一定时间。建议上传较短视频（5-10分钟）进行现场处理。
              </Typography>
              <Divider />
            </CardHeader>
            <CardBody>
              <UploadComponent onUpload={(a, b, c) => this.handleUploadFile(a,b, c)}></UploadComponent>
            </CardBody>
          </Card>
        </GridContainer>:null
        }
        {/* 模型数据展示部分*/}
        {(!!this.state.video_name)?<GridContainer>
          <Card>
            <CardHeader >
              <Grid container justify="space-between">
                <Grid item md={4}>
                  <Typography variant="h4"  style={{fontWeight:"bold"}}>
                  <Divider orientation="vertical" flexItem style={{width:"4px",height:"40px",float:"left",background:"#2981ee",marginRight:"20px"}} />
                  模型输出数据
                    </Typography>
                </Grid>
                {(this.state.estimated_time<0)?
                <Typography variant="title2" color="error">
                  无法打开视频,请检查视频格式!
                </Typography>
                :null}
                {(!this.state.modelView) ? <Grid>
                  {(this.state.estimated_time > 0)?
                  <Typography variant="body2" color="primary">
                    预计时间: {(this.state.estimated_time / 60).toFixed(1)} 分钟
                  </Typography>
                  : null}
                  <LinearProgress />
                  <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => this.cancelNow()}>
                      取消分析
                  </Button>
                </Grid>:null}
              </Grid>
              
              <Divider />
            </CardHeader>            
            <CardBody>
              <AnalysisTabComponent
                videoName={this.state.video_name}
                videoUrl={this.state.video_url}
                onUpdate={(result) => this.handleSegResultUpdate(result)}
                segUpdate={this.state.seg_update}
                disconnect={this.state.disconnect}
              >
              </AnalysisTabComponent>
            </CardBody>
          </Card>
        </GridContainer>
        :null
      }
        
      </div>
    );
  }
}
export default withStyles(styles)(DemoPage);
