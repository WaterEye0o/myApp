/**
 * Created by whb on 2017/11/11.
 * https://github.com/WaterEye0o
 */

import React, {Component, PropTypes} from 'react';

import {
    View,
    StyleSheet,
    Dimensions, Text, ScrollView
} from 'react-native';
import Page from "../../components/Basic/Page";
import Container from "../../components/Basic/Container";


export default class List extends Page {
    render() {
        return (
            <Container>
                <ScrollView>
                    <View style={{
                        height: 150,
                        backgroundColor: 'black',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: -10
                    }}/>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{color: '#fff', marginTop: 60}}>
                            吴华彬
                        </Text>
                        <View style={{
                            height: 150,
                            maxWidth: '95%',
                            width: 500,
                            borderRadius: 5,
                            marginTop: 5,
                            backgroundColor: '#fff'
                        }}/>


                    </View>
                </ScrollView>
            </Container>
        )
    }

}