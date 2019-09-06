import React from 'react';
import {View, ScrollView, Text, ListView} from 'react-native';
import { AppConsumer } from '../components/Context';
import ModalScreen from '../components/ModalView';

export default class ViewPosts extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    render() {
        return (
            <AppConsumer>
                {(context) => (
                    <ScrollView>
                        <View>
                            <View style={{width: '100%', alignItems: 'center', marginTop: 25, marginBottom: 25}}>
                                <Text style={{fontSize: 25}}>View Posts</Text>
                            </View>
    
                            <ModalScreen/>
                            
                            <ListView 
                                dataSource = {context.dataSource}
                                renderRow = {context.renderRow}
                            />
                        </View>
                    </ScrollView>
                )}
            </AppConsumer>
        );
    }
}