import React from "react";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
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
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import WorkIcon from '@material-ui/icons/Work';
import VideocamIcon from '@material-ui/icons/Videocam';
import Tooltip from '@material-ui/core/Tooltip';
import Image from 'material-ui-image'
import {format_time, getSearchResult} from 'api'



import Time from 'react-time-format'



import avatar from "assets/img/faces/marc.jpg";
import xiaoxin from "assets/img/xiaoxin.jpg";
import video from "assets/video/03_linear-algebra-review.mp4"

// Import for Video
import "video-react/dist/video-react.css"; // import css
import { Player } from 'video-react';
import { List, ListItem,ListItemText, ListSubheader, ListItemAvatar, ListItemIcon } from '@material-ui/core';
import fake_data from 'assets/json/clip.json'


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

class WatchComponent extends React.Component{
  constructor(props) {
    super(props);
    console.log(props)
    this.classes = props.classes

    
    //let results = fake_data[3].results
    let results = props.segresult.results
    this.times = []
    console.log("results")
    console.log(results)

    this.state = {
      seg_result: results,
      search_word : ""
    }

    // Get the outlines for each story
    this.story_outlines = []
    for(let story of results.story_list) {
      let start_time = story.timestamp
      let end_time = story.timestamp + story.duration
      start_time = format_time(start_time)
      end_time = format_time(end_time)
      let story_elem = {
        timestamp: story.timestamp,
        duration: story.duration,
        thumbnail: story.thumbnail,
        start: start_time,
        end: end_time,
        outline: []
      }
      let outline_list = []
      let outline = story.outline
      for(let slide of outline) {
        let title = slide.result.Title.text
        let start_time = slide.timestamp
        let thumbnail = slide.thumbnail

        outline_list.push({
          word: title,
          timestamp: start_time,
          thumbnail: thumbnail,
        })
      }

      story_elem.outline = outline_list
      this.story_outlines.push(story_elem)
    }

    // story_outlines
    console.log(this.story_outlines)

  }
  componentDidMount() {
    console.log(this.player)
    this.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }

  handleStateChange(state, prevState) {
    this.setState({
      player:state
    })
  }

  click(time){
    
    //let times=event.start_time.split(":");
    this.player.play()
    this.player.seek(time)
    this.setState({
      player:this.player
    })
    

    console.log(time)
  }

  render() {
    let times=[{
      word:"片段1",
      start_time:11.4
    },{
      word:"片段2",
      start_time:60.7
    },{
      word:"片段3",
      start_time:100
    },]
    let other=[{
      name:'assets/video/03_linear-algebra-review.mp4',
      
    },{
      name:'assets/video/03_linear-algebra-review.mp4',
      
    },{
      name:'assets/video/03_linear-algebra-review.mp4',
      
    },{
      name:'assets/video/03_linear-algebra-review.mp4',
      
    },{
      name:'assets/video/03_linear-algebra-review.mp4',
      
    },{
      name:'assets/video/03_linear-algebra-review.mp4',
      
    },]
    other = []
    const result=[{
      keyword:"...时间管理非常的重要...",
      time:"12:00"
    },{
      keyword:"...下面就请罗老师给大家来讲一段时间管理...",
      time:"15:01"
    }]
    if(this.props.segresult.story_list!=undefined){
      times=this.props.segresult.story_list[0].words;
    }


    let story_list_elems = this.story_outlines.map((story, story_idx) => (
      <li key={`section-${story_idx}`} className={this.classes.listSection}>
        <ul className={this.classes.ul}>
          <ListSubheader color={'primary'}>
            <ListItem>
              <ListItemIcon>
                <VideocamIcon />
              </ListItemIcon>
              <ListItemText
                primary={`${story.start} - ${story.end}`}
                primaryTypographyProps={{variant: 'subtitle1'}}
              />
            </ListItem>
          </ListSubheader>
          {story.outline.map((item, item_idx) => (
            <Tooltip title={
              <React.Fragment>
                <Image
                  src={item.thumbnail}
                  imageStyle={{ width: 300, height: 'inherit' }}
                />
              </React.Fragment>
            }>
              <ListItem key={`item-${story_idx}-${item_idx}`} button onClick={
                this.click.bind(this, item.timestamp)
              }>
                <ListItemAvatar>
                  <Avatar variant="rounded" src={`${item.thumbnail}`} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${item.word}`}
                  primaryTypographyProps={{ variant: 'caption' }}
                />
              </ListItem>
            </Tooltip>
          ))}
        </ul>
      </li>
    ))
    
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <List aria-label="contacts" subheader={<li />}>
              {story_list_elems}
            </List>
          </GridItem>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
              </CardHeader>
              <CardBody>
                <Player
                  playsInline
                  ref={(player) => { this.player = player }}
                  //src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                  //src={require('assets/video/03_linear-algebra-review.mp4')}
                  src={this.props.videoUrl==""?require('assets/video/03_linear-algebra-review.mp4'):this.props.videoUrl}
                /> 
              </CardBody>
            </Card>
          </GridItem>
          {true?<GridItem xs={12} sm={12} md={12}>
            <CustomInput
                      labelText=""
                      id="search"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                          autoFocus:true,
                          placeholder:"输入",
                          onChange:(event)=>{
                              console.log(event.target.value)
                          }
                      }}
                    />
                    {getSearchResult(this.state.search_word, this.state.seg_result)}
          </GridItem>:null}
        </GridContainer>
      </div>
    );
  }
}
export default withStyles(styles)(WatchComponent);