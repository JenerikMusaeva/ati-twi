
    //замыкание для добавления элеиента в список
    //принимает HTMLElement, в который будет добавляться элемент
    let addItem = (listElement) => {
      //функция для добавления
      return function (title, content, ...tags) {
        let $message = document.createElement('div');
        $message.classList.add('box');
        $message.classList.add('col-12');
        $message.innerHTML = `
        <h3>${title}</h3>
        <p>${content}</p>
        `;

        tags.map((item) => {
          let $tag = document.createElement("span");
          $tag.className = "badge badge-secondary";
          $tag.innerHTML = item;

          $message.append($tag);
        })
  
        listElement.prepend($message);
        };
    };

    // добавлениt сообщения
    const messageForm = document.getElementById("message-form");
    const messagesDiv = document.getElementById("messages");

    let addMessage = addItem(messagesDiv)

    messageForm = addEventListener("submit", (e) => {
      e.preventDefault();

      const _author = messageForm.querySelector("[name=author]").value;
      const _message = messageForm.querySelector("[name=message]").value;
      
      if (_author === "" || _message === "") {
        alert("Заполнены не все поля");
        return;
      }

      const _tagsInput = messageForm.querySelector("[name=tags]").value;
      let tags = _tagsInput.split(" ");
      addMessage(_author, _message, ...tags);

      // let $message = document.createElement('div');
      // $message.classList.add('box');
      // $message.classList.add('col-12');
      // $message.innerHTML = `
      // <h3>${_author}</h3>
      // <p>${_message}</p>
      // `;
      // messagesDiv.prepend($message)
    })

    //
