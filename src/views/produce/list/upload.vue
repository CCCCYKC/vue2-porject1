<!-- addProduct.vue的上传图片组件 -->
<template>
  <!-- 
        upload 上传图片
            action	必选参数，上传的地址	string
            multiple	是否支持多选文件	boolean
            list-type	文件列表的类型	string	text/picture/picture-card	text
            on-preview	点击文件列表中已上传的文件时的钩子	function(file)	
            on-remove	文件列表移除文件时的钩子	function(file, fileList)	
            on-success	文件上传成功时的钩子	function(response, file, fileList)	
            on-error	文件上传失败时的钩子	function(err, file, fileList)
            file-list	上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]	array
            disabled	是否禁用	boolean	—	false
            limit	最大允许上传个数	number	
            on-exceed	文件超出个数限制时的钩子	function(files, fileList)

        dialog 查看图片的弹窗组件
    -->
  <div class="upload">
    <el-upload
      ref="upload"
      :action="this.uploadImgURL"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :file-list="fileList"
      multiple
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
// 上传的图片会直接到文件夹 server/upload 里面
import { uploadImgURL, host } from "@/api/base.js";
export default {
  name: "upLoadComponent",
  props: {
    // 父组件传递过来的上传图片的地址
    fileList: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      uploadImgURL,
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  methods: {
    // 上传图片成功----------
    handleSuccess(response, file, fileList) {
      console.log("成功", response, file, fileList);
      // 获取上传成功后图片的地址 <img src=''> http://localhost:7788/ + 相对路径
      let url = response.url.slice(7);
      let imgUrl = host + "/" + url;
      console.log("imgUrl", imgUrl);
      // 将数据传递给父组件并存储起来
      this.$emit("getImgUrl", imgUrl);
    },
    // 清除全部图片
    clearUploadFiles() {
      this.$refs.upload.clearFiles(); // 调用 clearFiles 方法清空文件列表
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
};
</script>

<style>
</style>