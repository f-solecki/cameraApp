import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
class CircleButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        console.log(this.props.name)
        const name = "./../images/" + this.props.name + ".png"
        return (
            <TouchableOpacity onPress={this.props.fun} style={{
                marginTop: 10,
                marginBottom: 10,
                borderColor: "blue",
                borderRadius: 10,
                backgroundColor: "lightpink",
                width: 50,
                borderRadius: 50,
                height: 50,
                justifyContent: "center",
            }}>
                {this.props.name == "change" ?
                    <Image
                        style={{ position: "absolute", left: 5, width: 40, height: 40 }}
                        source={require('./../images/change.png')}
                    /> : this.props.name == "photo" ?
                        <Image
                            style={{ position: "absolute", left: 2.5, width: 45, height: 45 }}
                            source={require('./../images/photo.png')}
                        /> : <Image
                            style={{ position: "absolute", left: 2.5, width: 45, height: 45 }}
                            source={require('./../images/settings.png')}
                        />


                }

            </TouchableOpacity>
        );
    }
}
CircleButton.propTypes = {
    name: PropTypes.string.isRequired,
    fun: PropTypes.func.isRequired,
};


export default CircleButton;