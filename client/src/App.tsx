import { Redirect, Route } from "react-router-dom";

import {
  IonApp,
  IonBackButton,
  IonButtons,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";
import Home from "./pages/Home";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";
import Clients from "./pages/Clients";
import AddClient from "./pages/addClient";
import Register from "./pages/auth/Register";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { Menu } from "./components/drawer/Menu";
import { menu } from "ionicons/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import AddCategory from "./pages/forms/addCategory";
setupIonicReact();

const App: React.FC = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    // declare the data fetching function
    const fetchUser = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/users/currentuser",
        { withCredentials: true }
      );

      setUser(response.data);
      console.log(user);
    };

    // call the function
    fetchUser()
      // make sure to catch any error
      .catch(console.error);
  }, []);
  // <IonApp>
  //   <IonReactRouter>
  //     <IonTabs>
  //       <Menu />
  //       <IonRouterOutlet id="main">
  //         <Route exact path="/tab1">
  //           <Tab1 />
  //         </Route>
  //         <Route exact path="/tab2">
  //           <Tab2 />
  //         </Route>
  //         <Route path="/tab3">
  //           <Tab3 />
  //         </Route>
  //         <Route exact path="/">
  //           <Redirect to="/tab1" />
  //         </Route>
  //         <Route path="/clients" component={Clients} />
  //         <Route path="/addclient" component={AddClient} />
  //       </IonRouterOutlet>
  //       <IonTabBar slot="bottom">
  //         <IonTabButton tab="tab1" href="/tab1">
  //           <IonIcon icon={triangle} />
  //           <IonLabel>Tab 1</IonLabel>
  //         </IonTabButton>
  //         <IonTabButton tab="tab2" href="/tab2">
  //           <IonIcon icon={ellipse} />
  //           <IonLabel>Tab 2</IonLabel>
  //         </IonTabButton>
  //         <IonTabButton tab="tab3" href="/tab3">
  //           <IonIcon icon={square} />
  //           <IonLabel>Tab 3</IonLabel>
  //         </IonTabButton>
  //       </IonTabBar>
  //     </IonTabs>
  //   </IonReactRouter>
  // </IonApp>

  return (
    <IonApp>
      <IonReactRouter>
        <Menu />
        <IonRouterOutlet id="main">
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/clients" component={Clients} />
          <Route path="/addclient" component={AddClient} />
          <Route path="/register" component={Register} />
          <Route path="/addcategory" component={AddCategory} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
