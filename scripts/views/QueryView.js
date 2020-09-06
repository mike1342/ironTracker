import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableHighlight } from 'react-native';
import Deck from "../models/Deck";


class QueryView extends React.Component{
    constructor(props){
        super(props);
        this.rawCurrentResults;
        this.parsedCurrentResults;
        this.numOfqueries = 15;
        this.apiKey = "udMfzRruZp100tkZHcr2JLIzP8ZNSyH5BcxY5TqK"; 

        this.queryData = this.queryData.bind(this);
        this.renderQuery = this.renderQuery.bind(this);
        this.onChangeQueryData = this.onChangeQueryData.bind(this);
        this.renderFoodCard = this.renderFoodCard.bind(this);
        this.onChangeFoodCardVisibility = this.onChangeFoodCardVisibility.bind(this);

        this.state = {
            queryData: [],
            isFoodCardVisible: false,
        };

        this.unQueryData = this.props.settings.queryDataChanged.subscribe(this.onChangeQueryData);
        this.unFoodCardVisibility = this.props.settings.foodCardVisibilityChanged.subscribe(this.onChangeFoodCardVisibility);

    }

    componentWillUnmount(){
        this.unQueryData();
        this.unFoodCardVisibility();
    }

    onChangeQueryData(newQueryData){
        this.setState({queryData: newQueryData});
    }

    onChangeFoodCardVisibility(newVal){
        this.setState({isFoodCardVisible: newVal});
    }
    
    queryData(query, brandOwner=undefined){
        var fetchURL;
        if(brandOwner != undefined){
            fetchURL =  "https://api.nal.usda.gov/fdc/v1/foods/search?query=" + query + "&brandOwner" + brandOwner + "&api_key=" + this.apiKey;
        }
        else{
            fetchURL =  "https://api.nal.usda.gov/fdc/v1/foods/search?query=" + query + "&api_key=" + this.apiKey;
        }

        fetch(fetchURL, {
            method: "GET",
            redirect: "follow",
        })
        .then(response => response.text())
        .then(result => {
            this.rawCurrentResults = JSON.parse(result);

            var queryArray = [];
            //this.numOfqueries = 10;
            for(var i = 0; i < this.rawCurrentResults.foods.length; i++){
                var foundIron = false;
                var tempObject = {
                    foodName: '',
                    ironVal: 0,
                    fdcId: 0,
                };

                tempObject.foodName = this.rawCurrentResults.foods[i].description;
                tempObject.fdcId = this.rawCurrentResults.foods[i].fdcId;

                for(var k = 0; k < this.rawCurrentResults.foods[i].foodNutrients.length; k++){
                    if(this.rawCurrentResults.foods[i].foodNutrients[k].nutrientNumber == "303"){
                        tempObject.ironVal = this.rawCurrentResults.foods[i].foodNutrients[k].value;
                        foundIron = true;
                    }
                    else{
                        k++;
                    }
                }
                
                queryArray.push(tempObject);
            }
            queryArray = queryArray.filter((item) => item.ironVal != 0);
            queryArray.slice(0, this.numOfqueries);

            this.props.settings.onQueryDataChanged(queryArray);        
        })
        .catch(error => console.log('error', error));

        
    }

    renderQuery(queryResult){
        var returnedRender;
        returnedRender = 
            <View style={styles.row}>
                <TouchableHighlight onPress={() => this.renderFoodCard(queryResult.item)} >
                    <Text style={styles.rowTitle}>{queryResult.item.foodName}</Text>
                </TouchableHighlight>
                <Text style={styles.rowTitle}>{queryResult.item.ironVal}</Text>
            </View>
        ;
        return returnedRender;
    }

    renderFoodCard(item){
        console.log("RENDERFOODCARD CALLED");
        this.props.settings.onFoodCardVisibilityChanged(true, item);
    }

    render(){
        return(
            <View style={styles.container}>
                <TextInput 
                    onSubmitEditing={(event) => this.queryData(event.nativeEvent.text)}
                    style={{borderColor: "black", borderWidth: 1, width: "100%"}}
                />
                <FlatList
                    data={this.props.settings.queryData}
                    renderItem={this.renderQuery}
                    keyExtractor={(item) => item.fdcId.toString()}
                    extraData={this.state}
                />
                {this.state.isFoodCardVisible ? 
                    <Deck 
                        settings={this.props.settings}
                        data={this.props.settings.foodCardData}
                    /> :
                    null
                }   
            </View>
        );
    }

}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "center",
        paddingBottom: 5,
    },
    rowTitle: {
        fontSize: 10,
        color: "black",
    },
    container: {
        paddingTop: 25,
        justifyContent: "center",
        alignItems: "flex-start",
        width: "100%",
    },
});


export default QueryView;
