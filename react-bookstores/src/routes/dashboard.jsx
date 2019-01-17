// @material-ui/icons
import Person from "@material-ui/icons/Person";

// core components/views
import UserProfile from "views/UserProfile/UserProfile.jsx";
import Books from "views/Books/Books";
import CreateBook from "views/Books/Book";

const dashboardRoutes = [
  {
    path: "/user",
    sidebarName: "User Profile",
    navbarName: "Profile",
    icon: Person,
    component: UserProfile
  },
  {
    path: "/#",
    sidebarName: "Books",
    navbarName: "Books",
    icon: "book",
    children: [
      {
        path: "/books",
        sidebarName: "List books",
        navbarName: "List books",
        icon: "LB",
        component: Books,
      },
      {
        path: "/createBook",
        sidebarName: "Create book",
        navbarName: "Create book",
        icon: "CB",
        component: CreateBook,
      },
    ]
  },
  { redirect: true, path: "/", to: "/books", navbarName: "Redirect" }
];

export default dashboardRoutes;
