/**
 * Created by whb on 2017/10/23.
 * https://github.com/WaterEye0o
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Dimensions,
    Text
} from 'react-native';
import szStyles from '../res/common.style'

export default class StatusItem extends Component {
    static defaultProps = {
        status: ''
    };
    static propTypes = {
        status: PropTypes.oneOf(['在营', '吊销', '注销', '在营（开业）'])
    };

    getConfig(status) {
        if (status.indexOf('在营') > -1) {
            return {
                bgStyle: {backgroundColor: '#ffbf35'},
                text: '在营'
            };
        } else if (status.indexOf('吊销') > -1) {
            return {
                bgStyle: {backgroundColor: '#ff5b62'},
                text: '吊销'
            };
        } else if (status.indexOf('注销') > -1) {
            return {
                bgStyle: {backgroundColor: '#ff5b62'},
                text: '注销'
            };
        } else {
            return {
                bgStyle: {backgroundColor: '#ffbf35'},
                text: '在营'
            };
        }
    }

    render() {
        let config = this.getConfig(this.props.status);

        return (
            <View style={[{
                paddingLeft: 10,
                paddingRight: 10,
                height: 20,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ffbf35',
                borderRadius: 3
            },config.bgStyle]}>
                <Text style={[szStyles.p12,{color: '#fff'}]}>
                    {config.text}
                </Text>
            </View>
        )
    }
}

var styles = StyleSheet.create({});