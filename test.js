const users = [
    {id: 1, name: "milad1"},
    {id: 2, name: "milad2"},
    {id: 4, name: "milad3"},
];

const fff = {}
users.forEach(user => fff[user.name] = user.name)

console.log(fff)