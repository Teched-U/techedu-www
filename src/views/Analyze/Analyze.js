import React from "react";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import {connectSocket} from 'api';

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
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
      lineHeight: "1"
    }
  }
};


const useStyles = makeStyles(styles);

class AnalyzePage extends React.Component {
    constructor(props) {
        super(props);
        this.socket = null;
        this.state = {
            seg_data: []
        }

        // Get video name
        let save_path = this.props.videoName
        console.log(save_path);
        // Query the backend to get the updates
        this.socket = connectSocket((a,b)=>this.socketUpdateCb(a,b), save_path);
        if(save_path==""){
            this.socket.disconnect()
        }
    }

    // Callback to be called when data is received from the server
    socketUpdateCb(err, result) {
        
        if (!err) {
            console.log("OK: ")
            console.log(result)
            this.setState({
                seg_data: result
            })
            this.props.onUpdate(result)
            if(result.done){
                this.socket.disconnect()
            }
        } else {
            console.log("ERROR: " + err)
        }
    
    }

    // Disconnect the socket when go to another page
    componentWillUnmount() {
        this.socket.disconnect();
    }

    componentDidUpdate(prevProps){
        if(prevProps.videoName!=this.props.videoName){
            this.socket.disconnect();
            this.socket = connectSocket((a,b)=>this.socketUpdateCb(a,b), this.props.videoName);
            if(this.props.disconnect){
                this.socket.disconnect();
            }
        }
    }
    render() {
        const {classes} = this.props
        let stories;
        if (this.props.segUpdate.length > 0) {
            stories = this.props.segUpdate.map((stateData) =>
                <li key={stateData.id}>
                    <h3>
                        阶段: {stateData.state}
                    </h3>
                    <p>
                        数据： {JSON.stringify(stateData.results,null, 2)}
                    </p>
                </li>
            )
        }
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <p className={classes.cardCategoryWhite}>
                                视频链接: {this.props.videoUrl}
                            </p>
                        </CardHeader>
                        <CardBody>
                            <div>
                                <ul>
                                    {
                                        stories
                                    }
                                </ul>
                            </div>

                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
}

export default withStyles(styles)(AnalyzePage)
