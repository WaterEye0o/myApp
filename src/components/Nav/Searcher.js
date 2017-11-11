import React from "react";
import {TextInput, View, Platform} from "react-native";
import Icon from "../Icon";
import PropTypes from "prop-types";

export default class Searcher extends React.Component {
    static defaultProps = {
        inputStyle: null,
        placeholder: null,
    };
    static propTypes = {
        inputStyle: PropTypes.object,
        placeholder: PropTypes.string,
    };

    render() {
        return <View style={[{
            backgroundColor:"#fff",
            flex:1,
            flexDirection:"row",
            alignItems:"stretch",
            marginVertical:5,
            marginLeft:10,
            marginRight:10,
            marginTop:7,
            marginBottom:7,
            borderRadius:5,
        },this.props.style]}>
            <Icon icon="fa-search" color="#7d7d7d" size={30/2} style={{marginHorizontal:8,alignSelf:"center"}}/>
            <TextInput {...this.props}
                style={[{flex:1,fontSize:13,height:Platform.OS=='ios'?32:36},this.props.inputStyle]}
                placeholder={this.props.placeholder}
                underlineColorAndroid="transparent"
            />
        </View>;
    }
}