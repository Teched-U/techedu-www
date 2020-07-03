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
class Learn extends React.Component{

    render() {
        
        return (
			<div style={{marginTop:"20px",width:"80%",marginLeft:"10%"}}>
				<GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            
            <CardBody>
              <GridContainer>
            
                <GridItem xs={10} sm={10} md={10} style={{marginLeft:"8.33%"}}>
                  <CustomInput
                    labelText=""
                    id="username"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                        autoFocus:true,
                        placeholder:"深度学习",
                        onChange:(event)=>{
                            console.log(event.target.value)
                        }
                    }}
                  />
                </GridItem>
                
              </GridContainer>
              
            
            </CardBody>
            
          </Card>
        </GridItem>
        
      </GridContainer>
			</div>
        );
    }

}

export default Learn;