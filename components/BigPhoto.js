import React, { Component } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { Dimensions } from 'react-native';
import MyButton from './MyButton';
import * as Sharing from 'expo-sharing';

class BigPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    delete = async () => {
        this.props.route.params.remove()
        this.props.route.params.nav()
    }

    share = async () => {
        console.log("share")
        Sharing.shareAsync(this.props.route.params.uri)
    }

    render() {
        console.log(this.props.route.params)
        return (
            <View style={styles.container}>
                <Image
                    style={{
                        width: Dimensions.get("window").width,
                        height: Dimensions.get("window").height - 150

                    }}
                    source={{ uri: this.props.route.params.uri }}
                />
                <Text style={{ position: 'absolute', top: 710, backgroundColor: 'rgba(0,0,0,0.3)', right: 0, color: 'white', fontSize: 30 }}>{this.props.route.params.size}</Text>
                <View style={styles.buttons}>
                    <MyButton name="Share" width="50%" fun={this.share} />
                    <MyButton name="Delete" width="50%" fun={this.delete} />
                </View>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-start"

    }


})


export default BigPhoto;

