const wealthAPI = 'https://api.wunderground.com/api/8991c805a60b780e/forecast/lang:CN/q/australia/Melbourne.json';

const messageFormat = '${title}: ${fcttext_metric}'

function getWeatherObject() {
  return fetch(wealthAPI)
    .then((response) => {
      return response.json()
    })
}

function parseWealthObject(weatherObject) {
  let {
    forecast: {
      txt_forecast: {
        forecastday
      }
    }
  } = weatherObject;

  messages = forecastday.map((wealther) => {
    return messageFormat.replace(/\$\{(\w*)\}/g, (match, name) => {
      return wealther[name]
    });
  })

  return messages.join('\n');
}

function getWeatherString() {
  return getWeatherObject().then((weatherObject) => {
    return parseWealthObject(weatherObject);
  })
}

module.exports = {
  getWeatherString
}