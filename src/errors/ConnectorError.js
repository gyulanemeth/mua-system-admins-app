export class ConnectorError extends Error {
  constructor (status, name, message) {
    super(message)
    this.status = status
    this.name = name
  }
}
