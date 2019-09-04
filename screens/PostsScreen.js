import React from 'react';
import {ScrollView, Button, View, StyleSheet, Image, Text, Alert, TouchableHighlight} from 'react-native';
import ModalScreen from '../components/ModalView';
import Firebase from '../Firebase';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const styles = StyleSheet.create({
    card: {
        //backgroundColor: 'lightgrey',
        borderWidth: 1, 
        borderRadius: 8,
        overflow: "hidden",
        //height: 150,
        margin: 15,
    },
    buttonViewContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 1,
    }
})

export default class PostsScreen extends React.Component {
    
    constructor(props){
        super(props);
        //global.finalURL;
        //finalURL = "Hey Colc!";
        //let ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        // var storageRef = Firebase.storage().ref();
        // storageRef.child('images/test-image').getDownloadURL().then(function(url) {
        //     //return url;
        //     this.state = {j
        //         url: url,
        //     }
        // });

        this.state = {
            itemDataSource: 'ds',
            pickerSelection: 'Default Value',
            url: 'Default Value',
            test: 'ju',
        } 

        //var storageRef = Firebase.storage().ref();
        //this.myurl = storageRef.child('images/test-image').getDownloadURL();
        //console.log(this.myurl);
        global.gfinalURL;
        // storageRef.child('images/test-image').getDownloadURL().then(function(finalURL) {
        //     global.gfinalURL[0] = String(finalURL);
        //     //this.setState({url: finalURL})    
        //     console.log(finalURL + "x");
        //     //console.log(gfinalURL + "y");
        // });
        // console.log(global.finalURL[0]);

        this.renderRow = this.renderRow.bind(this);
        this.pressRow = this.pressRow.bind(this);
        //console.log(global.finalURL);

        // Firebase.database().ref('users/003').set(
        //     {
        //         name: 'Don Pablo',
        //         picture: require('../assets/images/Anesu_Murakata.jpg'),
        //         age: 89,
        //         // title: 'Dummy Match',
        //         // body: 'This is where the dummy post body will go',
        //         // category: 'Sport',
        //     }
        // ).then(() => {
        //     console.log('INSERTED!');
        // }).catch((error) => {
        //     console.log("Oh nO!");
        // });

        // To select data from firebase every time data has changed !
        // Firebase.database().ref('posts').on('value', (data) => {
        //     console.log(data.json());
        //     var output = data.toJSON();
        //     var my = 10;
        //     var single = output[1];
        //     console.log(single);
        // })

        global.myurl = 'https://firebasestorage.googleapis.com/v0/b/communityinform-41357.appspot.com/o/images%2Ftest-image?alt=media&token=5f05223d-bb7d-4fef-8982-bf8a676f4b0a';
        this.itemsRef = this.getRef().orderByChild('name').equalTo('Don Pablo');
        //console.log(this.itemsRef);
    }

    onChooseImagePress = async () => {
        const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        if (permission.status !== 'granted') {
        const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (newPermission.status === 'granted') {
        //its granted.
        let result = await ImagePicker.launchImageLibraryAsync();
        if (!result.cancelled) {
            this.uploadImage(result.uri, "test-image")
              .then(() => {
                Alert.alert("Success");
              })
              .catch((error) => {
                Alert.alert(error);
              });
          }
        }
        } else {
            let result = await ImagePicker.launchImageLibraryAsync();
            if (!result.cancelled) {
                this.uploadImage(result.uri, "test-image")
                  .then(() => {
                    Alert.alert("Success");
                  })
                  .catch((error) => {
                    Alert.alert(error);
                  });
              }
        }
        //let result = await ImagePicker.launchCameraAsync();
        //let result = await ImagePicker.launchImageLibraryAsync();
    

        
      }

    uploadImage = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();
    
        var ref = Firebase.storage().ref().child("images/" + imageName);
        return ref.put(blob);
    }

    downloadImage(){
        var storageRef = Firebase.storage().ref();
        storageRef.child('images/test-image').getDownloadURL().then((finalURL) => {
            //console.log(url); 
            this.setState({url: String(finalURL), test: 'new'});
            console.log(String(finalURL));
            console.log(this.state.test);
            //return finalURL;
        }) //.bind(this));
        //console.log(url); 
        //console.log(global.finalURL);   
    }

    getRef(){
        return Firebase.database().ref('users');
    }

    componentWillMount(){
    //    this.getItems(this.itemsRef);
        //this.uploadImage();
        this.downloadImage();
        console.log(this.state.test);
    }

    componentDidMount(){
       // this.uploadImage();
       this.downloadImage();
        console.log(this.state.url);
     //   this.getItems(this.itemsRef);
    }

    getItems(itemsRef){
        itemsRef.on('value', (snap) => {
            let items = [];
            snap.forEach((child) => {
                items.push({
                    title: child.val().title,
                    body: child.val().body,
                    _key: child.key,
                });
            });
            this.setState({
                itemDataSource: this.state.itemDataSource.cloneWithRows(items)
            });
        });
    }

    pressRow(item){
        console.log(item);
    }

    renderRow(item){
        return (
            <TouchableHighlight onPress={() => {
                    this.pressRow(item);
                }}>
                <View>
                    <Text>{item.title + " " + item.body}</Text>
                </View>
            </TouchableHighlight>
        );
    } 

    render(gfinalURL){
        return(
            <ScrollView>
                <View>
                    <View style={{width: '100%', alignItems: 'center', marginTop: 25, marginBottom: 25}}>
                        <Text style={{fontSize: 25}}>View Posts</Text>
                        <Text style={{fontSize: 15}}>{gfinalURL}</Text>
                    </View>
                    {/* <Text style={{fontSize: 20}}>View By Category:</Text> */}
                    <Text style={{fontSize: 20}}>Apply filter</Text>
                    <ModalScreen/>
                    {/* <Picker
                        style={{backgroundColor: 'red'}}
                        selectedValue={this.state.pickerSelection}
                        mode='dialog'
                        onValueChange={(itemValue, itemIndex) => this.setState({pickerSelection: itemValue})}>
                        <Picker.Item style={{marginTop: 5}}label='All' value='All'/>
                        <Picker.Item label='Entertainment' value='Entertainment'/>
                        <Picker.Item label='Sport' value='Sport'/>
                    </Picker> */}
                </View>


                <View style={{width: '100%', alignItems: 'center', marginTop: 25, marginBottom: 25}}>
                    <Text style={{fontSize: 25}}>Your Posts</Text>
                    <Button title='Upload Image' onPress={() => this.downloadImage()}/>
                </View>

                <View style={styles.card}>
                    <Image 
                        style={{width: '100%', height: 300}}
                        source={require("../assets/images/elon.jpg")}
                    />
                    <View style={{margin: 20}}>
                        <Text style={{fontSize: 20}}>Name: Prince Colc</Text>
                        <Text style={{fontSize: 17}}>Alias: Young Pablo</Text>
                        <Text>Age: Old enough</Text>
                        <Text style={{fontSize: 15, color: 'darkgrey'}}>Bio : "F* getting rich when I'm 40 man I'm tryna make it now" - Drake</Text>
                    </View>
                    <View>
                        <Button title='Delete'/>
                    </View>
                </View>

                <View>
                    <Image 
                        style={{width: '100%', height: 300}}
                        source={{uri: this.state.url}}
                    />
                </View>

               {/* <ListView 
                    dataSource = {this.state.itemDataSource}
                    renderRow = {this.renderRow}
               /> */}

                <View style={{width: '100%', alignItems: 'center', marginTop: 25, marginBottom: 25}}>
                    <Text style={{fontSize: 25}}>Posts By Others</Text>
                </View>

                <View style={styles.card}>
                    <Image 
                        resizeMode={'cover'}
                        style={{width: '100%', height: 300}}
                        source={require('../assets/images/elon.jpg')}
                    />
                    <View style={{margin: 20}}>
                        <Text style={{fontSize: 20}}>Name: Elon Musk</Text>
                        <Text style={{fontSize: 17}}>Alias: Real Life Tony Stark</Text>
                        <Text>Age: 48</Text>
                        <Text style={{fontSize: 15, color: 'darkgrey'}}>Bio : "Humanity is lucky to have me"</Text>
                    </View>

                    <View style={styles.buttonViewContainer}>
                        <View style={styles.buttonContainer}>
                            <Button title='Add Reminder'/>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title='Report'/>
                        </View>
                    </View>
                </View>

            </ScrollView>
        );
    }
}