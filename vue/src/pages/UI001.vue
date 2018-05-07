<template>
  <div id="main-container">
    <el-row>
      <el-col :span="24">
        <div class="main-title">出   勤   表</div>
      </el-col>
    </el-row>
    <el-row :gutter="9">
      <el-col :span="1">
        <label for="inputMonth">年月:</label>
      </el-col>
      <el-col :span="3">
        <el-date-picker id="inputMonth" v-model="month" align="right" type="month" placeholder="日付選択" style="width: 130px"></el-date-picker>
      </el-col>
      <el-col :span="16">
        <el-button type="primary" @click="addDetails"  v-bind:disabled="month === null ? true : false" icon="el-icon-check">一括生成</el-button>
      </el-col>      
      <el-col :span="1">
        <label>氏名:</label>
      </el-col>
      <el-col :span="2">
        <label>{{ userName }}</label>
      </el-col>
      <el-col :span="1">
        <label style="margin-left: 30px">印</label>
      </el-col>
    </el-row>
    <transition name="el-zoom-in-center" mode="out-in">
    <el-table v-show="showResult" :data="ui001DetailList" :max-height=450 :height=450 :stripe="true" :row-class-name="tableRowClassName">
      <el-table-column prop="date" label="月/日" width="110" align="left">
      </el-table-column>
      <el-table-column label="勤務区分" width="120" align="left">
        <template slot-scope="scope">
          <el-select v-if="scope.row.editable" v-model="scope.row.workClassification">
            <el-option v-for="workClassification in workClassificationList" :key="workClassification.code" :label="workClassification.name" :value="workClassification.name"></el-option>
          </el-select>
          <span v-else>{{ scope.row.workClassification }}</span>
        </template>
      </el-table-column>
      <el-table-column label="作業時刻" header-align="center">
        <el-table-column label="開始" width="120px" align="right">
          <template slot-scope="scope">
            <el-time-select v-if="scope.row.editable" v-model="scope.row.startTime" style="width: 95px" :picker-options="{
                start: '00:00',
                step: '00:30',
                end: '23:59'}" :change="caculateHour(scope.row)">
            </el-time-select>
            <span v-else>{{ scope.row.startTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="終了" width="120px" align="right">
          <template slot-scope="scope">
            <el-time-select v-if="scope.row.editable" v-model="scope.row.endTime" style="width: 95px" :picker-options="{
                start: '00:00',
                step: '00:30',
                end: '23:59'}">
            </el-time-select>
            <span v-else>{{ scope.row.endTime }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="中断時間" width="80px" align="right">
        <template slot-scope="scope">
          <el-input v-if="scope.row.editable" v-model="scope.row.restHour" maxlength="2"></el-input>
          <span v-else>{{ scope.row.restHour }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出勤時間" width="80px" align="right">
        <template slot-scope="scope">
          <el-input v-if="scope.row.editable" v-model="scope.row.workHour" maxlength="2"></el-input>
          <span v-else>{{ scope.row.workHour }}</span>
        </template>
      </el-table-column>
      <el-table-column label="プロジェクト（現場）名" width="320px" align="left">
        <template slot-scope="scope">
          <el-input v-if="scope.row.editable" v-model="scope.row.projectName" maxlength="20"></el-input>
          <span v-else>{{ scope.row.projectName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="備考" align="left">
        <template slot-scope="scope">
          <el-input v-if="scope.row.editable" v-model="scope.row.remarks" maxlength="20"></el-input>
          <span v-else>{{ scope.row.remarks }}</span>
        </template>
      </el-table-column>
    </el-table>
    </transition>
  </div>
</template>

<script>
import UI001Detail from '../model/UI001/UI001Detail'

export default {
  data() {
    return {
      workClassificationList: [
        {
          code: '01',
          name: '普通'
        },
        {
          code: '02',
          name: '休日'
        },
        {
          code: '03',
          name: '祝日'
        },
        {
          code: '04',
          name: '振替休暇'
        },
        {
          code: '05',
          name: '振替出勤'
        }
      ],
      userName: 'テストユーザー',
      month: null,
      showResult: false,
      ui001Detail: new UI001Detail(null),
      ui001DetailList: [
      ]
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      // if (rowIndex === 1) {
      //   return "warning-row";
      // } else if (rowIndex === 3) {
      //   return "success-row";
      // }
      // return "";
    },
    addDetails() {
      var curDate = new Date();
      var month = this.month.getMonth() + 1;
      curDate.setMonth(month);
      curDate.setDate(0);
      var days = curDate.getDate();
      this.showResult = false;
      this.ui001DetailList = [];
      for (var i = 1; i <= days; i ++) {
        var ui001DetailLoop = new UI001Detail(null);
        ui001DetailLoop.date = month + '/' + i;
        this.ui001DetailList.push(ui001DetailLoop);
      }
      // アニメのため、遅延設定する
      setTimeout(() => {
        this.showResult = true;
      }, 100);
    },
    caculateHour(inputRow) {
      if (!inputRow.startTime || !inputRow.endTime) {
        return;
      }
      // if (inputRow.startTime == inputRow.endTime) {
      //   inputRow.workHour = 0;
      //   return;
      // }
      var tmpDateStart = inputRow.startTime.split(':').reverse().reduce((result, curr, index) => result + curr * Math.pow(60, index), 0);
      var tmpDateEnd = inputRow.endTime.split(':').reverse().reduce((result, curr, index) => result + curr * Math.pow(60, index), 0);
      // 徹夜の場合
      if( tmpDateEnd < tmpDateStart ) {
        tmpDateEnd = 24 * 60 + tmpDateEnd;
      }
      console.log(inputRow.restHour);
      var result = ((tmpDateEnd - tmpDateStart) / 60) - (inputRow.restHour == null ? 0 : inputRow.restHour);
      console.log(result);
      if (result > 0) {
        inputRow.workHour = result;
      } else {
        inputRow.workHour = null;
      }

    }
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

.main-title {
  text-align: center;
  font-size: larger;
}

.el-col {
  font-size: small;
}
</style>
