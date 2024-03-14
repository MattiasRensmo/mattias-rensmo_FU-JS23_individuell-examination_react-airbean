import style from './Button.module.scss'

interface Props {
  variant?: 'dark' | 'light'
  onClick: () => void
  children: string
  disabled?: boolean
}

const Button = ({ variant, onClick, children, disabled = false }: Props) => {
  const variantClass = variant === 'dark' ? 'button-dark' : 'button-light'

  return (
    <button
      style={{
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      className={[style.button, style[variantClass]].join(' ')}
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
