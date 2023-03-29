import { Store } from 'react-notifications-component';
import 'animate.css/animate.min.css';

const DefaultNotification = {
  title: "",
  message: "",
  type: "success",
  insert: "bottom",
  container: "bottom-left",
  className: "NotificationContainer",
  animationIn: ["animate__animated", "animate__zoomIn"],
  animationOut: ["animate__animated", "animate__fadeOut"],
  dismiss: {
    duration: 5000,
    onScreen: true
  },
  showIcon: true
}



export const NotificationSucesso = (title, message) => {
  Store.addNotification({ ...DefaultNotification, title: title, message: message, type: "success" });
}

export const NotificationErro = (title, message) => {
  Store.addNotification({ ...DefaultNotification, title: title, message: message, type: "danger" });
}

export const NotificationAlerta = (title, message) => {
  Store.addNotification({ ...DefaultNotification, title: title, message: message, type: "warning" });
}

export const NotificationInfo = (title, message) => {
  Store.addNotification({ ...DefaultNotification, title: title, message: message, type: "info" });
}

export const Notification = (title, message) => {
  Store.addNotification({ ...DefaultNotification, title: title, message: message, type: "default" });
}