import { EventEmitter } from 'stream'
import TypedEventEmitter  from 'typed-emitter'

import { SidecarPayloadHook } from './payload-schemas'

// import {
//   SidecarPayloadLog,
//   SidecarPayloadHook,
// }                               from './payload-schemas'

// export type AttachedEventListener = () => void
// export type DetachedEventListener = () => void
// export type InitedEventListener   = () => void

// export type HookEventListener = (payload: SidecarPayloadHook['payload']) => void
// export type LogEventListener  = (payload: SidecarPayloadLog['payload'])  => void

// interface SidecarEvents {
//   attached : AttachedEventListener
//   detached : DetachedEventListener
//   error    : Error
//   hook     : HookEventListener
//   inited   : InitedEventListener
//   log      : LogEventListener
// }

export type SymbolEventListener = () => void
export type HookEventListener   = (
  args: Error | SidecarPayloadHook['payload']['args']
) => void

interface SidecarEvents {
  [symbol: symbol]: SymbolEventListener
  [hook: string]: HookEventListener
}

type SidecarEmitterType = new () => TypedEventEmitter<
  SidecarEvents
>

const SidecarEmitter = EventEmitter as SidecarEmitterType

export { SidecarEmitter }
