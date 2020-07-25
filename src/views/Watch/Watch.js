import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
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

import avatar from "assets/img/faces/marc.jpg";
import xiaoxin from "assets/img/xiaoxin.jpg";
import video from "assets/video/03_linear-algebra-review.mp4"

// Import for Video
import "video-react/dist/video-react.css"; // import css
import { Player } from 'video-react';
import { List, ListItem,ListItemText } from '@material-ui/core';


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
    
    let results = props.segresult.results
    this.times = []
    console.log("results")
    console.log(results)
    for(let story of results) {
      let outline = story.outline
      console.log(story)
      for(let slide of outline) {
        console.log(slide)
        let title = slide.result.Title.text
        let time = slide.timestamp

        this.times.push({
          word: title,
          start_time: time
        })
      }
    }
    console.log("Times:")
    console.log(this.times)
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

  click(event){
    
    //let times=event.start_time.split(":");
    let times=event.start_time
    //times.reverse();
    let time=0;
    // times.forEach((item,index)=>{
    //   time=time+(parseInt(item)*Math.pow(60,index))
    // })
    time=times;
    
    this.player.play()
    this.player.seek(time)
    this.setState({
      player:this.player
    })
    

    console.log(event)
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
    
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={2}>
            <List   aria-label="contacts">
              <ListItem style={{textAlign:"center",border:"2px solid #fff"}}>
                
                <ListItemText primary="大纲" />
              </ListItem>
              {this.times.map((item,index)=>{
                return <ListItem button onClick={
                  this.click.bind(this,item)
                }>
                  <ListItemText primary={item.word+" : "+item.start_time+"s"} />
                  </ListItem>
              })}
              
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
              <CardFooter>
                <Button color="primary">Like the Video!</Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={2}>
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
                    <List   aria-label="contacts">
                      {result.map((item,index)=>{
                        return <ListItem>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={8}>
                              {item.keyword}
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                              {item.time}
                            </GridItem>
                            </GridContainer>
                          </ListItem>
                      })}
              
                    </List>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <List style={{display:"flex"}} aria-label="contacts">
              {other.map(item=>{
                return <ListItem>
                  <Player
                  playsInline
                  poster={xiaoxin}
                  src={require('assets/video/03_linear-algebra-review.mp4')}
                />
                </ListItem>
              })}
            </List>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
export default WatchComponent;