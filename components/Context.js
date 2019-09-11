import React from 'react';
import {ListView, TouchableHighlight, View, Text, StyleSheet, Button, Alert, Image} from 'react-native';
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

export const AppContext = React.createContext();
export const AppConsumer = AppContext.Consumer;

export class AppProvider extends React.Component {
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        let as = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        global.postCount = 15;
        this.state = {
            postDataSource: as,
            category: 'All',
            postCount: ds,
            postImageUrl: 'a',
            locationFilter: 'a',
            province: 'Western Cape',
            city: 'Cape Town',
            suburb: 'Rondebosch',
        };

        global.postTitle = "Great Electrician";
        global.postBody = "I recently got my re-wiring done by Alex and he did a great job!";
        global.postCategory = "Referral";

        // Load every post initially
        global.categoryRef; //= this.getRef().orderByChild('title');
        global.refForAll;

        global.postCountRef = Firebase.database().ref('count').orderByChild('postCount');

        this.setFilter = this.setFilter.bind(this);
    }

    getRef(){
        return Firebase.database().ref('posts');
    }

    componentWillMount(){
        this.getPostsByLocation('Western Cape', 'All', 'All');
        //this.addPost(global.postTitle, global.postBody, global.postCategory, 15, 'Gauteng', 'Johannesburg', 'Sandton');
        //this.getItems(global.categoryRef);
        //this.getPostCount(global.postCountRef);
        //this.storePostCount();
    }

    componentDidMount(){
        //this.getItems(global.categoryRef);
        //this.getPostCount(global.postCountRef);
        //this.storePostCount();
    }

    // Get posts with the selected category from database
    getItems(categoryRef){
        categoryRef.on('value', (snap) => {
            let items = [];
            snap.forEach((child) => {
                items.push({
                    title: child.val().title,
                    body: child.val().body,
                    imageUrl: child.val().imageUrl,
                    _key: child.key,
                });
            });
            this.setState({
                postDataSource: this.state.postDataSource.cloneWithRows(items)
            });
            //console.log(items[0].title);
        });
    }

    getFilteredItems(categoryRef, category){
        categoryRef.on('value', (snap) => {
            let items = [];
            snap.forEach((child) => {
                // Filter on the client side by category
                if(child.val().category == category) {
                    items.push({
                        title: child.val().title,
                        body: child.val().body,
                        imageUrl: child.val().imageUrl,
                        _key: child.key,
                    });
                }
            });
            this.setState({
                postDataSource: this.state.postDataSource.cloneWithRows(items)
            });
            //console.log(items[0].title);
        });
    }

    getPostsByLocation(province, city, suburb){
        if(city == 'All' && suburb == 'All'){
            this.setState({locationFilter: 'province', province: province});
            global.categoryRef = this.getRef().orderByChild('province').equalTo(province);
            this.getItems(global.categoryRef);
        }
        if(city != 'All' && suburb == 'All'){
            this.setState({locationFilter: 'city', city: city});
            global.categoryRef = this.getRef().orderByChild('city').equalTo(city);
            this.getItems(global.categoryRef);
        }
        if(city != 'All' && suburb != 'All'){
            this.setState({locationFilter: 'suburb', suburb: suburb});
            global.categoryRef = this.getRef().orderByChild('suburb').equalTo(suburb);
            this.getItems(global.categoryRef);
        }
    }

    getPostsByProvince(province){
        global.categoryRef = this.getRef().orderByChild('province').equalTo(province);
        this.getItems(global.categoryRef);
    }

    getPostsByCity(city){
        global.categoryRef = this.getRef().orderByChild('city').equalTo(city);
        this.getItems(global.categoryRef);
    }

    getPostsBySuburb(suburb){
        global.categoryRef = this.getRef().orderByChild('suburb').equalTo(suburb);
        this.getItems(global.categoryRef);
    }

    pressRow(item){
        console.log(item);
    }

    renderRow(item){
        return (
            <TouchableHighlight onPress={() => {
                    this.pressRow(item);
                }}>
                <View style={styles.card}>
                    <Image 
                        style={{width: '100%', height: 300}}
                        source={{uri: item.imageUrl}}
                    />
                    <View style={{margin: 20}}>
                        <Text style={{fontSize: 20}}>{item.title}</Text>
                        <View
                            style={{
                                borderBottomColor: 'grey',
                                borderBottomWidth: 1,
                                marginBottom: 5,
                            }}/>
                        <Text style={{fontSize: 17}}>{item.body}</Text>
                    </View>
                    <View>
                        <Button title='Delete'/>
                    </View>
                </View>
            </TouchableHighlight>
        );
    } 

    setFilter = async (selectedCategory) => {
        if(selectedCategory == 'All'){
            var locationValue = this.state.locationFilter;
            switch(locationValue){
                case 'province':
                    this.getPostsByProvince(this.state.province);
                    break;
                case 'city':
                    this.getPostsByCity(this.state.city);
                    break;
                case 'suburb':
                    this.getPostsBySuburb(this.state.suburb);
                    break;
            }
            // global.refForAll = this.getRef().orderByChild('title');
            // this.getItems(global.refForAll);
        }
        else{
            // Wait for state to be changed before proceeding
            await this.setState({category: selectedCategory});
            this.selectPosts(this.state.category);
        }
    }

    selectPosts(selectedCategory){
        var locationValue = this.state.locationFilter;
        switch(locationValue){
            case 'province':
                global.categoryRef = this.getRef().orderByChild('province').equalTo(this.state.province);
                this.getFilteredItems(global.categoryRef, selectedCategory);
                break;
            case 'city':
                global.categoryRef = this.getRef().orderByChild('city').equalTo(this.state.city);
                this.getFilteredItems(global.categoryRef, selectedCategory);
                break;
            case 'suburb':
                global.categoryRef = this.getRef().orderByChild('suburb').equalTo(this.state.suburb);
                this.getFilteredItems(global.categoryRef, selectedCategory);
                break;
        }
        // Select posts with the selected category from the database
        // global.categoryRef = this.getRef().orderByChild('category').equalTo(selectedCategory);
        // this.getItems(global.categoryRef);
        // console.log(global.categoryRef);
    }

    // Method to add Posts to database
    addPost(title, body, category, postNumber, province, city, suburb){
        this.onChooseImagePress();
        Firebase.database().ref('posts/' + postNumber).set(
            {
                title: title,
                body: body,
                category: category,
                postNumber: postNumber,
                imageUrl: this.state.postImageUrl,
                province: province,
                city: city,
                suburb: suburb,
            }
        ).then(() => {
            console.log('Post was INSERTED!');    
        }).catch((error) => {
            console.log("Oh nO!");
        });   
    }

    getPostCount(postCountRef){
        console.log("Initial postCount is, " + global.postCount);
        //global.itemsL = [];
        postCountRef.once('value', (snap) => {
            let items = [];
            snap.forEach((child) => {
                global.postCount = child.val().postCount;
                items.push({
                    postCount: child.val().postCount,
                    _key: child.key,
                });
            });
            this.setState({
                postCount: this.state.postCount.cloneWithRows(items)
            });
            global.postCount = items[0].postCount;
            console.log("Afterwards postCount is now, " + global.postCount);
            //this.addPost(global.postTitle, global.postBody, global.postCategory, global.postCount);
        });
    }

    storePostCount(){
        Firebase.database().ref('count/001').set(
            {
                postCount: global.postCount,
                test: 'hie',
            }
        ).then(() => {
            console.log('Post count was INSERTED!');
        }).catch((error) => {
            console.log("Oh nO!");
        });
    }

    onChooseImagePress = async () => {
        const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        if (permission.status !== 'granted') {
        const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (newPermission.status === 'granted') {
        //its granted.
        let result = await ImagePicker.launchImageLibraryAsync();
        if (!result.cancelled) {
            this.uploadImage(result.uri, "postImage")
              .then(() => {
                Alert.alert("Success");
              })
              .catch((error) => {
                Alert.alert(error);
              });
              //return imageUrl1;
          }
        }
        } else {
            let result = await ImagePicker.launchImageLibraryAsync();
            if (!result.cancelled) {
                this.uploadImage(result.uri, "postImage")
                  .then(() => {
                    Alert.alert("Success");
                  })
                  .catch((error) => {
                    Alert.alert(error);
                  });
                  //return imageUrl;
              }
        }
    }

    addImagePostUrl(url, postNumber){
        Firebase.database().ref('posts/' + postNumber).update(
            {
                imageUrl: url,
            }
        ).then(() => {
            console.log('Post was INSERTED!');  
            global.postCount++;
            this.storePostCount();  
        }).catch((error) => {
            console.log("Oh nO!");
        });
    }

    getImageUrl(imageName){
        var storageRef = Firebase.storage().ref();
        storageRef.child('images/' + imageName).getDownloadURL().then((finalURL) => {
            this.setState({postImageUrl: String(finalURL)});
            //return String(finalURL);
            //console.log(url); 
            // this.setState({url: String(finalURL), test: 'new'});
            console.log(this.state.postImageUrl);
            this.addImagePostUrl(String(finalURL), global.postCount);
            // console.log(this.state.test);
            //return finalURL;
        }) //.bind(this));
        //console.log(url); 
        //console.log(global.finalURL);   
    }

    uploadImage = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();
    
        var ref = await Firebase.storage().ref().child("images/" + imageName + global.postCount);
        await ref.put(blob);
        this.getImageUrl(imageName + global.postCount);
        //console.log(imageUrl);
        //return imageUrl;
    }

    render() {
        return(
            <AppContext.Provider value={{
                favoriteAnimal: this.state.favoriteAnimal,
                setFilter: this.setFilter,
                dataSource: this.state.postDataSource,
                renderRow: this.renderRow,
            }}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}
