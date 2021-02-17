import React, { Component } from 'react';
import { View, Text, StyleSheet, ToastAndroid, Dimensions } from 'react-native';
import MyButton from "./MyButton"
import * as MediaLibrary from "expo-media-library";
import { FlatList } from 'react-native-gesture-handler';
import FotoItem from './FotoItem';


class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: "grid",
            width: 100,
            array: [],
            toDelete: [],
            columns: Math.floor(Dimensions.get("window").width / 100)
        };
    }

    getPhotos = async () => {
        let obj = await MediaLibrary.getAssetsAsync({
            first: 100,
            mediaType: 'photo'
        })
        for (let x = 0; x < obj.assets.length; x++) {
            obj.assets[x].selected = false
        }
        this.setState({
            array: obj.assets
        })
    }

    changeNavigate = () => {
        this.props.navigation.navigate("Gallery")
    }

    changeDisplay = () => {
        if (this.state.display == "grid") {
            this.setState({
                display: "list",
                width: Dimensions.get("window").width,
                columns: 1
            })
        } else {
            this.setState({
                display: "grid",
                width: 100,
                columns: Math.floor(Dimensions.get("window").width / 100)
            })
        }
    }
    componentDidMount = () => {
        this.getPhotos()
    }

    refreshGallery = async () => {
        let obj = await MediaLibrary.getAssetsAsync({
            first: 100,
            mediaType: 'photo'
        })
        for (let x = 0; x < obj.assets.length; x++) {
            obj.assets[x].selected = false
        }
        this.setState({
            array: obj.assets
        })
    }

    openCamera = () => {
        this.props.navigation.navigate("CameraScreen", { data: "refresh", refresh: this.refreshGallery })
    }


    removeSelected = async () => {
        let del = await MediaLibrary.deleteAssetsAsync(this.state.toDelete);
        ToastAndroid.showWithGravity(
            'Zdjęcia usunięte.',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
        this.refreshGallery()
    }

    toBig = (adres, id, size) => {
        this.props.navigation.navigate("BigPhoto", { id: id, uri: adres, size: size, nav: this.navToGallery, remove: this.removeSelected })
        let temp = []
        temp.push(id)
        this.setState({
            toDelete: temp
        })
    }

    navToGallery = () => {
        this.props.navigation.navigate("Gallery")
    }

    adding(adres) {
        for (let x = 0; x < this.state.array.length; x++) {
            if (this.state.array[x].id == adres) {
                this.state.array[x].selected == true ?
                    this.state.array[x].selected = false :
                    this.state.array[x].selected = true
            }
        }
        this.setState({
        })
    }

    addSelected = (adres) => {
        let tempToDel = this.state.toDelete
        if (tempToDel.includes(adres)) {
            let index = tempToDel.indexOf(adres)
            tempToDel.splice(index, 1)
        } else {
            tempToDel.push(adres)
        }
        this.setState({
            toDelete: tempToDel
        })
        this.adding(adres)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.buttons}>
                    <MyButton name="GRID/LIST" width="33%" fun={this.changeDisplay} />
                    <MyButton name="OPEN CAMERA" width="34%" fun={this.openCamera} />
                    <MyButton name="REMOVE SELECTED" width="33%" fun={this.removeSelected} />
                </View>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                }}>
                    <FlatList
                        data={this.state.array}
                        renderItem={({ item }) => <FotoItem selected={item.selected} size={`${item.height}x${item.width}`} id={item.id} path={item.uri} key={this.state.x + item.id} width={this.state.width} bigPhoto={this.toBig} select={this.addSelected} />}
                        keyExtractor={item => this.state.x + item.id.toString()}
                        numColumns={this.state.columns}
                        key={this.state.columns}
                    />


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
        justifyContent: "space-around"
    },

})


export default Gallery;

