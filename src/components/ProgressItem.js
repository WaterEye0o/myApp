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
    Text
} from 'react-native';

import * as Progress from 'react-native-progress';

let {width} = Dimensions.get('window');

export default class ProgressItem extends Component {
    static defaultProps = {
        title: '',
        data: [],
        labelOpt: []
    };
    static propTypes = {
        title: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.number),
        labelOpt: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            unit: PropTypes.string
        })),
    };

    render() {
        return (
            <View style={{width: '100%', marginBottom: 20}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text>
                        {this.props.title}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                        {
                            this.props.labelOpt.map((v, i) => (
                                    <View style={{flexDirection:'row',marginLeft:10}} key={`label-${i}`}>
                                        <Text>
                                            {v.value != '0' ? (v.value || '-') : '0'}
                                        </Text>
                                        {!!v.unit && <Text style={{marginLeft: 2}}>
                                            {v.unit}
                                        </Text>}
                                    </View>
                                )
                            )
                        }
                    </View>
                </View>
                {
                    this.props.data.map((v, i) =>
                        <Progress.Bar
                            style={{marginTop: 5,}}
                            width={width - 40}
                            borderWidth={0}
                            unfilledColor={'#f4f8fb'}
                            color={'#00a1e7'}
                            progress={v||0}
                            key={`progress-${i}`}
                        />
                    )
                }
            </View>
        );
    }

}