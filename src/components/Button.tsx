// import PropTypes from 'prop-types'
import React from 'react'
import style from './Button.module.scss'

interface Props {
  variant?: 'dark' | 'light'
  onClick: () => void
  children: string
}

const Button = ({ variant, onClick, children }: Props) => {
  const variantClass = variant === 'dark' ? 'button-dark' : 'button-light'

  return (
    <button
      className={[style.button, style[variantClass]].join(' ')}
      onClick={onClick}>
      {children}
    </button>
  )
}

// Button.propTypes = {
//   variant: PropTypes.oneOf(['dark', 'light']),
//   onClick: PropTypes.func.isRequired,
//   children: PropTypes.node.isRequired,
// }

// Button.defaultProps = {
//   variant: 'light',
// }

export default Button
