import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MyButton from "./MyButton"
import * as Permissions from "expo-permissions";


class FotoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    photo = () => {
        this.props.bigPhoto(this.props.path, this.props.id.toString(), this.props.size)
    }

    longPress = () => {
        this.props.select(this.props.id.toString())
    }
    render() {
        return (
            <TouchableOpacity onPress={this.photo} onLongPress={this.longPress} style={{ flex: 1, width: this.props.width, }}>
                <Image
                    style={{
                        width: this.props.width,
                        height: this.props.width == 100 ? 100 : 200,
                        marginBottom: 5,
                        opacity: this.props.selected == false ? 1 : 0.5

                    }}
                    source={{ uri: this.props.path }}
                />
                {this.props.selected == false ?
                    null
                    :
                    <View style={{ position: 'absolute', width: this.props.width, height: this.props.width == 100 ? 100 : 200, top: 0, left: 0, right: 0, bottom: 0, justifyContent: "center", alignItems: "center" }}>
                        <Image
                            style={{ width: 50, height: 50 }}
                            source={require('./../images/plus.png')}
                        />
                    </View>

                }
            </TouchableOpacity>

        );
    }
}
const styles = StyleSheet.create({



})


export default FotoItem;

