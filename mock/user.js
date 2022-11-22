
module.exports = [
  // user login
  {
    url: '/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      console.log(username);
      // const token = tokens[username]

      // mock error
      if (username == "admin") {
        return {
          "msg": "操作成功",
          "code": 200,
          "token": "eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjBjNjQyNjQ0LWU3MzctNDQyZC1hYmM5LWFhYTRkYWQxNzM2YyJ9.o55dwrF5MxIJBUKN09BOYYblsv9Xj6zN5BWwTLlDL-_aIGzuwzh6BY8fTUw6D7PnNOw-rt-YmKYpLD37TcAXUA"
        }
      } else {
        return {
          "code": 500,
          "msg": 'Account and password are incorrect.'
        }

      }

    }
  },

  // get user info
  {
    url: '/getInfo\.*',
    type: 'get',
    response: config => {
      // const { token } = config.query
      // const info = users[token]

      // // mock error
      // if (!info) {
      //   return {
      //     code: 50008,
      //     message: 'Login failed, unable to get user details.'
      //   }
      // }

      return {
        "msg": "操作成功",
        "code": 200,
        "permissions": [
          "monitor:topo:list",
          "monitor:overview:list",
          "monitor:logs:list",
          "monitor:operlog:list",
          "monitor:operlog:remove",
          "monitor:operlog:export",
          "monitor:devicelog:list",
          "monitor:devicelog:remove",
          "monitor:devicelog:export",
          "monitor:termlog:list",
          "monitor:termlog:remove",
          "monitor:termlog:export",
          "device:ac:list",
          "device:ac:add",
          "device:ac:edit",
          "device:ac:remove",
          "device:ap:list",
          "device:dcme:list",
          "device:switch:list",
          "device:controller:list",
          "device:deviceGroup:list",
          "wireless:netconfig:list",
          "wireless:auth:list",
          "wireless:strategy:list",
          "wireless:msmconfig:list",
          "wireless:list:list",
          "company:list:list",
          "company:list:add",
          "company:list:edit",
          "company:list:remove",
          "company:manager:list",
          "company:manager:add",
          "company:manager:edit",
          "company:manager:remove",
          "company:user:list",
          "alarm:list:list",
          "alarm:noticeSetting:list",
          "alarm:alarmSetting:list",
          "alarm:monitoringUsers:list",
        ],
        "roles": ["common"],
        "user": {
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
          "password": "$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2",
          "status": "0",
          "delFlag": "0",
          "loginIp": "103.91.179.140",
          "loginDate": "2022-10-19T14:38:51.000+08:00",
          "dept": {
            "searchValue": null,
            "createBy": null,
            "createTime": null,
            "updateBy": null,
            "updateTime": null,
            "remark": null,
            "params": {},
            "deptId": 105,
            "parentId": 101,
            "ancestors": "0,100,101",
            "deptName": "测试部门",
            "orderNum": 3,
            "leader": "若依",
            "phone": null,
            "email": null,
            "status": "0",
            "delFlag": null,
            "parentName": null,
            "children": []
          },
          "roles": [
            {
              "searchValue": null,
              "createBy": null,
              "createTime": null,
              "updateBy": null,
              "updateTime": null,
              "remark": null,
              "params": {},
              "roleId": 2,
              "roleName": "普通角色",
              "roleKey": "common",
              "roleSort": "2",
              "dataScope": "2",
              "menuCheckStrictly": false,
              "deptCheckStrictly": false,
              "status": "0",
              "delFlag": null,
              "flag": false,
              "menuIds": null,
              "deptIds": null,
              "permissions": null,
              "admin": false
            }
          ],
          "roleIds": null,
          "postIds": null,
          "roleId": null,
          "admin": false
        }
      }
    }
  },

  // user logout
  {
    url: '/logout',
    type: 'post',
    response: _ => {
      return { "msg": "退出成功", "code": 200 }
    }
  },
  {
    url: '/captchaImage',
    type: 'get',
    response: _ => {
      return {
        "msg": "操作成功",
        "img": "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",
        "code": 200,
        "captchaEnabled": true,
        "uuid": "5b26752eae2d4013b20e1d8c7f776e06"
      }
    }
  },
  {
    url: '/getRouters',
    type: 'get',
    response: _ => {
      return {
        "msg": "操作成功",
        "code": 200,
        data: [
          {
            "params": {},
            "menuId": 1,
            "menuName": "Monitor",
            "parentName": null,
            "parentId": 0,
            "path": "monitor",
            "component": null,
            "menuType": "M",
            "perms": "",
            "icon": "system",
            "children": []
          },
          {
            "params": {},
            "menuId": 2,
            "menuName": "Device",
            "parentName": null,
            "parentId": 0,
            "path": "device",
            "component": null,
            "menuType": "M",
            "perms": "",
            "icon": "monitor",
            "children": []
          },
          {
            "params": {},
            "menuId": 3,
            "menuName": "Configuration",
            "parentName": null,
            "parentId": 0,
            "path": "wireless",
            "component": null,
            "menuType": "M",
            "perms": "",
            "icon": "tool",
            "children": []
          },
          {
            "params": {},
            "menuId": 4,
            "menuName": "Organization",
            "parentName": null,
            "parentId": 0,
            "path": "company",
            "component": null,
            "menuType": "M",
            "perms": "",
            "icon": "tree",
            "children": []
          },
          {
            "params": {},
            "menuId": 5,
            "menuName": "Notification",
            "parentName": null,
            "parentId": 0,
            "path": "alarm",
            "component": null,
            "menuType": "M",
            "perms": "",
            "icon": "guide",
            "children": []
          },
          {
            "params": {},
            "menuId": 1101,
            "menuName": "Topology",
            "parentName": null,
            "parentId": 1,
            "path": "topo",
            "component": "monitor/topo/index",
            "menuType": "C",
            "perms": "monitor:topo:list",
            "icon": "",
            "children": []
          },
          {
            "params": {},
            "menuId": 1102,
            "menuName": "Site Distribution",
            "parentName": null,
            "parentId": 1,
            "path": "overview",
            "component": "monitor/overview/index",
            "menuType": "C",
            "perms": "monitor:overview:list",
            "icon": "",
            "children": []
          },
          {
            "params": {},
            "menuId": 1103,
            "menuName": "Logs",
            "parentName": null,
            "parentId": 1,
            "path": "logs",
            "component": "monitor/logs/index",
            "menuType": "C",
            "perms": "monitor:logs:list",
            "icon": "",
            "children": []
          },
          {
            "params": {},
            "menuId": 1201,
            "menuName": "AC",
            "parentName": null,
            "parentId": 2,
            "path": "ac",
            "component": "device/ac/index",
            "menuType": "C",
            "perms": "device:ac:list",
            "icon": "",
            "children": []
          },
          {
            "params": {},
            "menuId": 1202,
            "menuName": "AP",
            "parentName": null,
            "parentId": 2,
            "path": "ap",
            "component": "device/ap/index",
            "menuType": "C",
            "perms": "device:ap:list",
            "icon": "",
            "children": []
          },
          {
            "params": {},
            "menuId": 1203,
            "menuName": "Gateway",
            "parentName": null,
            "parentId": 2,
            "path": "dcme",
            "component": "device/dcme/index",
            "menuType": "C",
            "perms": "device:dcme:list",
            "icon": "",
            "children": []
          },
          {
            "params": {},
            "menuId": 1204,
            "menuName": "Switch",
            "parentName": null,
            "parentId": 2,
            "path": "switch",
            "component": "device/switch/index",
            "menuType": "C",
            "perms": "device:switch:list",
            "icon": "",
            "children": []
          },
          {
            "params": {},
            "menuId": 1205,
            "menuName": "Controller",
            "parentName": null,
            "parentId": 2,
            "path": "controller",
            "component": "device/controller/index",
            "menuType": "C",
            "perms": "device:controller:list",
            "icon": "",
            "children": []
          },
          {
            "params": {},
            "menuId": 1206,
            "menuName": "Device Group",
            "parentName": null,
            "parentId": 2,
            "path": "deviceGroup",
            "component": "device/deviceGroup/index",
            "menuType": "C",
            "perms": "device:deviceGroup:list",
            "icon": "",
            "children": []
          },
          {
            "params": {},
            "menuId": 1301,
            "menuName": "Wireless",
            "parentName": null,
            "parentId": 3,
            "path": "netconfig",
            "component": "wireless/netconfig/index",
            "menuType": "C",
            "perms": "wireless:netconfig:list",
            "icon": "",
            "children": []
          },
          {
            "params": {},
            "menuId": 1302,
            "menuName": "Cloud Auth",
            "parentName": null,
            "parentId": 3,
            "path": "auth",
            "component": "wireless/auth/index",
            "menuType": "C",
            "perms": "wireless:auth:list",
            "icon": "",
            "children": []
          },
          {
            "params": {},
            "menuId": 1303,
            "menuName": "Strategy",
            "parentName": null,
            "parentId": 3,
            "path": "strategy",
            "component": "wireless/strategy/index",
            "menuType": "C",
            "perms": "wireless:strategy:list",
            "icon": "",
            "children": []
          },
          {
            "params": {},
            "menuId": 1304,
            "menuName": "Authentication",
            "parentName": null,
            "parentId": 3,
            "path": "msmconfig",
            "component": "wireless/msmconfig/index",
            "menuType": "C",
            "perms": "wireless:msmconfig:list",
            "icon": "",
            "children": []
          },
          {
            "params": {},
            "menuId": 1401,
            "menuName": "Enterprise/Site",
            "parentName": null,
            "parentId": 4,
            "path": "list",
            "component": "company/list/index",
            "menuType": "C",
            "perms": "company:list:list",
            "icon": "",
            "children": []
          },
          {
            "params": {},
            "menuId": 1402,
            "menuName": "Administrator",
            "parentName": null,
            "parentId": 4,
            "path": "manager",
            "component": "company/manager/index",
            "menuType": "C",
            "perms": "company:manager:list",
            "icon": "",
            "children": []
          },
          {
            "params": {},
            "menuId": 1403,
            "menuName": "Cilent",
            "parentName": null,
            "parentId": 4,
            "path": "user",
            "component": "company/user/index",
            "menuType": "C",
            "perms": "company:user:list",
            "icon": "",
            "children": []
          },
          {
            "params": {},
            "menuId": 1501,
            "menuName": "Alarm",
            "parentName": null,
            "parentId": 5,
            "path": "list",
            "component": "alarm/list/index",
            "menuType": "C",
            "perms": "alarm:list:list",
            "icon": "",
            "children": []
          },
          {
            "params": {},
            "menuId": 1502,
            "menuName": "Rules",
            "parentName": null,
            "parentId": 5,
            "path": "noticeSetting",
            "component": "alarm/noticeSetting/index",
            "menuType": "C",
            "perms": "alarm:noticeSetting:list",
            "icon": "",
            "children": []
          },
          {
            "params": {},
            "menuId": 1503,
            "menuName": "Settings",
            "parentName": null,
            "parentId": 5,
            "path": "alarmSetting",
            "component": "alarm/alarmSetting/index",
            "menuType": "C",
            "perms": "alarm:alarmSetting:list",
            "icon": "",
            "children": []
          },
          {
            "params": {},
            "menuId": 1504,
            "menuName": "Terminals",
            "parentName": null,
            "parentId": 5,
            "path": "monitoringUsers",
            "component": "alarm/monitoringUsers/index",
            "menuType": "C",
            "perms": "alarm:monitoringUsers:list",
            "icon": "",
            "children": []
          },
        ]
      }
    }
  }
]
