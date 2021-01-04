<template>
  <div>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          :rules="emailRules"
          v-model="emailVal"
          placeholder="请输入邮箱地址"
          ref="inputRef"
        />
        {{emailVal}}
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          type="password"
          :rules="passwordRules"
          v-model="passwordVal"
          placeholder="请输入密码"
        />
      </div>
      <template #submit>
        <span class="btn btn-primary">submit</span>
      </template>
    </validate-form>
  </div>
</template>


<script lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import {useStore} from 'vuex'
import ValidateInput, { RulesProp } from "../components/ValidateInput.vue";
import ValidateForm from "../components/ValidateForm.vue";
export default {
  components: {
    ValidateInput,
    ValidateForm
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const inputRef = ref<any>("");
    const emailVal = ref("scriptkid@163.com");
    const passwordVal = ref("123");

    const emailRules: RulesProp = [
      { type: "required", message: "电子邮箱地址不能为空" },
      { type: "email", message: "请输入正确的电子邮箱格式" }
    ];
    const passwordRules: RulesProp = [
      { type: "required", message: "密码不能为空" }
    ];

    //  验证邮箱正则
    const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    //

    const emailRef = reactive({
      val: "",
      error: false,
      message: ""
    });
    const validateEmail = () => {
      if (emailRef.val.trim() == "") {
        emailRef.error = true;
        emailRef.message = "can not be empty";
      } else if (!emailReg.test(emailRef.val)) {
        emailRef.error = true;
        emailRef.message = "should be valid email";
      }
    };
    //  接受子子组件传递过来的数据
    const onFormSubmit = (result: boolean) => {
      console.log("result", inputRef.value.validateInput());
      // console.log('111',true);
      if (result) {
        router.push('/')
        store.commit('login')
      }
    };
    return {
      emailRef,
      validateEmail,
      emailRules,
      emailVal,
      passwordRules,
      passwordVal,
      onFormSubmit,
      inputRef
    };
  }
};
</script>