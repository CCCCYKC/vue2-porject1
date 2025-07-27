<!-- addProduct.vue的富文本组件 -->
 <template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 300px; overflow-y: hidden"
      v-model="html"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="onCreated"
      @onBlur="onBlur"
    />
  </div>
</template>
 
 <script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
export default {
  name: "WangEditorComponent",
  components: { Editor, Toolbar },
  data() {
    return {
      editor: null,
      html: "",
      toolbarConfig: {
        // 菜单工具栏配置
        toolbarKeys: [
          "headerSelect",
          "bold",
          "underline",
          "italic",
          "color",
          "bgColor",
          "fontSize",
          "fontFamily",
          "bulletedList",
          "numberedList",
          "todo",
          "|",
          "uploadImage",
          "insertLink",
          "insertTable",
          "codeBlock",
          "divider",
        ],
        //隐藏的菜单栏 (反向排除的写法)
        // excludeKeys:['headerSelect', 'blockquote', '|', 'bold', 'underline','group-justify',"emotion",]
      },
      editorConfig: { placeholder: "请输入内容..." },
      mode: "default", // or 'simple'
    };
  },
  methods: {
    // WangEditor自己创建的生命周期函数-------------
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    // onChange(editor) {
    //   // 用编辑器内容更新 html，避免 v-model 同步问题
    //   this.html = editor.getHtml();
    //   console.log("实时监听改变----", this.html);
    //   this.$emit("getWangEditor", this.html);
    // },
    onBlur() {
      // ！！！！但是用onChange也有问题！！！！多次修改的话会突然报错
      console.log("失去焦点时----", this.html);
      // 发送给父组件----- 把WangEditor用户输入的商品描述传递----添加商品addProduct储存
      this.$emit("getWangEditor", this.html);
    },
  },
  // 销毁编译器-------------
  beforeDestroy() {
    // const editor = this.editor;
    // if (editor == null) return;
    // // 新增：检查编辑器是否有效，避免操作已销毁的实例
    // // 关键修改：v5 用 destroyed 属性判断是否已销毁
    // if (this.editor && !this.editor.destroyed) {
    //   // 检查实例是否有效且未销毁
    //   this.editor.destroy(); // 销毁编辑器
    //   this.editor = null; // 清空引用，避免内存泄漏
    // }
    
    if (this.editor && !this.editor.destroyed) {
    // 检查编辑器根节点是否仍存在于文档中
    const editorRoot = this.editor.root; // 获取编辑器根DOM节点
    if (editorRoot && document.contains(editorRoot)) {
      this.editor.destroy(); // 仅当节点存在时销毁
    }
    this.editor = null;
  }
  },
};
</script>
 
 <style src="@wangeditor/editor/dist/css/style.css"></style>
 <style lang="less" scoped>
</style>