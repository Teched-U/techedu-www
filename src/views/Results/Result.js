import React, {useState, useEffect} from 'react';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from "components/CustomButtons/Button.js";
import { useHistory } from "react-router-dom";
import { Grid, Typography} from "@material-ui/core";
import MaterialTable from "material-table";
import superagent from 'superagent';
import {ENDPOINT} from 'api';

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
        history.push("/admin/demo", {video_name: row.video_name, video_url: row.video_url})
    }

    const [results, setResults] = useState([])
    useEffect(()=>{
        superagent
            .get(ENDPOINT + '/api/results')
            .then(res => {
                setResults(res.body.result_list)
            })
            .catch(err => {
                console.log("Error" + err)
            })
    }, [])

    return (
        <div>
            <Card>
                <CardHeader>
                    <Typography variant="h4" color="primary">
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
            </Card>
      </div>
    
  );
}