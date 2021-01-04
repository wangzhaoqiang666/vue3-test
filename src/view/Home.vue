<template>
  <div class="home-page">
    <!-- <h2>{{biggerColumnLen}}</h2> -->
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50" />
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <a href="#" class="btn btn-primary my-2">开始写文章</a>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <ColumnList :list="list" />
    <div class="text-center container">
      <button class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25 button">加载更多</button>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, computed } from "vue";

import ColumnList, { ColumnProps } from "../components/ColumnList.vue";
// import {testData} from '../testData'
import { useStore } from "vuex";
import { GlobalDataProps } from "../store";

export default defineComponent({
  components: {
    ColumnList
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const list = computed(() => store.state.columns);
    const biggerColumnLen = computed(() => store.getters.biggerColumnSlen)
    return {
      list,
      biggerColumnLen
    };
  }
});
</script>

<style  scoped>
</style>