import {
  log,
}                       from '../../config'
import {
  TypeChain,
}                       from '../../frida'
import {
  TargetPayloadObj,
  FunctionTargetType,
}                     from '../../function-target'

import { SIDECAR_SYMBOL }   from './constants'
import { SidecarTargetObj } from './target'

export interface SidecarMetadataFunctionDescription {
  name          : string
  paramTypeList : TypeChain[]
  retType?      : TypeChain
  target        : TargetPayloadObj,
}

export type SidecarMetadataFunctionTypeDescription = {
  [type in FunctionTargetType]?: SidecarMetadataFunctionDescription
}

export interface SidecarMetadata {
  nativeFunctionList : SidecarMetadataFunctionTypeDescription[],
  interceptorList    : SidecarMetadataFunctionTypeDescription[],
  initAgentScript?   : string,
  sidecarTarget?     : SidecarTargetObj,
}

function updateMetadataSidecar (
  target : any,
  view   : SidecarMetadata,
): void {
  log.verbose('Sidecar', 'updateMetadataSidecar(%s, "%s...")',
    target.name,
    JSON.stringify(view).substr(0, 20),
  )
  // log.silly('Sidecar', 'updateMetadataSidecar(%s, %s)',
  //   target.name,
  //   JSON.stringify(view)
  // )

  // Update the parameter names
  Reflect.defineMetadata(
    SIDECAR_SYMBOL,
    view,
    target,
  )
}

function getMetadataSidecar (
  target      : Object,
): undefined | SidecarMetadata {
  // Pull the array of parameter names
  const view = Reflect.getMetadata(
    SIDECAR_SYMBOL,
    target,
  )
  return view
}

export {
  getMetadataSidecar,
  updateMetadataSidecar,
}
