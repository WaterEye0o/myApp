import config from "react-native-config";
export function log(...args) {
   console && console.log(...args);
}
export function group(what,...args){
    console && console.groupCollapsed && console.groupCollapsed(what);
    log(...args);
    console && console.groupEnd && console.groupEnd();
}