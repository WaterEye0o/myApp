import React from "react";
import {BottomNavigation, Tab as BottomTab} from "react-router-navigation";
import {Route, Switch} from "react-router";
import _ from "lodash";
import {Text, Image, StyleSheet} from "react-native";
import render from "./Basic/render";

export default class BottomTabBar extends React.Component {
    render() {
        let children = React.Children.map(this.props.children, (child, index) => {
            let route = child.props;
            return (
                <BottomTab
                    key={index}
                    path={route.path}
                    render={render(route)}
                    label={route.title}
                    exact={route.exact}
                    strict={route.strict}
                    labelStyle={styles.tabBtn}
                    renderTabIcon={({focused, tabTintColor, tabActiveTintColor}) =>{
                        return <Image source={focused?route.icon:route.unselectedIcon}/>;
                    }}
                    onRequestChangeTab={route.onRequestChangeTab}
                />
            );
        });
        return (
            <BottomNavigation tabTintColor="#6a6a6a" tabActiveTintColor="#0283d9">
                {children}
            </BottomNavigation>
        );
    }
}

const styles = StyleSheet.create({
    tabBtn: {
        fontSize: 12,
        marginTop: 3,
    }
});