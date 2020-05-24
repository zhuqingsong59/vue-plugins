import simpleCalendar from './simpleCalendar'

let smallCalendar = {}
smallCalendar.install = function (Vue, options) {
  Vue.component('simpleCalendar', simpleCalendar)
}
export default smallCalendar
