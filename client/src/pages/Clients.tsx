import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useEffect, useState } from "react";

import ExploreContainer from "../components/ExploreContainer";
import "./Tab1.css";

const Tab1: React.FC = (props) => {
  const [balance, setBalance] = useState({ debit: 0, credit: 0 });
  const Clients: { name: string; balance: number }[] = [
    {
      name: "Eslam Ruby",
      balance: 53000,
    },
    {
      name: "Emad Fabmy",
      balance: 92000,
    },
    {
      name: "Mohamed ibrahim",
      balance: -89733,
    },
  ];

  useEffect(() => {
    let debit = 0;
    let credit = 0;
    Clients.map((client) => {
      if (client.balance > 0) {
        debit += client.balance;
      } else {
        credit += client.balance;
      }

      setBalance({ debit, credit });
    });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Clients</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/**
         * this is the balance card of clients
         */}

        <IonCard>
          <IonCardHeader>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
            >
              <div
                style={{
                  fontWeight: " bold",
                  color: "blue",
                  fontSize: 17,
                  marginRight: "100px",
                }}
              >
                debit: {balance.debit}
              </div>
              <div style={{ fontWeight: "bold", color: "red", fontSize: 17 }}>
                credit: {balance.credit}
              </div>
            </div>
          </IonCardHeader>
        </IonCard>

        {/**
         * this is clients list
         */}
        <IonGrid>
          <IonRow>
            {Clients.map((client) => (
              <IonCol>
                <IonCard key={client.name + "343"}>
                  <IonCardHeader>
                    <IonCardSubtitle>{client.name}</IonCardSubtitle>
                    <IonCardTitle>{client.balance}</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton href="addclient">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
