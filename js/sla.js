var body = document.getElementsByTagName('body')[0]

body.onload = function() {
    addCSS()

    addSLA()

    addCookieDisclaimer()

    showCookieDisclaimer()
}

function addCSS() {
    var link = document.createElement('link')
    link.href = getBasePath() + '/../css/screen.css'
    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.media = 'screen, projection'

    document.getElementsByTagName('head')[0].appendChild(link)
}

function getBasePath() {
    var scripts = document.getElementsByTagName('script')
    var jsFile = scripts[scripts.length - 1].src.split('?')[0]

    return jsFile.substr(0, jsFile.lastIndexOf('/'))
}

function addSLA() {
    var kdlUrl = 'https://www.kdl.kcl.ac.uk/'

    var div = document.createElement('div')
    div.className = 'sla'

    var p = document.createElement('p')
    p.innerHTML = 'This site is '

    var a = document.createElement('a')
    a.href = kdlUrl + 'how-we-work/kdl-designed-developed-and-maintained/'
    a.innerHTML = "maintained by King's Digital Lab"

    p.appendChild(a)
    p.appendChild(document.createTextNode(' under a Service Level Agreement.'))

    div.appendChild(p)

    body.appendChild(div)
}

function addCookieDisclaimer() {
    var div = document.createElement('div')
    div.className = 'cookies-box hide'
    div.id = 'cookie-disclaimer'

    var p = document.createElement('p')
    p.innerHTML = 'We use cookies to track usage and preferences.'

    div.appendChild(p)

    p = document.createElement('p')

    var button = document.createElement('button')
    button.className = 'button'
    button.innerHTML = 'I Accept'
    button.id = 'close-cookie-disclaimer'
    button.type = 'button'

    p.appendChild(button)

    div.appendChild(p)

    p = document.createElement('p')

    var a = document.createElement('a')
    a.className = 'button open'
    a.onclick = function() {
        document.getElementById('privacy-policy').classList.toggle('hide')
        document.getElementById('cookie-disclaimer').classList.toggle('large')

        this.classList.toggle('open')
        this.classList.toggle('close')
    }
    a.href = '#'
    a.id = 'show-privacy-policy'
    a.innerHTML = 'Privacy &amp; Cookie Policy for ' + window.location.hostname

    p.appendChild(a)

    div.appendChild(p)

    var iframe = document.createElement('iframe')
    iframe.className = 'hide'
    iframe.id = 'privacy-policy'
    iframe.src = getBasePath() + '/../html/privacy-policy.html'

    div.append(iframe)

    body.appendChild(div)
}

function showCookieDisclaimer() {
    var key = 'cookie-disclaimer'
    var value = 'cookie-disclaimer-set'

    var disclaimer = document.getElementById('cookie-disclaimer')

    var cookieDisclaimerAccepted = getStorageItem(key)

    if (!cookieDisclaimerAccepted) {
        disclaimer.className = disclaimer.className.replace(/ hide/, '')
    }

    document.getElementById('close-cookie-disclaimer').onclick = function() {
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
