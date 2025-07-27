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
          <div class="title">商品添加</div>
          <div class="content">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="ruleForm"
            >
              <el-form-item label="所属分类" prop="category">
                {{ this.ruleForm.category }}
              </el-form-item>
              <el-form-item label="商品名称" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
              </el-form-item>
              <el-form-item label="商品价格" prop="price">
                <el-input v-model="ruleForm.price"></el-input>
              </el-form-item>
              <el-form-item label="商品数量" prop="num">
                <el-input v-model="ruleForm.num"></el-input>
              </el-form-item>
              <el-form-item label="商品卖点" prop="sellPoint">
                <el-input v-model="ruleForm.sellPoint"></el-input>
              </el-form-item>
              <el-form-item label="上传图片" prop="image">
                <UpLoadImg @getImgUrl="getImgUrl"></UpLoadImg>
              </el-form-item>
              <el-form-item label="商品描述" prop="descs">
                <el-input type="textarea" v-model="ruleForm.descs"></el-input>
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
                <el-button type="primary" @click="submitForm('ruleForm')"
                  >保存</el-button
                >
                <el-button @click="resetForm('ruleForm')">重置</el-button>
                <el-button type="info" plain>取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TreeProduct from "./treeProduct.vue";
import UpLoadImg from "./upload.vue";
export default {
  name: "addProductPage",
  components: {
    TreeProduct,
    UpLoadImg,
  },
  data() {
    return {
      ruleForm: {
        //表单数据
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
    // 接受树形组件treeProduct传回来的节点名称，并放在表单数据ruleForm里面---------
    getCategory(data) {
      this.ruleForm.category = data.name;
    },
    // 接受上传图片组件UpLoadImg传回来的数据，并放在表单数据ruleForm里面--------
    getImgUrl(url) {
      this.ruleForm.image.push(url);
    },
    // 表单的保存按钮
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 表单的重置按钮---------------
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
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
  height: 800px;
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
</style>