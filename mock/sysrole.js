
module.exports = [

  {
    url: '/system/role/list',
    type: 'get',
    response: config => {
      const { page = 1, limit = 20 } = config.query
      return {
        "total": 2,
        "rows": [
          {
            "roleId": 1,
            "roleName": "超级管理员",
            "roleKey": "admin",
            "status": "0",
            "searchValue": null,
            "createBy": null,
            "createTime": "2022-10-19 20:56:47",
            "remark": "超级管理员",
            "updateBy": null,
            "updateTime": null,
            "params": {},
            "roleSort": "1",
            "dataScope": "1",
            "menuCheckStrictly": true,
            "deptCheckStrictly": true,
            "delFlag": "0",
            "flag": false,
            "menuIds": null,
            "deptIds": null,
            "permissions": null,
            "admin": true
          },
          {
            "searchValue": null,
            "createBy": null,
            "createTime": "2022-10-19 20:56:47",
            "updateBy": null,
            "updateTime": null,
            "remark": "普通角色",
            "params": {},
            "roleId": 2,
            "roleName": "普通角色",
            "roleKey": "common",
            "roleSort": "2",
            "dataScope": "2",
            "menuCheckStrictly": true,
            "deptCheckStrictly": true,
            "status": "0",
            "delFlag": "0",
            "flag": false,
            "menuIds": null,
            "deptIds": null,
            "permissions": null,
            "admin": false
          }
        ],
        "code": 200,
        "msg": "查询成功"
      }
    }
  },
  {
    url: '/system/role/2',
    type: 'get',
    response: config => {
      return {
        "msg": "操作成功",
        "code": 200,
        "data": {
            "searchValue": null,
            "createBy": null,
            "createTime": "2022-10-19 20:56:47",
            "updateBy": null,
            "updateTime": null,
            "remark": "普通角色",
            "params": {},
            "roleId": 2,
            "roleName": "普通角色",
            "roleKey": "common",
            "roleSort": "2",
            "dataScope": "2",
            "menuCheckStrictly": true,
            "deptCheckStrictly": true,
            "status": "0",
            "delFlag": "0",
            "flag": false,
            "menuIds": [
              2,
              109,
              1046,
              1047,
              1048,
              110,
              1049,
              1050,
              1051,
              1052,
              1053,
              1054,
              111,
              112,
              113,
              114,
              3,
              115,
              116,
              1055,
              1056,
              1057,
              1058,
              1059,
              1060,
              117,
              4
              ],
            "deptIds": null,
            "permissions": null,
            "admin": false
        }
    }
    }
  },
]