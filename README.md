# Sidecar [![NPM](https://github.com/huan/sidecar/actions/workflows/npm.yml/badge.svg)](https://github.com/huan/sidecar/actions/workflows/npm.yml)

Sidecar is a runtime hooking tool for intercepting function calls by TypeScript annotation with ease, powered by Frida.RE.

![Frida Sidecar](docs/images/sidecar.webp)

> Image source: [1920s Raleigh Box Sidecar Outfit](https://oldbike.wordpress.com/1920s-raleigh-box-sidecar-outfit/) & [ShellterProject](https://www.shellterproject.com/)

## What is a "Sidecar" Pattern?

> Segregating the functionalities of an application into a separate process can be viewed as a Sidecar pattern. The Sidecar design pattern allows you to add a number of capabilities to your application without the need of additional configuration code for 3rd party components.
>  
> As a sidecar is attached to a motorcycle, similarly in software architecture a sidecar is attached to a parent application and extends/enhances its functionalities. A Sidecar is loosely coupled with the main application.  
>  
> &mdash; SOURCE: [Sidecar Design Pattern in your Microservices Ecosystem, Samir Behara, July 23, 2018](https://samirbehara.com/2018/07/23/sidecar-design-pattern-in-your-microservices-ecosystem/)

## Introduction

> Hook: by intercepting function calls or messages or events passed between software components.  
> &mdash; SOURCE: [Hooking, Wikipedia](https://en.wikipedia.org/wiki/Hooking)

## Install

```sh
npm install sidecar
```

## Usage

```ts
import {
  Sidecar,
  HookCall,
  Hook,
  Replace
}                       from 'sidecar'

@Sidecar('factorial-daemon')
class ProcessSideCar {
  @Func(0x33444) reset (): void
  @Hook 
}

```

## Example

```ts
// tbw
```

## Related project: FFI Adapter

I have another NPM module named [ffi-adapter](https://github.com/huan/ffi-adapter), which is a Foreign Function Interface Adapter Powered by Decorator & TypeScript.

```ts
import {
  LIBRARY,
  API,
  RETURN,
}             from 'ffi-adapter'

@LIBRARY('./libfactorial')
export class LibFactorial {
  @API() factorial (n: number): number { return RETURN(n) }
}

const lib = new LibFactorial()
console.log('factorial(5) =', lib.factorial(5))
// Output: factorial(5) = 120
```

See examples at <https://github.com/huan/ffi-adapter/tree/master/tests/fixtures/library>

## Resources

### Papers

1. [Assembly to Open Source Code Matching for Reverse Engineering and Malware Analysis](https://pdfs.semanticscholar.org/00d8/9af14d1632499636917613a27edac5cf5005.pdf)

### Dll

1. [Wikipedia: DLL injection](https://en.wikipedia.org/wiki/DLL_injection)
1. [Code Tutorial: InjectDLL](http://www.quantumg.net/injectdll.php)

### Frida

1. TypeScript - [Frida环境搭建 - windows (给IDE提供智能感知/提示)](https://bbs.pediy.com/thread-254086.htm)
1. TypeScript - [Example - Frida agent written in TypeScript](https://github.com/oleavr/frida-agent-example)
1. Talk Video - [Prototyping And Reverse Engineering With Frida by Jay Harris](https://www.youtube.com/watch?v=cLUl_jK59EM)
1. Talk Video - [r2con 2017 - Intro to Frida and Dynamic Machine Code Transformations by Ole Andre](https://www.youtube.com/watch?v=sBcLPLtqGYU)
1. [Hand-crafted Frida examples](https://github.com/iddoeldor/frida-snippets)
1. Slide - [基于 FRIDA 的全平台逆向分析 - caisi.zz@alipay.com](https://www.slideshare.net/ssusercf6665/frida-107244825) ([GitHub repo](https://github.com/ChiChou/gossip-summer-school-2018/blob/master/ios-macOS-fake-location/fake.js))
1. [Awesome Frida](https://github.com/dweinstein/awesome-frida)
1. [How to call methods in Frida Gadget (JavaScript API iOS)](https://github.com/frida/frida/issues/567)
1. [Frida调用栈符号恢复](http://4ch12dy.site/2019/07/02/xia0CallStackSymbols/xia0CallStackSymbols/)

### Assembler

- [Online x86 / x64 Assembler and Disassembler](https://defuse.ca/online-x86-assembler.htm) (`0xf` is not valid, use `0x0f` instead)
- [易语言汇编代码转置入代码开源](https://www.eyuyan.la/post/15447.html)
- [The 32 bit x86 C Calling Convention](https://aaronbloomfield.github.io/pdr/book/x86-32bit-ccc-chapter.pdf)

### iOS

- [iOS逆向分析笔记](https://www.jianshu.com/p/157f56d60a59)
- [iOS — To swizzle or not to swizzle?](https://medium.com/rocknnull/ios-to-swizzle-or-not-to-swizzle-f8b0ed4a1ce6)

### Objective C

- [Objective-C // Runtime Method Injection](http://labs.distriqt.com/post/846)

## History

### Master

### 0.0.1 (Jun 13, 2021)

Init version.

## Author

[Huan LI](https://github.com/huan) ([李卓桓](http://linkedin.com/in/zixia)), [Microsoft Regional Director](https://rd.microsoft.com/en-us/huan-li), zixia@zixia.net

[![Profile of Huan LI (李卓桓) on StackOverflow](https://stackexchange.com/users/flair/265499.png)](https://stackexchange.com/users/265499)

## Copyright & License

- Docs released under Creative Commons
- Code released under the Apache-2.0 License
- Code & Docs © 2018 Huan LI \<zixia@zixia.net\>
