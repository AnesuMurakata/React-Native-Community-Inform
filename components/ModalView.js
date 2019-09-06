import React from 'react';
import { StyleSheet, Text, View, Picker, Modal, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppConsumer } from './Context';

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
          category: 'All',
          pickerDisplayed: false
        }
      }

      setPickerValue(newValue) {
        this.setState({
          category: newValue
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
          <View>
          <AppConsumer>
            {(context) => (
            <View style={styles.container}>
              <View style={styles.viewContainer}>
              <Text style={{fontSize: 20, width:"80%"}}>Select category: { this.state.category }</Text>
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
                    return <TouchableHighlight key={index} onPress={() => 
                              {
                              this.setPickerValue(value.value);
                              context.setFilter(value.value);
                              }
                              } 
                              style={{ paddingTop: 4, paddingBottom: 4 }}>
                        <Text>{ value.title }</Text>
                      </TouchableHighlight>
                  })}
      
                  
                  <TouchableHighlight onPress={() => this.togglePicker()} style={{ paddingTop: 4, paddingBottom: 4 }}>
                    <Text style={{ color: '#999' }}>Cancel</Text>
                  </TouchableHighlight>
                </View>
              </Modal>
            </View>
            )}
          </AppConsumer>
          </View>
        );
      }
    } 
