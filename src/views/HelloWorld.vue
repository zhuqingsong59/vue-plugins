<template>
  <div class="hello">
    <simpleCalendar
      @currentMonth="currentMonth"
      :is-multiple="false"
      ref="simpleCalendar">
    </simpleCalendar>
  </div>
</template>

<script>
import simpleCalendar from '@/plugins/simpleCalendar/src/simpleCalendar'
export default {
  name: 'HelloWorld',
  components: {
    simpleCalendar
  },
  data () {
    return {
      preDisabled: false
    }
  },
  methods: {
    currentMonth (data) {
      console.log(data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
