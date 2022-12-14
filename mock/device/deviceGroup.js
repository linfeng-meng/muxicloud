module.exports = [
  {
    url: '/deviceGroup/list',
    type: 'post',
    response: config => {
      return {
        "code": 0,
        "msg": "",
        "data": [
          {
            "groupUUID": "3bc686933632416a9938b63daffc4fab",
            "name": "默认设备组",
            "dftFlag": "1",
            "ledSwitch": "1",
            "airmatch": "0",
            "apTotalNum": 4,
            "apOnlineTotalNum": 0,
            "clientNum": 0
          },
          {
            "groupUUID": "082bc157e3924ce9a214945853f88379",
            "name": "设备组1",
            "dftFlag": "0",
            "ledSwitch": "1",
            "airmatch": "0",
            "apTotalNum": 0,
            "apOnlineTotalNum": 0,
            "clientNum": 0
          }
        ],
        "total": 2
      }
    }
  },
  {
    url: '/deviceGroup/view',
    type: 'get',
    response: config => {
      return {
        "code": 0,
        "msg": "",
        "data": {
          "groupUUID": "3bc686933632416a9938b63daffc4fab",
          "name": "默认设备组",
          "siteUUID": "bbf814c82ed14c1399334e36123113c2",
          "dftFlag": "1",
          "enterpriseUUID": "5805f7246b344d6bb73d331b585630ce",
          "vapIds": "3,4,5,6,7,8,9,10,11,12,13,14,15",
          "siteName": "501",
          "airmatch": "0",
          "ledSwitch": "1",
          "telnet": "1",
          "ssh": "1",
          "web": "1",
          "username": "admin",
          "password": "admin",
          "radio1PhysicalMode": "3",
          "radio2PhysicalMode": "7",
          "radio3PhysicalMode": "7",
          "radio1Bandwidth": "1",
          "radio2Bandwidth": "2",
          "radio3Bandwidth": "2"
        }
      }
    }
  },
]