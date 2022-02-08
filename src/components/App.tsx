import * as React from "react";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { route } from "./routes";
import { configureStore } from "../store/configStore";
import { getProjects } from "../actions/actions";

const store = configureStore();
// Request the project list on page load
getProjects({ ownerId: 0 })(store.dispatch);

// The application root component
class App extends React.Component<{}, {}> {
    public render(): JSX.Element {
        return (
            <Provider store={store}>
                <HashRouter children={route} />
            </Provider>
        );
    }
}

export default App;
