import prepareClient from '../prepareClient'
import loadIntents from '../loadIntents'

function print(event) {
  const { app } = event;
  console.log("=== Schema ===");
  console.log(app.schema());
  console.log("=== Utterances ===");
  console.log(app.utterances());
}

export function generateSchema(event) {
  return Promise.resolve(event)
    .then(prepareClient)
    .then(loadIntents)
    .then(print)
    .catch(console.error)
}
