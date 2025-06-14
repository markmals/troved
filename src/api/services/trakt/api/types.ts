export interface paths {
    "/oauth/authorize": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Authorize Application
         * @description Construct then redirect to this URL. The Trakt website will request permissions for your app, which the user needs to approve. If the user isn't signed into Trakt, it will ask them to do so.
         *
         *     > ### ☣️ 🅸🅼🅿🅾🆁🆃🅰🅽🆃
         *     > _Use the website **https://trakt.tv** hostname when creating this URL and not the API URL._
         *
         *     #### Optional URL Parameters
         *
         *     When building the authorization URL, you can optionally include the following query parameters in the URL.
         *
         *     | Parameter | Value | Description |
         *     |---|---|---|
         *     | `signup` | `true` | Prefer the account sign up page to be the default. |
         *     | `prompt` | `login` | Force the user to sign in and authorize your app. |
         */
        get: operations["Authorize Application"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/oauth/token": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Exchange refresh_token for access_token
         * @description Use the `refresh_token` to get a new `access_token` without asking the user to re-authenticate. The `access_token` is valid for 3 months before it needs to be refreshed again.
         *
         *     #### JSON POST Data
         *
         *     | Key | Type | Value |
         *     |---|---|---|
         *     | `refresh_token` <span style="color:red;">*</a> | string | Saved from the initial token method. |
         *     | `client_id` <span style="color:red;">*</a> | string | Get this from your app settings. |
         *     | `client_secret` <span style="color:red;">*</a> | string | Get this from your app settings. |
         *     | `redirect_uri` <span style="color:red;">*</a> | string | URI specified in your app settings. |
         *     | `grant_type` <span style="color:red;">* </a> | string | `refresh_token` |
         */
        post: operations["Exchange refresh_token for access_token"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/oauth/revoke": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Revoke an access_token
         * @description An `access_token` can be revoked when a user signs out of their Trakt account in your app. This is not required, but might improve the user experience so the user doesn't have an unused app connection hanging around.
         *
         *     #### JSON POST Data
         *
         *     | Key | Type | Value |
         *     |---|---|---|
         *     | `token` <span style="color:red;">*</a> | string | A valid OAuth `access_token`. |
         *     | `client_id` <span style="color:red;">*</a> | string | Get this from your app settings. |
         *     | `client_secret` <span style="color:red;">*</a> | string | Get this from your app settings. |
         */
        post: operations["Revoke an access_token"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/oauth/device/code": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Generate new device codes
         * @description Generate new codes to start the device authentication process. The `device_code` and `interval` will be used later to poll for the `access_token`. The `user_code` and `verification_url` should be presented to the user as mentioned in the flow steps above.
         *
         *     #### QR Code
         *
         *     You might consider generating a QR code for the user to easily scan on their mobile device. The QR code should be a URL that redirects to the `verification_url` and appends the `user_code`. For example, `https://trakt.tv/activate/5055CC52` would load the Trakt hosted `verification_url` and pre-fill in the `user_code`.
         *
         *     #### JSON POST Data
         *
         *     | Key | Type | Value |
         *     |---|---|---|
         *     | `client_id` <span style="color:red;">*</a> | string | Get this from your app settings. |
         */
        post: operations["Generate new device codes"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/oauth/device/token": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Poll for the access_token
         * @description Use the `device_code` and poll at the `interval` (in seconds) to check if the user has authorized you app. Use `expires_in` to stop polling after that many seconds, and gracefully instruct the user to restart the process. **It is important to poll at the correct interval and also stop polling when expired.**
         *
         *     When you receive a `200` success response, save the `access_token` so your app can authenticate the user in methods that require it. The `access_token` is valid for 3 months. Save and use the `refresh_token` to get a new `access_token` without asking the user to re-authenticate. Check below for all the error codes that you should handle.
         *
         *     #### JSON POST Data
         *
         *     | Key | Type | Value |
         *     |---|---|---|
         *     | `code` <span style="color:red;">*</a> | string | `device_code` from the initial method. |
         *     | `client_id` <span style="color:red;">*</a> | string | Get this from your app settings. |
         *     | `client_secret` <span style="color:red;">*</a> | string | Get this from your app settings. |
         *
         *     ####  Status Codes
         *
         *     This method will send various HTTP status codes that you should handle accordingly.
         *
         *     | Code | Description |
         *     |---|---|
         *     | `200` | Success - *save the `access_token`*
         *     | `400` | Pending - *waiting for the user to authorize your app*
         *     | `404` | Not Found - *invalid `device_code`*
         *     | `409` | Already Used - *user already approved this code*
         *     | `410` | Expired - *the tokens have expired, restart the process*
         *     | `418` | Denied - *user explicitly denied this code*
         *     | `429` | Slow Down - *your app is polling too quickly*
         */
        post: operations["Poll for the access_token"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/calendars/my/shows/{start_date}/{days}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get shows
         * @description #### &#128274; OAuth Required &#10024; Extended Info &#127898; Filters
         *
         *     Returns all shows airing during the time period specified.
         */
        get: operations["Get shows"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/calendars/my/shows/new/{start_date}/{days}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get new shows
         * @description #### &#128274; OAuth Required &#10024; Extended Info &#127898; Filters
         *
         *     Returns all new show premieres (`series_premiere`) airing during the time period specified.
         */
        get: operations["Get new shows"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/calendars/my/shows/premieres/{start_date}/{days}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get season premieres
         * @description #### &#128274; OAuth Required &#10024; Extended Info &#127898; Filters
         *
         *     Returns all show premieres (`mid_season_premiere`, `season_premiere`, `series_premiere`) airing during the time period specified.
         */
        get: operations["Get season premieres"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/calendars/my/shows/finales/{start_date}/{days}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get finales
         * @description #### &#128274; OAuth Required &#10024; Extended Info &#127898; Filters
         *
         *     Returns all show finales (`mid_season_finale`, `season_finale`, `series_finale`) airing during the time period specified.
         */
        get: operations["Get finales"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/calendars/my/movies/{start_date}/{days}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get movies
         * @description #### &#128274; OAuth Required &#10024; Extended Info &#127898; Filters
         *
         *     Returns all movies with a release date during the time period specified.
         */
        get: operations["Get movies"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/calendars/my/dvd/{start_date}/{days}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get DVD releases
         * @description #### &#128274; OAuth Required &#10024; Extended Info &#127898; Filters
         *
         *     Returns all movies with a DVD release date during the time period specified.
         */
        get: operations["Get DVD releases"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/calendars/all/shows/{start_date}/{days}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get shows
         * @description #### &#10024; Extended Info &#127898; Filters
         *
         *     Returns all shows airing during the time period specified.
         */
        get: operations["Get shows 1"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/calendars/all/shows/new/{start_date}/{days}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get new shows
         * @description #### &#10024; Extended Info &#127898; Filters
         *
         *     Returns all new show premieres (`series_premiere`) airing during the time period specified.
         */
        get: operations["Get new shows 1"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/calendars/all/shows/premieres/{start_date}/{days}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get season premieres
         * @description #### &#10024; Extended Info &#127898; Filters
         *
         *     Returns all show premieres (`mid_season_premiere`, `season_premiere`, `series_premiere`) airing during the time period specified.
         */
        get: operations["Get season premieres 1"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/calendars/all/shows/finales/{start_date}/{days}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get finales
         * @description #### &#10024; Extended Info &#127898; Filters
         *
         *     Returns all show finales (`mid_season_finale`, `season_finale`, `series_finale`) airing during the time period specified.
         */
        get: operations["Get finales 1"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/calendars/all/movies/{start_date}/{days}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get movies
         * @description #### &#10024; Extended Info &#127898; Filters
         *
         *     Returns all movies with a release date during the time period specified.
         */
        get: operations["Get movies 1"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/calendars/all/dvd/{start_date}/{days}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get DVD releases
         * @description #### &#10024; Extended Info &#127898; Filters
         *
         *     Returns all movies with a DVD release date during the time period specified.
         */
        get: operations["Get DVD releases 1"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/checkin": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Check into an item
         * @description #### &#128274; OAuth Required
         *
         *     Check into a movie or episode. This should be tied to a user action to manually indicate they are watching something. The item will display as *watching* on the site, then automatically switch to *watched* status once the duration has elapsed. A unique history `id` (64-bit integer) will be returned and can be used to reference this checkin directly.
         *
         *     #### JSON POST Data
         *
         *     | Key | Type | Value |
         *     |---|---|---|
         *     | item <span style="color:red;">*</a> | object | `movie` or `episode` object. (see examples &#8594;) |
         *     | `sharing`  | object | Control sharing to any connected social networks. (see below &#8595;) |
         *     | `message`  | string | Message used for sharing. If not sent, it will use the watching string in the user settings. |
         *
         *     #### Sharing
         *
         *     The `sharing` object is optional and will apply the user's settings if not sent. If `sharing` is sent, each key will override the user's setting for that social network. Send `true` to post or `false` to not post on the indicated social network. You can see which social networks a user has connected with the [**\/users/settings**](/reference/users/settings) method.
         *
         *     | Key | Type |
         *     |---|---|
         *     | `twitter` | boolean |
         *     | `mastodon` | boolean |
         *     | `tumblr` | boolean |
         *
         *     > ### 🅽🅾🆃🅴
         *     > _If a checkin is already in progress, a `409` HTTP status code will returned. The response will contain an `expires_at` timestamp which is when the user can check in again._
         */
        post: operations["Check into an item"];
        /**
         * Delete any active checkins
         * @description #### &#128274; OAuth Required
         *
         *     Removes any active checkins, no need to provide a specific item.
         */
        delete: operations["Delete any active checkins"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/certifications/{type}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get certifications
         * @description Get a list of all certifications, including names, slugs, and descriptions.
         */
        get: operations["Get certifications"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/comments": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Post a comment
         * @description #### &#128274; OAuth Required &#128513; Emojis
         *
         *     Add a new comment to a movie, show, season, episode, or list. Make sure to allow and encourage *spoilers* to be indicated in your app and follow the rules listed above.
         *
         *     #### JSON POST Data
         *
         *     | Key | Type | Default | Value |
         *     |---|---|---|---|
         *     | item <span style="color:red;">*</a> | object | | `movie`, `show`, `season`, `episode`, or `list` object. (see examples &#8594;) |
         *     | `comment` <span style="color:red;">*</a> | string |  | Text for the comment. |
         *     | `spoiler` | boolean | `false` | Is this a spoiler? |
         *     | `sharing`  | object | | Control sharing to any connected social networks. (see below &#8595;) |
         *
         *     #### Sharing
         *
         *     The `sharing` object is optional and will apply the user's settings if not sent. If `sharing` is sent, each key will override the user's setting for that social network. Send `true` to post or `false` to not post on the indicated social network. You can see which social networks a user has connected with the [**\/users/settings**](/reference/users/settings) method.
         *
         *     | Key | Type |
         *     |---|---|
         *     | `twitter` | boolean |
         *     | `tumblr` | boolean |
         *     | `medium` | boolean |
         */
        post: operations["Post a comment"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/comments/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a comment or reply
         * @description ####  &#128513; Emojis
         *
         *     Returns a single comment and indicates how many replies it has. Use [**\/comments/:id/replies**](/reference/comments/replies/) to get the actual replies.
         */
        get: operations["Get a comment or reply"];
        /**
         * Update a comment or reply
         * @description #### &#128274; OAuth Required &#128513; Emojis
         *
         *     Update a single comment. The OAuth user must match the author of the comment in order to update it. If not, a `401` HTTP status is returned.
         *
         *     #### JSON POST Data
         *
         *     | Key | Type | Default | Value |
         *     |---|---|---|---|
         *     | `comment` | string |  | Text for the comment. |
         *     | `spoiler` | boolean | `false` | Is this a spoiler? |
         */
        put: operations["Update a comment or reply"];
        post?: never;
        /**
         * Delete a comment or reply
         * @description #### &#128274; OAuth Required
         *
         *     Delete a single comment. The OAuth user must match the author of the comment in order to delete it. If not, a `401` HTTP status code is returned. The comment must also be less than 2 weeks old or have 0 replies. If not, a `409` HTTP status is returned.
         */
        delete: operations["Delete a comment or reply"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/comments/{id}/replies": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get replies for a comment
         * @description #### &#128275; OAuth Optional &#128196; Pagination &#128513; Emojis
         *
         *     Returns all replies for a comment. It is possible these replies could have replies themselves, so in that case you would just call [**\/comments/:id/replies**](/reference/comments/replies/) again with the new comment `id`.
         *
         *     > ### 🅽🅾🆃🅴
         *     > _If you send OAuth, replies from blocked users will be automatically filtered out._
         */
        get: operations["Get replies for a comment"];
        put?: never;
        /**
         * Post a reply for a comment
         * @description #### &#128274; OAuth Required &#128513; Emojis
         *
         *     Add a new reply to an existing comment. Make sure to allow and encourage *spoilers* to be indicated in your app and follow the rules listed above.
         *
         *     #### JSON POST Data
         *
         *     | Key | Type | Default | Value |
         *     |---|---|---|---|
         *     | `comment` <span style="color:red;">*</a> | string |  | Text for the reply. |
         *     | `spoiler` | boolean | `false` | Is this a spoiler? |
         */
        post: operations["Post a reply for a comment"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/comments/{id}/item": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get the attached media item
         * @description #### &#10024; Extended Info
         *
         *     Returns the media item this comment is attached to. The media type can be `movie`, `show`, `season`, `episode`, or `list` and it also returns the standard media object for that media type.
         */
        get: operations["Get the attached media item"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/comments/{id}/likes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get all users who liked a comment
         * @description #### &#128196; Pagination
         *
         *     Returns all users who liked a comment. If you only need the `replies` count, the main `comment` object already has that, so no need to use this method.
         */
        get: operations["Get all users who liked a comment"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/comments/{id}/like": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Like a comment
         * @description #### &#128274; OAuth Required
         *
         *     Votes help determine popular comments. Only one like is allowed per comment per user.
         */
        post: operations["Like a comment"];
        /**
         * Remove like on a comment
         * @description #### &#128274; OAuth Required
         *
         *     Remove a like on a comment.
         */
        delete: operations["Remove like on a comment"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/comments/trending/{comment_type}/{type}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get trending comments
         * @description #### &#128196; Pagination &#10024; Extended Info &#128513; Emojis
         *
         *     Returns all comments with the most likes and replies over the last 7 days. You can optionally filter by the `comment_type` and media `type` to limit what gets returned. If you want to `include_replies` that will return replies in place alongside top level comments.
         */
        get: operations["Get trending comments"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/comments/recent/{comment_type}/{type}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get recently created comments
         * @description #### &#128196; Pagination &#10024; Extended Info &#128513; Emojis
         *
         *     Returns the most recently written comments across all of Trakt. You can optionally filter by the `comment_type` and media `type` to limit what gets returned. If you want to `include_replies` that will return replies in place alongside top level comments.
         */
        get: operations["Get recently created comments"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/comments/updates/{comment_type}/{type}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get recently updated comments
         * @description #### &#128196; Pagination &#10024; Extended Info &#128513; Emojis
         *
         *     Returns the most recently updated comments across all of Trakt. You can optionally filter by the `comment_type` and media `type` to limit what gets returned. If you want to `include_replies` that will return replies in place alongside top level comments.
         */
        get: operations["Get recently updated comments"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/countries/{type}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get countries
         * @description Get a list of all countries, including names and codes.
         */
        get: operations["Get countries"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/genres/{type}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get genres
         * @description Get a list of all genres, including names and slugs.
         */
        get: operations["Get genres"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/languages/{type}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get languages
         * @description Get a list of all langauges, including names and codes.
         */
        get: operations["Get languages"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/lists/trending": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get trending lists
         * @description #### &#128196; Pagination &#128513; Emojis
         *
         *     Returns all lists with the most likes and comments over the last 7 days.
         */
        get: operations["Get trending lists"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/lists/popular": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get popular lists
         * @description #### &#128196; Pagination &#128513; Emojis
         *
         *     Returns the most popular lists. Popularity is calculated using total number of likes and comments.
         */
        get: operations["Get popular lists"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/lists/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get list
         * @description #### &#128513; Emojis
         *
         *     Returns a single list. Use the [**\/lists/:id/items**](#reference/lists/list-items) method to get the actual items this list contains.
         *
         *     > ### 🅽🅾🆃🅴
         *     > _You must use an integer `id`, and only public lists will return data._
         */
        get: operations["Get list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/lists/{id}/likes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get all users who liked a list
         * @description #### &#128196; Pagination
         *
         *     Returns all users who liked a list.
         */
        get: operations["Get all users who liked a list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/lists/{id}/like": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Like a list
         * @description #### &#128274; OAuth Required
         *
         *     Votes help determine popular lists. Only one like is allowed per list per user.
         */
        post: operations["Like a list"];
        /**
         * Remove like on a list
         * @description #### &#128274; OAuth Required
         *
         *     Remove a like on a list.
         */
        delete: operations["Remove like on a list"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/lists/{id}/items/{type}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get items on a list
         * @description #### &#128196; Pagination Optional &#10024; Extended Info &#128513; Emojis
         *
         *     Get all items on a personal list. Items can be a `movie`, `show`, `season`, `episode`, or `person`. You can optionally specify the `type` parameter with a single value or comma delimited string for multiple item types.
         *
         *     #### Notes
         *
         *     Each list item contains a `notes` field with text entered by the user.
         *
         *     #### Sorting Headers
         *
         *     All list items are sorted by ascending `rank`. We also send `X-Sort-By` and `X-Sort-How` headers which can be used to custom sort the list _**in your app**_ based on the user's preference. Values for `X-Sort-By` include `rank`, `added`, `title`, `released`, `runtime`, `popularity`, `percentage`, `votes`, `my_rating`, `random`, `watched`, and `collected`. Values for `X-Sort-How` include `asc` and `desc`.
         */
        get: operations["Get items on a list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/lists/{id}/comments/{sort}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get all list comments
         * @description #### &#128275; OAuth Optional &#128196; Pagination &#128513; Emojis
         *
         *     Returns all top level comments for a list. By default, the `newest` comments are returned first. Other sorting options include `oldest`, most `likes`, and most `replies`.
         *
         *     > ### 🅽🅾🆃🅴
         *     > _If you send OAuth, comments from blocked users will be automatically filtered out._
         */
        get: operations["Get all list comments"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/movies/trending": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get trending movies
         * @description #### &#128196; Pagination &#10024; Extended Info &#127898; Filters
         *
         *     Returns all movies being watched right now. Movies with the most users are returned first.
         */
        get: operations["Get trending movies"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/movies/popular": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get popular movies
         * @description #### &#128196; Pagination &#10024; Extended Info &#127898; Filters
         *
         *     Returns the most popular movies. Popularity is calculated using the rating percentage and the number of ratings.
         */
        get: operations["Get popular movies"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/movies/favorited/{period}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get the most favorited movies
         * @description #### &#128196; Pagination &#10024; Extended Info &#127898; Filters
         *
         *     Returns the most favorited movies in the specified time `period`, defaulting to `weekly`. All stats are relative to the specific time `period`.
         */
        get: operations["Get the most favorited movies"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/movies/played/{period}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get the most played movies
         * @description #### &#128196; Pagination &#10024; Extended Info &#127898; Filters
         *
         *     Returns the most played (a single user can watch multiple times) movies in the specified time `period`, defaulting to `weekly`. All stats are relative to the specific time `period`.
         */
        get: operations["Get the most played movies"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/movies/watched/{period}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get the most watched movies
         * @description #### &#128196; Pagination &#10024; Extended Info &#127898; Filters
         *
         *     Returns the most watched (unique users) movies in the specified time `period`, defaulting to `weekly`. All stats are relative to the specific time `period`.
         */
        get: operations["Get the most watched movies"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/movies/collected/{period}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get the most Collected movies
         * @description #### &#128196; Pagination &#10024; Extended Info &#127898; Filters
         *
         *     Returns the most collected (unique users) movies in the specified time `period`, defaulting to `weekly`. All stats are relative to the specific time `period`.
         */
        get: operations["Get the most Collected movies"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/movies/anticipated": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get the most anticipated movies
         * @description #### &#128196; Pagination &#10024; Extended Info &#127898; Filters
         *
         *     Returns the most anticipated movies based on the number of lists a movie appears on.
         */
        get: operations["Get the most anticipated movies"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/movies/boxoffice": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get the weekend box office
         * @description #### &#10024; Extended Info
         *
         *     Returns the top 10 grossing movies in the U.S. box office last weekend. Updated every Monday morning.
         */
        get: operations["Get the weekend box office"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/movies/updates/{start_date}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get recently updated movies
         * @description #### &#128196; Pagination &#10024; Extended Info
         *
         *     Returns all movies updated since the specified UTC date and time. We recommended storing the `X-Start-Date` header you can be efficient using this method moving forward. By default, `10` results are returned. You can send a `limit` to get up to `100` results per page.
         *
         *     > ### ☣️ 🅸🅼🅿🅾🆁🆃🅰🅽🆃
         *     > _The `start_date` is only accurate to the hour, for caching purposes. Please drop the minutes and seconds from your timestamp to help optimize our cached data. For example, use `2021-07-17T12:00:00Z` and not `2021-07-17T12:23:34Z`._
         *
         *     > ### 🅽🅾🆃🅴
         *     > _The `start_date` can only be a maximum of 30 days in the past._
         */
        get: operations["Get recently updated movies"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/movies/updates/id/{start_date}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get recently updated movie Trakt IDs
         * @description #### &#128196; Pagination
         *
         *     Returns all movie Trakt IDs updated since the specified UTC date and time. We recommended storing the `X-Start-Date` header you can be efficient using this method moving forward. By default, `10` results are returned. You can send a `limit` to get up to `100` results per page.
         *
         *     > ### ☣️ 🅸🅼🅿🅾🆁🆃🅰🅽🆃
         *     > _The `start_date` is only accurate to the hour, for caching purposes. Please drop the minutes and seconds from your timestamp to help optimize our cached data. For example, use `2021-07-17T12:00:00Z` and not `2021-07-17T12:23:34Z`._
         *
         *     > ### 🅽🅾🆃🅴
         *     > _The `start_date` can only be a maximum of 30 days in the past._
         */
        get: operations["Get recently updated movie Trakt IDs"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/movies/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a movie
         * @description #### &#10024; Extended Info
         *
         *     Returns a single movie's details.
         *
         *     > ### 🅽🅾🆃🅴
         *     > _When getting `full` extended info, the `status` field can have a value of `released`, `in production`, `post production`, `planned`, `rumored`, or `canceled`._
         */
        get: operations["Get a movie"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/movies/{id}/aliases": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get all movie aliases
         * @description Returns all title aliases for a movie.  Includes country where name is different.
         */
        get: operations["Get all movie aliases"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/movies/{id}/releases/{country}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get all movie releases
         * @description Returns all releases for a movie including country, certification, release date, release type, and note. The release type can be set to `unknown`, `premiere`, `limited`, `theatrical`, `digital`, `physical`, or `tv`. The `note` might have optional info such as the film festival name for a `premiere` release or Blu-ray specs for a `physical` release. We pull this info from [TMDB](https://developers.themoviedb.org/3/movies/get-movie-release-dates).
         */
        get: operations["Get all movie releases"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/movies/{id}/translations/{language}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get all movie translations
         * @description Returns all translations for a movie, including language and translated values for title, tagline and overview.
         */
        get: operations["Get all movie translations"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/movies/{id}/comments/{sort}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get all movie comments
         * @description #### &#128275; OAuth Optional &#128196; Pagination &#128513; Emojis
         *
         *     Returns all top level comments for a movie. By default, the `newest` comments are returned first. Other sorting options include `oldest`, most `likes`, most `replies`, `highest` rated, `lowest` rated, and most `plays`.
         *
         *     > ### 🅽🅾🆃🅴
         *     > _If you send OAuth, comments from blocked users will be automatically filtered out._
         */
        get: operations["Get all movie comments"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/movies/{id}/lists/{type}/{sort}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get lists containing this movie
         * @description #### &#128196; Pagination &#128513; Emojis
         *
         *     Returns all lists that contain this movie. By default, `personal` lists are returned sorted by the most `popular`.
         */
        get: operations["Get lists containing this movie"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/movies/{id}/people": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get all people for a movie
         * @description #### &#10024; Extended Info
         *
         *     Returns all `cast` and `crew` for a movie. Each `cast` member will have a `characters` array and a standard `person` object.
         *
         *     The `crew` object will be broken up by department into `production`, `art`, `crew`, `costume & make-up`, `directing`, `writing`, `sound`, `camera`, `visual effects`, `lighting`, and `editing` (if there are people for those crew positions). Each of those members will have a `jobs` array and a standard `person` object.
         */
        get: operations["Get all people for a movie"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/movies/{id}/ratings": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get movie ratings
         * @description Returns rating (between 0 and 10) and distribution for a movie.
         */
        get: operations["Get movie ratings"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/movies/{id}/related": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get related movies
         * @description #### &#128196; Pagination &#10024; Extended Info
         *
         *     Returns related and similar movies.
         */
        get: operations["Get related movies"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/movies/{id}/stats": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get movie stats
         * @description Returns lots of movie stats.
         */
        get: operations["Get movie stats"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/movies/{id}/studios": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get movie studios
         * @description Returns all studios for a movie.
         */
        get: operations["Get movie studios"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/movies/{id}/watching": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get users watching right now
         * @description #### &#10024; Extended Info
         *
         *     Returns all users watching this movie right now.
         */
        get: operations["Get users watching right now"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/movies/{id}/refresh": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Refresh movie metadata
         * @description #### 🔥 VIP Only &#128274; OAuth Required
         *
         *     Queue this movie for a full metadata and image refresh. It might take up to 8 hours for the updated metadata to be availabe through the API.
         *
         *     > ### 🅽🅾🆃🅴
         *     > _If this movie is already queued, a `409` HTTP status code will returned._
         */
        post: operations["Refresh movie metadata"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/networks": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get networks
         * @description Get a list of all TV networks, including the `name`, `country`, and `ids`.
         */
        get: operations["Get networks"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/notes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Add notes
         * @description #### 🅱🅴🆃🅰 🔥 VIP Only &#128274; OAuth Required &#128513; Emojis
         *
         *     Notes *(500 maximum characters)* added to a `movie`, `show`, `season`, `episode`, or `person` will automatically be set to `private`. You can send just the media item.
         *
         *     Notes *(500 maximum characters)* added to a `history`, `collection`, or `rating` can have their `privacy` and `spoiler` set. You need to send the `attached_to` object so we know where to attach the note.
         *
         *     #### JSON POST Data
         *
         *     | Key | Type | Default | Value |
         *     |---|---|---|---|
         *     | item <span style="color:red;">*</a> | object | | `movie`, `show`, `season`, `episode`, `person`, 'history', 'collection', 'rating' object. (see examples &#8594;) |
         *     | `notes` <span style="color:red;">*</a> | string |  | Text for the notes. |
         *     | `spoiler` | boolean | `false` | Is this a spoiler? |
         *     | `privacy` | string | `private` | `private`, `friends`, `public` |
         */
        post: operations["Add notes"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/notes/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a note
         * @description #### 🅱🅴🆃🅰 🔥 VIP Only &#128274; OAuth Required &#128513; Emojis
         *
         *     Returns a single note.
         */
        get: operations["Get a note"];
        /**
         * Update a note
         * @description #### 🅱🅴🆃🅰 🔥 VIP Only &#128274; OAuth Required &#128513; Emojis
         *
         *     Update a single note *(500 maximum characters)*. The OAuth user must match the author of the note in order to update it. If not, a `401` HTTP status is returned.
         *
         *     #### JSON POST Data
         *
         *     | Key | Type | Default | Value |
         *     |---|---|---|---|
         *     | `notes` | string |  | Text for the notes. |
         *     | `spoiler` | boolean | `false` | Is this a spoiler? |
         *     | `privacy` | string | `private` | `private`, `friends`, `public` |
         */
        put: operations["Update a note"];
        post?: never;
        /**
         * Delete a note
         * @description #### 🅱🅴🆃🅰 🔥 VIP Only &#128274; OAuth Required
         *
         *     Delete a single note. The OAuth user must match the author of the comment in order to delete it. If not, a `401` HTTP status code is returned.
         */
        delete: operations["Delete a note"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/notes/{id}/item": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get the attached item
         * @description #### 🅱🅴🆃🅰 🔥 VIP Only &#10024; Extended Info
         *
         *     Returns the item this note is `attached_to`. Media items like `movie`, `show`, `season`, `episode`, or `person` are straightforward, but `history` will need to be mapped to that specific play in their watched history since they might have multiple plays. Since `collection` and `rating` is a 1:1 association, you can assume the note is attached to the media item in the `type` field that has been collected or rated.
         */
        get: operations["Get the attached item"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/people/updates/{start_date}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get recently updated people
         * @description #### &#128196; Pagination &#10024; Extended Info
         *
         *     Returns all people updated since the specified UTC date and time. We recommended storing the `X-Start-Date` header you can be efficient using this method moving forward. By default, `10` results are returned. You can send a `limit` to get up to `100` results per page.
         *
         *     > ### ☣️ 🅸🅼🅿🅾🆁🆃🅰🅽🆃
         *     > _The `start_date` is only accurate to the hour, for caching purposes. Please drop the minutes and seconds from your timestamp to help optimize our cached data. For example, use `2021-07-17T12:00:00Z` and not `2021-07-17T12:23:34Z`._
         *
         *     > ### 🅽🅾🆃🅴
         *     > _The `start_date` can only be a maximum of 30 days in the past._
         */
        get: operations["Get recently updated people"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/people/updates/id/{start_date}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get recently updated people Trakt IDs
         * @description #### &#128196; Pagination
         *
         *     Returns all people Trakt IDs updated since the specified UTC date and time. We recommended storing the `X-Start-Date` header you can be efficient using this method moving forward. By default, `10` results are returned. You can send a `limit` to get up to `100` results per page.
         *
         *     > ### ☣️ 🅸🅼🅿🅾🆁🆃🅰🅽🆃
         *     > _The `start_date` is only accurate to the hour, for caching purposes. Please drop the minutes and seconds from your timestamp to help optimize our cached data. For example, use `2021-07-17T12:00:00Z` and not `2021-07-17T12:23:34Z`._
         *
         *     > ### 🅽🅾🆃🅴
         *     > _The `start_date` can only be a maximum of 30 days in the past._
         */
        get: operations["Get recently updated people Trakt IDs"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/people/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a single person
         * @description #### &#10024; Extended Info
         *
         *     Returns a single person's details.
         *
         *     #### Gender
         *
         *     If available, the `gender` property will be set to `male`, `female`, or `non_binary`.
         *
         *     #### Known For Department
         *
         *     If available, the `known_for_department` property will be set to `production`, `art`, `crew`, `costume & make-up`, `directing`, `writing`, `sound`, `camera`, `visual effects`, `lighting`, or `editing`. Many people have credits across departments, `known_for` allows you to select their default credits more accurately.
         */
        get: operations["Get a single person"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/people/{id}/movies": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get movie credits
         * @description #### &#10024; Extended Info
         *
         *     Returns all movies where this person is in the `cast` or `crew`. Each `cast` object will have a `characters` array and a standard `movie` object.
         *
         *     The `crew` object will be broken up by department into `production`, `art`, `crew`, `costume & make-up`, `directing`, `writing`, `sound`, `camera`, `visual effects`, `lighting`, and `editing` (if there are people for those crew positions). Each of those members will have a `jobs` array and a standard `movie` object.
         */
        get: operations["Get movie credits"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/people/{id}/shows": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get show credits
         * @description #### &#10024; Extended Info
         *
         *     Returns all shows where this person is in the `cast` or `crew`, including the `episode_count` for which they appear. Each `cast` object will have a `characters` array and a standard `show` object. If `series_regular` is `true`, this person is a series regular and not simply a guest star.
         *
         *     The `crew` object will be broken up by department into `production`, `art`, `crew`, `costume & make-up`, `directing`, `writing`, `sound`, `camera`, `visual effects`, `lighting`, `editing`, and `created  by` (if there are people for those crew positions). Each of those members will have a `jobs` array and a standard `show` object.
         */
        get: operations["Get show credits"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/people/{id}/lists/{type}/{sort}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get lists containing this person
         * @description #### &#128196; Pagination &#128513; Emojis
         *
         *     Returns all lists that contain this person. By default, `personal` lists are returned sorted by the most `popular`.
         */
        get: operations["Get lists containing this person"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/people/{id}/refresh": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Refresh person metadata
         * @description #### 🔥 VIP Only &#128274; OAuth Required
         *
         *     Queue this person for a full metadata and image refresh. It might take up to 8 hours for the updated metadata to be availabe through the API.
         *
         *     > ### 🅽🅾🆃🅴
         *     > _If this person is already queued, a `409` HTTP status code will returned._
         */
        post: operations["Refresh person metadata"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/recommendations/movies": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get movie recommendations
         * @description #### &#128274; OAuth Required &#10024; Extended Info
         *
         *     Movie recommendations for a user. By default, `10` results are returned. You can send a `limit` to get up to `100` results per page. Set `ignore_collected=true` to filter out movies the user has already collected or `ignore_watchlisted=true` to filter out movies the user has already watchlisted.
         *
         *     The `favorited_by` array contains all users who favorited the item along with any notes they added.
         */
        get: operations["Get movie recommendations"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/recommendations/movies/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /**
         * Hide a movie recommendation
         * @description #### &#128274; OAuth Required
         *
         *     Hide a movie from getting recommended anymore.
         */
        delete: operations["Hide a movie recommendation"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/recommendations/shows": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get show recommendations
         * @description #### &#128274; OAuth Required &#10024; Extended Info
         *
         *     TV show recommendations for a user. By default, `10` results are returned. You can send a `limit` to get up to `100` results per page. Set `ignore_collected=true` to filter out shows the user has already collected or `ignore_watchlisted=true` to filter out shows the user has already watchlisted.
         *
         *     The `favorited_by` array contains all users who favorited the item along with any notes they added.
         */
        get: operations["Get show recommendations"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/recommendations/shows/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /**
         * Hide a show recommendation
         * @description #### &#128274; OAuth Required
         *
         *     Hide a show from getting recommended anymore.
         */
        delete: operations["Hide a show recommendation"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/scrobble/start": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Start watching in a media center
         * @description #### &#128274; OAuth Required
         *
         *     Use this method when the video initially starts playing or is unpaused. This will remove any playback progress if it exists.
         *
         *     > ### 🅽🅾🆃🅴
         *     > _A watching status will auto expire after the remaining runtime has elapsed. There is no need to call this method again while continuing to watch the same item._
         *
         *     #### JSON POST Data
         *
         *     | Key | Type | Value |
         *     |---|---|---|
         *     | item <span style="color:red;">*</a> | object | `movie` or `episode` object. (see examples &#8594;) |
         *     | `progress` <span style="color:red;">*</a> | float | Progress percentage between 0 and 100. |
         */
        post: operations["Start watching in a media center"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/scrobble/pause": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Pause watching in a media center
         * @description #### &#128274; OAuth Required
         *
         *     Use this method when the video is paused. The playback progress will be saved and [**\/sync/playback**](/reference/sync/playback/) can be used to resume the video from this exact position. Unpause a video by calling the [**\/scrobble/start**](/reference/scrobble/start/) method again.
         *
         *     #### JSON POST Data
         *
         *     | Key | Type | Value |
         *     |---|---|---|
         *     | item <span style="color:red;">*</a> | object | `movie` or `episode` object. (see examples &#8594;) |
         *     | `progress` <span style="color:red;">*</a> | float | Progress percentage between 0 and 100. |
         */
        post: operations["Pause watching in a media center"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/scrobble/stop": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Stop or finish watching in a media center
         * @description #### &#128274; OAuth Required
         *
         *     Use this method when the video is stopped or finishes playing on its own. If the progress is above 80%, the video will be scrobbled and the `action` will be set to **scrobble**. A unique history `id` (64-bit integer) will be returned and can be used to reference this `scrobble` directly.
         *
         *     If the progress is less than 80%, it will be treated as a *pause* and the `action` will be set to **pause**. The playback progress will be saved and [**\/sync/playback**](/reference/sync/playback/) can be used to resume the video from this exact position.
         *
         *     > ### 🅽🅾🆃🅴
         *     > _If you prefer to use a threshold higher than 80%, you should use [**\/scrobble/pause**](/reference/scrobble/pause/) yourself so it doesn't create duplicate scrobbles._
         *
         *     #### JSON POST Data
         *
         *     | Key | Type | Value |
         *     |---|---|---|
         *     | item <span style="color:red;">*</a> | object | `movie` or `episode` object. (see examples &#8594;) |
         *     | `progress` <span style="color:red;">*</a> | flloat | Progress percentage between 0 and 100. |
         *
         *     > ### 🅽🅾🆃🅴
         *     > _If the same item was just scrobbled, a `409` HTTP status code will returned to avoid scrobbling a duplicate. The response will contain a `watched_at` timestamp when the item was last scrobbled and a `expires_at` timestamp when the item can be scrobbled again._
         */
        post: operations["Stop or finish watching in a media center"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/search/{type}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get text query results
         * @description #### &#128196; Pagination &#10024; Extended Info &#127898; Filters
         *
         *     Search all text fields that a media object contains (i.e. title, overview, etc). Results are ordered by the most relevant score. Specify the `type` of results by sending a single value or a comma delimited string for multiple types.
         *
         *     #### Special Characters
         *
         *     Our search engine (Solr) gives the following characters special meaning when they appear in a query:
         *
         *     `+ - && || ! ( ) { } [ ] ^ " ~ * ? : /`
         *
         *     To interpret any of these characters literally (and not as a special character), precede the character with a backslash `\` character.
         *
         *     #### Search Fields
         *
         *     By default, all text fields are used to search for the `query`. You can optionally specify the `fields` parameter with a single value or comma delimited string for multiple fields. Each `type` has specific `fields` that can be specified. This can be useful if you want to support more strict searches (i.e. title only).
         *
         *     | Type | Field |
         *     |---|---|
         *     | `movie` | `title` |
         *     |  | `tagline` |
         *     |  | `overview` |
         *     |  | `people` |
         *     |  | `translations` |
         *     |  | `aliases` |
         *     | `show` | `title` |
         *     |  | `overview` |
         *     |  | `people` |
         *     |  | `translations` |
         *     |  | `aliases` |
         *     | `episode` | `title` |
         *     |  | `overview` |
         *     | `person` | `name` |
         *     |  | `biography` |
         *     | `list` | `name` |
         *     |  | `description` |
         */
        get: operations["Get text query results"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/search/{id_type}/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get ID lookup results
         * @description #### &#128196; Pagination &#10024; Extended Info
         *
         *     Lookup items by their Trakt, IMDB, TMDB, or TVDB ID. If you use the search url without a `type` it might return multiple items if the `id_type` is not globally unique. Specify the `type` of results by sending a single value or a comma delimited string for multiple types.
         *
         *     | Type | URL |
         *     |---|---|
         *     | `trakt` | `/search/trakt/:id` |
         *     |  | `/search/trakt/:id?type=movie` |
         *     |  | `/search/trakt/:id?type=show` |
         *     |  | `/search/trakt/:id?type=episode` |
         *     |  | `/search/trakt/:id?type=person` |
         *     | `imdb` | `/search/imdb/:id` |
         *     | `tmdb` | `/search/tmdb/:id` |
         *     |  | `/search/tmdb/:id?type=movie` |
         *     |  | `/search/tmdb/:id?type=show` |
         *     |  | `/search/tmdb/:id?type=episode` |
         *     |  | `/search/tmdb/:id?type=person` |
         *     | `tvdb` | `/search/tvdb/:id` |
         *     |  | `/search/tvdb/:id?type=show` |
         *     |  | `/search/tvdb/:id?type=episode` |
         */
        get: operations["Get ID lookup results"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/trending": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get trending shows
         * @description #### &#128196; Pagination &#10024; Extended Info &#127898; Filters
         *
         *     Returns all shows being watched right now. Shows with the most users are returned first.
         */
        get: operations["Get trending shows"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/popular": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get popular shows
         * @description #### &#128196; Pagination &#10024; Extended Info &#127898; Filters
         *
         *     Returns the most popular shows. Popularity is calculated using the rating percentage and the number of ratings.
         */
        get: operations["Get popular shows"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/favorited/{period}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get the most favorited shows
         * @description #### &#128196; Pagination &#10024; Extended Info &#127898; Filters
         *
         *     Returns the most favorited shows in the specified time `period`, defaulting to `weekly`. All stats are relative to the specific time `period`.
         */
        get: operations["Get the most favorited shows"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/played/{period}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get the most played shows
         * @description #### &#128196; Pagination &#10024; Extended Info &#127898; Filters
         *
         *     Returns the most played (a single user can watch multiple episodes multiple times) shows in the specified time `period`, defaulting to `weekly`. All stats are relative to the specific time `period`.
         */
        get: operations["Get the most played shows"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/watched/{period}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get the most watched shows
         * @description #### &#128196; Pagination &#10024; Extended Info &#127898; Filters
         *
         *     Returns the most watched (unique users) shows in the specified time `period`, defaulting to `weekly`. All stats are relative to the specific time `period`.
         */
        get: operations["Get the most watched shows"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/collected/{period}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get the most collected shows
         * @description #### &#128196; Pagination &#10024; Extended Info &#127898; Filters
         *
         *     Returns the most collected (unique users) shows in the specified time `period`, defaulting to `weekly`. All stats are relative to the specific time `period`.
         */
        get: operations["Get the most collected shows"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/anticipated": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get the most anticipated shows
         * @description #### &#128196; Pagination &#10024; Extended Info &#127898; Filters
         *
         *     Returns the most anticipated shows based on the number of lists a show appears on.
         */
        get: operations["Get the most anticipated shows"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/updates/{start_date}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get recently updated shows
         * @description #### &#128196; Pagination &#10024; Extended Info
         *
         *     Returns all shows updated since the specified UTC date and time. We recommended storing the `X-Start-Date` header you can be efficient using this method moving forward. By default, `10` results are returned. You can send a `limit` to get up to `100` results per page.
         *
         *     > ### ☣️ 🅸🅼🅿🅾🆁🆃🅰🅽🆃
         *     > _The `start_date` is only accurate to the hour, for caching purposes. Please drop the minutes and seconds from your timestamp to help optimize our cached data. For example, use `2021-07-17T12:00:00Z` and not `2021-07-17T12:23:34Z`._
         *
         *     > ### 🅽🅾🆃🅴
         *     > _The `start_date` can only be a maximum of 30 days in the past._
         */
        get: operations["Get recently updated shows"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/updates/id/{start_date}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get recently updated show Trakt IDs
         * @description #### &#128196; Pagination
         *
         *     Returns all show Trakt IDs updated since the specified UTC date and time. We recommended storing the `X-Start-Date` header you can be efficient using this method moving forward. By default, `10` results are returned. You can send a `limit` to get up to `100` results per page.
         *
         *     > ### ☣️ 🅸🅼🅿🅾🆁🆃🅰🅽🆃
         *     > _The `start_date` is only accurate to the hour, for caching purposes. Please drop the minutes and seconds from your timestamp to help optimize our cached data. For example, use `2021-07-17T12:00:00Z` and not `2021-07-17T12:23:34Z`._
         *
         *     > ### 🅽🅾🆃🅴
         *     > _The `start_date` can only be a maximum of 30 days in the past._
         */
        get: operations["Get recently updated show Trakt IDs"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a single show
         * @description #### &#10024; Extended Info
         *
         *     Returns a single shows's details. If you request extended info, the `airs` object is relative to the show's country. You can use the `day`, `time`, and `timezone` to construct your own date then convert it to whatever timezone your user is in.
         *
         *     > ### 🅽🅾🆃🅴
         *     > _When getting `full` extended info, the `status` field can have a value of `returning series` (airing right now),  `continuing` (airing right now), `in production` (airing soon), `planned` (in development), `upcoming` (in development),  `pilot`, `canceled`, or `ended`._
         */
        get: operations["Get a single show"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/{id}/aliases": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get all show aliases
         * @description Returns all title aliases for a show.  Includes country where name is different.
         */
        get: operations["Get all show aliases"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/{id}/certifications": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get all show certifications
         * @description Returns all content certifications for a show, including the country.
         */
        get: operations["Get all show certifications"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/{id}/translations/{language}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get all show translations
         * @description Returns all translations for a show, including language and translated values for title and overview.
         */
        get: operations["Get all show translations"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/{id}/comments/{sort}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get all show comments
         * @description #### &#128275; OAuth Optional &#128196; Pagination &#128513; Emojis
         *
         *     Returns all top level comments for a show. By default, the `newest` comments are returned first. Other sorting options include `oldest`, most `likes`, most `replies`, `highest` rated, `lowest` rated, most `plays`, and highest `watched` percentage.
         *
         *     > ### 🅽🅾🆃🅴
         *     > _If you send OAuth, comments from blocked users will be automatically filtered out._
         */
        get: operations["Get all show comments"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/{id}/lists/{type}/{sort}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get lists containing this show
         * @description #### &#128196; Pagination &#128513; Emojis
         *
         *     Returns all lists that contain this show. By default, `personal` lists are returned sorted by the most `popular`.
         */
        get: operations["Get lists containing this show"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/{id}/progress/collection": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get show collection progress
         * @description #### &#128274; OAuth Required
         *
         *     Returns collection progress for a show including details on all aired seasons and episodes. The `next_episode` will be the next episode the user should collect, if there are no upcoming episodes it will be set to `null`.
         *
         *     By default, any hidden seasons will be removed from the response and stats. To include these and adjust the completion stats, set the `hidden` flag to `true`.
         *
         *     By default, specials will be excluded from the response. Set the `specials` flag to `true` to include season 0 and adjust the stats accordingly. If you'd like to include specials, but not adjust the stats, set `count_specials` to `false`.
         *
         *     By default, the `last_episode` and `next_episode` are calculated using the last `aired` episode the user has collected, even if they've collected older episodes more recently. To use their last collected episode for these calculations, set the `last_activity` flag to `collected`.
         *
         *     > ### 🅽🅾🆃🅴
         *     > _Only aired episodes are used to calculate progress. Episodes in the future or without an air date are ignored._
         */
        get: operations["Get show collection progress"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/{id}/progress/watched": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get show watched progress
         * @description #### &#128274; OAuth Required
         *
         *     Returns watched progress for a show including details on all aired seasons and episodes. The `next_episode` will be the next episode the user should watch, if there are no upcoming episodes it will be set to `null`. If not `null`, the `reset_at` date is when the user started re-watching the show. Your app can adjust the progress by ignoring episodes with a `last_watched_at` prior to the `reset_at`.
         *
         *     By default, any hidden seasons will be removed from the response and stats. To include these and adjust the completion stats, set the `hidden` flag to `true`.
         *
         *     By default, specials will be excluded from the response. Set the `specials` flag to `true` to include season 0 and adjust the stats accordingly. If you'd like to include specials, but not adjust the stats, set `count_specials` to `false`.
         *
         *     By default, the `last_episode` and `next_episode` are calculated using the last `aired` episode the user has watched, even if they've watched older episodes more recently. To use their last watched episode for these calculations, set the `last_activity` flag to `watched`.
         *
         *     > ### 🅽🅾🆃🅴
         *     > _Only aired episodes are used to calculate progress. Episodes in the future or without an air date are ignored._
         */
        get: operations["Get show watched progress"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/{id}/progress/watched/reset": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Reset show progress
         * @description #### 🔥 VIP Only &#128274; OAuth Required
         *
         *     Reset a show's progress when the user started re-watching the show. You can optionally specify the `reset_at` date to have it calculate progress from that specific date onwards.
         */
        post: operations["Reset show progress"];
        /**
         * Undo reset show progress
         * @description #### 🔥 VIP Only &#128274; OAuth Required
         *
         *     Undo the reset and have watched progress use all watched history for the show.
         */
        delete: operations["Undo reset show progress"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/{id}/people": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get all people for a show
         * @description #### &#10024; Extended Info
         *
         *     Returns all `cast` and `crew` for a show, including the `episode_count` for which they appears. Each `cast` member will have a `characters` array and a standard `person` object.
         *
         *     The `crew` object will be broken up by department into `production`, `art`, `crew`, `costume & make-up`, `directing`, `writing`, `sound`, `camera`, `visual effects`, `lighting`, `editing`, and `created  by` (if there are people for those crew positions). Each of those members will have a `jobs` array and a standard `person` object.
         *
         *     #### Guest Stars
         *
         *     If you add `?extended=guest_stars` to the URL, it will return all guest stars that appeared in at least 1 episode of the show.
         *
         *     > ### 🅽🅾🆃🅴
         *     > _This returns a lot of data, so please only use this extended parameter if you actually need it!_
         */
        get: operations["Get all people for a show"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/{id}/ratings": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get show ratings
         * @description Returns rating (between 0 and 10) and distribution for a show.
         */
        get: operations["Get show ratings"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/{id}/related": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get related shows
         * @description #### &#128196; Pagination &#10024; Extended Info
         *
         *     Returns related and similar shows.
         */
        get: operations["Get related shows"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/{id}/stats": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get show stats
         * @description Returns lots of show stats.
         */
        get: operations["Get show stats"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/{id}/studios": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get show studios
         * @description Returns all studios for a show.
         */
        get: operations["Get show studios"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/{id}/watching": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get users watching right now
         * @description #### &#10024; Extended Info
         *
         *     Returns all users watching this show right now.
         */
        get: operations["Get users watching right now 1"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/{id}/next_episode": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get next episode
         * @description #### &#10024; Extended Info
         *
         *     Returns the next scheduled to air episode. If no episode is found, a `204` HTTP status code will be returned.
         */
        get: operations["Get next episode"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/{id}/last_episode": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get last episode
         * @description #### &#10024; Extended Info
         *
         *     Returns the most recently aired episode. If no episode is found, a `204` HTTP status code will be returned.
         */
        get: operations["Get last episode"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/{id}/refresh": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Refresh show metadata
         * @description #### 🔥 VIP Only &#128274; OAuth Required
         *
         *     Queue this show for a full metadata and image refresh. It might take up to 8 hours for the updated metadata to be availabe through the API.
         *
         *     > ### 🅽🅾🆃🅴
         *     > _If this show is already queued, a `409` HTTP status code will returned._
         */
        post: operations["Refresh show metadata"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/{id}/seasons": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get all seasons for a show
         * @description #### &#10024; Extended Info
         *
         *     Returns all seasons for a show including the number of episodes in each season.
         *
         *     #### Episodes
         *
         *     If you add `?extended=episodes` to the URL, it will return all episodes for all seasons.
         *
         *     > ### 🅽🅾🆃🅴
         *     > _This returns a lot of data, so please only use this extended parameter if you actually need it!_
         */
        get: operations["Get all seasons for a show"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/{id}/seasons/{season}/info": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get single seasons for a show
         * @description #### &#10024; Extended Info
         *
         *     Returns a single seasons for a show.
         */
        get: operations["Get single seasons for a show"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/{id}/seasons/{season}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get all episodes for a single season
         * @description #### &#10024; Extended Info
         *
         *     Returns all episodes for a specific season of a show.
         *
         *     #### Translations
         *
         *     If you'd like to included translated episode titles and overviews in the response, include the `translations` parameter in the URL. Include all languages by setting the parameter to `all` or use a specific 2 digit country language code to further limit it.
         *
         *     > ### 🅽🅾🆃🅴
         *     > _This returns a lot of data, so please only use this extended parameter if you actually need it!_
         */
        get: operations["Get all episodes for a single season"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/{id}/seasons/{season}/translations/{language}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get all season translations
         * @description Returns all translations for an season, including language and translated values for title and overview.
         */
        get: operations["Get all season translations"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/{id}/seasons/{season}/comments/{sort}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get all season comments
         * @description #### &#128275; OAuth Optional &#128196; Pagination &#128513; Emojis
         *
         *     Returns all top level comments for a season. By default, the `newest` comments are returned first. Other sorting options include `oldest`, most `likes`, most `replies`, `highest` rated, `lowest` rated, most `plays`, and highest `watched` percentage.
         *
         *     > ### 🅽🅾🆃🅴
         *     > _If you send OAuth, comments from blocked users will be automatically filtered out._
         */
        get: operations["Get all season comments"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/{id}/seasons/{season}/lists/{type}/{sort}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get lists containing this season
         * @description #### &#128196; Pagination &#128513; Emojis
         *
         *     Returns all lists that contain this season. By default, `personal` lists are returned sorted by the most `popular`.
         */
        get: operations["Get lists containing this season"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/{id}/seasons/{season}/people": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get all people for a season
         * @description #### &#10024; Extended Info
         *
         *     Returns all `cast` and `crew` for a season, including the `episode_count` for which they appear. Each `cast` member will have a `characters` array and a standard `person` object.
         *
         *     The `crew` object will be broken up by department into `production`, `art`, `crew`, `costume & make-up`, `directing`, `writing`, `sound`, `camera`, `visual effects`, `lighting`, and `editing` (if there are people for those crew positions).. Each of those members will have a `jobs` array and a standard `person` object.
         *
         *     #### Guest Stars
         *
         *     If you add `?extended=guest_stars` to the URL, it will return all guest stars that appeared in at least 1 episode of the season.
         *
         *     > ### 🅽🅾🆃🅴
         *     > _This returns a lot of data, so please only use this extended parameter if you actually need it!_
         */
        get: operations["Get all people for a season"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/{id}/seasons/{season}/ratings": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get season ratings
         * @description Returns rating (between 0 and 10) and distribution for a season.
         */
        get: operations["Get season ratings"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/{id}/seasons/{season}/stats": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get season stats
         * @description Returns lots of season stats.
         */
        get: operations["Get season stats"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/{id}/seasons/{season}/watching": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get users watching right now
         * @description #### &#10024; Extended Info
         *
         *     Returns all users watching this season right now.
         */
        get: operations["Get users watching right now 2"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/{id}/seasons/{season}/episodes/{episode}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a single episode for a show
         * @description #### &#10024; Extended Info
         *
         *     Returns a single episode's details. All date and times are in UTC and were calculated using the episode's `air_date` and show's `country` and `air_time`.
         *
         *     > ### 🅽🅾🆃🅴
         *     > _If the `first_aired` is unknown, it will be set to `null`._
         *
         *     > ### 🅽🅾🆃🅴
         *     > _When getting `full` extended info, the `episode_type` field can have a value of `standard`, `series_premiere` (season 1, episode 1), `season_premiere` (episode 1), `mid_season_finale`, `mid_season_premiere` (the next episode after the mid season finale), `season_finale`, or `series_finale` (last episode to air for an ended show)._
         */
        get: operations["Get a single episode for a show"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/{id}/seasons/{season}/episodes/{episode}/translations/{language}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get all episode translations
         * @description Returns all translations for an episode, including language and translated values for title and overview.
         */
        get: operations["Get all episode translations"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/{id}/seasons/{season}/episodes/{episode}/comments/{sort}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get all episode comments
         * @description #### &#128275; OAuth Optional &#128196; Pagination &#128513; Emojis
         *
         *     Returns all top level comments for an episode. By default, the `newest` comments are returned first. Other sorting options include `oldest`, most `likes`, most `replies`, `highest` rated, `lowest` rated, and most `plays`.
         *
         *     > ### 🅽🅾🆃🅴
         *     > _If you send OAuth, comments from blocked users will be automatically filtered out._
         */
        get: operations["Get all episode comments"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/{id}/seasons/{season}/episodes/{episode}/lists/{type}/{sort}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get lists containing this episode
         * @description #### &#128196; Pagination &#128513; Emojis
         *
         *     Returns all lists that contain this episode. By default, `personal` lists are returned sorted by the most `popular`.
         */
        get: operations["Get lists containing this episode"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/{id}/seasons/{season}/episodes/{episode}/people": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get all people for an episode
         * @description #### &#10024; Extended Info
         *
         *     Returns all `cast` and `crew` for an episode. Each `cast` member will have a `characters` array and a standard `person` object.
         *
         *     The `crew` object will be broken up by department into `production`, `art`, `crew`, `costume & make-up`, `directing`, `writing`, `sound`, `camera`, `visual effects`, `lighting`, and `editing` (if there are people for those crew positions). Each of those members will have a `jobs` array and a standard `person` object.
         *
         *     #### Guest Stars
         *
         *     If you add `?extended=guest_stars` to the URL, it will return all guest stars that appeared in the episode.
         *
         *     > ### 🅽🅾🆃🅴
         *     > _This returns a lot of data, so please only use this extended parameter if you actually need it!_
         */
        get: operations["Get all people for an episode"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/{id}/seasons/{season}/episodes/{episode}/ratings": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get episode ratings
         * @description Returns rating (between 0 and 10) and distribution for an episode.
         */
        get: operations["Get episode ratings"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/{id}/seasons/{season}/episodes/{episode}/stats": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get episode stats
         * @description Returns lots of episode stats.
         */
        get: operations["Get episode stats"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/shows/{id}/seasons/{season}/episodes/{episode}/watching": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get users watching right now
         * @description #### &#10024; Extended Info
         *
         *     Returns all users watching this episode right now.
         */
        get: operations["Get users watching right now 3"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sync/last_activities": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get last activity
         * @description #### &#128274; OAuth Required
         *
         *     This method is a useful first step in the syncing process. We recommended caching these dates locally, then you can compare to know exactly what data has changed recently. This can greatly optimize your syncs so you don't pull down a ton of data only to see nothing has actually changed.
         *
         *     #### Account
         *
         *     `settings_at` is set when the OAuth user updates any of their Trakt settings on the website. `followed_at` is set when another Trakt user follows or unfollows the OAuth user. `following_at` is set when the OAuth user follows or unfollows another Trakt user. `pending_at` is set when the OAuth user follows a private account, which requires their approval. `requested_at` is set when the OAuth user has a private account and someone requests to follow them.
         */
        get: operations["Get last activity"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sync/playback/{type}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get playback progress
         * @description #### &#128274; OAuth Required &#128196; Pagination Optional
         *
         *     Whenever a scrobble is paused, the playback progress is saved. Use this progress to sync up playback across different media centers or apps. For example, you can start watching a movie in a media center, stop it, then resume on your tablet from the same spot. Each item will have the `progress` percentage between 0 and 100.
         *
         *     You can optionally specify a `type` to only get `movies` or `episodes`.
         *
         *     By default, all results will be returned. Pagination is optional and can be used for something like an "on deck" feature, or if you only need a limited data set.
         *
         *     > ### 🅽🅾🆃🅴
         *     > _We only save playback progress for the last 6 months._
         */
        get: operations["Get playback progress"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sync/playback/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /**
         * Remove a playback item
         * @description #### &#128274; OAuth Required
         *
         *     Remove a playback item from a user's playback progress list. A `404` will be returned if the `id` is invalid.
         */
        delete: operations["Remove a playback item"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sync/collection/{type}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get collection
         * @description #### &#128274; OAuth Required &#10024; Extended Info
         *
         *     Get all collected items in a user's collection. A collected item indicates availability to watch digitally or on physical media.
         *
         *     Each `movie` object contains `collected_at` and `updated_at` timestamps. Since users can set custom dates when they collected movies, it is possible for `collected_at` to be in the past. We also include `updated_at` to help sync Trakt data with your app. Cache this timestamp locally and only re-process the movie if you see a newer timestamp.
         *
         *     Each `show` object contains `last_collected_at` and `last_updated_at` timestamps. Since users can set custom dates when they collected episodes, it is possible for `last_collected_at` to be in the past. We also include `last_updated_at` to help sync Trakt data with your app. Cache this timestamp locally and only re-process the show if you see a newer timestamp.
         *
         *     If you add `?extended=metadata` to the URL, it will return the additional `media_type`, `resolution`, `hdr`, `audio`, `audio_channels` and '3d' metadata. It will use `null` if the metadata isn't set for an item.
         */
        get: operations["Get collection"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sync/collection": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Add items to collection
         * @description #### &#128274; OAuth Required
         *
         *     Add items to a user's collection. Accepts shows, seasons, episodes and movies. If only a show is passed, all episodes for the show will be collected. If seasons are specified, all episodes in those seasons will be collected.
         *
         *     Send a `collected_at` UTC datetime to mark items as collected in the past. You can also send additional metadata about the media itself to have a very accurate collection. Showcase what is available to watch from your epic HD DVD collection down to your downloaded iTunes movies.
         *
         *     > ### 🅽🅾🆃🅴
         *     > _You can resend items already in your collection and they will be updated with any new values. This includes the `collected_at` and any other metadata._
         *
         *     #### JSON POST Data
         *
         *     | Key | Type | Value |
         *     |---|---|---|
         *     | `movies` | array | Array of `movie` objects. (see examples &#8594;) |
         *     | `shows` | array | Array of `show` objects. |
         *     | `seasons` | array | Array of `season` objects. |
         *     | `episodes` | array | Array of `episode` objects. |
         *
         *     #### Media Object POST Data
         *
         *     | Key | Type | Value |
         *     |---|---|---|
         *     | item <span style="color:red;">*</a> | object | `movie`, `show`, or `episode` object. |
         *     | `collected_at` | datetime | UTC datetime when the item was collected. Set to `released` to automatically use the inital release date + runtime *(episodes only)*). |
         *     | `media_type` | string | Set to `digital`, `bluray`, `hddvd`, `dvd`, `vcd`, `vhs`, `betamax`, or `laserdisc`. |
         *     | `resolution` | string | Set to `uhd_4k`, `hd_1080p`, `hd_1080i`, `hd_720p`, `sd_480p`, `sd_480i`, `sd_576p`, or `sd_576i`. |
         *     | `hdr` | string | Set to `dolby_vision`, `hdr10`, `hdr10_plus`, or `hlg`. |
         *     | `audio` | string | Set to `dolby_digital`, `dolby_digital_plus`, `dolby_digital_plus_atmos`, `dolby_truehd`, `dolby_atmos` *(Dolby TrueHD Atmos)*, `dolby_prologic`, `dts`, `dts_ma`, `dts_hr`, `dts_x`, `auro_3d`, `mp3`, `mp2`, `aac`, `lpcm`, `ogg` *(Ogg Vorbis)*, `ogg_opus`, `wma`, or `flac`. |
         *     | `audio_channels` | string | Set to `1.0`, `2.0`, `2.1`, `3.0`, `3.1`, `4.0`, `4.1`, `5.0`, `5.1`, `5.1.2`, `5.1.4`, `6.1`, `7.1`, `7.1.2`, `7.1.4`, `9.1`, or `10.1` |
         *     | `3d` | boolean | Set `true` if in 3D. |
         */
        post: operations["Add items to collection"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sync/collection/remove": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Remove items from collection
         * @description #### &#128274; OAuth Required
         *
         *     Remove one or more items from a user's collection.
         *
         *     #### JSON POST Data
         *
         *     | Key | Type | Value |
         *     |---|---|---|
         *     | `movies` | array | Array of `movie` objects. (see examples &#8594;) |
         *     | `shows` | array | Array of `show` objects. |
         *     | `seasons` | array | Array of `season` objects. |
         *     | `episodes` | array | Array of `episode` objects. |
         */
        post: operations["Remove items from collection"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sync/watched/{type}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get watched
         * @description #### &#128274; OAuth Required &#10024; Extended Info
         *
         *     Returns all movies or shows a user has watched sorted by most plays.
         *
         *     If `type` is set to _shows_ and you add `?extended=noseasons` to the URL, it won't return season or episode info.
         *
         *     Each `movie` and `show` object contains `last_watched_at` and `last_updated_at` timestamps. Since users can set custom dates when they watched movies and episodes, it is possible for `last_watched_at` to be in the past. We also include `last_updated_at` to help sync Trakt data with your app. Cache this timestamp locally and only re-process the movies and shows if you see a newer timestamp.
         *
         *     Each `show` object contains a `reset_at` timestamp. If not `null`, this is when the user started re-watching the show. Your app can adjust the progress by ignoring episodes with a `last_watched_at` prior to the `reset_at`.
         */
        get: operations["Get watched"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sync/history/{type}/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get watched history
         * @description #### &#128274; OAuth Required &#128196; Pagination &#10024; Extended Info
         *
         *     Returns movies and episodes that a user has watched, sorted by most recent. You can optionally limit the `type` to `movies` or `episodes`. The `id` _(64-bit integer)_ in each history item uniquely identifies the event and can be used to remove individual events by using the [**\/sync/history/remove**](#reference/sync/remove-from-history/get-watched-history) method. The `action` will be set to `scrobble`, `checkin`, or `watch`.
         *
         *     Specify a `type` and trakt `id` to limit the history for just that item. If the `id` is valid, but there is no history, an empty array will be returned.
         *
         *     | Example URL | Returns watches for... |
         *     |---|---|
         *     | `/history/movies/12601` | TRON: Legacy |
         *     | `/history/shows/1388` | All episodes of Breaking Bad |
         *     | `/history/seasons/3950` | All episodes of Breaking Bad: Season 1 |
         *     | `/history/episodes/73482` | Only episode 1 of Breaking Bad: Season 1 |
         */
        get: operations["Get watched history"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sync/history": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Add items to watched history
         * @description #### &#128274; OAuth Required
         *
         *     Add items to a user's watch history. Accepts shows, seasons, episodes and movies. If only a show is passed, all episodes for the show will be added. If seasons are specified, only episodes in those seasons will be added.
         *
         *     Send a `watched_at` UTC datetime to mark items as watched in the past. This is useful for syncing past watches from a media center.
         *
         *     > ### ☣️ 🅸🅼🅿🅾🆁🆃🅰🅽🆃
         *     > _Please be careful with sending duplicate data. We don't verify the `item` + `watched_at` to ensure it's unique, it is up to your app to veify this and not send duplicate plays._
         *
         *     #### JSON POST Data
         *
         *     | Key | Type | Value |
         *     |---|---|---|
         *     | `movies` | array | Array of `movie` objects. (see examples &#8594;) |
         *     | `shows` | array | Array of `show` objects. |
         *     | `seasons` | array | Array of `season` objects. |
         *     | `episodes` | array | Array of `episode` objects. |
         *
         *     #### Media Object POST Data
         *
         *     | Key | Type | Value |
         *     |---|---|---|
         *     | item <span style="color:red;">*</a> | object | `movie`, `show`, or `episode` object. |
         *     | `watched_at` | datetime | UTC datetime when the item was watched. Set to `released` to automatically use the initial release date + runtime *(episodes only)*. |
         */
        post: operations["Add items to watched history"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sync/history/remove": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Remove items from history
         * @description #### &#128274; OAuth Required
         *
         *     Remove items from a user's watch history including all watches, scrobbles, and checkins. Accepts shows, seasons, episodes and movies. If only a show is passed, all episodes for the show will be removed. If seasons are specified, only episodes in those seasons will be removed.
         *
         *     You can also send a list of raw history `ids` _(64-bit integers)_ to delete single plays from the watched history. The [**\/sync/history**](#reference/sync/get-history) method will return an individual `id` _(64-bit integer)_ for each history item.
         *
         *     #### JSON POST Data
         *
         *     | Key | Type | Value |
         *     |---|---|---|
         *     | `movies` | array | Array of `movie` objects. (see examples &#8594;) |
         *     | `shows` | array | Array of `show` objects. |
         *     | `seasons` | array | Array of `season` objects. |
         *     | `episodes` | array | Array of `episode` objects. |
         *     | `ids` | array | Array of history ids. |
         */
        post: operations["Remove items from history"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sync/ratings/{type}/{rating}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get ratings
         * @description #### &#128274; OAuth Required &#128196; Pagination Optional &#10024; Extended Info
         *
         *     Get a user's ratings filtered by `type`. You can optionally filter for a specific `rating` between 1 and 10. Send a comma separated string for `rating` if you need multiple ratings.
         */
        get: operations["Get ratings"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sync/ratings": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Add new ratings
         * @description #### &#128274; OAuth Required
         *
         *     Rate one or more items. Accepts shows, seasons, episodes and movies. If only a show is passed, only the show itself will be rated. If seasons are specified, all of those seasons will be rated.
         *
         *     Send a `rated_at` UTC datetime to mark items as rated in the past. This is useful for syncing ratings from a media center.
         *
         *     #### JSON POST Data
         *
         *     | Key | Type | Value |
         *     |---|---|---|
         *     | `movies` | array | Array of `movie` objects. (see examples &#8594;) |
         *     | `shows` | array | Array of `show` objects. |
         *     | `seasons` | array | Array of `season` objects. |
         *     | `episodes` | array | Array of `episode` objects. |
         *
         *     #### Media Object POST Data
         *
         *     | Key | Type | Value |
         *     |---|---|---|
         *     | item <span style="color:red;">*</a> | object | `movie`, `show`, `season`, or `episode` object. |
         *     | `rating` <span style="color:red;">*</a> | integer | Between 1 and 10. |
         *     | `rated_at` | datetime | UTC datetime when the item was rated. |
         */
        post: operations["Add new ratings"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sync/ratings/remove": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Remove ratings
         * @description #### &#128274; OAuth Required
         *
         *     Remove ratings for one or more items.
         *
         *     #### JSON POST Data
         *
         *     | Key | Type | Value |
         *     |---|---|---|
         *     | `movies` | array | Array of `movie` objects. (see examples &#8594;) |
         *     | `shows` | array | Array of `show` objects. |
         *     | `seasons` | array | Array of `season` objects. |
         *     | `episodes` | array | Array of `episode` objects. |
         */
        post: operations["Remove ratings"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sync/watchlist/{type}/{sort}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get watchlist
         * @description #### &#128274; OAuth Required &#128196; Pagination Optional &#10024; Extended Info &#128513; Emojis
         *
         *     Returns all items in a user's watchlist filtered by type.
         *
         *     #### Notes
         *
         *     Each watchlist item contains a `notes` field with text entered by the user.
         *
         *     #### Sorting Headers
         *
         *     By default, all list items are sorted by `rank` `asc`. We send `X-Applied-Sort-By` and `X-Applied-Sort-How` headers to indicate how the results are actually being sorted.
         *
         *     We also send `X-Sort-By` and `X-Sort-How` headers which indicate the user's sort preference. Use these to to custom sort the watchlist _**in your app**_ for more advanced sort abilities we can't do in the API. Values for `X-Sort-By` include `rank`, `added`, `title`, `released`, `runtime`, `popularity`, `percentage`, and `votes`. Values for `X-Sort-How` include `asc` and `desc`.
         *
         *     #### Auto Removal
         *
         *     When an item is watched, it will be automatically removed from the watchlist. For shows and seasons, watching 1 episode will remove the entire show or season.
         *
         *     _**The watchlist should not be used as a list of what the user is actively watching.**_
         *
         *     Use a combination of the [**\/sync/watched**](/reference/sync/get-watched) and [**\/shows/:id/progress**](/reference/shows/watched-progress) methods to get what the user is actively watching.
         */
        get: operations["Get watchlist"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sync/watchlist": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Update watchlist
         * @description #### &#128274; OAuth Required
         *
         *     Update the watchlist by sending 1 or more parameters.
         *
         *     #### JSON POST Data
         *
         *     | Key | Type | Value |
         *     |---|---|---|---|
         *     | `description` | string | Description for the watchlist. |
         *     | `sort_by` | string | `rank`, `added`, `title`, `released`, `runtime`, `popularity`, `percentage`, `votes`, `my_rating`, `random`, `watched`, `collected` |
         *     | `sort_how` | string | `asc`, `desc` |
         */
        put: operations["Update watchlist"];
        /**
         * Add items to watchlist
         * @description #### 🔥 VIP Enhanced &#128274; OAuth Required &#128513; Emojis
         *
         *     Add one of more items to a user's watchlist. Accepts shows, seasons, episodes and movies. If only a show is passed, only the show itself will be added. If seasons are specified, all of those seasons will be added.
         *
         *     #### Notes
         *
         *     Each watchlist item can optionally accept a `notes` *(500 maximum characters)* field with custom text. The user must be a [**Trakt VIP**](https://trakt.tv/vip) to send `notes`.
         *
         *     #### Limits
         *
         *     If the user's watchlist limit is exceeded, a `420` HTTP error code is returned. Use the [**\/users/settings**](/reference/users/settings) method to get all limits for a user account. In most cases, upgrading to [**Trakt VIP**](https://trakt.tv/vip) will increase the limits.
         *
         *     #### JSON POST Data
         *
         *     | Key | Type | Value |
         *     |---|---|---|
         *     | `movies` | array | Array of `movie` objects. (see examples &#8594;) |
         *     | `shows` | array | Array of `show` objects. |
         *     | `seasons` | array | Array of `season` objects. |
         *     | `episodes` | array | Array of `episode` objects. |
         */
        post: operations["Add items to watchlist"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sync/watchlist/remove": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Remove items from watchlist
         * @description #### &#128274; OAuth Required
         *
         *     Remove one or more items from a user's watchlist.
         *
         *     #### JSON POST Data
         *
         *     | Key | Type | Value |
         *     |---|---|---|
         *     | `movies` | array | Array of `movie` objects. (see examples &#8594;) |
         *     | `shows` | array | Array of `show` objects. |
         *     | `seasons` | array | Array of `season` objects. |
         *     | `episodes` | array | Array of `episode` objects. |
         */
        post: operations["Remove items from watchlist"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sync/watchlist/reorder": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Reorder watchlist items
         * @description #### &#128274; OAuth Required
         *
         *     Reorder all items on a user's watchlist by sending the updated `rank` of list item ids. Use the [**\/sync/watchlist**](#reference/sync/get-watchlist) method to get all list item ids.
         */
        post: operations["Reorder watchlist items"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sync/watchlist/{list_item_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Update a watchlist item
         * @description #### 🔥 VIP Only &#128274; OAuth Required &#128513; Emojis
         *
         *     Update the `notes` on a single watchlist item.
         */
        put: operations["Update a watchlist item"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sync/favorites/{type}/{sort}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get favorites
         * @description #### &#128274; OAuth Required &#128196; Pagination Optional &#10024; Extended Info &#128513; Emojis
         *
         *     If the user only had 50 TV shows and movies to bring with them on a deserted island, what would they be? These favorites are used to enchance Trakt's social recommendation algorithm. Apps should encourage user's to add favorites so the algorithm keeps getting better.
         *
         *     #### Notes
         *
         *     Each favorite contains a `notes` field explaining why the user favorited the item.
         */
        get: operations["Get favorites"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sync/favorites": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Update favorites
         * @description #### &#128274; OAuth Required
         *
         *     Update the favorites list by sending 1 or more parameters.
         *
         *     #### JSON POST Data
         *
         *     | Key | Type | Value |
         *     |---|---|---|---|
         *     | `description` | string | Description for the favorites list. |
         *     | `sort_by` | string | `rank`, `added`, `title`, `released`, `runtime`, `popularity`, `percentage`, `votes`, `my_rating`, `random`, `watched`, `collected` |
         *     | `sort_how` | string | `asc`, `desc` |
         */
        put: operations["Update favorites"];
        /**
         * Add items to favorites
         * @description #### &#128274; OAuth Required &#128513; Emojis
         *
         *     If the user only had 50 TV shows and movies to bring with them on a deserted island, what would they be? These favorites are used to enchance Trakt's social recommendation algorithm. Apps should encourage user's to add favorites so the algorithm keeps getting better.
         *
         *     #### Notes
         *
         *     Each favorite can optionally accept a `notes` *(500 maximum characters)* field explaining why the user favorited the item.
         *
         *     #### Limits
         *
         *     If the user has favorited 50 items already, a `420` HTTP error code is returned. This limit applies to all users.
         *
         *     #### JSON POST Data
         *
         *     | Key | Type | Value |
         *     |---|---|---|
         *     | `movies` | array | Array of `movie` objects. (see examples &#8594;) |
         *     | `shows` | array | Array of `show` objects. |
         */
        post: operations["Add items to favorites"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sync/favorites/remove": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Remove items from favorites
         * @description #### &#128274; OAuth Required
         *
         *     Remove items from a user's favorites. These favorites are used to enchance Trakt's social recommendation algorithm. Apps should encourage user's to add favorites so the algorithm keeps getting better.
         *
         *     #### JSON POST Data
         *
         *     | Key | Type | Value |
         *     |---|---|---|
         *     | `movies` | array | Array of `movie` objects. (see examples &#8594;) |
         *     | `shows` | array | Array of `show` objects. |
         */
        post: operations["Remove items from favorites"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sync/favorites/reorder": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Reorder favorited items
         * @description #### &#128274; OAuth Required
         *
         *     Reorder all items on a user's favorites by sending the updated `rank` of list item ids. Use the [**\/sync/favorites**](#reference/sync/get-favorites) method to get all list item ids.
         */
        post: operations["Reorder favorited items"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sync/favorites/{list_item_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Update a favorite item
         * @description #### &#128274; OAuth Required &#128513; Emojis
         *
         *     Update the `notes` on a single favorite item.
         */
        put: operations["Update a favorite item"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/settings": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieve settings
         * @description #### &#128274; OAuth Required
         *
         *     Get the user's settings so you can align your app's experience with what they're used to on the trakt website. A globally unique `uuid` is also returned, which can be used to identify the user locally in your app if needed. However, the `uuid` can't be used to retrieve data from the Trakt API.
         */
        get: operations["Retrieve settings"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/requests/following": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get pending following requests
         * @description #### &#128274; OAuth Required &#10024; Extended Info
         *
         *     List a user's pending following requests that they're waiting for the other user's to approve.
         */
        get: operations["Get pending following requests"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/requests": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get follow requests
         * @description #### &#128274; OAuth Required &#10024; Extended Info
         *
         *     List a user's pending follow requests so they can either approve or deny them.
         */
        get: operations["Get follow requests"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/requests/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Approve follow request
         * @description #### &#128274; OAuth Required
         *
         *     Approve a follower using the `id` of the request. If the `id` is not found, was already approved, or was already denied, a `404` error will be returned.
         */
        post: operations["Approve follow request"];
        /**
         * Deny follow request
         * @description #### &#128274; OAuth Required
         *
         *     Deny a follower using the `id` of the request. If the `id` is not found, was already approved, or was already denied, a `404` error will be returned.
         */
        delete: operations["Deny follow request"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/saved_filters/{section}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get saved filters
         * @description #### 🔥 VIP Only &#128274; OAuth Required &#128196; Pagination
         *
         *     Get all saved filters a user has created. The `path` and `query` can be used to construct an API path to retrieve the saved data. Think of this like a dynamically updated list.
         */
        get: operations["Get saved filters"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/hidden/{section}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get hidden items
         * @description #### &#128274; OAuth Required &#128196; Pagination &#10024; Extended Info
         *
         *     Get hidden items for a section. This will return an array of standard media objects. You can optionally limit the `type` of results to return.
         */
        get: operations["Get hidden items"];
        put?: never;
        /**
         * Add hidden items
         * @description #### &#128274; OAuth Required
         *
         *     Hide items for a specific section. Here's what type of items can hidden for each section.
         *
         *     #### Hideable Media Objects
         *
         *     | Section | Objects |
         *     |---|---|---|
         *     | `calendar` | `movie`, `show` |
         *     | `progress_watched` | `show`, `season` |
         *     | `progress_collected` | `show`, `season` |
         *     | `recommendations` | `movie`, `show` |
         *     | `comments` | `user` |
         *
         *     #### JSON POST Data
         *
         *     | Key | Type | Value |
         *     |---|---|---|
         *     | `movies` | array | Array of `movie` objects. (see examples &#8594;) |
         *     | `shows` | array | Array of `show` objects. |
         *     | `seasons` | array | Array of `season` objects. |
         *     | `users` | array | Array of `user` objects. |
         */
        post: operations["Add hidden items"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/hidden/{section}/remove": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Remove hidden items
         * @description #### &#128274; OAuth Required
         *
         *     Unhide items for a specific section. Here's what type of items can unhidden for each section.
         *
         *     #### Unhideable Media Objects
         *
         *     | Section | Objects |
         *     |---|---|---|
         *     | `calendar` | `movie`, `show` |
         *     | `progress_watched` | `show`, `season` |
         *     | `progress_collected` | `show`, `season` |
         *     | `recommendations` | `movie`, `show` |
         *     | `comments` | `user` |
         *
         *     #### JSON POST Data
         *
         *     | Key | Type | Value |
         *     |---|---|---|
         *     | `movies` | array | Array of `movie` objects. (see examples &#8594;) |
         *     | `shows` | array | Array of `show` objects. |
         *     | `seasons` | array | Array of `season` objects. |
         *     | `users` | array | Array of `user` objects. |
         */
        post: operations["Remove hidden items"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get user profile
         * @description #### &#128275; OAuth Optional &#10024; Extended Info
         *
         *     Get a user's profile information. If the user is private, info will only be returned if you send OAuth and are either that user or an approved follower. Adding `?extended=vip` will return some additional VIP related fields so you can display the user's Trakt VIP status and year count.
         */
        get: operations["Get user profile"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{id}/likes/{type}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get likes
         * @description #### &#128274; OAuth Optional &#128196; Pagination
         *
         *     Get items a user likes. This will return an array of standard media objects. You can optionally limit the `type` of results to return.
         *
         *     #### Comment Media Objects
         *
         *     If you add `?extended=comments` to the URL, it will return media objects for each comment like.
         *
         *     > ### 🅽🅾🆃🅴
         *     > _This returns a lot of data, so please only use this extended parameter if you actually need it!_
         */
        get: operations["Get likes"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{id}/collection/{type}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get collection
         * @description #### &#128275; OAuth Optional &#10024; Extended Info
         *
         *     Get all collected items in a user's collection. A collected item indicates availability to watch digitally or on physical media.
         *
         *     Each `movie` object contains `collected_at` and `updated_at` timestamps. Since users can set custom dates when they collected movies, it is possible for `collected_at` to be in the past. We also include `updated_at` to help sync Trakt data with your app. Cache this timestamp locally and only re-process the movie if you see a newer timestamp.
         *
         *     Each `show` object contains `last_collected_at` and `last_updated_at` timestamps. Since users can set custom dates when they collected episodes, it is possible for `last_collected_at` to be in the past. We also include `last_updated_at` to help sync Trakt data with your app. Cache this timestamp locally and only re-process the show if you see a newer timestamp.
         *
         *     If you add `?extended=metadata` to the URL, it will return the additional `media_type`, `resolution`, `hdr`, `audio`, `audio_channels` and '3d' metadata. It will use `null` if the metadata isn't set for an item.
         */
        get: operations["Get collection 1"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{id}/comments/{comment_type}/{type}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get comments
         * @description #### &#128275; OAuth Optional &#128196; Pagination &#10024; Extended Info
         *
         *     Returns the most recently written comments for the user. You can optionally filter by the `comment_type` and media `type` to limit what gets returned.
         *
         *     By default, only top level comments are returned. Set `?include_replies=true` to return replies in addition to top level comments. Set `?include_replies=only` to return only replies and no top level comments.
         */
        get: operations["Get comments"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{id}/notes/{type}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get notes
         * @description #### 🅱🅴🆃🅰 🔥 VIP Only &#128275; OAuth Optional &#128196; Pagination &#10024; Extended Info
         *
         *     Returns the most recently notes for the user. You can optionally filter by media `type` to limit what gets returned. Use the `attached_to` info to know what the note is actually added to. Media items like `movie`, `show`, `season`, `episode`, or `person` are straightforward, but `history` will need to be mapped to that specific play in their watched history since they might have multiple plays. Since `collection` and `rating` is a 1:1 association, you can assume the note is attached to the media item in the `type` field that has been collected or rated.
         */
        get: operations["Get notes"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{id}/lists": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a user's personal lists
         * @description #### &#128275; OAuth Optional &#128513; Emojis
         *
         *     Returns all personal lists for a user. Use the [**\/users/:id/lists/:list_id/items**](#reference/users/list-items) method to get the actual items a specific list contains.
         */
        get: operations["Get a user's personal lists"];
        put?: never;
        /**
         * Create personal list
         * @description #### 🔥 VIP Enhanced &#128274; OAuth Required
         *
         *     Create a new personal list. The `name` is the only required field, but the other info is recommended to ask for.
         *
         *     #### Limits
         *
         *     If the user's list limit is exceeded, a `420` HTTP error code is returned. Use the [**\/users/settings**](/reference/users/settings) method to get all limits for a user account. In most cases, upgrading to [**Trakt VIP**](https://trakt.tv/vip) will increase the limits.
         *
         *     #### Privacy
         *
         *     Lists will be `private` by default. Here is what each value means.
         *
         *     | Value | Privacy impact... |
         *     |---|---|
         *     | `private` | Only you can see the list. |
         *     | `link` | Anyone with the `share_link` can see the list. |
         *     | `friends` | Only your friends can see the list. |
         *     | `public` | Anyone can see the list. |
         *
         *     #### JSON POST Data
         *
         *     | Key | Type | Default | Value |
         *     |---|---|---|---|
         *     | `name` <span style="color:red;">*</a> | string |  | Name of the list. |
         *     | `description` | string |  | Description for this list. |
         *     | `privacy` | string | `private` | `private`, `link`, `friends`, `public` |
         *     | `display_numbers` | boolean | `false` | Should each item be numbered? |
         *     | `allow_comments` | boolean | `true` | Are comments allowed? |
         *     | `sort_by` | string | `rank` | `rank`, `added`, `title`, `released`, `runtime`, `popularity`, `percentage`, `votes`, `my_rating`, `random`, `watched`, `collected` |
         *     | `sort_how` | string | `asc` | `asc`, `desc` |
         */
        post: operations["Create personal list"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{id}/lists/reorder": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Reorder a user's lists
         * @description #### &#128274; OAuth Required
         *
         *     Reorder all lists by sending the updated `rank` of list ids. Use the [**\/users/:id/lists**](#reference/users/lists) method to get all list ids.
         */
        post: operations["Reorder a user's lists"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{id}/lists/collaborations": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get all lists a user can collaborate on
         * @description #### &#128275; OAuth Optional
         *
         *     Returns all lists a user can collaborate on. This gives full access to add, remove, and re-order list items. It essentially works just like a list owned by the user, just make sure to use the correct list owner `user` when building the API URLs.
         */
        get: operations["Get all lists a user can collaborate on"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{id}/lists/{list_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get personal list
         * @description #### &#128275; OAuth Optional &#128513; Emojis
         *
         *     Returns a single personal list. Use the [**\/users/:id/lists/:list_id/items**](#reference/users/list-items) method to get the actual items this list contains.
         */
        get: operations["Get personal list"];
        /**
         * Update personal list
         * @description #### &#128274; OAuth Required
         *
         *     Update a personal list by sending 1 or more parameters. If you update the list name, the original slug will still be retained so existing references to this list won't break.
         *
         *     #### Privacy
         *
         *     Lists will be `private` by default. Here is what each value means.
         *
         *     | Value | Privacy impact... |
         *     |---|---|
         *     | `private` | Only you can see the list. |
         *     | `link` | Anyone with the `share_link` can see the list. |
         *     | `friends` | Only your friends can see the list. |
         *     | `public` | Anyone can see the list. |
         *
         *     #### JSON POST Data
         *
         *     | Key | Type | Value |
         *     |---|---|---|---|
         *     | `name` | string | Name of the list. |
         *     | `description` | string | Description for this list. |
         *     | `privacy` | string | `private`, `link`, `friends`, `public` |
         *     | `display_numbers` | boolean | Should each item be numbered? |
         *     | `allow_comments` | boolean | Are comments allowed? |
         *     | `sort_by` | string | `rank`, `added`, `title`, `released`, `runtime`, `popularity`, `percentage`, `votes`, `my_rating`, `random`, `watched`, `collected` |
         *     | `sort_how` | string | `asc`, `desc` |
         */
        put: operations["Update personal list"];
        post?: never;
        /**
         * Delete a user's personal list
         * @description #### &#128274; OAuth Required
         *
         *     Remove a personal list and all items it contains.
         */
        delete: operations["Delete a user's personal list"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{id}/lists/{list_id}/likes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get all users who liked a list
         * @description #### &#128275; OAuth Optional &#128196; Pagination
         *
         *     Returns all users who liked a list.
         */
        get: operations["Get all users who liked a list 1"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{id}/lists/{list_id}/like": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Like a list
         * @description #### &#128274; OAuth Required
         *
         *     Votes help determine popular lists. Only one like is allowed per list per user.
         */
        post: operations["Like a list 1"];
        /**
         * Remove like on a list
         * @description #### &#128274; OAuth Required
         *
         *     Remove a like on a list.
         */
        delete: operations["Remove like on a list 1"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{id}/lists/{list_id}/items/{type}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get items on a personal list
         * @description #### &#128275; OAuth Optional &#128196; Pagination Optional &#10024; Extended Info &#128513; Emojis
         *
         *     Get all items on a personal list. Items can be a `movie`, `show`, `season`, `episode`, or `person`. You can optionally specify the `type` parameter with a single value or comma delimited string for multiple item types.
         *
         *     #### Notes
         *
         *     Each list item contains a `notes` field with text entered by the user.
         *
         *     #### Sorting Headers
         *
         *     All list items are sorted by ascending `rank`. We also send `X-Sort-By` and `X-Sort-How` headers which can be used to custom sort the list _**in your app**_ based on the user's preference. Values for `X-Sort-By` include `rank`, `added`, `title`, `released`, `runtime`, `popularity`, `percentage`, `votes`, `my_rating`, `random`, `watched`, and `collected`. Values for `X-Sort-How` include `asc` and `desc`.
         */
        get: operations["Get items on a personal list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{id}/lists/{list_id}/items": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Add items to personal list
         * @description #### 🔥 VIP Enhanced &#128274; OAuth Required &#128513; Emojis
         *
         *     Add one or more items to a personal list. Items can be movies, shows, seasons, episodes, or people.
         *
         *     #### Notes
         *
         *     Each list item can optionally accept a `notes` *(500 maximum characters)* field with custom text. The user must be a [**Trakt VIP**](https://trakt.tv/vip) to send `notes`.
         *
         *     #### Limits
         *
         *     If the user's list item limit is exceeded, a `420` HTTP error code is returned. Use the [**\/users/settings**](/reference/users/settings) method to get all limits for a user account. In most cases, upgrading to [**Trakt VIP**](https://trakt.tv/vip) will increase the limits.
         *
         *     #### JSON POST Data
         *
         *     | Key | Type | Value |
         *     |---|---|---|
         *     | `movies` | array | Array of `movie` objects. (see examples &#8594;) |
         *     | `shows` | array | Array of `show` objects. |
         *     | `seasons` | array | Array of `season` objects. |
         *     | `episodes` | array | Array of `episode` objects. |
         *     | `people` | array | Array of `person` objects. |
         */
        post: operations["Add items to personal list"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{id}/lists/{list_id}/items/remove": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Remove items from personal list
         * @description #### &#128274; OAuth Required
         *
         *     Remove one or more items from a personal list.
         *
         *     #### JSON POST Data
         *
         *     | Key | Type | Value |
         *     |---|---|---|
         *     | `movies` | array | Array of `movie` objects. (see examples &#8594;) |
         *     | `shows` | array | Array of `show` objects. |
         *     | `seasons` | array | Array of `season` objects. |
         *     | `episodes` | array | Array of `episode` objects. |
         *     | `people` | array | Array of `person` objects. |
         */
        post: operations["Remove items from personal list"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{id}/lists/{list_id}/items/reorder": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Reorder items on a list
         * @description #### &#128274; OAuth Required
         *
         *     Reorder all items on a list by sending the updated `rank` of list item ids. Use the [**\/users/:id/lists/:list_id/items**](#reference/users/list-items) method to get all list item ids.
         */
        post: operations["Reorder items on a list"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{id}/lists/{list_id}/items/{list_item_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Update a list item
         * @description #### 🔥 VIP Only &#128274; OAuth Required &#128513; Emojis
         *
         *     Update the `notes` on a single list item.
         */
        put: operations["Update a list item"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{id}/lists/{list_id}/comments/{sort}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get all list comments
         * @description #### &#128275; OAuth Optional &#128196; Pagination &#128513; Emojis
         *
         *     Returns all top level comments for a list. By default, the `newest` comments are returned first. Other sorting options include `oldest`, most `likes`, and most `replies`.
         *
         *     > ### 🅽🅾🆃🅴
         *     > _If you send OAuth, comments from blocked users will be automatically filtered out._
         */
        get: operations["Get all list comments 1"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{id}/follow": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Follow this user
         * @description #### &#128274; OAuth Required
         *
         *     If the user has a private profile, the follow request will require approval (`approved_at` will be null). If a user is public, they will be followed immediately (`approved_at` will have a date).
         *
         *     > ### 🅽🅾🆃🅴
         *     > _If this user is already being followed or there is a pending follow request, a `409` HTTP status code will returned._
         */
        post: operations["Follow this user"];
        /**
         * Unfollow this user
         * @description #### &#128274; OAuth Required
         *
         *     Unfollow someone you already follow.
         */
        delete: operations["Unfollow this user"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{id}/followers": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get followers
         * @description #### &#128275; OAuth Optional &#10024; Extended Info
         *
         *     Returns all followers including when the relationship began.
         */
        get: operations["Get followers"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{id}/following": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get following
         * @description #### &#128275; OAuth Optional &#10024; Extended Info
         *
         *     Returns all user's they follow including when the relationship began.
         */
        get: operations["Get following"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{id}/friends": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get friends
         * @description #### &#128275; OAuth Optional &#10024; Extended Info
         *
         *     Returns all friends for a user including when the relationship began. Friendship is a 2 way relationship where each user follows the other.
         */
        get: operations["Get friends"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{id}/history/{type}/{item_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get watched history
         * @description #### &#128275; OAuth Optional &#128196; Pagination &#10024; Extended Info
         *
         *     Returns movies and episodes that a user has watched, sorted by most recent. You can optionally limit the `type` to `movies` or `episodes`. The `id` _(64-bit integer)_ in each history item uniquely identifies the event and can be used to remove individual events by using the [**\/sync/history/remove**](#reference/sync/remove-from-history/get-watched-history) method. The `action` will be set to `scrobble`, `checkin`, or `watch`.
         *
         *     Specify a `type` and trakt `item_id` to limit the history for just that item. If the `item_id` is valid, but there is no history, an empty array will be returned.
         *
         *     | Example URL | Returns watches for... |
         *     |---|---|
         *     | `/history/movies/12601` | TRON: Legacy |
         *     | `/history/shows/1388` | All episodes of Breaking Bad |
         *     | `/history/seasons/3950` | All episodes of Breaking Bad: Season 1 |
         *     | `/history/episodes/73482` | Only episode 1 for Breaking Bad: Season 1 |
         */
        get: operations["Get watched history 1"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{id}/ratings/{type}/{rating}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get ratings
         * @description #### &#128275; OAuth Optional &#128196; Pagination Optional &#10024; Extended Info
         *
         *     Get a user's ratings filtered by `type`. You can optionally filter for a specific `rating` between 1 and 10. Send a comma separated string for `rating` if you need multiple ratings.
         */
        get: operations["Get ratings 1"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{id}/watchlist/{type}/{sort}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get watchlist
         * @description #### &#128275; OAuth Optional &#128196; Pagination Optional &#10024; Extended Info &#128513; Emojis
         *
         *     Returns all items in a user's watchlist filtered by type.
         *
         *     #### Notes
         *
         *     Each watchlist item contains a `notes` field with text entered by the user.
         *
         *     #### Sorting Headers
         *
         *     By default, all list items are sorted by `rank` `asc`. We send `X-Applied-Sort-By` and `X-Applied-Sort-How` headers to indicate how the results are actually being sorted.
         *
         *     We also send `X-Sort-By` and `X-Sort-How` headers which indicate the user's sort preference. Use these to to custom sort the watchlist _**in your app**_ for more advanced sort abilities we can't do in the API. Values for `X-Sort-By` include `rank`, `added`, `title`, `released`, `runtime`, `popularity`, `percentage`, and `votes`. Values for `X-Sort-How` include `asc` and `desc`.
         *
         *     #### Auto Removal
         *
         *     When an item is watched, it will be automatically removed from the watchlist. For shows and seasons, watching 1 episode will remove the entire show or season.
         *
         *     _**The watchlist should not be used as a list of what the user is actively watching.**_
         *
         *     Use a combination of the [**\/sync/watched**](/reference/sync/get-watched) and [**\/shows/:id/progress**](/reference/shows/watched-progress) methods to get what the user is actively watching.
         */
        get: operations["Get watchlist 1"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{id}/watchlist/comments/{sort}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get all favorites comments
         * @description #### &#128275; OAuth Optional &#128196; Pagination &#128513; Emojis
         *
         *     Returns all top level comments for the watchlist. By default, the `newest` comments are returned first. Other sorting options include `oldest`, most `likes`, and most `replies`.
         *
         *     > ### 🅽🅾🆃🅴
         *     > _If you send OAuth, comments from blocked users will be automatically filtered out._
         */
        get: operations["Get all favorites comments"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{id}/favorites/{type}/{sort}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get favorites
         * @description #### &#128274; OAuth Required &#128196; Pagination Optional &#10024; Extended Info &#128513; Emojis
         *
         *     Returns the top 50 items a user has favorited. These favorites are used to enchance Trakt's social recommendation algorithm. Apps should encourage user's to add favorites so the algorithm keeps getting better.
         *
         *     #### Notes
         *
         *     Each favorite contains a `notes` field explaining why the user favorited the item.
         */
        get: operations["Get favorites 1"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{id}/favorites/comments/{sort}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get all favorites comments
         * @description #### &#128275; OAuth Optional &#128196; Pagination &#128513; Emojis
         *
         *     Returns all top level comments for the favorites. By default, the `newest` comments are returned first. Other sorting options include `oldest`, most `likes`, and most `replies`.
         *
         *     > ### 🅽🅾🆃🅴
         *     > _If you send OAuth, comments from blocked users will be automatically filtered out._
         */
        get: operations["Get all favorites comments 1"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{id}/watching": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get watching
         * @description #### &#128275; OAuth Optional &#10024; Extended Info
         *
         *     Returns a movie or episode if the user is currently watching something.  If they are not, it returns no data and a `204` HTTP status code.
         */
        get: operations["Get watching"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{id}/watched/{type}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get watched
         * @description #### &#128275; OAuth Optional &#10024; Extended Info
         *
         *     Returns all movies or shows a user has watched sorted by most plays.
         *
         *     If `type` is set to _shows_ and you add `?extended=noseasons` to the URL, it won't return season or episode info.
         *
         *     Each `movie` and `show` object contains `last_watched_at` and `last_updated_at` timestamps. Since users can set custom dates when they watched movies and episodes, it is possible for `last_watched_at` to be in the past. We also include `last_updated_at` to help sync Trakt data with your app. Cache this timestamp locally and only re-process the movies and shows if you see a newer timestamp.
         *
         *     Each `show` object contains a `reset_at` timestamp. If not `null`, this is when the user started re-watching the show. Your app can adjust the progress by ignoring episodes with a `last_watched_at` prior to the `reset_at`.
         */
        get: operations["Get watched 1"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{id}/stats": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get stats
         * @description #### &#128275; OAuth Optional
         *
         *     Returns stats about the movies, shows, and episodes a user has watched, collected, and rated.
         */
        get: operations["Get stats"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: never;
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    "Authorize Application": {
        parameters: {
            query: {
                /**
                 * @description Must be set to code.
                 * @example code
                 */
                response_type: string;
                /**
                 * @description Get this from your app settings.
                 * @example
                 */
                client_id: string;
                /**
                 * @description URI specified in your app settings.
                 * @example
                 */
                redirect_uri: string;
                /**
                 * @description State variable for CSRF purposes.
                 * @example
                 */
                state?: string;
                /**
                 * @description Default to the sign up page.
                 * @example true
                 */
                signup?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "Exchange refresh_token for access_token": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                /** @example {
                 *       "refresh_token": "fd0847dbb559752d932dd3c1ac34ff98d27b11fe2fea5a864f44740cd7919ad0",
                 *       "client_id": "9b36d8c0db59eff5038aea7a417d73e69aea75b41aac771816d2ef1b3109cc2f",
                 *       "client_secret": "d6ea27703957b69939b8104ed4524595e210cd2e79af587744a7eb6e58f5b3d2",
                 *       "redirect_uri": "urn:ietf:wg:oauth:2.0:oob",
                 *       "grant_type": "refresh_token"
                 *     } */
                "application/json": {
                    refresh_token?: string;
                    client_id?: string;
                    client_secret?: string;
                    redirect_uri?: string;
                    grant_type?: string;
                };
            };
        };
        responses: {
            /** @description If the `refresh_token` is valid, you'll get the `access_token` back. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        access_token?: string;
                        token_type?: string;
                        expires_in?: number;
                        refresh_token?: string;
                        scope?: string;
                        created_at?: number;
                    };
                };
            };
            /** @description If the `refresh_token` is invalid, you'll get a `401` error. */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error?: string;
                        error_description?: string;
                    };
                };
            };
        };
    };
    "Revoke an access_token": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                /** @example {
                 *       "token": "fd0847dbb559752d932dd3c1ac34ff98d27b11fe2fea5a864f44740cd7919ad0",
                 *       "client_id": "9b36d8c0db59eff5038aea7a417d73e69aea75b41aac771816d2ef1b3109cc2f",
                 *       "client_secret": "d6ea27703957b69939b8104ed4524595e210cd2e79af587744a7eb6e58f5b3d2"
                 *     } */
                "application/json": {
                    token?: string;
                    client_id?: string;
                    client_secret?: string;
                };
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": Record<string, never>;
                };
            };
        };
    };
    "Generate new device codes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                /** @example {
                 *       "client_id": "9b36d8c0db59eff5038aea7a417d73e69aea75b41aac771816d2ef1b3109cc2f"
                 *     } */
                "application/json": {
                    client_id?: string;
                };
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        device_code?: string;
                        user_code?: string;
                        verification_url?: string;
                        expires_in?: number;
                        interval?: number;
                    };
                };
            };
        };
    };
    "Poll for the access_token": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                /** @example {
                 *       "code": "fd0847dbb559752d932dd3c1ac34ff98d27b11fe2fea5a864f44740cd7919ad0",
                 *       "client_id": "9b36d8c0db59eff5038aea7a417d73e69aea75b41aac771816d2ef1b3109cc2f",
                 *       "client_secret": "d6ea27703957b69939b8104ed4524595e210cd2e79af587744a7eb6e58f5b3d2"
                 *     } */
                "application/json": {
                    code?: string;
                    client_id?: string;
                    client_secret?: string;
                };
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        access_token?: string;
                        token_type?: string;
                        expires_in?: number;
                        refresh_token?: string;
                        scope?: string;
                        created_at?: number;
                    };
                };
            };
        };
    };
    "Get shows": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Start the calendar on this date.
                 * @example 2014-09-01
                 */
                start_date: string;
                /**
                 * @description Number of days to display.
                 * @example 7
                 */
                days: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Start-Date"?: string;
                    "X-End-Date"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        first_aired: string;
                        episode: {
                            season?: number;
                            number?: number;
                            title?: string;
                            ids?: {
                                trakt?: number;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get new shows": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Start the calendar on this date.
                 * @example 2014-09-01
                 */
                start_date: string;
                /**
                 * @description Number of days to display.
                 * @example 7
                 */
                days: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Start-Date"?: string;
                    "X-End-Date"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        first_aired?: string;
                        episode?: {
                            season?: number;
                            number?: number;
                            title?: string;
                            ids?: {
                                trakt?: number;
                                tvdb?: unknown;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        show?: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get season premieres": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Start the calendar on this date.
                 * @example 2014-09-01
                 */
                start_date: string;
                /**
                 * @description Number of days to display.
                 * @example 7
                 */
                days: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Start-Date"?: string;
                    "X-End-Date"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        first_aired: string;
                        episode: {
                            season?: number;
                            number?: number;
                            title?: string;
                            ids?: {
                                trakt?: number;
                                tvdb?: unknown;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get finales": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Start the calendar on this date.
                 * @example 2014-09-01
                 */
                start_date: string;
                /**
                 * @description Number of days to display.
                 * @example 7
                 */
                days: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Start-Date"?: string;
                    "X-End-Date"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        first_aired: string;
                        episode: {
                            season?: number;
                            number?: number;
                            title?: string;
                            ids?: {
                                trakt?: number;
                                tvdb?: unknown;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get movies": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Start the calendar on this date.
                 * @example 2014-09-01
                 */
                start_date: string;
                /**
                 * @description Number of days to display.
                 * @example 7
                 */
                days: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Start-Date"?: string;
                    "X-End-Date"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        released: string;
                        movie: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get DVD releases": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Start the calendar on this date.
                 * @example 2014-09-01
                 */
                start_date: string;
                /**
                 * @description Number of days to display.
                 * @example 7
                 */
                days: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Start-Date"?: string;
                    "X-End-Date"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        released: string;
                        movie: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get shows 1": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Start the calendar on this date.
                 * @example 2014-09-01
                 */
                start_date: string;
                /**
                 * @description Number of days to display.
                 * @example 7
                 */
                days: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Start-Date"?: string;
                    "X-End-Date"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        first_aired: string;
                        episode: {
                            season?: number;
                            number?: number;
                            title?: string;
                            ids?: {
                                trakt?: number;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get new shows 1": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Start the calendar on this date.
                 * @example 2014-09-01
                 */
                start_date: string;
                /**
                 * @description Number of days to display.
                 * @example 7
                 */
                days: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Start-Date"?: string;
                    "X-End-Date"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        first_aired?: string;
                        episode?: {
                            season?: number;
                            number?: number;
                            title?: string;
                            ids?: {
                                trakt?: number;
                                tvdb?: unknown;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        show?: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get season premieres 1": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Start the calendar on this date.
                 * @example 2014-09-01
                 */
                start_date: string;
                /**
                 * @description Number of days to display.
                 * @example 7
                 */
                days: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Start-Date"?: string;
                    "X-End-Date"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        first_aired: string;
                        episode: {
                            season?: number;
                            number?: number;
                            title?: string;
                            ids?: {
                                trakt?: number;
                                tvdb?: unknown;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get finales 1": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Start the calendar on this date.
                 * @example 2014-09-01
                 */
                start_date: string;
                /**
                 * @description Number of days to display.
                 * @example 7
                 */
                days: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Start-Date"?: string;
                    "X-End-Date"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        first_aired: string;
                        episode: {
                            season?: number;
                            number?: number;
                            title?: string;
                            ids?: {
                                trakt?: number;
                                tvdb?: unknown;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get movies 1": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Start the calendar on this date.
                 * @example 2014-09-01
                 */
                start_date: string;
                /**
                 * @description Number of days to display.
                 * @example 7
                 */
                days: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Start-Date"?: string;
                    "X-End-Date"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        released: string;
                        movie: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get DVD releases 1": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Start the calendar on this date.
                 * @example 2014-09-01
                 */
                start_date: string;
                /**
                 * @description Number of days to display.
                 * @example 7
                 */
                days: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Start-Date"?: string;
                    "X-End-Date"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        released: string;
                        movie: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Check into an item": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": {
                    movie?: {
                        title?: string;
                        year?: number;
                        ids?: {
                            trakt?: number;
                            slug?: string;
                            imdb?: string;
                            tmdb?: number;
                        };
                    };
                    sharing?: {
                        twitter?: boolean;
                        mastodon?: boolean;
                        tumblr?: boolean;
                    };
                    message?: string;
                };
            };
        };
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id?: number;
                        watched_at?: string;
                        sharing?: {
                            twitter?: boolean;
                            mastodon?: boolean;
                            tumblr?: boolean;
                        };
                        movie?: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    } | {
                        id?: number;
                        watched_at?: string;
                        sharing?: {
                            twitter?: boolean;
                            mastodon?: boolean;
                            tumblr?: boolean;
                        };
                        episode?: {
                            season?: number;
                            number?: number;
                            title?: string;
                            ids?: {
                                trakt?: number;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        show?: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    } | {
                        id?: number;
                        watched_at?: string;
                        sharing?: {
                            twitter?: boolean;
                            mastodon?: boolean;
                            tumblr?: boolean;
                        };
                        episode?: {
                            season?: number;
                            number?: number;
                            title?: string;
                            ids?: {
                                trakt?: number;
                                tvdb?: number;
                                imdb?: unknown;
                                tmdb?: unknown;
                            };
                        };
                        show?: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    };
                };
            };
            /** @description There is already a checkin in progress. */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        expires_at?: string;
                    };
                };
            };
        };
    };
    "Delete any active checkins": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description NoContent */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "Get certifications": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /** @example movies */
                type: "movies" | "shows";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        us?: {
                            name: string;
                            slug: string;
                            description: string;
                        }[];
                    };
                };
            };
        };
    };
    "Post a comment": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": {
                    movie?: {
                        title?: string;
                        year?: number;
                        ids?: {
                            trakt?: number;
                            slug?: string;
                            imdb?: string;
                            tmdb?: number;
                        };
                    };
                    comment?: string;
                    spoiler?: boolean;
                    sharing?: {
                        twitter?: boolean;
                        tumblr?: boolean;
                        medium?: boolean;
                    };
                };
            };
        };
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id?: number;
                        parent_id?: number;
                        created_at?: string;
                        updated_at?: string;
                        comment?: string;
                        spoiler?: boolean;
                        review?: boolean;
                        replies?: number;
                        likes?: number;
                        user_stats?: {
                            rating?: unknown;
                            play_count?: number;
                            completed_count?: number;
                        };
                        user?: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                            };
                        };
                        sharing?: {
                            twitter?: boolean;
                            tumblr?: boolean;
                            medium?: boolean;
                        };
                    } | {
                        id?: number;
                        parent_id?: number;
                        created_at?: string;
                        updated_at?: string;
                        comment?: string;
                        spoiler?: boolean;
                        review?: boolean;
                        replies?: number;
                        likes?: number;
                        user_stats?: {
                            rating?: unknown;
                            play_count?: number;
                            completed_count?: number;
                        };
                        user?: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                            };
                        };
                    };
                };
            };
        };
    };
    "Get a comment or reply": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description A specific comment ID.
                 * @example 417
                 */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Item-ID"?: string;
                    "X-Item-Type"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id?: number;
                        parent_id?: number;
                        created_at?: string;
                        comment?: string;
                        spoiler?: boolean;
                        review?: boolean;
                        replies?: number;
                        likes?: number;
                        user_stats?: {
                            rating?: number;
                            play_count?: number;
                            completed_count?: number;
                        };
                        user?: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                            };
                        };
                    };
                };
            };
        };
    };
    "Update a comment or reply": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description A specific comment ID.
                 * @example 417
                 */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                /** @example {
                 *       "comment": "Agreed, this show is awesome. AMC in general has awesome shows and I can't wait to see what they come up with next.",
                 *       "spoiler": false
                 *     } */
                "application/json": {
                    comment?: string;
                    spoiler?: boolean;
                };
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id?: number;
                        parent_id?: number;
                        created_at?: string;
                        updated_at?: string;
                        comment?: string;
                        spoiler?: boolean;
                        review?: boolean;
                        replies?: number;
                        likes?: number;
                        user_stats?: {
                            rating?: unknown;
                            play_count?: number;
                            completed_count?: number;
                        };
                        user?: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                            };
                        };
                    };
                };
            };
        };
    };
    "Delete a comment or reply": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description A specific comment ID.
                 * @example 417
                 */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description NoContent */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "Get replies for a comment": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description A specific comment ID.
                 * @example 417
                 */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id?: number;
                        parent_id?: number;
                        created_at?: string;
                        updated_at?: string;
                        comment?: string;
                        spoiler?: boolean;
                        review?: boolean;
                        replies?: number;
                        likes?: number;
                        user_stats?: {
                            rating?: number;
                            play_count?: number;
                            completed_count?: number;
                        };
                        user?: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Post a reply for a comment": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description A specific comment ID.
                 * @example 417
                 */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                /** @example {
                 *       "comment": "Couldn't agree more with your review!",
                 *       "spoiler": false
                 *     } */
                "application/json": {
                    comment?: string;
                    spoiler?: boolean;
                };
            };
        };
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id?: number;
                        parent_id?: number;
                        created_at?: string;
                        updated_at?: string;
                        comment?: string;
                        spoiler?: boolean;
                        review?: boolean;
                        replies?: number;
                        likes?: number;
                        user_stats?: {
                            rating?: unknown;
                            play_count?: number;
                            completed_count?: number;
                        };
                        user?: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                            };
                        };
                    };
                };
            };
        };
    };
    "Get the attached media item": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description A specific comment ID.
                 * @example 417
                 */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        type?: string;
                        show?: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    };
                };
            };
        };
    };
    "Get all users who liked a comment": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description A specific comment ID.
                 * @example 417
                 */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        liked_at: string;
                        user: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Like a comment": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description A specific comment ID.
                 * @example 417
                 */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description NoContent */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "Remove like on a comment": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description A specific comment ID.
                 * @example 417
                 */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description NoContent */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "Get trending comments": {
        parameters: {
            query?: {
                /**
                 * @description include comment replies
                 * @example false
                 */
                include_replies?: string;
            };
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /** @example all */
                comment_type: "all" | "reviews" | "shouts";
                /** @example all */
                type: "all" | "movies" | "shows" | "seasons" | "episodes" | "lists";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        type: string;
                        movie?: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        comment: {
                            id?: number;
                            comment?: string;
                            spoiler?: boolean;
                            review?: boolean;
                            parent_id?: number;
                            created_at?: string;
                            updated_at?: string;
                            replies?: number;
                            likes?: number;
                            user_stats?: {
                                rating?: number | null;
                                play_count?: number;
                                completed_count?: number;
                            };
                            user?: {
                                username?: string;
                                private?: boolean;
                                name?: string;
                                vip?: boolean;
                                vip_ep?: boolean;
                                ids?: {
                                    slug?: string;
                                };
                            };
                        };
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        season?: {
                            number?: number;
                            ids?: {
                                trakt?: number;
                                tvdb?: number;
                                tmdb?: number;
                            };
                        };
                        episode?: {
                            season?: number;
                            number?: number;
                            title?: string;
                            ids?: {
                                trakt?: number;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        list?: {
                            name?: string;
                            description?: string;
                            privacy?: string;
                            share_link?: string;
                            display_numbers?: boolean;
                            allow_comments?: boolean;
                            updated_at?: string;
                            item_count?: number;
                            comment_count?: number;
                            likes?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get recently created comments": {
        parameters: {
            query?: {
                /**
                 * @description include comment replies
                 * @example false
                 */
                include_replies?: string;
            };
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /** @example all */
                comment_type: "all" | "reviews" | "shouts";
                /** @example all */
                type: "all" | "movies" | "shows" | "seasons" | "episodes" | "lists";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        type: string;
                        movie?: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        comment: {
                            id?: number;
                            comment?: string;
                            spoiler?: boolean;
                            review?: boolean;
                            parent_id?: number;
                            created_at?: string;
                            updated_at?: string;
                            replies?: number;
                            likes?: number;
                            user_stats?: {
                                rating?: number | null;
                                play_count?: number;
                                completed_count?: number;
                            };
                            user?: {
                                username?: string;
                                private?: boolean;
                                name?: string;
                                vip?: boolean;
                                vip_ep?: boolean;
                                ids?: {
                                    slug?: string;
                                };
                            };
                        };
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        season?: {
                            number?: number;
                            ids?: {
                                trakt?: number;
                                tvdb?: number;
                                tmdb?: number;
                            };
                        };
                        episode?: {
                            season?: number;
                            number?: number;
                            title?: string;
                            ids?: {
                                trakt?: number;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        list?: {
                            name?: string;
                            description?: string;
                            privacy?: string;
                            share_link?: string;
                            display_numbers?: boolean;
                            allow_comments?: boolean;
                            updated_at?: string;
                            item_count?: number;
                            comment_count?: number;
                            likes?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get recently updated comments": {
        parameters: {
            query?: {
                /**
                 * @description include comment replies
                 * @example false
                 */
                include_replies?: string;
            };
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /** @example all */
                comment_type: "all" | "reviews" | "shouts";
                /** @example all */
                type: "all" | "movies" | "shows" | "seasons" | "episodes" | "lists";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        type: string;
                        movie?: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        comment: {
                            id?: number;
                            comment?: string;
                            spoiler?: boolean;
                            review?: boolean;
                            parent_id?: number;
                            created_at?: string;
                            updated_at?: string;
                            replies?: number;
                            likes?: number;
                            user_stats?: {
                                rating?: number | null;
                                play_count?: number;
                                completed_count?: number;
                            };
                            user?: {
                                username?: string;
                                private?: boolean;
                                name?: string;
                                vip?: boolean;
                                vip_ep?: boolean;
                                ids?: {
                                    slug?: string;
                                };
                            };
                        };
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        season?: {
                            number?: number;
                            ids?: {
                                trakt?: number;
                                tvdb?: number;
                                tmdb?: number;
                            };
                        };
                        episode?: {
                            season?: number;
                            number?: number;
                            title?: string;
                            ids?: {
                                trakt?: number;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        list?: {
                            name?: string;
                            description?: string;
                            privacy?: string;
                            share_link?: string;
                            display_numbers?: boolean;
                            allow_comments?: boolean;
                            updated_at?: string;
                            item_count?: number;
                            comment_count?: number;
                            likes?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get countries": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /** @example movies */
                type: "movies" | "shows";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        name: string;
                        code: string;
                    }[];
                };
            };
        };
    };
    "Get genres": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /** @example movies */
                type: "movies" | "shows";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        name: string;
                        slug: string;
                    }[];
                };
            };
        };
    };
    "Get languages": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /** @example movies */
                type: "movies" | "shows";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        name: string;
                        code: string;
                    }[];
                };
            };
        };
    };
    "Get trending lists": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        like_count: number;
                        comment_count: number;
                        list: {
                            name?: string;
                            description?: string;
                            privacy?: string;
                            share_link?: string;
                            type?: string;
                            display_numbers?: boolean;
                            allow_comments?: boolean;
                            sort_by?: string;
                            sort_how?: string;
                            created_at?: string;
                            updated_at?: string;
                            item_count?: number;
                            comment_count?: number;
                            likes?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                            };
                            user?: {
                                username?: string;
                                private?: boolean;
                                name?: string;
                                vip?: boolean;
                                vip_ep?: boolean;
                                ids?: {
                                    slug?: string;
                                };
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get popular lists": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        like_count: number;
                        comment_count: number;
                        list: {
                            name?: string;
                            description?: string;
                            privacy?: string;
                            share_link?: string;
                            type?: string;
                            display_numbers?: boolean;
                            allow_comments?: boolean;
                            sort_by?: string;
                            sort_how?: string;
                            created_at?: string;
                            updated_at?: string;
                            item_count?: number;
                            comment_count?: number;
                            likes?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                            };
                            user?: {
                                username?: string;
                                private?: boolean;
                                name?: string;
                                vip?: boolean;
                                vip_ep?: boolean;
                                ids?: {
                                    slug?: string;
                                };
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get list": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID
                 * @example 55
                 */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Sort-By"?: string;
                    "X-Sort-How"?: string;
                    "X-List-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        name?: string;
                        description?: string;
                        privacy?: string;
                        share_link?: string;
                        type?: string;
                        display_numbers?: boolean;
                        allow_comments?: boolean;
                        sort_by?: string;
                        sort_how?: string;
                        created_at?: string;
                        updated_at?: string;
                        item_count?: number;
                        comment_count?: number;
                        likes?: number;
                        ids?: {
                            trakt?: number;
                            slug?: string;
                        };
                        user?: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                            };
                        };
                    };
                };
            };
        };
    };
    "Get all users who liked a list": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID
                 * @example 55
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    "X-List-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        liked_at: string;
                        user: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Like a list": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID
                 * @example 55
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description NoContent */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "Remove like on a list": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID
                 * @example 55
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description NoContent */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "Get items on a list": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID
                 * @example 55
                 */
                id: string;
                /**
                 * @description Filter for a specific item type
                 * @example movies
                 */
                type: "movie" | "show" | "season" | "episode" | "person";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Private-User"?: string;
                    "X-Sort-By"?: string;
                    "X-Sort-How"?: string;
                    "X-List-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        rank: number;
                        id: number;
                        listed_at: string;
                        notes: unknown;
                        type: string;
                        movie?: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        season?: {
                            number?: number;
                            ids?: {
                                tvdb?: number;
                                tmdb?: number;
                            };
                        };
                        episode?: {
                            season?: number;
                            number?: number;
                            title?: string;
                            ids?: {
                                trakt?: number;
                                tvdb?: number;
                                imdb?: unknown;
                                tmdb?: number;
                            };
                        };
                        person?: {
                            name?: string;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get all list comments": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID
                 * @example 55
                 */
                id: number;
                /**
                 * @description how to sort
                 * @example newest
                 */
                sort: "newest" | "oldest" | "likes" | "replies";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id?: number;
                        parent_id?: number;
                        created_at?: string;
                        updated_at?: string;
                        comment?: string;
                        spoiler?: boolean;
                        review?: boolean;
                        replies?: number;
                        likes?: number;
                        user_stats?: {
                            rating?: unknown;
                            play_count?: number;
                            completed_count?: number;
                        };
                        user?: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get trending movies": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    "X-Trending-User-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        watchers: number;
                        movie: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get popular movies": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        title: string;
                        year: number;
                        ids: {
                            trakt?: number;
                            slug?: string;
                            imdb?: string;
                            tmdb?: number;
                        };
                    }[];
                };
            };
        };
    };
    "Get the most favorited movies": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Time period.
                 * @example weekly
                 */
                period: "daily" | "weekly" | "monthly" | "yearly" | "all";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        user_count: number;
                        movie: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get the most played movies": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Time period.
                 * @example weekly
                 */
                period: "daily" | "weekly" | "monthly" | "yearly" | "all";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        watcher_count: number;
                        play_count: number;
                        collected_count: number;
                        movie: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get the most watched movies": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Time period.
                 * @example weekly
                 */
                period: "daily" | "weekly" | "monthly" | "yearly" | "all";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        watcher_count: number;
                        play_count: number;
                        collected_count: number;
                        movie: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get the most Collected movies": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Time period.
                 * @example weekly
                 */
                period: "daily" | "weekly" | "monthly" | "yearly" | "all";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        watcher_count: number;
                        play_count: number;
                        collected_count: number;
                        movie: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get the most anticipated movies": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        list_count: number;
                        movie: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get the weekend box office": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        revenue: number;
                        movie: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get recently updated movies": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Updated since this date and time.
                 * @example 2020-11-27T00:00:00Z
                 */
                start_date: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Start-Date"?: string;
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        updated_at: string;
                        movie: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get recently updated movie Trakt IDs": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Updated since this date and time.
                 * @example 2020-11-27T00:00:00Z
                 */
                start_date: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Start-Date"?: string;
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": number[];
                };
            };
        };
    };
    "Get a movie": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example tron-legacy-2010
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description ```
             *     /movies/tron-legacy-2010?extended=full
             *     ``` */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        title?: string;
                        year?: number;
                        ids?: {
                            trakt?: number;
                            slug?: string;
                            imdb?: string;
                            tmdb?: number;
                        };
                    } | {
                        title?: string;
                        year?: number;
                        ids?: {
                            trakt?: number;
                            slug?: string;
                            imdb?: string;
                            tmdb?: number;
                        };
                        tagline?: string;
                        overview?: string;
                        released?: string;
                        runtime?: number;
                        country?: string;
                        updated_at?: string;
                        trailer?: unknown;
                        homepage?: string;
                        status?: string;
                        rating?: number;
                        votes?: number;
                        comment_count?: number;
                        languages?: string[];
                        available_translations?: string[];
                        genres?: string[];
                        certification?: string;
                    };
                };
            };
        };
    };
    "Get all movie aliases": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example tron-legacy-2010
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        title: string;
                        country: string;
                    }[];
                };
            };
        };
    };
    "Get all movie releases": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example tron-legacy-2010
                 */
                id: string;
                /**
                 * @description 2 character country code
                 * @example us
                 */
                country: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        country: string;
                        certification: string;
                        release_date: string;
                        release_type: string;
                        note: unknown;
                    }[];
                };
            };
        };
    };
    "Get all movie translations": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example tron-legacy-2010
                 */
                id: string;
                /**
                 * @description 2 character language code
                 * @example es
                 */
                language: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        title: string;
                        overview: string;
                        tagline: string;
                        language: string;
                        country: string;
                    }[];
                };
            };
        };
    };
    "Get all movie comments": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example tron-legacy-2010
                 */
                id: string;
                /**
                 * @description how to sort
                 * @example newest
                 */
                sort: "newest" | "oldest" | "likes" | "replies" | "highest" | "lowest" | "plays";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id?: number;
                        parent_id?: number;
                        created_at?: string;
                        updated_at?: string;
                        comment?: string;
                        spoiler?: boolean;
                        review?: boolean;
                        replies?: number;
                        likes?: number;
                        user_stats?: {
                            rating?: number;
                            play_count?: number;
                            completed_count?: number;
                        };
                        user?: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get lists containing this movie": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example tron-legacy-2010
                 */
                id: string;
                /**
                 * @description Filter for a specific list type
                 * @example personal
                 */
                type: "all" | "personal" | "official" | "watchlists" | "favorites";
                /**
                 * @description How to sort
                 * @example popular
                 */
                sort: "popular" | "likes" | "comments" | "items" | "added" | "updated";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        name?: string;
                        description?: string;
                        privacy?: string;
                        share_link?: string;
                        type?: string;
                        display_numbers?: boolean;
                        allow_comments?: boolean;
                        sort_by?: string;
                        sort_how?: string;
                        created_at?: string;
                        updated_at?: string;
                        item_count?: number;
                        comment_count?: number;
                        likes?: number;
                        ids?: {
                            trakt?: number;
                            slug?: string;
                        };
                        user?: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get all people for a movie": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example tron-legacy-2010
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        cast?: {
                            characters: string[];
                            person: {
                                name?: string;
                                ids?: {
                                    trakt?: number;
                                    slug?: string;
                                    imdb?: string;
                                    tmdb?: number;
                                };
                            };
                        }[];
                        crew?: {
                            production?: {
                                jobs: string[];
                                person: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                                job?: string[];
                            }[];
                            art?: {
                                jobs: string[];
                                person: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                            crew?: {
                                jobs: string[];
                                person: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                            "costume & make-up"?: {
                                jobs: string[];
                                person: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                            directing?: {
                                jobs?: string[];
                                person?: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                            writing?: {
                                jobs: string[];
                                person: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                                job?: string[];
                            }[];
                            sound?: {
                                jobs?: string[];
                                person?: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                            camera?: {
                                jobs?: string[];
                                person?: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                        };
                    };
                };
            };
        };
    };
    "Get movie ratings": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example tron-legacy-2010
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        rating?: number;
                        votes?: number;
                        distribution?: {
                            1?: number;
                            2?: number;
                            3?: number;
                            4?: number;
                            5?: number;
                            6?: number;
                            7?: number;
                            8?: number;
                            9?: number;
                            10?: number;
                        };
                    };
                };
            };
        };
    };
    "Get related movies": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example tron-legacy-2010
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        title: string;
                        year: number;
                        ids: {
                            trakt?: number;
                            slug?: string;
                            imdb?: string;
                            tmdb?: number;
                        };
                    }[];
                };
            };
        };
    };
    "Get movie stats": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example tron-legacy-2010
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        watchers?: number;
                        plays?: number;
                        collectors?: number;
                        comments?: number;
                        lists?: number;
                        votes?: number;
                        favorited?: number;
                    };
                };
            };
        };
    };
    "Get movie studios": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example tron-legacy-2010
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        name: string;
                        country: string;
                        ids: {
                            trakt?: number;
                            slug?: string;
                            tmdb?: number;
                        };
                    }[];
                };
            };
        };
    };
    "Get users watching right now": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example tron-legacy-2010
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        username: string;
                        private: boolean;
                        name: string;
                        vip: boolean;
                        vip_ep: boolean;
                        ids: {
                            slug?: string;
                        };
                    }[];
                };
            };
        };
    };
    "Refresh movie metadata": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example tron-legacy-2010
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "Get networks": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        name: string;
                        country: string;
                        ids: {
                            trakt?: number;
                            tmdb?: number;
                        };
                    }[];
                };
            };
        };
    };
    "Add notes": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": {
                    movie?: {
                        title?: string;
                        year?: number;
                        ids?: {
                            trakt?: number;
                            slug?: string;
                            imdb?: string;
                            tmdb?: number;
                        };
                    };
                    notes?: string;
                };
            };
        };
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id?: number;
                        notes?: string;
                        privacy?: string;
                        spoiler?: boolean;
                        created_at?: string;
                        updated_at?: string;
                        user?: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                            };
                        };
                    };
                };
            };
        };
    };
    "Get a note": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description A specific note ID.
                 * @example 193
                 */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Item-ID"?: string;
                    "X-Item-Type"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id?: number;
                        notes?: string;
                        privacy?: string;
                        spoiler?: boolean;
                        created_at?: string;
                        updated_at?: string;
                        user?: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                            };
                        };
                    };
                };
            };
        };
    };
    "Update a note": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description A specific note ID.
                 * @example 193
                 */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                /** @example {
                 *       "notes": "I AM THE DANGER! I AM THE ONE WHO KNOCKS!"
                 *     } */
                "application/json": {
                    notes?: string;
                };
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id?: number;
                        notes?: string;
                        privacy?: string;
                        spoiler?: boolean;
                        created_at?: string;
                        updated_at?: string;
                        user?: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                            };
                        };
                    };
                };
            };
        };
    };
    "Delete a note": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description A specific note ID.
                 * @example 193
                 */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description NoContent */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "Get the attached item": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description A specific note ID.
                 * @example 417
                 */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Attached to a specific watched history item. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        attached_to?: {
                            type?: string;
                        };
                        type?: string;
                        show?: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    } | {
                        attached_to?: {
                            type?: string;
                            id?: number;
                        };
                        type?: string;
                        show?: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    };
                };
            };
        };
    };
    "Get recently updated people": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Updated since this date and time.
                 * @example 2020-11-27T00:00:00Z
                 */
                start_date: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Start-Date"?: string;
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        updated_at: string;
                        person: {
                            name?: string;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get recently updated people Trakt IDs": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Updated since this date and time.
                 * @example 2020-11-27T00:00:00Z
                 */
                start_date: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Start-Date"?: string;
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": number[];
                };
            };
        };
    };
    "Get a single person": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example bryan-cranston
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description ```
             *     /people/bryan-cranston?extended=full
             *     ``` */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        name?: string;
                        ids?: {
                            trakt?: number;
                            slug?: string;
                            imdb?: string;
                            tmdb?: number;
                        };
                    } | {
                        name?: string;
                        ids?: {
                            trakt?: number;
                            slug?: string;
                            imdb?: string;
                            tmdb?: number;
                        };
                        social_ids?: {
                            twitter?: string;
                            facebook?: string;
                            instagram?: string;
                            wikipedia?: unknown;
                        };
                        biography?: string;
                        birthday?: string;
                        death?: unknown;
                        birthplace?: string;
                        homepage?: string;
                        gender?: string;
                        known_for_department?: string;
                        updated_at?: string;
                    };
                };
            };
        };
    };
    "Get movie credits": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example bryan-cranston
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        cast?: {
                            characters?: string[];
                            movie?: {
                                title?: string;
                                year?: number;
                                ids?: {
                                    trakt?: number;
                                    slug?: string;
                                    imdb?: string;
                                    tmdb?: number;
                                };
                            };
                        }[];
                        crew?: {
                            directing?: {
                                jobs?: string[];
                                movie?: {
                                    title?: string;
                                    year?: number;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                            writing?: {
                                jobs?: string[];
                                movie?: {
                                    title?: string;
                                    year?: number;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                            producing?: {
                                jobs?: string[];
                                movie?: {
                                    title?: string;
                                    year?: number;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                        };
                    };
                };
            };
        };
    };
    "Get show credits": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example bryan-cranston
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        cast?: {
                            characters?: string[];
                            episode_count?: number;
                            series_regular?: boolean;
                            show?: {
                                title?: string;
                                year?: number;
                                ids?: {
                                    trakt?: number;
                                    slug?: string;
                                    tvdb?: number;
                                    imdb?: string;
                                    tmdb?: number;
                                };
                            };
                        }[];
                        crew?: {
                            production?: {
                                jobs?: string[];
                                show?: {
                                    title?: string;
                                    year?: number;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        tvdb?: number;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                        };
                    };
                };
            };
        };
    };
    "Get lists containing this person": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example bryan-cranston
                 */
                id: string;
                /**
                 * @description Filter for a specific list type
                 * @example personal
                 */
                type: "all" | "personal" | "official";
                /**
                 * @description How to sort
                 * @example popular
                 */
                sort: "popular" | "likes" | "comments" | "items" | "added" | "updated";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        name?: string;
                        description?: string;
                        privacy?: string;
                        share_link?: string;
                        type?: string;
                        display_numbers?: boolean;
                        allow_comments?: boolean;
                        sort_by?: string;
                        sort_how?: string;
                        created_at?: string;
                        updated_at?: string;
                        item_count?: number;
                        comment_count?: number;
                        likes?: number;
                        ids?: {
                            trakt?: number;
                            slug?: string;
                        };
                        user?: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Refresh person metadata": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example bryan-cranston
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "Get movie recommendations": {
        parameters: {
            query?: {
                /**
                 * @description filter out collected movies
                 * @example false
                 */
                ignore_collected?: "true" | "false";
                /**
                 * @description filter out watchlisted movies
                 * @example false
                 */
                ignore_watchlisted?: "true" | "false";
            };
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        title: string;
                        year: number;
                        ids: {
                            trakt?: number;
                            slug?: string;
                            imdb?: string;
                            tmdb?: number;
                        };
                        favorited_by: {
                            user?: {
                                username?: string;
                                private?: boolean;
                                name?: string;
                                vip?: boolean;
                                vip_ep?: boolean;
                                ids?: {
                                    slug?: string;
                                };
                            };
                            notes?: string;
                        }[];
                    }[];
                };
            };
        };
    };
    "Hide a movie recommendation": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example 922
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description NoContent */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "Get show recommendations": {
        parameters: {
            query?: {
                /**
                 * @description filter out collected shows
                 * @example false
                 */
                ignore_collected?: "true" | "false";
                /**
                 * @description filter out watchlisted movies
                 * @example false
                 */
                ignore_watchlisted?: "true" | "false";
            };
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        title: string;
                        year: number;
                        ids: {
                            trakt?: number;
                            slug?: string;
                            tvdb?: number;
                            imdb?: string;
                            tmdb?: number;
                        };
                        favorited_by: {
                            user?: {
                                username?: string;
                                private?: boolean;
                                name?: string;
                                vip?: boolean;
                                vip_ep?: boolean;
                                ids?: {
                                    slug?: string;
                                };
                            };
                            notes?: string;
                        }[];
                    }[];
                };
            };
        };
    };
    "Hide a show recommendation": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example 922
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description NoContent */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "Start watching in a media center": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": {
                    movie?: {
                        title?: string;
                        year?: number;
                        ids?: {
                            trakt?: number;
                            slug?: string;
                            imdb?: string;
                            tmdb?: number;
                        };
                    };
                    progress?: number;
                };
            };
        };
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id?: number;
                        action?: string;
                        progress?: number;
                        sharing?: {
                            twitter?: boolean;
                            mastodon?: boolean;
                            tumblr?: boolean;
                        };
                        movie?: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    } | {
                        id?: number;
                        action?: string;
                        progress?: number;
                        sharing?: {
                            twitter?: boolean;
                            mastodon?: boolean;
                            tumblr?: boolean;
                        };
                        episode?: {
                            season?: number;
                            number?: number;
                            title?: string;
                            ids?: {
                                trakt?: number;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        show?: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    } | {
                        id?: number;
                        action?: string;
                        progress?: number;
                        sharing?: {
                            twitter?: boolean;
                            mastodon?: boolean;
                            tumblr?: boolean;
                        };
                        episode?: {
                            season?: number;
                            number?: number;
                            title?: string;
                            ids?: {
                                trakt?: number;
                                tvdb?: number;
                                imdb?: unknown;
                                tmdb?: unknown;
                            };
                        };
                        show?: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    };
                };
            };
        };
    };
    "Pause watching in a media center": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                /** @example {
                 *       "movie": {
                 *         "title": "Guardians of the Galaxy",
                 *         "year": 2014,
                 *         "ids": {
                 *           "trakt": 28,
                 *           "slug": "guardians-of-the-galaxy-2014",
                 *           "imdb": "tt2015381",
                 *           "tmdb": 118340
                 *         }
                 *       },
                 *       "progress": 75
                 *     } */
                "application/json": {
                    movie?: {
                        title?: string;
                        year?: number;
                        ids?: {
                            trakt?: number;
                            slug?: string;
                            imdb?: string;
                            tmdb?: number;
                        };
                    };
                    progress?: number;
                };
            };
        };
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id?: number;
                        action?: string;
                        progress?: number;
                        sharing?: {
                            twitter?: boolean;
                            mastodon?: boolean;
                            tumblr?: boolean;
                        };
                        movie?: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    };
                };
            };
        };
    };
    "Stop or finish watching in a media center": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": {
                    movie?: {
                        title?: string;
                        year?: number;
                        ids?: {
                            trakt?: number;
                            slug?: string;
                            imdb?: string;
                            tmdb?: number;
                        };
                    };
                    progress?: number;
                };
            };
        };
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id?: number;
                        action?: string;
                        progress?: number;
                        sharing?: {
                            twitter?: boolean;
                            mastodon?: boolean;
                            tumblr?: boolean;
                        };
                        movie?: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    } | {
                        id?: number;
                        action?: string;
                        progress?: number;
                        sharing?: {
                            twitter?: boolean;
                            mastodon?: boolean;
                            tumblr?: boolean;
                        };
                        episode?: {
                            season?: number;
                            number?: number;
                            title?: string;
                            ids?: {
                                trakt?: number;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        show?: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    } | {
                        id?: number;
                        action?: string;
                        progress?: number;
                        sharing?: {
                            twitter?: boolean;
                            mastodon?: boolean;
                            tumblr?: boolean;
                        };
                        episode?: {
                            season?: number;
                            number?: number;
                            title?: string;
                            ids?: {
                                trakt?: number;
                                tvdb?: number;
                                imdb?: unknown;
                                tmdb?: unknown;
                            };
                        };
                        show?: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    };
                };
            };
            /** @description The same item was recently scrobbled. */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        watched_at?: string;
                        expires_at?: string;
                    };
                };
            };
        };
    };
    "Get text query results": {
        parameters: {
            query: {
                /**
                 * @description Search all text based fields.
                 * @example tron
                 */
                query: string;
                /**
                 * @description Specific text fields.
                 * @example title
                 */
                fields?:
                    | "title"
                    | "tagline"
                    | "overview"
                    | "people"
                    | "translations"
                    | "aliases"
                    | "name"
                    | "biography"
                    | "description";
            };
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Search type.
                 * @example movie
                 */
                type: "movie" | "show" | "episode" | "person" | "list";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description ```
             *     /search/movie,show,episode,person,list?query=tron
             *     ``` */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        type: string;
                        score: number;
                        movie?: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        episode?: {
                            season?: number;
                            number?: number;
                            title?: string;
                            ids?: {
                                trakt?: number;
                                tvdb?: number;
                                imdb?: unknown;
                                tmdb?: number;
                            };
                        };
                        person?: {
                            name?: string;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        list?: {
                            name?: string;
                            description?: string;
                            privacy?: string;
                            share_link?: string;
                            type?: string;
                            display_numbers?: boolean;
                            allow_comments?: boolean;
                            sort_by?: string;
                            sort_how?: string;
                            created_at?: string;
                            updated_at?: string;
                            item_count?: number;
                            comment_count?: number;
                            likes?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                            };
                            user?: {
                                username?: string;
                                private?: boolean;
                                name?: string;
                                vip?: boolean;
                                vip_ep?: boolean;
                                ids?: {
                                    slug?: string;
                                };
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get ID lookup results": {
        parameters: {
            query?: {
                /**
                 * @description Search type.
                 * @example movie
                 */
                type?: "movie" | "show" | "episode" | "person" | "list";
            };
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Type of ID to lookup.
                 * @example imdb
                 */
                id_type: "trakt" | "imdb" | "tmdb" | "tvdb";
                /**
                 * @description ID that matches with the type.
                 * @example tt0848228
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description ```
             *     /search/trakt/12601?type=movie
             *     /search/imdb/tt1104001
             *     ``` */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        type?: string;
                        score?: unknown;
                        movie?: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get trending shows": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    "X-Trending-User-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        watchers: number;
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get popular shows": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        title: string;
                        year: number;
                        ids: {
                            trakt?: number;
                            slug?: string;
                            tvdb?: number;
                            imdb?: string;
                            tmdb?: number;
                        };
                    }[];
                };
            };
        };
    };
    "Get the most favorited shows": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Time period.
                 * @example weekly
                 */
                period: "daily" | "weekly" | "monthly" | "yearly" | "all";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        user_count: number;
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get the most played shows": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Time period.
                 * @example weekly
                 */
                period: "daily" | "weekly" | "monthly" | "yearly" | "all";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        watcher_count: number;
                        play_count: number;
                        collected_count: number;
                        collector_count: number;
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get the most watched shows": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Time period.
                 * @example weekly
                 */
                period: "daily" | "weekly" | "monthly" | "yearly" | "all";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        watcher_count: number;
                        play_count: number;
                        collected_count: number;
                        collector_count: number;
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get the most collected shows": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Time period.
                 * @example weekly
                 */
                period: "daily" | "weekly" | "monthly" | "yearly" | "all";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        watcher_count: number;
                        play_count: number;
                        collected_count: number;
                        collector_count: number;
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get the most anticipated shows": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        list_count: number;
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number | null;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get recently updated shows": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Updated since this date and time.
                 * @example 2020-11-27T00:00:00Z
                 */
                start_date: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Start-Date"?: string;
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        updated_at: string;
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get recently updated show Trakt IDs": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Updated since this date and time.
                 * @example 2020-11-27T00:00:00Z
                 */
                start_date: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Start-Date"?: string;
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": number[];
                };
            };
        };
    };
    "Get a single show": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example game-of-thrones
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description ```
             *     /shows/game-of-thrones?extended=full
             *     ``` */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        title?: string;
                        year?: number;
                        ids?: {
                            trakt?: number;
                            slug?: string;
                            tvdb?: number;
                            imdb?: string;
                            tmdb?: number;
                        };
                    } | {
                        title?: string;
                        year?: number;
                        ids?: {
                            trakt?: number;
                            slug?: string;
                            tvdb?: number;
                            imdb?: string;
                            tmdb?: number;
                        };
                        tagline?: string;
                        overview?: string;
                        first_aired?: string;
                        airs?: {
                            day?: string;
                            time?: string;
                            timezone?: string;
                        };
                        runtime?: number;
                        certification?: string;
                        network?: string;
                        country?: string;
                        updated_at?: string;
                        trailer?: unknown;
                        homepage?: string;
                        status?: string;
                        rating?: number;
                        votes?: number;
                        comment_count?: number;
                        languages?: string[];
                        available_translations?: string[];
                        genres?: string[];
                        aired_episodes?: number;
                    };
                };
            };
        };
    };
    "Get all show aliases": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example game-of-thrones
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        title: string;
                        country: string;
                    }[];
                };
            };
        };
    };
    "Get all show certifications": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example game-of-thrones
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        certification: string;
                        country: string;
                    }[];
                };
            };
        };
    };
    "Get all show translations": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example game-of-thrones
                 */
                id: string;
                /**
                 * @description 2 character language code
                 * @example es
                 */
                language: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        title: string;
                        overview: string;
                        tagline: string | null;
                        language: string;
                        country: string;
                    }[];
                };
            };
        };
    };
    "Get all show comments": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example game-of-thrones
                 */
                id: string;
                /**
                 * @description how to sort
                 * @example newest
                 */
                sort:
                    | "newest"
                    | "oldest"
                    | "likes"
                    | "replies"
                    | "highest"
                    | "lowest"
                    | "plays"
                    | "watched";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id?: number;
                        parent_id?: number;
                        created_at?: string;
                        updated_at?: string;
                        comment?: string;
                        spoiler?: boolean;
                        review?: boolean;
                        replies?: number;
                        likes?: number;
                        user_stats?: {
                            rating?: number;
                            play_count?: number;
                            completed_count?: number;
                        };
                        user?: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get lists containing this show": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example game-of-thrones
                 */
                id: string;
                /**
                 * @description Filter for a specific list type
                 * @example personal
                 */
                type: "all" | "personal" | "official" | "watchlists" | "favorites";
                /**
                 * @description How to sort
                 * @example popular
                 */
                sort: "popular" | "likes" | "comments" | "items" | "added" | "updated";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        name?: string;
                        description?: string;
                        privacy?: string;
                        share_link?: string;
                        type?: string;
                        display_numbers?: boolean;
                        allow_comments?: boolean;
                        sort_by?: string;
                        sort_how?: string;
                        created_at?: string;
                        updated_at?: string;
                        item_count?: number;
                        comment_count?: number;
                        likes?: number;
                        ids?: {
                            trakt?: number;
                            slug?: string;
                        };
                        user?: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get show collection progress": {
        parameters: {
            query: {
                /**
                 * @description include any hidden seasons
                 * @example false
                 */
                hidden?: string;
                /**
                 * @description include specials as season 0
                 * @example false
                 */
                specials?: string;
                /**
                 * @description count specials in the overall stats (only applies if specials are included)
                 * @example true
                 */
                count_specials?: string;
                "last_activity (optional, string, `aired`) ... used to calculate last_episode and next_episode":
                    | "aired"
                    | "collected";
            };
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example game-of-thrones
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        aired?: number;
                        completed?: number;
                        last_collected_at?: string;
                        seasons?: {
                            number?: number;
                            title?: string;
                            aired?: number;
                            completed?: number;
                            episodes?: {
                                number: number;
                                completed: boolean;
                                collected_at: string | null;
                            }[];
                        }[];
                        hidden_seasons?: {
                            number?: number;
                            ids?: {
                                trakt?: number;
                                tvdb?: number;
                                tmdb?: number;
                            };
                        }[];
                        next_episode?: {
                            season?: number;
                            number?: number;
                            title?: string;
                            ids?: {
                                trakt?: number;
                                tvdb?: number;
                                imdb?: unknown;
                                tmdb?: unknown;
                            };
                        };
                        last_episode?: {
                            season?: number;
                            number?: number;
                            title?: string;
                            ids?: {
                                trakt?: number;
                                tvdb?: number;
                                imdb?: unknown;
                                tmdb?: unknown;
                            };
                        };
                    };
                };
            };
        };
    };
    "Get show watched progress": {
        parameters: {
            query: {
                /**
                 * @description include any hidden seasons
                 * @example false
                 */
                hidden?: string;
                /**
                 * @description include specials as season 0
                 * @example false
                 */
                specials?: string;
                /**
                 * @description count specials in the overall stats (only applies if specials are included)
                 * @example true
                 */
                count_specials?: string;
                "last_activity (optional, string, `aired`) ... used to calculate last_episode and next_episode":
                    | "aired"
                    | "watched";
            };
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example game-of-thrones
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        aired?: number;
                        completed?: number;
                        last_watched_at?: string;
                        reset_at?: unknown;
                        seasons?: {
                            number?: number;
                            title?: string;
                            aired?: number;
                            completed?: number;
                            episodes?: {
                                number: number;
                                completed: boolean;
                                last_watched_at: string | null;
                            }[];
                        }[];
                        hidden_seasons?: {
                            number?: number;
                            ids?: {
                                trakt?: number;
                                tvdb?: number;
                                tmdb?: number;
                            };
                        }[];
                        next_episode?: {
                            season?: number;
                            number?: number;
                            title?: string;
                            ids?: {
                                trakt?: number;
                                tvdb?: number;
                                imdb?: unknown;
                                tmdb?: unknown;
                            };
                        };
                        last_episode?: {
                            season?: number;
                            number?: number;
                            title?: string;
                            ids?: {
                                trakt?: number;
                                tvdb?: number;
                                imdb?: unknown;
                                tmdb?: unknown;
                            };
                        };
                    };
                };
            };
        };
    };
    "Reset show progress": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example game-of-thrones
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        reset_at?: string;
                    };
                };
            };
        };
    };
    "Undo reset show progress": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example game-of-thrones
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description NoContent */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "Get all people for a show": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example game-of-thrones
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description ```
             *     /shows/game-of-thrones/people?extended=guest_stars
             *     ``` */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        cast?: {
                            characters: string[];
                            episode_count: number;
                            person: {
                                name?: string;
                                ids?: {
                                    trakt?: number;
                                    slug?: string;
                                    imdb?: string;
                                    tmdb?: number;
                                };
                            };
                        }[];
                        crew?: {
                            art?: {
                                jobs: string[];
                                episode_count: number;
                                person: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                            production?: {
                                jobs: string[];
                                episode_count: number;
                                person: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                            sound?: {
                                jobs: string[];
                                episode_count: number;
                                person: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                            "visual effects"?: {
                                jobs?: string[];
                                episode_count?: number;
                                person?: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                            "costume & make-up"?: {
                                jobs?: string[];
                                episode_count?: number;
                                person?: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                            writing?: {
                                jobs?: string[];
                                episode_count?: number;
                                person?: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                            directing?: {
                                jobs: string[];
                                episode_count: number;
                                person: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                        };
                    } | {
                        cast?: {
                            characters: string[];
                            episode_count: number;
                            person: {
                                name?: string;
                                ids?: {
                                    trakt?: number;
                                    slug?: string;
                                    imdb?: string;
                                    tmdb?: number;
                                };
                            };
                        }[];
                        guest_stars?: {
                            characters: string[];
                            episode_count: number;
                            person: {
                                name?: string;
                                ids?: {
                                    trakt?: number;
                                    slug?: string;
                                    imdb?: string;
                                    tmdb?: number;
                                };
                            };
                        }[];
                        crew?: {
                            art?: {
                                jobs: string[];
                                episode_count: number;
                                person: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                            production?: {
                                jobs: string[];
                                episode_count: number;
                                person: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                            sound?: {
                                jobs: string[];
                                episode_count: number;
                                person: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                            "visual effects"?: {
                                jobs?: string[];
                                episode_count?: number;
                                person?: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                            "costume & make-up"?: {
                                jobs?: string[];
                                episode_count?: number;
                                person?: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                            writing?: {
                                jobs?: string[];
                                episode_count?: number;
                                person?: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                            directing?: {
                                jobs: string[];
                                episode_count: number;
                                person: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                        };
                    };
                };
            };
        };
    };
    "Get show ratings": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example game-of-thrones
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        rating?: number;
                        votes?: number;
                        distribution?: {
                            1?: number;
                            2?: number;
                            3?: number;
                            4?: number;
                            5?: number;
                            6?: number;
                            7?: number;
                            8?: number;
                            9?: number;
                            10?: number;
                        };
                    };
                };
            };
        };
    };
    "Get related shows": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example game-of-thrones
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        title: string;
                        year: number;
                        ids: {
                            trakt?: number;
                            slug?: string;
                            tvdb?: number;
                            imdb?: string;
                            tmdb?: number;
                        };
                    }[];
                };
            };
        };
    };
    "Get show stats": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example game-of-thrones
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        watchers?: number;
                        plays?: number;
                        collectors?: number;
                        collected_episodes?: number;
                        comments?: number;
                        lists?: number;
                        votes?: number;
                        favorited?: number;
                    };
                };
            };
        };
    };
    "Get show studios": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example game-of-thrones
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        name: string;
                        country: string;
                        ids: {
                            trakt?: number;
                            slug?: string;
                            tmdb?: number;
                        };
                    }[];
                };
            };
        };
    };
    "Get users watching right now 1": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example game-of-thrones
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        username: string;
                        private: boolean;
                        name: string;
                        vip: boolean;
                        vip_ep: boolean;
                        ids: {
                            slug?: string;
                        };
                    }[];
                };
            };
        };
    };
    "Get next episode": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example game-of-thrones
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        season?: number;
                        number?: number;
                        title?: string;
                        ids?: {
                            trakt?: number;
                            tvdb?: number;
                            imdb?: unknown;
                            tmdb?: unknown;
                        };
                    };
                };
            };
        };
    };
    "Get last episode": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example game-of-thrones
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        season?: number;
                        number?: number;
                        title?: string;
                        ids?: {
                            trakt?: number;
                            tvdb?: number;
                            imdb?: string;
                            tmdb?: number;
                        };
                    };
                };
            };
        };
    };
    "Refresh show metadata": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example game-of-thrones
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "Get all seasons for a show": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example game-of-thrones
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description ```
             *     /shows/game-of-thrones/seasons?extended=episodes
             *     ``` */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        number: number;
                        ids: {
                            trakt?: number;
                            tvdb?: number;
                            tmdb?: number;
                        };
                    }[] | {
                        number: number;
                        ids: {
                            trakt?: number;
                            tvdb?: number;
                            tmdb?: number;
                        };
                        rating: number;
                        votes: number;
                        episode_count: number;
                        aired_episodes: number;
                        title: string;
                        overview: string | null;
                        first_aired: string;
                        udpated_at: string;
                        network: string;
                    }[] | {
                        number: number;
                        ids: {
                            trakt?: number;
                            tvdb?: number | null;
                            tmdb?: number;
                        };
                        episodes: {
                            season: number;
                            number: number;
                            title: string;
                            ids: {
                                trakt?: number;
                                tvdb?: number | null;
                                imdb?: string;
                                tmdb?: number;
                            };
                        }[];
                    }[];
                };
            };
        };
    };
    "Get single seasons for a show": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example game-of-thrones
                 */
                id: string;
                /**
                 * @description season number
                 * @example 1
                 */
                season: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description ```
             *     /shows/game-of-thrones/seasons/1/info?extended=full
             *     ``` */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        number?: number;
                        ids?: {
                            trakt?: number;
                            tvdb?: number;
                            tmdb?: number;
                        };
                    } | {
                        number?: number;
                        ids?: {
                            trakt?: number;
                            tvdb?: number;
                            tmdb?: number;
                        };
                        rating?: number;
                        votes?: number;
                        episode_count?: number;
                        aired_episodes?: number;
                        title?: string;
                        overview?: string;
                        first_aired?: string;
                        udpated_at?: string;
                        network?: string;
                    };
                };
            };
        };
    };
    "Get all episodes for a single season": {
        parameters: {
            query?: {
                /**
                 * @description include episode translations
                 * @example es
                 */
                translations?: string;
            };
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example game-of-thrones
                 */
                id: string;
                /**
                 * @description season number
                 * @example 1
                 */
                season: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        season: number;
                        number: number;
                        title: string;
                        ids: {
                            trakt?: number;
                            tvdb?: number;
                            imdb?: string;
                            tmdb?: number;
                        };
                    }[];
                };
            };
        };
    };
    "Get all season translations": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example game-of-thrones
                 */
                id: string;
                /**
                 * @description season number
                 * @example 1
                 */
                season: number;
                /**
                 * @description 2 character language code
                 * @example es
                 */
                language: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        title: string;
                        overview: string;
                        language: string;
                        country: string;
                    }[];
                };
            };
        };
    };
    "Get all season comments": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example game-of-thrones
                 */
                id: string;
                /**
                 * @description season number
                 * @example 1
                 */
                season: number;
                /**
                 * @description how to sort
                 * @example newest
                 */
                sort:
                    | "newest"
                    | "oldest"
                    | "likes"
                    | "replies"
                    | "highest"
                    | "lowest"
                    | "plays"
                    | "watched";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id?: number;
                        parent_id?: number;
                        created_at?: string;
                        updated_at?: string;
                        comment?: string;
                        spoiler?: boolean;
                        review?: boolean;
                        replies?: number;
                        likes?: number;
                        user_stats?: {
                            rating?: number;
                            play_count?: number;
                            completed_count?: number;
                        };
                        user?: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get lists containing this season": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example game-of-thrones
                 */
                id: string;
                /**
                 * @description season number
                 * @example 1
                 */
                season: number;
                /**
                 * @description Filter for a specific list type
                 * @example personal
                 */
                type: "all" | "personal" | "official" | "watchlists";
                /**
                 * @description How to sort
                 * @example popular
                 */
                sort: "popular" | "likes" | "comments" | "items" | "added" | "updated";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        name?: string;
                        description?: string;
                        privacy?: string;
                        share_link?: string;
                        type?: string;
                        display_numbers?: boolean;
                        allow_comments?: boolean;
                        sort_by?: string;
                        sort_how?: string;
                        created_at?: string;
                        updated_at?: string;
                        item_count?: number;
                        comment_count?: number;
                        likes?: number;
                        ids?: {
                            trakt?: number;
                            slug?: string;
                        };
                        user?: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get all people for a season": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example game-of-thrones
                 */
                id: string;
                /**
                 * @description season number
                 * @example 1
                 */
                season: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description ```
             *     /shows/game-of-thrones/seasons/1/people?extended=guest_stars
             *     ``` */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        cast?: {
                            characters: string[];
                            episode_count: number;
                            person: {
                                name?: string;
                                ids?: {
                                    trakt?: number;
                                    slug?: string;
                                    imdb?: string;
                                    tmdb?: number;
                                };
                            };
                        }[];
                        crew?: {
                            production?: {
                                jobs: string[];
                                episode_count: number;
                                person: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                            sound?: {
                                jobs?: string[];
                                episode_count?: number;
                                person?: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                            "costume & make-up"?: {
                                jobs?: string[];
                                episode_count?: number;
                                person?: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                            writing?: {
                                jobs?: string[];
                                episode_count?: number;
                                person?: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                            art?: {
                                jobs: string[];
                                episode_count: number;
                                person: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                            directing?: {
                                jobs: string[];
                                episode_count: number;
                                person: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                        };
                    } | {
                        cast?: {
                            characters: string[];
                            episode_count: number;
                            person: {
                                name?: string;
                                ids?: {
                                    trakt?: number;
                                    slug?: string;
                                    imdb?: string;
                                    tmdb?: number;
                                };
                            };
                        }[];
                        guest_stars?: {
                            characters: string[];
                            episode_count: number;
                            person: {
                                name?: string;
                                ids?: {
                                    trakt?: number;
                                    slug?: string;
                                    imdb?: string;
                                    tmdb?: number;
                                };
                            };
                        }[];
                        crew?: {
                            production?: {
                                jobs: string[];
                                episode_count: number;
                                person: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                            sound?: {
                                jobs?: string[];
                                episode_count?: number;
                                person?: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                            "costume & make-up"?: {
                                jobs?: string[];
                                episode_count?: number;
                                person?: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                            writing?: {
                                jobs?: string[];
                                episode_count?: number;
                                person?: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                            art?: {
                                jobs: string[];
                                episode_count: number;
                                person: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                            directing?: {
                                jobs: string[];
                                episode_count: number;
                                person: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                        };
                    };
                };
            };
        };
    };
    "Get season ratings": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example game-of-thrones
                 */
                id: string;
                /**
                 * @description season number
                 * @example 1
                 */
                season: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        rating?: number;
                        votes?: number;
                        distribution?: {
                            1?: number;
                            2?: number;
                            3?: number;
                            4?: number;
                            5?: number;
                            6?: number;
                            7?: number;
                            8?: number;
                            9?: number;
                            10?: number;
                        };
                    };
                };
            };
        };
    };
    "Get season stats": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example game-of-thrones
                 */
                id: string;
                /**
                 * @description season number
                 * @example 1
                 */
                season: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        watchers?: number;
                        plays?: number;
                        collectors?: number;
                        collected_episodes?: number;
                        comments?: number;
                        lists?: number;
                        votes?: number;
                    };
                };
            };
        };
    };
    "Get users watching right now 2": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example game-of-thrones
                 */
                id: string;
                /**
                 * @description season number
                 * @example 1
                 */
                season: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        username: string;
                        private: boolean;
                        name: string;
                        vip: boolean;
                        vip_ep: boolean;
                        ids: {
                            slug?: string;
                        };
                    }[];
                };
            };
        };
    };
    "Get a single episode for a show": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example game-of-thrones
                 */
                id: string;
                /**
                 * @description season number
                 * @example 1
                 */
                season: number;
                /**
                 * @description episode number
                 * @example 1
                 */
                episode: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description ```
             *     /shows/game-of-thrones/seasons/1/episodes/1?extended=full
             *     ``` */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        season?: number;
                        number?: number;
                        title?: string;
                        ids?: {
                            trakt?: number;
                            tvdb?: number;
                            imdb?: string;
                            tmdb?: number;
                        };
                    } | {
                        season?: number;
                        number?: number;
                        title?: string;
                        ids?: {
                            trakt?: number;
                            tvdb?: number;
                            imdb?: string;
                            tmdb?: number;
                        };
                        number_abs?: unknown;
                        overview?: string;
                        first_aired?: string;
                        updated_at?: string;
                        rating?: number;
                        votes?: number;
                        comment_count?: number;
                        available_translations?: string[];
                        runtime?: number;
                        episode_type?: string;
                    };
                };
            };
        };
    };
    "Get all episode translations": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example game-of-thrones
                 */
                id: string;
                /**
                 * @description season number
                 * @example 1
                 */
                season: number;
                /**
                 * @description episode number
                 * @example 1
                 */
                episode: number;
                /**
                 * @description 2 character language code
                 * @example es
                 */
                language: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        title: string;
                        overview: string;
                        language: string;
                        country: string;
                    }[];
                };
            };
        };
    };
    "Get all episode comments": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example game-of-thrones
                 */
                id: string;
                /**
                 * @description season number
                 * @example 1
                 */
                season: number;
                /**
                 * @description episode number
                 * @example 1
                 */
                episode: number;
                /**
                 * @description how to sort
                 * @example newest
                 */
                sort: "newest" | "oldest" | "likes" | "replies" | "highest" | "lowest" | "plays";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id?: number;
                        parent_id?: number;
                        created_at?: string;
                        updated_at?: string;
                        comment?: string;
                        spoiler?: boolean;
                        review?: boolean;
                        replies?: number;
                        likes?: number;
                        user_stats?: {
                            rating?: number;
                            play_count?: number;
                            completed_count?: number;
                        };
                        user?: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get lists containing this episode": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example game-of-thrones
                 */
                id: string;
                /**
                 * @description season number
                 * @example 1
                 */
                season: number;
                /**
                 * @description episode number
                 * @example 1
                 */
                episode: number;
                /**
                 * @description Filter for a specific list type
                 * @example personal
                 */
                type: "all" | "personal" | "official" | "watchlists";
                /**
                 * @description How to sort
                 * @example popular
                 */
                sort: "popular" | "likes" | "comments" | "items" | "added" | "updated";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        name?: string;
                        description?: string;
                        privacy?: string;
                        share_link?: string;
                        type?: string;
                        display_numbers?: boolean;
                        allow_comments?: boolean;
                        sort_by?: string;
                        sort_how?: string;
                        created_at?: string;
                        updated_at?: string;
                        item_count?: number;
                        comment_count?: number;
                        likes?: number;
                        ids?: {
                            trakt?: number;
                            slug?: string;
                        };
                        user?: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get all people for an episode": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example game-of-thrones
                 */
                id: string;
                /**
                 * @description season number
                 * @example 1
                 */
                season: number;
                /**
                 * @description episode number
                 * @example 1
                 */
                episode: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description ```
             *     /shows/game-of-thrones/seasons/1/episodes/1/people?extended=guest_stars
             *     ``` */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        cast?: {
                            characters: string[];
                            person: {
                                name?: string;
                                ids?: {
                                    trakt?: number;
                                    slug?: string;
                                    imdb?: string;
                                    tmdb?: number;
                                };
                            };
                        }[];
                        crew?: {
                            writing?: {
                                jobs: string[];
                                person: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                            directing?: {
                                jobs?: string[];
                                person?: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                            camera?: {
                                jobs?: string[];
                                person?: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                            editing?: {
                                jobs?: string[];
                                person?: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                        };
                    } | {
                        cast?: {
                            characters: string[];
                            person: {
                                name?: string;
                                ids?: {
                                    trakt?: number;
                                    slug?: string;
                                    imdb?: string;
                                    tmdb?: number;
                                };
                            };
                        }[];
                        guest_stars?: {
                            characters: string[];
                            person: {
                                name?: string;
                                ids?: {
                                    trakt?: number;
                                    slug?: string;
                                    imdb?: string | null;
                                    tmdb?: number;
                                };
                            };
                        }[];
                        crew?: {
                            writing?: {
                                jobs: string[];
                                person: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                            directing?: {
                                jobs?: string[];
                                person?: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                            camera?: {
                                jobs?: string[];
                                person?: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                            editing?: {
                                jobs?: string[];
                                person?: {
                                    name?: string;
                                    ids?: {
                                        trakt?: number;
                                        slug?: string;
                                        imdb?: string;
                                        tmdb?: number;
                                    };
                                };
                            }[];
                        };
                    };
                };
            };
        };
    };
    "Get episode ratings": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example game-of-thrones
                 */
                id: string;
                /**
                 * @description season number
                 * @example 1
                 */
                season: number;
                /**
                 * @description episode number
                 * @example 12
                 */
                episode: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        rating?: number;
                        votes?: number;
                        distribution?: {
                            1?: number;
                            2?: number;
                            3?: number;
                            4?: number;
                            5?: number;
                            6?: number;
                            7?: number;
                            8?: number;
                            9?: number;
                            10?: number;
                        };
                    };
                };
            };
        };
    };
    "Get episode stats": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example game-of-thrones
                 */
                id: string;
                /**
                 * @description season number
                 * @example 1
                 */
                season: number;
                /**
                 * @description episode number
                 * @example 1
                 */
                episode: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        watchers?: number;
                        plays?: number;
                        collectors?: number;
                        collected_episodes?: number;
                        comments?: number;
                        lists?: number;
                        votes?: number;
                    };
                };
            };
        };
    };
    "Get users watching right now 3": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Trakt ID, Trakt slug, or IMDB ID
                 * @example game-of-thrones
                 */
                id: string;
                /**
                 * @description season number
                 * @example 1
                 */
                season: number;
                /**
                 * @description episode number
                 * @example 1
                 */
                episode: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        username: string;
                        private: boolean;
                        name: string;
                        vip: boolean;
                        vip_ep: boolean;
                        ids: {
                            slug?: string;
                        };
                    }[];
                };
            };
        };
    };
    "Get last activity": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        all?: string;
                        movies?: {
                            watched_at?: string;
                            collected_at?: string;
                            rated_at?: string;
                            watchlisted_at?: string;
                            favorited_at?: string;
                            commented_at?: string;
                            paused_at?: string;
                            hidden_at?: string;
                        };
                        episodes?: {
                            watched_at?: string;
                            collected_at?: string;
                            rated_at?: string;
                            watchlisted_at?: string;
                            commented_at?: string;
                            paused_at?: string;
                        };
                        shows?: {
                            rated_at?: string;
                            watchlisted_at?: string;
                            favorited_at?: string;
                            commented_at?: string;
                            hidden_at?: string;
                        };
                        seasons?: {
                            rated_at?: string;
                            watchlisted_at?: string;
                            commented_at?: string;
                            hidden_at?: string;
                        };
                        comments?: {
                            liked_at?: string;
                            blocked_at?: string;
                        };
                        lists?: {
                            liked_at?: string;
                            updated_at?: string;
                            commented_at?: string;
                        };
                        watchlist?: {
                            updated_at?: string;
                        };
                        favorites?: {
                            updated_at?: string;
                        };
                        account?: {
                            settings_at?: string;
                            followed_at?: string;
                            following_at?: string;
                            pending_at?: string;
                            requested_at?: string;
                        };
                        saved_filters?: {
                            updated_at?: string;
                        };
                        notes?: {
                            updated_at?: string;
                        };
                    };
                };
            };
        };
    };
    "Get playback progress": {
        parameters: {
            query?: {
                /**
                 * @description Starting date.
                 * @example 2016-06-01T00:00:00.000Z
                 */
                start_at?: string;
                /**
                 * @description Ending date.
                 * @example 2016-07-01T23:59:59.000Z
                 */
                end_at?: string;
            };
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /** @example movies */
                type: "movies" | "episodes";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        progress: number;
                        paused_at: string;
                        id: number;
                        type: string;
                        movie?: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        episode?: {
                            season?: number;
                            number?: number;
                            title?: string;
                            ids?: {
                                trakt?: number;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        show?: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Remove a playback item": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description playback ID
                 * @example 13
                 */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description NoContent */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "Get collection": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /** @example movies */
                type: "movies" | "shows";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description ```
             *     /sync/collection/shows?extended=metadata
             *     ``` */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        collected_at: string;
                        updated_at: string;
                        movie: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[] | {
                        collected_at: string;
                        updated_at: string;
                        movie: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        metadata: {
                            media_type?: string;
                            resolution?: string;
                            hdr?: string;
                            audio?: string;
                            audio_channels?: string;
                            "3d"?: boolean;
                        };
                    }[] | {
                        last_collected_at: string;
                        last_updated_at: string;
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        seasons: {
                            number: number;
                            episodes: {
                                number: number;
                                collected_at: string;
                            }[];
                        }[];
                    }[] | {
                        last_collected_at: string;
                        last_updated_at: string;
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        seasons: {
                            number: number;
                            episodes: {
                                number: number;
                                collected_at: string;
                                metadata: {
                                    media_type?: string;
                                    resolution?: string;
                                    hdr?: string;
                                    audio?: string;
                                    audio_channels?: string;
                                    "3d"?: boolean;
                                };
                            }[];
                        }[];
                    }[];
                };
            };
        };
    };
    "Add items to collection": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                /** @example {
                 *       "movies": [
                 *         {
                 *           "collected_at": "2014-09-01T09:10:11.000Z",
                 *           "title": "Batman Begins",
                 *           "year": 2005,
                 *           "ids": {
                 *             "trakt": 1,
                 *             "slug": "batman-begins-2005",
                 *             "imdb": "tt0372784",
                 *             "tmdb": 272
                 *           },
                 *           "media_type": "digital",
                 *           "resolution": "uhd_4k",
                 *           "hdr": "dolby_vision",
                 *           "audio": "dts_ma",
                 *           "audio_channels": "5.1"
                 *         },
                 *         {
                 *           "ids": {
                 *             "imdb": "tt0000111"
                 *           }
                 *         }
                 *       ],
                 *       "shows": [
                 *         {
                 *           "title": "Breaking Bad",
                 *           "year": 2008,
                 *           "ids": {
                 *             "trakt": 1,
                 *             "slug": "breaking-bad",
                 *             "tvdb": 81189,
                 *             "imdb": "tt0903747",
                 *             "tmdb": 1396
                 *           }
                 *         },
                 *         {
                 *           "title": "The Walking Dead",
                 *           "year": 2010,
                 *           "ids": {
                 *             "trakt": 2,
                 *             "slug": "the-walking-dead",
                 *             "tvdb": 153021,
                 *             "imdb": "tt1520211",
                 *             "tmdb": 1402
                 *           },
                 *           "seasons": [
                 *             {
                 *               "number": 3
                 *             }
                 *           ]
                 *         },
                 *         {
                 *           "title": "Mad Men",
                 *           "year": 2007,
                 *           "ids": {
                 *             "trakt": 4,
                 *             "slug": "mad-men",
                 *             "tvdb": 80337,
                 *             "imdb": "tt0804503",
                 *             "tmdb": 1104
                 *           },
                 *           "seasons": [
                 *             {
                 *               "number": 1,
                 *               "episodes": [
                 *                 {
                 *                   "number": 1,
                 *                   "media_type": "bluray",
                 *                   "resolution": "hd_1080p",
                 *                   "audio": "dolby_digital_plus",
                 *                   "audio_channels": "5.1"
                 *                 },
                 *                 {
                 *                   "number": 2
                 *                 }
                 *               ]
                 *             }
                 *           ]
                 *         }
                 *       ],
                 *       "seasons": [
                 *         {
                 *           "ids": {
                 *             "trakt": 140912,
                 *             "tvdb": 703353,
                 *             "tmdb": 81266
                 *           }
                 *         }
                 *       ],
                 *       "episodes": [
                 *         {
                 *           "ids": {
                 *             "trakt": 1061,
                 *             "tvdb": 1555111,
                 *             "imdb": "tt007404",
                 *             "tmdb": 422183
                 *           }
                 *         }
                 *       ]
                 *     } */
                "application/json": {
                    movies?: {
                        collected_at?: string;
                        title?: string;
                        year?: number;
                        ids: {
                            trakt?: number;
                            slug?: string;
                            imdb?: string;
                            tmdb?: number;
                        };
                        media_type?: string;
                        resolution?: string;
                        hdr?: string;
                        audio?: string;
                        audio_channels?: string;
                    }[];
                    shows?: {
                        title: string;
                        year: number;
                        ids: {
                            trakt?: number;
                            slug?: string;
                            tvdb?: number;
                            imdb?: string;
                            tmdb?: number;
                        };
                        seasons: {
                            number: number;
                            episodes?: {
                                number: number;
                                media_type?: string;
                                resolution?: string;
                                audio?: string;
                                audio_channels?: string;
                            }[];
                        }[];
                    }[];
                    seasons?: {
                        ids?: {
                            trakt?: number;
                            tvdb?: number;
                            tmdb?: number;
                        };
                    }[];
                    episodes?: {
                        ids?: {
                            trakt?: number;
                            tvdb?: number;
                            imdb?: string;
                            tmdb?: number;
                        };
                    }[];
                };
            };
        };
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        added?: {
                            movies?: number;
                            episodes?: number;
                        };
                        updated?: {
                            movies?: number;
                            episodes?: number;
                        };
                        existing?: {
                            movies?: number;
                            episodes?: number;
                        };
                        not_found?: {
                            movies?: {
                                ids?: {
                                    imdb?: string;
                                };
                            }[];
                            shows?: unknown[];
                            seasons?: unknown[];
                            episodes?: unknown[];
                        };
                    };
                };
            };
        };
    };
    "Remove items from collection": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                /** @example {
                 *       "movies": [
                 *         {
                 *           "title": "Batman Begins",
                 *           "year": 2005,
                 *           "ids": {
                 *             "trakt": 1,
                 *             "slug": "batman-begins-2005",
                 *             "imdb": "tt0372784",
                 *             "tmdb": 272
                 *           }
                 *         },
                 *         {
                 *           "ids": {
                 *             "imdb": "tt0000111"
                 *           }
                 *         }
                 *       ],
                 *       "shows": [
                 *         {
                 *           "title": "Breaking Bad",
                 *           "year": 2008,
                 *           "ids": {
                 *             "trakt": 1,
                 *             "slug": "breaking-bad",
                 *             "tvdb": 81189,
                 *             "imdb": "tt0903747",
                 *             "tmdb": 1396
                 *           }
                 *         },
                 *         {
                 *           "title": "The Walking Dead",
                 *           "year": 2010,
                 *           "ids": {
                 *             "trakt": 2,
                 *             "slug": "the-walking-dead",
                 *             "tvdb": 153021,
                 *             "imdb": "tt1520211",
                 *             "tmdb": 1402
                 *           },
                 *           "seasons": [
                 *             {
                 *               "number": 3
                 *             }
                 *           ]
                 *         },
                 *         {
                 *           "title": "Mad Men",
                 *           "year": 2007,
                 *           "ids": {
                 *             "trakt": 4,
                 *             "slug": "mad-men",
                 *             "tvdb": 80337,
                 *             "imdb": "tt0804503",
                 *             "tmdb": 1104
                 *           },
                 *           "seasons": [
                 *             {
                 *               "number": 1,
                 *               "episodes": [
                 *                 {
                 *                   "number": 1
                 *                 },
                 *                 {
                 *                   "number": 2
                 *                 }
                 *               ]
                 *             }
                 *           ]
                 *         }
                 *       ],
                 *       "seasons": [
                 *         {
                 *           "ids": {
                 *             "trakt": 140912,
                 *             "tvdb": 703353,
                 *             "tmdb": 81266
                 *           }
                 *         }
                 *       ],
                 *       "episodes": [
                 *         {
                 *           "ids": {
                 *             "trakt": 1061,
                 *             "tvdb": 1555111,
                 *             "imdb": "tt007404",
                 *             "tmdb": 422183
                 *           }
                 *         }
                 *       ]
                 *     } */
                "application/json": {
                    movies?: {
                        title?: string;
                        year?: number;
                        ids: {
                            trakt?: number;
                            slug?: string;
                            imdb?: string;
                            tmdb?: number;
                        };
                    }[];
                    shows?: {
                        title: string;
                        year: number;
                        ids: {
                            trakt?: number;
                            slug?: string;
                            tvdb?: number;
                            imdb?: string;
                            tmdb?: number;
                        };
                        seasons: {
                            number: number;
                            episodes?: {
                                number: number;
                            }[];
                        }[];
                    }[];
                    seasons?: {
                        ids?: {
                            trakt?: number;
                            tvdb?: number;
                            tmdb?: number;
                        };
                    }[];
                    episodes?: {
                        ids?: {
                            trakt?: number;
                            tvdb?: number;
                            imdb?: string;
                            tmdb?: number;
                        };
                    }[];
                };
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        deleted?: {
                            movies?: number;
                            episodes?: number;
                        };
                        not_found?: {
                            movies?: {
                                ids?: {
                                    imdb?: string;
                                };
                            }[];
                            shows?: unknown[];
                            seasons?: unknown[];
                            episodes?: unknown[];
                        };
                    };
                };
            };
        };
    };
    "Get watched": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /** @example movies */
                type: "movies" | "shows";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description ```
             *     /sync/watched/shows?extended=noseasons
             *     ``` */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        plays: number;
                        last_watched_at: string;
                        last_updated_at: string;
                        movie: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[] | {
                        plays: number;
                        last_watched_at: string;
                        last_updated_at: string;
                        reset_at?: unknown;
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        seasons: {
                            number: number;
                            episodes: {
                                number: number;
                                plays: number;
                                last_watched_at: string;
                            }[];
                        }[];
                    }[] | {
                        plays: number;
                        last_watched_at: string;
                        last_updated_at: string;
                        reset_at: string | null;
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get watched history": {
        parameters: {
            query?: {
                /**
                 * @description Starting date.
                 * @example 2016-06-01T00:00:00.000Z
                 */
                start_at?: string;
                /**
                 * @description Ending date.
                 * @example 2016-07-01T23:59:59.000Z
                 */
                end_at?: string;
            };
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /** @example movies */
                type: "movies" | "shows" | "seasons" | "episodes";
                /**
                 * @description Trakt ID for a specific item.
                 * @example 123
                 */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description ```
             *     /sync/history/episodes
             *     ``` */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id: number;
                        watched_at: string;
                        action: string;
                        type: string;
                        movie: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        episode?: {
                            season?: number;
                            number?: number;
                            title?: string;
                            ids?: {
                                trakt?: number;
                                tvdb?: number;
                                imdb?: unknown;
                                tmdb?: number;
                            };
                        };
                        show?: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[] | {
                        id: number;
                        watched_at: string;
                        action: string;
                        type: string;
                        movie: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[] | {
                        id: number;
                        watched_at: string;
                        action: string;
                        type: string;
                        episode: {
                            season?: number;
                            number?: number;
                            title?: string;
                            ids?: {
                                trakt?: number;
                                tvdb?: number;
                                imdb?: unknown;
                                tmdb?: number;
                            };
                        };
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Add items to watched history": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                /** @example {
                 *       "movies": [
                 *         {
                 *           "watched_at": "2014-09-01T09:10:11.000Z",
                 *           "title": "Batman Begins",
                 *           "year": 2005,
                 *           "ids": {
                 *             "trakt": 1,
                 *             "slug": "batman-begins-2005",
                 *             "imdb": "tt0372784",
                 *             "tmdb": 272
                 *           }
                 *         },
                 *         {
                 *           "ids": {
                 *             "imdb": "tt0000111"
                 *           }
                 *         }
                 *       ],
                 *       "shows": [
                 *         {
                 *           "title": "Breaking Bad",
                 *           "year": 2008,
                 *           "ids": {
                 *             "trakt": 1,
                 *             "slug": "breaking-bad",
                 *             "tvdb": 81189,
                 *             "imdb": "tt0903747",
                 *             "tmdb": 1396
                 *           }
                 *         },
                 *         {
                 *           "title": "The Walking Dead",
                 *           "year": 2010,
                 *           "ids": {
                 *             "trakt": 2,
                 *             "slug": "the-walking-dead",
                 *             "tvdb": 153021,
                 *             "imdb": "tt1520211",
                 *             "tmdb": 1402
                 *           },
                 *           "seasons": [
                 *             {
                 *               "watched_at": "2014-09-01T09:10:11.000Z",
                 *               "number": 3
                 *             }
                 *           ]
                 *         },
                 *         {
                 *           "title": "Mad Men",
                 *           "year": 2007,
                 *           "ids": {
                 *             "trakt": 4,
                 *             "slug": "mad-men",
                 *             "tvdb": 80337,
                 *             "imdb": "tt0804503",
                 *             "tmdb": 1104
                 *           },
                 *           "seasons": [
                 *             {
                 *               "number": 1,
                 *               "episodes": [
                 *                 {
                 *                   "watched_at": "2014-09-01T09:10:11.000Z",
                 *                   "number": 1
                 *                 },
                 *                 {
                 *                   "number": 2
                 *                 }
                 *               ]
                 *             }
                 *           ]
                 *         }
                 *       ],
                 *       "seasons": [
                 *         {
                 *           "watched_at": "2019-01-02T09:10:11.000Z",
                 *           "ids": {
                 *             "trakt": 140912,
                 *             "tvdb": 703353,
                 *             "tmdb": 81266
                 *           }
                 *         }
                 *       ],
                 *       "episodes": [
                 *         {
                 *           "watched_at": "2014-09-01T09:10:11.000Z",
                 *           "ids": {
                 *             "trakt": 1061,
                 *             "tvdb": 1555111,
                 *             "imdb": "tt007404",
                 *             "tmdb": 422183
                 *           }
                 *         }
                 *       ]
                 *     } */
                "application/json": {
                    movies?: {
                        watched_at?: string;
                        title?: string;
                        year?: number;
                        ids: {
                            trakt?: number;
                            slug?: string;
                            imdb?: string;
                            tmdb?: number;
                        };
                    }[];
                    shows?: {
                        title: string;
                        year: number;
                        ids: {
                            trakt?: number;
                            slug?: string;
                            tvdb?: number;
                            imdb?: string;
                            tmdb?: number;
                        };
                        seasons: {
                            watched_at?: string;
                            number: number;
                            episodes?: {
                                watched_at?: string;
                                number: number;
                            }[];
                        }[];
                    }[];
                    seasons?: {
                        watched_at?: string;
                        ids?: {
                            trakt?: number;
                            tvdb?: number;
                            tmdb?: number;
                        };
                    }[];
                    episodes?: {
                        watched_at?: string;
                        ids?: {
                            trakt?: number;
                            tvdb?: number;
                            imdb?: string;
                            tmdb?: number;
                        };
                    }[];
                };
            };
        };
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        added?: {
                            movies?: number;
                            episodes?: number;
                        };
                        not_found?: {
                            movies?: {
                                ids?: {
                                    imdb?: string;
                                };
                            }[];
                            shows?: unknown[];
                            seasons?: unknown[];
                            episodes?: unknown[];
                        };
                    };
                };
            };
        };
    };
    "Remove items from history": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                /** @example {
                 *       "movies": [
                 *         {
                 *           "title": "Batman Begins",
                 *           "year": 2005,
                 *           "ids": {
                 *             "trakt": 1,
                 *             "slug": "batman-begins-2005",
                 *             "imdb": "tt0372784",
                 *             "tmdb": 272
                 *           }
                 *         },
                 *         {
                 *           "ids": {
                 *             "imdb": "tt0000111"
                 *           }
                 *         }
                 *       ],
                 *       "shows": [
                 *         {
                 *           "title": "Breaking Bad",
                 *           "year": 2008,
                 *           "ids": {
                 *             "trakt": 1,
                 *             "slug": "breaking-bad",
                 *             "tvdb": 81189,
                 *             "imdb": "tt0903747",
                 *             "tmdb": 1396
                 *           }
                 *         },
                 *         {
                 *           "title": "The Walking Dead",
                 *           "year": 2010,
                 *           "ids": {
                 *             "trakt": 2,
                 *             "slug": "the-walking-dead",
                 *             "tvdb": 153021,
                 *             "imdb": "tt1520211",
                 *             "tmdb": 1402
                 *           },
                 *           "seasons": [
                 *             {
                 *               "number": 3
                 *             }
                 *           ]
                 *         },
                 *         {
                 *           "title": "Mad Men",
                 *           "year": 2007,
                 *           "ids": {
                 *             "trakt": 4,
                 *             "slug": "mad-men",
                 *             "tvdb": 80337,
                 *             "imdb": "tt0804503",
                 *             "tmdb": 1104
                 *           },
                 *           "seasons": [
                 *             {
                 *               "number": 1,
                 *               "episodes": [
                 *                 {
                 *                   "number": 1
                 *                 },
                 *                 {
                 *                   "number": 2
                 *                 }
                 *               ]
                 *             }
                 *           ]
                 *         }
                 *       ],
                 *       "seasons": [
                 *         {
                 *           "ids": {
                 *             "trakt": 140912,
                 *             "tvdb": 703353,
                 *             "tmdb": 81266
                 *           }
                 *         }
                 *       ],
                 *       "episodes": [
                 *         {
                 *           "ids": {
                 *             "trakt": 1061,
                 *             "tvdb": 1555111,
                 *             "imdb": "tt007404",
                 *             "tmdb": 422183
                 *           }
                 *         }
                 *       ],
                 *       "ids": [
                 *         4,
                 *         8,
                 *         15,
                 *         16,
                 *         23,
                 *         42
                 *       ]
                 *     } */
                "application/json": {
                    movies?: {
                        title?: string;
                        year?: number;
                        ids: {
                            trakt?: number;
                            slug?: string;
                            imdb?: string;
                            tmdb?: number;
                        };
                    }[];
                    shows?: {
                        title: string;
                        year: number;
                        ids: {
                            trakt?: number;
                            slug?: string;
                            tvdb?: number;
                            imdb?: string;
                            tmdb?: number;
                        };
                        seasons: {
                            number: number;
                            episodes?: {
                                number: number;
                            }[];
                        }[];
                    }[];
                    seasons?: {
                        ids?: {
                            trakt?: number;
                            tvdb?: number;
                            tmdb?: number;
                        };
                    }[];
                    episodes?: {
                        ids?: {
                            trakt?: number;
                            tvdb?: number;
                            imdb?: string;
                            tmdb?: number;
                        };
                    }[];
                    ids?: number[];
                };
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        deleted?: {
                            movies?: number;
                            episodes?: number;
                        };
                        not_found?: {
                            movies?: {
                                ids?: {
                                    imdb?: string;
                                };
                            }[];
                            shows?: unknown[];
                            seasons?: unknown[];
                            episodes?: unknown[];
                            ids?: number[];
                        };
                    };
                };
            };
        };
    };
    "Get ratings": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /** @example movies */
                type: "movies" | "shows" | "seasons" | "episodes" | "all";
                /**
                 * @description Filter for a specific rating.
                 * @example 9
                 */
                rating: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description ```
             *     /sync/ratings/episodes
             *     ``` */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        rated_at: string;
                        rating: number;
                        type: string;
                        movie: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[] | {
                        rated_at: string;
                        rating: number;
                        type: string;
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[] | {
                        rated_at: string;
                        rating: number;
                        type: string;
                        season: {
                            number?: number;
                            ids?: {
                                tvdb?: number;
                                tmdb?: number;
                            };
                        };
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[] | {
                        rated_at: string;
                        rating: number;
                        type: string;
                        episode: {
                            season?: number;
                            number?: number;
                            title?: string;
                            ids?: {
                                trakt?: number;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Add new ratings": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                /** @example {
                 *       "movies": [
                 *         {
                 *           "rated_at": "2014-09-01T09:10:11.000Z",
                 *           "rating": 5,
                 *           "title": "Batman Begins",
                 *           "year": 2005,
                 *           "ids": {
                 *             "trakt": 1,
                 *             "slug": "batman-begins-2005",
                 *             "imdb": "tt0372784",
                 *             "tmdb": 272
                 *           }
                 *         },
                 *         {
                 *           "rating": 10,
                 *           "ids": {
                 *             "imdb": "tt0000111"
                 *           }
                 *         }
                 *       ],
                 *       "shows": [
                 *         {
                 *           "rating": 10,
                 *           "title": "Breaking Bad",
                 *           "year": 2008,
                 *           "ids": {
                 *             "trakt": 1,
                 *             "slug": "breaking-bad",
                 *             "tvdb": 81189,
                 *             "imdb": "tt0903747",
                 *             "tmdb": 1396
                 *           }
                 *         },
                 *         {
                 *           "title": "The Walking Dead",
                 *           "year": 2010,
                 *           "ids": {
                 *             "trakt": 2,
                 *             "slug": "the-walking-dead",
                 *             "tvdb": 153021,
                 *             "imdb": "tt1520211",
                 *             "tmdb": 1402
                 *           },
                 *           "seasons": [
                 *             {
                 *               "rating": 9,
                 *               "number": 3
                 *             }
                 *           ]
                 *         },
                 *         {
                 *           "title": "Mad Men",
                 *           "year": 2007,
                 *           "ids": {
                 *             "trakt": 4,
                 *             "slug": "mad-men",
                 *             "tvdb": 80337,
                 *             "imdb": "tt0804503",
                 *             "tmdb": 1104
                 *           },
                 *           "seasons": [
                 *             {
                 *               "number": 1,
                 *               "episodes": [
                 *                 {
                 *                   "rating": 8,
                 *                   "number": 1
                 *                 },
                 *                 {
                 *                   "rating": 8,
                 *                   "number": 2
                 *                 }
                 *               ]
                 *             }
                 *           ]
                 *         }
                 *       ],
                 *       "seasons": [
                 *         {
                 *           "rating": 10,
                 *           "ids": {
                 *             "trakt": 140912,
                 *             "tvdb": 703353,
                 *             "tmdb": 81266
                 *           }
                 *         }
                 *       ],
                 *       "episodes": [
                 *         {
                 *           "rating": 7,
                 *           "ids": {
                 *             "trakt": 1061,
                 *             "tvdb": 1555111,
                 *             "imdb": "tt007404",
                 *             "tmdb": 422183
                 *           }
                 *         }
                 *       ]
                 *     } */
                "application/json": {
                    movies?: {
                        rated_at?: string;
                        rating: number;
                        title?: string;
                        year?: number;
                        ids: {
                            trakt?: number;
                            slug?: string;
                            imdb?: string;
                            tmdb?: number;
                        };
                    }[];
                    shows?: {
                        rating?: number;
                        title: string;
                        year: number;
                        ids: {
                            trakt?: number;
                            slug?: string;
                            tvdb?: number;
                            imdb?: string;
                            tmdb?: number;
                        };
                        seasons: {
                            rating?: number;
                            number: number;
                            episodes?: {
                                rating: number;
                                number: number;
                            }[];
                        }[];
                    }[];
                    seasons?: {
                        rating?: number;
                        ids?: {
                            trakt?: number;
                            tvdb?: number;
                            tmdb?: number;
                        };
                    }[];
                    episodes?: {
                        rating?: number;
                        ids?: {
                            trakt?: number;
                            tvdb?: number;
                            imdb?: string;
                            tmdb?: number;
                        };
                    }[];
                };
            };
        };
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        added?: {
                            movies?: number;
                            shows?: number;
                            seasons?: number;
                            episodes?: number;
                        };
                        not_found?: {
                            movies?: {
                                rating?: number;
                                ids?: {
                                    imdb?: string;
                                };
                            }[];
                            shows?: unknown[];
                            seasons?: unknown[];
                            episodes?: unknown[];
                        };
                    };
                };
            };
        };
    };
    "Remove ratings": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                /** @example {
                 *       "movies": [
                 *         {
                 *           "title": "Batman Begins",
                 *           "year": 2005,
                 *           "ids": {
                 *             "trakt": 1,
                 *             "slug": "batman-begins-2005",
                 *             "imdb": "tt0372784",
                 *             "tmdb": 272
                 *           }
                 *         },
                 *         {
                 *           "ids": {
                 *             "imdb": "tt0000111"
                 *           }
                 *         }
                 *       ],
                 *       "shows": [
                 *         {
                 *           "title": "Breaking Bad",
                 *           "year": 2008,
                 *           "ids": {
                 *             "trakt": 1,
                 *             "slug": "breaking-bad",
                 *             "tvdb": 81189,
                 *             "imdb": "tt0903747",
                 *             "tmdb": 1396
                 *           }
                 *         },
                 *         {
                 *           "title": "The Walking Dead",
                 *           "year": 2010,
                 *           "ids": {
                 *             "trakt": 2,
                 *             "slug": "the-walking-dead",
                 *             "tvdb": 153021,
                 *             "imdb": "tt1520211",
                 *             "tmdb": 1402
                 *           },
                 *           "seasons": [
                 *             {
                 *               "number": 3
                 *             }
                 *           ]
                 *         },
                 *         {
                 *           "title": "Mad Men",
                 *           "year": 2007,
                 *           "ids": {
                 *             "trakt": 4,
                 *             "slug": "mad-men",
                 *             "tvdb": 80337,
                 *             "imdb": "tt0804503",
                 *             "tmdb": 1104
                 *           },
                 *           "seasons": [
                 *             {
                 *               "number": 1,
                 *               "episodes": [
                 *                 {
                 *                   "number": 1
                 *                 },
                 *                 {
                 *                   "number": 2
                 *                 }
                 *               ]
                 *             }
                 *           ]
                 *         }
                 *       ],
                 *       "seasons": [
                 *         {
                 *           "ids": {
                 *             "trakt": 140912,
                 *             "tvdb": 703353,
                 *             "tmdb": 81266
                 *           }
                 *         }
                 *       ],
                 *       "episodes": [
                 *         {
                 *           "ids": {
                 *             "trakt": 1061,
                 *             "tvdb": 1555111,
                 *             "imdb": "tt007404",
                 *             "tmdb": 422183
                 *           }
                 *         }
                 *       ]
                 *     } */
                "application/json": {
                    movies?: {
                        title?: string;
                        year?: number;
                        ids: {
                            trakt?: number;
                            slug?: string;
                            imdb?: string;
                            tmdb?: number;
                        };
                    }[];
                    shows?: {
                        title: string;
                        year: number;
                        ids: {
                            trakt?: number;
                            slug?: string;
                            tvdb?: number;
                            imdb?: string;
                            tmdb?: number;
                        };
                        seasons: {
                            number: number;
                            episodes?: {
                                number: number;
                            }[];
                        }[];
                    }[];
                    seasons?: {
                        ids?: {
                            trakt?: number;
                            tvdb?: number;
                            tmdb?: number;
                        };
                    }[];
                    episodes?: {
                        ids?: {
                            trakt?: number;
                            tvdb?: number;
                            imdb?: string;
                            tmdb?: number;
                        };
                    }[];
                };
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        deleted?: {
                            movies?: number;
                            shows?: number;
                            seasons?: number;
                            episodes?: number;
                        };
                        not_found?: {
                            movies?: {
                                ids?: {
                                    imdb?: string;
                                };
                            }[];
                            shows?: unknown[];
                            seasons?: unknown[];
                            episodes?: unknown[];
                        };
                    };
                };
            };
        };
    };
    "Get watchlist": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Filter for a specific item type
                 * @example movies
                 */
                type: "movies" | "shows" | "seasons" | "episodes";
                /**
                 * @description How to sort (only if type is also sent)
                 * @example rank
                 */
                sort: "rank" | "added" | "released" | "title";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description ```
             *     /sync/watchlist/episodes
             *     ``` */
            200: {
                headers: {
                    "X-Sort-By"?: string;
                    "X-Sort-How"?: string;
                    "X-List-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        rank: number;
                        id: number;
                        listed_at: string;
                        notes: string;
                        type: string;
                        movie: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[] | {
                        rank: number;
                        id: number;
                        listed_at: string;
                        notes: string | null;
                        type: string;
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[] | {
                        rank: number;
                        id: number;
                        listed_at: string;
                        notes: unknown;
                        type: string;
                        season: {
                            number?: number;
                            ids?: {
                                tvdb?: number;
                                tmdb?: number;
                            };
                        };
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[] | {
                        rank: number;
                        id: number;
                        listed_at: string;
                        notes: unknown;
                        type: string;
                        episode: {
                            season?: number;
                            number?: number;
                            title?: string;
                            ids?: {
                                trakt?: number;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Update watchlist": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                /** @example {
                 *       "description": "This is my watchlist!",
                 *       "sort_by": "runtime",
                 *       "sort_how": "desc"
                 *     } */
                "application/json": {
                    description?: string;
                    sort_by?: string;
                    sort_how?: string;
                };
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        name?: string;
                        description?: string;
                        privacy?: string;
                        share_link?: string;
                        type?: string;
                        display_numbers?: boolean;
                        allow_comments?: boolean;
                        sort_by?: string;
                        sort_how?: string;
                        created_at?: string;
                        updated_at?: string;
                        item_count?: number;
                        comment_count?: number;
                        likes?: number;
                        ids?: {
                            trakt?: number;
                            slug?: unknown;
                        };
                        user?: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                            };
                        };
                    };
                };
            };
        };
    };
    "Add items to watchlist": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                /** @example {
                 *       "movies": [
                 *         {
                 *           "title": "Batman Begins",
                 *           "year": 2005,
                 *           "ids": {
                 *             "trakt": 1,
                 *             "slug": "batman-begins-2005",
                 *             "imdb": "tt0372784",
                 *             "tmdb": 272
                 *           },
                 *           "notes": "One of Chritian Bale's most iconic roles."
                 *         },
                 *         {
                 *           "ids": {
                 *             "imdb": "tt0000111"
                 *           }
                 *         }
                 *       ],
                 *       "shows": [
                 *         {
                 *           "title": "Breaking Bad",
                 *           "year": 2008,
                 *           "ids": {
                 *             "trakt": 1,
                 *             "slug": "breaking-bad",
                 *             "tvdb": 81189,
                 *             "imdb": "tt0903747",
                 *             "tmdb": 1396
                 *           },
                 *           "notes": "I AM THE DANGER!"
                 *         },
                 *         {
                 *           "title": "The Walking Dead",
                 *           "year": 2010,
                 *           "ids": {
                 *             "trakt": 2,
                 *             "slug": "the-walking-dead",
                 *             "tvdb": 153021,
                 *             "imdb": "tt1520211",
                 *             "tmdb": 1402
                 *           },
                 *           "seasons": [
                 *             {
                 *               "number": 3
                 *             }
                 *           ]
                 *         },
                 *         {
                 *           "title": "Mad Men",
                 *           "year": 2007,
                 *           "ids": {
                 *             "trakt": 4,
                 *             "slug": "mad-men",
                 *             "tvdb": 80337,
                 *             "imdb": "tt0804503",
                 *             "tmdb": 1104
                 *           },
                 *           "seasons": [
                 *             {
                 *               "number": 1,
                 *               "episodes": [
                 *                 {
                 *                   "number": 1
                 *                 },
                 *                 {
                 *                   "number": 2
                 *                 }
                 *               ]
                 *             }
                 *           ]
                 *         }
                 *       ],
                 *       "seasons": [
                 *         {
                 *           "ids": {
                 *             "trakt": 140912,
                 *             "tvdb": 703353,
                 *             "tmdb": 81266
                 *           }
                 *         }
                 *       ],
                 *       "episodes": [
                 *         {
                 *           "ids": {
                 *             "trakt": 1061,
                 *             "tvdb": 1555111,
                 *             "imdb": "tt007404",
                 *             "tmdb": 422183
                 *           }
                 *         }
                 *       ]
                 *     } */
                "application/json": {
                    movies?: {
                        title?: string;
                        year?: number;
                        ids: {
                            trakt?: number;
                            slug?: string;
                            imdb?: string;
                            tmdb?: number;
                        };
                        notes?: string;
                    }[];
                    shows?: {
                        title: string;
                        year: number;
                        ids: {
                            trakt?: number;
                            slug?: string;
                            tvdb?: number;
                            imdb?: string;
                            tmdb?: number;
                        };
                        notes?: string;
                        seasons: {
                            number: number;
                            episodes?: {
                                number: number;
                            }[];
                        }[];
                    }[];
                    seasons?: {
                        ids?: {
                            trakt?: number;
                            tvdb?: number;
                            tmdb?: number;
                        };
                    }[];
                    episodes?: {
                        ids?: {
                            trakt?: number;
                            tvdb?: number;
                            imdb?: string;
                            tmdb?: number;
                        };
                    }[];
                };
            };
        };
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        added?: {
                            movies?: number;
                            shows?: number;
                            seasons?: number;
                            episodes?: number;
                        };
                        existing?: {
                            movies?: number;
                            shows?: number;
                            seasons?: number;
                            episodes?: number;
                        };
                        not_found?: {
                            movies?: {
                                ids?: {
                                    imdb?: string;
                                };
                            }[];
                            shows?: unknown[];
                            seasons?: unknown[];
                            episodes?: unknown[];
                        };
                        list?: {
                            updated_at?: string;
                            item_count?: number;
                        };
                    };
                };
            };
            420: {
                headers: {
                    "X-Upgrade-URL"?: string;
                    "X-VIP-User"?: string;
                    "X-Account-Limit"?: string;
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "Remove items from watchlist": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                /** @example {
                 *       "movies": [
                 *         {
                 *           "title": "Batman Begins",
                 *           "year": 2005,
                 *           "ids": {
                 *             "trakt": 1,
                 *             "slug": "batman-begins-2005",
                 *             "imdb": "tt0372784",
                 *             "tmdb": 272
                 *           }
                 *         },
                 *         {
                 *           "ids": {
                 *             "imdb": "tt0000111"
                 *           }
                 *         }
                 *       ],
                 *       "shows": [
                 *         {
                 *           "title": "Breaking Bad",
                 *           "year": 2008,
                 *           "ids": {
                 *             "trakt": 1,
                 *             "slug": "breaking-bad",
                 *             "tvdb": 81189,
                 *             "imdb": "tt0903747",
                 *             "tmdb": 1396
                 *           }
                 *         },
                 *         {
                 *           "title": "The Walking Dead",
                 *           "year": 2010,
                 *           "ids": {
                 *             "trakt": 2,
                 *             "slug": "the-walking-dead",
                 *             "tvdb": 153021,
                 *             "imdb": "tt1520211",
                 *             "tmdb": 1402
                 *           },
                 *           "seasons": [
                 *             {
                 *               "number": 3
                 *             }
                 *           ]
                 *         },
                 *         {
                 *           "title": "Mad Men",
                 *           "year": 2007,
                 *           "ids": {
                 *             "trakt": 4,
                 *             "slug": "mad-men",
                 *             "tvdb": 80337,
                 *             "imdb": "tt0804503",
                 *             "tmdb": 1104
                 *           },
                 *           "seasons": [
                 *             {
                 *               "number": 1,
                 *               "episodes": [
                 *                 {
                 *                   "number": 1
                 *                 },
                 *                 {
                 *                   "number": 2
                 *                 }
                 *               ]
                 *             }
                 *           ]
                 *         }
                 *       ],
                 *       "seasons": [
                 *         {
                 *           "ids": {
                 *             "trakt": 140912,
                 *             "tvdb": 703353,
                 *             "tmdb": 81266
                 *           }
                 *         }
                 *       ],
                 *       "episodes": [
                 *         {
                 *           "ids": {
                 *             "trakt": 1061,
                 *             "tvdb": 1555111,
                 *             "imdb": "tt007404",
                 *             "tmdb": 422183
                 *           }
                 *         }
                 *       ]
                 *     } */
                "application/json": {
                    movies?: {
                        title?: string;
                        year?: number;
                        ids: {
                            trakt?: number;
                            slug?: string;
                            imdb?: string;
                            tmdb?: number;
                        };
                    }[];
                    shows?: {
                        title: string;
                        year: number;
                        ids: {
                            trakt?: number;
                            slug?: string;
                            tvdb?: number;
                            imdb?: string;
                            tmdb?: number;
                        };
                        seasons: {
                            number: number;
                            episodes?: {
                                number: number;
                            }[];
                        }[];
                    }[];
                    seasons?: {
                        ids?: {
                            trakt?: number;
                            tvdb?: number;
                            tmdb?: number;
                        };
                    }[];
                    episodes?: {
                        ids?: {
                            trakt?: number;
                            tvdb?: number;
                            imdb?: string;
                            tmdb?: number;
                        };
                    }[];
                };
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        deleted?: {
                            movies?: number;
                            shows?: number;
                            seasons?: number;
                            episodes?: number;
                        };
                        not_found?: {
                            movies?: {
                                ids?: {
                                    imdb?: string;
                                };
                            }[];
                            shows?: unknown[];
                            seasons?: unknown[];
                            episodes?: unknown[];
                        };
                        list?: {
                            updated_at?: string;
                            item_count?: number;
                        };
                    };
                };
            };
        };
    };
    "Reorder watchlist items": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                /** @example {
                 *       "rank": [
                 *         923,
                 *         324,
                 *         98768,
                 *         456456,
                 *         345,
                 *         12,
                 *         990
                 *       ]
                 *     } */
                "application/json": {
                    rank?: number[];
                };
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        updated?: number;
                        skipped_ids?: number[];
                        list?: {
                            updated_at?: string;
                            item_count?: number;
                        };
                    };
                };
            };
        };
    };
    "Update a watchlist item": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description List Item ID
                 * @example 1337
                 */
                list_item_id: number;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                /** @example {
                 *       "notes": "This is a great movie!"
                 *     } */
                "application/json": {
                    notes?: string;
                };
            };
        };
        responses: {
            /** @description NoContent */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "Get favorites": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description Filter for a specific item type
                 * @example movies
                 */
                type: "movies" | "shows";
                /**
                 * @description How to sort (only if type is also sent)
                 * @example rank
                 */
                sort: "rank" | "added" | "released" | "title";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description ```
             *     /sync/favorites/shows
             *     ``` */
            200: {
                headers: {
                    "X-Sort-By"?: string;
                    "X-Sort-How"?: string;
                    "X-List-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        rank: number;
                        id: number;
                        listed_at: string;
                        notes: string;
                        type: string;
                        movie: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[] | {
                        rank: number;
                        id: number;
                        listed_at: string;
                        notes: string;
                        type: string;
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Update favorites": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                /** @example {
                 *       "description": "These are my favorites!",
                 *       "sort_by": "runtime",
                 *       "sort_how": "desc"
                 *     } */
                "application/json": {
                    description?: string;
                    sort_by?: string;
                    sort_how?: string;
                };
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        name?: string;
                        description?: string;
                        privacy?: string;
                        share_link?: string;
                        type?: string;
                        display_numbers?: boolean;
                        allow_comments?: boolean;
                        sort_by?: string;
                        sort_how?: string;
                        created_at?: string;
                        updated_at?: string;
                        item_count?: number;
                        comment_count?: number;
                        likes?: number;
                        ids?: {
                            trakt?: number;
                            slug?: unknown;
                        };
                        user?: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                            };
                        };
                    };
                };
            };
        };
    };
    "Add items to favorites": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                /** @example {
                 *       "movies": [
                 *         {
                 *           "title": "Batman Begins",
                 *           "year": 2005,
                 *           "ids": {
                 *             "trakt": 1,
                 *             "slug": "batman-begins-2005",
                 *             "imdb": "tt0372784",
                 *             "tmdb": 272
                 *           },
                 *           "notes": "One of Chritian Bale's most iconic roles."
                 *         },
                 *         {
                 *           "ids": {
                 *             "imdb": "tt0000111"
                 *           }
                 *         }
                 *       ],
                 *       "shows": [
                 *         {
                 *           "title": "Breaking Bad",
                 *           "year": 2008,
                 *           "ids": {
                 *             "trakt": 1,
                 *             "slug": "breaking-bad",
                 *             "tvdb": 81189,
                 *             "imdb": "tt0903747",
                 *             "tmdb": 1396
                 *           },
                 *           "notes": "I AM THE DANGER!"
                 *         },
                 *         {
                 *           "title": "The Walking Dead",
                 *           "year": 2010,
                 *           "ids": {
                 *             "trakt": 2,
                 *             "slug": "the-walking-dead",
                 *             "tvdb": 153021,
                 *             "imdb": "tt1520211",
                 *             "tmdb": 1402
                 *           }
                 *         }
                 *       ]
                 *     } */
                "application/json": {
                    movies?: {
                        title?: string;
                        year?: number;
                        ids: {
                            trakt?: number;
                            slug?: string;
                            imdb?: string;
                            tmdb?: number;
                        };
                        notes?: string;
                    }[];
                    shows?: {
                        title: string;
                        year: number;
                        ids: {
                            trakt?: number;
                            slug?: string;
                            tvdb?: number;
                            imdb?: string;
                            tmdb?: number;
                        };
                        notes?: string;
                    }[];
                };
            };
        };
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        added?: {
                            movies?: number;
                            shows?: number;
                        };
                        existing?: {
                            movies?: number;
                            shows?: number;
                        };
                        not_found?: {
                            movies?: {
                                ids?: {
                                    imdb?: string;
                                };
                            }[];
                            shows?: unknown[];
                        };
                        list?: {
                            updated_at?: string;
                            item_count?: number;
                        };
                    };
                };
            };
        };
    };
    "Remove items from favorites": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                /** @example {
                 *       "movies": [
                 *         {
                 *           "title": "Batman Begins",
                 *           "year": 2005,
                 *           "ids": {
                 *             "trakt": 1,
                 *             "slug": "batman-begins-2005",
                 *             "imdb": "tt0372784",
                 *             "tmdb": 272
                 *           }
                 *         },
                 *         {
                 *           "ids": {
                 *             "imdb": "tt0000111"
                 *           }
                 *         }
                 *       ],
                 *       "shows": [
                 *         {
                 *           "title": "Breaking Bad",
                 *           "year": 2008,
                 *           "ids": {
                 *             "trakt": 1,
                 *             "slug": "breaking-bad",
                 *             "tvdb": 81189,
                 *             "imdb": "tt0903747",
                 *             "tmdb": 1396
                 *           }
                 *         }
                 *       ]
                 *     } */
                "application/json": {
                    movies?: {
                        title?: string;
                        year?: number;
                        ids: {
                            trakt?: number;
                            slug?: string;
                            imdb?: string;
                            tmdb?: number;
                        };
                    }[];
                    shows?: {
                        title?: string;
                        year?: number;
                        ids?: {
                            trakt?: number;
                            slug?: string;
                            tvdb?: number;
                            imdb?: string;
                            tmdb?: number;
                        };
                    }[];
                };
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        deleted?: {
                            movies?: number;
                            shows?: number;
                        };
                        not_found?: {
                            movies?: {
                                ids?: {
                                    imdb?: string;
                                };
                            }[];
                            shows?: unknown[];
                        };
                        list?: {
                            updated_at?: string;
                            item_count?: number;
                        };
                    };
                };
            };
        };
    };
    "Reorder favorited items": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                /** @example {
                 *       "rank": [
                 *         923,
                 *         324,
                 *         98768,
                 *         456456,
                 *         345,
                 *         12,
                 *         990
                 *       ]
                 *     } */
                "application/json": {
                    rank?: number[];
                };
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        updated?: number;
                        skipped_ids?: number[];
                        list?: {
                            updated_at?: string;
                            item_count?: number;
                        };
                    };
                };
            };
        };
    };
    "Update a favorite item": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description List Item ID
                 * @example 1337
                 */
                list_item_id: number;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                /** @example {
                 *       "notes": "This is a great movie!"
                 *     } */
                "application/json": {
                    notes?: string;
                };
            };
        };
        responses: {
            /** @description NoContent */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "Retrieve settings": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        user?: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                                uuid?: string;
                            };
                            joined_at?: string;
                            location?: string;
                            about?: string;
                            gender?: string;
                            age?: number;
                            images?: {
                                avatar?: {
                                    full?: string;
                                };
                            };
                            vip_og?: boolean;
                            vip_years?: number;
                        };
                        account?: {
                            timezone?: string;
                            date_format?: string;
                            time_24hr?: boolean;
                            cover_image?: string;
                        };
                        connections?: {
                            facebook?: boolean;
                            twitter?: boolean;
                            mastodon?: boolean;
                            google?: boolean;
                            tumblr?: boolean;
                            medium?: boolean;
                            slack?: boolean;
                            apple?: boolean;
                            dropbox?: boolean;
                            microsoft?: boolean;
                        };
                        sharing_text?: {
                            watching?: string;
                            watched?: string;
                            rated?: string;
                        };
                        limits?: {
                            list?: {
                                count?: number;
                                item_count?: number;
                            };
                            watchlist?: {
                                item_count?: number;
                            };
                            favorites?: {
                                item_count?: number;
                            };
                        };
                    };
                };
            };
        };
    };
    "Get pending following requests": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id?: number;
                        requested_at?: string;
                        user?: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get follow requests": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id?: number;
                        requested_at?: string;
                        user?: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Approve follow request": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description ID of the follower request.
                 * @example 123
                 */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        followed_at?: string;
                        user?: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                            };
                        };
                    };
                };
            };
        };
    };
    "Deny follow request": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description ID of the follower request.
                 * @example 123
                 */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description NoContent */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "Get saved filters": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /** @example movies */
                section: "movies" | "shows" | "calendars" | "search";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        rank: number;
                        id: number;
                        section: string;
                        name: string;
                        path: string;
                        query: string;
                        updated_at: string;
                    }[];
                };
            };
        };
    };
    "Get hidden items": {
        parameters: {
            query?: {
                /** @description Narrow down by element type. */
                type?: "movie" | "show" | "season" | "user";
            };
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /** @example calendar */
                section:
                    | "calendar"
                    | "progress_watched"
                    | "progress_watched_reset"
                    | "progress_collected"
                    | "recommendations"
                    | "comments";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        hidden_at: string;
                        type: string;
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Add hidden items": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /** @example calendar */
                section: "calendar" | "progress_watched" | "progress_collected" | "recommendations";
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                /** @example {
                 *       "movies": [
                 *         {
                 *           "title": "Batman Begins",
                 *           "year": 2005,
                 *           "ids": {
                 *             "trakt": 1,
                 *             "slug": "batman-begins-2005",
                 *             "imdb": "tt0372784",
                 *             "tmdb": 272
                 *           }
                 *         },
                 *         {
                 *           "ids": {
                 *             "imdb": "tt0000111"
                 *           }
                 *         }
                 *       ],
                 *       "shows": [
                 *         {
                 *           "title": "Breaking Bad",
                 *           "year": 2008,
                 *           "ids": {
                 *             "trakt": 1,
                 *             "slug": "breaking-bad",
                 *             "tvdb": 81189,
                 *             "imdb": "tt0903747",
                 *             "tmdb": 1396
                 *           }
                 *         },
                 *         {
                 *           "title": "The Walking Dead",
                 *           "year": 2010,
                 *           "ids": {
                 *             "trakt": 2,
                 *             "slug": "the-walking-dead",
                 *             "tvdb": 153021,
                 *             "imdb": "tt1520211",
                 *             "tmdb": 1402
                 *           },
                 *           "seasons": [
                 *             {
                 *               "number": 3
                 *             }
                 *           ]
                 *         }
                 *       ],
                 *       "seasons": [
                 *         {
                 *           "ids": {
                 *             "trakt": 1337
                 *           }
                 *         }
                 *       ]
                 *     } */
                "application/json": {
                    movies?: {
                        title?: string;
                        year?: number;
                        ids: {
                            trakt?: number;
                            slug?: string;
                            imdb?: string;
                            tmdb?: number;
                        };
                    }[];
                    shows?: {
                        title: string;
                        year: number;
                        ids: {
                            trakt?: number;
                            slug?: string;
                            tvdb?: number;
                            imdb?: string;
                            tmdb?: number;
                        };
                        seasons?: {
                            number?: number;
                        }[];
                    }[];
                    seasons?: {
                        ids?: {
                            trakt?: number;
                        };
                    }[];
                };
            };
        };
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        added?: {
                            movies?: number;
                            shows?: number;
                            seasons?: number;
                            users?: number;
                        };
                        not_found?: {
                            movies?: {
                                ids?: {
                                    imdb?: string;
                                };
                            }[];
                            shows?: unknown[];
                            seasons?: unknown[];
                            users?: unknown[];
                        };
                    };
                };
            };
        };
    };
    "Remove hidden items": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /** @example calendar */
                section:
                    | "calendar"
                    | "progress_watched"
                    | "progress_collected"
                    | "recommendations"
                    | "comments";
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                /** @example {
                 *       "movies": [
                 *         {
                 *           "title": "Batman Begins",
                 *           "year": 2005,
                 *           "ids": {
                 *             "trakt": 1,
                 *             "slug": "batman-begins-2005",
                 *             "imdb": "tt0372784",
                 *             "tmdb": 272
                 *           }
                 *         },
                 *         {
                 *           "ids": {
                 *             "imdb": "tt0000111"
                 *           }
                 *         }
                 *       ],
                 *       "shows": [
                 *         {
                 *           "title": "Breaking Bad",
                 *           "year": 2008,
                 *           "ids": {
                 *             "trakt": 1,
                 *             "slug": "breaking-bad",
                 *             "tvdb": 81189,
                 *             "imdb": "tt0903747",
                 *             "tmdb": 1396
                 *           }
                 *         },
                 *         {
                 *           "title": "The Walking Dead",
                 *           "year": 2010,
                 *           "ids": {
                 *             "trakt": 2,
                 *             "slug": "the-walking-dead",
                 *             "tvdb": 153021,
                 *             "imdb": "tt1520211",
                 *             "tmdb": 1402
                 *           },
                 *           "seasons": [
                 *             {
                 *               "number": 3
                 *             }
                 *           ]
                 *         }
                 *       ],
                 *       "seasons": [
                 *         {
                 *           "ids": {
                 *             "trakt": 1337
                 *           }
                 *         }
                 *       ]
                 *     } */
                "application/json": {
                    movies?: {
                        title?: string;
                        year?: number;
                        ids: {
                            trakt?: number;
                            slug?: string;
                            imdb?: string;
                            tmdb?: number;
                        };
                    }[];
                    shows?: {
                        title: string;
                        year: number;
                        ids: {
                            trakt?: number;
                            slug?: string;
                            tvdb?: number;
                            imdb?: string;
                            tmdb?: number;
                        };
                        seasons?: {
                            number?: number;
                        }[];
                    }[];
                    seasons?: {
                        ids?: {
                            trakt?: number;
                        };
                    }[];
                };
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        deleted?: {
                            movies?: number;
                            shows?: number;
                            seasons?: number;
                            users?: number;
                        };
                        not_found?: {
                            movies?: {
                                ids?: {
                                    imdb?: string;
                                };
                            }[];
                            shows?: unknown[];
                            seasons?: unknown[];
                            users?: unknown[];
                        };
                    };
                };
            };
        };
    };
    "Get user profile": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description User slug
                 * @example sean
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description ```
             *     /users/sean?extended=vip
             *     ``` */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        username?: string;
                        private?: boolean;
                        name?: string;
                        vip?: boolean;
                        vip_ep?: boolean;
                        ids?: {
                            slug?: string;
                        };
                    } | {
                        username?: string;
                        private?: boolean;
                        ids?: {
                            slug?: string;
                        };
                    } | {
                        username?: string;
                        private?: boolean;
                        name?: string;
                        vip?: boolean;
                        vip_ep?: boolean;
                        ids?: {
                            slug?: string;
                        };
                        joined_at?: string;
                        location?: string;
                        about?: string;
                        gender?: string;
                        age?: number;
                        images?: {
                            avatar?: {
                                full?: string;
                            };
                        };
                    } | {
                        username?: string;
                        private?: boolean;
                        name?: string;
                        vip?: boolean;
                        vip_ep?: boolean;
                        ids?: {
                            slug?: string;
                        };
                        vip_og?: boolean;
                        vip_years?: number;
                        vip_cover_image?: string;
                    };
                };
            };
        };
    };
    "Get likes": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description User slug
                 * @example sean
                 */
                id: string;
                type: "comments" | "lists";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description ```
             *     /users/sean/likes/lists
             *     ``` */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        liked_at?: string;
                        type?: string;
                        comment?: {
                            id?: number;
                            parent_id?: number;
                            created_at?: string;
                            updated_at?: string;
                            comment?: string;
                            spoiler?: boolean;
                            review?: boolean;
                            replies?: number;
                            likes?: number;
                            user_stats?: {
                                rating?: unknown;
                                play_count?: number;
                                completed_count?: number;
                            };
                            user?: {
                                username?: string;
                                private?: boolean;
                                name?: string;
                                vip?: boolean;
                                vip_ep?: boolean;
                                ids?: {
                                    slug?: string;
                                };
                            };
                        };
                    }[] | {
                        liked_at?: string;
                        type?: string;
                        comment?: {
                            id?: number;
                            parent_id?: number;
                            created_at?: string;
                            updated_at?: string;
                            comment?: string;
                            spoiler?: boolean;
                            review?: boolean;
                            replies?: number;
                            likes?: number;
                            user_stats?: {
                                rating?: unknown;
                                play_count?: number;
                                completed_count?: number;
                            };
                            user?: {
                                username?: string;
                                private?: boolean;
                                name?: string;
                                vip?: boolean;
                                vip_ep?: boolean;
                                ids?: {
                                    slug?: string;
                                };
                            };
                        };
                        comment_type?: string;
                        movie?: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[] | {
                        liked_at?: string;
                        type?: string;
                        list?: {
                            name?: string;
                            description?: string;
                            privacy?: string;
                            share_link?: string;
                            display_numbers?: boolean;
                            allow_comments?: boolean;
                            updated_at?: string;
                            item_count?: number;
                            comment_count?: number;
                            likes?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                            };
                            user?: {
                                username?: string;
                                private?: boolean;
                                name?: string;
                                vip?: boolean;
                                vip_ep?: boolean;
                                ids?: {
                                    slug?: string;
                                };
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get collection 1": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description User slug
                 * @example sean
                 */
                id: string;
                /** @example movies */
                type: "movies" | "shows";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description ```
             *     /users/sean/collection/shows?extended=metadata
             *     ``` */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        collected_at: string;
                        updated_at: string;
                        movie: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[] | {
                        collected_at: string;
                        updated_at: string;
                        movie: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        metadata: {
                            media_type?: string;
                            resolution?: string;
                            hdr?: string;
                            audio?: string;
                            audio_channels?: string;
                            "3d"?: boolean;
                        };
                    }[] | {
                        last_collected_at: string;
                        last_updated_at: string;
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        seasons: {
                            number: number;
                            episodes: {
                                number: number;
                                collected_at: string;
                            }[];
                        }[];
                    }[] | {
                        last_collected_at: string;
                        last_updated_at: string;
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        seasons: {
                            number: number;
                            episodes: {
                                number: number;
                                collected_at: string;
                                metadata: {
                                    media_type?: string;
                                    resolution?: string;
                                    hdr?: string;
                                    audio?: string;
                                    audio_channels?: string;
                                    "3d"?: boolean;
                                };
                            }[];
                        }[];
                    }[];
                };
            };
        };
    };
    "Get comments": {
        parameters: {
            query?: {
                /**
                 * @description include comment replies
                 * @example false
                 */
                include_replies?: "true" | "false" | "only";
            };
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description User slug
                 * @example sean
                 */
                id: string;
                /** @example all */
                comment_type: "all" | "reviews" | "shouts";
                /** @example all */
                type: "all" | "movies" | "shows" | "seasons" | "episodes" | "lists";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description ```
             *     /users/sean/comments
             *     ``` */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        type: string;
                        movie?: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        comment: {
                            id?: number;
                            comment?: string;
                            spoiler?: boolean;
                            review?: boolean;
                            parent_id?: number;
                            created_at?: string;
                            updated_at?: string;
                            replies?: number;
                            likes?: number;
                            user_stats?: {
                                rating?: number | null;
                                play_count?: number;
                                completed_count?: number;
                            };
                            user?: {
                                username?: string;
                                private?: boolean;
                                name?: string;
                                vip?: boolean;
                                vip_ep?: boolean;
                                ids?: {
                                    slug?: string;
                                };
                            };
                        };
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        season?: {
                            number?: number;
                            ids?: {
                                trakt?: number;
                                tvdb?: number;
                                tmdb?: number;
                            };
                        };
                        episode?: {
                            season?: number;
                            number?: number;
                            title?: string;
                            ids?: {
                                trakt?: number;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        list?: {
                            name?: string;
                            description?: string;
                            privacy?: string;
                            share_link?: string;
                            display_numbers?: boolean;
                            allow_comments?: boolean;
                            updated_at?: string;
                            item_count?: number;
                            comment_count?: number;
                            likes?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get notes": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description User slug
                 * @example sean
                 */
                id: string;
                /** @example all */
                type:
                    | "all"
                    | "movies"
                    | "shows"
                    | "seasons"
                    | "episodes"
                    | "people"
                    | "history"
                    | "collection"
                    | "ratings";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description ```
             *     /users/sean/notes/ratings
             *     ``` */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        attached_to: {
                            type?: string;
                        };
                        type: string;
                        movie?: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        note: {
                            id?: number;
                            notes?: string;
                            privacy?: string;
                            spoiler?: boolean;
                            created_at?: string;
                            updated_at?: string;
                            user?: {
                                username?: string;
                                private?: boolean;
                                name?: string;
                                vip?: boolean;
                                vip_ep?: boolean;
                                ids?: {
                                    slug?: string;
                                    trakt?: number;
                                };
                            };
                        };
                        episode?: {
                            season?: number;
                            number?: number;
                            title?: string;
                            ids?: {
                                trakt?: number;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        show?: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[] | {
                        attached_to?: {
                            type?: string;
                            id?: number;
                        };
                        type?: string;
                        movie?: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        note?: {
                            id?: number;
                            notes?: string;
                            privacy?: string;
                            spoiler?: boolean;
                            created_at?: string;
                            updated_at?: string;
                            user?: {
                                username?: string;
                                private?: boolean;
                                name?: string;
                                vip?: boolean;
                                vip_ep?: boolean;
                                ids?: {
                                    slug?: string;
                                    trakt?: number;
                                };
                            };
                        };
                    }[] | {
                        attached_to?: {
                            type?: string;
                        };
                        type?: string;
                        movie?: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        note?: {
                            id?: number;
                            notes?: string;
                            privacy?: string;
                            spoiler?: boolean;
                            created_at?: string;
                            updated_at?: string;
                            user?: {
                                username?: string;
                                private?: boolean;
                                name?: string;
                                vip?: boolean;
                                vip_ep?: boolean;
                                ids?: {
                                    slug?: string;
                                    trakt?: number;
                                };
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get a user's personal lists": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description User slug
                 * @example sean
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        name: string;
                        description: string;
                        privacy: string;
                        share_link: string;
                        type: string;
                        display_numbers: boolean;
                        allow_comments: boolean;
                        sort_by: string;
                        sort_how: string;
                        created_at: string;
                        updated_at: string;
                        item_count: number;
                        comment_count: number;
                        likes: number;
                        ids: {
                            trakt?: number;
                            slug?: string;
                        };
                    }[];
                };
            };
        };
    };
    "Create personal list": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description User slug
                 * @example sean
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                /** @example {
                 *       "name": "Star Wars in machete order",
                 *       "description": "Next time you want to introduce someone to Star Wars for the first time, watch the films with them in this order: IV, V, II, III, VI.",
                 *       "privacy": "public",
                 *       "display_numbers": true,
                 *       "allow_comments": true,
                 *       "sort_by": "rank",
                 *       "sort_how": "asc"
                 *     } */
                "application/json": {
                    name?: string;
                    description?: string;
                    privacy?: string;
                    display_numbers?: boolean;
                    allow_comments?: boolean;
                    sort_by?: string;
                    sort_how?: string;
                };
            };
        };
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        name?: string;
                        description?: string;
                        privacy?: string;
                        share_link?: string;
                        type?: string;
                        display_numbers?: boolean;
                        allow_comments?: boolean;
                        sort_by?: string;
                        sort_how?: string;
                        created_at?: string;
                        updated_at?: string;
                        item_count?: number;
                        comment_count?: number;
                        likes?: number;
                        ids?: {
                            trakt?: number;
                            slug?: string;
                        };
                    };
                };
            };
            420: {
                headers: {
                    "X-Upgrade-URL"?: string;
                    "X-VIP-User"?: string;
                    "X-Account-Limit"?: string;
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "Reorder a user's lists": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description User slug
                 * @example sean
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                /** @example {
                 *       "rank": [
                 *         823,
                 *         224,
                 *         88768,
                 *         356456,
                 *         245,
                 *         2,
                 *         890
                 *       ]
                 *     } */
                "application/json": {
                    rank?: number[];
                };
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        updated?: number;
                        skipped_ids?: number[];
                    };
                };
            };
        };
    };
    "Get all lists a user can collaborate on": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description User slug
                 * @example sean
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        name?: string;
                        description?: string;
                        privacy?: string;
                        share_link?: string;
                        type?: string;
                        display_numbers?: boolean;
                        allow_comments?: boolean;
                        sort_by?: string;
                        sort_how?: string;
                        created_at?: string;
                        updated_at?: string;
                        item_count?: number;
                        comment_count?: number;
                        likes?: number;
                        ids?: {
                            trakt?: number;
                            slug?: string;
                        };
                        user?: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                                trakt?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get personal list": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description User slug
                 * @example sean
                 */
                id: string;
                /**
                 * @description Trakt ID or Trakt slug
                 * @example star-wars-in-machete-order
                 */
                list_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Sort-By"?: string;
                    "X-Sort-How"?: string;
                    "X-List-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        name?: string;
                        description?: string;
                        privacy?: string;
                        share_link?: string;
                        type?: string;
                        display_numbers?: boolean;
                        allow_comments?: boolean;
                        sort_by?: string;
                        sort_how?: string;
                        created_at?: string;
                        updated_at?: string;
                        item_count?: number;
                        comment_count?: number;
                        likes?: number;
                        ids?: {
                            trakt?: number;
                            slug?: string;
                        };
                        user?: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                            };
                        };
                    };
                };
            };
        };
    };
    "Update personal list": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description User slug
                 * @example sean
                 */
                id: string;
                /**
                 * @description Trakt ID or Trakt slug
                 * @example star-wars-in-machete-order
                 */
                list_id: string;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                /** @example {
                 *       "name": "Star Wars in NEW machete order",
                 *       "privacy": "private",
                 *       "display_numbers": false,
                 *       "sort_by": "rank",
                 *       "sort_how": "asc"
                 *     } */
                "application/json": {
                    name?: string;
                    privacy?: string;
                    display_numbers?: boolean;
                    sort_by?: string;
                    sort_how?: string;
                };
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        name?: string;
                        description?: string;
                        privacy?: string;
                        share_link?: string;
                        type?: string;
                        display_numbers?: boolean;
                        allow_comments?: boolean;
                        sort_by?: string;
                        sort_how?: string;
                        created_at?: string;
                        updated_at?: string;
                        item_count?: number;
                        comment_count?: number;
                        likes?: number;
                        ids?: {
                            trakt?: number;
                            slug?: string;
                        };
                        user?: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                            };
                        };
                    };
                };
            };
        };
    };
    "Delete a user's personal list": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description User slug
                 * @example sean
                 */
                id: string;
                /**
                 * @description Trakt ID or Trakt slug
                 * @example star-wars-in-machete-order
                 */
                list_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description NoContent */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "Get all users who liked a list 1": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description User slug
                 * @example sean
                 */
                id: string;
                /**
                 * @description Trakt ID or Trakt slug
                 * @example star-wars-in-machete-order
                 */
                list_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    "X-List-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        liked_at: string;
                        user: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Like a list 1": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description User slug
                 * @example sean
                 */
                id: string;
                /**
                 * @description Trakt ID or Trakt slug
                 * @example star-wars-in-machete-order
                 */
                list_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description NoContent */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "Remove like on a list 1": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description User slug
                 * @example sean
                 */
                id: string;
                /**
                 * @description Trakt ID or Trakt slug
                 * @example star-wars-in-machete-order
                 */
                list_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description NoContent */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "Get items on a personal list": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description User slug
                 * @example sean
                 */
                id: string;
                /**
                 * @description Trakt ID or Trakt slug
                 * @example star-wars-in-machete-order
                 */
                list_id: string;
                /**
                 * @description Filter for a specific item type
                 * @example movies
                 */
                type: "movie" | "show" | "season" | "episode" | "person";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Private-User"?: string;
                    "X-Sort-By"?: string;
                    "X-Sort-How"?: string;
                    "X-List-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        rank: number;
                        id: number;
                        listed_at: string;
                        notes: string | null;
                        type: string;
                        movie?: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        season?: {
                            number?: number;
                            ids?: {
                                tvdb?: number;
                                tmdb?: number;
                            };
                        };
                        episode?: {
                            season?: number;
                            number?: number;
                            title?: string;
                            ids?: {
                                trakt?: number;
                                tvdb?: number;
                                imdb?: unknown;
                                tmdb?: number;
                            };
                        };
                        person?: {
                            name?: string;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Add items to personal list": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description User slug
                 * @example sean
                 */
                id: string;
                /**
                 * @description Trakt ID or Trakt slug
                 * @example star-wars-in-machete-order
                 */
                list_id: string;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                /** @example {
                 *       "movies": [
                 *         {
                 *           "ids": {
                 *             "trakt": 1
                 *           },
                 *           "notes": "Amazing movie!"
                 *         },
                 *         {
                 *           "ids": {
                 *             "imdb": "tt0000111"
                 *           }
                 *         }
                 *       ],
                 *       "shows": [
                 *         {
                 *           "ids": {
                 *             "trakt": 1
                 *           }
                 *         },
                 *         {
                 *           "seasons": [
                 *             {
                 *               "number": 1
                 *             }
                 *           ],
                 *           "ids": {
                 *             "trakt": 1
                 *           },
                 *           "notes": "Best season of this show, don't bother watching the rest."
                 *         },
                 *         {
                 *           "seasons": [
                 *             {
                 *               "number": 1,
                 *               "episodes": [
                 *                 {
                 *                   "number": 1
                 *                 },
                 *                 {
                 *                   "number": 2
                 *                 }
                 *               ]
                 *             }
                 *           ],
                 *           "ids": {
                 *             "trakt": 1
                 *           }
                 *         }
                 *       ],
                 *       "seasons": [
                 *         {
                 *           "ids": {
                 *             "trakt": 140912,
                 *             "tvdb": 703353,
                 *             "tmdb": 81266
                 *           }
                 *         }
                 *       ],
                 *       "episodes": [
                 *         {
                 *           "ids": {
                 *             "trakt": 1061,
                 *             "tvdb": 1555111,
                 *             "imdb": "tt007404",
                 *             "tmdb": 422183
                 *           }
                 *         }
                 *       ],
                 *       "people": [
                 *         {
                 *           "name": "Jeff Bridges",
                 *           "ids": {
                 *             "trakt": 2,
                 *             "slug": "jeff-bridges",
                 *             "imdb": "nm0000313",
                 *             "tmdb": 1229
                 *           }
                 *         }
                 *       ]
                 *     } */
                "application/json": {
                    movies?: {
                        ids: {
                            trakt?: number;
                            imdb?: string;
                        };
                        notes?: string;
                    }[];
                    shows?: {
                        ids: {
                            trakt?: number;
                        };
                        seasons: {
                            number: number;
                            episodes?: {
                                number: number;
                            }[];
                        }[];
                        notes?: string;
                    }[];
                    seasons?: {
                        ids?: {
                            trakt?: number;
                            tvdb?: number;
                            tmdb?: number;
                        };
                    }[];
                    episodes?: {
                        ids?: {
                            trakt?: number;
                            tvdb?: number;
                            imdb?: string;
                            tmdb?: number;
                        };
                    }[];
                    people?: {
                        name?: string;
                        ids?: {
                            trakt?: number;
                            slug?: string;
                            imdb?: string;
                            tmdb?: number;
                        };
                    }[];
                };
            };
        };
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        added?: {
                            movies?: number;
                            shows?: number;
                            seasons?: number;
                            episodes?: number;
                            people?: number;
                        };
                        existing?: {
                            movies?: number;
                            shows?: number;
                            seasons?: number;
                            episodes?: number;
                            people?: number;
                        };
                        not_found?: {
                            movies?: {
                                ids?: {
                                    imdb?: string;
                                };
                            }[];
                            shows?: unknown[];
                            seasons?: unknown[];
                            episodes?: unknown[];
                            people?: unknown[];
                        };
                        list?: {
                            updated_at?: string;
                            item_count?: number;
                        };
                    };
                };
            };
            420: {
                headers: {
                    "X-Upgrade-URL"?: string;
                    "X-VIP-User"?: string;
                    "X-Account-Limit"?: string;
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "Remove items from personal list": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description User slug
                 * @example sean
                 */
                id: string;
                /**
                 * @description Trakt ID or Trakt slug
                 * @example star-wars-in-machete-order
                 */
                list_id: string;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                /** @example {
                 *       "movies": [
                 *         {
                 *           "ids": {
                 *             "trakt": 1
                 *           }
                 *         },
                 *         {
                 *           "ids": {
                 *             "imdb": "tt0000111"
                 *           }
                 *         }
                 *       ],
                 *       "shows": [
                 *         {
                 *           "ids": {
                 *             "trakt": 1
                 *           }
                 *         },
                 *         {
                 *           "seasons": [
                 *             {
                 *               "number": 1
                 *             }
                 *           ],
                 *           "ids": {
                 *             "trakt": 1
                 *           }
                 *         },
                 *         {
                 *           "seasons": [
                 *             {
                 *               "number": 1,
                 *               "episodes": [
                 *                 {
                 *                   "number": 1
                 *                 },
                 *                 {
                 *                   "number": 2
                 *                 }
                 *               ]
                 *             }
                 *           ],
                 *           "ids": {
                 *             "trakt": 1
                 *           }
                 *         }
                 *       ],
                 *       "seasons": [
                 *         {
                 *           "ids": {
                 *             "trakt": 140912,
                 *             "tvdb": 703353,
                 *             "tmdb": 81266
                 *           }
                 *         }
                 *       ],
                 *       "episodes": [
                 *         {
                 *           "ids": {
                 *             "trakt": 1061,
                 *             "tvdb": 1555111,
                 *             "imdb": "tt007404",
                 *             "tmdb": 422183
                 *           }
                 *         }
                 *       ],
                 *       "people": [
                 *         {
                 *           "name": "Jeff Bridges",
                 *           "ids": {
                 *             "trakt": 2,
                 *             "slug": "jeff-bridges",
                 *             "imdb": "nm0000313",
                 *             "tmdb": 1229
                 *           }
                 *         }
                 *       ]
                 *     } */
                "application/json": {
                    movies?: {
                        ids: {
                            trakt?: number;
                            imdb?: string;
                        };
                    }[];
                    shows?: {
                        ids: {
                            trakt?: number;
                        };
                        seasons: {
                            number: number;
                            episodes?: {
                                number: number;
                            }[];
                        }[];
                    }[];
                    seasons?: {
                        ids?: {
                            trakt?: number;
                            tvdb?: number;
                            tmdb?: number;
                        };
                    }[];
                    episodes?: {
                        ids?: {
                            trakt?: number;
                            tvdb?: number;
                            imdb?: string;
                            tmdb?: number;
                        };
                    }[];
                    people?: {
                        name?: string;
                        ids?: {
                            trakt?: number;
                            slug?: string;
                            imdb?: string;
                            tmdb?: number;
                        };
                    }[];
                };
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        deleted?: {
                            movies?: number;
                            shows?: number;
                            seasons?: number;
                            episodes?: number;
                            people?: number;
                        };
                        not_found?: {
                            movies?: {
                                ids?: {
                                    imdb?: string;
                                };
                            }[];
                            shows?: unknown[];
                            seasons?: unknown[];
                            episodes?: unknown[];
                            people?: unknown[];
                        };
                        list?: {
                            updated_at?: string;
                            item_count?: number;
                        };
                    };
                };
            };
        };
    };
    "Reorder items on a list": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description User slug
                 * @example sean
                 */
                id: string;
                /**
                 * @description Trakt ID or Trakt slug
                 * @example star-wars-in-machete-order
                 */
                list_id: string;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                /** @example {
                 *       "rank": [
                 *         923,
                 *         324,
                 *         98768,
                 *         456456,
                 *         345,
                 *         12,
                 *         990
                 *       ]
                 *     } */
                "application/json": {
                    rank?: number[];
                };
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        updated?: number;
                        skipped_ids?: number[];
                        list?: {
                            updated_at?: string;
                            item_count?: number;
                        };
                    };
                };
            };
        };
    };
    "Update a list item": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description User slug
                 * @example sean
                 */
                id: string;
                /**
                 * @description Trakt ID or Trakt slug
                 * @example star-wars-in-machete-order
                 */
                list_id: string;
                /**
                 * @description List Item ID
                 * @example 1337
                 */
                list_item_id: number;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                /** @example {
                 *       "notes": "This is a great movie!"
                 *     } */
                "application/json": {
                    notes?: string;
                };
            };
        };
        responses: {
            /** @description NoContent */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "Get all list comments 1": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description User slug
                 * @example sean
                 */
                id: string;
                /**
                 * @description Trakt ID or Trakt slug
                 * @example star-wars-in-machete-order
                 */
                list_id: string;
                /**
                 * @description how to sort
                 * @example newest
                 */
                sort: "newest" | "oldest" | "likes" | "replies";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    "X-List-ID"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id?: number;
                        parent_id?: number;
                        created_at?: string;
                        updated_at?: string;
                        comment?: string;
                        spoiler?: boolean;
                        review?: boolean;
                        replies?: number;
                        likes?: number;
                        user_stats?: {
                            rating?: unknown;
                            play_count?: number;
                            completed_count?: number;
                        };
                        user?: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Follow this user": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description User slug
                 * @example sean
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        approved_at?: string;
                        user?: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                            };
                        };
                    };
                };
            };
        };
    };
    "Unfollow this user": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description User slug
                 * @example sean
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description NoContent */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "Get followers": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description User slug
                 * @example sean
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        followed_at: string;
                        user: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get following": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description User slug
                 * @example sean
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        followed_at: string;
                        user: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get friends": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description User slug
                 * @example sean
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        friends_at: string;
                        user: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get watched history 1": {
        parameters: {
            query?: {
                /**
                 * @description Starting date.
                 * @example 2016-06-01T00:00:00.000Z
                 */
                start_at?: string;
                /**
                 * @description Ending date.
                 * @example 2016-07-01T23:59:59.000Z
                 */
                end_at?: string;
            };
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description User slug
                 * @example sean
                 */
                id: string;
                /** @example movies */
                type: "movies" | "shows" | "seasons" | "episodes";
                /**
                 * @description Trakt ID for a specific item.
                 * @example 123
                 */
                item_id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description ```
             *     /users/sean/history/episodes
             *     ``` */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id: number;
                        watched_at: string;
                        action: string;
                        type: string;
                        movie: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        episode?: {
                            season?: number;
                            number?: number;
                            title?: string;
                            ids?: {
                                trakt?: number;
                                tvdb?: number;
                                imdb?: unknown;
                                tmdb?: number;
                            };
                        };
                        show?: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[] | {
                        id: number;
                        watched_at: string;
                        action: string;
                        type: string;
                        movie: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[] | {
                        id: number;
                        watched_at: string;
                        action: string;
                        type: string;
                        episode: {
                            season?: number;
                            number?: number;
                            title?: string;
                            ids?: {
                                trakt?: number;
                                tvdb?: number;
                                imdb?: unknown;
                                tmdb?: number;
                            };
                        };
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get ratings 1": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description User slug
                 * @example sean
                 */
                id: string;
                /** @example movies */
                type: "movies" | "shows" | "seasons" | "episodes" | "all";
                /**
                 * @description Filter for a specific rating.
                 * @example 9
                 */
                rating: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description ```
             *     /users/sean/ratings/episodes
             *     ``` */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        rated_at: string;
                        rating: number;
                        type: string;
                        movie: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[] | {
                        rated_at: string;
                        rating: number;
                        type: string;
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[] | {
                        rated_at: string;
                        rating: number;
                        type: string;
                        season: {
                            number?: number;
                            ids?: {
                                tvdb?: number;
                                tmdb?: number;
                            };
                        };
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[] | {
                        rated_at: string;
                        rating: number;
                        type: string;
                        episode: {
                            season?: number;
                            number?: number;
                            title?: string;
                            ids?: {
                                trakt?: number;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get watchlist 1": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description User slug
                 * @example sean
                 */
                id: string;
                /**
                 * @description Filter for a specific item type
                 * @example movies
                 */
                type: "movies" | "shows" | "seasons" | "episodes";
                /**
                 * @description How to sort (only if type is also sent)
                 * @example rank
                 */
                sort: "rank" | "added" | "released" | "title";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description ```
             *     /users/sean/watchlist/episodes
             *     ``` */
            200: {
                headers: {
                    "X-Private-User"?: string;
                    "X-Sort-By"?: string;
                    "X-Sort-How"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        rank: number;
                        id: number;
                        listed_at: string;
                        notes: string;
                        type: string;
                        movie: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[] | {
                        rank: number;
                        id: number;
                        listed_at: string;
                        notes: string | null;
                        type: string;
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[] | {
                        rank: number;
                        id: number;
                        listed_at: string;
                        notes: unknown;
                        type: string;
                        season: {
                            number?: number;
                            ids?: {
                                tvdb?: number;
                                tmdb?: number;
                            };
                        };
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[] | {
                        rank: number;
                        id: number;
                        listed_at: string;
                        notes: unknown;
                        type: string;
                        episode: {
                            season?: number;
                            number?: number;
                            title?: string;
                            ids?: {
                                trakt?: number;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get all favorites comments": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description User slug
                 * @example sean
                 */
                id: string;
                /**
                 * @description how to sort
                 * @example newest
                 */
                sort: "newest" | "oldest" | "likes" | "replies";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id?: number;
                        parent_id?: number;
                        created_at?: string;
                        updated_at?: string;
                        comment?: string;
                        spoiler?: boolean;
                        review?: boolean;
                        replies?: number;
                        likes?: number;
                        user_stats?: {
                            rating?: unknown;
                            play_count?: number;
                            completed_count?: number;
                        };
                        user?: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get favorites 1": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. Bearer [access_token]
                 * @example Bearer [access_token]
                 */
                Authorization?: string;
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description User slug
                 * @example sean
                 */
                id: string;
                /**
                 * @description Filter for a specific item type
                 * @example movies
                 */
                type: "movies" | "shows";
                /**
                 * @description How to sort (only if type is also sent)
                 * @example rank
                 */
                sort: "rank" | "added" | "released" | "title";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description ```
             *     /users/justin/favorites/shows
             *     ``` */
            200: {
                headers: {
                    "X-Sort-By"?: string;
                    "X-Sort-How"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        rank: number;
                        id: number;
                        listed_at: string;
                        notes: string;
                        type: string;
                        movie: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[] | {
                        rank: number;
                        id: number;
                        listed_at: string;
                        notes: string;
                        type: string;
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get all favorites comments 1": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description User slug
                 * @example sean
                 */
                id: string;
                /**
                 * @description how to sort
                 * @example newest
                 */
                sort: "newest" | "oldest" | "likes" | "replies";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    "X-Pagination-Page"?: string;
                    "X-Pagination-Limit"?: string;
                    "X-Pagination-Page-Count"?: string;
                    "X-Pagination-Item-Count"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id?: number;
                        parent_id?: number;
                        created_at?: string;
                        updated_at?: string;
                        comment?: string;
                        spoiler?: boolean;
                        review?: boolean;
                        replies?: number;
                        likes?: number;
                        user_stats?: {
                            rating?: unknown;
                            play_count?: number;
                            completed_count?: number;
                        };
                        user?: {
                            username?: string;
                            private?: boolean;
                            name?: string;
                            vip?: boolean;
                            vip_ep?: boolean;
                            ids?: {
                                slug?: string;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get watching": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description User slug
                 * @example sean
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Currently watching a `movie`. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        expires_at?: string;
                        started_at?: string;
                        action?: string;
                        type?: string;
                        episode?: {
                            season?: number;
                            number?: number;
                            title?: string;
                            ids?: {
                                trakt?: number;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        show?: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    } | {
                        expires_at?: string;
                        started_at?: string;
                        action?: string;
                        type?: string;
                        movie?: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    };
                };
            };
            /** @description Not watching anything. */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "Get watched 1": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description User slug
                 * @example sean
                 */
                id: string;
                /** @example movies */
                type: "movies" | "shows";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description ```
             *     /users/sean/watched/shows?extended=noseasons
             *     ``` */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        plays: number;
                        last_watched_at: string;
                        last_updated_at: string;
                        movie: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[] | {
                        plays: number;
                        last_watched_at: string;
                        last_updated_at: string;
                        reset_at?: unknown;
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                        seasons: {
                            number: number;
                            episodes: {
                                number: number;
                                plays: number;
                                last_watched_at: string;
                            }[];
                        }[];
                    }[] | {
                        plays: number;
                        last_watched_at: string;
                        last_updated_at: string;
                        reset_at: string | null;
                        show: {
                            title?: string;
                            year?: number;
                            ids?: {
                                trakt?: number;
                                slug?: string;
                                tvdb?: number;
                                imdb?: string;
                                tmdb?: number;
                            };
                        };
                    }[];
                };
            };
        };
    };
    "Get stats": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description e.g. 2
                 * @example 2
                 */
                "trakt-api-version"?: string;
                /**
                 * @description e.g. [client_id]
                 * @example [client_id]
                 */
                "trakt-api-key"?: string;
            };
            path: {
                /**
                 * @description User slug
                 * @example sean
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        movies?: {
                            plays?: number;
                            watched?: number;
                            minutes?: number;
                            collected?: number;
                            ratings?: number;
                            comments?: number;
                        };
                        shows?: {
                            watched?: number;
                            collected?: number;
                            ratings?: number;
                            comments?: number;
                        };
                        seasons?: {
                            ratings?: number;
                            comments?: number;
                        };
                        episodes?: {
                            plays?: number;
                            watched?: number;
                            minutes?: number;
                            collected?: number;
                            ratings?: number;
                            comments?: number;
                        };
                        network?: {
                            friends?: number;
                            followers?: number;
                            following?: number;
                        };
                        ratings?: {
                            total?: number;
                            distribution?: {
                                1?: number;
                                2?: number;
                                3?: number;
                                4?: number;
                                5?: number;
                                6?: number;
                                7?: number;
                                8?: number;
                                9?: number;
                                10?: number;
                            };
                        };
                    };
                };
            };
        };
    };
}
