import React from 'react';
import { StyleSheet, Text, View, Picker, Modal, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        flexDirection: 'row',
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        //alignItems: 'center',
        //justifyContent: 'center',
    },
})

export default class ModalScreen extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          pickerSelection: 'All',
          pickerDisplayed: false
        }
      }

      setPickerValue(newValue) {
        this.setState({
          pickerSelection: newValue
        })
    
        this.togglePicker();
      }
    
      togglePicker() {
        this.setState({
          pickerDisplayed: !this.state.pickerDisplayed
        })
      }
    
      render() {
        const pickerValues = [
          {
            title: 'Entertainment',
            value: 'Entertainment'
          },
          {
            title: 'Sport',
            value: 'Sport'
          },
          {
            title: 'Referral',
            value: 'Referral'
          }
        ]
    
        return (
          <View style={styles.container}>
            <View style={styles.viewContainer}>
            <Text style={{fontSize: 20, width:"80%"}}>Select category: { this.state.pickerSelection }</Text>
            <Button 
                style={{marginLeft: 15}}
                icon={
                    <Icon
                    name="chevron-down"
                    size={10}
                    color="white"
                    />
                }
                onPress={() => this.togglePicker()} 
                />
            </View>

            {/* <Picker
              style={{ backgroundColor: '#fafafa', position: 'absolute', bottom: 0, left: 0, right: 0 }}
              selectedValue={ this.state.pickerSelection }
              onValueChange={(itemValue, itemIndex) => this.setState({ pickerSelection: itemValue})}>
              <Picker.Item label="Chicken" value="chicken" />
              <Picker.Item label="Eggs" value="eggs" />
              <Picker.Item label="Vegetables" value="vegetables" />
            </Picker> */}
    
            <Modal visible={this.state.pickerDisplayed} animationType={"slide"} transparent={true}>
              <View style={{ margin: 20, padding: 20,
                backgroundColor: '#efefef',
                bottom: 20,
                left: 20,
                right: 20,
                alignItems: 'center',
                position: 'absolute' }}>
                <Text>Please pick a value</Text>
                { pickerValues.map((value, index) => {
                  return <TouchableHighlight key={index} onPress={() => this.setPickerValue(value.value)} style={{ paddingTop: 4, paddingBottom: 4 }}>
                      <Text>{ value.title }</Text>
                    </TouchableHighlight>
                })}
    
                
                <TouchableHighlight onPress={() => this.togglePicker()} style={{ paddingTop: 4, paddingBottom: 4 }}>
                  <Text style={{ color: '#999' }}>Cancel</Text>
                </TouchableHighlight>
              </View>
            </Modal>
          </View>
        );
      }
    } 