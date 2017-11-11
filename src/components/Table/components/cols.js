import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import Cell from './cell';

class Col extends Component {
    static propTypes = {
        width: PropTypes.number,
        heightArr: PropTypes.array,
        flexArr: PropTypes.array,
        data: PropTypes.array,
        style: View.propTypes.style,
        textStyle: Text.propTypes.style,
    };

    render() {
        const {data, style, width, heightArr, flex, textStyle, borderStyle} = this.props;

        return (
            data ?
                <View style={[
                    width ? {width: width} : {flex: 1},
                    flex && {flex: flex},
                    style
                ]}>
                    {
                        data.map((item, i) => {
                            const height = heightArr && heightArr[i];
                            return <Cell key={i} data={item} width={width} height={height} textStyle={textStyle}
                                         borderStyle={borderStyle}/>
                        })
                    }
                </View>
                : null
        )
    }
}

class Cols extends Component {
    static propTypes = {
        widthArr: PropTypes.array,
        heightArr: PropTypes.array,
        flexArr: PropTypes.array,
        data: PropTypes.array,
        style: View.propTypes.style,
        textStyle: Text.propTypes.style,
    };

    render() {
        const {data, style, widthArr, heightArr, flexArr, textStyle, borderStyle} = this.props;
        let widthNum = 0;
        if (widthArr) {
            for (let i = 0; i < widthArr.length; i++) {
                widthNum += widthArr[i];
            }
        }

        return (
            data ?
                <View style={[
                    styles.cols,
                    widthNum && {width: widthNum},
                ]}>
                    {
                        data.map((item, i) => {
                            const flex = flexArr && flexArr[i];
                            const width = widthArr && widthArr[i];
                            return <Col key={i} data={item} width={width} heightArr={heightArr} flex={flex}
                                        style={style} textStyle={textStyle} borderStyle={borderStyle}/>
                        })
                    }
                </View>
                : null
        )
    }
}

const styles = StyleSheet.create({
    cols: {
        flexDirection: 'row',
    }
});

export {Col, Cols};
