import { NoteAdd, ViewList } from "@material-ui/icons";

const menuNavItems = [
  {
    text: "Note Management",
    icon: <ViewList />,
    path: "/management"
  },
  {
    text: "Create Note",
    icon: <NoteAdd />,
    path: "/create-note"
  }
];

export default menuNavItems;
