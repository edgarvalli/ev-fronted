const loadinPage = () => {
  const lp = window.document.createElement("div");
  lp.classList.add("loading-page");
  lp.innerHTML = `
        <div class="text-center">
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div>Solicitando al servidor....</div>
        </div>
    `;

  return lp;
};

const request = {
  get: async (url: any) => {
    const lp = loadinPage();
    window.document.body.appendChild(lp);
    try {
      const request = await fetch(url);
      const response: any = await request.json();
      lp.remove();
      return response;
    } catch (error) {
      lp.remove();
      return error;
    }
  },
  post: async (url:any, data: any) => {
    const lp = loadinPage();
    window.document.body.appendChild(lp);
    const request = await fetch(url, {
      headers: {
        "Content-Type": "Application/Json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });

    if (request.status === 404) {
      lp.remove();
      return {
        error: true,
        message: "Pagina no encontrada. Codigo error: " + request.status,
      };
    }
    const response: any = await request.json();
    lp.remove();
    return response;
  },
};

export default request;
