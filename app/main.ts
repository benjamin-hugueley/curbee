import { app } from './core/_index.js'
import { routers } from './routers/_index.js'

routers.appointments()
routers.eventStreams()
routers.files()

app.listen(3000, () => console.log('Server running at http://localhost:3000/'))