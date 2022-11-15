module.exports = [
  {
    url: '/monitor/getAllSite',
    type: 'get',
    response: config => {
      return {
        "code": 0,
        "msg": "",
        "data": [
          {
            "siteuuid": "bbf814c82ed14c1399334e36123113c2",
            "sitename": "501",
            "lng": 108.892125,
            "lat": 34.193259
          },
          {
            "siteuuid": "b41f6697942b460f80965ae1428f5a01",
            "sitename": "403",
            "lng": 108.892125,
            "lat": 34.193259
          },
          {
            "siteuuid": "3abc2ef68c3f4e4aa3a4d0fcf04645c2",
            "sitename": "3213123",
            "lng": null,
            "lat": null
          },
          {
            "siteuuid": "9bcd94d3376949afb7041518cea392a2",
            "sitename": "3213123123",
            "lng": null,
            "lat": null
          },
          {
            "siteuuid": "378d168b7b044c0d8a14edb6f5b47e23",
            "sitename": "muxi1",
            "lng": 118.749769,
            "lat": 31.944155
          },
          {
            "siteuuid": "3fdd058c575a4bc58f0a2121a79c003f",
            "sitename": "新疆",
            "lng": 87.62037,
            "lat": 43.790165
          }
        ]
      }
    }
  },
  {
    url: '/monitor/getMonitorData',
    type: 'get',
    response: config => {
      console.log(config.query)
      return {
        "code": 200,
        "msg": "",
        "items": [
          {
            "uuid": "2b3e51181a1b4def8a3a608d8c535018",
            "name": "32443",
            "address": "",
            "deviceSum": 0,
            "deviceOnlineSum": 0,
            "statistics": "0/0",
            "terminalOnlineSum": "0",
            "key": "true",
            "status": "0"
          },
          {
            "uuid": "9bcd94d3376949afb7041518cea392a2",
            "name": "3213123123",
            "address": "",
            "deviceSum": 0,
            "deviceOnlineSum": 0,
            "statistics": "0/0",
            "terminalOnlineSum": "0",
            "key": "false",
            "status": "0"
          },
          {
            "uuid": "4754636ee8114c39adbb0b1029009e65",
            "name": "木犀",
            "address": "南京市雨花台区木犀榭",
            "deviceSum": 0,
            "deviceOnlineSum": 0,
            "statistics": "0/0",
            "terminalOnlineSum": "0",
            "key": "true",
            "status": "0"
          },
          {
            "uuid": "378d168b7b044c0d8a14edb6f5b47e23",
            "name": "muxi1",
            "address": "南京市雨花台区软件谷科创城",
            "deviceSum": 0,
            "deviceOnlineSum": 0,
            "statistics": "0/0",
            "terminalOnlineSum": "0",
            "key": "false",
            "status": "0"
          },
          {
            "uuid": "5805f7246b344d6bb73d331b585630ce",
            "name": "智邦大陆科技",
            "address": "西安市雁塔区3G酷派智能产业园A座",
            "deviceSum": 0,
            "deviceOnlineSum": 0,
            "statistics": "0/0",
            "terminalOnlineSum": "0",
            "key": "true",
            "status": "0"
          },
          {
            "uuid": "bbf814c82ed14c1399334e36123113c2",
            "name": "501",
            "address": "西安市雁塔区3G酷派智能产业园A座",
            "deviceSum": 0,
            "deviceOnlineSum": 0,
            "statistics": "0/0",
            "terminalOnlineSum": "0",
            "key": "false",
            "status": "0"
          },
          {
            "uuid": "b41f6697942b460f80965ae1428f5a01",
            "name": "403",
            "address": "西安市雁塔区3G酷派智能产业园A座1",
            "deviceSum": 0,
            "deviceOnlineSum": 0,
            "statistics": "0/0",
            "terminalOnlineSum": "0",
            "key": "false",
            "status": "0"
          },
          {
            "uuid": "839ff74587c64d1d928a9783b9be17ff",
            "name": "123123123",
            "address": "",
            "deviceSum": 0,
            "deviceOnlineSum": 0,
            "statistics": "0/0",
            "terminalOnlineSum": "0",
            "key": "true",
            "status": "0"
          },
          {
            "uuid": "3abc2ef68c3f4e4aa3a4d0fcf04645c2",
            "name": "3213123",
            "address": "",
            "deviceSum": 0,
            "deviceOnlineSum": 0,
            "statistics": "0/0",
            "terminalOnlineSum": "0",
            "key": "false",
            "status": "0"
          }
        ],
        "pages": 1,
        "page": 1,
        "total": 9,
        "count": 9
      }
    }
  },
  {
    url: '/monitor/getSiteInfo',
    type: 'get',
    response: config => {
      return {
        "code": 0,
        "msg": "",
        "data": {
          "apOnlineNum": "0",
          "apOfflineNum": "0",
          "acOnlineNum": "0",
          "acOfflineNum": "0",
          "gwOnlineNum": "0",
          "gwOfflineNum": "0",
          "switchOnlineNum": "0",
          "switchOfflineNum": "0",
          "capOnlineNum": "0",
          "capOfflineNum": "0",
          "dsccOnlineNum": "0",
          "dsccOfflineNum": "0",
          "meshOnlineNum": "0",
          "meshOfflineNum": "0"
        }
      }
    }
  },
  {
    url: '/log/operlogList',
    type: 'get',
    response: config => {
      return {
        "code": 0,
        "msg": "",
        "data": {
          "code": 0,
          "msg": "",
          "items": [
            {
              "id":1,
              "creatorName": "355133662@qq.com",
              "logMsg": "更新站点[403]",
              "logLevel": 0,
              "logTime": "2022-11-01 13:42:27"
            },
            {
              "id":2,
              "creatorName": "355133662@qq.com",
              "logMsg": "新增站点[403]",
              "logLevel": 0,
              "logTime": "2022-10-08 17:33:59"
            }
          ],
          "pages": 1,
          "page": 1,
          "total": 2,
          "count": 2
        }
      }
    }
  },
  {
    url: '/log/operlog',
    type: 'delete',
    response: config => {
      return {
        "code": 0,
        "msg": "delete success",
      }
    }
  },
  {
    url: '/log/operlog/clean',
    type: 'delete',
    response: config => {
      return {
        "code": 0,
        "msg": "clean success",
      }
    }
  },
  {
    url: '/log/operlog/export',
    type: 'post',
    response: config => {
      return {
        "code": 200,
        "msg": "export success",
      }
    }
  },
  {
    url: '/log/devicelogList',
    type: 'get',
    response: config => {
      return {
        "code": 0,
        "msg": "",
        "data": {
          "code": 0,
          "msg": "",
          "items": [
            {
              "id":1,
              "type": "1",
              "sn": "3eg3212312sd123",
              "mac": "d1:b2:c3:d4:e5:f6",
              "ip": "192.168.125.43",
              "sitename": "403",
              "status": 1,
              "createtime": "2022-11-01 13:42:27"
            },
            {
              "id":2,
              "type": "2",
              "sn": "3eg3212312sd123",
              "mac": "d1:b2:c3:d4:e5:f6",
              "ip": "192.168.125.43",
              "sitename": "403",
              "status": 2,
              "createtime": "2022-11-01 13:42:27"
            },
          ],
          "pages": 1,
          "page": 1,
          "total": 2,
          "count": 2
        }
      }
    }
  },
  {
    url: '/log/devicelog',
    type: 'delete',
    response: config => {
      return {
        "code": 0,
        "msg": "delete success",
      }
    }
  },
  {
    url: '/log/devicelog/clean',
    type: 'delete',
    response: config => {
      return {
        "code": 0,
        "msg": "clean success",
      }
    }
  },
  {
    url: '/log/devicelog/export',
    type: 'post',
    response: config => {
      return {
        "code": 200,
        "msg": "export success",
      }
    }
  },
  {
    url: '/log/termlogList',
    type: 'get',
    response: config => {
      return {
        "code": 0,
        "msg": "",
        "data": {
          "code": 0,
          "msg": "",
          "items": [
            {
              "id":1,
              "username": "123312",
              "usermac": "d1:b2:c3:d4:e5:f6",
              "userip": "192.168.125.43",
              "onlineTime": "2022-11-01 13:42:27",
              "offlineTime": "2022-11-01 13:42:27"
            },
            {
              "id":2,
              "username": "12321",
              "usermac": "d1:b2:c3:d4:e5:f6",
              "userip": "192.168.125.43",
              "onlineTime": "2022-11-01 13:42:27",
              "offlineTime": "2022-11-01 13:42:27"
            },
          ],
          "total": 100,
          "count": 2
        }
      }
    }
  },
  {
    url: '/log/termlog',
    type: 'delete',
    response: config => {
      return {
        "code": 0,
        "msg": "delete success",
      }
    }
  },
  {
    url: '/log/termlog/clean',
    type: 'delete',
    response: config => {
      return {
        "code": 0,
        "msg": "clean success",
      }
    }
  },
  {
    url: '/log/termlog/export',
    type: 'post',
    response: config => {
      return {
        "code": 200,
        "msg": "export success",
      }
    }
  },
]