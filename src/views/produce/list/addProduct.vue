<!-- list/index.vue的添加商品按钮通向的界面 -->
<template>
  <div class="addproject">
    <el-row :gutter="20">
      <el-col :span="4">
        <!-- 左侧树形类目 -->
        <div class="nav">
          <div class="title">产品类型列表</div>
          <div class="tree">
            <TreeProduct @getCategory="getCategory"></TreeProduct>
          </div>
        </div>
      </el-col>
      <el-col :span="20">
        <!-- 右侧表单 -->
        <div class="wapper">
          <div class="title">{{ title }}</div>
          <div class="content">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="ruleForm"
            >
              <el-form-item label="所属分类" prop="category" size="small">
                {{ this.ruleForm.category }}
              </el-form-item>
              <el-form-item label="商品名称" prop="title" size="small">
                <el-input v-model="ruleForm.title"></el-input>
              </el-form-item>
              <el-form-item label="商品价格" prop="price" size="small">
                <el-input v-model="ruleForm.price"></el-input>
              </el-form-item>
              <el-form-item label="商品数量" prop="num" size="small">
                <el-input v-model="ruleForm.num"></el-input>
              </el-form-item>
              <el-form-item label="商品卖点" prop="sellPoint" size="small">
                <el-input v-model="ruleForm.sellPoint"></el-input>
              </el-form-item>
              <el-form-item label="上传图片" prop="image">
                <UpLoadImg @getImgUrl="getImgUrl" ref="upLoad" :fileList="fileList"></UpLoadImg>
              </el-form-item>
              <el-form-item label="商品描述" prop="descs">
                <WangEditor
                  @getWangEditor="getWangEditor"
                  :key="editorKey"
                  ref="wangEditor"
                ></WangEditor>
              </el-form-item>
              <el-form-item label="首页轮播推荐" prop="isShow">
                <el-switch
                  v-model="ruleForm.isShow"
                  active-color="#13ce66"
                ></el-switch>
              </el-form-item>
              <el-form-item label="是否推荐商品" prop="isShow">
                <el-switch
                  v-model="ruleForm.isShow"
                  active-color="#13ce66"
                ></el-switch>
              </el-form-item>
              <el-form-item label="是否上架商品" prop="isShow">
                <el-switch
                  v-model="ruleForm.isShow"
                  active-color="#13ce66"
                ></el-switch>
              </el-form-item>
              <el-form-item>
                <el-button v-show="title != '产品详情'" type="primary" @click="submitForm('ruleForm')">保存</el-button>
                <el-button v-show="title != '产品详情'" @click="resetForm('ruleForm')">重置</el-button>
                <el-button type="info" plain @click="cancelForm('ruleForm')">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import TreeProduct from "./treeProduct.vue";
import UpLoadImg from "./upload.vue";
import WangEditor from "./wangEditor.vue";
export default {
  name: "addProductPage",
  components: {
    TreeProduct,
    UpLoadImg,
    WangEditor,
  },
  data() {
    return {
      fileList: [], // 图片列表
      ruleForm: {
        //表单数据
        id:"", // 商品ID 编辑时用到
        category: "",
        title: "",
        price: "",
        num: "",
        sellPoint: "",
        image: [],
        descs: "",
        cid: "",
        isShow: true,
      },
      rules: {
        //表单验证规则
        category: [
          { required: true, message: "请输入商品所属分类", trigger: "blur" },
        ],
        title: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 1, max: 6, message: "长度在 1 到 6 个字符", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        num: [{ required: true, message: "请输入商品数量", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 接受树形组件treeProduct传回来的节点名称，并放在表单数据ruleForm.category里面---------
    getCategory(data) {
      this.ruleForm.category = data.name;
      this.ruleForm.cid = data.cid;
    },
    // 接受上传图片组件UpLoadImg传回来的数据，并放在表单数据ruleForm.image里面--------
    getImgUrl(url) {
      this.ruleForm.image.push(url);
    },
    // 接受富文本编译器组件WangEditor传回来的数据，并放在表单数据ruleForm.descs里面--------
    getWangEditor(val) {
      this.ruleForm.descs = val;
    },
    // 表单的保存按钮------------**功能：添加产品 + 编辑产品**--------------
    submitForm(formName) {
      // this.%refs.ruleForm 和 this.$refs[formName] 的表述是一样的
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 接口：{title, image, sellPoint, price, cid, category, num, descs}
          let {id, title, image, sellPoint, price, cid, category, num, descs } = this.ruleForm;
          if(this.title === "添加产品") {
            // console.log("添加商品----", this.ruleForm);
            console.log("添加产品接口数据----", {title,image: JSON.stringify(image),sellPoint,price,cid,category,num,descs,});
            // image数组类型 ---> 转换成字符串
            this.insertTbItem({title,image: JSON.stringify(image),sellPoint,price,cid,category,num,descs,});
          } else {
            // 编辑商品
            // console.log("编辑商品----", this.ruleForm);
            this.updateTbItem({id,title,image: JSON.stringify(image),sellPoint,price,cid,category,num,descs,});
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 表单的重置按钮----->重置为空 || 重置成编辑前已保存的值---------
    resetForm(formName) {
      if(this.title === "添加产品") {
        // 重置表单内容
        this.$refs[formName].resetFields();
        // 重置图片上传
        this.$refs.upLoad.clearUploadFiles();
        // 重置wangEditor
        this.$refs.wangEditor.editor.clear(); //方法二：调用wangEditor自己的方法
        // this.$refs.wangEditor.html ='';       //方法一：设置子组件的变量为空
      } else {
        // 编辑产品时，重置成编辑前已保存的值
        // console.log("编辑界面--this.ruleForm",this.ruleForm);
        // console.log("编辑界面--this.rowData",this.rowData);
        this.ruleForm = {...this.rowData}; // 使用解构语法，创建一个新的对象，避免直接引用 浅拷贝
        this.ruleForm.isShow = true;
        // 重新渲染wangEditor 用获取实例的方法ref--------------
        this.$nextTick(() => {
          this.$refs.wangEditor.html = this.rowData.descs; // 设置编辑器内容
        });
        // 重新渲染图片展示---------------
        let arr = JSON.parse(this.rowData.image);   // 将字符串转换成数组
        this.ruleForm.image = arr; // 更新ruleForm的image,保证this.ruleForm.image为数组
        this.fileList = []; // 清空fileList,否则会一直累加图片
        arr.forEach((item) => {
          this.fileList.push({ name: "", url: item }); // fileList 回显图片---传递给UpLoadImg组件
        });
      }
    },
    // 表单的取消按钮----返回产品列表页面----------
    cancelForm() {
      // 跳转路由
      this.$router.push("/produce/list");
    },
    // 点击保存按钮-----触发---->添加商品请求-----------------
    async insertTbItem(params) {
      let res = await this.$api.insertTbItem(params);
      console.log("添加商品请求----", res.data);
      if (res.data.status === 200) {
        console.log('进入添加商品成功分支，准备显示提示'); // 新增此行日志
        this.$message({
          message: '恭喜你，添加商品成功',
          type: 'success'
        });
        // 跳转路由
        this.$router.push("/produce/list");
      }
    },
    // 点击保存按钮-----触发---->编辑商品请求-----------------
    async updateTbItem(params) {
      let res = await this.$api.updateTbItem(params);
      console.log("编辑商品请求----", res.data);
      if (res.data.status === 200) {
        console.log('进入修改商品成功分支，准备显示提示'); // 新增此行日志
        this.$message({
          message: '恭喜你，修改商品成功',
          type: 'success'
        });
        // 跳转路由
        this.$router.push("/produce/list");
      }
    }
  },
  computed: {
    // 计算属性
    ...mapState("product", ["rowData", "title"]), //读取在vuex中product模块的rowData数据
  },
  mounted() {
    // 进入页面--当vuex的product模块的title为"编辑产品"--渲染编辑的表单数据
    if (this.title === "编辑产品" || this.title === "产品详情") {
      // 若直接赋值this.ruleForm = this.rowData; 会导致ruleForm和rowData指向同一内存地址，修改ruleForm会影响rowData
      // 这里使用解构语法，创建一个新的对象，避免直接引用
      this.ruleForm = {...this.rowData};
      this.ruleForm.isShow = true;
      // 重新渲染图片展示---------------
      let arr = JSON.parse(this.rowData.image);   // 将字符串转换成数组
      // console.log("编辑界面--图片数组", arr);
      this.ruleForm.image = arr; // 更新ruleForm的image,保证this.ruleForm.image为数组
      arr.forEach((item) => {
        this.fileList.push({ name: "", url: item }); // fileList 回显图片---传递给UpLoadImg组件
      });
      // console.log("fileList", this.fileList);
      // 重新渲染wangEditor 用获取实例的方法ref--------------
      // console.log("wangEditor", this.$refs.wangEditor, this.$refs.wangEditor.html);
      // this.$nextTick() 等待DOM更新后再执行  延迟加载
      this.$nextTick(() => {
        this.$refs.wangEditor.html = this.rowData.descs; // 设置编辑器内容
      });
    }
  },
};
</script>

<style lang="less" scoped>
.nav {
  background: white;
  border-right: 1px solid #e0e0e0;
  height: 500px;
  .title {
    font-weight: bold;
    font-size: 16px;
    padding: 18px;
    color: #fff;
    background: skyblue;
  }
  .tree {
    padding: 10px;
  }
}

.wapper {
  background: white;
  height: 100%;
  margin-bottom: 20px;
  .title {
    font-weight: bold;
    font-size: 16px;
    padding: 18px;
    color: #eee;
    background: grey;
  }
  .ruleForm {
    padding: 20px;
  }
}
// 解决el-message组件的z-index问题，避免被顶部导航遮挡
::v-deep .el-message {
  z-index: 10001 !important; /* 比顶部导航的 10000 大即可 */
}
</style>