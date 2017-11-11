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
import * as util from "../utilities/util";
import {errorHandler} from '../logics/rpc';

const WIDTH = Dimensions.get('window').width;
export default class LineChart extends Component {
    static defaultProps = {
        type: 'normal',
        height: 180,
        data: [],
        xData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        req: () => {
        },
        getData: (res) => res,
        getXData: () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        needReq: false,
        showYearTag:false
    };
    static propTypes = {
        type: PropTypes.oneOf(['normal', 'shallow']),
        height: PropTypes.number,
        data: PropTypes.array,
        xData: PropTypes.array,
        req: PropTypes.func,
        getData: PropTypes.func,
        getXData: PropTypes.func,
        needReq: PropTypes.bool,
        showYearTag: PropTypes.bool,
    };
    state = {
        onLoading: true,
        data: []
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
            this.setState({data: data});
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

                },
                series: {
                    type: 'line',
                    lineStyle: {normal: {color: '#53CAFA'}},
                    areaStyle: {normal: {color: '#21c4fa', opacity: '0.2'}},
                    data: this.props.getData(data),
                    showSymbol: false,
                },
                animationEasing: 'elasticOut',
                animationDelayUpdate: function (idx) {
                    return idx * 5;
                }
            };
        } else {
            option = {
                grid: {
                    left: '-20',
                    right: '0',
                    bottom: '-25',
                    top: '0',
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
                        showMaxLabel: false,
                        showMinLabel: false,
                        color: '#ffffff',
                        align: 'left',
                    },
                    splitNumber: 3,
                    splitLine: {
                        show: false
                    },
                },
                series: {
                    type: 'line',
                    lineStyle: {normal: {color: '#008DB5'}},
                    areaStyle: {normal: {color: '#21c4fa', opacity: '0.2'}},
                    data: this.props.getData(data),
                    showSymbol: false,
                },
                animationEasing: 'elasticOut',
                animationDelayUpdate: function (idx) {
                    return idx * 5;
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
                    style={{width:40,height:40}}
                    source={this.props.type === 'shallow' ? require('../res/images/chartLoadingShallow.gif') : require('../res/images/chartLoading.gif')}/>
            </View>
        )
    }

    renderContainer(option) {
        return (
            <View style={{borderRadius: 5, alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
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

    render() {
        let option = this.getOpt(this.state.data);
        return (
            <View style={[{padding: 10, backgroundColor: '#fff', paddingTop: 10, paddingBottom: 10}, this.props.style]}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                    <Text style={{color: '#9fa0a1', marginBottom: 10, paddingLeft: 10}}>{this.props.title}</Text>
                </View>
                {this.renderContainer(option)}
                {this.props.type === 'normal' &&
                    <View style={{justifyContent: 'space-between', flexDirection: 'row', width: '100%', marginTop: 5}}>
                        {this.props.getXData(this.state.data).map((v, i, arr) => {
                            // if (i == 0 || i == arr.length - 1) {
                            //     return <Text style={{color: '#a4a6a7', fontSize: 10}} key={i}>{` `}</Text>
                            // } else {
                            if ( this.props.showYearTag && v ==1){
                                return (
                                    <View key={i+'xAxis'} style={{position:'relative'}}>
                                        <Text style={{color: '#fff', fontSize: 10,backgroundColor:'transparent',position:'absolute',top:-25,width:100,left:-5}} key={i+'year'}>{util.format(new Date(), 'yyyy')}</Text>
                                        <Text style={{color: '#a4a6a7', fontSize: 10}} key={i+'xAxis'}>{v}</Text>
                                    </View>
                                )
                            }else {
                                return <Text style={{color: '#a4a6a7', fontSize: 10}} key={i}>{v}</Text>
                            }

                            // }
                        })}
                    </View>
                }
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
    }
});