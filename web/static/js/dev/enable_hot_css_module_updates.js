export default () => {
  const hotEmitter = require("webpack/hot/emitter")
  const DEAD_CSS_TIMEOUT = 2000

  hotEmitter.on("webpackHotUpdate", (_currentHash) => {
    document.querySelectorAll("link[href][rel=stylesheet]").forEach(link => {
      const nextStyleHref = link.href.replace(/(\?\d+)?$/, `?${Date.now()}`)
      const newLink = link.cloneNode()
      console.log(link)
      newLink.href = nextStyleHref

      link.parentNode.appendChild(newLink)
      const timeout = setTimeout(() => {
        link.parentNode.removeChild(link)
        clearTimeout(timeout)
      }, DEAD_CSS_TIMEOUT)
    })
  })
}
