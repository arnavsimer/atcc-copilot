(async function () {
    // Specifies style options to customize the Web Chat canvas.
    // Please visit https://microsoft.github.io/BotFramework-WebChat for customization samples.
    const styleOptions = {
        accent: '#5C3385',
        botAvatarBackgroundColor: '#FFFFFF',
        botAvatarImage: 'assets/images/chatbot-icon.jpg',
        botAvatarInitials: 'BT',
        hideUploadButton: true,
        primaryFont: 'brandon_grotesque_medium,Arial,sans-serif',
        bubbleTextColor: '#4a4a4a',
        bubbleFromUserTextColor: '#4a4a4a',
        fontSizeSmall: 14,
        sendBoxButtonColor: '#5C3385',
        bubbleBackground: '#F4F4F4',
        bubbleBorderColor: '#F4F4F4',
        bubbleBorderRadius: 4,
        bubbleBorderWidth: 2,
        bubbleNubOffset: 0,
        bubbleNubSize: 10,

        bubbleFromUserBackground: '#F4F4F4',
        bubbleFromUserBorderColor: '#F4F4F4',
        bubbleFromUserBorderRadius: 4,
        bubbleFromUserBorderWidth: 2,
        bubbleFromUserNubOffset: 0,
        bubbleFromUserNubSize: 10,
        cardPushButtonBackgroundColor: '#5C3385'
    };

    // Specifies the language the copilot and Web Chat should display in:
    // - (Recommended) To match the page language, set it to document.documentElement.lang
    // - To use current user language, set it to navigator.language with a fallback language
    // - To use another language, set it to supported Unicode locale

    // Setting page language is highly recommended.
    // When page language is set, browsers will use native font for the respective language.

    const locale = document.documentElement.lang || 'en'; // Uses language specified in <html> element and fallback to English (United States).
    // const locale = navigator.language || 'ja-JP'; // Uses user preferred language and fallback to Japanese.
    // const locale = 'zh-HAnt'; // Always use Chinese (Traditional).
    // Specifies the token endpoint URL.
    // To get this value, visit Copilot Studio > Settings > Channels > Mobile app page.
    const tokenEndpointURL = new URL('https://a003dd200fa0e5cab997cd1403f130.16.environment.api.powerplatform.com/powervirtualagents/botsbyschema/cr038_atccCopilot/directline/token?api-version=2022-03-01-preview');
    const apiVersion = tokenEndpointURL.searchParams.get('api-version');

    const [directLineURL, token] = await Promise.all([
        fetch(new URL(`/powervirtualagents/regionalchannelsettings?api-version=${apiVersion}`, tokenEndpointURL))
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to retrieve regional channel settings.');
                }
                return response.json();
            })
            .then(({ channelUrlsById: { directline } }) => directline),
        getToken(tokenEndpointURL)
    ]);

    // The "token" variable is the credentials for accessing the current conversation.
    // To maintain conversation across page navigation, save and reuse the token.

    // The token could have access to sensitive information about the user.
    // It must be treated like user password.

    const directLine = WebChat.createDirectLine({ domain: new URL('v3/directline', directLineURL), token });

    // Sends "startConversation" event when the connection is established.

    const subscription = directLine.connectionStatus$.subscribe({
        next(value) {
            if (value === 2) {
                directLine
                    .postActivity({
                        localTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                        locale,
                        name: 'startConversation',
                        type: 'event'
                    })
                    .subscribe();

                // Only send the event once, unsubscribe after the event is sent.
                subscription.unsubscribe();
            }
        }
    });
    const store = window.WebChat.createStore({}, ({ dispatch }) => next => action => {
        return next(action);
    });
    WebChat.renderWebChat({ directLine, store, locale, styleOptions }, document.getElementById('webchat'));
    function notifyChatbot(event) {
        store.dispatch({
            type: "WEB_CHAT/SEND_EVENT",
            payload: {
                name: "notify_chatbot",
                value: event
            },
        })
    }
    window.addEventListener('message', function (event) {
        if (event.data.action === 'notifyChatbot') {
            // Handle the event, like logging in or changing states based on the received event.data
            notifyChatbot(event.data.data);
        }
    })
})();
function minimize() {
    window.parent.postMessage('toggleChatbot', '*');
}
function getToken(tokenEndpointURL) {
    const token = localStorage.getItem('token');
    if (token) {
        return token
    } else {
        return fetch(tokenEndpointURL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to retrieve Direct Line token.');
                }

                return response.json();
            })
            .then(({ token }) => {
                localStorage.setItem('token',token)
                return token
            })
    }
}