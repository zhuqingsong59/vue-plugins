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
export default {
  name: 'HelloWorld',
  data () {
    return {
      preDisabled: false,
      list: []
    }
  },
  watch: {
    list (newVal) {
      console.log(newVal)
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
