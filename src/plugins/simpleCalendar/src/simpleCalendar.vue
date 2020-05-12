<template>
  <div class="simpleCalendar">
    <div class="header">
      <button class="switchButton" @click="pre" :disabled="monthPage < 0">上一月</button>
      <p>{{yearMonth}}</p>
      <button class="switchButton" @click="next" :disabled="monthPage > 0">下一月</button>
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
    box-sizing: border-box;
    .header {
      width: 100%;
      height: 50px;
      position: relative;
      box-sizing: border-box;
      border-bottom: 1px solid #e9e9e9;
      p{
        margin: 0;
        height: 50px;
        color: #535353;
        font-size: 14px;
        font-weight: 500;
        line-height: 50px;
        text-align: center;
      }
      .switchButton{
        top: 12px;
        outline: 0;
        color: #4a84ff;
        min-width: 72px;
        cursor: pointer;
        padding: 4px 8px;
        position: absolute;
        border-radius: 16px;
        white-space: nowrap;
        border: solid 1px #4a84ff;
        &:first-child{
          left: 20px;
        }
        &:last-child{
          right: 20px;
        }
      }
    }
    .content {
      height: 340px;
      padding: 40px 0 20px 0;
      box-sizing: border-box;
      ul.week{
        height: 15px;
        display: flex;
        margin-bottom: 15px;
        flex-wrap: wrap;
        padding: 0 19px;
        li{
          width: 40px;
          height: 15px;
          line-height: 15px;
          margin: 0 25px;
          list-style: none;
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
