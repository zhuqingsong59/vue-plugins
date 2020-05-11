<template>
  <div class="simpleCalendar">
    <div class="header">
      <el-button @click="pre" :disabled="monthPage < 0">上一月</el-button>
      <p>{{yearMonth}}</p>
      <el-button @click="next" :disabled="monthPage > 0">下一月</el-button>
    </div>
    <div class="content">
      <ul class="week">
        <li>日</li>
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li>六</li>
      </ul>
      <ul class="date">
        <li :key="index" @click="selectDate(item)" v-for="(item, index) in list" :class="{'isValid': item.showDate, 'actived': item.active }">
          {{item.showDate}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'simpleCalendar',
  data () {
    return {
      monthPage: 0,
      date: '',
      list: []
    }
  },
  created () {
    this.date = this.$date.day().format('YYYY-MM')
    this.init()
  },
  methods: {
    resetList () {
      this.date = this.$date.day().format('YYYY-MM')
      this.monthPage = 0
      this.init()
    },
    init (setDate) {
      let date = setDate || this.date
      this.yearMonth = this.$date.day(date).format('YYYY年MM月')
      // 当月总天数
      let daysInMonth = this.$date.daysInMonth(date)
      // 当月第一天
      let startOfMonth = this.$date.startOfMonth(date)
      // 周几
      let formatd = this.$date.formatd(startOfMonth)
      let list = []
      for (let i = 1; i < Number(formatd) + 1; i++) {
        list.push({
          date: this.$date.addDayDate(startOfMonth, -i),
          showDate: ''
        })
      }
      for (let i = 0; i < daysInMonth; i++) {
        list.push({
          date: this.$date.addDayDate(startOfMonth, i),
          showDate: i + 1
        })
      }
      this.list = list
    },
    selectDate (item) {
      if (item.showDate) {
        item.active = !item.active
        this.list = this.api.copy(this.list)
      }
    },
    next () {
      this.monthPage += 1
      this.date = this.$date.addDate(this.date, 1)
      this.init()
    },
    pre () {
      this.monthPage -= 1
      this.date = this.$date.addDate(this.date, -1)
      this.init()
    },
    getSelected () {
      return this.list.filter((item) => {
        return item.active
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .simpleCalendar {
    width: 672px;
    height: 391px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #e9e9e9;
    .header {
      widows: 100%;
      height: 50px;
      position: relative;
      border-bottom: 1px solid #e9e9e9;
      p{
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #535353;
        font-size: 14px;
        font-weight: 500;
      }
      .el-button{
        top: 12px;
        min-width: 72px;
        padding: 4px 8px;
        position: absolute;
        &:first-child{
          left: 21px;
        }
        &:last-child{
          right: 21px;
        }
      }
    }
    .content {
      padding: 40px 0 20px 0;
      height: 340px;
      ul.week{
        height: 15px;
        margin-bottom: 15px;
        display: flex;
        flex-wrap: wrap;
        padding: 0 19px;
        li{
          width: 40px;
          height: 15px;
          line-height: 15px;
          margin: 0 25px;
          text-align: center;
        }
      }
      ul.date{
        display: flex;
        flex-wrap: wrap;
        padding: 0 19px;
        li{
          width: 40px;
          height: 32px;
          cursor: pointer;
          text-align: center;
          border-radius: 4px;
          margin: 0 25px 10px 25px;
          &.isValid {
            background-color: #edf2ff;
            color: #4a84ff;
          }
          &.actived {
            background-color: #4a84ff;
            color: #ffffff;
          }
        }
      }
    }
  }
</style>
