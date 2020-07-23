import React from "react";
// @material-ui/core components
import { withStyles, makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
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
import { List, ListItem,ListItemText } from '@material-ui/core';

// Import for Video
import "video-react/dist/video-react.css"; // import css
import { Player } from 'video-react';
import { render } from "react-dom";
import {getSegResult, getSearchResult} from 'api';
import { Grid } from "@material-ui/core";


// Dependency for Upload
import UploadComponent from 'views/Upload/Upload.js'
import AnalysisComponent from 'views/Analyze/Analyze.js'
import WatchComponent from "views/Watch/Watch.js"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Grow from '@material-ui/core/Grow';
import {
  grayColor,
  hexToRgb
} from "assets/jss/material-dashboard-react.js";
const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);


class DemoPage extends React.Component {
  constructor(props) {
    super(props);
    let video_name = 'clip.mp4';
    this.state = {
      input: '',
      searchResult: [],
      
      // Upload state 
      video_name: '',
      video_url: '',

      // Analysis Data 
      seg_update: [], 
      seg_result: {},
      modelView:false,
      videoView:false
    }
  }

  /**
   *  Logic for upload Component
   */
   handleUploadFile(video_name, video_url) {
     console.log('Upload Video :' + video_name)
     console.log('Video URL: ' + video_url)

     this.setState({
       video_name: video_name,
       video_url: video_url
     });
   }

   /**
    * Logic for analysis component
    */
    handleSegResultUpdate(result) {
      if(result.done) {
        this.setState({
          seg_result: result
        });
        console.log(this.state.seg_result)

      } else {
        let updates = this.state.seg_update
        updates.push(result)
        this.setState({
          seg_update: updates 
        });
      }
      this.setState({
        modelView:result.done
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
        {/* 视频上传部分 */}
        {this.state.videoView==false?<GridContainer>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>上传视频</h4>
            </CardHeader>
            <CardBody>
              <UploadComponent onUpload={(a, b) => this.handleUploadFile(a,b)}></UploadComponent>
            </CardBody>
          </Card>
        </GridContainer>:null
        }

        {/* 模型数据展示部分*/}
        {(this.state.videoView==false)?<GridContainer style={{display:this.state.modelView?"block":"none"}}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>模型输出数据</h4>
            </CardHeader>
            <CardBody>
              <AnalysisComponent
                videoName={this.state.video_name}
                videoUrl={this.state.video_url}
                onUpdate={(result) => this.handleSegResultUpdate(result)}
              >
              </AnalysisComponent>
              <Button style={{width:"150px",fontSize:"20px",marginTop:"-25px",float:"right"}} variant="outlined" onClick={this.toggleVideo.bind(this,true)}>查看视频</Button>
            </CardBody>
          </Card>
        </GridContainer>
        :null
      }
        {/* 视频最终结果观看页面 */}
        {this.state.videoView?<div>
          <Grow in={this.state.videoView}>

          
          <GridContainer>
            <Card>
              <CardHeader color="primary">
              <Button className={classes.box} style={{width:"50px",fontSize:"20px",background:"rgba(1,1,1,0)",marginTop:"-1px"}}  variant="outlined" onClick={this.toggleVideo.bind(this,false)}><ArrowBackIcon></ArrowBackIcon></Button><h4 style={{display:"inline"}} className={classes.cardTitleWhite}>切割视频展示</h4>
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
      </div>
    );
  }
}
export default withStyles(useStyles)(DemoPage)