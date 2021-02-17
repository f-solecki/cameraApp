import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
class RadioButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            this.props.chosen ?
                <View style={styles.container}>

                    <TouchableOpacity style={{
                        marginTop: 10,
                        marginBottom: 10,
                        width: 30,
                        borderRadius: 30,
                        borderColor: 'lightpink',
                        borderWidth: 2,
                        height: 30,
                        marginLeft: 5,
                        paddingLeft: 5,
                        paddingRight: 5,
                        justifyContent: "center",
                    }}>
                        <View style={{
                            width: 20,
                            backgroundColor: 'lightpink',
                            height: 20,
                            borderRadius: 20,
                            marginLeft: -2
                        }}></View>
                    </TouchableOpacity>
                    <Text style={styles.textes}>{this.props.name}</Text>
                </View>
                :
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => this.props.fun(this.props.name)} style={{
                        marginTop: 10,
                        marginBottom: 10,
                        width: 30,
                        borderRadius: 30,
                        borderColor: 'lightpink',
                        borderWidth: 2,
                        height: 30,
                        marginLeft: 5,
                        paddingLeft: 5,
                        paddingRight: 5,
                        justifyContent: "center",
                    }}>

                    </TouchableOpacity>
                    <Text style={styles.textes}>{this.props.name}</Text>
                </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    textes: {
        color: 'white',
        fontSize: 20,
        marginLeft: 10
    }
})


export default RadioButton;