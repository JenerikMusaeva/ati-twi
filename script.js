localStorage.setItem('temp', '123')


let messages = JSON.parse(localStorage.getItem("messages")) || [];

//функция форматирования даты в формат dd.mm.YYYY
let formatDate = (date) => {
  let leadZero = (num) => num < 10 ? '0' + num : String(num)
  return `${leadZero(date.getDate())}.${leadZero(date.getMonth() + 1)}.${date.getFullYear()}`
}

//замыкание для добавления элеиента в список
//принимает HTMLElement, в который будет добавляться элемент
let addItem = listElement => {
  //функция для добавления
  return function (title, content, date, ...tags) {
    let $message = document.createElement('div')
    $message.classList.add('box')
    $message.classList.add('col-12')
    $message.innerHTML = `
        <h3>${title}</h3>
        <p>${content}</p>
        <span class="message__date">${formatDate(date)}</span>
        `

    tags.map(item => {
      let $tag = document.createElement('span')
      $tag.className = 'badge badge-secondary'
      $tag.innerHTML = item

      $message.append($tag)
    })

    listElement.prepend($message)
  }
}

//функция для создания объекта сообщения
const createMessage = (author, message, date, ...tags) => {
  return {
    author,
    message,
    date,
    tags
  }
}

const renderMessages = (messages) => {
  messagesDiv.innerHTML = "";

  messages.map((item) => {
    let { author, message: __message, date, tags } = item;
    addMessage(author, __message, new Date(date), tags);
  });
}

// добавлениt сообщения
const messageForm = document.getElementById('message-form')
const messagesDiv = document.getElementById('messages')

let addMessage = addItem(messagesDiv)

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
