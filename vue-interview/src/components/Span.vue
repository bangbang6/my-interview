<template>
  <div class="span">{{msg}}</div>
</template>
 
<script>
export default {
  model: {
    prop: "msg",
    event: "change"
  },
  props: {
    msg: String
  },
  data () {
    return {
    }
  }
}
</script>
 
<style lang="scss" scoped>
</style>