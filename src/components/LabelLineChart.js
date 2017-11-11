/**
 * Created by whb on 2017/10/19.
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
import Legend from "./Legend";
import SZStyle from "../res/common.style";
import * as Log from "./Basic/Log";
import {errorHandler} from '../logics/rpc';

const WIDTH = Dimensions.get('window').width;
export default class LabelLineChart extends Component {
    static defaultProps = {
        type: 'normal',
        height: 180,
        data: [],
        xData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        req: () => {
        },
        getData1: (res) => res,
        getData2: (res) => res,
        getXData: () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        needReq: false,
        legend: {
            data1: '-',
            data2: '-'
        },
        labelData: [
            {
                title: '',
                unit: '',
                getData: () => {
                },
            }
        ],
    };
    static propTypes = {
        type: PropTypes.oneOf(['normal', 'shallow']),
        height: PropTypes.number,
        data: PropTypes.oneOfType(PropTypes.array, PropTypes.object),
        xData: PropTypes.array,
        req: PropTypes.func,
        getData1: PropTypes.func,
        getData2: PropTypes.func,
        getXData: PropTypes.func,
        needReq: PropTypes.bool,
        legend: PropTypes.object,
        labelData: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string,
                unit: PropTypes.string,
                getData: PropTypes.func.isRequired,
            })
        )
    };
    state = {
        onLoading: true,
        data: this.props.data
    };
    onEchartLoading = true;
    onReqLoading = true;

    componentWillReceiveProps(newProps) {
        if (newProps.target !== this.props.target || newProps.onLoading !== this.props.onLoading) {
            this.setState({onLoading: newProps.onLoading});
        }
    }

    async componentDidMount() {
        if (this.props.needReq) {
            this.onReqLoading = true;
            if (this.onEchartLoading || this.onReqLoading) {
                if (!this.state.onLoading) {
                    this.setState({onLoading: true});
                }
            }

            const data = await this.props.req().catch(errorHandler);
            this.setState({
                data: data,
            });
            this.onReqLoading = false;
            if (!this.onEchartLoading && !this.onReqLoading) {
                if (this.state.onLoading) {
                    this.setState({onLoading: false});
                }
            }
        } else {
            this.onReqLoading = false;
        }
    }

    toggleLoadingState(state) {
        this.setState({onLoading: state})
    }

    getOpt(data) {
        let option;

        if (this.props.type === 'shallow') {
            option = {
                grid: {
                    right: '10',
                    left: '45',
                    bottom: '20',
                    top: '10',
                    show: false,
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    show: true,
                    data: this.props.getXData(data),
                    axisLine: {show: false},
                    axisTick: {show: false},
                    axisLabel: {
                        color: '#9E9FA0',
                    },
                },
                yAxis: {
                    type: 'value',
                    axisLine: {show: false},
                    axisTick: {show: false},
                    axisLabel: {
                        color: '#9E9FA0',
                    },
                    splitNumber: 2,
                    splitLine: {
                        lineStyle: {}
                    }
                },
                series: [
                    {
                        type: 'line',
                        lineStyle: {normal: {color: '#a2e7f9'}},
                        areaStyle: {normal: {color: '#a2e7f9', opacity: '0.4'}},
                        data: this.props.getData1(data),
                        showSymbol: false,
                        smooth: true,
                    }, {
                        type: 'line',
                        lineStyle: {normal: {color: '#00a9df'}},
                        areaStyle: {normal: {color: '#00a9df', opacity: '0.6'}},
                        data: this.props.getData2(data),
                        showSymbol: false,
                        smooth: true,
                    }],
                animationEasing: 'elasticOut',
                animationDelayUpdate: function (idx) {
                    return idx * 500;
                }
            };
        } else {
            option = {
                backgroundColor: '#202E42',
                grid: {
                    left: '-47',
                    right: '0',
                    bottom: '-20',
                    top: '-1',
                    containLabel: true,
                    backgroundColor: '#202E42',
                    show: true,
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    show: false,
                    data: this.props.getXData(data),
                },
                yAxis: {
                    type: 'value',
                    offset: '-20',
                    axisLine: {show: false},
                    axisTick: {show: false},
                    axisLabel: {
                        showMinLabel: false,
                        color: '#ffffff',
                        align: 'left',
                        padding: [15, 0, 0, 0]
                    },
                    splitNumber: 3,
                    splitLine: {
                        show: false
                    },
                },
                series: [
                    {
                        type: 'line',
                        lineStyle: {normal: {color: '#a2e7f9'}},
                        areaStyle: {normal: {color: '#a2e7f9', opacity: '0.4'}},
                        data: this.props.getData1(data),
                        showSymbol: false,
                        smooth: true,
                    }, {
                        type: 'line',
                        lineStyle: {normal: {color: '#00a9df'}},
                        areaStyle: {normal: {color: '#00a9df', opacity: '0.6'}},
                        data: this.props.getData2(data),
                        showSymbol: false,
                        smooth: true,
                    }],
                animationEasing: 'elasticOut',
                animationDelayUpdate: function (idx) {
                    return idx * 500;
                }
            };
        }

        return option;
    }

    renderLoading() {
        return (
            <View style={[styles.loading, {
                height: this.props.height,
                backgroundColor: this.props.type === 'shallow' ? '#f6f7fb' : '#202E42'
            }]}>
                <Image
                    style={{width: 40, height: 40}}
                    source={this.props.type === 'shallow' ? require('../res/images/chartLoadingShallow.gif') : require('../res/images/chartLoading.gif')}/>
            </View>
        )
    }

    renderContainer(option) {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
                <Echarts
                    width={WIDTH - 20}
                    {...this.props}
                    option={option}
                    height={this.props.height}
                    onLoadStart={() => {
                        this.onEchartLoading = true;
                        if (this.onEchartLoading || this.onReqLoading) {
                            if (!this.state.onLoading) {
                                this.setState({onLoading: true})
                            }
                        }
                    }}
                    onLoadEnd={() => {
                        this.onEchartLoading = false;
                        if (!this.onEchartLoading && !this.onReqLoading) {
                            if (this.state.onLoading) {
                                this.setState({onLoading: false})
                            }
                        }
                    }}
                />
                {this.state.onLoading && this.renderLoading()}
            </View>
        )
    }

    renderLabel() {
        let bgStyle, textStyle1, textStyle2,textStyle3;
        if (this.props.type !== 'shallow') {
            bgStyle = {backgroundColor: '#3a4c66'};
            textStyle1 = {color: '#dadee2'};
            textStyle2 = {color: '#f7f8f9'};
            textStyle3 = {color: '#919aaa'};
        }
        return (
            <View style={[{
                marginTop: 10,
                backgroundColor: '#f3f8fb',
                flexDirection: 'row',
                flexWrap: 'wrap',
                paddingBottom: 20,
                marginBottom: 20,
                borderRadius: 5
            },bgStyle]}>
                {this.props.labelData.map((v, i) => {
                    return (
                        <View key={'label' + i} style={{width: '50%', padding: 20, paddingBottom: 0}}>
                            <Text style={[styles.labelTitleText, SZStyle.p10,textStyle1]}>
                                {v.title}
                            </Text>
                            <View style={{flexDirection: 'row',justifyContent: 'space-between',marginTop: 5}}>
                                <Text style={[styles.labelText,SZStyle.p14,textStyle2]}>
                                    {v.getData(this.state.data)}
                                </Text>
                                {(!!v.unit && v.getData(this.state.data)!='-') &&
                                    <Text style={[styles.labelText,SZStyle.p10,{marginTop:5},textStyle3]}>
                                        {v.unit}
                                    </Text>
                                }
                            </View>
                        </View>
                    )
                })}
            </View>
        )
    }

    render() {
        let option = this.getOpt(this.state.data);
        return (
            <View style={[{padding: 10, backgroundColor: '#fff', paddingTop: 10, paddingBottom: 10}, this.props.style]}>
                <View
                    style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%',alignItems:'center',marginBottom: 10}}>
                    <Text style={{color: '#9fa0a1',  paddingLeft: 10}}>{this.props.title}</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                        <View style={[styles.legend, {marginRight: 5}]}/>
                        <Text style={[{marginRight: 10}, styles.legendText]}>
                            {this.props.legend.data1}
                        </Text>

                        <View style={[styles.legend, {backgroundColor: '#00aade', marginRight: 5}]}/>
                        <Text style={[{marginRight: 10}, styles.legendText]}>
                            {this.props.legend.data2}
                        </Text>
                    </View>
                </View>

                <View
                    style={{backgroundColor:this.props.type==='normal'?'#1e2e41':'#fff',borderRadius:this.props.type==='normal'?5:0,overflow:'hidden'}}>
                    <View
                        style={{paddingLeft:this.props.type==='normal'?10:0,paddingRight:this.props.type==='normal'?10:0}}>
                        {!!this.props.labelData && this.props.labelData.length > 0 && this.renderLabel()}
                    </View>
                    {this.renderContainer(option)}

                </View>
                {this.props.type === 'normal' &&
                <View style={{justifyContent: 'space-between', flexDirection: 'row', width: '100%', marginTop: 10}}>
                    {this.props.getXData(this.state.data).map((v, i, arr) => {
                        // if (i == 0 || i == arr.length - 1) {
                        //     return <Text style={{color: '#a4a6a7', fontSize: 10}} key={i}>{` `}</Text>
                        // } else {
                        return (<Text style={{color: '#a4a6a7', fontSize: 10}} key={i}>{v}</Text>);
                        // }
                    })}
                </View>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loading: {
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        right: 0,
        position: 'absolute',
        width: WIDTH - 20,
    },
    legend: {
        width: 10,
        height: 10,
        borderRadius: 2,
        backgroundColor: '#63d9f7'
    },
    legendText: {
        color: '#98999a'
    },
    labelTitleText: {
        color: '#454546',
    },
    labelText: {
        color: '#919aaa',
    }
});