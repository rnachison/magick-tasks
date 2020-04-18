import Router from 'vue-router'
import TaskList from '@/components/TaskList'
import TaskListCreate from '@/components/TaskListCreate'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Credits from '@/components/Credits'

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'TaskList',
      component: TaskList
    },
    {
      path: '/add-task',
      name: 'TaskListCreate',
      component: TaskListCreate,
      meta: {
        title: 'Add Task'
      }
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
    },
    {
      path: '/credits',
      name: 'Credits',
      component: Credits
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Magick Tasks';
  next();
});

export default router
