<template lang="">
    <div>
        <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
            <a class="navbar-brand" href="#">赞同</a>
            <ul v-if="!user.isLogin" class="list-inline mb-0">
                <li class="list-inline-item"><router-link to="/login" class="btn btn-outline-light my-2">登录</router-link></li>
                <li class="list-inline-item"><router-link to="/signup" class="btn btn-outline-light my-2">注册</router-link></li>
            </ul>
            <ul v-else class="list-inline mb-0">
                <li class="list-line-item">
                    <DropDown :title = "`你好 ${user.name}`">
                        <DropDownItem><a href="/create" class="dropdown-item">新建文章</a></DropDownItem>
                        <DropDownItem disabled><a href="#" class="dropdown-item">编辑资料</a></DropDownItem>
                        <DropDownItem><a href="#" class="dropdown-item">退出登录</a></DropDownItem>
                    </DropDown>
                </li>
            </ul>
        </nav>
    </div>
</template>


<script lang="ts">
import { defineComponent ,PropType} from 'vue';
import DropDown from './DropDown.vue'
import DropDownItem from './DropDownItem.vue'
export interface UserProps{
    isLogin: boolean;
    name?:  string;
    id?:    number;
}

export default defineComponent({
    name:'GobalHeader',
    components:{
        DropDown,
        DropDownItem
    },
    props:{
        user:{
            type: Object as PropType<UserProps>,
            required: true
        }
    }
})
</script>