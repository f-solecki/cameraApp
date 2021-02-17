import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Permissions from "expo-permissions";
import CircleButton from "./CircleButton";
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { BackHandler, ToastAndroid } from "react-native"
import { Animated } from "react-native";
import RadioGroup from './RadioGroup'
import { ScrollView } from 'react-native-gesture-handler';

class CameraScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            pos: new Animated.Value(800),
            whiteBalance: [],
            cameraRatio: [{ name: '4:3', chosen: true }, { name: '16:9', chosen: false }],

            photoSize: [{ name: '320x240', chosen: true }],
            ratio: '4:3',
            wb: 'cloudy',
            size: '320x240',
        };
        this.isHidden = true
    }

    setSettings = () => {
        let balance = (Camera.Constants.WhiteBalance)
        balance = Object.keys(balance)
        let newBalance = []
        for (let x = 0; x < balance.length; x++) {
            if (x != 0)
                newBalance.push({ name: balance[x], chosen: false })
            else
                newBalance.push({ name: balance[x], chosen: true })
        }
        this.setState({
            whiteBalance: newBalance
        })
    }


    setPermissions = async () => {
        let { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status == 'granted' });

    }

    componentDidMount = async () => {
        this.setSettings()
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        this.setPermissions()
    }

    componentWillUnmount = async () => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        this.props.route.params.refresh()
        this.props.navigation.goBack()
        return true;
    }

    changeCamera = () => {
        this.setState({
            type: this.state.type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back,
        });
    }

    takephoto = async () => {
        if (this.camera) {
            let foto = await this.camera.takePictureAsync();
            let asset = await MediaLibrary.createAssetAsync(foto.uri); // domyslnie zapisuje w folderze DCIM
        }
        ToastAndroid.showWithGravity(
            'Zdjęcie zapisane.',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    }

    toSettings = () => {
        let toPos
        if (this.isHidden) toPos = 0; else toPos = 800


        Animated.spring(
            this.state.pos,
            {
                toValue: toPos,
                velocity: 1,
                tension: 0,
                friction: 10,
                useNativeDriver: true
            }
        ).start();

        this.isHidden = !this.isHidden;
    }
    changeBalance = (data) => {
        let temp
        for (let x = 0; x < data.length; x++) {
            if (data[x].chosen == true)
                temp = data[x].name
        }
        this.setState({
            wb: temp
        })
    }
    changeRatio = (data) => {
        let temp
        for (let x = 0; x < data.length; x++) {
            if (data[x].chosen == true)
                temp = data[x].name
        }
        this.setState({
            ratio: temp
        })
    }
    changeSize = (data) => {
        let temp
        for (let x = 0; x < data.length; x++) {
            if (data[x].chosen == true)
                temp = data[x].name
        }
        this.setState({
            size: temp
        })
    }
    getSizes = async () => {
        if (this.camera) {
            let sizes = await this.camera.getAvailablePictureSizesAsync(this.state.ratio)
            // this.sizes = sizes
            // sizes = Object.keys(sizes)
            let newSizes = []
            for (let x = 0; x < sizes.length; x++) {
                if (x != 0)
                    newSizes.push({ name: sizes[x], chosen: false })
                else
                    newSizes.push({ name: sizes[x], chosen: true })
            }
            this.actSize(newSizes)
        }
    };

    actSize = (tab) => {
        this.setState({
            photoSize: tab
        })
    }

    render() {
        const { hasCameraPermission } = this.state; // podstawienie zmiennej ze state
        console.disableYellowBox = true;
        if (hasCameraPermission == null) {
            return <View />;
        } else if (hasCameraPermission == false) {
            return <Text>brak dostępu do kamery</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera
                        onCameraReady={() => {
                            this.getSizes()
                        }
                        }
                        ratio={this.state.ratio}
                        whiteBalance={this.state.wb}
                        pictureSize={this.state.size}
                        ref={ref => {
                            this.camera = ref; // Uwaga: referencja do kamery używana później
                        }}
                        style={{ flex: 1 }}
                        type={this.state.type}>
                        <View style={{ flex: 1, display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "flex-end" }}>
                            <CircleButton name="change" fun={() => this.changeCamera} />
                            <CircleButton name="photo" fun={this.takephoto} />
                            <CircleButton name="settings" fun={this.toSettings} />
                        </View>
                        <Animated.View
                            style={[
                                styles.animatedView,
                                {
                                    transform: [
                                        { translateY: this.state.pos }
                                    ]
                                }]} >
                            <ScrollView>

                                <Text style={{ fontSize: 20, color: 'white' }}>SETTINGS</Text>
                                <RadioGroup data={this.state.whiteBalance} changeSettings={this.changeBalance} groupName="White Balance"></RadioGroup>
                                <RadioGroup data={this.state.photoSize} changeSettings={this.changeSize} groupName="Photo Size"></RadioGroup>
                                <RadioGroup data={this.state.cameraRatio} changeSettings={this.changeRatio} groupName="Ratio"></RadioGroup>

                            </ScrollView>

                        </Animated.View>



                    </Camera>
                </View>
            );
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    animatedView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        width: 250,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        height: 800,
        paddingBottom: 100
    }
})


export default CameraScreen;

