import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import axios from "axios";

import {
  personCircle,
  search,
  ellipsisHorizontal,
  ellipsisVertical,
} from "ionicons/icons";
import { useState, useEffect } from "react";

import ExploreContainer from "../components/ExploreContainer";
import "./Tab1.css";

const Tab1: React.FC = () => {
  const [categories, setCategories] = useState<{ name: string }[]>([]);
  useEffect(() => {
    // declare the data fetching function
    const fetchCategories = async () => {
      const response = await axios.get("http://localhost:3000/api/categories", {
        withCredentials: true,
      });

      setCategories(response.data);
    };

    // call the function
    fetchCategories()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  const List: { title: string; subtitle: string }[] = [
    {
      title: "Clients",
      subtitle: "Manage Your clients, add , edit or delete.",
    },
    {
      title: "Suppliers",
      subtitle: "Manage Your suppliers, add , edit, or delete.",
    },
    {
      title: "Products and Inventory",
      subtitle: "Manage your Products and Track inventory",
    },
    {
      title: "Accounts",
      subtitle: "Manage Your accounts and Money Flow",
    },
  ];
  axios.defaults.withCredentials = true;

  const setCookie = async () => {
    await axios.get("http://localhost:3000/api/setcookie", {
      withCredentials: true,
    });
  };

  const getCookie = async () => {
    await axios.get("http://localhost:3000/api/getcookie", {
      withCredentials: true,
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="secondary">
            <IonButton href="/register">
              <IonIcon slot="icon-only" icon={personCircle} />
            </IonButton>
            <IonButton>
              <IonIcon slot="icon-only" icon={search} />
            </IonButton>
          </IonButtons>
          <IonButtons slot="primary">
            <IonButton color="danger">
              <IonIcon
                slot="icon-only"
                ios={ellipsisHorizontal}
                md={ellipsisVertical}
              />
            </IonButton>
          </IonButtons>
          <IonTitle>My Accountant</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          {categories.length > 0 ? (
            <IonRow>
              {categories.map((item) => (
                <IonCol key={item.name + 3213483}>
                  <IonCard href="/clients">
                    <IonCardHeader>
                      <IonCardSubtitle>{item.name}</IonCardSubtitle>
                      <IonCardTitle>{item.name}</IonCardTitle>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh",
              }}
            >
              <IonButton href="/addcategory" style={{}}>
                Create new Account!
              </IonButton>
            </div>
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
