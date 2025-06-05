function getProducts() {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => console.log(json));
}
function getProduct(pid) {
  fetch(`https://fakestoreapi.com/products/${pid}`)
    .then((res) => res.json())
    .then((json) => console.log(json));
}
function deleteProduct(pid) {
  fetch(`https://fakestoreapi.com/products/${pid}`, { method: "DELETE" })
    .then((res) => res.json())
    .then((json) => console.log(json));
}
async function createProduct(title, price, category) {
  const description = "NEW product!";
  const image = "default.jpg";
  const product = {
    title,
    price,
    category,
    description,
    image,
  };
  const response = await fetch(`https://fakestoreapi.com/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  const json = await response.json();
  return json["id"];
}

function pidOf(s) {
  const [, spid] = s.split("/");
  return parseInt(spid);
}

const [, , method, resource, ...params] = process.argv;

switch (method.toUpperCase()) {
  case "GET":
    if (resource === "products") {
      getProducts();
    } else {
      const pid = pidOf(resource);
      getProduct(pid);
    }
    break;
  case "DELETE":
    const pid = pidOf(resource);
    deleteProduct(pid);
    break;
  case "POST":
    const [title, price, category] = params;
    createProduct(title, price, category).then(console.log);
    break;
  default:
    console.error(`Unsupported method: ${method}`);
}
