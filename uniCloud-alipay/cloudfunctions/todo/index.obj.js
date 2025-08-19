// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
module.exports = {
  _before: function() { // 通用预处理器

  },
  add: function(title = '', content = '') {
    title = title.trim()
    content = content.trim()
    if (!title || !content) {
      return {
        errCode: 'INVALID_TODO',
        errMsg: 'TODO标题或内容不可为空'
      }
    }
    // ...其他逻辑，如操作todo数据表添加数据
    return {
      errCode: 0,
      errMsg: '创建成功'
    }
  }
}