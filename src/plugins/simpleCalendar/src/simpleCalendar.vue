<template>
  <div class="simpleCalendar">
    <div class="header">
      <button class="switchButton"
        @click="pre"
        :class="{'is-disabled': preDisabled}"
        :disabled="preDisabled">
        上一月
      </button>
      <p>{{yearMonth}}</p>
      <button
        class="switchButton"
        @click="next"
        :class="{'is-disabled': nextDisabled}"
        :disabled="nextDisabled">
        下一月
      </button>
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
        <li
          :key="index"
          :class="{'is-currentMonth': item.currentMonth,
                  'is-selected': item.isSelected,
                  'is-nextMonth': item.nextMonth,
                  'is-preMonth': item.preMonth }"
          v-for="(item, index) in daysList"
          @click="selectDate(item)">
          <div class="show-date">
            {{item.showDate}}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'simpleCalendar',
  data () {
    return {
      date: '',
      daysList: []
    }
  },
  props: {
    // 日历初始月份
    initDate: {
      type: String,
      default: ''
    },
    // 上一月切换的disabled控制
    preDisabled: {
      type: Boolean,
      default: false
    },
    // 下一月切换的disabled控制
    nextDisabled: {
      type: Boolean,
      default: false
    },
    // 日期选择单选，复选设置, 默认复选
    isMultiple: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    yearMonth () {
      return dayjs(this.date).format('YYYY年MM月')
    }
  },
  created () {
    if (this.initDate) {
      this.init(this.initDate)
    } else {
      this.init()
    }
  },
  methods: {
    init (setDate) {
      this.date = (dayjs(setDate).format('YYYY') === 'Invalid Date') ? dayjs() : dayjs(setDate)
      // 当月总天数
      let daysInMonth = dayjs(this.date).daysInMonth()
      // 当月第一天
      let startDayOfMonth = dayjs(this.date).startOf('month')
      // 当月第一天为周几；0:周日 1:周一 2:周二。。。。。
      let startOfWeek = dayjs(startDayOfMonth).day()
      // 当月最后一天
      let endDayOfMonth = dayjs(this.date).endOf('month')
      // 当月最后一天为周几；0:周日 1:周一 2:周二。。。。。
      let endOfWeek = dayjs(endDayOfMonth).day()
      // 日期列表
      let daysList = []
      // 上月日期补全
      for (let i = Number(startOfWeek); i > 0; i--) {
        daysList.push({
          date: dayjs(startDayOfMonth).subtract(i, 'day').format('YYYY-MM-DD'),
          showDate: dayjs(startDayOfMonth).subtract(i, 'day').format('DD'),
          preMonth: true
        })
      }
      // 当月日期
      for (let i = 0; i < daysInMonth; i++) {
        daysList.push({
          date: dayjs(startDayOfMonth).add(i, 'day').format('YYYY-MM-DD'),
          showDate: dayjs(startDayOfMonth).add(i, 'day').format('DD'),
          currentMonth: true
        })
      }
      // 下月日期补全
      for (let i = 1; i < 7 - Number(endOfWeek); i++) {
        daysList.push({
          date: dayjs(endDayOfMonth).add(i, 'day').format('YYYY-MM-DD'),
          showDate: dayjs(endDayOfMonth).add(i, 'day').format('DD'),
          nextMonth: true
        })
      }
      this.daysList = daysList
    },
    selectDate (selectItem) {
      if (selectItem.currentMonth) {
        let selectIndex = this.daysList.indexOf(selectItem)
        if (!this.isMultiple) {
          let isSelectedIndex = this.daysList.findIndex((item) => {
            return item.isSelected
          })
          if (isSelectedIndex !== -1 && isSelectedIndex !== selectIndex) {
            let selectedItem = this.daysList[isSelectedIndex]
            selectedItem.isSelected = false
            this.$set(this.daysList, isSelectedIndex, selectedItem)
          }
        }
        selectItem.isSelected = !selectItem.isSelected
        this.$set(this.daysList, selectIndex, selectItem)
      }
    },
    next () {
      let currentDate = dayjs(this.date).add(1, 'month')
      this.init(currentDate)
      this.$emit('currentMonth', dayjs(currentDate).format('YYYY-MM'))
    },
    pre () {
      let currentDate = dayjs(this.date).subtract(1, 'month')
      this.init(currentDate)
      this.$emit('currentMonth', dayjs(currentDate).format('YYYY-MM'))
    },
    getSelected () {
      return this.daysList.filter((item) => {
        return item.isSelected
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .simpleCalendar {
    width: 672px;
    height: 380px;
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
        font-size: 18px;
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
        &.is-disabled {
          cursor: not-allowed;
        }
        &:first-child{
          left: 20px;
        }
        &:last-child{
          right: 20px;
        }
      }
    }
    .content {
      height: 330px;
      padding: 20px 0;
      box-sizing: border-box;
      ul.week{
        height: 15px;
        display: flex;
        margin-bottom: 15px;
        flex-wrap: wrap;
        padding: 0 20px;
        li{
          width: calc(100% / 7);
          height: 15px;
          line-height: 15px;
          list-style: none;
          text-align: center;
        }
      }
      ul.date{
        display: flex;
        flex-wrap: wrap;
        padding: 0 20px;
        margin: 0;
        li{
          width: calc(100% / 7);
          list-style: none;
          height: 40px;
          text-align: center;
          padding: 4px;
          box-sizing: border-box;
          .show-date {
            height: 32px;
            line-height: 32px;
            border-radius: 4px;
          }
          &.is-currentMonth {
            .show-date{
              color: #4a84ff;
              cursor: pointer;
              background-color: #edf2ff;
            }
          }
          &.is-nextMonth, &.is-preMonth {
            color: #999999;
          }
          &.is-selected {
            .show-date{
              background-color: #4a84ff;
              color: #ffffff;
            }
          }
        }
      }
    }
  }
</style>
