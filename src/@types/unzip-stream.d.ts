declare module 'unzip-stream' {
  namespace unzip {
    export function Extract(opts: any): NodeJS.ReadWriteStream
    export function Parse(opts: any): NodeJS.ReadWriteStream
  }
  export = unzip
}
