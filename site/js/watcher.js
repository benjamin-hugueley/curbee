function watch() {
  let source = null

  document.addEventListener('DOMContentLoaded', () => {
    source = new EventSource('/event-streams/watch')

    source.addEventListener('change', (event) => {
      console.log('Change detected:', event.data)
      window.location.reload()
    });

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        window.location.reload()
      }
    })
  })

  window.addEventListener('beforeunload', () => {
    if (source) {
      source.close()
    }
  })
}

export { watch }