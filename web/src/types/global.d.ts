// Global type declarations for 5GLabX Cloud
// This file ensures all necessary types are available

declare module 'react' {
  export * from 'react'
}

declare module 'react-dom' {
  export * from 'react-dom'
}

declare module 'react-router-dom' {
  export * from 'react-router-dom'
}

declare module '@supabase/supabase-js' {
  export * from '@supabase/supabase-js'
}

declare module 'lucide-react' {
  export * from 'lucide-react'
}

declare module 'react-json-view-lite' {
  export * from 'react-json-view-lite'
}

declare module '@heroicons/react' {
  export * from '@heroicons/react'
}

// Ensure JSX is properly typed
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
}

export {}