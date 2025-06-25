import { Logo } from '../assets/Logo'
import { UserIcon } from '../assets/UserIcon'
import { Search } from './Search'
import '../styles/Navbar.css'

function Navbar() {
    return (
        <div className='NavbarContainer'>
            <Logo />
            <Search />
            <UserIcon />
        </div>
    )
}

export { Navbar }