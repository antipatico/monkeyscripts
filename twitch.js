// ==UserScript==
// @name        antipatico's Twitch.tv scripts
// @namespace   Violentmonkey Scripts
// @match       https://www.twitch.tv/*
// @grant       none
// @version     1.0
// @author      antipatico
// @homepageURL https://github.com/antipatico/monkeyscripts
// @description 1/13/2023, 12:26:45 AM
// ==/UserScript==

/* Disable the chat button and textfield */
const PASSIVE_CHAT = true;
/* Auto claim channel point bonus, RIP TwitchChannelPointMiner.py */
const AUTOCLAIM_CHANNEL_POINTS = true;


function passiveChat() {
  let chatButton = document.querySelector('[data-a-target="chat-send-button"]');
  if (chatButton !== null) {
    chatButton.disabled = true;
  }
  let chatTextField = document.querySelector('[data-a-target="chat-input"]');
  if (chatTextField !== null) {
    chatTextField.setAttribute("contenteditable", "false");
    chatTextField.disabled = true;
  }
}

function claimBonus() {
  let claimButton = document.querySelector("[aria-label='Claim Bonus']");
  if (claimButton !== null) {
    claimButton.click();
  }
}

setInterval(() => {
  if (PASSIVE_CHAT) {
    passiveChat();
  }
  if (AUTOCLAIM_CHANNEL_POINTS) {
    claimBonus();
  }
}, 5000);
