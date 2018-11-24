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
import ControllerBudget from './components/Pages/Controller/ControllerBudget';
import CreateTraveller from './components/Pages/Controller/CreateTraveller';
import OnlineTravelRequestForm from './components/Pages/Traveller/OnlineTravelRequestForm';
import TravelExpenseClaim from './components/Pages/Traveller/TravelExpenseClaim';
import OnlineTravelRequestApproval from './components/Pages/Controller/OnlineTravelRequestApproval';
import CheckStatus from './components/Pages/Traveller/CheckStatus';
import TravelRequestSelectionPage from './components/Pages/Traveller/TravelRequestSelectionPage';
import TravelExpenseClaimSelectionPage from './components/Pages/Traveller/TravelExpenseClaimSelectionPage';
import TravelExpenseClaimApproval from './components/Pages/Controller/TravelExpenseClaimApproval';
import EventSelectionPage from './components/Pages/Controller/EventSelectionPage';
import OnlineTravelRequestSelectionPage from './components/Pages/Controller/OnlineTravelRequestSelectionPage';
import BudgetSelectionPage from './components/Pages/Controller/BudgetSelectionPage';
import ConfirmBudgetDetails from './components/Pages/Controller/ConfirmBudgetDetails';
import EditBudgetSelectionPage from './components/Pages/Controller/EditBudgetSelectionPage';
import EditBudgetEventSelectionPage from './components/Pages/Controller/EditBudgetEventSelectionPage';
import EditBudgetTravellerSelectionPage from './components/Pages/Controller/EditBudgetTravellerSelectionPage';
import ViewAndEditBudget from './components/Pages/Controller/ViewAndEditBudget';
import TravelStatusUpdate from './components/Pages/Controller/TravelStatusUpdate';
import TravelExpenseClaimApprovalSelectionPage from './components/Pages/Controller/TravelExpenseClaimApprovalSelectionPage';
import TravelProgramSelectionPageForTravelExpenseClaimApproval from './components/Pages/Controller/TravelProgramSelectionPageForTravelExpenseClaimApproval';
import TravellerTypeSelectionPage from './components/Pages/Controller/TravellerTypeSelectionPage';
import ViewExpenseClaimStatus from './components/Pages/Traveller/ViewExpenseClaimStatus';
import TravelExpenseClaimItemUpdatePage from './components/Pages/Traveller/TravelExpenseClaimItemUpdatePage';











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
      title: 'Travel Coordinator Dashboard',
      breadcrumb: 'Travel Coordinator Dashboard',
      breadcrumb_link: false,
      exact: true,
      component: ControllerDashboard

    },



    {
      path: '/approvedtravelplan',
      title: 'Travel Authorization Status',
      breadcrumb: 'TravelAuthStatus',
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

    {
      path: '/createBudget',
      title: 'Add Budget Items',
      breadcrumb: 'Add Budget Items',
      breadcrumb_link: false,
      exact: true,
      component: ControllerBudget

    },

    {
      path: '/createTraveller',
      title: 'Create Traveller',
      breadcrumb: 'CreateTraveller',
      breadcrumb_link: false,
      exact: true,
      component: CreateTraveller

    },

    {
      path: '/onlinetravelrequestform',
      title: 'Online Travel Request',
      breadcrumb: 'OnlineTravelRequest',
      breadcrumb_link: false,
      exact: true,
      component: OnlineTravelRequestForm

    },

    {
      path: '/travelexpenseclaim',
      title: 'Travel Expense Claim',
      breadcrumb: 'TravelExpenseClaim',
      breadcrumb_link: false,
      exact: true,
      component: TravelExpenseClaim

    },


    {
      path: '/onlinetravelrequestapproval',
      title: 'Online Travel Request Approval',
      breadcrumb: 'OnlineTravelRequestApproval',
      breadcrumb_link: false,
      exact: true,
      component: OnlineTravelRequestApproval

    },

    {
      path: '/checkStatus',
      title: 'CheckStatus',
      breadcrumb: 'CheckStatus',
      breadcrumb_link: false,
      exact: true,
      component: CheckStatus

    },

    {
      path: '/travelrequestselectionpage',
      title: 'Travel Authorization Request Page',
      breadcrumb: 'TravelRequestSelectionPage',
      breadcrumb_link: false,
      exact: true,
      component: TravelRequestSelectionPage

    },

    {
      path: '/travelexpenseclaimselectionpage',
      title: 'TravelExpenseClaimSelectionPage',
      breadcrumb: 'TravelExpenseClaimSelectionPage',
      breadcrumb_link: false,
      exact: true,
      component: TravelExpenseClaimSelectionPage

    },

    {
      path: '/travelexpenseclaimapproval',
      title: 'Travel Expense Claim Approval',
      breadcrumb: 'TravelExpenseClaimApproval',
      breadcrumb_link: false,
      exact: true,
      component: TravelExpenseClaimApproval

    },

    {
      path: '/eventSelectionPage',
      title: 'Travel Plan Selection Page',
      breadcrumb: 'EventSelectionPage',
      breadcrumb_link: false,
      exact: true,
      component: EventSelectionPage

    },
    {
      path: '/onlinetravelrequestSelectionPage',
      title: 'Online Travel Request Selection Page',
      breadcrumb: 'OnlineTravelRequestSelectionPage',
      breadcrumb_link: false,
      exact: true,
      component: OnlineTravelRequestSelectionPage

    },
    {
      path: '/budgetSelectionPage',
      title: 'Budget Selection Page',
      breadcrumb: 'BudgetSelectionPage',
      breadcrumb_link: false,
      exact: true,
      component: BudgetSelectionPage

    },
    {
      path: '/confirmBudgetDetails',
      title: 'Budget Record Creation',
      breadcrumb: 'Budget Record Creation',
      breadcrumb_link: false,
      exact: true,
      component: ConfirmBudgetDetails

    },
    {
      path: '/editBudgetSelectionPage',
      title: 'Program Selection page',
      breadcrumb: 'ProgramSelectionPage',
      breadcrumb_link: false,
      exact: true,
      component: EditBudgetSelectionPage

    },
    {
      path: '/editBudgetEventSelectionPage',
      title: 'Event Selection page',
      breadcrumb: 'EventSelectionPage',
      breadcrumb_link: false,
      exact: true,
      component: EditBudgetEventSelectionPage

    },
    {
      path: '/editBudgetTravellerSelectionPage',
      title: 'Traveller Selection page',
      breadcrumb: 'TravellerSelectionPage',
      breadcrumb_link: false,
      exact: true,
      component: EditBudgetTravellerSelectionPage

    },
    {
      path: '/viewAndEditBudget',
      title: 'Budget Editor',
      breadcrumb: 'BudgetEditor',
      breadcrumb_link: false,
      exact: true,
      component: ViewAndEditBudget

    },
    {
      path: '/travelStatusUpdate',
      title: 'Travel Status Update',
      breadcrumb: 'TravelStatusUpdate',
      breadcrumb_link: false,
      exact: true,
      component: TravelStatusUpdate

    },
    {
      path: '/travelExpenseClaimApprovalSelectionPage',
      title: 'Travel Expense Claim Approval Selection Page',
      breadcrumb: 'TravelExpenseClaimApprovalSelectionPage',
      breadcrumb_link: false,
      exact: true,
      component: TravelExpenseClaimApprovalSelectionPage

    },
    {
      path: '/travelProgramSelectionPageForTravelExpenseClaimApproval',
      title: 'Travel Program Selection Page For TravelExpenseClaimApproval',
      breadcrumb: 'TravelProgramSelectionPageForTravelExpenseClaimApproval',
      breadcrumb_link: false,
      exact: true,
      component: TravelProgramSelectionPageForTravelExpenseClaimApproval

    },
    {
      path: '/travellerTypeSelectionPage',
      title: 'Traveller Type Selection Page',
      breadcrumb: 'Traveller Type Selection Page',
      breadcrumb_link: false,
      exact: true,
      component: TravellerTypeSelectionPage

    },

    {
      path: '/viewExpenseClaimStatus',
      title: 'View Expense Claim Status',
      breadcrumb: 'View Expense Claim Status',
      breadcrumb_link: false,
      exact: true,
      component: ViewExpenseClaimStatus

    },

    {
      path: '/travelExpenseClaimItemUpdatePage',
      title: 'Travel Expense Claim Item Update Page',
      breadcrumb: 'Travel Expense Claim Item Update Page',
      breadcrumb_link: false,
      exact: true,
      component: TravelExpenseClaimItemUpdatePage

    },





];
