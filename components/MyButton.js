import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
class MyButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        return (
            <TouchableOpacity onPress={this.props.fun} style={{
                marginTop: 10,
                marginBottom: 10,
                borderColor: "blue",
                borderRadius: 10,
                backgroundColor: "lightpink",
                width: this.props.width,
                height: 50,
                justifyContent: "center",
            }}>
                <Text style={{
                    textAlign: "center", fontSize: 20,
                }}>{this.props.name}</Text>
            </TouchableOpacity>
        );
    }
}
MyButton.propTypes = {
    name: PropTypes.string.isRequired,
    fun: PropTypes.func.isRequired,
};


export default MyButton;