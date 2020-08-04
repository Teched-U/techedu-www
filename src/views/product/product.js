import React from 'react';
import { Divider } from '@material-ui/core';
import {Card,CardActionArea,CardContent,CardMedia,Typography} from '@material-ui/core';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from "components/CustomButtons/Button.js";
import { Player } from 'video-react';
import { useHistory } from "react-router-dom";
import {techedu_logo} from 'assets/img/techedu.png';


const useStyles = makeStyles({
    root: {
      maxWidth: "90%",
      marginTop:'20px'
    },
    icon:{
        width:"150px",
        height:"150px",
        //marginTop:'15%'
    }
  });

export default function Product(props) {
    let history = useHistory();
    const classes = useStyles();
  
    const click=e=>{
        history.push("/admin/demo")
    }
  return (
      <div>
          <GridContainer>
                    <GridItem xs={12} sm={12} md={8}>
                    <Typography color="primary" gutterBottom variant="h4" style={{color:'#37474F', bold:'800'}}>
                            产品介绍
                        </Typography>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                    {/* <CloudUploadIcon className={classes.icon}></CloudUploadIcon> */}
                    <div style={{float:"right",marginRight:"10%"}}>
                        <Button style={{width:"150px",fontSize:"20px"}} variant="outlined" color="primary" onClick={click}>开始分享</Button>
                    </div>
                    </GridItem>
                    {/*  */}
                    <GridItem xs={12} sm={12} md={4}>

                        
                        <Card className={classes.root}>
                        
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            上传视频
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            网站支持的文件格式包括mp4，mov
                        </Typography>
                        </CardContent>
                    </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                    <Card className={classes.root}>
                        
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            数据结果
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            视频分析结果会以词云及图表的方式展示
                        </Typography>
                        </CardContent>
                    </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                    <Card className={classes.root}>
                        
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                        用户观看
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            观看更少的视频，学习更多的知识
                        </Typography>
                        </CardContent>
                    </Card>
                    </GridItem>
                
                
            </GridContainer>
            <GridContainer >
                <GridItem xs={12} sm={12} md={10} style={{margin: '20px'}}>
                  <Player
                      playsInline
                      poster={'http://35.244.161.66/static/techedu.png'}
                      src={'http://35.244.161.66/static/intro_video.mp4'}
                  /> 
                </GridItem>
            </GridContainer>
        
      </div>
    
  );
}