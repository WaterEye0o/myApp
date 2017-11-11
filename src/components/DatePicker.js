'use strict';

import React, {Component} from 'react';
import ReactNative, {
    View,
    DatePickerIOS,
    Animated,
    Modal,
    LayoutAnimation,
    TouchableOpacity,
    Text,
    DatePickerAndroid,
    Platform,
    StyleSheet
} from 'react-native';

//毫秒
const SHOW_ANIMATION_DURATION = 300;
const CLOSE_ANIMATION_DURATION = SHOW_ANIMATION_DURATION;

/*
 description:
 主要实现了时间选择器的功能
 只需调用show方法即可弹出时间选择器,
 在show方法中第一个参数为时间选择器关闭完成后的回调方法,里面提供了它所选择的时间,如果没有操作就返回null
 */

export default class DatePicker extends React.Component {
    constructor(props) {
        super(props);
        this._selectedDate = this.props.date || new Date(2000, 0, 1);

        this.state = {
            date: this.props.date || new Date(2000, 0, 1),
            visible: false,
            animated: new Animated.Value(-200)
        };
    }

    show(onCloseCallBack) {
        this.onCloseCallBack = onCloseCallBack;
        if (Platform.OS === 'ios') {
            this.setState({visible: true});
            Animated.timing(
                this.state.animated,
                {
                    toValue: 0,
                    duration: SHOW_ANIMATION_DURATION
                }
            ).start()
        } else {
            this.showAndroidDatePicker();
        }
    }

    close() {
        Animated.timing(
            this.state.animated,
            {
                toValue: -200,
                duration: CLOSE_ANIMATION_DURATION
            }
        ).start(this._onCloseAnimationEnd.bind(this));
    }

    async showAndroidDatePicker() {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: this._selectedDate,
                maxDate: this.props.maxDate
            });
            if (action === DatePickerAndroid.dismissedAction) {
                this.onCloseCallBack(null);
            } else {
                var date = new Date(year, month, day);
                this.setState({date: date});
                this._selectedDate = date;
                this.onCloseCallBack(date);
            }
        } catch (e) {
            console.warn(`Error in datePicker': `, e.message);
        }
    }

    _onCloseAnimationEnd() {
        this.setState({visible: false});
        this.onCloseCallBack(this._selectedDate);
    }

    _onConfirmBtnPressed() {
        this._selectedDate = this.state.date;
        this.close();
    }

    render() {
        const backgroundColorAnimated = {
            inputRange: [-200, 0],
            outputRange: ['#3330', '#3339']
        };

        return (
            <Modal
                transparent={true}
                visible={this.state.visible}
                onRequestClose={() => {
                }}
            >
                <Animated.View
                    style={[
                        styles.main,
                        {backgroundColor: this.state.animated.interpolate(backgroundColorAnimated)}
                    ]}
                >
                    <View style={{flex: 1}} onStartShouldSetResponder={this.close.bind(this)}/>
                    <Animated.View style={{marginBottom: this.state.animated}}>
                        <View style={styles.headerView}>
                            <TouchableOpacity style={styles.btn} onPress={this.close.bind(this)}>
                                <Text>取消</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btn} onPress={this._onConfirmBtnPressed.bind(this)}>
                                <Text>确定</Text>
                            </TouchableOpacity>
                        </View>
                        <DatePickerIOS
                            mode="date"
                            {...this.props}
                            style={styles.datePicker}
                            date={this.state.date}
                            onDateChange={(date) => this.setState({date: date})}
                            maximumDate={this.props.maxDate || new Date()}
                        />
                    </Animated.View>
                </Animated.View>
            </Modal>
        )
    }
}

DatePicker.propType = {};

var styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    datePicker: {
        backgroundColor: '#fff'
    },
    headerView: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'whitesmoke',
    },
    btn: {
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
});