import Contacts from './components/Pages/Contacts';
import Dashboard from './components/Pages/Dashboard';
import Headquarters from './components/Pages/Headquarters';
import Icons from './components/Pages/Icons';
import Login from './components/Pages/Login';
import Invoice from './components/Pages/Invoice';
import Tasks from './components/Pages/Tasks';
import Past from './components/Pages/Past';
import Votes from './components/Pages/Votes';
import Forms from './components/Pages/Forms';
import Contact from './components/Pages/Contact';
import Faq from './components/Pages/Faq';
import Forgot from './components/Pages/Forgot';
import Register from './components/Pages/Register';
import Decision from './components/Pages/DecisionPage';
import login from './components/Pages/Login';
import Authorization from './components/Pages/Controller/Authorization';
import Event from './components/Pages/Controller/Event';
import Invoices from './components/Pages/Controller/Invoicing';
import TravelPlan from './components/Pages/Controller/TravelPlan';
import ControllerDashboard from './components/Pages/Controller/ControllerDashboard';
import TravelPlanExplorer from './components/Pages/Controller/TravelPlanViewer';
import ApprovedTravelPlan from './components/Pages/Traveller/ApprovedTravelPlan';
import FormSubmission from './components/Pages/Traveller/FormSubmission';
import TravelTracker from './components/Pages/Traveller/TravelTracker';
import TravellerDashboard from './components/Pages/Traveller/TravellerDashboard';
import LandingPage from './components/Pages/LandingPage';
import TravellerLoginPage from './components/Pages/Traveller/TravellerLoginPage';
import ControllerLoginPage from './components/Pages/Controller/ControllerLoginPage';
import AddTraveller from './components/Pages/Controller/AddTraveller';





export const routes = [


  {
    path: '/',
    title: 'LandingPage',
    breadcrumb: 'LandingPage',
    breadcrumb_link: false,
    exact: true,
    component: LandingPage

  },

    {
      path: '/login',
      title: 'Login',
      breadcrumb:'Login',
      breadcrumb_link: true,
      exact: true,
      component: Login,

    },

    {
        path: '/Dashboard',
        title: 'Dashboard',
        breadcrumb: 'Dashboard',
        breadcrumb_link: true,
        exact: true,
        component: Dashboard,
    },
    {
        path: '/headquarters',
        title: 'Headquarters',
        breadcrumb: 'Headquarters',
        breadcrumb_link: true,
        exact: true,
        component: Headquarters,
    },
    {
        path: '/contacts',
        title: 'Contacts Management',
        breadcrumb: 'Contacts',
        breadcrumb_link: true,
        exact: true,
        component: Contacts
    },
    {
        path: '/invoice',
        title: 'Invoice',
        breadcrumb: 'Invoice',
        breadcrumb_link: false,
        exact: true,
        component: Invoice
    },
    {
        path: '/tasks',
        title: 'Tasks',
        breadcrumb: 'Task',
        breadcrumb_link: false,
        exact: true,
        component: Tasks
    },
    {
        path: '/past',
        title: 'Past',
        breadcrumb: 'Past',
        breadcrumb_link: false,
        exact: true,
        component: Past
    },
    {
        path: '/forms',
        title: 'Forms',
        breadcrumb: 'Forms',
        breadcrumb_link: false,
        exact: true,
        component: Forms
    },
    {
        path: '/icons',
        title: 'Icons',
        breadcrumb: 'Icons',
        breadcrumb_link: false,
        exact: true,
        component: Icons
    },
    {
        path: '/votes',
        title: 'Upcoming Votes',
        breadcrumb: 'Upcoming Votes',
        breadcrumb_link: false,
        exact: true,
        component: Votes
    },
    {
        path: '/login',
        title: 'Login',
        breadcrumb: 'Login',
        breadcrumb_link: false,
        exact: true,
        component: Login
    },
    {
        path: '/faq',
        title: 'FAQ',
        breadcrumb: 'FAQ',
        breadcrumb_link: false,
        exact: true,
        component: Faq
    },
    {
        path: '/contact',
        title: 'Contact',
        breadcrumb: 'Contact',
        breadcrumb_link: false,
        exact: true,
        component: Contact
    },
    {
        path: '/forgot',
        title: 'Forgot',
        breadcrumb: 'Forgot',
        breadcrumb_link: false,
        exact: true,
        component: Forgot
    },
    {
        path: '/register',
        title: 'Register',
        breadcrumb: 'Register',
        breadcrumb_link: false,
        exact: true,
        component: Register
    },

    {
      path: '/decisionPage',
      title: 'Decision',
      breadcrumb: 'Decision',
      breadcrumb_link: false,
      exact: true,
      component: Decision

    },

    {
      path: '/authorization',
      title: 'Authorization',
      breadcrumb: 'Authorization',
      breadcrumb_link: false,
      exact: true,
      component: Authorization

    },
    {
      path: '/event',
      title: 'Event',
      breadcrumb: 'Event',
      breadcrumb_link: false,
      exact: true,
      component: Event

    },

    {
      path: '/invoicing',
      title: 'Invoices',
      breadcrumb: 'Invoices',
      breadcrumb_link: false,
      exact: true,
      component: Invoices

    },

    {
      path: '/travelplan',
      title: 'TravelPlan',
      breadcrumb: 'TravelPlan',
      breadcrumb_link: false,
      exact: true,
      component: TravelPlan

    },


    {
      path: '/travelplanviewer',
      title: 'TravelPlanExplorer',
      breadcrumb: 'TravelPlanExplorer',
      breadcrumb_link: false,
      exact: true,
      component: TravelPlanExplorer

    },


    {
      path: '/controllerDashboard',
      title: 'ControllerDashboard',
      breadcrumb: 'ControllerDashboard',
      breadcrumb_link: false,
      exact: true,
      component: ControllerDashboard

    },



    {
      path: '/approvedtravelplan',
      title: 'ApprovedTravelPlan',
      breadcrumb: 'ApprovedTravelPlan',
      breadcrumb_link: false,
      exact: true,
      component: ApprovedTravelPlan

    },

    {
      path: '/formsubmission',
      title: 'FormSubmission',
      breadcrumb: 'FormSubmission',
      breadcrumb_link: false,
      exact: true,
      component: FormSubmission

    },

    {
      path: '/travellerdashboard',
      title: 'TravellerDashboard',
      breadcrumb: 'TravellerDashboard',
      breadcrumb_link: false,
      exact: true,
      component: TravellerDashboard

    },

    {
      path: '/traveltracker',
      title: 'TravelTracker',
      breadcrumb: 'TravelTracker',
      breadcrumb_link: false,
      exact: true,
      component: TravelTracker

    },

    {
      path: '/travellerloginpage',
      title: 'TravellerLoginPage',
      breadcrumb: 'TravellerLoginPage',
      breadcrumb_link: false,
      exact: true,
      component: TravellerLoginPage

    },

    {
      path: '/controllerloginpage',
      title: 'ControllerLoginPage',
      breadcrumb: 'ControllerLoginPage',
      breadcrumb_link: false,
      exact: true,
      component: ControllerLoginPage

    },

    {
      path: '/addTraveller',
      title: 'AddTraveller',
      breadcrumb: 'AddTraveller',
      breadcrumb_link: false,
      exact: true,
      component: AddTraveller

    },



];
