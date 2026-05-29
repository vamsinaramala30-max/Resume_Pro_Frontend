import { forwardRef } from 'react'
import { Button } from './ui/Button'

const LoadingButton = forwardRef(function LoadingButton(
  { loading, children, className = '', disabled, type = "button", ...props },
  ref,
) {
  return (
    <Button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      isLoading={loading}
      className={className}
      {...props}
    >
      {children}
    </Button>
  )
})

export default LoadingButton
