<template>
  <div class="validate-input-container pb-3">
    <input v-if="tag !== 'textarea'"
           type="text"
           class="form-control"
           :class="{'is-invalid': inputRef.error}"
           :value="inputRef.val"
           @input="updateValue"
           @blur="validateInput"
           v-bind="$attrs" />
    <textarea v-else
              class="form-control"
              :class="{'is-invalid': inputRef.error}"
              :value="inputRef.val"
              @input="updateValue"
              @blur="validateInput"
              v-bind="$attrs"></textarea>
    <span v-if="inputRef.error"
          class="invalid-feedback">{{inputRef.message}}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive,PropType ,onMounted} from 'vue';
import {emitter} from './ValidateForm.vue'
//  验证邮箱正则
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

interface RuleProp {
  type: "required" | "email";
  message: string;
}
export type RulesProp = RuleProp[]
// 添加类型变量，便于适用更多的需求
export type TagType = 'input' | 'textarea';
export default defineComponent({
  props:{
    rules: Array as PropType<RulesProp>,
    modelValue: String,
    tag:{
      type: String as PropType<TagType>,
      default: 'input'
    }
  },
  //    禁用Attribute继承（如果不希望组件的根元素继承attribute，可以在组件选项中设置这个属性）
  inheritAttrs: false,
  setup(props,context) {
      console.log(context.emit);
      
      const inputRef = reactive({
        val: props.modelValue || '',
        error:false,
        message:''
      })
      // 重写v-model，用底层原理去实现双向数据绑定事件
      const updateValue = (e: KeyboardEvent) => {
        const targetValue = (e.target as HTMLInputElement ).value
        inputRef.val = targetValue
        context.emit('update:modelValue',targetValue)
      }
      //    失去焦点时触发的事件
      const validateInput = () => {
          if (props.rules) {
              const allPassed = props.rules.every(rule => {
                  let passed = true
                  inputRef.message = rule.message
                  switch (rule.type) {
                      case 'required':
                          passed = (inputRef.val.trim() !== '')
                          break;
                      case 'email':
                          passed = emailReg.test(inputRef.val)
                          break;
                      default:
                          break;
                  }
                  return passed
              })
             inputRef.error = !allPassed
             return allPassed
          }
          return true
      }
      onMounted(() => {
        emitter.emit('form-item-created' , validateInput)
      })
      return {
          inputRef,
          validateInput,
          updateValue
      }
  }
});
</script>

