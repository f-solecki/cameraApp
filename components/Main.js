import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MyButton from "./MyButton"
import * as Permissions from "expo-permissions";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontloaded: false

        };
    }
    setPermissions = async () => {
        let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            alert('brak uprawnień do czytania obrazów z galerii')
        }
    }
    changeNavigate = () => {
        this.props.navigation.navigate("Gallery")
    }
    componentDidMount = async () => {
        this.setPermissions()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{ fontSize: 60, textAlign: "center" }}>Camera App</Text>
                    <Text style={{ fontSize: 20, textAlign: "center" }}>show gallery pictures</Text>
                    <Text style={{ fontSize: 20, textAlign: "center" }}>take pictures from camera</Text>
                    <Text style={{ fontSize: 20, textAlign: "center" }}>save photo to device</Text>
                    <Text style={{ fontSize: 20, textAlign: "center" }}>delete photo from device</Text>
                    <Text style={{ fontSize: 20, textAlign: "center" }}>share photo</Text>
                </View>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <MyButton name="Start" width="50%" fun={this.changeNavigate} />
                </View>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    header: {
        backgroundColor: "lightpink",
        justifyContent: "center",
        flex: 1,
        alignItems: "center",

    }

})


export default Main;

