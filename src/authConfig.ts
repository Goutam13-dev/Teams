// import { PublicClientApplication } from "@azure/msal-browser";

// const msalConfig = {
//   auth: {
//     clientId: "18fc5e1c-b1ae-463e-aa87-4fb0364b226b",
//     authority: 'https://login.microsoftonline.com/b118e671-45c2-4be6-9514-e60304367e3d',
    
//   }
// };

// export const msalInstance = new PublicClientApplication(msalConfig);

// // Ensure MSAL is initialized before using it

import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID || "",
    authority: process.env.REACT_APP_AUTHORITY || "",
  }
};

export const msalInstance = new PublicClientApplication(msalConfig);
