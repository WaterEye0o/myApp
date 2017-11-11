import React from "react";
import {View} from "react-native";
import PropTypes from "prop-types";

export default class TabRoute extends React.Component {
    static defaultProps = {
        type: "tab-route",
    };

    static propTypes = {
        title: PropTypes.string.isRequired,
        path: PropTypes.string,
        hash: PropTypes.string,
        component: PropTypes.func,
        children: PropTypes.func,
        render: PropTypes.func,
        exact: PropTypes.bool,
        strict: PropTypes.bool,
        onRequestChangeTab: PropTypes.func,
    };
}