import Logo from "./Logo";

export default function Nav() {
  return (
    <header className="py-9 w-full">
      <nav>
        <ul className="w-[90%] mx-auto">
          <li>
            <Logo />
          </li>
        </ul>
      </nav>
    </header>
  );
}
