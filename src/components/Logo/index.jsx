import React from 'react';
import Link from 'next/link';
import { paths } from '../../routes';

const Logo = () => (
  <div className="layout-logo">
    <Link href={paths.home}>
      <a>
        <img src="/img/pw-logo.svg" alt="logo" />
      </a>
    </Link>
  </div>
);

export default Logo;
