import React from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage } from "react-native";
import Modal from "react-native-modal";
import InputSpinner from "react-native-input-spinner";

class Deck extends React.Component{
    constructor(props){
        super(props);

        this.onChangeFoodCardVisibility = this.onChangeFoodCardVisibility.bind(this);
        this.changeFoodCardVisibility = this.changeFoodCardVisibility.bind(this); 
        this.changeNumServings = this.changeNumServings.bind(this);
        this.onChangeNumServings = this.onChangeNumServings.bind(this);
        this.saveData = this.saveData.bind(this);
        this.addToDaily = this.addToDaily.bind(this);

        this.state = {
            isVisible: this.props.settings.isFoodCardVisible,
            numServings: 1,
        };

        this.unNumServings = this.props.settings.numServingsChanged.subscribe(this.onChangeNumServings);
        this.unFoodCardVisibility = this.props.settings.foodCardVisibilityChanged.subscribe(this.onChangeFoodCardVisibility);
    }

    componentWillUnmount(){
        this.unFoodCardVisibility();
        this.unNumServings();
    }

    onChangeFoodCardVisibility(newVal){
        this.setState({isVisible: newVal});
    }

    onChangeNumServings(newVal){
        this.setState({numServings: newVal});
    }

    changeFoodCardVisibility(newVal){
        this.props.settings.onFoodCardVisibilityChanged(newVal);
    }

    changeNumServings(val){
        this.props.settings.onNumServingsChanged(val);
    }

    saveData(name, ironVal){
        var tempObject = {
            name: name,
            ironVal: ironVal,
        };

        this.props.settings.onSavedListChanged(tempObject, false);
    }

    //WORK ON THIS WHEN SAVEDLIST FUNCTIONALITY IS COMPLETED
    addToDaily(name, strVal){
        var ironVal = parseFloat(strVal);

    }

    render(){
        var totalIron = this.props.data.ironVal * this.state.numServings;
        var strTotalIron = totalIron.toFixed(2);
        return(
            <View>
                <Modal 
                    isVisible={this.props.settings.isFoodCardVisible} 
                    onBackButtonPress={() => this.changeFoodCardVisibility(false)} 
                    onBackdropPress={() => this.changeFoodCardVisibility(false)}
                >
                    <View style={styles.modalStyling}> 
                        <Text style={{fontSize: 20, marginBottom: 20}}>{this.props.data.foodName}</Text>
                        <View style={styles.hr}/>
                        <InputSpinner 
                            max={100}
                            min={1}
                            step={1}
                            colorLeft={"darkorange"}
                            colorRight={"darkorange"}
                            value={this.state.numServings}
                            onChange={(val) => this.changeNumServings(val)}
                        />
                        <View style={{marginTop: 20}}>
                            <Text>Total Iron Content: {strTotalIron} mg</Text>
                        </View>
                        <View style={{justifyContent: "space-between", flexDirection: "row", width: "100%", marginTop: 20}}>
                            <View style={{flexGrow: 1, backgroundColor: "white"}}><Button title="ADD" color="darkorange" onPress={() => this.addToDaily(this.props.data.name, strTotalIron)} /></View>
                            <View style={{width: 20}} />
                            <View style={{flexGrow: 1, backgroundColor: "white"}}><Button title="SAVE" color="darkorange" onPress={() => this.saveData(this.props.data.foodName, this.props.data.ironVal)} /></View>
                        </View>
                    </View>
                </Modal>
            </View>    
        );
    }
}

const styles = StyleSheet.create({
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

export default Deck;