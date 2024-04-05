const fetch = require("node-fetch");
const { data } = require('./shared')

module.export = {
  request: async (route, body){
    body = data.botid = data.botid;
    let res = await fetch(data.host + route, {
      method: "POST",
      data: JSON.stringify(body)
    })

    return res.json()
  },
}
