
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
]