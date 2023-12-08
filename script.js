document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.getElementById("todoForm");
  const todoList = document.getElementById("todoList");
  const loading = document.getElementById("loading"); // loading screen

  // Function to fetch initial todos
  async function fetchTodos() {
    try {
      // Show loading screen before sending
      loading.style.display = "flex";
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=5"
      );
      const todos = await response.json();
      todos.forEach((todo) => {
        addTodoToList(todo);
      });

      // Hide loading screen when data arrives
      loading.style.display = "none";
    } catch (error) {
      console.error("Error fetching todos:", error);
      // Hide loading screen in case of an error
      loading.style.display = "none";
    }
  }

  function addTodoToList(todo) {
    const listItem = document.createElement("li");
    listItem.classList.add("todo-item"); // Adding todo-item class here

    const titleSpan = document.createElement("span");
    titleSpan.textContent = todo.title;

    const icon = document.createElement("i");
    icon.classList.add("fas");

    // Adding icon for checkmark
    if (todo.completed) {
      icon.classList.add("fa-check");
      icon.style.color = "#4caf50"; // Green color
    } else {
      // Adding icon for times
      icon.classList.add("fa-times");
      icon.style.color = "#f44336"; // Red color
    }

    listItem.appendChild(titleSpan);
    listItem.appendChild(icon);

    todoList.appendChild(listItem);
  }

  // Event listener for form submission
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const completed = document.getElementById("completed").checked;

    // Add the new todo to the list
    const newTodo = { title, completed };
    addTodoToList(newTodo);

    // Clear the form
    todoForm.reset();
  });

  // Fetch initial todos on page load
  fetchTodos();
});
