<script>
  import dayjs from 'dayjs';

  export default {
    name: 'TodoItem',
    props: {
      todo: Object
    },
    data () {
      return {
        isEditMode: false,
        editedTitle: this.todo.title
      }
    },
    computed: {
      done: {
        get () {
          return this.todo.done
        },
        set (done) {
          this.updateTodo({
            done
          })
        }
      },
      date () {
        const date = dayjs(this.todo.createdAt);
        const isSame = date.isSame(this.todo.updatedAt);
        if (!isSame) {
          return `${date.format('YYYY년 MM월 DD일')} (edited)`
        } else
          return date.format('YYYY년 MM월 DD일');
      }
    },
    methods: {
      onEditMode () {
        this.editedTitle = this.todo.title;
        this.isEditMode = true;
        // Vue.js가 데이터 변경 후 DOM 업데이트를 마칠 때까지 기다림.
        this.$nextTick(() => {
          this.$refs.titleInput.focus();
        });
      },
      offEditMode () {
        console.log('off the edit mode');
        this.isEditMode = false;
      },
      editedTodo () {
        // 수정한 내용이 있는 경우만 저장!
        if (this.todo.title !== this.editedTitle) {
          this.updateTodo({
            title: this.editedTitle,
            updatedAt: new Date()
          })
        }
        // 수정 모드 종료.
        this.offEditMode();
      },
      updateTodo (value) {
        this.$store.dispatch('todoApp/updateTodo', {
          todo: this.todo,
          value
        })
      },
      deleteTodo () {
        this.$store.dispatch('todoApp/deleteTodo', this.todo)
      }
    }
  }
</script>

<template>
  <div
    :class="{ done }"
    class="todo-item"
  >
    <!-- EDIT -->
    <div
      v-if="isEditMode"
      class="item__inner item--edit"
    >
      <input
        ref="titleInput"
        :value="editedTitle"
        type="text"
        @input="editedTitle = $event.target.value"
        @keyup.enter="editedTodo"
        @keyup.esc="offEditMode"
      />
      
      <!-- <div class="item__actions">
        <button key="compelete" @click="editedTodo">완료</button>
        <button key="cancel" @click="offEditMode">취소</button>
      </div> -->
    </div>

    <!-- NORMAL -->
    <div
      v-else
      class="item__inner item--normal"
    >
      <input
        v-model="done"
        class="toggle-check"
        type="checkbox"
      />

      <div class="item__title-wrap">
        <div class="item__title" @dblclick="onEditMode">{{ todo.title }}</div>
        <div class="item__date">{{ date }}</div>
      </div>

      <div class="item__actions">
        <!-- <button key="update" @click="onEditMode">수정</button> -->
        <button class="deleteBtn --i-b" key="delete" @click="deleteTodo"></button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .todo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;

    &:first-of-type {
      margin-top: 1rem;
    }

    .item__inner {
      width: 90%;
      display: flex;
      align-items: center;

      &.item--normal {
        .toggle-check {
          margin: 0 1.5rem 0 0.5em;
          position: relative;

          &:after {
            content: '';
            display: block;
            width: 1rem;
            height: 1rem;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translate3D(0, -50%, 0);
            background-color: #fefefe;
            border: 1px solid #4f4f4f;
            border-radius: 4px;
          }

          &:before {
            content: '';
            display: block;
            width: 65%;
            height: 30%;
            border-left: 2px solid #fefefe;
            border-bottom: 2px solid #fefefe;
            transform: rotate(-45deg);
            position: absolute;
            top: 2px;
            left: 4px;
            z-index: 1;
          }

          &:checked {
            &:after {
              background-color: #808080;
              border: 1px solid #fefefe;
            }
          }
        }
      }

      &.item--edit {
        input[type='text'] {
          width: 100%;
          padding: 0.5em 1em 0.5em;
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
    }
    
    .item__date {
      font-size: 10px;
      color: #808080
    }

    .item__actions {
      margin-left: auto;

      .deleteBtn {
        display: flex;
        border: 0;
        
        &:before {
          content: '';
          height: 1rem;
          border-right: 2px solid #4f4f4f;
          transform: translate3D(1px, 0, 0) rotate(45deg);
          transition: border-color .22s;
        }
        
        &:after {
          content: '';
          height: 1rem;
          border-right: 2px solid #4f4f4f;
          transform: translate3D(-1px, 0, 0) rotate(-45deg);
          transition: border-color .22s;
        }

        &:hover {
          &:before, &:after {
            border-color: #fb5c5c;
          }
        }
      }
    }

    &.done {
      .item__title {
        text-decoration: line-through;
      }
    }
  }
</style>