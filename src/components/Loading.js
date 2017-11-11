/**
 * Created by whb on 2017/10/31.
 * https://github.com/WaterEye0o
 */


import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    Text
} from 'react-native';
import PropTypes from "prop-types";
import SZStyle from "../res/common.style";

const WIDTH = Dimensions.get('window').width;

export default class Loading extends Component {
    render() {
        return (
            <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
                <Image style={{maxWidth:60,resizeMode:'contain'}} source={require('../res/images/listLoading.gif')}/>
                <Text style={[SZStyle.p16,{color:'#bebfc0',marginTop:10}]}>
                    {'数据加载中'}
                </Text>
            </View>
        )
    }

}