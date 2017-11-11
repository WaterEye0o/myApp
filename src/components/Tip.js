/**
 * Created by whb on 2017/9/16.
 * https://github.com/WaterEye0o
 */

import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Platform,
    LayoutAnimation,
    Text,
    Animated,
    Easing
} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

import PropTypes from 'prop-types';

export default class Tip extends Component {
    static propTypes = {
        type: PropTypes.oneOf(['success', 'warning', 'fail', 'no-data', 'no-wifi', 'data']),
        show: PropTypes.bool
    };
    static defaultProps = {
        type: 'success',
        show: false
    };
    state = {
        show: false,
        top: new Animated.Value(Platform.OS == 'ios' ? -64 : -44),
        msg: ''
    };

    getBgColorByType(type) {
        if (!this.state.show) return 'transparent';

        switch (type) {
            case 'success':
                return '#00c06e';
            case 'data':
                return 'transparent';
            case 'no-wifi':
                return '#ff5134';
            default:
                return '#ff5134';
        }
    }

    close() {
        if (!this.state.show) return;
        Animated.timing(this.state.top, {
            toValue: Platform.OS == 'ios' ? -64 : -44, // 目标值
            duration: 300, // 动画时间
            easing: Easing.linear
        }).start(() => {
            this.setState({show: false, msg: ''});
            if (this.timer) {
                clearTimeout(this.timer);
            }
        });
    }

    show(msg, delay = 3000) {
        if (this.state.show) return;
        this.setState({show: true, msg});
        Animated.timing(this.state.top, {
            toValue: 0, // 目标值
            duration: 300, // 动画时间
            easing: Easing.linear
        }).start(() => {
            this.timer = setTimeout(() => {
                this.close();
            }, delay)
        });
    }

    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    render() {
        return (
            <Animated.View
                onStartShouldSetResponder={()=>this.close()}
                style={[styles.main,{top:this.state.top,backgroundColor:this.getBgColorByType(this.props.type)}]}>
                <Text style={[{color:'#fff',textAlign:'center'}]}>
                    {this.state.msg}
                </Text>
            </Animated.View>
        )
    }
}

Tip.PropTypes = {};

const styles = StyleSheet.create({
    main: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        height: Platform.OS == 'ios' ? 64 : 44,
        paddingTop: Platform.OS == 'ios' ? 20 : 0,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        zIndex: 1000,
        paddingLeft: 10,
        paddingRight: 10
    }
});