module.exports = {
    'GET /': async (ctx, next) => {
        // ctx.render('index.html', {
        //     title: 'Welcome'
        // });
        ctx.response.body =`<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
        console.log(`login`);
    }
};