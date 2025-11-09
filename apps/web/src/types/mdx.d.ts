declare module '*.mdx' {
  import type { ComponentType } from 'react'
  export const frontmatter: any
  const MDXComponent: ComponentType<any>
  export default MDXComponent
}
