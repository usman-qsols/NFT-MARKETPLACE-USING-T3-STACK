const StripeCheckOutButton = () => {
  const handleClick = async () => {
    const products = [
      {
        product: 1,
        name: "Product 1",
        price: 500,
      },
    ];
    const response = await fetch("/api/route", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
      body: JSON.stringify(products),
    });
    console.log("called");
  };
  return (
    <button className="btn" onClick={handleClick}>
      Checkout
    </button>
  );
};

export default StripeCheckOutButton;
