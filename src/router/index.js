import Router from 'vue-router'
import TaskList from '@/components/TaskList'
import AddTask from '@/components/AddTask'
import ViewTask from '@/components/ViewTask'
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
      name: 'AddTask',
      component: AddTask
    },
    {
      path: '/view-task/:id',
      name: 'ViewTask',
      component: ViewTask
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
