const modals = () => {
    function bindModals(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {

        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'),
            scroll = calcScroll()

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault()
                }

                windows.forEach(item => {
                    item.style.display = 'none'
                })

                modal.style.display = 'block'
                document.body.style.overflow = 'hidden'
                document.body.style.marginRight = `${scroll}px`
            })
        })

        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none'
            })

            modal.style.display = 'none'
            document.body.style.overflow = ''
            document.body.style.marginRight = `0px`
        })


        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
                windows.forEach(item => {
                    item.style.display = 'none'
                })

                modal.style.display = 'none'
                document.body.style.overflow = ''
                document.body.style.marginRight = `0px`
            }
        })
    }

    function showModalByTime(selector, time) {  
        setTimeout(() => {   
            let display,
                scroll = calcScroll()

            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    display = 'block'
                }               
            }) 
            
            if (!display) {
                document.querySelector(selector).style.display = 'block'
                document.body.style.overflow = 'hidden'
                document.body.style.marginRight = `${scroll}px` 
            }
        }, time)
    }

    function calcScroll() {
        const div = document.createElement('div')

        div.style.width = '50px'
        div.style.height = '50px'
        div.style.overflowY = 'scroll'
        div.style.visibility = 'hidden'

        document.body.appendChild(div)
        let scrollWidth = div.offsetWidth - div.clientWidth
        div.remove()

        return scrollWidth
    }

    bindModals('.button-design', '.popup-design', '.popup-design .popup-close')   
    bindModals('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close')   
    bindModals('.fixed-gift', '.popup-gift', '.popup-gift .popup-close') 
    // showModalByTime('.popup-consultation', 60000)  
}

export default modals