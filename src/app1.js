import "./app1.css"
import $ from "jquery"
import Model from "./base/Model.js"
import View from "./base/View"
import EventBus from "./base/EventBus"

// 传一个空对象，不是为了获取元素，而是为了获取对象上的方法 on 监听事件、trigger 触发事件
// 如果在一个监听，一个触发，那这两个事件就可以认为是实现了【通信】
// const eventBus = $(window)
// console.log(eventBus.on)
// console.log(eventBus.trigger)

const eventBus = new EventBus()

/*
* 数据相关 都放到 M
* 视图相关 都放到 V
* 其他都放到 C
* */

const m = new Model({
  data: {
    n: parseFloat(localStorage.getItem("n")) || 100
  },
  update(data) {
    Object.assign(m.data, data)
    eventBus.trigger("m:updated")
    localStorage.setItem("n", m.data.n)
  }
})
// console.log("app1")
// console.dir(m)

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


const init = (el)=> {
  new View({
    el: el,
    data: m.data,
    eventBus: eventBus,
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
    render(data) {
      const n = data.n
      if (this.el.children.length !== 0) this.el.empty()
      $(this.html.replace("{{n}}", n)).appendTo(this.el)
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
    }
  })
}

export default init