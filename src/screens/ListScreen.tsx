import React from 'react';
import { View, StyleSheet, Text, FlatList, AsyncStorage, ListRenderItemInfo } from 'react-native';
import { foodEntry } from '../redux/actions';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';

const ListScreen = (): JSX.Element => {

    const savedList = useSelector((state: RootState) => {return state.root.saveFood.savedList;});

    const renderList = (row: ListRenderItemInfo<foodEntry>): JSX.Element => {
        let returnRow = 
            <View style={styles.row}>
                <Text style={styles.rowTitle}>{row.item.ironVal}</Text>
                <Text style={styles.rowTitle}>{row.item.name}</Text>
            </View>
        ;

        return returnRow;
    }

    return(
        <View style={styles.container}>
            {savedList.length == 0 ? 
                <Text>EMPTY</Text> :
                <FlatList 
                    data={savedList}
                    renderItem={(item) => renderList(item)}
                />
            }
        </View>
    );
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

export default ListScreen;