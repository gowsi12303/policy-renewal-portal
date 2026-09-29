import './Button.css'

// variant: 'primary' | 'secondary' | 'ghost'. size: 'md' | 'sm' (compact, for tables and cards).
// Other props go to the <button>. For links styled as buttons, use the same classes:
// className="btn btn--secondary btn--sm"
function Button({ variant = 'secondary', size = 'md', type = 'button', className = '', children, ...props }) {
  const sizeClass = size === 'sm' ? 'btn--sm' : ''

  return (
    <button type={type} className={`btn btn--${variant} ${sizeClass} ${className}`.trim()} {...props}>
      {children}
    </button>
  )
}

export default Button
