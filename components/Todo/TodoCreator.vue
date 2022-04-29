<script>
  export default {
    data () {
      return {
        title: '',
        placeholder: 'What needs to be done?'
      }
    },
    methods: {
      createTodo () {
        const validatedTitle = this.title && this.title.trim();
        if (!validatedTitle) {
          this.title = this.title.trim();
          return;
        }
        
        this.$emit('create-todo', this.title);
        this.title = '';
      }
    }
  }
</script>

<template>
  <div class="todo-text-input">
    <input
      :value="title"
      :placeholder="placeholder"
      type="text"
      @input="title = $event.target.value"
      @keypress.enter="createTodo"
    >
  </div>
</template>

<style lang="scss">
  .todo-text-input {

    input[type='text'] {
      width: 100%;
      padding: 0.5em 1em 0.5em 3em;
      font-size: 1rem;
      border: 1px solid #4f4f4f;
      border-radius: 6px;
      font-family: inherit;
      line-height: 1em;

      &::placeholder {
        text-align: center;
        font-family: inherit;
        font-style: oblique;
      }
    }
  }
</style>