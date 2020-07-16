import { withProps } from 'recompose';
import shortid from 'shortid';
import Sidebar from './Sidebar';

const SidebarContainer = withProps({
  sidebarItems: [
    {
      id: shortid.generate(),
      to: '/login',
      isPrivate: false,
      content: 'Login',
    },
    {
      id: shortid.generate(),
      to: '/register',
      isPrivate: false,
      content: 'Register',
    },
    {
      id: shortid.generate(),
      to: '/profile',
      content: 'Profile',
      isPrivate: true,
    },
    {
      id: shortid.generate(),
      to: '/create-transaction',
      content: 'Create transaction',
      isPrivate: true,
    },
  ],
})(Sidebar);

export default SidebarContainer;
