
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import axios from 'axios';

// Backend API URL
const API_URL = "http://10.0.2.2:4000"; // replace with production backend

export async function registerForPushNotificationsAsync(userId) {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    await axios.post(`${API_URL}/api/notifications/register`, { userId, pushToken: token });
  } else {
    alert('Must use physical device for push notifications');
  }
  return token;
}

export async function sendPushNotification(toUserId, title, body) {
  await axios.post(`${API_URL}/api/notifications/send`, { toUserId, title, body });
}
