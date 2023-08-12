import CartButton from "../components/cart-button";

function Header() {
  return (
    <header className="flex justify-between">
      <div className="flex-grow">
        <h1>Jurassic Store</h1>
      </div>
      <div>
        <CartButton />
      </div>
    </header>
  );
}

export default Header;
