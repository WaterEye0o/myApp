import React from "react";
import {View} from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";

export default class RouteScrollTab extends React.Component {
    getChildPath(child) {
        return this.props.base + '/' + child.props.path;
    }

    static defaultProps = {
        history: null,
    };

    static propTypes = {
        history: PropTypes.object.isRequired,
    };

    getInitialType() {
        let types = React.Children.toArray(this.props.children);
        return '/' + types[0].props.path;
    }

    getType(props = null) {
        let sub = this.getPath(props).replace(this.props.base, '') || this.getInitialType();
        return sub.slice(1);
    }

    getPath(props = null) {
        return _.get(props || this.props, "history.location.pathname", "/");
    }

    getCurrentPage() {
        return this.refs.scroll.state.page;
    }

    shouldComponentUpdate(nextProps) {
        let path = this.getPath(nextProps);
        if (path.indexOf(this.props.base) === -1) return false;
        let nextType = this.getType(nextProps);
        let nextIndex = this.getIndexByType(nextType);
        return (nextIndex !== this.getCurrentPage());
    }

    componentWillUpdate(nextProps) {
        let nextType = this.getType(nextProps);
        let nextIndex = this.getIndexByType(nextType);
        if (nextIndex !== this.getCurrentPage()) {
            setTimeout(() => {
                this.refs.scroll && this.refs.scroll.goToPage(nextIndex);
            }, 0);
        }
    }

    componentDidMount() {
        let type = this.getType();
        let index = type ? this.getIndexByType(type) : 0;
        setTimeout(() => {
            this.refs.scroll && this.refs.scroll.goToPage(index);
        }, 0);
    }

    getIndexByType(hash) {
        let maps = React.Children.map(this.props.children, (child) => {
            if (!React.isValidElement(child)) {
                throw new Error("scrollable child" + JSON.stringify(child) + " not a valid element");
            }
            return child.props.path;
        });
        let index = maps.indexOf(hash);
        return index === -1 ? 0 : index;
    }
}