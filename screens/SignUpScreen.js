import React from 'react';
import {Button, Text, View} from 'react-native';
import Firebase from '../Firebase';
import MainTabNavigator from '../navigation/MainTabNavigator';
import StackNavigator from 'react-navigation';
import {FormLabel, FormInput, Input} from 'react-native-elements';

export default class SignUpScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {email:'', password:'', error:'', loading:false};
    }

    initFirebase(){
        this.props.navigation.navigate('App');
    }

    onSignInPress(){
        this.setState({error:'', loading:true})

        const {email, password} = this.state;
        Firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            this.setState({error:'',loading:false});
            //this.props.navigation.navigate('App');
        })
        .catch(() => {
            this.setState({error:"Authentication failed", loading:false});

        })

        Firebase.auth().onAuthStateChanged(user => {
            if (user) {
                user.getIdTokenResult().then(idTokenResult => {
                    if (idTokenResult.claims.admin == 'true') {
                        this.props.navigation.navigate('Admin');
                    }
                    else {
                        this.props.navigation.navigate('App');
                    } 
                })
            }});
    }

    onSignUpPress(){
        this.setState({error:'', loading:true})

        const {email, password} = this.state;
        Firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            this.setState({error:'',loading:false});
            this.props.navigation.navigate('Auth');
        })
        .catch(() => {
            this.setState({error:"Authentication failed", loading:false});

        })
    }

    renderButtonOrLoading(){
        if (this.state.loading){
            return <Text>Loading</Text>
        }
        return <View>
            <Button
                onPress={this.onSignInPress.bind(this)} title='Sign In'/>
            <Button
            onPress={this.onSignUpPress.bind(this)} title='Sign Up'/>
        </View>
    }

    render(){
        return(
            <View>
            <Button title='WayUp'/>
                <Input placeholder="Email" value={this.state.email} onChangeText={email => this.setState({email})}/>
                <Input placeholder="Password" value={this.state.password } onChangeText={password => this.setState({password})}/>
                {this.renderButtonOrLoading()}
            </View>
            );
            {/* <View>
                <FormLabel>Email</FormLabel>
                <FormInput onChangeText={email => this.setState({email})} />
                <FormLabel>Password</FormLabel>
                <FormInput onChangeText={password => this.setState({password})} />
                {this.renderButtonOrLoading()}
            </View>  */}
    }
}
