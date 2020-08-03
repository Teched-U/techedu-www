import React, {useState, useEffect} from 'react';
// import Card from "components/Card/Card.js";
// import CardHeader from "components/Card/CardHeader.js";
// import CardBody from "components/Card/CardBody.js";
// import GridContainer from "components/Grid/GridContainer.js";
//import GridItem from "components/Grid/GridItem.js";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from "components/CustomButtons/Button.js";
import { useHistory } from "react-router-dom";
import { Grid, Typography} from "@material-ui/core";
import MaterialTable from "material-table";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import superagent from 'superagent';
import {ENDPOINT} from 'api';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
//import Button from '@material-ui/core/Button';
//import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles({
    root: {
      maxWidth: "90%",
      marginTop:'20px'
    },
    icon:{
        width:"150px",
        height:"150px",
        marginTop:'15%'
    }
  });

export default function Result(props) {
    let history = useHistory();
    const classes = useStyles();
  
    const click=(row)=>{
        history.push("/admin/result-detail", {video_name: row.video_name, video_url: row.video_url})
    }

    const [results, setResults] = useState([])
    useEffect(()=>{
        superagent
            .get(ENDPOINT + '/api/results')
            .then(res => {
                console.log(res.body.result_list)
                setResults(res.body.result_list)
            })
            .catch(err => {
                console.log("Error" + err)
            })
    }, [])

    return (
        <div>
            {/* <Card>
                <CardHeader color="primary">
                    <Typography variant="h4" color="white">
                        切割视频展示
                    </Typography>
                </CardHeader>
                <CardBody>
                    <GridContainer>
                        <Grid container justify="space-around">
                        <MaterialTable
                            localization={{
                                header: {
                                    actions: '详情'
                                },
                            }}
                            columns={[
                                { title: "视频名", field: "video_name" },
                                { title: "视频时长", field: "duration" },
                                { title: "视频链接", field: "video_url", type: "link" }
                            ]}
                            data={
                                results.map((row) => (
                                    {
                                        "video_name": row.video_name,
                                        "duration": (row.duration / 60).toFixed(1) + '分钟',
                                        "video_url": row.video_url,
                                    }
                                ))
                            }
                            title={""}
                            actions={
                                [{
                                    icon: 'info',
                                    tooltip: '查看结果',
                                    onClick: (event, rowData) => click(rowData) 
                                }]
                            }
                        >
                        </MaterialTable>
                        </Grid>
                    </GridContainer>
                </CardBody>
            </Card> */}
            <GridContainer>
                {results.map((row)=>(
                    <GridItem xs={12} sm={6} md={4} style={{marginTop:"10px"}}>
                        <Card onClick={click.bind(this, row)}>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="140"
                            image={row.thumbnail!=undefined?row.thumbnail:require("assets/img/xiaoxin.jpg")}
                            title={row.video_name}
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h6" component="h2">
                            {row.video_name.split(".")[0].length>20?row.video_name.split(".")[0].substr(0,20)+"...":row.video_name.split(".")[0]}  <span style={{fontWeight:400,fontSize:"14px"}}>{(row.duration / 60).toFixed(1) + '分钟'}</span>
                            </Typography>
                            <Divider />
                            <Typography variant="body2" color="textSecondary" component="p">
                                {row.video_url.length>20?row.video_url.substr(0,20)+"...":row.video_url}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        </Card>
                    </GridItem>
                ))}
                
            </GridContainer>
      </div>
    
  );
}