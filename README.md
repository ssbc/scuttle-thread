# scuttle-thread

requires a server with `ssb-backlinks` plugin installed

## Examples

``js
const Scuttle = require('scuttle-thread')
const scuttle = Scuttle(server)

scuttle.like(msg, { value: true, expression: 'heart' }, cb)
```
