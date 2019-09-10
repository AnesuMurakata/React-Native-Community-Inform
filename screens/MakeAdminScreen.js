import React from 'react';
import {Button, Text, View} from 'react-native';
import {Firebase} from '../Firebase';
import {Input} from 'react-native-elements';

<section>
<script src="https://www.gstatic.com/firebasejs/6.6.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/6.6.0/firebase.js"></script>
<script src="https://www.gstatic.com/firebasejs/6.6.0/firebase-functions.js"></script>
{/* <script src="https://www.gstatic.com/firebasejs/6.4.2/firebase-app.js"></script> */}

<script src="/__/firebase/6.4.1/firebase-auth.js"></script>
</section> 

const firebase = require("firebase");
// Required for side-effects
require("firebase/functions");
//var functions = firebase.functions();

export default class MakeAdmin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
        };
    }

    onMakeAdmin(){
        const {email} = this.state;
        //const firebase = require("../node_modules/firebase-functions");
        //const functions = firebase.functions();
        const addAdminRole = firebase.functions().httpsCallable('addAdminRole');
        addAdminRole({email: email}).then(result => {
            console.log(result);
        });
    }

    render(){
        return(
            <View>
                <Input placeholder="Email" value={this.state.email} onChangeText={email => this.setState({email})}/>
                <Button onPress={this.onMakeAdmin.bind(this)} title='Make Admin'/>
            </View>
        );
    }
}