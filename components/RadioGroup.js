import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import RadioButton from './RadioButton'
import { FlatList } from 'react-native-gesture-handler';
class RadioGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        };
    }

    change = (target) => {
        let temp = this.state.data
        for (let x = 0; x < temp.length; x++) {
            if (temp[x].name != target)
                temp[x].chosen = false
            else
                temp[x].chosen = true
        }
        this.setState({
            data: temp
        })
        this.props.changeSettings(temp)
    }

    render() {
        console.log(this.props.data)
        return (
            <View>

                <Text style={{ borderTopWidth: 5, borderTopColor: 'white', paddingTop: 5, color: 'white', fontSize: 25, textAlign: 'right' }}>{this.props.groupName}</Text>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => <RadioButton name={item.name} chosen={item.chosen} fun={this.change} />}
                    keyExtractor={item => item.name}
                />
            </View>
        );
    }
}



export default RadioGroup;