import { useState, forwardRef, useImperativeHandle } from "react"
import PropTypes from 'prop-types'
const Togglable = forwardRef(({ children, buttonLabel }, ref) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => setVisible(!visible)
  useImperativeHandle(
    ref,
    () => {
      return { toggleVisibility }
    }
  )
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setVisible(true)}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <div>
          <button onClick={() => setVisible(false)}>Cancelar</button>
        </div>
      </div>
    </div>
  )
})
Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}
export default Togglable