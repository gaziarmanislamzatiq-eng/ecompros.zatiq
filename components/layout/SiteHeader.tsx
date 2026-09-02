import StaggeredMenu, {
  type StaggeredMenuItem,
} from "@/components/navigation/StaggeredMenu";
import { brand } from "@/lib/brand";

const navigation: StaggeredMenuItem[] = [
  { label: "Home", ariaLabel: `${brand.name} home`, link: "/" },
  { label: "Services", ariaLabel: "ViewEcomPros services", link: "/services" },
  { label: "Portfolio", ariaLabel: "ViewEcomPros portfolio", link: "/portfolio" },
  { label: "Pricing", ariaLabel: "ViewEcomPros pricing", link: "/pricing" },
  { label: "Team", ariaLabel: "Meet theEcomPros team", link: "/team" },
  { label: "Proof", ariaLabel: "View client proof and marks", link: "/#proof" },
  { label: "Book call", ariaLabel: "Book a call withEcomPros", link: "/#booking" },
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
