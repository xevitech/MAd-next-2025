let rows = [
  {
    id: 1,
    login: "cycle-depot",
    title: "Cycle-Depot",
    desc: "Fat",
    dateCreated: new Date("2023-03-09"),
  },
  {
    id: 2,
    login: "toplowriderstore",
    title: "Top Lowrider",
    desc: "Has",
    dateCreated: new Date("2023-03-09"),
  },
];

const getAll = () => {
  return new Promise((resolve, reject) => {
    const res = { data: rows };
    resolve(res);
  });
};

const saveRow = (row) => {
  return new Promise((resolve, reject) => {
    if (row.isNew) rows.push(row);
    else rows = rows.map((r) => (r.id === row.id ? row : r));
    resolve({ data: row });
  });
};

const deleteRow = (rowId) => {
  return new Promise((resolve, reject) => {
    const deletedRow = rows.find((r) => r.id === rowId);
    rows = rows.filter((r) => r.id !== rowId);
    resolve({ data: deletedRow });
  });
};

export default {
  getAll,
  saveRow,
  deleteRow,
};
