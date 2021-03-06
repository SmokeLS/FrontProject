// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components'
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app')
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/sd/companies'),
    profile: path(ROOTS_DASHBOARD, '/sd/companies/profile'),
    userId: path(ROOTS_DASHBOARD, '/sd/companies/all/:id'),
    userContact: path(ROOTS_DASHBOARD, '/employee/list/:id/contact/:id'),
    cards: path(ROOTS_DASHBOARD, '/sd/cards'),
    list: path(ROOTS_DASHBOARD, '/sd/companies/all'),
    newUser: path(ROOTS_DASHBOARD, '/sd/companies/add'),
    editById: path(ROOTS_DASHBOARD, `/sd/reece-chung/edit`),
    account: path(ROOTS_DASHBOARD, '/sd/account')
  },
  employees: {
    root: path(ROOTS_DASHBOARD, '/employees'),
    list: path(ROOTS_DASHBOARD, '/employees/all'),
    newEmployee: path(ROOTS_DASHBOARD, '/employees/add'),
    employeeId: path(ROOTS_DASHBOARD, '/employees/all/:id'),
    post: path(ROOTS_DASHBOARD, '/blog/post/:title'),
    postById: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
    newPost: path(ROOTS_DASHBOARD, '/blog/new-post')
  }
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
