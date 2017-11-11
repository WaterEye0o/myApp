import React, {Component,PropTypes} from 'react';
import {WebView, View, StyleSheet, Platform} from 'react-native';
import renderChart from './renderChart';
import _ from 'lodash'

const SOURCE = Platform.select({
    ios: require('./echart.html'),
    android: __DEV__
        ? require('./echart.html')
        : {uri: 'file:///android_asset/echart.html'},
});

export default class extends Component {
    static defaultProps = {
        initBgColor:'#202e42',
        onPress:()=>{},
        onLoadStart:()=>{},
        onLoadEnd:()=>{},
    };
    static propTypes = {
        initBgColor:PropTypes.string,
        onPress:PropTypes.func,
        onLoadStart:PropTypes.func,
        onLoadEnd:PropTypes.func
    };
    state={
        loading:true
    };
    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(nextProps.option.series, this.props.option.series)) {
            this.chart.reload();
        }
        if (nextProps.needReload !== this.props.needReload){
            this.chart.reload();
        }
    }

    render() {
        return (
            <View pointerEvents={'none'} style={{flex: 1, height: this.props.height || 400}}>
                <WebView
                    ref={ref => this.chart = ref}
                    style={{height: this.props.height || 400}}
                    source={SOURCE}
                    injectedJavaScript={renderChart(this.props)}
                    onMessage={event => {
                        this.props.onPress(JSON.parse(event.nativeEvent.data))
                    }}
                    onLoadStart={()=>{this.setState({loading:true});this.props.onLoadStart()}}
                    onLoadEnd={()=>{setTimeout(()=>{this.setState({loading:false});this.props.onLoadEnd()},200)}}
                    renderLoading={()=>null}
                    scrollEnabled={false}
                    scalesPageToFit={Platform.select({ios: false, android: true})}
                />
                {this.state.loading&&<View style={{position:'absolute',backgroundColor:this.props.initBgColor,top:0,left:0,right:0,bottom:0}}/>}
            </View>
        );
    }
}
