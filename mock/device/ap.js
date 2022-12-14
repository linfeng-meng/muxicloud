module.exports = [
  {
    url: '/cap/list',
    type: 'get',
    response: config => {
      return { "code": 0, "msg": "", "items": [{ "status": "0", "name": "cap2", "sn": "789", "ip": "192.168.1.1", "mac": "11:22:33:44:55:66", "trueChannel": "1", "truePower": null, "trueBandwidth": "20", "modelName": "123", "groupName": "501/默认设备组", "version": "v1", "workMode": "1", "ipAdress": "192.168.3.4", "clientNum": 0, "totalFlow": "0", "onlineTime": "0秒", "siteName": "501", "location": null, "deviceUUID": "d5eeb8f963c9492ab93c70fc71236d82", "upgradeStatus": 0, "radio1Utilization": null, "radio2Utilization": null, "radio3Utilization": null, "enableImcloud": 0, "hopePower": "0/0/0", "hopeBandwidth": "1/2/2", "hopeChannel": "0/0/0" }, { "status": "0", "name": "cap1", "sn": "321", "ip": null, "mac": null, "trueChannel": null, "truePower": null, "trueBandwidth": null, "modelName": null, "groupName": "501/默认设备组", "version": null, "workMode": null, "ipAdress": "", "clientNum": 0, "totalFlow": "0", "onlineTime": "0秒", "siteName": "501", "location": null, "deviceUUID": "ff6ad146613d4657967644b639ad40f4", "upgradeStatus": 0, "radio1Utilization": null, "radio2Utilization": null, "radio3Utilization": null, "enableImcloud": 0, "hopePower": "0/0/0", "hopeBandwidth": "1/2/2", "hopeChannel": "0/0/0" }], "pages": 1, "page": 1, "total": 2, "count": 2 }
    }
  },
]