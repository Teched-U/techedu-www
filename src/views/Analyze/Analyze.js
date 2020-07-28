import React from "react";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { connectSocket } from "api";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  Grid,
  Divider,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  CircularProgress,
} from "@material-ui/core";
import MaterialTable from "material-table";
import { format_time } from "api.js";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Legend,
  PieSeries,
} from "@devexpress/dx-react-chart-material-ui";
import { Stack, Animation } from "@devexpress/dx-react-chart";
import DataCard from "./DataCard.js";

const legendStyles = () => ({
  root: {
    display: "flex",
    margin: "auto",
    flexDirection: "row",
  },
});
const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const Root = withStyles(legendStyles, { name: "LegendRoot" })(legendRootBase);
const legendLabelStyles = () => ({
  label: {
    whiteSpace: "nowrap",
  },
});
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const Label = withStyles(legendLabelStyles, { name: "LegendLabel" })(
  legendLabelBase
);

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  sCard: {
    boxShadow:
      "0 2px 2px 0 rgba(155,155,155, 0.14), 0 3px 1px -2px rgba(155,155,155, 0.14), 0 1px 5px 0 rgba(155,155,155,0.12)",
    width: "70%",
    margin: "auto",
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  inline: {
    display: "inline",
  },
};

const useStyles = makeStyles(styles);

class AnalyzePage extends React.Component {
  constructor(props) {
    super(props);
    this.socket = null;
    this.state = {
      seg_data: [],
      done: true,
    };

    // Get video name
    let save_path = this.props.videoName;
    console.log(save_path);
    // Query the backend to get the updates
    this.socket = connectSocket((a, b) => this.socketUpdateCb(a, b), save_path);
    if (save_path == "") {
      this.socket.disconnect();
    }
  }

  // Callback to be called when data is received from the server
  socketUpdateCb(err, result) {
    if (result.length == 0) {
      // Empty result
      return;
    }

    if (!err) {
      console.log("OK: ");
      console.log(result);
      this.setState({
        seg_data: result,
      });
      let res = result[result.length - 1];
      this.props.onUpdate(result);
      if (res.done) {
        this.socket.disconnect();
        this.setState({
          done: !res.done,
        });
      }
    } else {
      console.log("ERROR: " + err);
    }
  }

  // Disconnect the socket when go to another page
  componentWillUnmount() {
    this.socket.disconnect();
  }

  componentDidUpdate(prevProps) {
    // if(prevProps.videoName!=this.props.videoName){
    //     this.socket.disconnect();
    //     this.socket = connectSocket((a,b)=>this.socketUpdateCb(a,b), this.props.videoName);
    //     if(this.props.disconnect){
    //         this.socket.disconnect();
    //     }
    // }
    if (prevProps.disconnect != this.props.disconnect) {
      this.socket.disconnect();
      this.socket = connectSocket(
        (a, b) => this.socketUpdateCb(a, b),
        this.props.videoName
      );
      if (this.props.disconnect) {
        this.socket.disconnect();
      }
    }
  }
  render() {
    const { classes } = this.props;
    let stories;
    if (this.props.segUpdate.length > 0) {
      stories = this.props.segUpdate.map((stateData) => (
        <Card>
          <CardHeader color="primary">
            <h3 style={{ marginTop: 0 }}>{stateData.state}</h3>
            <p className={classes.cardCategoryWhite}>
              {stateData.id == 1
                ? "通过Google Speech-To——text API 获取视频音频信息中..."
                : ""}
              {stateData.id == 2
                ? "根据视频的大纲信息整合字幕片段，大纲信息相同的字幕片段将会被整合到一起"
                : ""}
              {stateData.id == 3
                ? "通过BERT + TopicNet提取多摸态信息，生成完整的短视频"
                : ""}
              {stateData.id == 4
                ? "基于关键帧提取算法和大纲提取模块，对切割好的短视频建立大纲"
                : ""}
            </p>
          </CardHeader>
          <CardBody>
            {/*
            <h3>阶段: {stateData.state}</h3>
            <p>数据： {JSON.stringify(stateData.results, null, 2)}</p>
            */}

            {stateData.id == 1 ? (
              <GridContainer spacing={4} direction="column">
                <Grid item container direction="row" spacing={2}>
                  <GridItem xs={12} sm={12} md={6}>
                    <DataCard
                      primary={"片段数量"}
                      secondary={"字幕句子数量"}
                      data={stateData.results.num_segs}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <DataCard
                      primary={"平均长度"}
                      secondary={"单个句子长度(秒）"}
                      data={stateData.results.avg_seg_dur.toFixed(1)}
                    />
                  </GridItem>
                </Grid>
                <Grid item container direction="row" spacing={2}>
                  <GridItem xs={12} sm={12} md={6}>
                    <DataCard
                      primary={"最长长度"}
                      secondary={"最长字幕单句长度(秒）"}
                      data={stateData.results.max_duration.toFixed(1)}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <DataCard
                      primary={"最短长度"}
                      secondary={"最短字幕单句长度(秒）"}
                      data={stateData.results.min_duration.toFixed(1)}
                    />
                  </GridItem>
                </Grid>
                <Grid item container>
                  <GridItem xs={12} sm={12} md={12}>
                    <MaterialTable
                      columns={[
                        {
                          title: "时间",
                          field: "timestamp",
                          headerStyle: {
                            backgroundColor: "#9fa8da",
                            fontSize: 20,
                            fontWeight: "bold",
                          },
                        },
                        {
                          title: "字幕",
                          field: "transcript",
                          headerStyle: {
                            backgroundColor: "#9fa8da",
                            fontSize: 20,
                            fontWeight: "bold",
                          },
                        },
                      ]}
                      data={stateData.results.transcripts.map((row) => ({
                        timestamp:
                          format_time(row.timestamp) +
                          " - " +
                          format_time(row.timestamp + row.duration),
                        transcript: row.transcript,
                      }))}
                      title={"字幕信息"}
                    ></MaterialTable>
                  </GridItem>
                </Grid>
              </GridContainer>
            ) : null}
            {stateData.id == 2 ? (
              <div>
                <Grid container spacing={4} direction="column">
                  <Grid item container direction="row">
                    <GridItem xs={12} sm={12} md={6}>
                      <DataCard
                        primary={"片段数量变化"}
                        secondary={"整合后的字幕片段数量"}
                        data={
                          stateData.results.old_num_segs +
                          " → " +
                          stateData.results.new_num_segs
                        }
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <DataCard
                        primary={"片段长度"}
                        secondary={"整合后的字幕片段长度(秒)"}
                        data={
                          stateData.results.old_avg_seg_dur.toFixed(1) +
                          " → " +
                          stateData.results.new_avg_seg_dur.toFixed(1)
                        }
                      />
                    </GridItem>
                  </Grid>
                  <Grid item container>
                    <GridItem xs={12} sm={12} md={6}>
                      <Chart data={stateData.results.old_durations}>
                        <PieSeries valueField="value" argumentField="index" />
                        <Title text="整合前" />
                      </Chart>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <Chart data={stateData.results.new_durations}>
                        <PieSeries valueField="value" argumentField="index" />
                        <Title text="整合后" />
                      </Chart>
                    </GridItem>
                  </Grid>
                </Grid>
              </div>
            ) : null}
            {stateData.id == 3 ? (
              <div>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <DataCard
                      primary={"短视频数量"}
                      secondary={"切割好的具有完整语义且独立的短视频"}
                      data={stateData.results.num_story}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <DataCard
                      primary={"平均长度"}
                      secondary={"短视频平均时长(秒）"}
                      data={stateData.results.avg_story_len.toFixed(1)}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    {stateData.results.story_list != undefined
                      ? stateData.results.story_list.map((row, index) => (
                          <Card
                            className={classes.root}
                            style={{
                              display: "inline-block",
                              marginRight: "30px",
                            }}
                          >
                            <CardActionArea>
                              <CardMedia
                                className={classes.media}
                                image={row.thumbnail}
                                title=""
                              />
                              <CardContent>
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="h2"
                                >
                                  短视频{index + 1} :{" "}
                                  {format_time(row.timestamp)} -{" "}
                                  {format_time(row.timestamp + row.duration)}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  component="p"
                                >
                                  {row.summary}
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        ))
                      : null}
                  </GridItem>
                </GridContainer>
              </div>
            ) : null}

            {stateData.id == 4 ? (
              <div>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <DataCard
                      primary={"短视频数量"}
                      secondary={"切割好的完整短视频数量"}
                      data={stateData.results.num_story}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <DataCard
                      primary={"短视频均长"}
                      secondary={"切割好的完整短视频长度（秒）"}
                      data={stateData.results.avg_story_len.toFixed(1)}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <List>
                      {stateData.results.story_list != undefined
                        ? stateData.results.story_list.map((row, index) => (
                            <div>
                              <Grid container alignContent="space-around">
                                <Grid item xs={12} sm={12} md={6}>
                                  <Card className={classes.root}>
                                    <CardActionArea>
                                      <CardMedia
                                        className={classes.media}
                                        image={row.thumbnail}
                                        title=""
                                      />
                                      <CardContent>
                                        <Typography
                                          gutterBottom
                                          variant="h5"
                                          component="h2"
                                        >
                                          短视频{index + 1}
                                        </Typography>
                                        <Typography
                                          variant="body2"
                                          color="textSecondary"
                                          component="p"
                                        >
                                          {format_time(row.timestamp) +
                                            "-" +
                                            format_time(
                                              row.timestamp + row.duration
                                            )}
                                        </Typography>
                                      </CardContent>
                                    </CardActionArea>
                                  </Card>
                                </Grid>
                                <Grid item md={6}>
                                  <Typography variant="h5">视频大纲</Typography>
                                  <List>
                                    {row.outline.map((out) => (
                                      <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                          <Avatar
                                            variant="square"
                                            alt="Remy Sharp"
                                            src={out.thumbnail}
                                          />
                                        </ListItemAvatar>
                                        <ListItemText
                                          primary={out.result.Title.text}
                                          secondary={
                                            <React.Fragment>
                                              <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary"
                                              ></Typography>
                                            </React.Fragment>
                                          }
                                        />
                                      </ListItem>
                                    ))}
                                  </List>
                                </Grid>
                              </Grid>
                            </div>
                          ))
                        : null}
                    </List>
                  </GridItem>
                </GridContainer>
              </div>
            ) : null}
          </CardBody>
        </Card>
      ));
    }
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          {this.state.done && (
            <CircularProgress style={{ float: "right" }} color="secondary" />
          )}

          {stories}
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(AnalyzePage);
