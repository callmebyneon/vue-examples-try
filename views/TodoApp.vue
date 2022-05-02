<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import TodoCreator from '../components/Todo/TodoCreator'
import TodoItem from '../components/Todo/TodoItem'
export default {
  name: 'TodoApp',
  components: {
    TodoCreator,
    TodoItem
  },
  computed: {
    ...mapState('todoApp', [
      'db',
      'todos'
    ]),
    ...mapGetters('todoApp', [
      'filteredTodos',
      'total',
      'activeCount',
      'completedCount'
    ]),
    allDone: {
      get () {
        // 전체 항목 개수와 완료된 항목 개수가 일치하고 항목 개수가 1개 이상인 경우.
        return this.total === this.completedCount && this.total > 0
      },
      set (checked) {
        this.completeAll(checked)
      }
    }
  },
  watch: {
    $route () {
      this.updateFilter(this.$route.params.id)
    }
  },
  created () {
    this.initDB()
  },
  methods: {
    ...mapMutations('todoApp', [
      'updateFilter'
    ]),
    ...mapActions('todoApp', [
      'initDB',
      'completeAll',
      'clearCompleted'
    ]),
  }
}
</script>

<template>
  <div class="todo-app app-content-box">
    <h1>todos</h1>
    <div class="todo-header">
      <todo-creator @create-todo="createTodo" />
      <div class="actions">
        <input 
          v-model="allDone"
          id="todo__toggle-all"
          class="toggle-all"
          type="checkbox"
        />
        <label for="todo__toggle-all" class="toggle-all__label"></label>
      </div>
    </div>
    <hr />
    <div class="todo-app__list">
      <todo-item
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @update-todo="updateTodo"
        @delete-todo="deleteTodo"
      />
    </div>
    <hr />
    <div class="todo-app__footer">
      <div class="active-count">
        <b>{{ activeCount }}</b> item{{ activeCount > 1 ? 's' : null }} left
      </div>
      <div class="list-filters">
        <button
          :class="{ active: filter === 'all' }"
          @click="changeFilter('all')"
        >All</button>
        <button
          :class="{ active: filter === 'active' }"
          @click="changeFilter('active')"
        >Active</button>
        <button
          :class="{ active: filter === 'completed' }"
          @click="changeFilter('completed')"
        >Completed</button>
      </div>
      <div class="delete-completed">
        <button>
          완료된 항목 삭제
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .todo-app {
    .todo-header {
      position: relative;

      .actions {
        position: absolute;
        top: 50%;

        .toggle-all {
          position: absolute;
          left: -1px;
          top:-1px;
          height: 0;
          width: 0;

          & + .toggle-all__label {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 1.4rem;
            height: 1.4rem;
            position: absolute;
            top: -0.7rem;
            left: 0.7rem;
            color: #fefefe;
            background-color: #fefefe;
            border: 1px solid #4f4f4f;
            border-radius: 4px;
            line-height: 1em;
            font-size: 13px;
            font-weight: normal;
            user-select: none;

            &:before {
              content: '';
              display: block;
              width: 60%;
              height: 25%;
              border-left: 3px solid #fefefe;
              border-bottom: 3px solid #fefefe;
              transform: rotate(-45deg);
              position: relative;
              top: -1px;
            }

            // tooltip
            &:after {
              content: 'Click to change all todo status';
              display: block;
              width: fit-content;
              padding: 0 1em;
              border-radius: 4px;
              position: absolute;
              bottom: -2.6em;
              color: #fefefe;
              white-space: nowrap;
              line-height: 2.2em;
              font-size: 14px;
              font-weight: normal;
              background: hsl(0deg 0% 9% / 80%);
              visibility: hidden;
              opacity: 0;
              transition: opacity .22s;
            }

            &:hover:after {
              visibility: visible;
              opacity: 1;
            }
          }

          &:checked + .toggle-all__label {
            background-color: #808080;
            border: 1px solid #fefefe;

            &:after {
              border-color:#fefefe
            }
          }
        }
      }
    }
    .list-filters {
      button.active {
        font-weight: bold
      }
    }
  }
</style>