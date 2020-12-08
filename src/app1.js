import "./app1.css"
import $ from "jquery"
import Model from "./base/Model.js"
import View from "./base/View"

// 传一个空对象，不是为了获取元素，而是为了获取对象上的方法 on 监听事件、trigger 触发事件
// 如果在一个监听，一个触发，那这两个事件就可以认为是实现了【通信】
const eventBus = $(window)
// console.log(eventBus.on)
// console.log(eventBus.trigger)

/*
* 数据相关 都放到 M
* 视图相关 都放到 V
* 其他都放到 C
* */

const m = new Model({
  data: {
    n: JSON.parse(localStorage.getItem("n")) || 100
  },
  update(data) {
    Object.assign(m.data, data)
    eventBus.trigger("m:updated")
    localStorage.setItem("n", JSON.stringify(m.data.n))
  }
})
console.log("app1")
console.dir(m)

/*const v = {
  el: null,
  html: `
    <div>
      <div class="output">
        <span id="number">{{n}}</span>
      </div>
      <div>
        <button id="add1">+1</button>
        <button id="minus1">-1</button>
        <button id="mul2">×2</button>
        <button id="divide2">÷2</button>
      </div>
    </div>
  `,
  init(el) {
    v.el = $(el)
  },
  render(n) {
    if (v.el.children.length !== 0) v.el.empty()
    $(v.html.replace("{{n}}", n)).appendTo(v.el)
  }
}*/

const view = {
  init(container) {
    // v.init(container)
    view.el = $(container)   // 可省略 v.init
    view.render(m.data.n) // view = render(data) 第一次渲染
    view.autoBindEvents()
    eventBus.on("m:updated", () => {
      view.render(m.data.n)
    })
  },
  el: null,
  html: `
    <div>
      <div class="output">
        <span id="number">{{n}}</span>
      </div>
      <div>
        <button id="add1">+1</button>
        <button id="minus1">-1</button>
        <button id="mul2">×2</button>
        <button id="divide2">÷2</button>
      </div>
    </div>
  `,
  render(n) {
    if (view.el.children.length !== 0) view.el.empty()
    $(view.html.replace("{{n}}", n)).appendTo(view.el)
  },
  events: {
    "click #add1": "add",
    "click #minus1": "minus",
    "click #mul2": "mul",
    "click #divide2": "div"
  },
  add() {
    m.update({n: m.data.n + 1})
  },
  minus() {
    m.update({n: m.data.n - 1})
  },
  mul() {
    m.update({n: m.data.n * 2})
  },
  div() {
    m.update({n: m.data.n / 2})
  },
  autoBindEvents() {
    for (let key in view.events) {
      const func = view[view.events[key]]
      const spaceIndex = key.indexOf(" ")
      const part1 = key.slice(0, spaceIndex)
      const part2 = key.slice(spaceIndex + 1)
      view.el.on(part1, part2, func)
    }
  }
}

export default view