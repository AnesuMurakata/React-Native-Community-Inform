import React from 'react';
import {ListView, TouchableHighlight, View, Text, StyleSheet, Button} from 'react-native';
import Firebase from '../Firebase';

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
        this.state = {
            postDataSource: ds,
            category: 'All',
        };

        // Load every post initially
        global.categoryRef = this.getRef().orderByChild('title');

        global.postCount = 11;

        this.setFilter = this.setFilter.bind(this);
    }

    getRef(){
        return Firebase.database().ref('posts');
    }

    componentWillMount(){
        this.getItems(global.categoryRef);
    }

    componentDidMount(){
        this.getItems(global.categoryRef);
    }

    // Get posts with the selected category from database
    getItems(categoryRef){
        categoryRef.on('value', (snap) => {
            let items = [];
            snap.forEach((child) => {
                items.push({
                    title: child.val().title,
                    body: child.val().body,
                    _key: child.key,
                });
            });
            this.setState({
                postDataSource: this.state.postDataSource.cloneWithRows(items)
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
                <View style={styles.card}>
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
        // Wait for state to be changed before proceeding
        await this.setState({category: selectedCategory});
        this.selectPosts(this.state.category);
    }

    selectPosts(selectedCategory){
        // Select posts with the selected category from the database
        global.categoryRef = this.getRef().orderByChild('category').equalTo(selectedCategory);
        this.getItems(global.categoryRef);
        console.log(global.categoryRef);
    }

    // Method to add Posts to database
    addPost(title, body, category){
        Firebase.database().ref('posts/' + global.postCount).set(
            {
                title: title,
                body: body,
                category: category,
            }
        ).then(() => {
            console.log('INSERTED!');
            global.postCount++;
        }).catch((error) => {
            console.log("Oh nO!");
        });
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