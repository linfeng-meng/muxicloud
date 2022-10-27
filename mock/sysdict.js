
module.exports = [
  // user login
  {
    url: '/system/dict/data/type/sys_normal_disable',
    type: 'get',
    response: config => {
      return {
        "msg": "操作成功",
        "code": 200,
        "data": [
        {
        "searchValue": null,
        "createBy": "admin",
        "createTime": "2022-08-01 12:01:42",
        "updateBy": null,
        "updateTime": null,
        "remark": "正常状态",
        "params": {},
        "dictCode": 6,
        "dictSort": 1,
        "dictLabel": "正常",
        "dictValue": "0",
        "dictType": "sys_normal_disable",
        "cssClass": "",
        "listClass": "primary",
        "isDefault": "Y",
        "status": "0",
        "default": true
        },
        {
        "searchValue": null,
        "createBy": "admin",
        "createTime": "2022-08-01 12:01:43",
        "updateBy": null,
        "updateTime": null,
        "remark": "停用状态",
        "params": {},
        "dictCode": 7,
        "dictSort": 2,
        "dictLabel": "停用",
        "dictValue": "1",
        "dictType": "sys_normal_disable",
        "cssClass": "",
        "listClass": "danger",
        "isDefault": "N",
        "status": "0",
        "default": false
        }
        ]
        }
    }
  },
  {
    url: '/system/dict/data/type/sys_user_sex',
    type: 'get',
    response: config => {
      return {
        "msg": "操作成功",
        "code": 200,
        "data": [
        {
        "searchValue": null,
        "createBy": "admin",
        "createTime": "2022-08-01 12:01:41",
        "updateBy": null,
        "updateTime": null,
        "remark": "性别男",
        "params": {},
        "dictCode": 1,
        "dictSort": 1,
        "dictLabel": "男",
        "dictValue": "0",
        "dictType": "sys_user_sex",
        "cssClass": "",
        "listClass": "",
        "isDefault": "Y",
        "status": "0",
        "default": true
        },
        {
        "searchValue": null,
        "createBy": "admin",
        "createTime": "2022-08-01 12:01:41",
        "updateBy": null,
        "updateTime": null,
        "remark": "性别女",
        "params": {},
        "dictCode": 2,
        "dictSort": 2,
        "dictLabel": "女",
        "dictValue": "1",
        "dictType": "sys_user_sex",
        "cssClass": "",
        "listClass": "",
        "isDefault": "N",
        "status": "0",
        "default": false
        },
        {
        "searchValue": null,
        "createBy": "admin",
        "createTime": "2022-08-01 12:01:42",
        "updateBy": null,
        "updateTime": null,
        "remark": "性别未知",
        "params": {},
        "dictCode": 3,
        "dictSort": 3,
        "dictLabel": "未知",
        "dictValue": "2",
        "dictType": "sys_user_sex",
        "cssClass": "",
        "listClass": "",
        "isDefault": "N",
        "status": "0",
        "default": false
        }
        ]
        }
    }
  }
]