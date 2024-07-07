<template>
  <div class="editorAnnounce">
    <at-card
      :noHover="true"
      style="width: 98%; margin: 0 auto"
      :loading="false"
      :body-style="{ padding: '16px 24px', 'padding-bottom': 0 }"
    >
      <h4 slot="title" style="position: relative">发布公告</h4>
      <div slot="extra"><a href="JavaScript:;" @click="back">返回</a></div>
      <div>
        <el-form :model="announceInfo" :rules="rules" ref="announceInfo" label-width="80px">
          <el-form-item label="公告标题" prop="title">
            <el-input v-model="announceInfo.title"></el-input>
          </el-form-item>
          <el-form-item label="访问次数">
            <el-input v-model="announceInfo.watchers" readonly></el-input>
          </el-form-item>
          <el-form-item label="作者" prop="author">
            <el-input v-model="announceInfo.author"></el-input>
          </el-form-item>
          <el-form-item label="公告简介" prop="introduction">
            <el-input
              type="textarea"
              rows="2"
              maxlength="70"
              show-word-limit
              v-model="announceInfo.introduction"
            ></el-input>
          </el-form-item>

          <Editor
            ref="editor"
            class="editor overflow-scroll"
            v-model="announceInfo.content"
            :init="init"
            @keyup.native="$emit('editorchange', content)"
          />
          <el-form-item>
            <el-button
              style="margin-top: 22px; float: right"
              type="primary"
              @click="submitForm('announceInfo')"
              >点击发布</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </at-card>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";

export default {
  name: "EditorAnnounce",
  data() {
    return {
      init: {
        selector: "#tinymce", // tinymce的id
        language_url: "/static/tinymce/zh_CN.js",
        language: "zh_CN",
        skin_url: "/static/tinymce/skins/ui/oxide", // 编辑器需要一个skin才能正常工作，所以要设置一个skin_url指向之前复制出来的skin文件
        browser_spellcheck: true, // 拼写检查
        branding: false, // 去水印
        elementpath: false, // 禁用编辑器底部的状态栏
        statusbar: false, // 隐藏编辑器底部的状态栏
        paste_data_images: true, // 允许粘贴图像
        menubar: false, // 隐藏最上方menu
        fontsize_formats: "14px 16px 18px 20px 24px 26px 28px 30px 32px 36px", // 字体大小
        font_formats:
          "微软雅黑=Microsoft YaHei,Helvetica Neue;PingFang SC;sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun;serifsans-serif;Terminal=terminal;monaco;Times New Roman=times new roman;times", // 字体

        file_picker_types: "image",
        images_upload_credentials: true,
        // inline: true, // 设置内敛模式
        toolbar:
          "code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | table image media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em lineheight formatpainter axupimgs | myUpload",
        // 工具栏，根据需要写对应的工具名称，顺序及分割线等等，这里的最后的 ‘myUpload’ 是下面setup里的自定义插件
        toolbar_mode: "sliding", // 工具栏模式，这里是滑行模式（当屏幕过小时，多余的工具会隐藏，点击更多按钮会出现其他工具，这里配置出现的特效）
        plugins:
          "print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help emoticons autosave bdmap indent2em autoresize formatpainter axupimgs", // 需要用到的功能插件，如链接，列表等等
        resize: false, // 是否可以缩放编辑器
        fixed_toolbar_container: "#tinymceToolbar", // 可以设置元素选择器指定工具栏嵌套在哪个元素里面
        custom_ui_selector: "body", // 聚焦的元素
        noneditable_noneditable_class: "mceNonEditable", // 使用此选项，您可以指定TinyMCE将使用的类名称，以确定使用noneditable插件时可编辑哪些内容区域。主要用入你想以代码的形式添加某些内容，并给这些内容设置类名，使他们不可编辑，只能整个删除
        init_instance_callback: (editor) => {
          editor.focus(); // 初始化聚焦，让内联模式的编辑器工具显示
        },
      },
      // 编辑器内容
      // 编辑器设置
      announceInfo: {
        title: "",
        watchers: 0,
        author: "",
        introduction: "",
        content: "在这里编辑公告内容...",
      },
      rules: {
        title: [
          { required: true, message: "请输入公告标题", trigger: "blur" },
          { min: 3, message: "长度至少 3 个字符", trigger: "blur" },
        ],
        author: [
          { required: true, message: "请输入发布作者", trigger: "blur" },
          { min: 3, message: "长度至少 3 个字符", trigger: "blur" },
        ],
        introduction: [{ required: true, message: "请输入公告简介", trigger: "blur" }],
      },
    };
  },
  components: {
    Editor,
  },
  methods: {
    back() {
      this.$router.push({
        name: "AnnounceManage",
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch("home/createAnnounce", this.announceInfo);
          this.$router.push({
            name: "AnnounceManage",
          });
          return true;
        }
        console.log("error submit!!");
        return false;
      });
    },
  },
  mounted() {
    this.$tinymce.init({});
  },
};
</script>

<style lang="scss">
.editorAnnounce {
  height: 45rem;
  overflow-y: scroll;
  overflow-x: auto;
  .at-card {
    box-shadow: 1px 0 16px 0 rgba(100, 100, 100, 0.2);
    .editor {
      padding: 10px;
      border: 1px solid #ddd;
      height: 18rem;
      font-size: 16px;
      line-height: 1.4;
      overflow-y: scroll;
    }
  }
}
</style>
