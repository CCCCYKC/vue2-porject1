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
          "emotion",
          "uploadImage",
          "insertLink",
          "insertTable",
          "codeBlock",
          "divider",
        ],
        //隐藏的菜单栏 (反向排除的写法)
        // excludeKeys:['headerSelect', 'blockquote', '|', 'bold', 'underline','group-justify']
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
    // onChange() {
    //   // ！！！！用onBlur有点问题！！！！ 当未失去焦点时，点击其他保存，并不会识别为失去焦点---改为onChange
    //   console.log("实时监听改变----", this.html);
    //   // 发送给父组件----- 把WangEditor用户输入的商品描述传递----添加商品addProduct储存
    //   this.$emit("getWangEditor", this.html);
    // },
    onBlur() {
      // ！！！！但是用onChange也有问题！！！！多次修改的话会突然报错
      console.log("失去焦点时----", this.html);
      // 发送给父组件----- 把WangEditor用户输入的商品描述传递----添加商品addProduct储存
      this.$emit("getWangEditor", this.html);
    },
  },
  mounted() {},
  // 销毁编译器-------------
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
};
</script>
 
 <style src="@wangeditor/editor/dist/css/style.css"></style>
 <style lang="less" scoped>
</style>