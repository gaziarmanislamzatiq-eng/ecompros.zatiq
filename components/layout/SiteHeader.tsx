import StaggeredMenu, {
  type StaggeredMenuItem,
} from "@/components/navigation/StaggeredMenu";
import { brand } from "@/lib/brand";

const navigation: StaggeredMenuItem[] = [
  { label: "Home", ariaLabel: `${brand.name} home`, link: "/" },
  { label: "Services", ariaLabel: "View Ecom ProDesk services", link: "/services" },
  { label: "Portfolio", ariaLabel: "View Ecom ProDesk portfolio", link: "/portfolio" },
  { label: "Pricing", ariaLabel: "View Ecom ProDesk pricing", link: "/pricing" },
  { label: "Team", ariaLabel: "Meet the Ecom ProDesk team", link: "/team" },
  { label: "Workbench", ariaLabel: "View the capability workbench", link: "/#workbench" },
  { label: "Proof", ariaLabel: "View client proof and marks", link: "/#proof" },
  { label: "Book call", ariaLabel: "Book a call with Ecom ProDesk", link: "/#booking" },
];

export default function SiteHeader() {
  return (
    <StaggeredMenu
      accentColor="#ef7a2d"
      changeMenuColorOnOpen
      colors={["#ef7a2d", "#8a4424", "#f3eee5"]}
      displayItemNumbering
      displaySocials={false}
      isFixed
      items={navigation}
      logoUrl={brand.logos.light}
      menuButtonColor="#111112"
      openLogoUrl={brand.logos.light}
      openMenuButtonColor="#17110c"
      position="right"
    />
  );
}
