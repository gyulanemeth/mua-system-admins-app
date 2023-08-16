import { ConnectorError } from './ConnectorError.js'
import i18n from '../i18n.js'

export default class CorsError extends ConnectorError {
  constructor () {
    const { t } = i18n.global
    super(500, t('errors.corsName'), t('errors.corsMessage'))
  }
}
