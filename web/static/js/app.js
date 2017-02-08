// import React from "react"
// import { render } from "react-dom"

// import RemoteRetro from "components/remote_retro"

// const reactRoot = document.querySelector(".react-root")
// render(<RemoteRetro />, reactRoot)

let video_out = document.getElementById("vid-box")

function login(form) {
  var phone = window.phone = PHONE({
      number        : form.username.value || "Anonymous", // listen on username line else Anonymous
      publish_key   : 'pub-c-774ec798-47ab-4add-a4e0-4db1282eeb45',
      subscribe_key : 'sub-c-dd561ef6-edf9-11e6-8bf6-02ee2ddab7fe',
  });
  phone.ready(function(){ form.username.style.background="#55ff5b"; });
  phone.receive(function(session){
      session.connected(function(session) { video_out.appendChild(session.video); });
      session.ended(function(session) { video_out.innerHTML=''; });
  });
  return false;   // So the form does not submit.
}

function makeCall(form){
  if (!window.phone) alert("Login First!");
  else phone.dial(form.number.value);
  return false;
}
