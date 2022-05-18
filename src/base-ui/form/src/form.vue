<template>
  <div class="my-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-show="!item.isHidden"
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
              :label-width="item.labelWidth"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                  @visible-change="
                    (val) => handleVisibleChange(val, item.field)
                  "
                >
                  <el-option
                    v-for="option in item.options ?? list[item.field]"
                    :label="option.title"
                    :key="option.value"
                    :value="option.value"
                  />
                  <el-pagination
                    v-if="otherOptions[item.field]?.total"
                    @current-change="handleCurrentChange"
                    :current-page="otherOptions[item.field]?.pageNum"
                    :page-size="otherOptions[item.field]?.pageSize"
                    layout="prev, pager, next"
                    :total="otherOptions[item.field]?.total ?? 0"
                  />
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-date-picker>
              </template>
              <template v-else-if="item.type === 'cascader'">
                <el-cascader
                  :placeholder="item.placeholder"
                  :options="item.options ?? list[item.field]"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                />
              </template>
              <template v-else-if="item.type === 'radio'">
                <el-radio-group
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                  <el-radio
                    v-for="radio in item.options ?? list[item.field]"
                    :label="radio.value"
                    :key="radio.value"
                    >{{ radio.title }}</el-radio
                  >
                </el-radio-group>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IFormItem } from '../types';

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 20px' })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    },
    list: {
      type: Object,
      default: () => {
        return {};
      }
    },
    otherOptions: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  emits: ['update:modelValue', 'pageChange'],
  setup(props, { emit }) {
    const handleValueChange = (value: any, field: string) => {
      emit('update:modelValue', { ...props.modelValue, [field]: value });
    };
    const handleCurrentChange = (pageNum: number) => {
      emit('pageChange', pageNum);
    };
    const handleVisibleChange = (val: boolean, field: string) => {
      if (!val && props.otherOptions[field]) {
        handleCurrentChange(1);
      }
    };
    return {
      handleValueChange,
      handleCurrentChange,
      handleVisibleChange
    };
  }
});
</script>
