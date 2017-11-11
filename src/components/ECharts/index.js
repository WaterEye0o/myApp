/**
 * Created by whb on 2016/12/8.
 * https://github.com/WaterEye0o
 *
 * @providesModule ECharts
 */

import React, {Component} from 'react';
import {WebView, View} from 'react-native';
import {Container, Echarts} from './components';

export default class App extends Component {
    render() {
        return (
            <Container width={this.props.width}>
                <Echarts {...this.props} />
            </Container>
        );
    }
}
