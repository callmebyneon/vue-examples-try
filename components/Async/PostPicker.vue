<script>
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapGetters, mapActions } = createNamespacedHelpers('asyncApp');

export default {
  name: 'PostPicker',
  data () {
    return {
      options: [
        { text: 'Vue', value: 'vue' },
        { text: 'Vue.js', value: 'vuejs' },
        { text: 'Front-end', value: 'frontend' }
      ]
    }
  },
  computed: {
    selectedSubreddit: {
      get () {
        return this.$store.state.asyncApp.selectedSubreddit;
      },
      set (selectedSubreddit) {
        this.$store.commit('asyncApp/updateState', {
          selectedSubreddit
        });
        this.getPosts(selectedSubreddit)
      }
    },
    ...mapState([
      'isFetching',
      'didInvalidate',
      'items',
      'lastUpdated'
    ]),
    ...mapGetters([
      'isEmpty'
    ])
  },
  methods: {
    ...mapActions([
      'getPosts'
    ])
  }
}
</script>

<template>
  <div class="post-list__header">
    <select v-model="selectedSubreddit">
      <option v-for="option in options" :value="option.value" :key="option.value">
        {{ option.text }}
      </option>
    </select>
    <p>
      <span>
        Last updated at {{ new Date(lastUpdated).toLocaleTimeString() }}.
      </span>
      <button
        class="--small"
        @click="getPosts"
      >refresh</button>
    </p>
  </div>
  <div class="post-list__wrapper">
    <ul v-if="isFetching">
      Loading ...
    </ul>
    <ul v-else-if="isEmpty">It's Empty.</ul>
    <ul v-else>
      <li
        v-for="item in items"
        :key="item.id"
      >{{ item.title }}</li>
    </ul>
  </div>
</template>

<style lang="scss">
  .post-list__wrapper {
    max-width: 640px;
    padding-bottom: 2rem;
    opacity: 1;

    & li {
      list-style-position: outside;
      list-style-type: circle;
      word-break: keep-all;
      transition: color 0.22s;

      &:hover{
        color: #0075FF;
      }
    }
  }
</style>