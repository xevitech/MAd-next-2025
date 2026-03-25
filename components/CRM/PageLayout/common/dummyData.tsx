export default {
  tasks: {
    task1: { id: 1, placeholder: "Owner", title: "Lead Owner" },

    task2: { id: 2, placeholder: "LookUp", title: "Account" },

    task3: { id: 3, placeholder: "LookUp", title: "First Name" },

    task4: { id: 4, placeholder: "Single line", title: "Last Name" },

    task5: { id: 5, placeholder: "0123456789", title: "Mobile" },

    task6: { id: 6, placeholder: "Single line", title: "Email" },

    task7: { id: 7, placeholder: "Look Up", title: "Industry" },

    task8: { id: 8, placeholder: "Look Up", title: "Lead Source" },

    task9: { id: 9, placeholder: "Look Up", title: "Lead Status" },

    task10: { id: 10, placeholder: "Single line", title: "Street" },

    task11: { id: 11, placeholder: "Single line", title: "City" },

    task12: { id: 12, placeholder: "Single line", title: "State" },

    task13: { id: 13, placeholder: "Single line", title: "Zip Code" },

    task14: { id: 14, placeholder: "Single line", title: "Country" },

    task15: { id: 15, placeholder: "Single line", title: "Zip Code" },

    task16: { id: 16, placeholder: "Annual Revenue", title: "Annual Revenue" },

    task17: { id: 17, placeholder: "Single line", title: "Title" },

    task18: {
      id: 18,

      placeholder: "Single line",

      title: "Number of Employees",
    },

    task19: { id: 19, placeholder: "Single line", title: "Website" },

    task20: { id: 20, placeholder: "Single line", title: "Twitter" },

    task21: { id: 21, placeholder: "Single line", title: "First Name" },
    task22: { id: 22, placeholder: "Single Line", title: "Single Line" },
    task23: { id: 23, placeholder: "Multi Line", title: "Multi Line" },
    task24: { id: 24, placeholder: "Email", title: "Email" },
    task25: { id: 25, placeholder: "Phone", title: "Phone" },
  },

  sideBarItems: [
    { task22: { id: 22, placeholder: "Single Line", title: "Single Line" } },

    { task23: { id: 23, placeholder: "Multi Line", title: "Multi Line" } },

    { task24: { id: 24, placeholder: "Email", title: "Email" } },

    { task25: { id: 25, placeholder: "Phone", title: "Phone" } },
  ],

  columns: {
    "column-1": {
      id: "column-1",

      title: "Lead Information",

      taskIds: [
        "task1",

        "task2",

        "task3",

        "task4",

        "task5",

        "task6",

        "task7",

        "task8",

        "task9",
      ],
    },

    "column-2": {
      id: "column-2",

      title: "Address Information",

      taskIds: ["task10", "task11", "task12", "task13", "task14", "task15"],
    },

    "column-3": {
      id: "column-3",

      title: "Additional Information",

      taskIds: ["task16", "task17", "task18", "task19", "task20"],
    },

    "column-4": {
      id: "column-4",

      title: "Description Information",

      taskIds: ["task21"],
    },
  },

  // columnOrder: ["column-1", "column-2", "column-3"]

  columnOrder: ["column-1", "column-2", "column-3", "column-4"],
};
