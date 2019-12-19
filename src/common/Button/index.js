import React from 'react';
import cn from 'classnames';

import styles from './Button.module.css';

const Button = ({ children, className, ...props }) => {
  return (
    <button {...props} className={cn(styles.Button, className)}>
      {children}
    </button>
  );
};

export default Button;
