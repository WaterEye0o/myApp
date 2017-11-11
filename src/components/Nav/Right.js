import React from "react";
import PropTypes from "prop-types";
import {TouchableOpacity, Text, View, Image} from "react-native";

export default class extends React.Component {
    static defaultProps = {
        onPress: null,
        style: {},
    };

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    ...this.props.style
                }}>
                {this.props.children}
            </TouchableOpacity>
        );
    }
};