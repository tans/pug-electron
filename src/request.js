const fetch = require("node-fetch");
const { data } = require('./shared')

module.export = async (route, body)=>{
  body.botid = data.get('botid')
  let host = data.get('host')
  let res = await fetch(host + route, {
    method: "POST",
    data: JSON.stringify(body)
  })

  return res.json()
}
