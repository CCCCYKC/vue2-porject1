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
      editorContent: "", //初始内容
      html: "", // 编辑器内容
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
      // // 1. 密封编辑器实例
      // this.editor = Object.seal(editor);
      // // 2. 延迟设置内容，确保 DOM 已就绪
      // this.$nextTick(() => {
      //   if (this.editorContent) {
      //     this.editor.setHtml(this.editorContent); // 用编辑器 API 设置内容，而非直接操作 DOM
      //   }
      // });
    },
    onBlur() {
      // ！！！！但是用onChange也有问题！！！！多次修改的话会突然报错
      console.log("失去焦点时----", this.html);
      // 发送给父组件----- 把WangEditor用户输入的商品描述传递----添加商品addProduct储存
      this.$emit("getWangEditor", this.html);
    },
  },
  // 销毁编译器-------------
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器

    // if (this.editor && !this.editor.destroyed) {
    //   // 1. 先移除编辑器根节点（避免 Vue 先销毁 DOM 导致冲突）
    //   const rootElem = this.editor.root; // 获取编辑器根 DOM 节点
    //   if (rootElem && rootElem.parentNode) {
    //     rootElem.parentNode.removeChild(rootElem); // 手动移除节点
    //   }
    //   // 2. 再销毁实例
    //   this.editor.destroy();
    //   this.editor = null;
    // }
  },
};
</script>
 
 <style src="@wangeditor/editor/dist/css/style.css"></style>
 <style lang="less" scoped>
</style>