
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
    
    createCode("projects", "My github page with my projects. Follow me there ;)");
    createCode("about me", "Who am i and what do i do.");
    createCode("social -a", "All my social networks.");
    createCode("clear", "Clean the terminal.");
    
  }
  else if(value === "projects"){
    trueValue(value);
    createText("<a href='https://github.com/heberleonard2' target='_blank'><i class='fab fa-github white'></i> github.com/heberleonard2</a>")
  }
  else if(value === "about me"){
    trueValue(value);
    createText("Oi, meu nome é Héber ;)")
    createText("Desenvolvedor atualmente focado em todo o ecossistema Javascript. Utilizando principalmente a stack <span class='blue'>Node, React e React Native </span>por permitir criar aplicações de forma descomplicada e produtiva.")
  }
  else if(value === "social -a"){
    trueValue(value);
    createText("<a href='https://github.com/heberleonard2' target='_blank'><i class='fab fa-github white'></i> github.com/heberleonard2</a>")
    createText("<a href='https://www.linkedin.com/in/heber-leonard/' target='_blank'><i class='fab fa-linkedin-in white'></i> linkedin.com/in/heber-leonard</a>")
    createText("<a href='https://www.instagram.com/heber_leonard/' target='_blank'><i class='fab fa-instagram white'></i> instagram.com/heber_leonard</a>")
  }
  else if(value === "social"){
    trueValue(value);
    createText("Didn't you mean: social -a?")
  }
  
  else if(value === "clear"){
    document.querySelectorAll("p").forEach(e => e.parentNode.removeChild(e));
    document.querySelectorAll("section").forEach(e => e.parentNode.removeChild(e));
  }
  else if(value === "matrix"){
    startMatrixEffect("app");
  }
  else{
    falseValue(value);
    createText(`command not found: ${value}`)
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

function startMatrixEffect(containerId) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`Container with ID "${containerId}" not found.`);
    return;
  }

  // Ensure container has relative positioning for child elements
  container.style.position = "relative";
  container.style.overflow = "hidden"; // Prevent overflow outside the container

  const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%".split("");
  const fontSize = 12;
  const columns = Math.floor(container.clientWidth / fontSize);
  const drops = Array(columns).fill(1);

  // Create and append text spans for the effect
  function draw() {
    // Clear container's previous children
    container.innerHTML = "";

    // Loop through each column
    for (let i = 0; i < drops.length; i++) {
      const text = matrix[Math.floor(Math.random() * matrix.length)];

      const span = document.createElement("span");
      span.textContent = text;
      span.style.position = "absolute";
      span.style.left = `${i * fontSize}px`;
      span.style.top = `${drops[i] * fontSize}px`;
      span.style.fontSize = `${fontSize}px`;
      span.style.color = "#0F0"; // Green color
      span.style.fontFamily = "monospace";

      container.appendChild(span);

      // Reset to the top with randomness
      if (drops[i] * fontSize > container.clientHeight && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]++;
    }
  }

  // Start the effect
  setInterval(draw, 50);
}

open_terminal();