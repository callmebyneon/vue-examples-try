<script>
import PostPicker from '../components/Async/PostPicker';

export default {
  name: 'AsyncApp',
  components: {
    PostPicker,
  }
}
</script>

<template>
  <div class="async-app app-content-box">
    <h1>Async</h1>
    <post-picker />
  </div>
</template>