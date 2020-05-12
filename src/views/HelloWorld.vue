<template>
  <div class="hello">
    <simpleCalendar ref="simpleCalendar"></simpleCalendar>
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
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
