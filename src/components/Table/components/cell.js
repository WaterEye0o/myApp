import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class Cell extends Component {
    static propTypes = {
        style: View.propTypes.style,
        textStyle: Text.propTypes.style,
        borderStyle: View.propTypes.style,
    };

    static defaultProps = {
        borderStyle: {borderWidth: 1},
    };

    render() {
        const {data, width, height, flex, style, textStyle} = this.props;
        let borderWidth, borderColor;
        borderWidth = this.props.borderStyle.borderWidth;
        if (this.props.borderStyle && this.props.borderStyle.borderColor) {
            borderColor = this.props.borderStyle.borderColor;
        } else {
            borderColor = '#000';
        }

        return (
            <View style={[
                {
                    borderTopWidth: borderWidth,
                    borderRightWidth: borderWidth,
                    borderColor: borderColor,
                },
                styles.cell,
                width && {width: width},
                height && {height: height},
                flex && {flex: flex},
                !width && !flex && !height && {flex: 1},
                style
            ]}>
                <Text numberOfLines={1} style={[textStyle, styles.text]}>{data}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cell: {
        justifyContent: 'center',
    },
    text: {
        backgroundColor: 'transparent',
    },
});

export default Cell;
