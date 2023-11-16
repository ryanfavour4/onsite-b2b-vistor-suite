import avatar from "./assets/defaultAvatar.png";

export const pieChartsData = [
  {
    title: "visitors by schedule",
    data: [
      { label: "Scheduled", value: 100 },
      { label: "Unscheduled", value: 0 },
    ],
  },
  {
    title: "visitors by type",
    data: [
      { label: "New visitors", value: 98 },
      { label: "Returning visitors", value: 2 },
    ],
  },
];

export const barChartsData = [
  {
    title: "Monthly visitors",
    data: [
      { label: ["Scheduled", "Unscheduled"], value: [0, 18], month: "Jan" },
      { label: ["Scheduled", "Unscheduled"], value: [0, 7], month: "Feb" },
      { label: ["Scheduled", "Unscheduled"], value: [0, 19], month: "March" },
      { label: ["Scheduled", "Unscheduled"], value: [0, 8], month: "April" },
      { label: ["Scheduled", "Unscheduled"], value: [0, 0], month: "May" },
      { label: ["Scheduled", "Unscheduled"], value: [0, 0], month: "June" },
      { label: ["Scheduled", "Unscheduled"], value: [0, 0], month: "July" },
    ],
  },
  {
    title: "last month",
    data: [
      { label: ["Scheduled", "Unscheduled"], value: [0, 0], month: "Jan" },
      { label: ["Scheduled", "Unscheduled"], value: [0, 0], month: "Feb" },
      { label: ["Scheduled", "Unscheduled"], value: [0, 0], month: "March" },
      { label: ["Scheduled", "Unscheduled"], value: [0, 0], month: "April" },
      { label: ["Scheduled", "Unscheduled"], value: [0, 0], month: "May" },
      { label: ["Scheduled", "Unscheduled"], value: [0, 0], month: "June" },
      { label: ["Scheduled", "Unscheduled"], value: [0, 0], month: "July" },
    ],
  },
];

export const blacklistData = {
  headings: [
    "name",
    "phoneNumber",
    "email",
    "company",
    "lastVisitDate",
    "action",
  ],
  data: [
    {
      name: "wahab",
      phoneNumber: "08060127619",
      email: "sakawahab03@gmail.com",
      company: "carrotsuite",
      lastVisitDate: "yesterday",
      action: "nothing",
    },
    {
      name: "carrot",
      phoneNumber: "08012993499",
      email: "carrot@gmail.com",
      company: "carrotsuite",
      lastVisitDate: "yesterday",
      action: "nothing",
    },
    {
      name: "suite",
      phoneNumber: "09012994499",
      email: "suite@gmail.com",
      company: "carrotsuite",
      lastVisitDate: "yesterday",
      action: "nothing",
    },
  ],
};

export const visitorsData = {
  headings: [
    "name",
    "phoneNumber",
    "email",
    "companyName",
    "address",
    "status",
    "action",
  ],
  data: [
    {
      name: "wahab",
      phoneNumber: "08060127619",
      email: "sakawahab03@gmail.com",
      companyName: "carrotsuite",
      address: "carrotsuite",
      status: "yesterday",
      action: "nothing",
    },
    {
      name: "wahab",
      phoneNumber: "08060127619",
      email: "sakawahab03@gmail.com",
      companyName: "carrotsuite",
      address: "carrotsuite",
      status: "yesterday",
      action: "nothing",
    },
    {
      name: "wahab",
      phoneNumber: "08060127619",
      email: "sakawahab03@gmail.com",
      companyName: "carrotsuite",
      address: "carrotsuite",
      status: "yesterday",
      action: "nothing",
    },
    {
      name: "wahab",
      phoneNumber: "08060127619",
      email: "sakawahab03@gmail.com",
      companyName: "carrotsuite",
      address: "carrotsuite",
      status: "yesterday",
      action: "nothing",
    },
  ],
};

export const staffsData = [
  {
    id: "AAA-111",
    img: avatar,
    name: "lorem ipsum",
    availability: "out",
    title: "Head of support",
    phoneNumber: "09010293847",
    email: "mailmail@mail.com",
    department: "support",
  },
  {
    id: "BBB-222",
    img: avatar,
    name: "dolor ipsum",
    availability: "in",
    title: "Head accountant",
    phoneNumber: "09010293800",
    email: "mailmail@accountex.com",
    department: "support",
  },
  {
    id: "CCC-333",
    img: avatar,
    name: "sit amet",
    availability: "out",
    title: "Head of support",
    phoneNumber: "09033293847",
    email: "amet@mail.com",
    department: "construction",
  },
  {
    id: "DDD-444",
    img: avatar,
    name: "mark dave",
    availability: "out",
    title: "Head of audit",
    phoneNumber: "09010333847",
    email: "mailmail@me.com",
    department: "support",
  },
  {
    id: "EEE-555",
    img: avatar,
    name: "elon musk",
    availability: "in",
    title: "Team lead",
    phoneNumber: "09010003847",
    email: "mailmail@musk.com",
    department: "support",
  },
  {
    id: "FFF-666",
    img: avatar,
    name: "jack dorsey",
    availability: "out",
    title: "Head of tech",
    phoneNumber: "09010293811",
    email: "mail@dorsey.com",
    department: "support",
  },
];

export const subscriptionsData = {
  headings: [
    "companyName",
    "phone",
    "email",
    "useCase",
    "lastSubscriptionDate",
    "currentPlan",
    "thisMonthNumberOfVisitors",
    "nextRenewalDate",
    "renewalAmount",
    "currentLifeSpan",
    "action",
  ],
  data: [
    {
      companyName: "fdgfg",
      phone: "64565",
      email: "gfgfg@msol.com",
      useCase: "fdsf",
      lastSubscriptionDate: "cdfdf",
      currentPlan: "currentPlan",
      thisMonthNumberOfVisitors: "dfdfd",
      nextRenewalDate: "dfdf",
      renewalAmount: "fdfd",
      currentLifeSpan: "dff",
      action: "dfdf",
    },
    {
      companyName: "fdgfg",
      phone: "64565",
      email: "gfgfg@msol.com",
      useCase: "fdsf",
      lastSubscriptionDate: "cdfdf",
      currentPlan: "currentPlan",
      thisMonthNumberOfVisitors: "dfdfd",
      nextRenewalDate: "dfdf",
      renewalAmount: "fdfd",
      currentLifeSpan: "dff",
      action: "dfdf",
    },
    {
      companyName: "fdgfg",
      phone: "64565",
      email: "gfgfg@msol.com",
      useCase: "fdsf",
      lastSubscriptionDate: "cdfdf",
      currentPlan: "currentPlan",
      thisMonthNumberOfVisitors: "dfdfd",
      nextRenewalDate: "dfdf",
      renewalAmount: "fdfd",
      currentLifeSpan: "dff",
      action: "dfdf",
    },
    {
      companyName: "fdgfg",
      phone: "64565",
      email: "gfgfg@msol.com",
      useCase: "fdsf",
      lastSubscriptionDate: "cdfdf",
      currentPlan: "currentPlan",
      thisMonthNumberOfVisitors: "dfdfd",
      nextRenewalDate: "dfdf",
      renewalAmount: "fdfd",
      currentLifeSpan: "dff",
      action: "dfdf",
    },
  ],
};

export const companiesData = {
  headings: [
    "signupDate",
    "companyName",
    "email",
    "country",
    "useCase",
    "currentPlan",
    "noOfStaffs",
    "noOfVisitors",
    "lastSeen",
    "status",
    "action",
  ],
  data: [
    {
      signupDate: "4334",
      companyName: "carrotsuite",
      email: "sakawahab03@gmail.com",
      country: "carrotsuite",
      useCase: "dffdf",
      currentPlan: "fdff",
      noOfStaffs: "nothing",
      noOfVisitors: "fd",
      lastSeen: "nothing",
      status: "nothfing",
      action: "fdfdfd",
    },
    {
      signupDate: "sdf",
      companyName: "dfdfdsfd",
      email: "sakawahab03@gmail.com",
      country: "carrotsuite",
      useCase: "yesterday",
      currentPlan: "df",
      noOfStaffs: "nothing",
      noOfVisitors: "dfddd",
      lastSeen: "nothing",
      status: "df",
      action: "fdff",
    },
    {
      signupDate: "dfsdf",
      companyName: "dfdsfdfdf",
      email: "sakawafdfhab03@gmail.com",
      country: "carrotdfssuite",
      useCase: "yesterday",
      currentPlan: "dfd",
      noOfStaffs: "dfd",
      noOfVisitors: "nothing",
      lastSeen: "sdfd",
      status: "nothing",
      action: "df",
    },
    {
      signupDate: "ffdfd",
      companyName: "dggfgfgfg",
      email: "dfd@fd.com",
      country: "df",
      useCase: "yesterday",
      currentPlan: "dfdf",
      noOfStaffs: "nothing",
      noOfVisitors: "notdfdhing",
      lastSeen: "nothing",
      status: "nothing",
      action: "df",
    },
  ],
};

// const [data, setData] = useState([]);

// useEffect(() => {
//   const fetchData = async () => {
//     Api.get("/visitors/invitee/invitee-list").then((res) => {
//       console.log(res);
//     });
//   };
// }, []);

export const visitationHistoryData = {
  headings: [
    "date",
    "visitorName",
    "email",
    "phoneNumber",
    "purposeOfVisit",
    "signIn",
    "signOut",
    "durationOfStay",
  ],
  data: [
    {
      date: "Tues, 13th December 2022",
      visitorName: "suite",
      email: "lorem@ipsum.com",
      phoneNumber: "08012901209",
      purposeOfVisit: "sit amet sit",
      signIn: "carrotsuite",
      signOut: "dffdf",
      signOut: "fdff",
      durationOfStay: "2 hours",
    },
    {
      date: "Tues, 13th December 2022",
      visitorName: "carrot",
      email: "lorem@ipsum.com",
      phoneNumber: "08012901209",
      purposeOfVisit: "dolor dolor",
      signIn: "carrotsuite",
      signOut: "dffdf",
      signOut: "fdff",
      durationOfStay: "2 hours",
    },
    {
      date: "Tues, 13th December 2022",
      visitorName: "carite",
      email: "lorem@ipsum.com",
      phoneNumber: "08012901209",
      purposeOfVisit: "lorem dolor",
      signIn: "carrotsuite",
      signOut: "dffdf",
      signOut: "fdff",
      durationOfStay: "2 hours",
    },
  ],
};

export const checkInFieldsData = {
  headings: ["fieldName", "label", "type", "status", "action"],
  data: [
    {
      fieldName: "name",
      label: "your name",
      type: "short text",
      status: ["active", "Default", "Compulsory"],
      action: "dffdf",
    },
    {
      fieldName: "phone",
      label: "your phone number",
      type: "text",
      status: ["active", "Default", "Compulsory"],
      action: "dffdf",
    },
    {
      fieldName: "email",
      label: "Email Address",
      type: "email",
      status: ["active", "Default", "Compulsory"],
      action: "action",
    },
    {
      fieldName: "address",
      label: "house address",
      type: "text",
      status: ["active", "Default", "Optional"],
      action: "action",
    },
  ],
};

export const messagingData = {
  headings: [
    "purposeName",
    "purposeLabel",
    "purposeType",
    "isDefault",
    "isEnabled",
    "action",
  ],
  data: [
    {
      purposeName: "client",
      purposeLabel: "client",
      purposeType: "",
      isDefault: "YES",
      isEnabled: "YES",
      action: "",
    },
    {
      purposeName: "client",
      purposeLabel: "client",
      purposeType: "",
      isDefault: "YES",
      isEnabled: "YES",
      action: "",
    },
    {
      purposeName: "client",
      purposeLabel: "client",
      purposeType: "",
      isDefault: "YES",
      isEnabled: "YES",
      action: "",
    },
    {
      purposeName: "client",
      purposeLabel: "client",
      purposeType: "",
      isDefault: "YES",
      isEnabled: "YES",
      action: "",
    },
    {
      purposeName: "client",
      purposeLabel: "client",
      purposeType: "",
      isDefault: "YES",
      isEnabled: "YES",
      action: "",
    },
    {
      purposeName: "client",
      purposeLabel: "client",
      purposeType: "",
      isDefault: "YES",
      isEnabled: "YES",
      action: "",
    },
    {
      purposeName: "client",
      purposeLabel: "client",
      purposeType: "",
      isDefault: "YES",
      isEnabled: "YES",
      action: "",
    },
  ],
};

export const branchFieldsData = {
  headings: [
    "branchId",
    "nameOfBranch",
    "branchAddress",
    "country",
    "branchAdmin",
    "action",
  ],
  data: [
    {
      branchId: "4fsdf4",
      nameOfBranch: "fdsddf",
      branchAddress: "fsdf sfdfa afvf",
      country: "fdfs",
      branchAdmin: "ghgh",
      action: "",
    },
    {
      branchId: "4fsdf4",
      nameOfBranch: "fdsddf",
      branchAddress: "fsdf sfdfa afvf",
      country: "fdfs",
      branchAdmin: "ghgh",
      action: "",
    },
    {
      branchId: "4fsdf4",
      nameOfBranch: "fdsddf",
      branchAddress: "fsdf sfdfa afvf",
      country: "fdfs",
      branchAdmin: "ghgh",
      action: "",
    },
    {
      branchId: "4fsdf4",
      nameOfBranch: "fdsddf",
      branchAddress: "fsdf sfdfa afvf",
      country: "fdfs",
      branchAdmin: "ghgh",
      action: "",
    },
  ],
};

export const entranceFieldsData = {
  headings: ["branchName", "entranceName", "action"],
  data: [
    {
      branchName: "4fsdf4",
      entranceName: "fdsddf",
      action: "fsdf sfdfa afvf",
    },
    {
      branchName: "4fsdf4",
      entranceName: "fdsddf",
      action: "fsdf sfdfa afvf",
    },
    {
      branchName: "4fsdf4",
      entranceName: "fdsddf",
      action: "fsdf sfdfa afvf",
    },
    {
      branchName: "4fsdf4",
      entranceName: "fdsddf",
      action: "fsdf sfdfa afvf",
    },
  ],
};

export const rolesData = {
  headings: ["roleName", "roleDescription", "action"],
  data: [
    {
      roleName: "EMPLOYEE",
      roleDescription: "EMPLOYEE",
      action: "nothing",
    },
    {
      roleName: "BILLING_ADMIN",
      roleDescription: "BILLING_ADMIN",
      action: "nothing",
    },
    {
      roleName: "dfujf",
      roleDescription: "dsfdd",
      action: "nothing",
    },
    {
      roleName: "dfujf",
      roleDescription: "dsfdd",
      action: "nothing",
    },
    {
      roleName: "dfujf",
      roleDescription: "dsfdd",
      action: "nothing",
    },
    {
      roleName: "HEAD_OF_STATE",
      roleDescription: "Makes Decisions",
      action: "nothing",
    },
  ],
};

export const billingHistoryData = {
  headings: [
    "planName",
    "amount",
    "period",
    "status",
    "startDate",
    "endDate",
    "action",
  ],
  data: [
    {
      planName: "lorem",
      amount: "#7552",
      period: "2 years",
      status: "active",
      startDate: "Tues, 13th December 2022",
      endDate: "Tues, 13th December 2022",
      action: "",
    },
    {
      planName: "lorem",
      amount: "#15000",
      period: "4 years",
      status: "active",
      startDate: "Tues, 13th December 2022",
      endDate: "Tues, 13th December 2022",
      action: "",
    },
    {
      planName: "ipsum",
      amount: "#7552",
      period: "2 years",
      status: "active",
      startDate: "Tues, 13th December 2022",
      endDate: "Tues, 13th December 2022",
      action: "",
    },
    {
      planName: "lorem",
      amount: "#7552",
      period: "2 years",
      status: "active",
      startDate: "Tues, 13th December 2022",
      endDate: "Tues, 13th December 2022",
      action: "",
    },
  ],
};

export const integrationsCardData = [
  {
    title: "paystack",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptae vero eum eius quod veritatis odio, nemo nesciunt! Possimus, inventore aut rerum perferendis neque iusto vero a",
    status: "active",
  },
  {
    title: "mailchimp",
    description:
      "Lorem ipsum dolor sit amet consectetur iente doloremque ab laboriosam est iusto, volupta, nemo nesciunt! Possimus, inventore aut rerum perferendis neque iusto vero a",
    status: "inactive",
  },
];

export const attendanceHistory = {
  headings: ["date", "signIn", "signOut"],
  data: [
    {
      date: "Tues, 13th December 2022",
      signIn: "sign in",
      signOut: "4uidf",
    },
    {
      date: "Tues, 13th December 2022",
      signIn: "sign in",
      signOut: "4uidf",
    },
    {
      date: "Tues, 13th December 2022",
      signIn: "sign in",
      signOut: "4uidf",
    },
  ],
};

export const listEventsData = {
  headings: ["eventName", "eventId", "eventDate", "location", "action"],
  data: [
    {
      eventName: "evennttt",
      eventId: "238rbui",
      eventDate: "Tues, 13th December 2022",
      location: "lagos",
      action: "",
    },
    {
      eventName: "evennttt",
      eventId: "238rbui",
      eventDate: "Tues, 13th December 2022",
      location: "lagos",
      action: "",
    },
    {
      eventName: "evennttt",
      eventId: "238rbui",
      eventDate: "Tues, 13th December 2022",
      location: "lagos",
      action: "",
    },
  ],
};

export const listAttendeesData = {
  headings: [
    "name",
    "phone",
    "email",
    "registrationDate",
    "registrationId",
    "signIn",
    "action",
  ],
  data: [
    {
      name: "lorem",
      phone: "09023905393",
      email: "mail@mail.com",
      registrationDate: "Tues, 13th December 2022",
      registrationId: "dsjkfi4",
      signIn: "sign in",
      action: "",
    },
    {
      name: "lorem",
      phone: "09023905393",
      email: "mail@mail.com",
      registrationDate: "Tues, 13th December 2022",
      registrationId: "dsjkfi4",
      signIn: "sign in",
      action: "",
    },
    {
      name: "lorem",
      phone: "09023905393",
      email: "mail@mail.com",
      registrationDate: "Tues, 13th December 2022",
      registrationId: "dsjkfi4",
      signIn: "sign in",
      action: "",
    },
  ],
};

export const notificationData = [
  {
    id: "233e",
    title: "Enjoy using the app?",
    description: "description about the notification",
    time: "now",
  },
  {
    id: "sdfsdf",
    title: "Enjoy using the app?",
    description: "description about the notification",
    time: "now",
  },
  {
    id: "uisnf",
    title: "Enjoy using the app?",
    description: "description about the notification",
    time: "now",
  },
];

export const departmentData = {
  headings: ["name", "action"],
  data: [
    { name: "Support", action: "" },
    { name: "Development", action: "" },
    { name: "Accounting", action: "" },
    { name: "Lorem", action: "" },
    { name: "Ipsum", action: "" },
  ],
};

export const positionData = {
  headings: ["name", "action"],
  data: [
    { name: "Head of support", action: "" },
    { name: "Developer", action: "" },
    { name: "Accountant", action: "" },
    { name: "Lorem", action: "" },
    { name: "Ipsum", action: "" },
  ],
};

export const exhibitionData = {
  headings: ["fieldName", "required", "isEnabled", "action"],
  data: [
    {
      fieldName: "lorem",
      required: "YES",
      isEnabled: "YES",
      action: "",
    },
    {
      fieldName: "lorem",
      required: "YES",
      isEnabled: "YES",
      action: "",
    },
    {
      fieldName: "lorem",
      required: "YES",
      isEnabled: "YES",
      action: "",
    },
    {
      fieldName: "lorem",
      required: "YES",
      isEnabled: "YES",
      action: "",
    },
  ],
};

export const briefBillingData = [
  {
    name: "Free Plan",
    description: "The quickest and easiest way to try Slack",
    priceNaira: 0,
    priceUsd: 0,
    url: "/checkoutpage/free",
    highlights: {
      heading: "",
      body: [
        "Max. of 5 staff",
        "Schedule appointments",
        "Email notification to host",
        "Company appointment link",
        "25 visitors per day maximum",
      ],
    },
  },
  {
    name: "Basic Plan",
    description: "More power for small teams who want better collaboration",
    priceNaira: 10000,
    priceUsd: 20,
    url: "/checkoutpage/basic",
    highlights: {
      heading: "All the benefits of Free, and:",
      body: [
        "Max of 50 staff",
        "Schedule appointments",
        "Email notification",
        "Blacklist management",
        "Unlimited visitors",
        "Export visitor list",
        "Produce list of expected visitors",
        "Manage 1 Event Per month",
        "Customize visitor Welcome email",
        "Check out notifications",
        "Contactless check In",
        "Staff attendance management",
      ],
    },
  },
  {
    name: "Premium Plan",
    description:
      "Scale your business, increase productivity, and keep your teams connected",
    priceNaira: 25000,
    priceUsd: 50,
    url: "/checkoutpage/premium",
    highlights: {
      heading: "All the goodness of Basic, and:",
      body: [
        "Unlimited staff",
        "Customize App color, app home page",
        "Enable/Disable Appointment only mode",
        "Add Custom fields to visitor check in form",
        "Display custom message after visitor sign in",
        "Print ebadge",
        "Daily missed appointments report to all staff",
        " Manage unlimited events per month",
        "Integrate with Mailchimp, google Calendar, Eventbrite, Carrotsuite ERP",
        "Host assistant notification",
        "Events Analysis",
        "Personalized sender email address",
        "Security management",
        "Customize",
      ],
    },
  },
  {
    name: "Enterprise Plan",
    description:
      "Slack for the most demanding enterprises—all the flexibility to meet your regulatory requirements",
    priceNaira: 50000,
    priceUsd: 150,
    url: "/checkoutpage/enterprise-grid",
    highlights: {
      heading: "All the greatness of Premium, and:",
      body: [
        "Workspaces & Estates plan",
        "Unlimited staff",
        "Appointment reminders",
        "Edit ebadge",
        "Staff can set their availability",
        "Auto recognize customers, partners, etc",
      ],
    },
  },
];

export const detailedBillingPlans = {
  headings: ["rowTitle", "free", "pro", "business+", "enterpriseGrid"],
  data: [
    {
      title: "productivity-basics",
      data: [
        {
          rowTitle: "PRODUCTIVITY BASICS",
          free: "",
          pro: "",
          "business+": "",
          enterpriseGrid: "",
        },
        {
          rowTitle: {
            title: "Message and file history",
            tooltip:
              "The more you use Slack, the more useful it becomes. With all of your organization’s messages available in search, you can find context from past decisions or get new team members up to speed faster.",
          },
          free: "90-day access",
          pro: "unlimited",
          "business+": "unlimited",
          enterpriseGrid: "unlimited",
        },
        {
          rowTitle: {
            title: "Audio and video clips",
            tooltip:
              "Use audio and video to bring your work to life. Record a quick idea with an audio clip, or share your screen in a video clip, all without leaving Slack. Teammates can respond whenever they’d like.",
          },
          free: "90-day access",
          pro: "unlimited",
          "business+": "unlimited",
          enterpriseGrid: "unlimited",
        },
        {
          rowTitle: {
            title: "Relevant people, channels and files in search results",
            tooltip: "",
          },
          free: "90-day access",
          pro: "unlimited",
          "business+": "unlimited",
          enterpriseGrid: "unlimited",
        },
        {
          rowTitle: {
            title: "Integrations with other apps",
            tooltip:
              "Get notifications, find information or take actions without leaving Slack using integrations with tools you already use every day. Or build your own apps to suit your needs.",
          },
          free: "10",
          pro: "unlimited",
          "business+": "unlimited",
          enterpriseGrid: "unlimited",
        },
        {
          rowTitle: {
            title: "Workspaces",
            tooltip:
              "Like a virtual office, a workspace is where work happens in Slack. All your channels, direct messages and tools live in a workspace.",
          },
          free: "1",
          pro: "1",
          "business+": "1",
          enterpriseGrid: "unlimited",
        },
        {
          rowTitle: {
            title: "Customizable sections",
            tooltip:
              "Keep your projects, teams, and priorities straight, by organizing your channels and conversations into custom, collapsible sections in your sidebar.",
          },
          free: "",
          pro: "1",
          "business+": "1",
          enterpriseGrid: "unlimited",
        },
        {
          rowTitle: {
            title: "Slack huddles",
            tooltip:
              "Take a break from typing and start a live audio conversation (with video, screen sharing, a message thread, and fun reactions/effects) in a channel or direct message. Brainstorm, make decisions or just catch up–all at the flip of a switch.",
          },
          free: "1:1 only",
          pro: "1",
          "business+": "1",
          enterpriseGrid: "unlimited",
        },
      ],
    },
    {
      title: "external-collaboration",
      data: [
        {
          rowTitle: "EXTERNAL COLLABORATION",
          free: "",
          pro: "",
          "business+": "",
          enterpriseGrid: "",
        },
        {
          rowTitle: {
            title: "Work with other organizations",
            tooltip:
              "Collaborate seamlessly across organizational boundaries with Slack Connect. Separate organizations can work together from within their own Slack workspaces.",
          },
          free: "",
          pro: "1",
          "business+": "1",
          enterpriseGrid: "unlimited",
        },
        {
          rowTitle: {
            title: "Work with individuals",
            tooltip:
              "Reduce back-and-forth, one-off emails by securely bringing independent contractors, freelancers or vendors into Slack with guest accounts.",
          },
          free: "1:1 messaging only",
          pro: "1",
          "business+": "1",
          enterpriseGrid: "unlimited",
        },
      ],
    },
  ],
};
