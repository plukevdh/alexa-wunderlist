import addTask from './intents/addTask'
import listTasks from './intents/listTasks'
import { reduce, lensProp, over, always } from 'ramda'

const intents = [addTask, listTasks];

function loadIntent(event, intent) {
  return over(lensProp('app'), always(intent(event)), event);
}

export default function loadIntents(event) {
  return reduce(loadIntent, event, intents);
}
