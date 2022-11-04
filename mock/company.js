module.exports = [
  {
    url: '/enterprise/list',
    type: 'post',
    response: config => {
      // const { enterpriseuuid="" } = config.query
      console.log(config.query)
      return {
        "code": 200,
        "msg": "",
        "items": [
        {
        "enterpriseuuid": "5805f7246b344d6bb73d331b585630ce",
        "enterprisename": "智邦大陆科技",
        "lng": 108.892125,
        "lat": 34.193259,
        "address": "西安市雁塔区3G酷派智能产业园A座",
        "contact": "",
        "contactphone": "",
        "devicesum": 0,
        "deviceonlinesum": 0,
        "terminalonlinesum": 0,
        "creatoruuid": "235d57ff8a90447ea77465f75c6f4b24",
        "createtime": "2022-09-29T09:47:27.000+0000",
        "updatetime": "2022-10-08T09:20:15.000+0000",
        "accountuuid": "bda4e167871c4c47b0b27fca0a7daab8",
        "managers": null,
        "msgCount": "0/0"
        }
        ],
        "pages": 1,
        "page": 1,
        "total": 1,
        "count": 1
        }
    }
  },
  {
    url: '/enterprise/view',
    type: 'get',
    response: config => {
      // const { enterpriseuuid="" } = config.query
      console.log(config.query)
      return {
        "code": 200,
        "msg": "",
        "data": {
          "enterpriseuuid": "4754636ee8114c39adbb0b1029009e65",
          "enterprisename": "木犀",
          "lng": 118.788498,
          "lat": 32.004061,
          "address": "南京市雨花台区木犀榭",
          "contact": "",
          "contactphone": "",
          "devicesum": 0,
          "deviceonlinesum": 0,
          "terminalonlinesum": 0,
          "creatoruuid": "235d57ff8a90447ea77465f75c6f4b24",
          "createtime": "2022-10-08T09:34:55.000+0000",
          "updatetime": "2022-10-08T09:34:55.000+0000",
          "accountuuid": "bda4e167871c4c47b0b27fca0a7daab8",
          "totalCount": 0,
          "usedCount": 0,
          "flag": "0",
          "msgTipsCount": null
        }
      }
    }
  },
  {
    url: '/enterprise/create',
    type: 'post',
    response: config => {
      return { "code": 200, "msg": "success", "data": null }
    }
  },
  {
    url: '/enterprise/update',
    type: 'post',
    response: config => {
      return { "code": 200, "msg": "success", "data": null }
    }
  },
  {
    url: '/enterprise/delete',
    type: 'delete',
    response: config => {
      console.log(config);
      return { "code": 200, "msg": "success", "data": null }
    }
  },
  {
    url: '/site/list',
    type: 'get',
    response: config => {
      // const { enterpriseuuid="" } = config.query
      console.log(config.query)
      return {
        "code": 0,
        "msg": "",
        "data": [
          {
            "sitename": "403",
            "enterpriseuuid": "5805f7246b344d6bb73d331b585630ce",
            "siteuuid": "b41f6697942b460f80965ae1428f5a01",
            "address": "西安市雁塔区3G酷派智能产业园A座",
            "devicesum": 0,
            "deviceonlinesum": 0,
            "terminalonlinesum": 0,
            "status": "GRAY"
          },
          {
            "sitename": "501",
            "enterpriseuuid": "5805f7246b344d6bb73d331b585630ce",
            "siteuuid": "bbf814c82ed14c1399334e36123113c2",
            "address": "西安市雁塔区3G酷派智能产业园A座",
            "devicesum": 0,
            "deviceonlinesum": 0,
            "terminalonlinesum": 0,
            "status": "GRAY"
          }
        ]
      }
    }
  }, {
    url: '/site/view',
    type: 'get',
    response: config => {
      console.log(config.query)
      return {
        "code": 0,
        "msg": "",
        "data": {
          "siteuuid": "bbf814c82ed14c1399334e36123113c2",
          "sitename": "501",
          "operateType": 0,
          "lng": 108.892125,
          "lat": 34.193259,
          "countrycode": "CN",
          "address": "西安市雁塔区3G酷派智能产业园A座",
          "contact": "",
          "contactphone": "",
          "devicesum": 0,
          "deviceonlinesum": 0,
          "terminalonlinesum": 0,
          "creatoruuid": "235d57ff8a90447ea77465f75c6f4b24",
          "enterpriseuuid": "5805f7246b344d6bb73d331b585630ce",
          "createtime": "2022-09-29T09:47:27.000+0000",
          "updatetime": "2022-10-08T09:33:31.000+0000",
          "accountuuid": "bda4e167871c4c47b0b27fca0a7daab8",
          "timezoneWord": "add",
          "timezoneValue": 8,
          "timezoneIndex": "zone_94"
        }
      }
    }
  },
  {
    url: '/site/create',
    type: 'post',
    response: config => {
      return { "code": 200, "msg": "success", "data": null }
    }
  },
  {
    url: '/site/update',
    type: 'post',
    response: config => {
      return { "code": 200, "msg": "success", "data": null }
    }
  },
  {
    url: '/site/delete',
    type: 'delete',
    response: config => {
      console.log(config);
      return { "code": 200, "msg": "success", "data": null }
    }
  },
]