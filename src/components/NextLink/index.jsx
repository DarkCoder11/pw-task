import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useRouter } from 'next/router';

const NextLink = ({
  to,
  children,
  className,
  queryKey,
  anchorProps,
  queryValue,
  disabled,
  activeClassName,
  ...linkProps
}) => {
  const { asPath, query } = useRouter();

  const anchorClasses = classNames(className, {
    [activeClassName]: query[queryKey]
      ? query[queryKey] === queryValue
      : asPath.includes(to) && activeClassName,
  });

  return (
    <Link href={to} {...linkProps}>
      <a className={anchorClasses} {...anchorProps}>
        {children}
      </a>
    </Link>
  );
};

NextLink.propTypes = {
  children: PropTypes.any,
  disabled: PropTypes.bool,
  queryValue: PropTypes.any,
  anchorProps: PropTypes.any,
  queryKey: PropTypes.string,
  className: PropTypes.string,
  activeClassName: PropTypes.string,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

NextLink.defaultProps = {
  children: [],
  anchorProps: {},
  disabled: undefined,
  queryKey: undefined,
  className: undefined,
  queryValue: undefined,
  activeClassName: undefined,
};

export default NextLink;
