import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/App";
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

ReactDOM.render(
    <App />,
    document.getElementById("app"),
);


// Hot Module Replacement
declare let module: { hot: any };

if (module.hot) {
  module.hot.accept("./components/App", () => {
    const NewApp = require("./components/App").default;

    ReactDOM.render(<NewApp />, document.getElementById('app'));
  });
}
