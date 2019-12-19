import React from 'react';
import cn from 'classnames';
import Link from 'common/Link';

import styles from './Button.module.css';

const Button = ({ children, className, isLink, ...props }) => {
  if (isLink) {
    return (
      <Link {...props} className={cn(styles.Button, className)}>
        {children}
      </Link>
    );
  }
  return (
    <button {...props} className={cn(styles.Button, className)}>
      {children}
    </button>
  );
};

export default Button;
