import React from "react";
import {Text, View} from "react-native";
import {Route} from "react-router-native";
import {Observer} from "mobx-react/native";

export default function render(config) {
    const {render: renderFun, children, ...other} = config;
    if (renderFun) {
        return renderFun;
    }
    if (children) {
        return children;
    }
    return function (props) {
        return <Observer>{() => {
            let Content = config.component || function () {
                    return (
                        <View style={{flex: 1, justifyContent: "center", alignItems: "center",}}>
                            <Text>{"<--" + config.title}--></Text>
                        </View>
                    );
                };
            return <Content {...props} {...other} />;

        }}</Observer>;
    };
}