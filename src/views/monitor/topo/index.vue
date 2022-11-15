<template>
  <div id="my-topo" :style="{ width: '100%', height: '1000px', padding: '30px' }"></div>
</template>
<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
export default {
  name: "Topo",
  data() {
    return {
      topoData: [{
        id: "root000",
        deviceType: 99,
        name: "源数据",
        mac: "mac地址",
        levelId: "-1",
        children: [{
          "deviceUUID": "4e7dfc0c52c840e9a484e850a7e9dcd5",
          "status": "0",
          "levelId": "-1",
          "name": "无线控制器1",
          "sn": "123",
          "ip": null,
          "mac": null,
          "modelName": null,
          "deviceType": 1,
          "portName": null,
          "upPortName": null,
          "flowRate": 0,
          "children": [],
          "remark": "",
            'symbol': 'rect',
            'label': {
              'backgroundColor': '#fff',
              'position': 'bottom',
              'offset': [0,10],
              'verticalAlign': 'middle',
              'align': 'middle'
            },
            'itemStyle': {
              'color': "#fff",
              'borderWidth': 10
            } ,
        },
        {
          "deviceUUID": "5be3339a28084619baf8a377188d0dbc",
          "status": "0",
          "levelId": "-1",
          "name": "无线控制器2",
          "sn": "456",
          "ip": null,
          "mac": null,
          "modelName": null,
          "deviceType": 1,
          "portName": null,
          "upPortName": null,
          "flowRate": 0,
          "children": [],
          "remark": ""
        },
        {
          "deviceUUID": "c44e7b040f084a928b9987f80cb2c9e4",
          "status": "0",
          "levelId": "-1",
          "name": "网关1",
          "sn": "1",
          "ip": null,
          "mac": null,
          "modelName": null,
          "deviceType": 3,
          "portName": null,
          "upPortName": null,
          "flowRate": 0,
          "children": [],
          "remark": ""
        },
        {
          "deviceUUID": "fb073bd58b5f427582cec84da9b4cb49",
          "status": "0",
          "levelId": "-1",
          "name": "网关2",
          "sn": "2",
          "ip": null,
          "mac": null,
          "modelName": null,
          "deviceType": 3,
          "portName": null,
          "upPortName": null,
          "flowRate": 0,
          "children": [],
          "remark": ""
        },
        {
          "deviceUUID": "6b86df6481494a7db33a2402c7a35279",
          "status": "0",
          "levelId": "-1",
          "name": "交换机1",
          "sn": "222",
          "ip": null,
          "mac": null,
          "modelName": null,
          "deviceType": 4,
          "portName": null,
          "upPortName": null,
          "flowRate": 0,
          "children": [],
          "remark": ""
        },
        {
          "deviceUUID": "3c238e0ca5804b42813851d7eac33dad",
          "status": "0",
          "levelId": "-1",
          "name": "交换机2",
          "sn": "432",
          "ip": null,
          "mac": null,
          "modelName": null,
          "deviceType": 4,
          "portName": null,
          "upPortName": null,
          "flowRate": 0,
          "children": [],
          "remark": ""
        },
        {
          "deviceUUID": "ff6ad146613d4657967644b639ad40f4",
          "status": "0",
          "levelId": "-1",
          "name": "cap1",
          "sn": "321",
          "ip": null,
          "mac": null,
          "modelName": null,
          "deviceType": 5,
          "portName": null,
          "upPortName": null,
          "flowRate": 0,
          "children": [],
          "remark": ""
        },
        {
          "deviceUUID": "d5eeb8f963c9492ab93c70fc71236d82",
          "status": "0",
          "levelId": "-1",
          "name": "cap2",
          "sn": "789",
          "ip": null,
          "mac": null,
          "modelName": null,
          "deviceType": 5,
          "portName": null,
          "upPortName": null,
          "flowRate": 0,
          "children": [],
          "remark": ""
        },
        {
          "deviceUUID": "abd70d48e4b84a9bbd9fb15ef0e39d9d",
          "status": "0",
          "levelId": "-1",
          "name": "云控制器1",
          "sn": "3232",
          "ip": null,
          "mac": null,
          "modelName": null,
          "deviceType": 6,
          "portName": null,
          "upPortName": null,
          "flowRate": 0,
          "children": [],
          "remark": ""
        },
        {
          "deviceUUID": "1c81211f127b4b7ca881df76304013f8",
          "status": "0",
          "levelId": "-1",
          "name": "mash1",
          "sn": "231",
          "ip": null,
          "mac": null,
          "modelName": null,
          "deviceType": 7,
          "portName": null,
          "upPortName": null,
          "flowRate": 0,
          "children": [],
          "remark": ""
        },
        {
          "deviceUUID": "26127dc07c8245899adc753a45c155ca",
          "status": "0",
          "levelId": "-1",
          "name": "mash2",
          "sn": "765",
          "ip": null,
          "mac": null,
          "modelName": null,
          "deviceType": 7,
          "portName": null,
          "upPortName": null,
          "flowRate": 0,
          "children": [],
          "remark": ""
        },
        {
          "deviceUUID": "7870b7cc69c74568a9d68e9de2b57664",
          "status": "0",
          "levelId": "-1",
          "name": "123",
          "sn": "7870b7cc69c74568a9d68e9de2b57664",
          "ip": null,
          "mac": null,
          "modelName": null,
          "deviceType": 99,
          "portName": null,
          "upPortName": null,
          "flowRate": 0,
          "children": [],
          "remark": ""
        },
        {
          "deviceUUID": "c3e22e954eec4c9b9b87b60f4baf6532",
          "status": "0",
          "levelId": "-1",
          "name": "123",
          "sn": "c3e22e954eec4c9b9b87b60f4baf6532",
          "ip": null,
          "mac": null,
          "modelName": null,
          "deviceType": 99,
          "portName": null,
          "upPortName": null,
          "flowRate": 0,
          "children": [],
          "remark": ""
        }

        ]
      }],
      childData: [],
    }
  },
  mounted() {
    this.showChart();
  },
  methods: {
    showChart() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('my-topo'));

      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
          {
            type: 'tree',
            data: this.topoData,
          orient: 'vertical',
            top: '10%',
            left: '8%',
            bottom: '22%',
            right: '20%',
            symbolSize: 10,
            edgeShape: 'polyline',
            edgeForkPosition: '0%',
            initialTreeDepth: 3,
            // itemStyle: {
            //   color: "green",
            //   borderWidth: 1.5
            // } ,
            lineStyle: {
              width: 2
            },
            label: {
              backgroundColor: '#fff',
              position: 'left',
              verticalAlign: 'middle',
              align: 'right'
            },
            leaves: {
              label: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left'
              }
            },
            emphasis: {
              focus: 'descendant'
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
}
</script>
<style lang="scss" scoped>

</style>