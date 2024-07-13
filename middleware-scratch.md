Middleware run in order Each gets a next function which allows them to get the response returned by the previous
middleware

```jsx
const User = createContext();

const requireUser: Middleware = async ({ request, context, next }) => {
    // the original, blank response
    let response = await next();

    let user = await getUser(request.url)
    if (!user) {
        throw Response.redirect('/login', 302)
    }

    context.set(User, user)
    response.headers.append('Cookie', `foo=${user.bar}`)
    response.headers.set('X-Foo', 'bar')

    return response
}

const profilePicResponse: Middleware = async ({ request, context, next }) => {
    let user = context.get(User)
    let response = Response.json({ ['profile-picture']: user.profilePicture })
    // response.headers = (await next()).headers
    Response.merge(response, await next())
    return response
}

export default createRoute({
    // ...
    middleware: [
        requireUser,
        profilePicResponse
    ]
    // ...
});
```
