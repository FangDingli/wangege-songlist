//筛选歌曲类型
function changeCategory() {
  // 获取需要的元素
  const selectedCategory = document.getElementById('category-select').value
  const songTableBody = document.getElementById('song-table-body')
  const songRows = songTableBody.getElementsByTagName('tr')

  // 遍历每一行，搜索第一列是否包含搜索文本
  for (let i = 0; i < songRows.length; i++) {
    const songRow = songRows[i]
    const category = songRow.getElementsByTagName('td')[2].textContent

    if (selectedCategory === '全部' || category === selectedCategory) {
      songRow.style.display = '' // 显示匹配的行
    } else {
      songRow.style.display = 'none' // 隐藏不匹配的行
    }
  }
}

// 定义搜索函数
function searchSongs(value) {
  // 获取需要的元素
  const songTableBody = document.getElementById('song-table-body')
  var searchText = value.toLowerCase().replace(/ /g, ' ') // 获取输入的搜索文本，并转换为小写
  const rows = songTableBody.rows
  // 搜索切换
  if (searchText.trim() == '') {
    for (var i = 0; i < rows.length; i++) {
      rows[i].style.display = ''
    }
  } else {
    // 数据准备
    var data = []
    for (var i = 0; i < rows.length; i++) {
      var cells = rows[i].getElementsByTagName('td')
      var rowData = {
        song: cells[0].textContent,
        artist: cells[1].textContent,
      }
      data.push(rowData)
    }
    // 正则匹配
    var regex = new RegExp(searchText, 'i')
    var searchData = data.filter(function (rowData) {
      return regex.test(rowData.song) || regex.test(rowData.artist)
    })
    // 显示结果
    for (var i = 0; i < rows.length; i++) {
      if (searchData.indexOf(data[i]) != -1) {
        rows[i].style.display = ''
      } else {
        rows[i].style.display = 'none'
      }
    }
  }
}

function debounce(func, wait, immediate) {
  let timeout

  return function () {
    let context = this
    let args = arguments

    if (timeout) clearTimeout(timeout)
    if (immediate) {
      let callNow = !timeout
      timeout = setTimeout(function () {
        timeout = null
      }, wait)
      if (callNow) {
        func.apply(context, args)
      }
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait)
    }
  }
}

// 这里 debounce 没有生效，暂未找到原因，待修改
function debounceSearch(value) {
  debounce(searchSongs(value), 1500, false)
}

// 定义复制函数
function copySongName(mode, event) {
  let songName = ''
  let key = '点歌 '

  //模式判定
  if (mode === 1) {
    // 复制歌名
    if (event.target.cellIndex == 0) {
      songName = event.target.innerText
    }
  } else {
    let rows = document.getElementById('song-table').rows
    songName = rows[Math.round(Math.random() * rows.length)].cells[0].innerText
  }

  // 空歌曲判断
  if (songName === '') {
    return
  }
  navigator.clipboard.writeText(key + songName)

  // 弹出提示
  let message = document.createElement('div')
  message.innerText = key + songName
  message.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
  message.style.color = '#fff'
  message.style.borderRadius = '10px'
  message.style.padding = '10px 20px'
  message.style.position = 'fixed'
  message.style.top = '50%'
  message.style.left = '50%'
  message.style.transform = 'translate(-50%, -50%)'
  message.style.zIndex = '999'
  document.body.appendChild(message)
  setTimeout(() => {
    document.body.removeChild(message)
  }, 2000)
}

function betterCopySongName(mode, event) {
  let songName = ''
  let key = '点歌 '

  //模式判定
  if (mode === 1) {
    // 复制歌名
    if (event.target.cellIndex == 0) {
      songName = event.target.innerText
    }
  } else {
    songName = allSonglist[Math.floor(Math.random() * allSonglist.length)][0]
  }

  // 空歌曲判断
  if (songName === '') {
    return
  }

  // 弹出提示
  let message = document.createElement('div')
  message.innerText = key + songName
  message.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
  message.style.color = '#fff'
  message.style.borderRadius = '10px'
  message.style.padding = '10px 20px'
  message.style.position = 'fixed'
  message.style.top = '50%'
  message.style.left = '50%'
  message.style.transform = 'translate(-50%, -50%)'
  message.style.zIndex = '999'
  document.body.appendChild(message)
  setTimeout(() => {
    document.body.removeChild(message)
  }, 2000)
}

// 当前行高亮
function trSelect(event) {
  // 取得所需元素
  let tab = document.getElementById('song-table')
  // 判定更改底色
  if (event.srcElement.tagName == 'TD') {
    for (i = 0; i < tab.rows.length; i++) {
      tab.rows[i].bgColor = ''
    }
    event.srcElement.parentElement.bgColor = '#99CCE4'
  }
}
