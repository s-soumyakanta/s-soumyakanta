import { Header } from './header';
import { Search } from './searchbar';
import { SocialLinks } from './social-links';

export const Navbar = () => {
	return (
		<div className="grid md:bg-neutral-950 bg-neutral-950 rounded-lg grid-cols-1 items-center gap-1 pt-5 p-2 text-sm md:grid-cols-2">
			<Search />
			{/* <Header /> */}
		</div>
	);
};
