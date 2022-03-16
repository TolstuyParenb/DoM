// Блок получения неких данных

const tasks = [
    { id: 1, completed: false, text: 'Посмотреть новый урок по JavaScript' },
    { id: 2, completed: false, text: 'Выполнить тест после урока' },
    { id: 3, completed: false, text: 'Выполнить ДЗ после урока' }
  ]

// Раздел отрисовки новой задачи    
  const taskList = document.querySelector('.tasks-list')
  const createBtn = document.querySelector('.create-task-block')
  const inputText = document.querySelector('.create-task-block__input')
  let countId = 3
  function createTask(id, text) {
    let newTask = `<div class="task-item" data-task-id='${id}'>
<div class="task-item__main-container">
  <div class="task-item__main-content">
    <form class="checkbox-form">
      <input class="checkbox-form__checkbox" type="checkbox" id='task-${id}'>
      <label for='task-${id}'></label>
    </form>
    <span class="task-item__text">'${text}'</span>
  </div>
  <button class='task-item__delete-button default-button delete-button' data-delete-task-id='${id}'>
    Удалить
  </button>
</div>
</div>`
    taskList.insertAdjacentHTML("afterbegin", newTask);
  }

// Раздел валидации новой задачи 

let form = document.querySelector('.create-task-block'),
input = form.taskName
input.value = ""
function createErrorBlock(textError){   
   let errorBlock = document.createElement('span')
   errorBlock.className = 'error-message-block'
   errorBlock.textContent = textError
   form.append(errorBlock)
   
   return errorBlock 
}
form.addEventListener('submit', (event)=>{
    event.preventDefault()
    form.querySelector('.error-message-block')?.remove()
    let text = input.value,
    task = tasks.some(e => e.text === text);
    if(task){
        createErrorBlock('Задача с таким названием уже существует')
    }
    else if(text === ''){
        createErrorBlock('Название задачи не должно быть пустым')
    }else{
const inputText = document.querySelector('.create-task-block__input')
let countId = 3
    countId++
    const newTask = {
        id: countId,
        text: inputText.value
    }
    
    tasks.push(newTask);
    createTask(countId, inputText.value)
    input.value = ""
    }
})

// Раздел модального окна для удаления задачи 

 function createModal(parent){
    let modal = `<div class="modal-overlay modal-overlay_hidden">
 <div class="delete-modal">
  <h3 class="delete-modal__question">
    Вы действительно хотите удалить эту задачу?
  </h3>
  <div class="delete-modal__buttons">
    <button class="delete-modal__button delete-modal__cancel-button">
      Отмена
    </button>
    <button class="delete-modal__button delete-modal__confirm-button">
      Удалить
    </button>
  </div>
 </div>
 </div>`;
 parent.insertAdjacentHTML('afterbegin', modal)
 }
 createModal(document.body)

const allButton = document.querySelectorAll('.task-item__delete-button')
taskList.addEventListener('click',(event)=>{
  const { target } = event
  deleteTaskId = target.dataset.deleteTaskId;
  const isButton = event.target.closest('.task-item__delete-button')
  const overlay = document.querySelector('.modal-overlay')
  if(isButton){
    overlay.classList.remove('modal-overlay_hidden')
  }
})
const deleteCancelClick = document.querySelector('.delete-modal__cancel-button')
deleteCancelClick.addEventListener('click', (event)=>{
  event.preventDefault()
  const overlay = document.querySelector('.modal-overlay')
  overlay.classList.add("modal-overlay_hidden");
  console.log('cancel');
})
const deleteConfirmClick = document.querySelector('.delete-modal__confirm-button')
  deleteConfirmClick.addEventListener('click',(event)=>{
    event.preventDefault();
    
const overlay = document.querySelector('.modal-overlay')
    let index = tasks.findIndex(e => e.id === deleteTaskId);
    tasks.splice(index, 1);
    taskList.querySelector(`div[data-task-id="${deleteTaskId}"]`).remove();
    overlay.classList.add("modal-overlay_hidden");
    console.log('delete');
  })

  //  СМЕНА ТЕМЫ НА ТЕМНУЮ И ОБРАТНО

   let isDark = false
   document.addEventListener('keydown', (event)=>{
    
    const {key} = event
    if (event.code === 'Tab'){
      event.preventDefault()
      isDark = !isDark
        if(isDark){
          document.body.style.background = '#24292E'
          let allElementsTaskId = document.querySelectorAll('.task-item') 
          allElementsTaskId.forEach((item)=>{
            item.style.color = '#ffffff'
          })
          let styleButton = document.querySelectorAll('button')
          styleButton.forEach((button)=>{
            button.style.border = '1px solid #ffffff'
          })
          } else {
            document.body.style.background = 'initial'
            let allElementsTaskId = document.querySelectorAll('.task-item') 
            allElementsTaskId.forEach((item)=>{
              item.style.color = 'initial'
            })
            let styleButton = document.querySelectorAll('button')
            styleButton.forEach((button)=>{
              button.style.border = 'none'
            }) 
          }
        }
  })
 