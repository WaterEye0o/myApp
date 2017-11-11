import React from 'react';
import {Provider} from "react-redux";
import store from "./utilities/storage/store";
import TopLevelComponent from './screens/EntryScreen';
import Routing, {Router} from './utilities/routing';
import Profile from "./screens/Profile";

const Route = Routing.Route;


class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Route extra path='/' component={Profile}/>

                </Router>
            </Provider>
        );
    }
}

export default App;
