import React, {useState} from 'react'
import NavButton from './NavButton'
import './NavBar.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import {ReactComponent as Logo} from '../../assests/icons/connectly-logo.svg'
import {ReactComponent as DashIcon} from '../../assests/icons/megaphone.svg'
import {ReactComponent as SettingsIcon} from '../../assests/icons/settings.svg'

const NavBar: React.FC = () => {
    const [selected, setSelected] = useState<String>('/home');
    const handleNavigation = (path: string) => {
        setSelected(path);
        //TO-DO
        console.log(`navifgating to ${path}`);
    };

    return (
        <div className='nav-bar'>
            <NavButton label={<Logo />} onClick={() => handleNavigation('/home')} className='nav-home-button' isSelected={selected === '/home'}/>
            <NavButton label={<DashIcon/>} onClick={() => handleNavigation('/dashboard')} className='nav-dashboard-button' isSelected={selected === '/dashboard'}/>
            <div className="nav-spacer"></div>
            <NavButton label={<SettingsIcon/>} onClick={() => handleNavigation('/settings')} className='nav-settings-button' isSelected={selected === '/settings'}/>
        </div>
    );
};


export default NavBar;