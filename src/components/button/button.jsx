import PropTypes from 'prop-types';
import './button.scss';
import cn from 'classnames';

export function Button({ children, primary, secondary, disabled, onClick }) {
  const _className = cn('button', {
    'button__primary': primary,
    'button__secondary': secondary,
    'button__disabled': disabled
  });
  
  return (
    <button className={_className} 
      type="button"
        onClick={onClick}
        disabled={disabled}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

Button.defaultProps = {
  primary: true,
  secondary: false,
  disabled: false,
  onClick: () => {}
};

