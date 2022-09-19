import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableHighlight, ListRenderItemInfo, Modal, Button } from 'react-native';
import InputSpinner from "react-native-input-spinner";
import { SAVEFOODS, UPDATEDAILYIRON } from '../redux/actions';

interface FoodCardData {
    foodName: string,
    brandOwner: string,
    ironVal: number,
    fdcId: number
};

const dummyFoodCardData: FoodCardData = {
    foodName: '',
    brandOwner: '',
    ironVal: -1,
    fdcId: -1
};

type ModalData = {
    data: FoodCardData,
    visible: boolean
};

const QueryScreen = (): JSX.Element => {

    const dispatch = useDispatch();
    const apiKey: string = "udMfzRruZp100tkZHcr2JLIzP8ZNSyH5BcxY5TqK";

    const [numQueries, setNumQueries] = useState(15);
    const [queryData, setQueryData] = useState<FoodCardData[]>();
    const [modalData, setModalData] = useState<ModalData>({data: dummyFoodCardData, visible: false});
    const [numServings, setNumServings] = useState(1);

    const getData = (query: string, brandOwner=undefined) => {
        let fetchURL;
        if(brandOwner != undefined){
            fetchURL =  "https://api.nal.usda.gov/fdc/v1/foods/search?query=" + query + "&brandOwner" + brandOwner + "&api_key=" + apiKey;
        }
        else{
            fetchURL =  "https://api.nal.usda.gov/fdc/v1/foods/search?query=" + query + "&api_key=" + apiKey;
        }

        fetch(fetchURL, {
            method: "GET"
        })
        .then(response => response.text())
        .then(result => {
            let rawCurrentResults = JSON.parse(result);

            let queryArray: FoodCardData[] = [];
            //this.numOfqueries = 10;
            for(var i = 0; i < rawCurrentResults.foods.length; i++){
                let tempObject: FoodCardData = {
                    foodName: '',
                    brandOwner: '',
                    ironVal: 0,
                    fdcId: 0,
                };

                tempObject.foodName = rawCurrentResults.foods[i].description;
                tempObject.fdcId = rawCurrentResults.foods[i].fdcId;
                tempObject.brandOwner = rawCurrentResults.foods[i].brandOwner;

                for(var k = 0; k < rawCurrentResults.foods[i].foodNutrients.length; k++){
                    if(rawCurrentResults.foods[i].foodNutrients[k].nutrientNumber == "303"){
                        tempObject.ironVal = rawCurrentResults.foods[i].foodNutrients[k].value;
                        break;
                    }
                }
                
                queryArray.push(tempObject);
            }
            queryArray = queryArray.filter((item) => item.ironVal != 0);
            queryArray.slice(0, numQueries);

           setQueryData(queryArray);        
        })
        .catch(error => console.log('error', error));

        
    };

    const addToDaily = (name: string, ironVal: number) => {
        let payload: object = {
            delta: ironVal
        };
        dispatch({type: UPDATEDAILYIRON, payload: payload});
    };

    const saveData = (name: string, unitIronVal: number) => {
        let payload: object = {
            name: name,
            val: unitIronVal
        };
        dispatch({type: SAVEFOODS, payload: payload});
    }

    const renderQuery = (queryResult: ListRenderItemInfo<FoodCardData>): JSX.Element => {
        return ( 
            <View style={styles.row}>
                <TouchableHighlight onPress={() => setModalData({data: queryResult.item, visible: true})} >
                    <Text style={styles.rowTitle}>{queryResult.item.foodName}</Text>
                </TouchableHighlight>
                <Text style={styles.rowTitle}> - {queryResult.item.brandOwner}</Text>
            </View>
        );
    };

    return(
        <View style={styles.container}>
            <Modal 
            animationType="slide"
            transparent={true}
            visible={modalData.visible}
            onRequestClose={() => {
                setModalData({data: dummyFoodCardData, visible: false});
            }}>
                <View style={styles.modalStyling}> 
                    <Text style={{fontSize: 20, marginBottom: 20}}>{modalData.data.foodName}</Text>
                    <View style={styles.hr}/>
                    <InputSpinner 
                        max={100}
                        min={1}
                        step={0.5}
                        colorLeft={"darkorange"}
                        colorRight={"darkorange"}
                        value={numServings}
                        onChange={(num: number) => setNumServings(num)}
                    />
                    <View style={{marginTop: 20}}>
                        <Text>Total Iron Content: {modalData.data.ironVal * numServings} mg</Text>
                    </View>
                    <View style={{justifyContent: "space-between", flexDirection: "row", width: "100%", marginTop: 20}}>
                        <View style={{flexGrow: 1, backgroundColor: "white"}}><Button title="ADD" color="darkorange" onPress={() => addToDaily(modalData.data.foodName, modalData.data.ironVal * numServings)} /></View>
                        <View style={{width: 20}} />
                        <View style={{flexGrow: 1, backgroundColor: "white"}}><Button title="SAVE" color="darkorange" onPress={() => saveData(modalData.data.foodName, modalData.data.ironVal)} /></View>
                    </View>
                </View>
            </Modal>
            <TextInput 
                onSubmitEditing={(event) => getData(event.nativeEvent.text)}
                style={{borderColor: "black", borderWidth: 1, width: "80%", marginLeft: "10%", marginTop: "10%", borderRadius: 10}}
                placeholder="Search Foods"
            />
            <FlatList
                data={queryData}
                renderItem={(item) => renderQuery(item)}
                keyExtractor={(item) => item.fdcId.toString()}
            /> 
        </View>
    );

};

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
    hr: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    modalStyling: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
});


export default QueryScreen;
