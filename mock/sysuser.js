
module.exports = [

  {
    url: '/system/user/deptTree',
    type: 'get',
    response: config => {
      return {
        "msg": "操作成功",
        "code": 200,
        "data": [
              {
                "id": 101,
                "label": "深圳总公司",
                "children": [
                  {
                    "id": 103,
                    "label": "研发部门"
                  },
                  {
                    "id": 104,
                    "label": "市场部门"
                  },
                  {
                    "id": 105,
                    "label": "测试部门"
                  },
                  {
                    "id": 106,
                    "label": "财务部门"
                  },
                  {
                    "id": 107,
                    "label": "运维部门"
                  }
                ]
              },
              {
                "id": 102,
                "label": "长沙分公司",
                "children": [
                  {
                    "id": 108,
                    "label": "市场部门"
                  },
                  {
                    "id": 109,
                    "label": "财务部门"
                  }
                ]
              }
            ]
      }
    }
  },
  {
    url: '/system/user/list',
    type: 'get',
    response: config => {
      const { page = 1, limit = 20 } = config.query
      console.log(page, limit);
      return {
        "total": 2,
        "rows": [
          {
            "searchValue": null,
            "createBy": "admin",
            "createTime": "2022-08-01 12:00:20",
            "updateBy": null,
            "updateTime": null,
            "remark": "管理员",
            "params": {},
            "userId": 1,
            "deptId": 103,
            "userName": "admin",
            "nickName": "若依",
            "email": "ry@163.com",
            "phonenumber": "15888888888",
            "sex": "1",
            "avatar": "",
            "password": null,
            "status": "0",
            "delFlag": "0",
            "loginIp": "117.62.137.182",
            "loginDate": "2022-10-19T14:11:22.000+08:00",
            "dept": {
              "searchValue": null,
              "createBy": null,
              "createTime": null,
              "updateBy": null,
              "updateTime": null,
              "remark": null,
              "params": {},
              "deptId": 103,
              "parentId": null,
              "ancestors": null,
              "deptName": "研发部门",
              "orderNum": null,
              "leader": "若依",
              "phone": null,
              "email": null,
              "status": null,
              "delFlag": null,
              "parentName": null,
              "children": []
            },
            "roles": [],
            "roleIds": null,
            "postIds": null,
            "roleId": null,
            "admin": true
          },
          {
            "searchValue": null,
            "createBy": "admin",
            "createTime": "2022-08-01 12:00:21",
            "updateBy": null,
            "updateTime": null,
            "remark": "测试员",
            "params": {},
            "userId": 2,
            "deptId": 105,
            "userName": "ry",
            "nickName": "若依",
            "email": "ry@qq.com",
            "phonenumber": "15666666666",
            "sex": "1",
            "avatar": "",
            "password": null,
            "status": "0",
            "delFlag": "0",
            "loginIp": "61.237.228.2",
            "loginDate": "2022-10-19T14:05:02.000+08:00",
            "dept": {
              "searchValue": null,
              "createBy": null,
              "createTime": null,
              "updateBy": null,
              "updateTime": null,
              "remark": null,
              "params": {},
              "deptId": 105,
              "parentId": null,
              "ancestors": null,
              "deptName": "测试部门",
              "orderNum": null,
              "leader": "若依",
              "phone": null,
              "email": null,
              "status": null,
              "delFlag": null,
              "parentName": null,
              "children": []
            },
            "roles": [],
            "roleIds": null,
            "postIds": null,
            "roleId": null,
            "admin": false
          }
        ],
        "code": 200,
        "msg": "查询成功"
      }
    }
  },
  {
    url: '/system/config/configKey/sys.user.initPassword',
    type: 'get',
    response: config => {
      return {"msg":"123456","code":200}
    }
  },
  {
    url: '/user/getDefaultEnterpriseTree',
    type: 'get',
    response: config => {
      return {
        "code": 200,
        "msg": "查询成功",
        "data":{
          "trees": [
          {
          "enterpriseuuid": "5805f7246b344d6bb73d331b585630ce",
          "enterprisename": "智邦大陆科技",
          "operateType": 0,
          "lng": 108.892125,
          "lat": 34.193259,
          "address": "西安市雁塔区3G酷派智能产业园A座",
          "contact": "",
          "contactphone": "",
          "devicesum": 0,
          "deviceonlinesum": 0,
          "terminalonlinesum": 0,
          "creatoruuid": "235d57ff8a90447ea77465f75c6f4b24",
          "accountuuid": "bda4e167871c4c47b0b27fca0a7daab8",
          "site": [
          {
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
          },
          {
          "siteuuid": "b41f6697942b460f80965ae1428f5a01",
          "sitename": "403",
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
          "createtime": "2022-10-08T09:33:59.000+0000",
          "updatetime": "2022-10-08T09:33:59.000+0000",
          "accountuuid": "bda4e167871c4c47b0b27fca0a7daab8",
          "timezoneWord": "add",
          "timezoneValue": 8,
          "timezoneIndex": "zone_94"
          }
          ]
          },
          {
          "enterpriseuuid": "4754636ee8114c39adbb0b1029009e65",
          "enterprisename": "木犀",
          "operateType": 0,
          "lng": 118.788498,
          "lat": 32.004061,
          "address": "南京市雨花台区木犀榭",
          "contact": "",
          "contactphone": "",
          "devicesum": 0,
          "deviceonlinesum": 0,
          "terminalonlinesum": 0,
          "creatoruuid": "235d57ff8a90447ea77465f75c6f4b24",
          "accountuuid": "bda4e167871c4c47b0b27fca0a7daab8",
          "site": [
          {
          "siteuuid": "2c90ebaec87947699bc774ce07917d69",
          "sitename": "123",
          "operateType": 0,
          "lng": null,
          "lat": null,
          "countrycode": "CN",
          "address": "",
          "contact": "",
          "contactphone": "",
          "devicesum": 0,
          "deviceonlinesum": 0,
          "terminalonlinesum": 0,
          "creatoruuid": "235d57ff8a90447ea77465f75c6f4b24",
          "enterpriseuuid": "4754636ee8114c39adbb0b1029009e65",
          "createtime": "2022-10-27T07:19:48.000+0000",
          "updatetime": "2022-10-27T07:19:48.000+0000",
          "accountuuid": "bda4e167871c4c47b0b27fca0a7daab8",
          "timezoneWord": "add",
          "timezoneValue": 8,
          "timezoneIndex": "zone_94"
          }
          ]
          },
          {
          "enterpriseuuid": "117c67ee454540b99b94ec0cb47758d8",
          "enterprisename": "456",
          "operateType": 0,
          "lng": 108.891453,
          "lat": 34.193435,
          "address": "西安市雁塔区3G酷派智能产业园",
          "contact": "",
          "contactphone": "",
          "devicesum": 0,
          "deviceonlinesum": 0,
          "terminalonlinesum": 0,
          "creatoruuid": "235d57ff8a90447ea77465f75c6f4b24",
          "accountuuid": "bda4e167871c4c47b0b27fca0a7daab8",
          "site": null
          }
          ],
          "defaultTree": null
          }
      }
    }
  },
]