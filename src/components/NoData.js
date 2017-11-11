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

export default class NoData extends Component {
    render() {
        return (
            <View style={[{alignItems:'center',justifyContent:'center',flex:1},this.props.style]}>
                <Image style={{maxWidth:WIDTH-200,resizeMode:'contain'}} source={require('../res/images/noData.png')}/>
                <Text style={[SZStyle.p16,{color:'#bebfc0',marginTop:10}]}>
                    {'抱歉,暂无满足条件的数据'}
                </Text>
            </View>
        )
    }

}