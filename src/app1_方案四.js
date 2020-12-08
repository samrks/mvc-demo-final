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
/*const m = {
  data: {
    n: parseInt(localStorage.getItem("n")) || 100
  },
  // 增删改查
  create() {},
  delete() {},
  update(data) {
    Object.assign(m.data, data) // Object.assign用于对象的合并，将data对象的内容添加到m.data中，这里的效果是用参数data替换掉m.data的值
    eventBus.trigger("m:updated")
    localStorage.setItem("n", (m.data.n).toString())
  },
  get() {}
}*/

/*const m = new Model({
  data: {
    n: parseInt(localStorage.getItem("n")) || 100
  }
})
m.update = (data) => {
  Object.assign(m.data, data)
  eventBus.trigger("m:updated")
  localStorage.setItem("n", (m.data.n).toString())
}*/
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
    v.render()
  },
  render(n) {
    if (v.el.children.length !== 0) v.el.empty()
    $(v.html.replace("{{n}}", n)).appendTo(v.el)
  }
}*/

/*const v = new View({
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
    if (v.el.children.length !== 0) v.el.empty()
    $(v.html.replace("{{n}}", n)).appendTo(v.el)
  }
  /!*init(el){
    v.el = $(el)
    v.render()
  }*!/
})*/
/*v.init = (el) => {
  v.el = $(el)
  v.render()
}*/

const c = {
  v: null,
  initV(){
    c.v = new View({
      el: c.container,
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
        if (c.v.el.children.length !== 0) c.v.el.empty()
        $(c.v.html.replace("{{n}}", n)).appendTo(c.v.el)
      }
    })
    c.v.render(m.data.n)
  },
  init(container) {
    // v.init(container)
    // v.el = $(container)
    // v.render(m.data.n) // view = render(data) 第一次渲染
    c.container = container
    c.initV()
    c.autoBindEvents()
    eventBus.on("m:updated", () => {
      c.v.render(m.data.n)
    })
  },
  events: {
    "click #add1": "add",
    "click #minus1": "minus",
    "click #mul2": "mul",
    "click #divide2": "div"
  },
  add() {
    // m.data.n += 1
    m.update({n: m.data.n + 1})
  },
  minus() {
    // m.data.n -= 1
    m.update({n: m.data.n - 1})
  },
  mul() {
    // m.data.n *= 1
    m.update({n: m.data.n * 2})
  },
  div() {
    // m.data.n /= 1
    m.update({n: m.data.n / 2})
  },
  autoBindEvents() {
    for (let key in c.events) {
      const func = c[c.events[key]]
      const spaceIndex = key.indexOf(" ")
      const part1 = key.slice(0, spaceIndex)
      const part2 = key.slice(spaceIndex + 1)
      // console.log(part1, "---", part2, "---", func)
      c.v.el.on(part1, part2, func)
    }
  }
  /*bindEvents() {
    // 事件委托
    v.el.on("click", "#add1", () => {
      m.data.n += 1
      v.render(m.data.n) // view = render(data)
    })
    v.el.on("click", "#minus1", () => {
      m.data.n -= 1
      v.render(m.data.n)
    })
    v.el.on("click", "#mul2", () => {
      m.data.n *= 2
      v.render(m.data.n)
    })
    v.el.on("click", "#divide2", () => {
      m.data.n /= 2
      v.render(m.data.n)
    })
  }*/
}

export default c