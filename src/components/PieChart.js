/**
 * Created by whb on 2017/10/17.
 * https://github.com/WaterEye0o
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    Image
} from 'react-native';

import PropTypes from "prop-types";
import Echarts from 'ECharts';
import * as Color from "../res/color";
import Icon from "./Icon";
import HoricalIcon from "../res/images/HoricalIcon";
import _ from 'lodash'
import Legend from "./Legend";

const WIDTH = Dimensions.get('window').width;

export default class PieChart extends Component {
    static defaultProps = {
        legendLineSpace: 18,
        pieRadius: ['40%', '70%'],
        pieCenter: ['25%', '50%'],
        legendMarginVertical: -5,
        pieType: 'normal',
        showTitle: true,
        legendTextLimit: 8,
        onLoading: true,
        getData: (v) => v,
        data: [],
        title: '',
        needReload:false
    };
    static propTypes = {
        legendLineSpace: PropTypes.number,
        legendTextLimit: PropTypes.number,
        legendMarginVertical: PropTypes.number,
        pieRadius: PropTypes.array,
        pieCenter: PropTypes.array,
        showTitle: PropTypes.bool,
        pieType: PropTypes.oneOf(['normal', 'circle']),
        onLoading: PropTypes.bool,
        needReload: PropTypes.bool,
        getData: PropTypes.func,
        data: PropTypes.array,
        title: PropTypes.string,

    };
    state = {
        onLoading: true
    };

    componentWillReceiveProps(newProps) {
        if (newProps.target !== this.props.target || newProps.onLoading !== this.props.onLoading) {
            this.setState({onLoading: newProps.onLoading})
        }
    }

    chartColors = [
        '#00a9df',
        '#00c4f8',
        '#63dafa',
        '#a2e7f9',
        '#9ac3ef',
        '#90a2e1',
        '#8e83ba',
        '#c29fd5',
        '#f59fc3',
        '#ef868c',
        '#ffb833',
    ];

    initData(data) {
        if (data.length > 10) {
            let _total = data.reduce((sum, v) => sum + v.value, 0);
            let _total_10 = data.reduce((sum, v, i) => i < 10 ? (sum + v.value) : sum, 0);
            let _data = data.filter((v, i) => i < 10);
            _data.push({name: '其他', value: _total - _total_10});
            return _data;
        } else {
            return data;
        }
    }

    renderLoading() {
        return (
            <View style={[styles.loading, {
                height: this.props.height,
                backgroundColor: this.props.pieType === 'normal' ? '#f6f7fb' : '#202E42'
            }]}>
                <Image
                    style={{width:40,height:40}}
                    source={this.props.pieType === 'normal' ? require('../res/images/chartLoadingShallow.gif') : require('../res/images/chartLoading.gif')}/>
            </View>
        )
    }

    renderNomrmal() {
        let total = this.props.getData(this.props.data).reduce((sum, v) => sum + v.value, 0);
        let data = this.initData(this.props.getData(this.props.data));
        let option = {
            backgroundColor: Color.bgChart,
            grid: [
                {left: 'left'}
            ],
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)",
                show: false
            },
            legend: {
                orient: 'vertical',
                x: '55%',
                y: 'center',
                data: data,
                align: 'left',
                itemWidth: 10,
                itemHeight: 10,
                width: 50,
                itemGap: this.props.legendLineSpace,
                right: 20,
                show: false
            },
            series: [
                {
                    name: this.props.title,
                    type: 'pie',
                    radius: this.props.pieRadius,
                    center: this.props.pieCenter,
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '15',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: data.map((v, i) => {
                        return {
                            itemStyle: {normal: {color: this.chartColors[i]}},
                            value: v.value || 0,
                            name: v.name + ''
                        };
                    })
                }
            ]
        };

        let content = (
            <View style={{position:'relative',marginTop:10,marginBottom:10}}>
                <Echarts
                    width={WIDTH - 40}
                    {...this.props}
                    option={option}
                    initBgColor={this.props.pieType==='normal'?'#f6f7fb':'#202e42'}
                />
                <View style={{
                    position: 'absolute',
                    height: '100%',
                    right: 20,
                    top: 0,
                    justifyContent: 'center',
                    marginVertical: this.props.legendMarginVertical
                }}>
                    {data.map(({value = 0, name = ""}, i) => {
                        return (
                            <View key={`${i}-${value}`}
                                  style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:8}}>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Legend color={this.chartColors[i]} size={10}/>
                                    <Text numberOfLines={1}
                                          style={{width:100,color:'#4c4e4e',fontSize:10,marginLeft:10,backgroundColor:'transparent'}}>{name}</Text>
                                </View>
                                <Text key={i} style={{
                                    fontSize: 10,
                                    textAlign: 'right',
                                    backgroundColor: 'transparent',
                                    color:'#4c4e4e'
                                }}>
                                    {`${(((value || 0) / total * 100) || 0).toFixed(1)}%`}
                                </Text>
                            </View>
                        );
                    })}
                </View>
                {this.state.onLoading ? this.renderLoading(): (data.length <= 0&&this.renderNoData())}
            </View>
        )

        return (
            <View style={[{padding:20,backgroundColor:'#fff',paddingTop:10,paddingBottom:10},this.props.style]}>
                <Text style={{color:Color.titleHui,fontSize:16, fontWeight: 'bold',}}>
                    {this.props.title}
                </Text>
                {content}
            </View>
        );
    }

    renderCircle() {
        let total = this.props.getData(this.props.data).reduce((sum, v) => sum + v.value, 0);
        let data = this.initData(this.props.getData(this.props.data));
        let option = {
            backgroundColor: '#202e42',
            grid: [
                {left: 'left'}
            ],
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)",
                show: false
            },
            legend: {
                orient: 'vertical',
                x: '55%',
                y: 'center',
                data: data,
                align: 'left',
                itemWidth: 10,
                itemHeight: 10,
                itemGap: this.props.legendLineSpace,
                width: 50,
                right: 20,
                textStyle: {color: '#fff'},
                show: false
            },
            series: [
                {
                    name: this.props.title,
                    type: 'pie',
                    radius: this.props.pieRadius,
                    center: this.props.pieCenter,
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '15',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: data.map((v, i) => {
                        return {itemStyle: {normal: {color: this.chartColors[i]}}, value: v.value, name: v.name + ''};
                    })
                }
            ]
        };
        let content =(<View style={{position:'relative'}}>
            <Echarts
                width={WIDTH - 40}
                {...this.props}
                option={option}
                initBgColor={this.props.pieType==='normal'?'#f6f7fb':'#202e42'}
            />
            <View style={{
                position: 'absolute',
                height: '100%',
                right: 20,
                top: 0,
                justifyContent: 'center',
                marginVertical: this.props.legendMarginVertical
            }}>
                {data.map(({value = 0, name = ""}, i) => {
                    return (
                        <View key={`${i}-${value}`}
                              style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:8}}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Legend color={this.chartColors[i]} size={10}/>
                                <Text numberOfLines={1}
                                      style={{width:WIDTH/2-80,color:'#fff',fontSize:10,marginLeft:10,backgroundColor:'transparent'}}>{name}</Text>
                            </View>
                            <Text key={i} style={{
                                fontSize: 10,
                                textAlign: 'right',
                                backgroundColor: 'transparent',
                                color:'#fff'
                            }}>
                                {`${(((value || 0) / total * 100) || 0).toFixed(1)}%`}
                            </Text>
                        </View>
                    );
                })}
            </View>
            {this.state.onLoading ?this.renderLoading(): data.length <= 0&&this.renderNoData()}
        </View> )

        return (
            <View style={[{borderRadius:5,overflow:'hidden',backgroundColor: '#202e42'}, this.props.style]}>
                {this.props.showTitle &&
                <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                    <View style={{height:15,width:4,borderRadius:2,backgroundColor:'#fff',marginLeft:10}}/>
                    <Text style={{color: '#fff',marginLeft:10, fontSize: 12, fontWeight: 'bold',}}>
                        {this.props.title}
                    </Text>
                </View>
                }
                {content}
            </View>
        );
    }

    renderNoData() {
        return (
            <View style={styles.chartNoData}>
                <Image style={{maxWidth:WIDTH-150,resizeMode:'contain'}}
                       source={require('../res/images/noDataChart.png')}/>
                <Text style={{marginTop:10,color:'#38729a'}}>暂无数据</Text>
            </View>
        )
    }

    render() {
        if (this.props.data) {
            switch (this.props.pieType) {
                case 'normal':
                    return this.renderNomrmal();
                case 'circle':
                    return this.renderCircle();
                default:
                    return this.renderNomrmal();
            }
        } else {
            return null;
        }

    }
}

const styles = StyleSheet.create({
    loading: {
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        right: 0,
        position: 'absolute',
        width: WIDTH - 40,
    },
    chartNoData: {
        flex: 1,
        position:'absolute',
        left:0,
        right:0,
        top:0,
        bottom:0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 15,
        paddingBottom: 30,
        paddingLeft: 20,
        paddingRight: 20,
    }
});