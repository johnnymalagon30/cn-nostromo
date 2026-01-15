import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link} from "@heroui/react";

import ModalButton from "./ModalButton";
import ApodButton from "./ApodButton";

export const NostromoLogo = () => {
  return (
    <img
        src="images/satellite.svg"
        className="max-w-10"
    />
  );
};

export default function TopNav() {
  
  return (
    <Navbar className="mx-0" maxWidth="full" isBlurred={false} shouldHideOnScroll>

      <Link className="" href="/">
        <NavbarBrand>
        
          <p className="text-3xl font-bold text-red-500">CODENAME: NOSTROMO</p>
          <NostromoLogo />
        </NavbarBrand>
      </Link>
      

      

      <NavbarContent justify="end">
        <NavbarItem>
          <ApodButton />
        </NavbarItem>
        <NavbarItem>
          <ModalButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
