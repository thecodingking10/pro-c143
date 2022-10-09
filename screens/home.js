import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import { Header, AirbnbRating, Icon } from "react-native-elements"
import axios from "axios"
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Linking } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize"

export default class HomeScreen extends React.Component{
    constructor(){
        super();
        this.state={
            article_details: {},
        }
    }

    componentDidMount(){
        this.getArticle();
    }

    timeConvert(num){
        var hrs = Math.floor(num/60)
        var mins = num%60
        return hrs, mins
    }

    getArticle =()=>{
        const url = "http://localhost:5000/get-articles";
        axios.get(url).then(response=>{
            let details = response.data.data
            details["duration"] = this.timeConvert(details.duration)
            this.setState({article_details: details})
        })
    }

    likeArticles =()=>{
        const url = "http://localhost:5000/liked-articles";
        axios.post(url).then(response=>{
            this.getArticle();
        })
    }

    dislikeArticles =()=>{
        const url = "http://localhost:5000/disliked-articles";
        axios.post(url).then(response=>{
            this.getArticle();
        })
    }

    render(){
        const {
            url, 
            title,
            text,
        } = this.state.article_details

            return(
                <View style={{flex:1}}>
                    <SafeAreaProvider>
                        <Header 
                            centerComponent={<Text style={styles.header}>Home</Text>}
                            rightComponent={
                                <View style={{flex:1,justifyContent:"center"}}>
                                    <Icon iconStyle={styles.header} name="search"/>
                                </View>
                            }
                            backgroundColor={"#82a5b8"}
                        />
                        <View style={{alignItems:"center"}}>
                            <View style={styles.titleContainer}>
                                <Text style={{fontSize: RFValue(12),textAlign:"center"}}>{title}</Text>
                            </View>

                            <View style={{flexDirection:"row", marginTop:-10}}>
                                <TouchableOpacity onPress={()=>{this.likeArticles()}} style={{marginHorizontal:25}}>
                                    <Image
                                        style={styles.button}
                                        source={require("../assets/images/likebutton.png")}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>{this.dislikeArticles()}} style={{marginHorizontal:25}}>
                                    <Image
                                        style={styles.button}
                                        source={require("../assets/images/dislikebutton.png")}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>Linking.openURL(url)} style={{marginHorizontal:25}}>
                                    <Image
                                        style={styles.button}
                                        source={require("../assets/images/linkbutton.png")}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </SafeAreaProvider>
                </View>
            );
        //}//if condintwyuotir 
        return null
    }
}

const styles = StyleSheet.create({
    button:{
        width: RFValue(50),
        height: RFValue(50),
        alignSelf: 'center'
    },
    header:{
        fontSize: RFValue(25),
        color: "#23404f",
    },
    titleContainer:{
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        borderColor:"#FFFFFF",
        backgroundColor:"#FFFFFF",
        margin: 20
    }
})
