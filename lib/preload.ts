export function preloadAuth() {
  void fetch('/auth').catch(() => {})
}

export function preloadLinks(paths: string[]) {
  paths.forEach(path => {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = path
    document.head.appendChild(link)
  })
}
