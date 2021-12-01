export let onlineusers = [];

export const pushUser = (username, userId) => {
    !onlineusers.some( (user) => {user.name === username}) && onlineusers.push({username, userId})
};

export const pullUser = (userId) => {
    onlineusers = onlineusers.filter( (user) => {user.userId !== userId})
};

export const getAnUser = (username) => {
    onlineusers = onlineusers.find( (user) => {user.username === username})
};

