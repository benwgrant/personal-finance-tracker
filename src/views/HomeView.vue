<template>
  <div class="home">
    <NetWorthInput />
  </div>
</template>

<script>
// @ is an alias to /src
import NetWorthInput from '@/components/NetWorthInput.vue';



export default {
  name: 'HomeView',
  components: {
    NetWorthInput
  }
}
</script>
