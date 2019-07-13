'use strict'

document.addEventListener('DOMContentLoaded', function() {
  ;(function app() {
    // Set global variables
    const linkDisplay = document.getElementById('link-display')
    const linkCopy = document.getElementById('link-copy')
    const linkCopied = document.getElementById('link-copied')
    const buttonGenerateLink = document.getElementById('generate-link')
    const sellersCountTarget = document.getElementById('count-sellers')
    window.countSellers = 0

    // Run functions after page load
    ;(function afterPageLoadChangeTextareaRows() {
      const textarea = document.getElementById('textarea')
      if (window.innerWidth > 768) {
        textarea.rows = '23'
      } else {
        textarea.rows = '4'
      }
    })()

    // Define functions
    function replaceInputValues() {
      const textarea = document.getElementById('textarea')
      textarea.value = textarea.value
        .replace(/("|')/g, '')
        .replace(/(?:\r\n|\r|\n)/g, ',')
        .replace(/(, |,,| ,)/g, ',')
        .replace(/(, |,,| ,)/g, ',')
    }
    function sellersList(list) {
      if (list.indexOf('\n') == -1) {
        list = list.replace(/["']/g, '')
        list = list.split(',')
      } else {
        list = list.split('\n')
      }
      list = list.map(i => i.trim()).filter(e => e)
      window.countSellers = list.length
      return list
    }
    function returnLink() {
      const linkBase = 'https://www.ebay.com.au/sch/i.html?LH_SpecificSeller=1&_saslop=1&rt=nc&_sasl='
      const textarea = document.getElementById('textarea')
      const linkSellers = encodeURIComponent(sellersList(textarea.value))
      const link = `${linkBase}${linkSellers}`
      return `<a href="${link}" rel="nofollow noopener" target="blank">${link}</a>`
    }
    function changeLinkDisplay() {
      linkDisplay.innerHTML = returnLink()
    }
    function changeCountSellers() {
      sellersCountTarget.innerHTML = window.countSellers
    }
    function build() {
      replaceInputValues()
      changeLinkDisplay()
      changeCountSellers()
    }
    function selectLink() {
      setTimeout(() => {
        window.getSelection().selectAllChildren(linkDisplay)
      }, 100)
    }
    function showAlert() {
      linkCopied.classList.add('active')
    }
    function copyValueToClipBoard() {
      selectLink()
      setTimeout(() => {
        document.execCommand('copy')
        showAlert()
      }, 100)
    }
    function generateLink() {
      build()
    }

    // On click events
    linkCopy.onclick = function() {
      copyValueToClipBoard()
    }
    buttonGenerateLink.onclick = function() {
      generateLink()
    }

    // Event listeners
    textarea.addEventListener('input', build, true)
    textarea.addEventListener('propertychange', build, true)
    textarea.addEventListener('change', build, true)

    textarea.addEventListener('paste', selectLink, true)
  })()
})
