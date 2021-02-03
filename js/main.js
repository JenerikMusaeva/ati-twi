import { renderMessages, createMessage, addItem, formatDate } from "./utils.js";

let messages = JSON.parse(localStorage.getItem("messages")) || [];


const messageForm = document.getElementById('message-form')

renderMessages(messages); 

messageForm = addEventListener('submit', e => {
  e.preventDefault()

  const _author = messageForm.querySelector('[name=author]').value
  const _message = messageForm.querySelector('[name=message]').value

  if (_author === '' || _message === '') {
    alert('Заполнены не все поля')
    return
  }

  const _tagsInput = messageForm.querySelector('[name=tags]').value
  let tags = _tagsInput.split(' ')

  let _now = new Date();

  let newMessage = createMessage(_author, _message, _now, ...tags);

  messages.push(newMessage);

  localStorage.setItem("messages", JSON.stringify(messages));

  renderMessages(messages);

  messageForm.reset();

});
