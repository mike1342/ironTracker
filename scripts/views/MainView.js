import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableHighlight, AsyncStorage } from 'react-native';
import MainSettings from "../models/MainSettings";
import SearchBar from 'react-native-search-bar';
import QueryView from './QueryView';
import ListView from "./ListView";
import HomeView from "./HomeView";
class MainView extends React.Component{
    constructor(props){
        super(props);

        this.getData = this.getData.bind(this);
        this.changeScreen = this.changeScreen.bind(this);
        this.onChangeScreen = this.onChangeScreen.bind(this);

        this.state = {
            screenVal: 1,
        };

        this.state.settings = new MainSettings();

        this.unScreen = this.state.settings.screenChanged.subscribe(this.onChangeScreen);
    }

    componentDidMount(){
        this.getData();
    }   

    componentWillUnmount(){
        this.unScreen();
    }

    async getData(){
        var savedList = await AsyncStorage.getItem("savedList");
        var newSavedList = JSON.parse(savedList);
        if(newSavedList == null){
            return;
        }
        else{
            this.state.settings.onSavedListChanged(newSavedList, true);
        }
    }

    changeScreen(num){
        this.state.settings.onScreenChanged(num);
        //console.log("changeScreen CALLED")
    }

    onChangeScreen(num){
        this.setState({screenVal: num});
    }

    render(){
        return(
            <View>
                <View style={{flexDirection: "row", borderBottomWidth: 1, width: "100%", height: "20%", flex: 1, justifyContent: 'space-evenly',}}>
                    <TouchableHighlight settings={styles.button}  onPress={() => this.changeScreen(1)}><Text style={{paddingTop: 35}} >Home</Text></TouchableHighlight>
                    <TouchableHighlight settings={styles.button}  onPress={() => this.changeScreen(2)}><Text style={{paddingTop: 35}} >Search</Text></TouchableHighlight>
                    <TouchableHighlight settings={styles.button}  onPress={() => this.changeScreen(3)}><Text style={{paddingTop: 35}} >Saved List</Text></TouchableHighlight>
                </View>
                <View style={{flexGrow: 1}}>
                    {this.state.screenVal == 1 ? 
                    <HomeView settings={this.state.settings}/> : 
                    this.state.screenVal == 2 ? 
                    <QueryView settings={this.state.settings}/> :
                    this.state.screenVal == 3 ?
                    <ListView settings={this.state.settings}/> :
                    null
                    }
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    button:{
        height: "100%",
        borderColor:"black",
        borderWidth: 2,
        flex: 1,
        backgroundColor: "blue",
    }
});


export default MainView;