import React from "react";
import {View,Dimensions} from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
export default class Page extends React.Component {
    WIDTH = WIDTH;
    HEIGHT = HEIGHT;

    param(key, defaultValue = null, props = this.props) {
        return _.get(props, `match.params.${key}`, defaultValue);
    }

    isChanged(key, nextProps, isEqual = null) {
        let current = this.param(key, null);
        let next = this.param(key, null, nextProps);
        return isEqual ? isEqual(current, next) : current !== next;
    }

    hash() {
        return _.get(this.props, `location.hash`, '');
    }

    back(n = -1) {
        let history = this.props.history;
        if (!history) {
            return console.warn('no history please add support');
        }
        history.go(n);
    }

    pop(n = -1) {
        let history = this.props.history;
        if (history.entries.length < (-n + 1)) return;
        if (!history) {
            return console.warn('no history please add support');
        }
        history.pop(n);
    }

    push(...args) {
        let history = this.props.history;
        if (!history) {
            return console.warn('no history please add support');
        }
        return history.push(...args);
    }

    getLocation(path = null, defaultValue = null) {
        return path ? _.get(this.props, `location.${path}`, defaultValue) : this.props.location;
    }

    locationState(state) {
        return _.get(this.props, `location.state.${state}`, null);
    }

    from() {
        return _.get(this.props, "location.state.from", null);
    }

    url() {
        return _.get(this.props, "match.url", this.base || null);
    }

    path(path = "") {
        return (this.url() || "") + (path ? "/" + path : "");
    }

    to(path, props = {}) {
        let relativePrefix = "./";
        let pathname = path;
        if (path.indexOf(relativePrefix) === 0) {
            pathname = (this.path(path.replace(relativePrefix, "")));
        }
        this.push({
            pathname, state: props
        });
    }

    replace(...args) {
        let history = this.props.history;
        return history && history.replace(...args);
    }

    showLoading(){
        return this.push({
            hash:  `#loading`, state: {
                getCallBack: (callback) => {
                    if (callback) {
                        this.loadingCallBack = callback;
                    }
                }
            }
        })
    }

    closeLoading(){
        if (this.loadingCallBack){
            this.loadingCallBack();
        }else {
            console.warn('没有回调');
        }
    }
}