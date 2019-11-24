Component({
  properties: {
    text: String, // 提示文字
    loadDone: Boolean, // 是否加载完成
    color: {
      type: String,
      value: '#c9c9c9'
    },
    type: {
      type: String,
      value: 'spinner' // circular
    },
    size: {
      type: String,
      optionalTypes: [Number],
      value: '18px'
    },
    textSize: {
      type: String,
      optionalTypes: [Number],
      value: '12px'
    },
    vertical: Boolean // 是否垂直排列图标和文字内容
  }
})