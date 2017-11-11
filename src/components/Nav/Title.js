import React from "react";
import PropTypes from "prop-types";
import {Text, View} from "react-native";
import TextStyle from "./TextStyle";
export default class Title extends React.Component {
    render() {
        return (
            <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center",}}>
                {React.Children.count(this.props.title) > 0 ? this.props.children : null}
                {React.Children.count(this.props.children) > 0 &&
                    <Text style={{...TextStyle, ...this.props.style}} numberOfLines={1}>
                        {React.Children.count(this.props.title) > 0 ? this.props.title : this.props.children}
                    </Text>
                }
            </View>
        );
    }
};