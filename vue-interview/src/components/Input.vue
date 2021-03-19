<template>
  <div class="vue">
    <input :value="value" @input="e=>$emit('input',e.target.value)" />
  </div>
</template>
 
<script>
export default {
  props: {
    value: String
  },

  data () {
    return {
    }
  },
  methods: {
    change (e) {
      console.log('e', e.target.value);
    }
  }
}
</script>
 
<style lang="scss" scoped>
</style>