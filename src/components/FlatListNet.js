/**
 * Created by whb on 2017/10/25.
 * https://github.com/WaterEye0o
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Dimensions,
    FlatList
} from 'react-native';
import List from './List';
import _ from 'lodash';
import {errorHandler} from '../logics/rpc'

export default class FlatListNet extends Component {
    static defaultProps = {
        status: 'loading',
        req: () => {},
        getData: (res) => res,
        enablePage: true,
        refreshKey: '',
        showBottom:true
    };
    static propTypes = {
        status: PropTypes.oneOf(['loading', 'result', 'appending', 'empty', 'error']),
        req: PropTypes.func,
        getData: PropTypes.func,
        enablePage: PropTypes.bool,
        showBottom: PropTypes.bool,
        refreshKey: PropTypes.string,
    };
    state = {
        status: this.props.status,
        data: [],
        appendStatus: 'loading',
    };
    page = 1;


    async componentDidMount() {
        await this.refresh().catch(errorHandler);
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.refreshKey !== this.props.refreshKey) {
            await this.refresh().catch(errorHandler);
        }
    }

    async refresh() {
        this.setState({status: 'loading'});
        const res = await this.props.req(this.page);
        await this.setState({data: this.props.getData(res)});
        await this.setState({status: 'result'});
    }

    async append() {
        this.setState({appendStatus: 'loading'});
        const res = await this.props.req(this.page).catch(errorHandler);
        let data = this.props.getData(res);
        if (data.length > 0) {
            this.setState({data: _.union(this.props.getData(res), this.state.data)});
            this.page++;
        } else {
            this.setState({appendStatus: 'end'});
        }

    }

    renderFooter() {
        if (this.props.enablePage) {
            if (this.state.appendStatus === 'loading') {
                return <List.AppendBottom/>
            } else if (this.state.appendStatus === 'end') {
                return <List.Bottom/>
            }
        } else {
            return <List.Bottom/>
        }
    }

    render() {
        if (this.state.status == 'loading') {
            return (
                <List.Loading/>
            )
        } else {
            return (
                <FlatList
                    {...this.props}
                    data={this.state.data}
                    onEndReached={async () => {
                        if (this.props.enablePage) {
                            await this.append();
                        }
                    }}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={() => this.props.showBottom?this.renderFooter():<View style={{marginBottom:80}}/>}
                />
            )
        }
    }
}

var styles = StyleSheet.create({});