/**
 * Created by fengzicheng on 2017/10/20.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import PropTypes from "prop-types";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

let curNum_lazy = 60;
let onLoop_lazy = false;
let dimin_timer = null;
function _diminLoop() {
    onLoop_lazy = true;
    if (curNum_lazy >= 1) {
        curNum_lazy--;
        dimin_timer = setTimeout(() => _diminLoop(), 1000);
    } else {
        curNum_lazy = 60;
        onLoop_lazy = false;
    }
}
export default class SendVerifCodeBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '获取验证码',
            _isOnLoop: false
        };
        this._curNum = 60;
    }

    _diminLoop() {
        if (this._curNum >= 1) {
            let text = `(${this._curNum})重获验证码`;
            this.setState({text: text});
            this._curNum--;
            this.timer = setTimeout(() => this._diminLoop(), 1000);
        } else {
            this._curNum = 60;
            this.setState({text: '重获验证码', _isOnLoop: false});
        }
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    async _onSendCodePress() {
        if (!this.state._isOnLoop) {
            this.setState({_isOnLoop: true});
            let data = await this.props.onRequest();
            if (!!data) {
                this._diminLoop();
            } else {
                this.setState({_isOnLoop: false});
            }
        }
    }

    startDiminLoop(needReStart) {
        this.setState({_isOnLoop: true});
        this._diminLoop();
        if (this.props.isLazy) {
            this._curNum = curNum_lazy;
            !onLoop_lazy && _diminLoop();
        } else {
            this._curNum = 60;
        }
        if (needReStart) {
            this._curNum = 60;
            if (dimin_timer) {
                clearTimeout(dimin_timer);
            }
            curNum_lazy = 60;
            onLoop_lazy = true;
            _diminLoop();
        }
    }

    render() {
        return (
            <TouchableOpacity
                {...this.props}
                disabled={this.state._isOnLoop}
                onPress={() => {this._onSendCodePress()}}
            >
                <Text style={this.props.textStyle}>
                    {this.state.text}
                </Text>
            </TouchableOpacity>
        )
    }
}

SendVerifCodeBtn.PropTypes = {
    name: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({});