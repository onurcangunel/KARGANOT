'use client'

import * as React from 'react'

interface RadioGroupContextValue {
  value: string
  setValue: (v: string) => void
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null)

export function RadioGroup({ value, onValueChange, children }: { value: string; onValueChange: (v: string) => void; children: React.ReactNode }) {
  const [val, setVal] = React.useState(value)
  React.useEffect(() => setVal(value), [value])
  const ctx = React.useMemo(() => ({ value: val, setValue: onValueChange }), [val, onValueChange])
  return <RadioGroupContext.Provider value={ctx}>{children}</RadioGroupContext.Provider>
}

export function RadioGroupItem({ value, id }: { value: string; id?: string }) {
  const ctx = React.useContext(RadioGroupContext)
  if (!ctx) return null
  const checked = ctx.value === value
  return (
    <input
      type="radio"
      id={id}
      className="h-4 w-4 text-primary focus:ring-primary"
      checked={checked}
      onChange={() => ctx.setValue(value)}
    />
  )
}
