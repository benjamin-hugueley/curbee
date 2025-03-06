import { build } from '@benjamin-hugueley/magic'
import { config } from './config'
import { watcher } from './watcher'

const app = build({
  headers: config.SECURITY_HEADERS,
  methods: config.HTTP_METHODS
})

export { app, config, watcher }