var body = document.getElementsByTagName('body')[0]

body.onload = function() {
    addCSS()

    addSLA()

    addCookieDisclaimer()

    showCookieDisclaimer()
}

function addCSS() {
    var scripts = document.getElementsByTagName('script')
    var jsFile = scripts[scripts.length - 1].src.split('?')[0]

    var link = document.createElement('link')
    link.href = jsFile.substr(0, jsFile.lastIndexOf('/')) + '/../css/screen.css'
    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.media = 'screen, projection'

    document.getElementsByTagName('head')[0].appendChild(link)
}

function addSLA() {
    var kdlUrl = 'https://www.kdl.kcl.ac.uk/'
    var div = document.createElement('div')
    div.className = 'sla'

    var p = document.createElement('p')
    p.innerHTML =
        'This project is no longer active. ' +
        'It is currently supported by a Service Level Agreement and is '

    var a = document.createElement('a')
    a.href = kdlUrl + 'how-we-work/kdl-designed-developed-and-maintained/'
    a.innerHTML = 'maintained'

    p.appendChild(a)
    p.appendChild(document.createTextNode(' by '))

    a = document.createElement('a')
    a.href = kdlUrl
    a.innerHTML = "King's Digital Lab"

    p.appendChild(a)

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

    var a = document.createElement('a')
    a.className = 'button'
    a.href = '/privacy-cookie-policy/'
    a.innerHTML = 'Privacy &amp; Cookie Policy'

    var button = document.createElement('button')
    button.className = 'button'
    button.innerHTML = 'I understand'
    button.id = 'close-cookie-disclaimer'
    button.type = 'button'

    p.appendChild(a)
    p.appendChild(button)

    div.appendChild(p)

    body.appendChild(div)
}

function showCookieDisclaimer() {
    var cookieCName = 'sla-cookie'
    var cookieCValue = 'sla-cookie-set'

    var disclaimer = document.getElementById('cookie-disclaimer')

    var sla = getCookie(cookieCName)

    if (!sla) {
        disclaimer.className = disclaimer.className.replace(/ hide/, '')
    }

    document.getElementById('close-cookie-disclaimer').onclick = function() {
        setCookie(cookieCName, cookieCValue, 30)
        disclaimer.className += ' hide'
    }
}

function getCookie(cname) {
    var name = cname + '='
    var ca = document.cookie.split(';')

    for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) == ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
        }
    }

    return ''
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date()
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)

    var expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}
