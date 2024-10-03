/* eslint-disable no-undef */

import axios from "axios";
const api = axios.create({
  baseURL: "https://backend.cnkav.com",
  // baseURL: "http://localhost:8000",
  // baseURL: "http://127.0.0.1:8000",

  headers: {
    "Content-Type": "application/json",
  },
});

// api.interceptors.request.use(
//     async (config) => {
//       // let { access, refresh } = localStorage.getItem(AUTH_TOKEN) ? JSON.parse(localStorage.getItem(AUTH_TOKEN)) : {}
//       let { access, refresh, user } = store.getState().auth;

//       if (access) {
//         const user_in_token = jwt_decode(access);

//         const isExpired = dayjs.unix(user_in_token.exp).diff(dayjs()) < 1;

//         if (!isExpired) {
//           config.headers[TOKEN_PAYLOAD_KEY] = "Bearer " + access;
//         } else {
//           try {
//             const refresh_token_data = { refresh: refresh };
//             const refresh_token_config = {
//               headers: {
//                 authorization: "Bearer " + access,
//               },
//             };

//             const resp = await axios.post(
//               `${process.env.REACT_APP_API_BASE_URL}/auth/refresh`,
//               refresh_token_data,
//               refresh_token_config
//             );

//             const { access: new_access, refresh: new_refresh } = resp.data;

//             const new_data_for_local_storage = {
//               access: new_access,
//               refresh: new_refresh,
//               user: user,
//             };

//             localStorage.setItem(
//               AUTH_TOKEN,
//               JSON.stringify(new_data_for_local_storage)
//             );
//             dispatch(setRefreshCredentials({ ...new_data_for_local_storage }));
//             config.headers[TOKEN_PAYLOAD_KEY] = "Bearer " + new_access;
//           } catch (Err) {
//             dispatch(logOut());
//             // console.log(Err)

//             // message.warning("Your Session Expired, please login again")

//             // history.replace("/auth/login")
//           }
//         }
//       }

//       return config;
//     },
//     (error) => {
//       console.log("Error during Request", error);
//       // Do something with request error
//       return Promise.reject(error);
//     }
//   );

//   // Add a response interceptor
// api.interceptors.response.use(
//     (res) => {
//       // console.log("Response after Request complete", res)
//       return res;
//     },
//     async (err) => {
//       // console.log("Error after Request complete", err.response)

//       if (err.response.status === 401) {
//         message.error(err.response.data.detail);
//         // dispatch(logOut())
//       }

//       // const originalConfig = err.config;
//       // if (originalConfig.url !== "/auth" && err.response) {
//       //     // Access Token was expired
//       //     if (err.response.status === 401 && !originalConfig._retry) {
//       //         originalConfig._retry = true;
//       //         try {
//       //             api.post("/refresh", {
//       //                 refresh: TokenService.getLocalRefreshToken(),
//       //             })
//       //                 .then((resp) => {

//       //                     dispatch(setCredentials({ ...resp.data }));
//       //                     // TokenService.updateLocalAccessToken(rs.data.access);
//       //                     return api(originalConfig);
//       //                 }).catch(err => {
//       //                     console.log("Failed to refresh token")
//       //                     dispatch(logOut())

//       //                     history.replace("/login")

//       //                     return Promise.reject(err);
//       //                 })

//       //             // // const { accessToken } = rs.data;

//       //         } catch (_error) {
//       //             return Promise.reject(_error);
//       //         }
//       //     }
//       // }
//       return Promise.reject(err);
//     }
//   );
export default api;
