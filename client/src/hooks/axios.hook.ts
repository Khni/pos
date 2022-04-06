import { useState } from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

interface arg {
  url: string;
  method: "post" | "get";
  onSuccess?: (res: AxiosResponse) => void;
  withCredentials?: AxiosRequestConfig;
  body?: {};
}

const MakeRequest = ({ url, method, onSuccess, body }: arg) => {
  const [errors, setErrors] = useState<
    { msg: string; field?: string }[] | null
  >(null);
  const [loading, setLoading] = useState<any>();
  const doRequest = async () => {
    setLoading(true);

    try {
      setErrors(null);
      let response;
      axios.defaults.withCredentials = true;
      if (method === "get") {
        response = await axios[method](url, { withCredentials: true });
      } else {
        response = await axios[method](url, body, {
          withCredentials: true,
        });
      }

      if (onSuccess) {
        onSuccess(response.data);
      }

      return { data: response.data, loading };
    } catch (e) {
      const error = e as AxiosError;

      setErrors(error.response?.data.errors);
    }
    setLoading(false);
  };

  return { doRequest, errors, loading };
};

export default MakeRequest;

// import axios from 'axios';
// import React from 'react';
// import { useState } from 'react';

// export interface Props {
//     url: string;
//     method: "get" | "post";
//     body: {} ;
//     onSuccess: any
// }
// const MakeRequest: React.FC<Props>= ({ url, method, body, onSuccess }) => {
//   const [errors, setErrors] = useState<any>(null);

//   const doRequest = async () => {
//     try {
//       setErrors(null);
//       const response = await axios[method](url, body);

//       if (onSuccess) {
//         onSuccess(response.data);
//       }

//       return response.data;
//     } catch (err) {
//       setErrors(
//         <div className="alert alert-danger">
//           <h4>Ooops....</h4>
//           <ul className="my-0">
//             {err.response.data.errors.map(err => (
//               <li key={err.message}>{err.message}</li>
//             ))}
//           </ul>
//         </div>
//       );
//     }
//   };
//   return {  errors };
// };

// export default MakeRequest
