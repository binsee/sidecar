import path from 'path'

import { FridaTarget } from '../src/frida'

/**
 * See: https://github.com/frida/frida-node/blob/master/test/data/index.ts
 */
function targetProgram () {
  const chatboxNameList = [
    'chatbox',
    '-',
    process.platform,
    '-',
    process.arch,
  ]

  if (process.platform === 'win32') {
    chatboxNameList.push('.exe')
  }
  return path.join(
    __dirname,
    chatboxNameList.join(''),
  )
}

interface TargetAddressConfig {
  [platform: string]: {
    [arch: string]: {
      [call: string]: FridaTarget,
    }
  }
}

const chatboxConfig: TargetAddressConfig = {
  linux: {
    x64: {
      mo: 0x11C9,
      mt: 0x11F4,
    },
  },
}

const targetAddressConfig = (config: TargetAddressConfig) => (call: string) => config[process.platform][process.arch][call]
const targetAddress = targetAddressConfig(chatboxConfig)

export {
  targetProgram,
  targetAddress,
}
