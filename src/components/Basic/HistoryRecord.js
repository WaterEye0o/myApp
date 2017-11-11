import React from "react";
import AppStore from "../../Store";
import {withRouter} from "react-router";
import * as Log from "./Log";

@withRouter
export default class HistoryRecord extends React.Component {
    componentDidUpdate(prevProps) {
        Log.group('路由栈', prevProps.history);
        Log.group('当前路由栈', prevProps.history.location);
        AppStore.setHistory(prevProps.history);
    }

    render() {
        return null;
    }
}