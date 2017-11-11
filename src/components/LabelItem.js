/**
 * Created by fengzicheng on 2017/10/20.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import PropTypes from "prop-types";

const WIDTH = Dimensions.get('window').width;

export default class LabelItem extends Component {

    static defaultProps = {
        disabled: false,
        noBottomBorder: false,
        isNeedMarginRight: false,
        showUnit: false,
        title: '',
        value: '',
        content: '',
    };

    constructor(props) {
        super(props);
        this.state = {
            keyValue: this.props.value || '',
        };
        this.setValue = this.setValue.bind(this);
    }

    componentWillReceiveProps(props) {
        if (props.value !== this.state.keyValue) {
            this.setState({keyValue: props.value});
        }
    }

    setValue(text) {
        this.setState({keyValue: text});
    }

    render() {
        return (
            <TouchableOpacity {...this.props}>
                <View style={[styles.listView,{borderBottomWidth:!!this.props.noBottomBorder?0:StyleSheet.hairlineWidth}]}>
                    <View style={styles.listTextView}>
                        <Text style={[styles.listText,this.props.titleFont]}>{this.props.title}</Text>
                    </View>
                    <View style={{flex: 1,flexDirection: 'row',justifyContent: 'flex-end', marginRight: 15}}>
                        <Text style={styles.rightText}>{this.state.keyValue}</Text>
                        <Text style={[styles.rightText,this.props.RightTextStyle]}>{this.props.content}</Text>
                        {this.props.showUnit && <Text style={{fontSize:10,color:'#999',marginTop:5}}>万元</Text>}
                        {!this.props.disabled &&
                            <Image source={require('../res/images/right_grayArrow.png')} style={styles.pointIcon}/>
                        }
                        {!!this.props.isNeedMarginRight &&
                            <View style={{width: 8}} />
                        }
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

LabelItem.PropTypes = {
    disabled: PropTypes.bool,
    noBottomBorder: PropTypes.bool,
    isNeedMarginRight: PropTypes.bool,
    showUnit: PropTypes.bool,
    title: PropTypes.string,
    value: PropTypes.string,
    content: PropTypes.string,
    RightTextStyle: View.propTypes.style,
    titleFont: Text.propTypes.style,
};

const styles = StyleSheet.create({
    listView: {
        width: WIDTH,
        height: 44,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: '#ddd',
    },
    listTextView: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 15,
    },
    listText: {
        fontSize: 16,
        color: '#333'
    },
    rightText: {
        color: '#969696',
        fontSize: 14,
        marginRight: 15,
        textAlign: 'right'
    },
    pointIcon: {},
});