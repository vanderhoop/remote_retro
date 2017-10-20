export default () => {
  const hotEmitter = require("webpack/hot/emitter") // eslint-disable-line global-require
  const DEAD_CSS_TIMEOUT = 5000

  hotEmitter.on("webpackHotUpdate", () => {
    const stylesheets = document.querySelectorAll("link[href][rel=stylesheet]")
    const nodeListAsArray = Array.apply(null, stylesheets);
    const appStylesheets = nodeListAsArray.filter(stylesheet => /app\.css/.test(stylesheet.href))

    appStylesheets.forEach(link => {
      const nextStyleHref = link.href.replace(/(\?\d+)?$/, `?${Date.now()}`)

      const newLink = link.cloneNode()
      newLink.href = nextStyleHref

      link.parentNode.appendChild(newLink)
      const timeout = setTimeout(() => {
        link.parentNode.removeChild(link)
        clearTimeout(timeout)
      }, DEAD_CSS_TIMEOUT)
    })
  })
}
