const func = async () => {
  const response = await window.versions.ping();
  console.log(response); // prints out 'pong'

  document.querySelector("#head").textContent = "123";
};

console.log("adssadas");

func();
