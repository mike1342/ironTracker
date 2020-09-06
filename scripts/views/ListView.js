import React from 'react';
import { View, StyleSheet, Text, FlatList, AsyncStorage } from 'react-native';


class ListView extends React.Component{
    constructor(props){
        super(props);

        this.onChangeSavedList = this.onChangeSavedList.bind(this);
        this.renderList = this.renderList.bind(this);

        this.state = {
            savedList: this.props.settings.savedList,
        };

        this.unSavedList = this.props.settings.savedListChanged.subscribe(this.onChangeSavedList);
    }

    componentWillUnmount(){
        this.unSavedList();
    }

    onChangeSavedList(newSavedList){
        this.setState({savedList: newSavedList});
        console.log("LISTVIEW STATE CHANGED");
    }

    renderList(row){
        var returnRow = 
            <View style={styles.row}>
                <Text style={styles.rowTitle}>{row.item.ironVal}</Text>
                <Text style={styles.rowTitle}>{row.item.name}</Text>
            </View>
        ;

        return returnRow;
    }

    render(){
        return(
            <View style={styles.container}>
                {this.state.savedList.length == 0 ? <Text>EMPTY</Text> :
                    <FlatList 
                        data={this.state.savedList}
                        renderItem={(item) => this.renderList(item)}
                    />
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

export default ListView;