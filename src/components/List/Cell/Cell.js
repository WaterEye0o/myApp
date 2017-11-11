/**
 * Created by whb on 2017/10/18.
 * https://github.com/WaterEye0o
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    TouchableOpacity,
    Animated,
    Image
} from 'react-native';
import Icon from "../../Icon";

export class LabelCell extends Component {
    static defaultProps = {
        title: '',
        placeholder: '(选填)',
        leftIcon: '',
        height: 50,
        rightIconColor: '#97c3ed',
        leftIconColor: '#c4c5c6'
    };

    static propTypes = {
        title: PropTypes.string.isRequired,
        placeholder: PropTypes.string,
        leftIcon: PropTypes.string,
        height: PropTypes.number,
        rightIconColor: PropTypes.string,
        leftIconColor: PropTypes.string,
    };

    render() {
        return (
            <TouchableOpacity {...this.props}>
                <View style={{flexDirection: 'row',width:'100%',alignItems:'center',justifyContent:'center'}}>
                    {!!this.props.leftIcon &&
                        <Icon color={this.props.leftIconColor} style={{marginRight:5,marginLeft:10}} size={20}
                              icon={this.props.leftIcon}/>
                    }
                    <View style={[
                        {
                            height: this.props.height,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottomWidth: 1,
                            borderColor: '#ebeced',
                            flex:1
                        }, this.props.style]}
                    >
                        <Text style={{fontSize:14,color:'#666'}}>{this.props.title}</Text>
                        <View style={{alignItems: 'center',flexDirection: 'row',marginRight: 10}}>
                            <Text style={[{marginRight: 20,color:'#bfbfbf',fontSize:12},{color: this.props.placeholderTextColor}]}>
                                {this.props.placeholder}
                            </Text>
                            <Icon size={20} icon={'fa-angle-right'} color={this.props.rightIconColor}/>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

export class GridCell extends Component {
    static defaultProps = {
        title: '',
        icon: '',
        color: '#9ac3ee',
        size: 0
    };
    static propTypes = {
        title: PropTypes.string.isRequired,
        icon: PropTypes.string,
        color: PropTypes.string,
        size: PropTypes.number.isRequired
    };
    state={
        loadingAni: new Animated.Value(0)
    };
    reset(){
        Animated.timing(
            this.state.loadingAni,
            {
                toValue:0,
                duration: 1
            }
        ).start()
    }

    async startUploadAni(){
        Animated.timing(
            this.state.loadingAni,
            {
                toValue: 0.7*this.props.size,
                duration: 4000
            }
        ).start()
    }

    async finishUploadAni(onEnd){
        Animated.timing(
            this.state.loadingAni,
            {
                toValue: this.props.size,
                duration: 200
            }
        ).start(onEnd)
    }

    render() {
        return (
            <TouchableOpacity {...this.props} style={[{
                borderRadius: 4,
                borderWidth: 1,
                borderColor: '#c4ddf5',
                width: this.props.size,
                height: this.props.size,
                justifyContent: 'center',
                alignItems: 'center',
                overflow:'hidden'
            },this.props.style]} >

                <Animated.View style={{position:'absolute',backgroundColor:'#cde1f6',left:0,right:0,bottom:0,height:this.state.loadingAni}}/>
                {!!this.props.icon &&
                    <Image source={require('../../../res/images/camera.png')} style={{backgroundColor:'transparent'}}/>
                }
                <Text style={{color: this.props.color, marginTop: 5,backgroundColor:'transparent'}}>
                    {this.props.title}
                </Text>
            </TouchableOpacity>
        );
    }
}

export class TextItem extends Component {
    static defaultProps = {
        title: '',
    };

    static propTypes = {
        title: PropTypes.string,
    };

    render() {
        return (
            <TouchableOpacity style={{flexDirection:'row'}} {...this.props}>
                <View style={[{flexDirection:'row',backgroundColor:'#f6f7fb',borderRadius:4,padding:5,alignItems:'center',justifyContent:'center',marginRight:10,marginBottom:10},this.props.style]}>
                    <Text>
                        {this.props.title}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({});