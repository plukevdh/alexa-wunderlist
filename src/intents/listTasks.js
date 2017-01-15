import {find, test, compose, curry, pluck, prop, forEach, bind} from 'ramda'

const findList = curry(_findList);
function _findList(name, lists) {
  const regex = new RegExp(`^${name}`, 'i');
  return find(compose(test(regex), prop('title')), lists);
}

const parseAPI = compose(JSON.parse, prop('body'));

export default function listTasks(event) {
  const { app, client } = event;

  app.intent("ListTasks", function(req, res) {
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
        forEach((task) => res.say(task), tasks);
        res.send();
      })
      .catch(console.error)
      .then(res.fail);

    return false;
  });

  return app;
}
