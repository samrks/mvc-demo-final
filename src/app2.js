import "./app2.css"
import $ from "jquery"
import Model from "./base/Model"
import View from "./base/View"

const eventBus = $(window)
const localKey = "app2.index"

/*const m = {
  data: {
    index: parseInt(localStorage.getItem(localKey)) || 0
  },
  create() {},
  delete() {},
  update(data) {
    Object.assign(m.data, data)  // 把参数 data 替换到 m.data
    eventBus.trigger("m:updated")
    localStorage.setItem("index", m.data.index)
  },
  get() {}
}*/

// 使用「类」
const m = new Model({
  data: {
    index: parseInt(localStorage.getItem(localKey)) || 0
  },
  update(data) {
    Object.assign(m.data, data)
    eventBus.trigger("m:updated")
    localStorage.setItem(localKey, m.data.index)
  }
})
// console.log("app2")
// console.dir(m)


/*const v = {
  el: null,
  html: (index) => {
    return `
      <div>
        <ol class="tab-bar">
          <li class="${index === 0 ? "selected" : ""}" data-index="0"><span>1111</span></li>
          <li class="${index === 1 ? "selected" : ""}" data-index="1"><span>2222</span></li>
        </ol>
        <ol class="tab-content">
          <li class="${index === 0 ? "active" : ""}">内容1</li>
          <li class="${index === 1 ? "active" : ""}">内容2</li>
        </ol>
      </div>
    `
  },
  init(el) {
    v.el = $(el)
  },
  render(index) {
    if (v.el.children.length !== 0) v.el.empty()
    $(v.html(index)).appendTo(v.el)
  }
}*/

// v 和 c 合并
/*const view = new View({
  el: null,
  html: (index) => {
    return `
      <div>
        <ol class="tab-bar">
          <li class="${index === 0 ? "selected" : ""}" data-index="0"><span>1111</span></li>
          <li class="${index === 1 ? "selected" : ""}" data-index="1"><span>2222</span></li>
        </ol>
        <ol class="tab-content">
          <li class="${index === 0 ? "active" : ""}">内容1</li>
          <li class="${index === 1 ? "active" : ""}">内容2</li>
        </ol>
      </div>
    `
  },
  render(index) {
    if (view.el.children.length !== 0) view.el.empty()
    $(view.html(index)).appendTo(view.el)
  },
  events: {
    "click .tab-bar li": "x"
  },
  x(e) {
    const index = parseInt(e.currentTarget.dataset.index)
    m.update({index: index})
  }
})*/

const init = (el) => {
  new View({
    el: el,
    data: m.data,
    eventBus: eventBus,
    html: (index) => {
      return `
        <div>
          <ol class="tab-bar">
            <li class="${index === 0 ? "selected" : ""}" data-index="0"><span>1111</span></li>
            <li class="${index === 1 ? "selected" : ""}" data-index="1"><span>2222</span></li>
          </ol>
          <ol class="tab-content">
            <li class="${index === 0 ? "active" : ""}">内容1</li>
            <li class="${index === 1 ? "active" : ""}">内容2</li>
          </ol>
        </div>
      `
    },
    render(data) {
      const index = data.index
      if (this.el.children.length !== 0) this.el.empty()
      $(this.html(index)).appendTo(this.el)
    },
    events: {
      "click .tab-bar li": "x"
    },
    x(e) {
      const index = parseInt(e.currentTarget.dataset.index)
      m.update({index: index})
    }
  })
}

export default init

/*
const $tabBar = $("#app2 .tab-bar")
const $tabContent = $("#app2 .tab-content")

// 1. jq 提供的事件委托写法如下：监听 tabBar 下的所以 li 的 click 事件
// 2. 如何确定一个元素在所有同级元素中的位置：遍历。jq 内置遍历下标 index()
$tabBar.on("click", "li", (e) => {
// console.log(e.target)  // 可能获取到 span
// console.log(e.currentTarget)  // 只获取 li // 具体用哪一个，可以试一下
  const $li = $(e.currentTarget)
  
  $li.addClass("selected")
    .siblings().removeClass("selected")
  
  const index = $li.index()  // 获取当前激活的tab的下标
  localStorage.setItem(localKey, index) // 存储到 ls
// console.log(index)  // 0 或 1
  
  $tabContent.children().eq(index).addClass("active") // 匹配展示内容与tabBar标题
    .siblings().removeClass("active")
})

// 设置默认情况下，激活第 index 个 li （也可以在 html 中直接添加上激活的类名来展示默认li）
$tabBar.children().eq(index).trigger("click")
*/
