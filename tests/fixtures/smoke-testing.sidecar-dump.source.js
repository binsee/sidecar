/*****************************************
 * File: "templates/agent.mustache"
 * --------------------------------
 * Sidecar Frida Agent Mustache Template
 *
 *  https://github.com/huan/sidecar
 *  Huan <zixia@zixia.net>
 *  June 24, 2021
 *
 * All sidecar agent variable/function names
 *  MUST be started with the namespace `__sidecar__`
 *
 * i.e.:
 *  const __sidecar__variableName = {}
 *  function __sidecar__functionName () {}
 *
 *****************************************/

/***********************************
 * File: "templates/agent.mustache"
 *  > Partials: "libs/payload.js"
 ***********************************/
/********************************************
 * File: templates/lib/payload.js
 *
 * To make sure the payload typing is right
 * See: sidecar-body/payload-schema.ts
 ********************************************/
/**
 * SidecarPayloadHook
 */
const __sidecar__payloadHook = (
  method, // string
  args,   // Arguments, Array
) => ({
  payload: {
    /**
     * Convert `args` from Array to Object
     * to satisfy `SidecarPayloadHook` interface
     */
    args: {
      ...args,
    },
    method,
  },
  type: 'hook',
})

/**
 * SidecarPayloadLog
 */
const __sidecar__payloadLog = (
  level,    // verbose, silly
  prefix,   // module name
  message,  // string
) => ({
  payload: {
    level,
    message,
    prefix,
  },
  type : 'log',
})

/**
 * For unit testing under Node.js
 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ...module.exports,
    __sidecar__payloadHook,
    __sidecar__payloadLog,
  }
}

/***********************************
 * File: "templates/agent.mustache"
 *  > Partials: "libs/log.js"
 ***********************************/
/*******************************
 * File: templates/libs/log.js
 *******************************/
const log = (() => {
  const levelTable = {
    info    : 0,
    verbose : 1,
    silly   : 2,
  }
  let logLevel = levelTable.info

  function verbose (prefix, message, ...args) {
    if (logLevel >= levelTable.verbose) {
      send(__sidecar__payloadLog(
        'verbose',
        prefix,
        sprintf(message, ...args)
      ))
    }
  }

  function silly (prefix, message, ...args) {
    if (logLevel >= levelTable.silly) {
      send(__sidecar__payloadLog(
        'silly',
        prefix,
        sprintf(message, ...args)
      ))
    }
  }

  function level (newLevel) {
    if (typeof newLevel === 'number') {
      logLevel = newLevel
    } else if (newLevel in levelTable) {
      logLevel = levelTable[newLevel]
    } else {
      console.error('unknown newLevel, enable maximum logging')
      logLevel = 99
    }
  }

  return {
    level,
    verbose,
    silly,
  }

  // function buildMessage (prefix, message, ...args) {
  //   return prefix + ' ' + sprintf(message, ...args)
  // }

  // Credit: https://stackoverflow.com/a/4795914/1123955
  function sprintf () {
    const args = arguments
    const text = args[0]
    let i = 1
    return text.replace(/%((%)|s|d)/g, function (m) {
      // m is the matched format, e.g. %s, %d
      let val = null
      if (m[2]) {
        val = m[2]
      } else {
        val = args[i]
        // A switch statement so that the formatter can be extended. Default is %s
        switch (m) {
          case '%d':
            val = parseFloat(val)
            if (isNaN(val)) {
              val = 0
            }
            break
        }
        i++
      }
      return val
    })
  }
})()

/**
 * For unit testing under Node.js
 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ...module.exports,
    log,
  }
}

log.level('info')

/****************************************************
 * File: "templates/agent.mustache"
 *  > Get base address for target "test"
 ****************************************************/
const __sidecar__moduleBaseAddress = Module.getBaseAddress('test')

/***********************************
 * File: "templates/agent.mustache"
 *  > Variable: "initAgentScript"
 ***********************************/


/********************************************
 * File: "templates/agent.mustache"
 *  > Partials: "native-functions.mustache"
 ********************************************/
/************************************************************
 * File: "native-functions.mustache"
 * ---------------------------------
 * Native Function List: automaticated generated by Sidecar
 *
 *  Author: Huan <zixia@zixia.net>
 *  https://github.com/huan/sidecar
 ************************************************************/

    /*****************************************************************
     * File: "native-function-address.mustache"
     *
     * Native Function: mo
     *  - address: 0x1234
     *  - Parameters: 'pointer'
     *  - Ret: void
     ******************************************************************/

    const __sidecar__mo_NativeFunction_wrapper = (() => {
      const nativeFunctionAddress =
        __sidecar__moduleBaseAddress
        .add(0x1234)

      const nativeFunction = new NativeFunction(
        nativeFunctionAddress,
        'void',
        ['pointer'],
      )

      return function (...args) {
        log.verbose(
          'SidecarAgent',
          'mo(%s)',
          args.join(', '),
        )

        // pointer type for arg[0] -> Utf8String
const mo_NativeArg_0 = Memory.alloc(1024 /*Process.pointerSize*/)
mo_NativeArg_0.writeUtf8String(args[0])

        const ret = nativeFunction(...[mo_NativeArg_0])
        return ret
      }

    })()




/**************************************
 * File: "templates/agent.mustache"
 *  > Partials: "interceptors.mustache"
 **************************************/
/*********************************************************
 * File: "templates/interceptors.mustache"
 *
 * Interceptors List: automaticated generated by Sidecar
 *  template file: "interceptors.mustache"
 *
 *  Author: Huan <zixia@zixia.net>
 *  https://github.com/huan/sidecar
 *********************************************************/

    /******************************************************************
     * File: "interceptors-address.mustache"
     *
     * Interceptor Target: mt
     *  - type: address
     *  - address: 0x5678
     *  - Parameters: 'pointer'
     ******************************************************************/

    ;(() => {
      const interceptorTarget =
        __sidecar__moduleBaseAddress
        .add(0x5678)

      Interceptor.attach(
        interceptorTarget,
        {
          onEnter: args => {
            log.verbose(
              'SidecarAgent',
              'Interceptor.attach(0x%s) onEnter()',
              Number(0x5678).toString(16),
            )

            send(__sidecar__payloadHook(
              'mt',
              [ args[0].readUtf8String() ]
            ), null)

          },
        }
      )
    })()




/********************
 * RPC Exports Init *
 ********************/
function __sidecar__init () {
  log.verbose('SidecarAgent', 'init()')

  /**
   * DEBUG: Huan(202106) return 42 to let caller to make sure that
   *  this function has been runned successfully.
   */
  return 42
}

rpc.exports = {
  init: __sidecar__init,
  ...rpc.exports,
}

/**************************************
 * File: "templates/agent.mustache"
 *  > Partials: "rpc-exports.mustache"
 **************************************/
/*********************************************************
 * File: "rpc-exports.mustache"
 * ----------------------------
 * RPC Exports List: automaticated generated by Sidecar
 *
 *  Author: Huan <zixia@zixia.net>
 *  https://github.com/huan/sidecar
 *********************************************************/
rpc.exports = {
  ...rpc.exports,
  mo: __sidecar__mo_NativeFunction_wrapper,
}

