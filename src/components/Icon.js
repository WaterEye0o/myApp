import React from "react";
import PropTypes from "prop-types";
import {Image,} from "react-native";
import _ from "lodash";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Foundation from "react-native-vector-icons/Foundation";
import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Octicons from "react-native-vector-icons/Octicons";
import Ionicons from "react-native-vector-icons/Ionicons";

let maps = {
    "fa": FontAwesome,
    "fd": Foundation,
    "et": Entypo,
    "ei": EvilIcons,
    "md": MaterialIcons,
    "mci": MaterialCommunityIcons,
    "oi": Octicons,
    "ion": Ionicons,
};
export default class Icon extends React.Component {
    static defaultProps = {
        icon: null, color: null, size: 64 / 2,
    };
    static propTypes = {
        icon: PropTypes.string.isRequired,
        color: PropTypes.string,
        size: PropTypes.number,
    };

    render() {
        let {icon, color, size, style, ...other} = this.props;
        let source = icon;
        if (!icon) {
            return null;
        }
        if (_.isString(icon)) {
            let regex = /^(\w+)-(.+)/;
            let matches = icon.match(regex);
            if (matches) {
                let type = _.get(matches, "1", "fa");
                let name = _.get(matches, "2", null);
                let IconComponent = maps[type];
                return <IconComponent name={name} color={color} {...other} size={size} style={style}/>;
            } else {
                source = {uri: icon};
            }
        }
        return <Image source={source} {...other} style={[{tintColor: color, width: size, height: size},style]}/>
    }
}