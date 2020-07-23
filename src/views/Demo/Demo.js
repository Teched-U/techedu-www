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
    }

  render() {
    const { classes } = this.props

    return (
      <div>
        {/* 视频上传部分 */}
        <GridContainer>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>上传视频</h4>
            </CardHeader>
            <CardBody>
              <UploadComponent onUpload={(a, b) => this.handleUploadFile(a,b)}></UploadComponent>
            </CardBody>
          </Card>
        </GridContainer>

        {/* 模型数据展示部分*/}
        <GridContainer>
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
            </CardBody>
          </Card>
        </GridContainer>
        {/* 视频最终结果观看页面 */}
        <div>
          <GridContainer>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>切割视频展示</h4>
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
        </div>
      </div>
    );
  }
}
export default withStyles(useStyles)(DemoPage)
