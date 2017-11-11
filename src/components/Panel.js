/**
 * Created by whb on 2017/10/17.
 * https://github.com/WaterEye0o
 */

import React, {Component,} from 'react';
import PropTypes from "prop-types";
import {
    StyleSheet,
    Dimensions,
    View,
    Text
} from 'react-native';
import SZStyle from "../res/common.style";

class TitleRight extends Component {
    static defaultProps = {
        id: 'title_right'
    };

    render() {
        return (
            <View {...this.props} style={[{alignItems:'center',justifyContent:'center'}, this.props.style]}>
                {this.props.children}
            </View>
        )
    }
}

class Container extends Component {
    static propTypes = {
        showTitle: PropTypes.bool,
        type: PropTypes.oneOf(['normal', 'circle'])
    };
    static defaultProps = {
        id: 'container'
    };

    render() {
        return (
            <View {...this.props} style={[{paddingTop: 10}, this.props.style]}>
                {this.props.children}
            </View>
        )
    }
}

export default class Panel extends Component {
    static propTypes = {
        showTitle: PropTypes.bool,
        showTitleBorder: PropTypes.bool,
        titleStyle: View.propTypes.style,
        type: PropTypes.oneOf(['normal', 'circle'])
    };
    static defaultProps = {
        showTitle: true,
        showTitleBorder: true,
        type: 'normal'
    };
    static TitleRight = TitleRight;
    static Container = Container;

    render() {
        let children = React.Children.toArray(this.props.children);
        let titleRightRender;
        if (children.length > 0) {
            titleRightRender = children.filter((v) => v.props.id === 'title_right');
            children = children.filter((v) => v.props.id === 'container');
        }
        let type = this.props.type;

        return (
            <View style={[{
                marginTop: 10,
                backgroundColor: '#fff',
                padding: type === 'normal' ? 20 : 0,
                paddingTop: type === 'normal' ? 10 : 0,
                paddingBottom: type === 'normal' ? 10 : 0,
                marginLeft: type === 'normal' ? 0 : 20,
                marginRight: type === 'normal' ? 0 : 20,
                borderRadius: type === 'normal' ? 0 : 4,
            }, this.props.style]}
            >
                {this.props.showTitle &&
                    <View style={[{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingBottom: 10,
                                borderBottomWidth: this.props.showTitleBorder?StyleSheet.hairlineWidth:0,
                                borderColor: '#ddd',
                                alignItems:'center',
                            },this.props.titleStyle]}>
                        <Text style={[SZStyle.p13,{color: '#9fa0a1'}]}>
                            {this.props.title}
                        </Text>
                        {!!titleRightRender && titleRightRender}
                    </View>
                }
                <View>
                    {children}
                </View>
            </View>
        );
    }
}



