import { TextFieldTypes } from "@ionic/core";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonLoading,
} from "@ionic/react";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";

export interface Props {
  title: string;
  backUrl: string;
  inputs: { name: string; label: string }[];
  submitTitle: string;
  type?: TextFieldTypes | undefined;
  submit: (e: React.SyntheticEvent) => void;
}

const Form: React.FC<Props> = ({
  title,
  backUrl,
  inputs,
  submit,
  submitTitle,
  type,
}) => {
  const history = useHistory();
  const [present, dismiss] = useIonLoading();
  const [user, setUser] = useState();
  const [errors, setErrors] = useState<{ field: string; msg: string }[]>();
  //   useEffect(() => {
  //     if (user) {
  //       history.push(backUrl);
  //     }
  //   }, [user]);
  //   const submit = async (e: React.SyntheticEvent) => {
  //     e.preventDefault();
  //     present({
  //       message: "Loading...",
  //     });
  //     const target = e.target as typeof e.target & {
  //       email: { value: string };
  //       password: { value: string };
  //     };
  //     const email = target.email.value; // typechecks!
  //     const password = target.password.value; // typechecks!

  //     axios.defaults.withCredentials = true;
  //     try {
  //       const response = await axios.post(
  //         "http://localhost:3000/api/users/register",
  //         {
  //           email,
  //           password,
  //         },
  //         {
  //           withCredentials: true,
  //         }
  //       );
  //       setUser(response.data);
  //       console.log(response.data.email);
  //     } catch (e) {
  //       const error = e as AxiosError;
  //       setErrors(error.response?.data.errors);
  //       // console.log(error.response?.data.errors);
  //     }
  //     dismiss();
  //   };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={backUrl} />
          </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <form onSubmit={submit} className="ion-padding">
          {/* <div style={{ textAlign: "center" }}>
            
          </div> */}

          {inputs.map((input) => (
            <IonItem key={input.label + 2309125913471}>
              <IonLabel position="floating">{input.label}</IonLabel>
              <IonInput name={input.name} type={type} />
            </IonItem>
          ))}

          <IonButton className="ion-margin-top" type="submit" expand="block">
            {submitTitle}
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Form;
