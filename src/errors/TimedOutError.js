import { ConnectorError } from './ConnectorError.js'
import i18n from '../i18n.js'

export default class TimedOutError extends ConnectorError {
  constructor (code) {
    const { t } = i18n.global
    super(code, t('errors.timedOutName'), t('errors.timedOutMessage'))
  }
}
