# Micro App Contract

Every micro app must:

1. Use a unique `name`, `activeRule`, and dev `port`.
2. Export or register `bootstrap`, `mount`, and `unmount`.
3. Support standalone mode and qiankun-mounted mode.
4. Avoid `/` as a mounted route in the host.
5. Clean timers, events, subscriptions, sockets, and SDK instances on unmount.
6. Use shared event names from `@shared/events`.
7. Read host values through props, not host internals.
