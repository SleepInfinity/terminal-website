
const app = document.querySelector("#app");
const delay = ms => new Promise(res => setTimeout(res, ms));
    
    
app.addEventListener("keypress", async function(event){
  if(event.key === "Enter"){
    await delay(150);
    getInputValue();
   
    removeInput();
    //await delay(150);
    new_line();
  }
});

app.addEventListener("click", function(event){
  const input = document.querySelector("input");
  input.focus();
})


async function open_terminal(){
  createText("Welcome");
  await delay(700);
  createText("Starting the server...");
  await delay(1500);
  createText("You can run several commands:");
 
  createCode("about me", "Who am i and what do i do.");
  createCode("all", "See all commands.");
  createCode("social -a", "All my social networks.");

  await delay(500);
  new_line();
}


function new_line(){
  const p = document.createElement("p");
  const span1 = document.createElement("span");
  const span2 = document.createElement("span");
  p.setAttribute("class", "path")
  p.textContent = `visitor@${window.location.hostname}`;
  span1.textContent = `:${window.location.pathname}`;
  span2.textContent = "$";
  p.appendChild(span1);
  p.appendChild(span2);
  app.appendChild(p);
  const div = document.createElement("div");
  div.setAttribute("class", "type")
  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-angle-right icone")

  const input = document.createElement("input");
  input.setAttribute("autofocus", "true");
  input.setAttribute("type", "text");
  input.setAttribute("spellcheck", "false");

  div.appendChild(i);
  div.appendChild(input);
  app.appendChild(div);
  input.focus();
}

function removeInput(){
  const div = document.querySelector(".type");
  app.removeChild(div);
}

async function getInputValue(){
  
  const value = document.querySelector("input").value;
  if(value === "all"){
    trueValue(value);
    
    createCode("projects", "My github page with my projects.");
    createCode("about me", "Who am i and what do i do.");
    createCode("social -a", "All my social networks.");
    createCode("matrix", "Display a matrix effect on the terminal.");
    createCode("clear", "Clean the terminal.");
    
  }
  else if(value === "projects"){
    trueValue(value);
    createText("<a href='https://github.com/SleepInfinity' target='_blank'><i class='fab fa-github white'></i> github.com/SleepInfinity</a>")
  }
  else if(value === "about me"){
    trueValue(value);
    createText("Hi, my name is Youns.")
    createText("I'm specialized in computer networks, IoT, and programming. I have experience in Python, C, C++, JavaScript, and Linux, which I use to develop innovative tech projects like bots and IoT applications.")
  }
  else if(value === "social -a"){
    trueValue(value);
    createText("<a href='https://github.com/SleepInfinity' target='_blank'><i class='fab fa-github white'></i> github.com/SleepInfinity</a>")
    createText("<a href='https://www.t.me/DevSleep/' target='_blank'><i class='fab fa-telegram white'></i> t.me/DevSleep/</a>")
    createText("<a href='https://www.instagram.com/y0nls/' target='_blank'><i class='fab fa-instagram white'></i> instagram.com/y0nls</a>")
  }
  else if(value === "social"){
    trueValue(value);
    createText("Did you mean: social -a?")
  }
  
  else if(value === "clear"){
    document.querySelectorAll("p").forEach(e => e.parentNode.removeChild(e));
    document.querySelectorAll("section").forEach(e => e.parentNode.removeChild(e));
  }
  else if(value === "matrix"){
    removeInput();
    document.querySelectorAll("p").forEach(e => e.parentNode.removeChild(e));
    document.querySelectorAll("section").forEach(e => e.parentNode.removeChild(e));
    startMatrixEffect("app");
  }
  else{
    falseValue(value);
    createErrorText(`command not found: ${value}`)
  }
}

function trueValue(value){
  
  const div = document.createElement("section");
  div.setAttribute("class", "type2")
  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-angle-right icone")
  const mensagem = document.createElement("h2");
  mensagem.setAttribute("class", "sucess")
  mensagem.textContent = `${value}`;
  div.appendChild(i);
  div.appendChild(mensagem);
  app.appendChild(div);
}

function falseValue(value){
  
  const div = document.createElement("section");
  div.setAttribute("class", "type2")
  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-angle-right icone error")
  const mensagem = document.createElement("h2");
  mensagem.setAttribute("class", "error")
  mensagem.textContent = `${value}`;
  div.appendChild(i);
  div.appendChild(mensagem);
  app.appendChild(div);
}

function createText(text, classname){
  const p = document.createElement("p");
  
  p.innerHTML = text;
  app.appendChild(p);
  //typeText(p, text)
}

function createCode(code, text){
  const p = document.createElement("p");
  p.setAttribute("class", "code");
  p.innerHTML = `${code} <br/><span class='text'> ${text} </span>`;
  app.appendChild(p);
  
}

function createErrorText(text) {
  const p = document.createElement("p");
  p.innerText = text;
  app.appendChild(p);
}

function startMatrixEffect(containerId) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`Container with ID "${containerId}" not found.`);
    return;
  }

  container.style.position = "relative";
  container.style.overflow = "hidden";
  container.style.color = "green"; // Default text color

  const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%".split("");
  const fontSize = 12; // Size of the characters
  const columns = Math.floor(container.clientWidth / fontSize);
  const drops = Array(columns).fill(1); // Initial Y positions for each column

  let intervalId;
  let animationFrameId;

  function draw() {
    const fadeDiv = document.createElement("div");
    fadeDiv.style.position = "absolute";
    fadeDiv.style.top = "0";
    fadeDiv.style.left = "0";
    fadeDiv.style.width = "100%";
    fadeDiv.style.height = "100%";
    fadeDiv.style.backgroundColor = "rgba(0, 0, 0, 0.05)";
    fadeDiv.style.pointerEvents = "none";
    container.appendChild(fadeDiv);

    setTimeout(() => fadeDiv.remove(), 50);

    for (let i = 0; i < drops.length; i++) {
      const text = matrix[Math.floor(Math.random() * matrix.length)];

      const span = document.createElement("span");
      span.textContent = text;
      span.style.position = "absolute";
      span.style.left = `${i * fontSize}px`;
      span.style.top = `${drops[i] * fontSize}px`;
      span.style.fontSize = `${fontSize}px`;
      span.style.color = "#0F0"; // Bright green
      container.appendChild(span);

      setTimeout(() => span.remove(), 1000);

      if (drops[i] * fontSize > container.clientHeight && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]++; // Increment Y position
    }
    animationFrameId = requestAnimationFrame(draw);
  }

  //intervalId = setInterval(draw, 50);
  draw();

  document.addEventListener("keydown", function (event) {
    if ((event.ctrlKey && event.key === "c") || event.key.toLowerCase() === "q") {
      //clearInterval(intervalId);
      cancelAnimationFrame(animationFrameId);
      container.innerHTML = "";
      new_line();
    }
  });
}

open_terminal();