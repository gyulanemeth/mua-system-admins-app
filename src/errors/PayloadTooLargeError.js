import { ConnectorError } from './ConnectorError.js'

export default class PayloadTooLargeError extends ConnectorError {
  constructor (message) {
    super(413, 'PAYLOAD_TOO_LARGE', message)
  }
}
