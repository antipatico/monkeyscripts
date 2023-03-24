// ==UserScript==
// @name        OPPower Unlocker
// @namespace   Violentmonkey Scripts
// @match       https://onepiecepower.com/*
// @grant       none
// @version     1.0
// @author      antipatico
// @homepageURL https://github.com/antipatico/monkeyscripts
// @downloadURL https://raw.githubusercontent.com/antipatico/monkeyscripts/main/OPPower.js
// @description 3/22/2023, 10:06:59 PM
// ==/UserScript==

/* The following unlocks right clicks, developer console and such.
 * Not sure if it breaks some features when logged in.
 * This also hides the anti-adblock popup, so this is cool >:B
 */
document.cookie = "username=admin; expires=Fri, 31 Dec 9999 23:59:59 GMT; Path=/";

/* Wrap the change page method functions to scroll to the start of the manga when called.
 * This will affect both clicks and arrow change pages!
 */

wrapChangePageMethod("nextPage");
wrapChangePageMethod("prevPage");

function wrapChangePageMethod(methodName) {
  if (! methodName in window) {
    return;
  }
  let toWrap = window[methodName];
  function wrapper() {
    document.getElementById("page").scrollIntoView({ behavior: 'smooth'});
    return toWrap();
  }
  window[methodName] = wrapper;
}
