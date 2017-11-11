import React from "react";
import {Route, Switch} from "react-router-native";
import _ from "lodash";
import {matchPath} from "react-router";


export default class DialogRoute extends React.Component {
    render() {
        return (
            <Route path="/" children={(props) =>{
                return this.renderConfig(props);
            }}/>
        );
    }

    renderSwith() {
        let base = this.props.base || "/";
        return (
            <Switch>
                {React.Children.map(this.props.children, (child) => {
                    let {path, ...other}  = child.props;
                    let realPath = `${base}${path}`;
                    return <Route path={realPath} {...other} render={(childProps)=>this.renderIt(child,childProps)}
                                  key={realPath}/>;
                })}
            </Switch>
        );
    }

    renderIt(Component, props) {
        if (!Component) {
            return null;
        }
        if (React.isValidElement(Component)) {
            return React.cloneElement(Component, props);
        }
        if (typeof Component === "function") {
            return Component(props);
        }
        return Component;
    }

    renderConfig(props) {
        let hash = (props.location.hash || "").replace("#", "");
        if (!hash) return null;
        let match = null;
        let hit = _.find(React.Children.toArray(this.props.children), (child) => {
            let path = child.props.path;
            match = matchPath(hash, {path: path});
            return !!match;
        });
        return hit ? this.renderIt(hit, {...props, dialogMatch: match}) : null;
    }
}