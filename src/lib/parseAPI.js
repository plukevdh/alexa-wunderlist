import { compose, prop } from 'ramda'
const parseAPI = compose(JSON.parse, prop('body'));

export default parseAPI;
