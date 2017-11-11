import React from "react";
import PropTypes from "prop-types";
import {Text, TouchableOpacity, View} from "react-native";
import Icon from "../Icon";

export default  class Button extends React.Component {
    static defaultProps = {
        text: null, color: "#999", onPress: null, style: {}, icon: null, iconSize: 24, touchable: true,
    };

    measure(...args) {
        return this.refs.component.measure(...args);
    }

    render() {
        let Component = (this.props.touchable || this.props.onPress) ? TouchableOpacity : View;
        return <Component ref="component" onPress={this.props.onPress} style={{
            flexDirection: "row", flex: 1, alignItems: "center", ...this.props.style,
        }}>
            {this.props.icon &&
                <Icon icon={this.props.icon}
                      color={this.props.color}
                      size={this.props.iconSize}
                      style={{backgroundColor: "transparent",}}/>
            }
            {this.props.text &&
                <Text style={{fontSize: 18, color: this.props.color}}> {this.props.text}</Text>
            }
            {this.props.children}
        </Component>;
    }
};