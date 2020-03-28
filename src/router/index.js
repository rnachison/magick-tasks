import Router from 'vue-router'
import TaskList from '@/components/TaskList'
import TaskListCreate from '@/components/TaskListCreate'
import TaskListEdit from '@/components/TaskListEdit'
import TaskListItem from '@/components/TaskListItem'
import Login from '@/components/Login'
import Register from '@/components/Register'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TaskList',
      component: TaskList
    },
    {
      path: '/add-task',
      name: 'TaskListCreate',
      component: TaskListCreate
    },
    {
      path: '/edit-task/:id',
      name: 'TaskListEdit',
      component: TaskListEdit
    },
    {
      path: '/view-task/:id',
      name: 'TaskListItem',
      component: TaskListItem
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
