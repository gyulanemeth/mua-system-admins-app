import { ConnectorError } from './ConnectorError.js'

export default class NotFoundError extends ConnectorError {
  constructor (message) {
    super(400, 'BAD_REQUEST', message)
  }
}
