<template>
  <div class="my-table">
    <div class="header">
      <slot name="headerHandler"></slot>
    </div>
    <el-table
      ref="myTable"
      :data="listData"
      border
      style="width: 100%"
      :row-key="uniqueId"
      :row-style="seletedRowStyle"
      v-bind="childrenProps"
      @selection-change="handleSelectionChange"
      @row-click="handleClick"
      @row-dblclick="handleDbClick"
      @sort-change="sortChange"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.pageNum"
          :page-size="page.pageSize"
          :page-sizes="[10, 20, 50, 100, 150, 200]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    listData: {
      type: Array,
      required: true
    },
    listCount: {
      type: Number,
      default: 0
    },
    propList: {
      type: Array,
      required: true
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    page: {
      type: Object,
      default: () => ({ pageNum: 0, pageSize: 10 })
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    uniqueId: {
      type: String,
      default: 'id'
    }
  },
  emits: [
    'selectionChange',
    'handleClick',
    'handleDbClick',
    'update:page',
    'sortChange'
  ],
  setup(props, { emit }) {
    const myTable: any = ref(null);
    const selection = ref([]);
    const seletedRowStyle = ({ row }: any) => {
      if (
        selection.value.some((item: any) => {
          return item.id === row.id;
        })
      ) {
        return { background: '#b3e9ff' };
      }
    };
    const handleSelectionChange = (value: any) => {
      selection.value = value;
      emit('selectionChange', value);
    };
    const handleClick = (row: any) => {
      myTable.value?.toggleRowSelection(row);
      emit('handleClick', row);
    };
    const handleDbClick = (row: any) => {
      emit('handleDbClick', row);
    };
    const handleCurrentChange = (pageNum: number) => {
      emit('update:page', { ...props.page, pageNum });
    };

    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize });
    };
    const sortChange = ({ column, prop, order }: any) => {
      emit('sortChange', { column, prop, order });
    };
    return {
      myTable,
      seletedRowStyle,
      handleSelectionChange,
      handleCurrentChange,
      handleSizeChange,
      handleClick,
      handleDbClick,
      sortChange
    };
  }
});
</script>

<style scoped lang="less">
.header {
  display: flex;
  padding: 0 5px 10px;
  justify-content: flex-start;
  align-items: center;
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
