// src/app/core/constants/api-endpoints.ts

import { environment } from "../../../environments/environment";

export const ApiEndpoints = {
  sendMail: `${environment.apiBaseUrl}/sendMail`,
  subscribe: `${environment.apiBaseUrl}/subscribe`,
  unsubscribe: `${environment.apiBaseUrl}/unsubscribe`,
  timestamp: `${environment.apiBaseUrl}/timestamp`
};
