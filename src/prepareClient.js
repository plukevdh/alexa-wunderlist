import Wunderlist from 'wunderlist-api';
import alexa from 'alexa-app'
import { merge, compose, path } from 'ramda'

const app = new alexa.app('wunderlist');

function getClient(accessToken) {
  return new Wunderlist({ accessToken, clientId });
}

const clientId = process.env.WUNDERLIST_CLIENT_ID;
const getToken = compose(getClient, path(['session', 'user', 'accessToken']));

export default function loadClient(event) {
  return merge({ client: getToken(event), app }, event);
};
