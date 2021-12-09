// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Label from '../../components/Label';
import SvgIconStyle from '../../components/SvgIconStyle';
import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking')
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'Основное',
    items: [
      {
        title: 'Главная',
        path: PATH_DASHBOARD.general.app,
        icon: ICONS.dashboard
      }
    ]
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'Отдел продаж',
    items: [
      // MANAGEMENT : USER
      {
        title: 'Компании',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          {
            title: 'Все компании',
            path: PATH_DASHBOARD.user.list,
            permission: false,
            children: [{ title: 'Все sd_page_all_companies', path: PATH_DASHBOARD.user.id }]
          },
          { title: 'Мои компании', permission: false, path: PATH_DASHBOARD.user.cards },
          { title: 'Новые компании', permission: false, path: PATH_DASHBOARD.user.profile },
          { title: 'Архив', permission: false, path: PATH_DASHBOARD.user.newUser }
        ]
      }
    ]
  },

  // APP
  // ----------------------------------------------------------------------
  {
    subheader: 'Сотрудники',
    items: [
      // MANAGEMENT : USER
      {
        title: 'Сотрудники',
        path: PATH_DASHBOARD.employee.root,
        icon: ICONS.user,
        children: [{ title: 'Все сотрудники', permission: true, path: PATH_DASHBOARD.employee.list }]
      }
    ]
  }
];

export default sidebarConfig;
