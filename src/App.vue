<template>
  <div class="container">
    <GobalHeader :user="currentUser"/>

    <router-view></router-view>
    
    <footer class="text-center">
      <small>
        <ul class="list-inline mb-0 py-4 text-secondary bg-list mt-6" style="background-color:#f8f9fa;">
          <li class="list-inline-item"> © 2020 赞同</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent ,reactive,ref,computed} from 'vue'
import {useStore} from 'vuex'
import 'bootstrap/dist/css/bootstrap.min.css'
import GobalHeader,{UserProps} from './components/GobalHeader.vue'
// const currentUser: UserProps = {
//     isLogin: false,
//     // name: 'script kid',
//     // id: 1
// }







export default defineComponent({
  name: 'App',
  components: {
    // ColumnList,
    GobalHeader,
    // ValidateInput,
    // ValidateForm
  },
  setup(){
    const store = useStore()
    const currentUser = computed(() => store.state.user)
    return{
      currentUser,
      
    }
  }
})
</script>

<style>

</style>
