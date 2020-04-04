import store from './store';
import { socketConnected } from '../features/app/appSlice';

export let socket;

socket = new WebSocket('wss://3ftrdehq1k.execute-api.us-east-1.amazonaws.com/Prod');
socket.onopen = () => {
  console.log('WebSocket [open] connection established');
  store.dispatch(socketConnected());
};
socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('WebSocket [message]', data);
  store.dispatch(data);
}