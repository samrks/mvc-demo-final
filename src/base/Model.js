import EventBus from "./EventBus"

// extends 实现继承共有属性
class Model extends EventBus {
  constructor(options) {
    // this.data = options.data  // data 必须传入才会赋值到当前实例对象的data上。也就是说，下面的方法都是在原型上，只有 data 是在当前实例对象上
    // this.create = options.c reate
    // this.delete = options.delete
    // this.update = options.update
    // this.get = options.get
    super()
    const keys = ["data", "create", "delete", "update", "get"]
    keys.forEach((key) => {
      if (key in options) {
        this[key] = options[key]
      }
    })
  }
  
  create() {
    // console.error("你还没有实现 create")
    // if(console && console.error){ console.error("你还没有实现 create")} // 检查是否具有console和console.error方法。ie 就没有 console
    // console && console.error && console.error("你还没有实现 create")  // 有经验的程序员 会写成这样
    console?.error?.("你还没有实现 create")   // 2019.10 最新语法，可选链语法「?.」
  }
  
  delete() {
    console.error("你还没有实现 delete")
  }
  
  update() {
    console.error("你还没有实现 update")
  }
  
  get() {
    console.error("你还没有实现 get")
  }
}

export default Model



// 类的使用
// const m = new Model()
// m.create()
// m.delete()
// m.update()
// m.get()

