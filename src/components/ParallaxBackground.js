'use strict';

import React from 'react';
import ReactNative, {
    View,
    ListView,
    StyleSheet,
    TouchableOpacity,
    Image,
    Text,
    Dimensions,
    Animated,
    Platform
} from 'react-native';

const {width} = Dimensions.get('window');

export default class ParallaxBackground extends React.Component {

    constructor(props) {
        super(props);

        this.IMG_HEIGHT = 350 / 2 + (Platform.OS == 'ios' ? 80 : 0);
        if (props.height) {
            this.IMG_HEIGHT = props.height;
        }

        this.state = {
            yOffset: 0,
            anim: new Animated.Value(0)
        }
    }

    _setAnimatedOutPutRange(outputRange) {
        return this.state.anim.interpolate({
            inputRange: [-1, 0],
            outputRange: outputRange,
            extrapolate: 'clamp',
        })
    }

    render() {
        const {yOffset} = this.props;

        var scale;
        var translateY;
        if (yOffset < 0) {
            let imgScale = (-yOffset + this.IMG_HEIGHT) / this.IMG_HEIGHT;
            scale = this._setAnimatedOutPutRange([0, imgScale]);

            let y = (-yOffset / 2) / imgScale;
            translateY = this._setAnimatedOutPutRange([0, y]);
        } else {
            scale = this._setAnimatedOutPutRange([0, 1]);
            translateY = this._setAnimatedOutPutRange([0, -yOffset]);
        }

        return (
            <Animated.Image
                source={this.props.source}
                style={[styles.backgroundImage, {height: this.IMG_HEIGHT}, this.props.style, {
                            transform: [{scale}, {translateY}]
                        }
                    ]}
                pointerEvents={'none'}>
            </Animated.Image>
        )
    }
}

// ParallaxBackground.defaultProps={
//   source:images.Myinfo.HEAD_BACKGROUND_STAR
// }

var styles = StyleSheet.create({
    backgroundImage: {
        width
    },
});