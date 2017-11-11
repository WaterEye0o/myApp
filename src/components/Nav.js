import React from "react";
import PropTypes from "prop-types";
import {TouchableOpacity, Text, View, Image, Platform} from "react-native";
import TextStyle from "./Nav/TextStyle";
import Title from "./Nav/Title";
import Button from "./Nav/Button";
import BackButton from "./Nav/BackButton";
import Null from "./Nav/Null";
import Right from "./Nav/Right";
import Searcher from "./Nav/Searcher";
import * as Color from '../res/color';

export {default as NavTitle} from "./Nav/Title";
export {default as NavButton} from "./Nav/Button";
export {default as NavBackButton} from "./Nav/BackButton";
export {default as NavNull} from "./Nav/Null";
export {default as NavRight} from "./Nav/Right";


/**
 * @namespace Nav.Title
 * @namespace Nav.Button
 * @namespace Nav.Right
 */


export default class Nav extends React.Component {
    static propTypes = {
        background: PropTypes.object, backgroundColor: PropTypes.string, title: PropTypes.number,
    };
    static defaultProps = {
        background: null, backgroundColor: Color.theme, title: 3,
    };
    static styles = [
        {
            alignItems: "flex-start",
        }, {
            alignItems: "center",
        }, {
            alignItems: "flex-end",
        },
    ];

    static TextStyle = TextStyle;
    static Title = Title;
    static Searcher = Searcher;
    static Button = Button;
    /**
     * @namespace Nav.BackButton
     * @type {{React.Component}}
     */
    static BackButton = BackButton;

    /**
     * @namespace Nav.BackButton
     * @type {{React.Component}}
     */
    static Null = Null;

    static Right = Right;

    renderChildren() {
        let children = React.Children.toArray(this.props.children);
        let len = children.length;
        if (len > 3) {
            throw "Nav children con't over three component";
        } else if (len === 2) {
            children.push(null);
        } else if (len === 1) {
            return children[0];
        }

        return children.map((child, index) => {
            return <View key={index} style={{
                flex: index === 1 ? (this.props.title) : 1,
                flexDirection: "row",
                overflow: "hidden",
                justifyContent: "center",
                alignItems: "stretch",
            }}>{child}</View>;
        });
    }

    render() {
        return <View style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "stretch",
            paddingTop: Platform.OS == 'ios' ? 20 : 0,
            height: Platform.OS == 'ios' ? 64 : 44,
            backgroundColor:this.props.backgroundColor,...this.props.style
        }}>
            {this.props.background &&
            <Image source={this.props.background}
                   style={{
                        resizeMode: "stretch",
                        height: Platform.OS == 'ios' ? 64 : 44,
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: 0,
                    }}/>
            }
            {this.renderChildren()}
        </View>;
    }
}