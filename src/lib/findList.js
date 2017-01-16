import { curry, find, compose, test, prop } from 'ramda'

const findList = curry(_findList);
function _findList(name, lists) {
  const regex = new RegExp(`^${name}`, 'i');
  return find(compose(test(regex), prop('title')), lists);
}

export default findList;

