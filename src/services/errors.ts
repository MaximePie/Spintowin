import { Store as store } from 'react-notifications-component';
import { AxiosError } from 'axios';
import { systemErrorNotification } from './notification';

/**
 * This file is used to handle errors after Axios request failure by providing
 * a notification
 * */

export default function handleError(error: Error | AxiosError) {
  console.log('Error: ', error);
  if (Object.entries(error)[2][1] === undefined) {
    store.addNotification({ ...systemErrorNotification });
  }
}
