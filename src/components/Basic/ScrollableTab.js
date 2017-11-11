import React from "react";
import {Text, View, StyleSheet} from "react-native";
import ScrollTab from "react-native-scrollable-tab-view";

import _ from "lodash";
import PropTypes from "prop-types";
import {Route} from "react-router-native";
import RouteScrollTab from "./RouteScrollTab";
import * as Color from '../../res/color';
import ScrollableTabBar from "react-native-scrollable-tab-view-mask-bar";

export default class ScrollableTab extends RouteScrollTab {
    static defaultProps = {
        replace: false,
        scrollableTabBGColor: Color.theme,
        underlineBGColor: Color.white,
        underlineContainerBGColor: Color.white,
        activeTextColor: Color.white,
        inactiveTextColor: Color.white
    };
    static propTypes = {
        replace: PropTypes.bool,
        scrollableTabBGColor: PropTypes.string,
        underlineBGColor: PropTypes.string,
        underlineContainerBGColor: PropTypes.string,
        activeTextColor: PropTypes.string,
        inactiveTextColor: PropTypes.string
    };

    getCurrentPage() {
        return this.refs.scroll.state.currentPage;
    }

    render() {
        let children = this.props.children;
        let page = this.getIndexByType(this.getType());
        return (
            <ScrollTab
                renderTabBar={() => (
                    <ScrollableTabBar
                        underlineStyle={{
                            backgroundColor: this.props.underlineBGColor,
                            height: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            bottom: 6
                        }}
                        underlineContainerStyle={{
                            backgroundColor: this.props.underlineContainerBGColor,
                            height: 2
                        }}
                        style={{
                            height: 44,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        backgroundColor={this.props.scrollableTabBGColor}
                        activeTextColor={this.props.activeTextColor}
                        inactiveTextColor={this.props.inactiveTextColor}
                        tabStyle={{paddingLeft: 0, paddingRight: 0}}
                    />)}
                onChangeTab={({ref}) => {
                    if (!ref || !ref.props) return;
                    let path = ref.props.path;
                    let currentPath = this.getPath();
                    if (path !== currentPath && currentPath.indexOf(this.props.base) !== -1) {
                        if (this.props.replace) {
                            this.props.history.replace(path);
                        } else {
                            this.props.history.push(path);
                        }
                    }
                }}
                ref="scroll" page={page} initialPage={page}>

                {React.Children.map(children, (child, index) => {
                    let path = this.props.base + "/" + child.props.path;
                    let {render, children, component: Component, ...others} = child.props;
                    return (
                        <View key={index} style={{flex: 1,}} path={path} tabLabel={child.props.title}>
                            <Route path={path} children={(props) => {
                                if (render) return render(props);
                                if (children) return children(props);
                                if (Component) return <Component {...props} {...others}/>;
                                return (
                                    <View style={{justifyContent: "center", alignItems: "center", flex: 1}}>
                                        <Text>No content for {child.props.title}</Text>
                                    </View>
                                );
                            }}/>
                        </View>
                    );
                })}
            </ScrollTab>
        );
    }
}