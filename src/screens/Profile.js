/**
 * Created by whb on 2017/11/11.
 * https://github.com/WaterEye0o
 */

import React from 'react';
import {connect} from "react-redux";
import SampleAction from './../actions/SampleAction';
import TopLevelScreenComponent from './../components/TopLevelScreenComponent'
import {
    ScrollView,
    StyleSheet, Text, TouchableOpacity,
    View,
} from 'react-native';
import Container from "../components/Basic/Container";
import Page from "../components/Basic/Page";
import {Body1, FlatButton, Paper} from "carbon-ui";

const listConfig = [
    {name: 'gallery', describe: '个人作品',url:'/gallery'},
    {name: 'Education experience', describe: '教育经历',url:'/experience/edu'},
    {name: 'Work experience', describe: '工作经历',url:'/experience/work'},
]


export default class Profile extends Page {
    state = {name: '吴华彬'}

    render() {
        return (
            <Container>

                <ScrollView>
                    <View style={{
                        height: 150,
                        backgroundColor: 'black',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: -10
                    }}/>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{color: '#fff', marginTop: 60}}>
                            吴华彬
                        </Text>
                        <View style={{
                            height: 150,
                            maxWidth: '95%',
                            width: 500,
                            borderRadius: 5,
                            marginTop: 5,
                            backgroundColor: '#fff'
                        }}>

                        </View>

                        {
                            listConfig.map((value) => {
                                return (
                                    <TouchableOpacity onPress={()=>this.push(value.url)}>
                                        <Paper elevation={10} style={{
                                            padding: 10,
                                            height: 80,
                                            borderRadius: 4,
                                            marginTop: 20,
                                            width: 500,
                                            maxWidth: this.WIDTH*0.95
                                        }}>
                                            <Body1>{value.name}</Body1>
                                        </Paper>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </Container>
        )
    }

}

var styles = StyleSheet.create({})