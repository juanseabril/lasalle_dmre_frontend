import React, { useContext } from 'react';
import { SDivider, SLink, SLinkContainer, SLinkIcon, SLinkLabel, SLinkNotification, SLogo, SSearch, SSearchIcon, SSidebar, STheme, SThemeLabel, SThemeToggler, SToggleThumb } from './styles';

import { logoSVG } from '../../assets';

import { AiOutlineSearch, AiOutlineSetting } from 'react-icons/ai';
import { GiBrassEye, GiGooeyEyedSun, GiCyberEye, GiAbstract069 } from 'react-icons/gi';
import { FaHome } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';

import { ThemeContext } from './../../App';

const Sidebar = () => {
    const { setTheme, theme } = useContext(ThemeContext);
    return (
        <SSidebar>
            <SLogo>
                <img src={logoSVG} alt="logo" />
            </SLogo>
            <SSearch>
                <SSearchIcon>
                    <AiOutlineSearch />
                </SSearchIcon>
                <input placeholder='Buscar'/>  
            </SSearch>
            <SDivider />   
            {linksArray.map(({ icon, label, notification, to }) => (
                <SLinkContainer key={label}>
                    <SLink to={to}>
                        <SLinkIcon>{icon}</SLinkIcon>
                        <SLinkLabel>{label}</SLinkLabel>
                        {!!notification && (
                            <SLinkNotification>{notification}</SLinkNotification>
                        )}
                    </SLink>
                </SLinkContainer>
            ))}
            <SDivider />
            {secondaryLinksArray.map(({ icon, label, notification }) => (
                <SLinkContainer key={label}>
                    <SLink to="/">
                        <SLinkIcon>{icon}</SLinkIcon>
                        <SLinkLabel>{label}</SLinkLabel>
                        {!!notification && (
                            <SLinkNotification>{notification}</SLinkNotification>
                        )}
                    </SLink>
                </SLinkContainer>
            ))}
            <SDivider />
            <STheme>
                <SThemeLabel>Dark Mode</SThemeLabel>
                <SThemeToggler
                    isActive={theme === 'dark'}
                    onClick={() => setTheme((p) => (p === 'light' ? "dark" : "light"))}
                >
                    <SToggleThumb style={theme === 'dark' ? { right: "1px" } : {  }}/>
                </SThemeToggler>
            </STheme>
        </SSidebar>
    );
};

const linksArray = [
    {
        label: "Inicio",
        icon: <FaHome />,
        to: "/",
        notification: 3
    },
    {
        label: "Disco Optico",
        icon: <GiBrassEye />,
        to: "/disco",
        notification: 0
    },
    {
        label: "Drusas",
        icon: <GiAbstract069 />,
        to: "/drusas",
        notification: 0
    },
    {
        label: "Macula",
        icon: <GiCyberEye />,
        to: "/macula",
        notification: 0
    },
    {
        label: "Modelo IA",
        icon: <GiGooeyEyedSun />,
        to: "/modelo",
        notification: 0
    }
];

const secondaryLinksArray = [
    {
        label: "Settings",
        icon: <AiOutlineSetting />,
        notification: 2
    },
    {
        label: "Logout",
        icon: <MdLogout />,
        notification: 0
    }
];

export default Sidebar;