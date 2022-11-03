import { Store as store } from 'react-notifications-component';
import { systemErrorNotification } from './notification';
import {AxiosError} from "axios";

/**
 * This file is used to handle errors after Axios request failure by providing
 * a notification
 * */

export default function handleError(error: Error | AxiosError) {
  if (Object.entries(error)[2][1] === undefined) {
    store.addNotification({ ...systemErrorNotification });
  }
}
