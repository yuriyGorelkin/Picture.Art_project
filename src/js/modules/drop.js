const drop = () => {
  const fileInputs = document.querySelectorAll('[name="upload"]')

  ;['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
    fileInputs.forEach(input => {
      input.addEventListener(eventName, preventDefaults, false)
    })
  })

  function preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
  }

  function highlight(item) {
    item.closest('.file_upload').style.backgroundColor = 'rgba(0,0,0,.3)'
  }

  function unhighlight(item) {
    if (item.closest('.calc_form')) {
      item.closest('.file_upload').style.backgroundColor = '#fff'
    } else {
      item.closest('.file_upload').style.backgroundColor = '#ededed'
    }
  }

  ;['dragenter', 'dragover'].forEach(eventName => {
    fileInputs.forEach(input => {
      input.addEventListener(eventName, () => highlight(input), false)
    })
  })
  ;['dragleave', 'drop'].forEach(eventName => {
    fileInputs.forEach(input => {
      input.addEventListener(eventName, () => unhighlight(input), false)
    })
  })

  fileInputs.forEach(input => {
    input.addEventListener('drop', e => {
      input.files = e.dataTransfer.files
      let dots
      const arr = input.files[0].name.split('.')

      arr[0].length > 6 ? (dots = '...') : (dots = '.')
      const name = arr[0].substring(0, 6) + dots + arr[1]
      input.previousElementSibling.textContent = name
      console.log(input.files[0])
    })
  })
}

export default drop
