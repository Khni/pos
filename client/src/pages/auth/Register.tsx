import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonLoading,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useHistory } from "react-router";

const Register: React.FC = (props) => {
  const history = useHistory();
  const [present, dismiss] = useIonLoading();
  const [user, setUser] = useState();
  const [errors, setErrors] = useState<{ field: string; msg: string }[]>();
  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user]);
  const submit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    present({
      message: "Loading...",
    });
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value; // typechecks!
    const password = target.password.value; // typechecks!

    axios.defaults.withCredentials = true;
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      setUser(response.data);
      console.log(response.data.email);
    } catch (e) {
      const error = e as AxiosError;
      setErrors(error.response?.data.errors);
      // console.log(error.response?.data.errors);
    }
    dismiss();
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>

        <form onSubmit={submit} className="ion-padding">
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput inputMode="email" name="email" />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput type="password" name="password" />
          </IonItem>
          <IonItem lines="none">
            {/* <IonLabel>Remember me</IonLabel> */}
            {/* <IonCheckbox defaultChecked={true} slot="start" /> */}
          </IonItem>
          <IonButton className="ion-margin-top" type="submit" expand="block">
            Register
          </IonButton>
        </form>
        {errors ? (
          <IonCard
            color="warning"
            style={{ paddingLeft: "20px", fontSize: "15px" }}
          >
            {errors.map((error) => (
              <p key={error.msg + 1231231298}>{error.msg}</p>
            ))}
          </IonCard>
        ) : null}
      </IonContent>
    </IonPage>
  );
};

export default Register;
