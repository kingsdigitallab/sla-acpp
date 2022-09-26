var body = document.getElementsByTagName('body')[0]
// Added by EH: Allows an optional target to be added to script tag
// for appending sla html.  Will not work in pre-HTML5 browsers
var script_tag = document.getElementById('sla_js');
// Start as body for graceful failure
var sla_target = body;
if (script_tag){
  // sla_target should be id
  if (document.getElementById(script_tag.getAttribute("sla_target_id")) != null){
    sla_target = document.getElementById(script_tag.getAttribute("sla_target_id"))
  }

}

body.onload = function () {
  addCSS()

  addSLA()

  addCookieDisclaimer()

  showCookieDisclaimer()
}

function addCSS() {
  let link = document.createElement('link')
  link.href = getBasePath() + '/../css/screen.css'
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.media = 'screen, projection'

  document.getElementsByTagName('head')[0].appendChild(link)
}

function getBasePath() {
  const jsFile = getJSFile().src.split('?')[0]
  return jsFile.substr(0, jsFile.lastIndexOf('/'))
}

function getJSFile() {
  const scripts = document.getElementsByTagName('script')

  return scripts[scripts.length - 1]
}

function addSLA() {
  const kdlUrl = 'https://www.kdl.kcl.ac.uk/'

  let div = document.createElement('div')
  div.className = 'sla'
  div.setAttribute('role', 'banner')
  div.setAttribute('aria-label', 'Site maintenance')

  let p = document.createElement('p')
  p.innerHTML = 'This site is '

  let a = document.createElement('a')
  a.href = kdlUrl + 'how-we-work/kdl-designed-developed-and-maintained/'
  a.innerHTML = 'maintained'

  p.appendChild(a)
  p.appendChild(document.createTextNode(' under a Service Level Agreement by '))

  a = document.createElement('a')
  a.href = kdlUrl
  a.innerHTML = "King's Digital Lab"

  p.appendChild(a)

  div.appendChild(p)

  sla_target.appendChild(div)
}

function addCookieDisclaimer() {
  let div = document.createElement('div')
  div.className = 'cookies-box hide'
  div.id = 'cookie-disclaimer'
  div.setAttribute('role', 'banner')
  div.setAttribute('aria-label', 'Cookies & privacy')

  let p = document.createElement('p')
  p.innerHTML =
    'We use cookies to track usage and preferences. For more information, please read our '

  let a = document.createElement('a')
  a.className = 'button open'
  a.onclick = function () {
    document.getElementById('privacy-policy').classList.toggle('hide')
    document.getElementById('cookie-disclaimer').classList.toggle('large')

    this.classList.toggle('open')
    this.classList.toggle('close')
  }
  a.href = '#'
  a.id = 'show-privacy-policy'
  a.innerHTML = 'Privacy &amp; Cookie Policy.'

  p.appendChild(a)

  div.appendChild(p)

  p = document.createElement('p')

  let button = document.createElement('button')
  button.className = 'button'
  button.innerHTML = 'Accept'
  button.id = 'close-cookie-disclaimer'
  button.type = 'button'
  button.setAttribute('aria-label', 'Accept')

  p.appendChild(button)

  div.appendChild(p)

  let iframe = document.createElement('iframe')
  iframe.className = 'hide'
  iframe.id = 'privacy-policy'
  iframe.src = getBasePath() + '/../html/privacy-policy.html'
  iframe.setAttribute('title', 'Privacy Policy')

  div.append(iframe)

  sla_target.appendChild(div)
}

function showCookieDisclaimer() {
  const key = 'cookie-disclaimer'
  const value = 'cookie-disclaimer-set'

  const disclaimer = document.getElementById('cookie-disclaimer')

  const cookieDisclaimerAccepted = getStorageItem(key)

  if (!cookieDisclaimerAccepted) {
    disclaimer.className = disclaimer.className.replace(/ hide/, '')
  }

  document.getElementById('close-cookie-disclaimer').onclick = function () {
    setStorageItem(key, value)
    disclaimer.className += ' hide'
  }
}

function getStorageItem(key) {
  if (typeof Storage !== 'undefined') {
    return localStorage.getItem(key)
  }

  return null
}

function setStorageItem(key, value) {
  if (typeof Storage !== 'undefined') {
    localStorage.setItem(key, value)
  }
}
