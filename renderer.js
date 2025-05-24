const func = async () => {
  const result = await window.versions.ping();

  document.querySelector("#her").textContent = result;
};

func();
