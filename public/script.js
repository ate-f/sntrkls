/* eslint-env es6, node, browser*/
/* eslint-disable no-console, no-unused-vars*/
const names = ['Tine', 'Ate', 'Ria', 'Donald', 'Dara', 'Oscar', 'Ragna', 'Thomas', 'thomas2', 'ragna2'];

function run() {
  let cookie = document.cookie;
  console.log(cookie);
  let hasCookie = cookie.match('presentsSelected');

  names.forEach(name => {
    var wrapper = document.getElementById("names");
    var div = document.createElement("div");
    div.setAttribute("id", 'name_' + name);
    div.setAttribute("class", ' form-group');

    var inp = document.createElement("input");
    inp.setAttribute("id", 'input_' + name);
    inp.setAttribute('type', 'number');
    inp.setAttribute('value', 0);
    inp.setAttribute('min', 0);
    inp.setAttribute('class',' form-control')
    var lbl = document.createElement("label");
    lbl.setAttribute('for', 'input_' + name);
    lbl.setAttribute('class',"col-sm-1 control-label");
    lbl.innerHTML = name;
    div.appendChild(lbl);
    var div2 =document.createElement("div");
    div2.setAttribute('class',"col-xs-1");

    div2.appendChild(inp);
    div.appendChild(div2);
    wrapper.appendChild(div);
  })
  if (hasCookie) {
    handleCookiePresent(cookie);
  }
}

function save() {
  var randomId = Math.random() + '';
  let presents = names.map(name => {
    var nameElement = document.getElementById('input_' + name);
    return {
      name: name,
      number: nameElement.value
    };
  });


  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/presents/", false);
  xhr.setRequestHeader("Content-type", "application/json");

  xhr.onreadystatechange = function () {
    console.log(xhr);
    setCookie(randomId);
  }
  xhr.send(JSON.stringify({
    id: randomId,
    presents: presents
  }));

}

function handleCookiePresent(cookie) {
  let randomId = cookie.split('=')[1];
  document.getElementById('save').disabled = true;
  document.getElementById('save').innerHTML = `You've already submitted your presents`;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/presents/" + randomId, true);
  xhr.setRequestHeader("Content-type", "application/json");

  xhr.onreadystatechange = function () {
    if (this.readyState == this.DONE) {
      try{
        var saveData = JSON.parse(xhr.response) || [];
        if (saveData) {
          saveData.forEach(item => {
            document.getElementById('input_' + item.name).value = item.number;
          });
        }  
      } catch(e){
        
      }
      
    }
  }
  xhr.send();
}

function setCookie(randomId) {
  document.cookie = `presentsSelected=${randomId}`;
}

function reset() {
  var c = document.cookie;
  let randomId = c.split('=')[1];
  c = c + ";expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  document.cookie = c;
  var xhr = new XMLHttpRequest();
  xhr.open("DELETE", "/presents/" + randomId, true);
  xhr.send();
  names.forEach(name => {
    document.getElementById('input_' + name).value = 0;
  })
}