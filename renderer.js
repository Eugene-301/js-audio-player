const func = async () => {
  const response = await window.versions.ping();
  console.log(response); // prints out 'pong'

  document.querySelector("#head").textContent = response;
};

console.log("adssadas");

func();
