<template>
  <div id="main-container">
    <el-row>
      <el-col :span="24">
        <div class="main-title">出 勤 表</div>
      </el-col>
    </el-row>
    <el-row :gutter="9">
      <el-col :span="1">
        <span class="el-col-span">年月:</span>
      </el-col>
      <el-col :span="3">
        <el-date-picker :editable="false" v-model="month" align="right" type="month" placeholder="年月" style="width: 110px"></el-date-picker>
      </el-col>
      <el-col :span="16">
        <el-button type="primary" @click="addDetails" v-bind:disabled="month === null ? true : false" icon="el-icon-check">一括生成</el-button>
      </el-col>
      <el-col :span="1">
        <span class="el-col-span">氏名:</span>
      </el-col>
      <el-col :span="2">
        <span class="el-col-span">{{ userName }}</span>
      </el-col>
      <el-col :span="1">
        <span class="el-col-span" style="margin-left: 30px">印</span>
      </el-col>
    </el-row>
    <br>
    <transition name="el-zoom-in-center" mode="out-in">
      <el-table v-show="showResult" :data="ui001DetailList" :max-height=470 :height=470 :stripe="false" :row-class-name="tableRowClassName">
        <el-table-column label="月/日" width="110" align="left">
          <template slot-scope="scope">
            <span v-html="scope.row.date"></span>
          </template>
        </el-table-column>
        <el-table-column label="勤務区分" width="120" align="left">
          <template slot-scope="scope">
            <el-select v-if="scope.row.editable" v-model="scope.row.workClassification.code">
              <el-option v-for="workClassification in workClassificationList" :key="workClassification.code" :label="workClassification.name" :value="workClassification.code"></el-option>
            </el-select>
            <span v-else>{{ scope.row.workClassification.name }}</span>
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
            <el-input v-if="scope.row.editable" v-model="scope.row.restHour" maxlength="2">
            </el-input>
            <span v-else>{{ scope.row.restHour }}</span>
          </template>
        </el-table-column>
        <el-table-column label="出勤時間" width="80px" align="right">
          <template slot-scope="scope">
            <el-input v-if="scope.row.editable" v-model="scope.row.workHour" maxlength="2">
            </el-input>
            <span v-else>{{ scope.row.workHour }}</span>
          </template>
        </el-table-column>
        <el-table-column label="プロジェクト（現場）名" width="320px" align="left">
          <template slot-scope="scope">
            <el-input v-if="scope.row.editable" v-model="scope.row.projectName" maxlength="20">
            </el-input>
            <span v-else>{{ scope.row.projectName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="備考" width="300px" align="left">
          <template slot-scope="scope">
            <el-input v-if="scope.row.editable" v-model="scope.row.remarks" maxlength="20">
            </el-input>
            <span v-else>{{ scope.row.remarks }}</span>
          </template>
        </el-table-column>
        <el-table-column id="test111" :class-name="showEdit ? '': 'is-hidden'" fixed="right" label="操作" width="50px">
          <template slot-scope="scope">
            <el-button @click="scope.row.editable = !scope.row.editable" type="text">編集</el-button>
          </template>
        </el-table-column>
      </el-table>
    </transition>
    <br>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" icon="el-icon-success" @click="confirm">確認</el-button>
        <!-- <el-button type="primary" icon="el-icon-printer" v-print="'#main-container'">印刷</el-button> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Vue from 'vue';
  import UI001Detail from '../store/model/UI001/UI001Detail';
  import JapaneseHolidays from 'japanese-holidays';
  import Printer from 'vue-print-nb';
  import { CREATE_UI001DETAIL } from '../store/mutation-types'

  Vue.use(Printer);

  export default {
    data: function() {
      return {
        workClassificationList: [],
        userName: 'テストユーザー',
        month: null,
        showResult: false,
        showEdit: false,
        ui001Detail: new UI001Detail(null),
        ui001DetailList: []
      };
    },
    // 初期化
    mounted: function() {
      // データを取得する
      this.workClassificationList.push(...this.$store.state.workClassificationList);
    },
    // 計算属性
    computed : {
    },
    // イベント
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (row.workClassification.code === '02' || row.workClassification.code === '03') {
          return 'rest-row';
        }
        return "work-row";
      },
      addDetails() {
        var curDate = new Date(this.month);
        var month = this.month.getMonth() + 1;
        curDate.setMonth(month);
        curDate.setDate(0);
        var days = curDate.getDate();
        this.showResult = false;
        this.ui001DetailList = [];
        // アニメのため、遅延設定する
        setTimeout(() => {
          this.showResult = true;

          for (var i = 1; i <= days; i++) {
            var holiday = '';
            var ui001DetailLoop = new UI001Detail(null);
            var tmpDate = new Date(curDate);
            tmpDate.setDate(i);

            // 祝日設定
            if (JapaneseHolidays.isHoliday(tmpDate)) {
              holiday = JapaneseHolidays.isHoliday(tmpDate);
              ui001DetailLoop.workClassification = Object.assign(this.workClassificationList[2]);
            } else if (tmpDate.getDay() === 0 || tmpDate.getDay() === 6) {
              // 休日設定
              ui001DetailLoop.workClassification = Object.assign(this.workClassificationList[1]);
            }
            ui001DetailLoop.date = month + '/' + i + '（' + ["日", "月", "火", "水", "木", "金", "土"][tmpDate.getDay()] + '）' + (holiday === '' ? '' : ('<br>' + holiday));
            this.ui001DetailList.push(ui001DetailLoop);
            this.$store.commit(CREATE_UI001DETAIL, this.ui001DetailList);
          }
        }, 0);
      },
      confirm() {
        this.showEdit = false;
        this.showResult = false
        setTimeout(() => {
        this.ui001DetailList.map(item => {
            item.editable = false;
        });
        this.showResult = true;
        }, 500);

      },
      caculateHour(inputRow) {
        if (!inputRow.startTime || !inputRow.endTime) {
          return;
        }
        var tmpDateStart = inputRow.startTime.split(':').reverse().reduce((result, curr, index) => result + curr * Math.pow(60, index), 0);
        var tmpDateEnd = inputRow.endTime.split(':').reverse().reduce((result, curr, index) => result + curr * Math.pow(60, index), 0);
        // 徹夜の場合
        if (tmpDateEnd < tmpDateStart) {
          tmpDateEnd = 24 * 60 + tmpDateEnd;
        }
        var result = ((tmpDateEnd - tmpDateStart) / 60) - (inputRow.restHour == null ? 0 : inputRow.restHour);
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
  .el-table .rest-row {
    background: oldlace;
  }

  .el-table .work-row {
    background: white;
  }

  .main-title {
    text-align: center;
    font-size: larger;
  }

  .el-col {
    font-size: small;
  }

  .el-col-span {
    padding-top: 7px;
  }

  .hiddenCol {
    display: none!important;
  }
</style>
