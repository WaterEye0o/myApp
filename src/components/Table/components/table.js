import React, {Component} from 'react';
import {View, Text} from 'react-native';

class Table extends Component {
    static propTypes = {
        style: View.propTypes.style,
        borderStyle: View.propTypes.style,
    };

    static defaultProps = {
        borderStyle: {borderWidth: 1},
    };

    _renderChildren(props) {
        return React.Children.map(props.children, child => {
            if (props.borderStyle && child.type.displayName =='View') {
                return React.cloneElement(child, {
                    borderStyle: props.borderStyle
                })
            } else {
                return React.cloneElement(child)
            }
        })
    }

    render() {
        let borderWidth, borderColor;
        borderWidth = this.props.borderStyle.borderWidth;
        if (this.props.borderStyle && this.props.borderStyle.borderColor) {
            borderColor = this.props.borderStyle.borderColor;
        } else {
            borderColor = '#000';
        }

        return (
            <View style={[
                this.props.style,
                {
                    borderLeftWidth: borderWidth,
                    borderBottomWidth: borderWidth,
                    borderColor: borderColor
                }
            ]}>
                {this._renderChildren(this.props)}
            </View>
        )
    }
}

class TableWrapper extends Component {
    static propTypes = {
        style: View.propTypes.style,
    };

    _renderChildren(props) {
        return React.Children.map(props.children, child => {
            if (props.borderStyle) {
                return React.cloneElement(child, {
                    borderStyle: props.borderStyle
                })
            } else {
                return React.cloneElement(child)
            }
        })
    }

    render() {
        const {style} = this.props;
        return (
            <View style={style}>
                {this._renderChildren(this.props)}
            </View>
        );
    }
}

export {Table, TableWrapper};
