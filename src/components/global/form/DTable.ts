import { Vue, Component, Prop, PropSync, Ref, Watch } from "vue-property-decorator";
import { Dictionary } from 'array-proto-ext';
import { Table as ElTable } from 'element-ui';

export type ColumnType =
    // 基础数据类型
    "text" | "number" | "range" | "switch" | "date" | "time" |
    // 选择
    "select" | "check" | "radio" |
    // 系统类型
    "dict" | "ref" | "tree" |
    // 其它html类型
    "file" | "color" | "password" | "email" |
    // 专用渲染类型
    "image" | "icon" | "textarea" | "code" | "link" | "progress"
    // 子表
"subTable";
    
export interface ColumnConfig {
    prop: string;
    type: ColumnType;
    isKey?: false | boolean;
    required?: false | boolean;
    order?: 0 | number;

    label?: string;
    i18n?: string;
    width?: number;
    className?: string;

    optionList?: any[];
    dictKey?: string;
    refKey?: string;

    customConfig?: Dictionary<any>;
}

export interface DTableConfig {
    /** 表格标题 */
    title?: string;
    /** 树形数据 */
    tree?: false | boolean;
    /** 允许多择 */
    selection?: false | boolean;
    /** 显示序号 */
    showIndex?: false | boolean;
    /** 行操作列 */
    showAction?: false | boolean;
    /** 是否分页 */
    page?: true | boolean;
    /** 列定义 */
    columns: ColumnConfig[];
}



@Component
export default class DTable<T extends {} = Dictionary<any>> extends Vue {
    @Prop()
    value: T | undefined;

    @Prop({ type: Array, default: () => [] })
    data!: T[];

    @Prop({ required: true })
    config!: DTableConfig;

    @Prop({ type: Array, default: () => [] })
    selection!: T[];

    @Ref()
    $table!: ElTable;

    // 外部（代码）传入
    @Watch("selection", { immediate: true })
    $onSelectionChange(v: T[]) {
        if (this.config.selection) {
            for (const row of this.data) {
                if (v.includes(row)) {
                    this.$table.toggleRowSelection(row, true);
                } else {
                    this.$table.toggleRowSelection(row, false);
                }
            }
        }
    }
    // 内部（用户）传出
    onSelectionChange(rows: T[]) {
        this.$emit("update:selection", rows);
    }


    @Watch("value", { immediate: true })
    $onCurrentRowChange(v: T) {
        this.$table.setCurrentRow(v);
    }
    onCurrentRowChange(row: T) {
        this.$emit("input", row);
    }


    


}