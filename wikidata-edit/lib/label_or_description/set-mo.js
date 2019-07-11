const validateArgs = require('./validate_args')

module.exports = (name) => (config) => {
  const { post } = require('../request')(config)
  const { Log, LogError } = require('../log')(config)
  return (entity, language, value, Proceed) => {
    return validateArgs(entity, language, name, value)
    .then(() => {
      return post(`wbset${name}`, {
        id: entity,
        language,
        value,
        assert: 'bot',
		bot: 1
      })
    })
    .then((console.log("Log Res called"),Log(`set ${name} res (${entity}:${language}:${value})`),setTimeout(Proceed, 0)))
    .catch(LogError(`set ${name} err (${entity}:${language}:${value})`))
  }
}
