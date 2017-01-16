import parseAPI from '../lib/parseAPI'
import findList from '../lib/findList'
import {pluck, prop, forEach, bind} from 'ramda'

export default function listTasks(event) {
  const { app, client } = event;

  app.intent("ListTasks", {
      slots: {
        ListName: "LIST_NAME"
      },
      utterances: [
        "{list|read|get}{ my|} {-|ListName}",
        "what does my {-|ListName} look like",
        "what is my {-|ListName}{ list|} like",
        "what is in my {-|ListName}",
      ]
    },
    function(req, res) {
      const name = req.slot("ListName", "inbox");
      client.getLists()
        .then(parseAPI)
        .then(findList(name))
        .then(prop('id'))
        .then(bind(client.getTasks, client))
        .then(parseAPI)
        .then(pluck('title'))
        .then((tasks) => {
          res.say(`Your tasks in list ${name} are:`);
          forEach((task) => res.say(`${task}.`), tasks);
          res.send();
        })
        .catch(console.error)
        .then(res.fail);

      return false;
    });

  return app;
}
