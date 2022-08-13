import { RiDashboardLine } from 'react-icons/ri'
import { MdOutlineCases } from 'react-icons/md'
import { GoIssueClosed } from 'react-icons/go'
import { MdOutlineLogout } from 'react-icons/md'
import { MdOutlinePeopleAlt } from 'react-icons/md'

const menuItems = [
  {
    id: '1',
    title: 'Dashboard',
    path: '/',
    icon: <RiDashboardLine />,
    className: 'item',
  },

  {
    id: '2',
    title: 'Agents',
    path: '/agents',
    icon: <MdOutlinePeopleAlt />,
    className: 'item',
  },

  {
    id: '3',
    title: 'Case Management',
    path: '/cases',
    icon: <MdOutlineCases />,
    className: 'item',
  },

  {
    id: '4',
    title: 'Closed Cases',
    path: '/clcases',
    icon: <GoIssueClosed />,
    className: 'item',
  },

  {
    id: '5',
    title: 'Logout',
    path: '/logout',
    icon: <MdOutlineLogout />,
    className: 'item',
  },
]

export default menuItems
