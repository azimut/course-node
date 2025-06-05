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

const [, , method, ...resource] = process.argv;

if (method === "GET") {
  if (resource[0] === "products") {
    getProducts();
  } else {
    const pid = pidOf(resource[0]);
    getProduct(pid);
  }
}
if (method === "DELETE") {
  const pid = pidOf(resource[0]);
  deleteProduct(pid);
}
if (method === "POST") {
  const [title, price, category] = resource;
  const pid = await createProduct(title, price, category);
  console.log(pid);
}
