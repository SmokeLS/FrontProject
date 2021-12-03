// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Label from '../../components/Label';
import SvgIconStyle from '../../components/SvgIconStyle';

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
            children: [{ title: 'Все компании', path: PATH_DASHBOARD.user.id }]
          },
          { title: 'Мои компании', path: PATH_DASHBOARD.user.cards },
          { title: 'Новые компании', path: PATH_DASHBOARD.user.profile },
          { title: 'Архив', path: PATH_DASHBOARD.user.newUser }
        ]
      }
    ]
  },

  // APP
  // ----------------------------------------------------------------------
  {
    subheader: 'Система',
    items: [
      // MANAGEMENT : USER
      {
        title: 'Сотрудники',
        path: PATH_DASHBOARD.blog.newPost,
        icon: ICONS.user,
        children: [{ title: 'Все сотрудники', path: PATH_DASHBOARD.blog.newPost }]
      }
    ]
  }
];

export default sidebarConfig;