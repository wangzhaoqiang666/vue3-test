<template>
  <div>
    <div class="row">
      <div v-for="item in columnList" :key="item.id" class="col-4 mb-4">
        <div class="card shadow-sm h-100">
          <div class="card-body  text-center">
            <img :src="item.avatar" class="rounded-circle border border-light  my-3 img" alt="..." />
            <h5 class="card-title">{{item.title}}</h5>
            <p class="card-text text-start">{{item.description}}</p>
            <router-link :to="{name:'column',params:{id:item.id}}" class="btn btn-primary">进入专栏</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType,computed } from "vue";
export interface ColumnProps {
  id: number;
  title: string;
  avatar: string;
  description: string;
}

export default defineComponent({
  name: "ColumnList",
  props: {
    list: {
      //    类型断言 as  / propType？ 待办
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup(props) {
    
    const columnList = computed(() => {
      return props.list.map(column => {
        if (!column.avatar) {
          column.avatar = require('@/assets/column.jpg')
        }
        return column
      })
    })
    return {columnList}
  }
});
</script>


<style scoped>
  .row .img {
    width: 50px;
    height: 50px;
  }
</style>