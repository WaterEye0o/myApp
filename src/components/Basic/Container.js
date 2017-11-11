import React from "react";
import {View} from "react-native";
import PropTypes from "prop-types";
import Tip from '../Tip';
import Subscribe from "./Subscribe";

let styles = {
    Page: {
        flex: 1,
    },
};
export default class Container extends React.Component {
    static defaultProps = {
        id: 'container'
    };
    static propTypes = {
        id: PropTypes.string,
    };

    showTip(msg, delay) {
        this.successTip.show(msg, delay);
    }

    showWarning(msg, delay) {
        this.warningTip.show(msg, delay);
    }


    render() {
        let {style, ...other} = this.props;
        return (
            <View style={[{backgroundColor: "#f0f1f2",}, styles.Page, style]} {...other}>
                {this.props.children}
                <Tip type={'success'} ref={(v)=>this.successTip=v}/>
                <Tip type={'warning'} ref={(v)=>this.warningTip=v}/>
            </View>
        );
    }
}