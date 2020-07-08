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
import Recharts from 'echarts-for-react';
import echarts from 'echarts';
import { List, ListItem,ListItemText,Link } from '@material-ui/core';
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
    state={
        Links:[{
            name:"视频链接"
        },{
            name:"视频链接"
        },{
            name:"视频链接"
        }]
    }
    render() {
        let graph={  
            nodes:[
                {"id":"0","name":"id0","attributes":{"modularity_class":4}},
                {"id":"1","name":"id1","attributes":{"modularity_class":0}},
                {"id":"2","name":"id2","attributes":{"modularity_class":1}},
                {"id":"3","name":"id3","attributes":{"modularity_class":2}}
                        ],
                links:[
                {"id":"0","source":"0","target":"1"},
                {"id":"1","source":"0","target":"2"},
                {"id":"2","source":"0","target":"3"},
                ]
            }
        let categories=[
            {
                id:0,
                name: '手机',
                itemStyle:{normal:{color:'#c23531'}},
                symbolSize:[42,42]
            },
            {
                id:1,
                name: 'QQ',
                itemStyle:{normal:{color:'#61a0a8'}},
                symbolSize:[42,42]
            },
            {
                id:2,
                name:'微信',
                itemStyle:{normal:{color:'#749f83'}},
                symbolSize:[42,42]
            },
            {
                id:3,
                name:'微博',
                itemStyle:{normal:{color:'#d48265'}},
                symbolSize:[42,42]
            },
            {
                id:4,
                name: ' ',
                itemStyle:{normal:{color:'#2E3F4C'}},
                symbolSize:[64,64]
            }
        ];
        graph.nodes.forEach(function (node) {
            node.x=parseInt(Math.random()*1000);  //这里是最重要的如果数据中有返回节点x,y位置这里就不用设置，如果没有这里一定要设置node.x和node.y，不然无法定位节点 也实现不了拖拽了；
            node.y=parseInt(Math.random()*1000);
           if(node.attributes.modularity_class != 4){
               node.symbolSize=[42,42];
               node.sizeFlag=[42,42];
           }else{
               node.symbolSize=[64,64];
               node.sizeFlag=[64,64];
           }
           node.category = node.attributes.modularity_class;
           node.label={
               normal:{
                   show:true
               }
           }
       });
        const data = {
            // legend: [{    //图例组件
            //     data: categories.map(function (a) {
            //         return a.name;
            //     }),
            //     top:0,
            //     left:(winWidth-1300)/2,         //这里是图例组件定位使用的，自定义
            //     itemGap:26,
            //     textStyle:{
            //         padding:[0,12]
            //     },
            //     backgroundColor:'#f5f5f5'
            // }],
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series : [
                {
                    type: 'graph',
                    layout: 'force',           //因为节点的位置已经有了就不用在这里使用布局了
                    //circular:{rotateLabel:true},
                    animation: false,
                    data: graph.nodes,
                    links: graph.links,
                    categories: categories,   //节点分类的类目
                    roam: true,   //添加缩放和移动
                    draggable: true,   //注意这里设置为false，不然拖拽鼠标和节点有偏移
                    force: {
                        repulsion: 1000,
                        edgeLength: [150, 100],
                        layoutAnimation : false
                        // 因为力引导布局会在多次迭代后才会稳定, 这个参数决定是否显示布局的迭代动画(节点数量过多, 图在迭代的过程中会旋转),
                        // 在浏览器端节点数据较多(>100)的时候不建议关闭, 布局过程会造成浏览器假死。

                    },
                    label: {
                        normal: {
                            position: 'bottom',
                            rich:{
                                bg:{
                                    backgroundColor: '#f5f5f5'
                                }
                            }
                        }
                    }
                }
            ]
        }
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
              <GridContainer>
            
                <GridItem xs={10} sm={10} md={10} style={{marginLeft:"8.33%"}}>
                <Recharts
                    style={{height:500}}
                    option={data}
                    notMerge={true}
                    lazyUpdate={true}
                    


                    />
                </GridItem>
                
              </GridContainer>
            
            </CardBody>
            
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}> 
            <List  style={{marginTop:"20px",marginLeft:"10px"}} aria-label="contacts">
              
              {this.state.Links.map((item,index)=>{
                return <ListItem >
                  <Link href="#" >{item.name}</Link>
                  </ListItem>
              })}
              
            </List>
        </GridItem>
      </GridContainer>
			</div>
        );
    }

}

export default Learn;