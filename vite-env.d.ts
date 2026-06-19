declare module '*.md?raw' {
  const value: string
  export default value
}

declare module '*.svg' {
  const content: string
  export default content
}
