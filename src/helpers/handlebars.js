const Handlebars = require('handlebars');
module.exports = {
    // cau hinh cac ham cho handlebars
    sum: (a, b) => a + b,
    sortable: (fieldName, sort) => {
        const icons = {
            default: 'oi oi-elevator',
            asc: 'fas fa-sort-alpha-up-alt',
            desc: 'fas fa-sort-alpha-up'
        }
        const types = {
            default: 'desc',
            asc: 'desc',
            desc: 'asc'
        }
        const sortType = fieldName === sort.column ? sort.type : 'default';
        const icon = icons[sortType];
        const type = types[sortType];

        // bao ve href, tranh hacker _ HTML Escaping handlebars
        const href = Handlebars.escapeExpression(`?_sort&column=${fieldName}&type=${type}`)
        const result = `<a href="${href}">
            <span class="${icon}"></span>
        </a>`
        return new Handlebars.SafeString(result);
    },
    // haveOrNotUser: (isAuthenticated) => {
    //     if (isAuthenticated === false) {
    //         return `<li class="menu-item" id="login">
    //                 <a  class="menu-link" href="#">LOGIN</a>
    //             </li>`
    //     }
    //     else {
    //         return `<li class="menu-item" id="user">
    //                 <a  class="menu-link" href="#">{{user.user_fullname}}</a>
    //             </li>`
    //     }
    // }
};