<template>
  <div class="hello">
    <simpleCalendar
      @currentMonth="currentMonth"
      v-model="list"
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
      preDisabled: false,
      list: []
    }
  },
  methods: {
    currentMonth (data) {
      console.log(data)
    },
    test () {
      console.log(this.list)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
