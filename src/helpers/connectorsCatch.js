import CorsError from '../errors/CorsError'
import TimedOutError from '../errors/TimedOutError'

export default (err) => {
  if (err.status === undefined) {
    throw new CorsError()
  }
  if (err.status === 502 || err.status === 504) {
    throw new TimedOutError(err.status)
  }
  throw err
}
