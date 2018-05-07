<template>
  <div id="main-container">
    <div id="main-title">出   勤   表</div>
    <div id="main-month">
      <span>年月:</span>
      <el-date-picker v-model="month" align="right" type="month" placeholder="日付選択" style="width: 120px"></el-date-picker>
    </div>
    <div id="main-user">
      <span>氏名:{{ userName }}</span>
      <span style="margin-left: 50px">印</span>
    </div>
    <el-table :data="tableData" style="width: 100%;" :max-height=450 :height=450 :row-class-name="tableRowClassName">
      <el-table-column type="" prop="date" label="月/日" width="110" align="left"></el-table-column>
      <el-table-column prop="workClassification" label="勤務区分" width="50" align="left"></el-table-column>
      <el-table-column label="作業時刻" header-align="center">
        <el-table-column prop="startTime" label="開始" width="65" align="right"></el-table-column>
        <el-table-column prop="endTime" label="終了" width="65" align="right"></el-table-column>
      </el-table-column>
      <el-table-column prop="restHour" label="中断時間" width="50" align="right"></el-table-column>
      <el-table-column prop="workHour" label="出勤時間" width="50" align="right"></el-table-column>
      <el-table-column prop="projectName" label="プロジェクト（現場）名" width="400" align="left"></el-table-column>
      <el-table-column prop="remarks" label="備考" align="left"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: 'テストユーザー',
      month: '',
      tableData: [
        {
          date: "2016-05-03",
          workClassification: "普通",
          startTime: "10:00",
          endTime: "21:00",
          restHour: "1",
          workHour: "8",
          projectName: "上海市普陀区金沙江路 1518 弄",
          remarks: "備考"
        },
        {
          date: "2016-05-04",
          workClassification: "普通",
          startTime: "王小虎",
          endTime: "王小虎",
          restHour: "",
          workHour: "",
          projectName: "上海市普陀区金沙江路 1518 弄",
          remarks: "備考"
        },
        {
          date: "2016-05-02",
          workClassification: "普通",
          startTime: "王小虎",
          endTime: "王小虎",
          restHour: "",
          workHour: "",
          projectName: "上海市普陀区金沙江路 1518 弄",
          remarks: "備考"
        },
        {
          date: "2016-05-01",
          workClassification: "普通",
          startTime: "王小虎",
          endTime: "王小虎",
          restHour: "",
          workHour: "",
          projectName: "上海市普陀区金沙江路 1518 弄",
          remarks: "備考"
        },
        {
          date: "2016-05-06",
          workClassification: "普通",
          startTime: "王小虎",
          endTime: "王小虎",
          restHour: "",
          workHour: "",
          projectName: "上海市普陀区金沙江路 1518 弄",
          remarks: "備考"
        },
      ]
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
  }
};
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.el-table {
  line-height: 16px;
}

#main-title {
  text-align: center;
  font-size: 120%;
}

#main-user {
  text-align: left;
  float: right
}

#main-month, #main-user {
  display: inline-block;  
}
</style>
