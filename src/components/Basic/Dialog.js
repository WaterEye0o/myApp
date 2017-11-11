import React from "react";
import Page from "./Page";
import _ from "lodash";

export default class Dialog extends Page{
    param(key, defaultValue = null,props = this.props){
        if(props.dialogMatch){
            return _.get(props,`dialogMatch.params.${key}`,defaultValue);
        }else{
            return super.param(key, defaultValue,props);
        }
    }
    dialogPath(props = this.props){
        return '/' + _.get(props,`location.hash`,"").replace('#','');
    }
}