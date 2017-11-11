/**
 * Created by whb on 2017/10/20.
 * https://github.com/WaterEye0o
 */
import React, {Component} from "react";
import {Text, View, StyleSheet, Image} from "react-native";

export * from './Cell';

export default class List extends Component {
    static propTypes = {};
    static defaultProps = {};

    render() {
        return (
            <View {...this.props} >
                {this.props.children}
            </View>
        )
    }
}

class Bottom extends Component {
    static propTypes = {};
    static defaultProps = {};

    render() {
        return (
            <View {...this.props}
                  style={[{
                      height: 40,
                      width: '100%',
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      paddingBottom: 10
                  },this.props.style]}>
                <View style={{flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: '#ddd'}}/>
                <Text style={{color: '#a7a7a7', fontSize: 9}}>
                    我是有底线的
                </Text>
                <View style={{flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: '#ddd'}}/>

            </View>
        )
    }
}

class AppendBottom extends Component {
    static propTypes = {};
    static defaultProps = {};

    render() {
        return (
            <View {...this.props}
                  style={{
                      height: 40,
                      width: '100%',
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      paddingBottom: 10
                  }}>
                <Text style={{color: '#bcbdbe', fontSize: 10,}}>
                    正在加载更多...
                </Text>
            </View>
        )
    }
}

class Loading extends Component {
    static propTypes = {};
    static defaultProps = {};

    render() {
        return (
            <View {...this.props}
                  style={{
                      flex:1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingBottom: 10,
                      backgroundColor:'#f1f1f1'
                  }}>
                <Image style={{width:35,height:35}} source={require('../../res/images/listLoading.gif')}/>
            </View>
        )
    }
}

List.Bottom = Bottom;
List.AppendBottom = AppendBottom;
List.Loading = Loading;