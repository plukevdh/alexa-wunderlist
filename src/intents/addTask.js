import parseAPI from '../lib/parseAPI'
import findList from '../lib/findList'
import {curry, prop, bind, is} from 'ramda'

export default function addTask(event) {
  const { app, client } = event;
  const creatTask = curry(bind(client.createTask, client));

  app.intent("AddTask", {
    slots: {
      ListName: "LIST_NAME",
      TaskName: "TASK_NAME",
      Date: "AMAZON.DATE",
      When: "AMAZON.DURATION"
    },
    utterances: [
      "add{ task|} {-|TaskName} to{ the| my|} {-|ListName} list",
      "add{ task|} {-|TaskName} to{ the| my|}{ list|} {-|ListName}",
      "add{ task|} {-|TaskName} to{ list|} {-|ListName} for {-|Date}",
      "add{ task|} {-|TaskName} to{ list|} {-|ListName}{ to be done|} in {-|When}",
      "create{ task|} {-|TaskName} in {my list|my|list|} {-|ListName} list",
      "remind me {of|to|about} {-|TaskName}{ on|} {-|Date} {at|in} {-|When}",
    ]
  }, function(req, res) {
    const list = req.slot("ListName", "inbox");
    const title = req.slot("TaskName");
    const date = req.slot("Date", new Date().toISOString());

    client.getLists()
      .then(parseAPI)
      .then(findList(list))
      .then(prop('id'))
      .then(creatTask)
      .then(fn => fn(title, date))
      .then(task => {
        res.say(`Added task "${title}" to list ${list}`);
        res.send();
      })
      .catch(console.error)
      .then(res.fail);

    return false;
  });

  return app;
}


