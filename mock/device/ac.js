module.exports = [
  {
    url: '/ac/list',
    type: 'get',
    response: config => {
      return {
        "code": 0,
        "msg": "",
        "items": [
          {
            "status": "1",
            "name": "无线控制器1",
            "sn": "123",
            "ip": null,
            "mac": null,
            "modelName": null,
            "version": null,
            "publicIp": null,
            "apTotal": 0,
            "onlineTime": "0秒",
            "siteName": "501",
            "location": "墙角",
            "deviceUUID": "4e7dfc0c52c840e9a484e850a7e9dcd5",
            "upgradeStatus": 1,
            "enableImcloud": 0,
            "type": null
          },
          {
            "status": "0",
            "name": "无线控制器2",
            "sn": "456",
            "ip": null,
            "mac": null,
            "modelName": null,
            "version": null,
            "publicIp": null,
            "apTotal": 0,
            "onlineTime": "0秒",
            "siteName": "501",
            "location": "天花板",
            "deviceUUID": "5be3339a28084619baf8a377188d0dbc",
            "upgradeStatus": 0,
            "enableImcloud": 1,
            "type": null
          }
        ],
        "pages": 1,
        "page": 1,
        "total": 2,
        "count": 2
      }
    }
  },
  {
    url: '/ac/view',
    type: 'get',
    response: config => {
      return {"code":0,"msg":"","data":{"deviceUUID":"512e209f73954f35be62d1974549e3d9","name":"无线控制器2","sn":"12312312","siteUUID":"bbf814c82ed14c1399334e36123113c2","siteName":"501","location":"13232","lng":0E-7,"lat":0E-7}}
    }
  },
  {
    url: '/ac/deviceRestart',
    type: 'post',
    response: config => {
      return {
        code: 0,
        msg: 'success'
      }
    }
  },
  {
    url: '/statistic/apList',
    type: 'get',
    response: config => {
      return {
        "code": 0,
        "msg": "",
        "data": [
          {
            "status": "0",
            "name": "ap1",
            "sn": "123",
            "ip": null,
            "mac": "d1:b2:c3:d4:e5:f6",
            "modelName": "ap3220",
            "channel": 68,
            "publicIp": null,
            "deviceUUID": "4e7dfc0c52c840e9a484e850a7e9dcd5",
          },
          {
            "status": "1",
            "name": "ap2",
            "sn": "123",
            "ip": null,
            "mac": "d1:b2:c3:d4:e5:f6",
            "modelName": "ap3220",
            "channel": 68,
            "publicIp": null,
            "deviceUUID": "4e7dfc0c51c840e9a484e850a7e9dcd5",
          }
        ],
        "pages": 1,
        "page": 1,
        "total": 2,
        "count": 2
      }
    }
  },
  {
    url: '/statistic/memoryPerformance',
    type: 'get',
    response: config => {
      switch (config.query.timeType) {
        case '1':
          return {"code":0,"msg":"","data":{"dates":["11-17 11:00","11-17 12:00","11-17 13:00","11-17 14:00","11-17 15:00","11-17 16:00","11-17 17:00","11-17 18:00","11-17 19:00","11-17 20:00","11-17 21:00","11-17 22:00","11-17 23:00","11-18 00:00","11-18 01:00","11-18 02:00","11-18 03:00","11-18 04:00","11-18 05:00","11-18 06:00","11-18 07:00","11-18 08:00","11-18 09:00","11-18 10:00"],"ratios":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],"data":0.0}}
        case '2':
          return { "code": 0, "msg": "", "data": { "dates": ["11-11 11:00", "11-11 12:00", "11-11 13:00", "11-11 14:00", "11-11 15:00", "11-11 16:00", "11-11 17:00", "11-11 18:00", "11-11 19:00", "11-11 20:00", "11-11 21:00", "11-11 22:00", "11-11 23:00", "11-12 00:00", "11-12 01:00", "11-12 02:00", "11-12 03:00", "11-12 04:00", "11-12 05:00", "11-12 06:00", "11-12 07:00", "11-12 08:00", "11-12 09:00", "11-12 10:00", "11-12 11:00", "11-12 12:00", "11-12 13:00", "11-12 14:00", "11-12 15:00", "11-12 16:00", "11-12 17:00", "11-12 18:00", "11-12 19:00", "11-12 20:00", "11-12 21:00", "11-12 22:00", "11-12 23:00", "11-13 00:00", "11-13 01:00", "11-13 02:00", "11-13 03:00", "11-13 04:00", "11-13 05:00", "11-13 06:00", "11-13 07:00", "11-13 08:00", "11-13 09:00", "11-13 10:00", "11-13 11:00", "11-13 12:00", "11-13 13:00", "11-13 14:00", "11-13 15:00", "11-13 16:00", "11-13 17:00", "11-13 18:00", "11-13 19:00", "11-13 20:00", "11-13 21:00", "11-13 22:00", "11-13 23:00", "11-14 00:00", "11-14 01:00", "11-14 02:00", "11-14 03:00", "11-14 04:00", "11-14 05:00", "11-14 06:00", "11-14 07:00", "11-14 08:00", "11-14 09:00", "11-14 10:00", "11-14 11:00", "11-14 12:00", "11-14 13:00", "11-14 14:00", "11-14 15:00", "11-14 16:00", "11-14 17:00", "11-14 18:00", "11-14 19:00", "11-14 20:00", "11-14 21:00", "11-14 22:00", "11-14 23:00", "11-15 00:00", "11-15 01:00", "11-15 02:00", "11-15 03:00", "11-15 04:00", "11-15 05:00", "11-15 06:00", "11-15 07:00", "11-15 08:00", "11-15 09:00", "11-15 10:00", "11-15 11:00", "11-15 12:00", "11-15 13:00", "11-15 14:00", "11-15 15:00", "11-15 16:00", "11-15 17:00", "11-15 18:00", "11-15 19:00", "11-15 20:00", "11-15 21:00", "11-15 22:00", "11-15 23:00", "11-16 00:00", "11-16 01:00", "11-16 02:00", "11-16 03:00", "11-16 04:00", "11-16 05:00", "11-16 06:00", "11-16 07:00", "11-16 08:00", "11-16 09:00", "11-16 10:00", "11-16 11:00", "11-16 12:00", "11-16 13:00", "11-16 14:00", "11-16 15:00", "11-16 16:00", "11-16 17:00", "11-16 18:00", "11-16 19:00", "11-16 20:00", "11-16 21:00", "11-16 22:00", "11-16 23:00", "11-17 00:00", "11-17 01:00", "11-17 02:00", "11-17 03:00", "11-17 04:00", "11-17 05:00", "11-17 06:00", "11-17 07:00", "11-17 08:00", "11-17 09:00", "11-17 10:00", "11-17 11:00", "11-17 12:00", "11-17 13:00", "11-17 14:00", "11-17 15:00", "11-17 16:00", "11-17 17:00", "11-17 18:00", "11-17 19:00", "11-17 20:00", "11-17 21:00", "11-17 22:00", "11-17 23:00", "11-18 00:00", "11-18 01:00", "11-18 02:00", "11-18 03:00", "11-18 04:00", "11-18 05:00", "11-18 06:00", "11-18 07:00", "11-18 08:00", "11-18 09:00", "11-18 10:00"], "ratios": [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], "data": 0.0 } }
        case '3':
          return { "code": 0, "msg": "", "data": { "dates": ["2022-10-18", "2022-10-19", "2022-10-20", "2022-10-21", "2022-10-22", "2022-10-23", "2022-10-24", "2022-10-25", "2022-10-26", "2022-10-27", "2022-10-28", "2022-10-29", "2022-10-30", "2022-10-31", "2022-11-01", "2022-11-02", "2022-11-03", "2022-11-04", "2022-11-05", "2022-11-06", "2022-11-07", "2022-11-08", "2022-11-09", "2022-11-10", "2022-11-11", "2022-11-12", "2022-11-13", "2022-11-14", "2022-11-15", "2022-11-16", "2022-11-17"], "ratios": [1, 2, 3, 4, 5, 6, 7, 8, 9, 23, 22, 43, 34, 45, 12, 56, 32, 45, 76, 89, 98, 34, 12, 11, 45, 44, 55, 56, 67, 34, 12], "data": 0.0 } }
      }

    }
  },
  {
    url: '/statistic/cpuPerformance',
    type: 'get',
    response: config => {
      switch (config.query.timeType) {
        case '1':
          return {"code":0,"msg":"","data":{"dates":["11-17 11:00","11-17 12:00","11-17 13:00","11-17 14:00","11-17 15:00","11-17 16:00","11-17 17:00","11-17 18:00","11-17 19:00","11-17 20:00","11-17 21:00","11-17 22:00","11-17 23:00","11-18 00:00","11-18 01:00","11-18 02:00","11-18 03:00","11-18 04:00","11-18 05:00","11-18 06:00","11-18 07:00","11-18 08:00","11-18 09:00","11-18 10:00"],"ratios":[32,32,67,45,23,76,34,13,24,23,51,51,34,23,66,22,1,32,11,13,13,34,54,78],"data":0.0}}
        case '2':
          return { "code": 0, "msg": "", "data": { "dates": ["11-11 11:00", "11-11 12:00", "11-11 13:00", "11-11 14:00", "11-11 15:00", "11-11 16:00", "11-11 17:00", "11-11 18:00", "11-11 19:00", "11-11 20:00", "11-11 21:00", "11-11 22:00", "11-11 23:00", "11-12 00:00", "11-12 01:00", "11-12 02:00", "11-12 03:00", "11-12 04:00", "11-12 05:00", "11-12 06:00", "11-12 07:00", "11-12 08:00", "11-12 09:00", "11-12 10:00", "11-12 11:00", "11-12 12:00", "11-12 13:00", "11-12 14:00", "11-12 15:00", "11-12 16:00", "11-12 17:00", "11-12 18:00", "11-12 19:00", "11-12 20:00", "11-12 21:00", "11-12 22:00", "11-12 23:00", "11-13 00:00", "11-13 01:00", "11-13 02:00", "11-13 03:00", "11-13 04:00", "11-13 05:00", "11-13 06:00", "11-13 07:00", "11-13 08:00", "11-13 09:00", "11-13 10:00", "11-13 11:00", "11-13 12:00", "11-13 13:00", "11-13 14:00", "11-13 15:00", "11-13 16:00", "11-13 17:00", "11-13 18:00", "11-13 19:00", "11-13 20:00", "11-13 21:00", "11-13 22:00", "11-13 23:00", "11-14 00:00", "11-14 01:00", "11-14 02:00", "11-14 03:00", "11-14 04:00", "11-14 05:00", "11-14 06:00", "11-14 07:00", "11-14 08:00", "11-14 09:00", "11-14 10:00", "11-14 11:00", "11-14 12:00", "11-14 13:00", "11-14 14:00", "11-14 15:00", "11-14 16:00", "11-14 17:00", "11-14 18:00", "11-14 19:00", "11-14 20:00", "11-14 21:00", "11-14 22:00", "11-14 23:00", "11-15 00:00", "11-15 01:00", "11-15 02:00", "11-15 03:00", "11-15 04:00", "11-15 05:00", "11-15 06:00", "11-15 07:00", "11-15 08:00", "11-15 09:00", "11-15 10:00", "11-15 11:00", "11-15 12:00", "11-15 13:00", "11-15 14:00", "11-15 15:00", "11-15 16:00", "11-15 17:00", "11-15 18:00", "11-15 19:00", "11-15 20:00", "11-15 21:00", "11-15 22:00", "11-15 23:00", "11-16 00:00", "11-16 01:00", "11-16 02:00", "11-16 03:00", "11-16 04:00", "11-16 05:00", "11-16 06:00", "11-16 07:00", "11-16 08:00", "11-16 09:00", "11-16 10:00", "11-16 11:00", "11-16 12:00", "11-16 13:00", "11-16 14:00", "11-16 15:00", "11-16 16:00", "11-16 17:00", "11-16 18:00", "11-16 19:00", "11-16 20:00", "11-16 21:00", "11-16 22:00", "11-16 23:00", "11-17 00:00", "11-17 01:00", "11-17 02:00", "11-17 03:00", "11-17 04:00", "11-17 05:00", "11-17 06:00", "11-17 07:00", "11-17 08:00", "11-17 09:00", "11-17 10:00", "11-17 11:00", "11-17 12:00", "11-17 13:00", "11-17 14:00", "11-17 15:00", "11-17 16:00", "11-17 17:00", "11-17 18:00", "11-17 19:00", "11-17 20:00", "11-17 21:00", "11-17 22:00", "11-17 23:00", "11-18 00:00", "11-18 01:00", "11-18 02:00", "11-18 03:00", "11-18 04:00", "11-18 05:00", "11-18 06:00", "11-18 07:00", "11-18 08:00", "11-18 09:00", "11-18 10:00"], "ratios": [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], "data": 0.0 } }
        case '3':
          return { "code": 0, "msg": "", "data": { "dates": ["2022-10-18", "2022-10-19", "2022-10-20", "2022-10-21", "2022-10-22", "2022-10-23", "2022-10-24", "2022-10-25", "2022-10-26", "2022-10-27", "2022-10-28", "2022-10-29", "2022-10-30", "2022-10-31", "2022-11-01", "2022-11-02", "2022-11-03", "2022-11-04", "2022-11-05", "2022-11-06", "2022-11-07", "2022-11-08", "2022-11-09", "2022-11-10", "2022-11-11", "2022-11-12", "2022-11-13", "2022-11-14", "2022-11-15", "2022-11-16", "2022-11-17"], "ratios": [1, 2, 3, 4, 5, 6, 7, 8, 9, 23, 22, 43, 34, 45, 12, 56, 32, 45, 76, 89, 98, 34, 12, 11, 45, 44, 55, 56, 67, 34, 12], "data": 0.0 } }
      }

    }
  },
]