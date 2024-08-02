declare module '*.md?raw' {
  const value: string
  export default value
}

declare module '*.svg?react' {
  const value: React.ComponentType<React.SVGProps<SVGSVGElement>>
  export default value
}
