/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Snackbar from "components/Snackbar/Snackbar.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

//For teched U
import Tree from 'react-tree-graph'
// import 'react-tree-graph/dist/style.css'
import './Explore.css'
import tree_data from './data.js';
//https://www.npmjs.com/package/react-tree-graph

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

export default function Notifications() {
  const classes = useStyles();
  const [tl, setTL] = React.useState(false);
  const [tc, setTC] = React.useState(false);
  const [tr, setTR] = React.useState(false);
  const [bl, setBL] = React.useState(false);
  const [bc, setBC] = React.useState(false);
  const [br, setBR] = React.useState(false);
  React.useEffect(() => {
    // Specify how to clean up after this effect:
    return function cleanup() {
      // to stop the warning of calling setState of unmounted component
      var id = window.setTimeout(null, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    };
  });
  const showNotification = place => {
    switch (place) {
      case "tl":
        if (!tl) {
          setTL(true);
          setTimeout(function() {
            setTL(false);
          }, 6000);
        }
        break;
      case "tc":
        if (!tc) {
          setTC(true);
          setTimeout(function() {
            setTC(false);
          }, 6000);
        }
        break;
      case "tr":
        if (!tr) {
          setTR(true);
          setTimeout(function() {
            setTR(false);
          }, 6000);
        }
        break;
      case "bl":
        if (!bl) {
          setBL(true);
          setTimeout(function() {
            setBL(false);
          }, 6000);
        }
        break;
      case "bc":
        if (!bc) {
          setBC(true);
          setTimeout(function() {
            setBC(false);
          }, 6000);
        }
        break;
      case "br":
        if (!br) {
          setBR(true);
          setTimeout(function() {
            setBR(false);
          }, 6000);
        }
        break;
      default:
        break;
    }
  };
  return (
      <Card>
        <CardBody>
          <GridContainer>
            <GridItem xs={12} sm={12} md={9}>
              <CardHeader color="primary">
                <h5>Notifications Style</h5>
              </CardHeader>
              <br/>
              <CardBody>
                <Button type="button" color="primary">Machine Learning</Button>
                <Button type="button" color="info">Deep Learning</Button>
                <Button type="button" color="success">CV</Button>
                <Button type="button" color="danger">NLP</Button>
                <Button type="button" color="warning">C++</Button>
                <Button type="button" color="rose">Python</Button>
              </CardBody>

              <CardBody>

                {/*<Tree*/}
                {/*    data={tree_data}*/}
                {/*    nodeRadius={15}*/}
                {/*    margins={{ top: 20, bottom: 10, left: 20, right: 200 }}*/}
                {/*    height={700}*/}
                {/*    width={1000}*/}
                {/*    animated/>*/}

                 <div className="custom-container">
                   <Tree
                        data={tree_data}
                        height={400}
                        width={400}
                        // nodeShape="rect"
                        nodeProps={{ rx: 20 }}
                        nodeRadius={30}
                        animated

                        svgProps={{
                          // transform: 'rotate(90)',
                          className: 'custom'
                        }}/>
                 </div>

              </CardBody>


            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <CardHeader color="success">
                <h5>Playlist</h5>
              </CardHeader>

              <br />
              <SnackbarContent
                  message={
                    'Machine learning'
                  }
                  close
                  color="info"
              />
              <SnackbarContent
                  message={
                    'Deep learing'
                  }
                  close
                  color="success"
              />
              <SnackbarContent
                  message={
                    'Computer Vision'
                  }
                  close
                  color="warning"
              />
              <SnackbarContent
                  message={
                    'NLP'
                  }
                  close
                  color="danger"
              />
              <SnackbarContent
                  message={
                    'CNN'
                  }
                  close
                  color="primary"
              />

              <Button color="rose">Start Learning</Button>
            </GridItem>
          </GridContainer>
          <br />
          <br />

        </CardBody>
      </Card>
  );
}
