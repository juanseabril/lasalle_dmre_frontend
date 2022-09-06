import React from 'react';
import { SDivider, SLogo, SSearch, SSearchIcon, SSidebar } from './styles';

import { logoSVG } from '../../assets';

import { AiOutlineSearch } from 'react-icons/ai'

const Sidebar = () => {
    return <SSidebar>
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
    </SSidebar>;
}

export default Sidebar;