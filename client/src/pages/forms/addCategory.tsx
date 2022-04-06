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
import MakeRequest from "../../hooks/axios.hook";
import Form from "../../components/form/form";

const AddCategory: React.FC = (props) => {
  const { doRequest, errors, loading } = MakeRequest({
    url: "http://localhost:3000/api/categories",
    method: "post",
  });
  const submit = (e: React.SyntheticEvent) => {
    const target = e.target as typeof e.target & {
      name: { value: string };
    };
    const name = target.name.value; // typechecks!
  };

  return (
    <Form
      title="Add new Category"
      backUrl="/"
      inputs={[
        {
          name: "name",
          label: "Category Name",
        },
      ]}
      submitTitle="Create Category"
      submit={submit}
    />
  );
};

export default AddCategory;
