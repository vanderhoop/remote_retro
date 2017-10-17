export default () => {
  const hotEmitter = require("webpack/hot/emitter") // eslint-disable-line global-require
  const DEAD_CSS_TIMEOUT = 2000

  hotEmitter.on("webpackHotUpdate", () => {
    document.querySelectorAll("link[href][rel=stylesheet]").forEach(link => {
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
