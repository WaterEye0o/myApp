import React from "react";
import PropTypes from "prop-types";
import {TouchableOpacity, Text, View, Image} from "react-native";
import Button from "./Button";
import * as Color from '../../res/color'

export default class BackButton extends React.Component {
    static propTypes = {
        color: PropTypes.string,
        text: PropTypes.bool,
        backText: PropTypes.string,
        onPress: PropTypes.func,
        type: PropTypes.string,
        icon: PropTypes.string,
        style: PropTypes.object,
    };
    static defaultProps = {
        backText: "返回",
        text: false,
        color: Color.white,
        onPress: null,
        style: {paddingLeft: 15, justifyContent: "flex-start"},
        type: "ion",
        icon: "ion-ios-arrow-back",
    };

    render() {
        let {backText, text, ...other} = this.props;
        return (
            <Button type={this.props.type}
                    icon={this.props.icon}
                    text={text ? backText : null}
                    {...other}>
                {this.props.children}
            </Button>
        );
    }
};