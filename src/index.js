import prepareClient from './prepareClient'
import loadIntents from './loadIntents'

function run(context) {
  return function(event){
    const { app } = event;
    return app.handler(event, context);
  }
}

export function handler(event, context, callback) {
  return Promise.resolve(event)
    .then(prepareClient)
    .then(loadIntents)
    .then(run(context))
}
