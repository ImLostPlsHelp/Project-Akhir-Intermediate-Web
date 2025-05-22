import CONFIG from "../config";
import { subscribeToPushNotification, unsubscribeToPushNotification } from "../data/api";
import { urlBase64ToUint8Array } from "../utils";

const VAPID_PUBLIC_KEY = "BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk";

async function subscribeUserToPush() {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscribeOptions = {
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
    };

    const pushSubscription = await registration.pushManager.subscribe(subscribeOptions);
    
    const response = await subscribeToPushNotification(
      pushSubscription.endpoint,
      {
        p256dh: btoa(String.fromCharCode.apply(null, new Uint8Array(pushSubscription.getKey('p256dh')))),
        auth: btoa(String.fromCharCode.apply(null, new Uint8Array(pushSubscription.getKey('auth'))))
      }
    );

    if (!response.ok) {
      throw new Error('Failed to subscribe to push notifications');
    }

    console.log('Push notification subscription successful');
    return pushSubscription;
  } catch (error) {
    console.error('Failed to subscribe to push notifications:', error);
    throw error;
  }
}

async function unsubscribeFromPush() {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    
    if (subscription) {
      const response = await unsubscribeToPushNotification(subscription.endpoint);
      
      if (!response.ok) {
        throw new Error('Failed to unsubscribe from push notifications');
      }

      await subscription.unsubscribe();
      console.log('Successfully unsubscribed from push notifications');
    }
  } catch (error) {
    console.error('Error unsubscribing from push notifications:', error);
    throw error;
  }
}

async function initializePushNotifications() {
  try {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.log('Push notifications not supported');
      return false;
    }

    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      console.log('User is already subscribed to push notifications');
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error checking push notification status:', error);
    return false;
  }
}

export {
  subscribeUserToPush,
  unsubscribeFromPush,
  initializePushNotifications
};

