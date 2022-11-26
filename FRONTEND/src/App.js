import React, { Component } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./RouterRender";


class App extends Component {
  render() {
    return (
      // <React.Fragment>
      //   <FileCard/>
      //   <ProgressFlow stage={['ABC', 'CDED', 'FQWRE']} status='CDED'/>
      //   <CreateDoc/>
      // </React.Fragment>
        
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    );
  }
}

export default App;
