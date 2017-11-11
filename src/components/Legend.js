/**
 * Created by whb on 2017/10/18.
 * https://github.com/WaterEye0o
 */

import React, {Component} from 'react';
import PropTypes from "prop-types";

import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native';


export default class Legend extends Component {
    static propTypes = {
        size: PropTypes.number,
        color: PropTypes.string
    };
    static defaultProps = {
        size: 10,
        color: '#000000'
    };

    render() {
        return (
            <View style={[{backgroundColor:this.props.color,width:this.props.size,height:this.props.size,borderRadius:2},this.props.style]}/>
        )
    }

}