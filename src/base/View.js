import $ from "jquery"
import EventBus from "./EventBus"

class View extends EventBus {
  // constructor({el, html, render, data, eventBus, events}) {
  constructor(options) {
    super()
    Object.assign(this, options)  // 这句表示，把 options 上的属性都放到 this 上
    this.el = $(this.el) // el 获取到节点，再覆盖到 this.el 上
    /*this.html = html
    this.render = render
    this.data = data
    this.eventBus = eventBus
    this.events = events*/
    // init ↓ ↓
    this.render(this.data) // view = render(data) 第一次渲染
    this.autoBindEvents()
    this.on("m:updated", () => {
      this.render(this.data)
    })
  }
  
  autoBindEvents() {
    for (let key in this.events) {
      const func = this[this.events[key]]
      const spaceIndex = key.indexOf(" ")
      const part1 = key.slice(0, spaceIndex)
      const part2 = key.slice(spaceIndex + 1)
      // console.log(part1, part2, func)
      this.el.on(part1, part2, func)
    }
  }
}

export default View