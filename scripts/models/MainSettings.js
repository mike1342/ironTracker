import Event from "./Event";
import { AsyncStorage } from "react-native";


class MainSettings{
    constructor(){
        this.queryData = [];
        this.savedList = [];
        this.isFoodCardVisible = false;
        this.foodCardData;
        this.screenVal = 1;

        this.queryDataChanged = new Event();
        this.foodCardVisibilityChanged = new Event();
        this.numServingsChanged = new Event();
        this.savedListChanged = new Event();
        this.screenChanged = new Event();
    }

    onQueryDataChanged(data){
        var ans = data;
        this.queryData = ans;
        this.queryDataChanged.fire(ans);
    }

    onScreenChanged(val){
        var ans = val;
        this.screenVal = ans;
        this.screenChanged.fire(ans);
        return ans;
    }

    onFoodCardVisibilityChanged(bool, data){
        var ans1 = bool;
        var ans2 = data;
        this.isFoodCardVisible = ans1;
        this.foodCardData = ans2;
        this.foodCardVisibilityChanged.fireTwoParams(ans1, ans2);
    }

    onNumServingsChanged(val){
        var ans = val;
        this.numServingsChanged.fire(ans);
    }

    onSavedListChanged(obj, isFromGetData){
        var ans = obj;

        if(isFromGetData){
            this.savedList = ans;
            this.savedListChanged.fire(this.savedList);  
            console.log(this.savedList);      
        }
        else{
            this.savedList.unshift(ans);
            this.savedListChanged.fire(this.savedList);
            AsyncStorage.setItem("savedList", JSON.stringify(ans));
        }
    }
    
}

export default MainSettings;