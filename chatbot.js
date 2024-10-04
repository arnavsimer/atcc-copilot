(function () {
    chatbot = {
        notifyChatbot : function(event){
            console.log(event);
        },
        events : {
            LOGIN : "LOGIN",
            LOCATION_CHANGE : "LOCATION_CHANGE",
            LOGOUT : "LOGOUT"
        }
    }
    // Ensure the script runs after the DOM is loaded
    document.addEventListener("DOMContentLoaded", function () {
        // Inject styles into the page for chatbot
        var style = document.createElement("style");
        style.innerHTML = `
            .chatbot-icon {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 60px;
                height: 60px;
                cursor: pointer;
                z-index: 1000;
                transition: transform 0.3s ease;
            }
            .chatbot-icon:hover {
                transform: scale(1.1);
            }
            .chatbot-iframe {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 380px;
                height: 500px;
                border: none;
                z-index: 999;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
                visibility: hidden;
                opacity: 0;
                transform: translateY(50px);
                transition: all 0.3s ease-in-out;
                border-radius: 16px;
            }
            .open .chatbot-iframe {
                visibility: visible;
                opacity: 1;
                transform: translateY(0);
            }
            .open .chatbot-icon {
                display: none;
            }
        `;
        document.head.appendChild(style);

        // Create chatbot icon image element
        var chatbotIcon = document.createElement("img");
        chatbotIcon.src = "chatbot-icon.jpg"; // Replace with actual image URL
        chatbotIcon.className = "chatbot-icon";
        chatbotIcon.id = "chatbot-icon";
        chatbotIcon.alt = "Chatbot Icon";
        chatbotIcon.onclick = toggleChatbot;

        // Append chatbot icon to the body
        document.body.appendChild(chatbotIcon);

        // Create chatbot container
        var chatbotContainer = document.createElement("div");
        chatbotContainer.id = "chatbot-container";

        // Create chatbot iframe
        var chatbotIframe = document.createElement("iframe");
        chatbotIframe.src = "chatbot.html"; // Replace with actual chatbot page URL
        chatbotIframe.className = "chatbot-iframe";

        // Append iframe to the container
        chatbotContainer.appendChild(chatbotIframe);

        // Append container to the body
        document.body.appendChild(chatbotContainer);

        // Function to toggle the chatbot's visibility
        function toggleChatbot() {
            chatbotContainer.classList.toggle("open");
            if (chatbotContainer.classList.contains("open")) {
                chatbotIcon.style.display = "none"; // Hide the icon when the chatbot opens
            } else {
                chatbotIcon.style.display = "block"; // Show the icon when the chatbot closes
            }
        }
        window.addEventListener('message', function (event) {
            // Check the origin of the message
            if (event.data === 'toggleChatbot') {
                toggleChatbot(); // Call the function
            }
        });
    });
})();
