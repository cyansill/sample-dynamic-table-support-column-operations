var configurations = {
  "line_height_light_color": "#f0f0f0",
  "odd_line_height_light": false,
}
var data = []

function obtain_data() {
  return [
  {
    name: "david",
    number: "2001"
  },
  {
    name: "nude",
    number: "2004"
  },
  {
    name: "asa",
    number: "2004"
  },
  {
    name: "david",
    number: "2001"
  },
  {
    name: "nude",
    number: "2004"
  },
  {
    name: "asa",
    number: "2004"
  },
  {
    name: "david",
    number: "2001"
  },
  {
    name: "nude",
    number: "2004"
  },
  {
    name: "asa",
    number: "2004"
  },
  ]
}

function mount_template(...templates) {
  let main = document.getElementById("main")
  if (templates) main.innerHTML = templates.join("\n")
  console.debug(main)
  return main
}

function mount_data(el, data) {
  console.debug("run data")
  if (!el) return
  // clear inner html
  el.innerHTML = ``
  let tb_inner = ``
  data = data ?? []
  console.debug(data)
  // table head
  let th = `<thead>\n<tr class="custom_th_tr">\n`
  let data_heads = Object.keys(data[0])
  let data_heads_len = data_heads.length
  let data_len = data.length
  for (let idx = 0; idx < data_heads_len; idx += 1) {
    th = th + `<th>${data_heads[idx]}</th>\n`  
  }
  th = th + `</tr>\n</thead>\n`
  tb_inner = tb_inner + th
  let tb = `<tbody>\n`
  for (let idx = 0; idx < data_len; idx += 1) {
    tb = tb + `<tr class="custom_tr" style="${
      idx % 2 === 0 ? 
      configurations.odd_line_height_light ? "background-color: " + configurations.line_height_light_color  : "" :
        configurations.odd_line_height_light ? "" : "background-color: " + configurations.line_height_light_color
    }">\n`
    for (let idx_1 = 0; idx_1 < data_heads_len; idx_1 += 1) {
      tb = tb + `<td>${data[idx][data_heads[idx_1]]}</td>\n`
    }
    tb = tb + `</tr>\n`
  }
  tb = tb + `</tbody>\n`
  tb_inner = tb_inner + tb
  el.innerHTML = tb_inner
} 

function mount_actions(actions) {
  actions = actions ?? {}
  let actions_keys = Object.keys(actions)
  let actions_keys_len = actions_keys.length
  for (let idx = 0; idx < actions_keys_len; idx += 1) {
    let dom = document.getElementById(actions_keys[idx])
    if (!dom) continue;
    // mount actions
    dom.addEventListener("click", actions[actions_keys[idx]])
  }
} 

// actions 
function b_add_col () {
  let input_name = document.getElementById("input_add_col_name")
  let input_default = document.getElementById("input_add_col_default")
  if (!input_name || input_name.value === "") {
    alert("列名不可为空")
    return
  }
  if (!input_default || input_default.value === "") {
    alert("列默认值不可为空")
    return
  }
  let thead = document.getElementsByClassName("custom_th_tr")[0]
  let _heads = thead.children
  let heads = Array.from(_heads)
  if (heads.map(d => d.textContent).includes(input_name.value)) {
    alert("列名已存在")
    return
  }

  // processing addition
  // let head_node = document.createElement("th")
  // head_node.innerText = input_name.value
  // thead.appendChild(head_node)
  // let _rows = document.getElementsByClassName("custom_tr")
  // let rows = Array.from(_rows)
  // let rows_len = rows.length
  // for (let idx = 0; idx < rows_len; idx += 1) {
  //   let body_node = document.createElement("td")
  //   body_node.innerText = input_default.value
  //   rows[idx].appendChild(body_node)
  // }
  data = data.map(d => ({
    ...d,
    [input_name.value]: input_default.value
  }))
}

function b_obtain_data () {
  let res = []
  let keys = []
  let tb = document.getElementById("tb")
  let _heads = tb.children[0].children[0].children
  let heads = Array.from(_heads)
  let heads_len = heads.length
  for (let idx = 0; idx < heads_len; idx += 1) {
    keys.push(heads[idx].textContent)
  }
  let keys_len = keys.length
  let _bodies = tb.children[1].children
  let bodies = Array.from(_bodies)
  let bodies_len = bodies.length
  for (let idx = 0; idx < bodies_len; idx += 1) {
    let _tds = bodies[idx].children
    let tds = Array.from(_tds)
    let obj = {}
    for (let idx_1 = 0; idx_1 < keys_len; idx_1 += 1) {
      // Object.defineProperty(obj, keys[idx_1], tds[idx_1].textContent)
      let descriptor = Object.create(null)
      descriptor.value = tds[idx_1].textContent
      Object.defineProperty(obj, keys[idx_1], descriptor)
    }
    res.push(obj)
  }
  console.debug(res)
}

// function b_add_row_call_form() {
//   let form = document.getElementById("masked_form")
//   form.setAttribute("style", "display: initial")
// }

// function b_add_row() {
// }

// function b_change_line_height_light_color() {
//   let input_color = document.getElementById("input_change_line_height_light_color")
//   console.debug(input_color.value)
//   if (!input_color || input_color.value === "") {
//     alert("颜色代码不可为空")
//     return
//   }
//   configurations.line_height_light_color = input_color.value
// }

function b_change_line_height_light_color() {
  let color_picker = document.getElementById("color_picker")
  let picker_document = color_picker.contentDocument
  if (!picker_document) {
    alert("无法在文件模式下加载颜色选择器")
    return
  }
  let _colors_dom = picker_document.getElementsByClassName("color-hex")
  let color = _colors_dom[_colors_dom.length - 1].value
  configurations.line_height_light_color = color
}

function b_change_line_height_light() {
  configurations.odd_line_height_light = !configurations.odd_line_height_light
}

// after mounted 
(function () {
  let father

  let _buttons = `
  <div style="display: inline;">
    <input placeholder="列名" id="input_add_col_name"/>
    <input placeholder="默认值" id="input_add_col_default"/>
    <button id="btn_add_col">添加列</button>
    <button id="btn_obtain_data"> 获取数据</button>
    <!-- <button id="btn_add_row">添加数据</button> --> 
  </div>
  `
  const _table = `
  <table id="tb" border="1" style="margin: .5rem 0; width: 100%;">    
  </table>
  `
  let _color_bar = `
  <div>
    <div style="margin-bottom: .5rem;">
      <button id="btn_change_line_height_light_color">更改表格醒目色</button>
      <button id="btn_change_line_height_light">更改醒目色单双行显示: 当前${configurations.odd_line_height_light ? "单行" : "双行"}</button>
    </div>
    <iframe 
      src="./components/color_picker/color_picker.html" width="450"
      height="220" scrolling="no" id="color_picker"
    ></iframe>
  </div>
  `
  // const _masked_form = `
  //   <div class="masked" id="masked_form">
  //   </div>
  // `
  const mount = function () {
    father = mount_template(_buttons, _table, _color_bar)
    mount_data(father.children.tb, data)
    mount_actions(actions)
  }
  const actions = {
    btn_add_col: () => {
      b_add_col()
      mount()
    },
    btn_obtain_data: b_obtain_data,
    // btn_add_row: b_add_row_call_form,
    btn_change_line_height_light_color: () => {
      b_change_line_height_light_color()
      mount()
    },
    btn_change_line_height_light: () => {
      b_change_line_height_light()
      _color_bar = `
      <div>
        <div style="margin-bottom: .5rem;">
          <button id="btn_change_line_height_light_color">更改表格醒目色</button>
          <button id="btn_change_line_height_light">更改醒目色单双行显示: 当前${configurations.odd_line_height_light ? "单行" : "双行"}</button>
        </div>
        <iframe 
          src="./components/color_picker/color_picker.html" width="450"
          height="220" scrolling="no" id="color_picker"
        ></iframe>
      </div>
      `
      mount()
    },
  }
  data = obtain_data()
  mount()
})()
