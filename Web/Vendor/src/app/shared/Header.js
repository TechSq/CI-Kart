import React, { useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link, useHistory, useLocation, withRouter } from 'react-router-dom';

const Header = () => {

  const history = useHistory();
  const location = useLocation()

  const isPathActive = (path)=> {
    return location.pathname.startsWith(path);
  }

  const toggleBottomMenu = ()=> {
    document.querySelector('.bottom-navbar').classList.toggle('header-toggled');
  }

  const toggleRightSidebar = ()=> {
    document.querySelector('.right-sidebar').classList.toggle('open');
  }

  useEffect(()=>{
    let navbar = document.querySelector('.horizontal-menu');
    let body = document.querySelector('body');
    if ( navbar ) {
      window.addEventListener('scroll', function() { 
        if (window.scrollY >= 70) { 
          navbar.classList.add('fixed-on-scroll');
          body.classList.add('horizontal-menu-fixed-on-scroll');
         }
        else { 
          navbar.classList.remove('fixed-on-scroll');
          body.classList.remove('horizontal-menu-fixed-on-scroll');
         }
      });
    }
  },[])
  return (
    <div className="horizontal-menu">
        <nav className="navbar top-navbar default-layout-navbar col-lg-12 col-12 p-0 d-flex flex-row">
          <div className="container">
            <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
              <Link className="navbar-brand brand-logo" to="/"><img src={require('../../assets/images/logo.png')} alt="logo" /></Link>
              <Link className="navbar-brand brand-logo-mini" to="/"><img src={require('../../assets/images/logo-mini.png')} alt="logo" /></Link>
            </div>
            <div className="navbar-menu-wrapper d-flex align-items-stretch justify-content-end">
              {/* <ul className="navbar-nav mr-lg-2">
                <li className="nav-item nav-search d-none d-lg-block">
                  <div className="input-group">
                    <div className="input-group-prepend hover-cursor" id="navbar-search-icon">
                      <span className="input-group-text" id="search">
                        <i className="ti-search"></i>
                      </span>
                    </div>
                    <input type="text" className="form-control" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search"></input>
                  </div>
                </li>
              </ul> */}
              <ul className="navbar-nav navbar-nav-right">
                <li className="nav-item">
                  <Dropdown>
                    <Dropdown.Toggle className="nav-link count-indicator">
                      <i className="ti-bell mx-0"></i>
                      <span className="count"></span>
                    </Dropdown.Toggle>
                  </Dropdown>
                </li>
                <li className="nav-item nav-profile">
                  <Dropdown>
                    <Dropdown.Toggle className="nav-link count-indicator">
                      <img src={require("../../assets/images/faces/face24.png")} alt="profile"/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="preview-list navbar-dropdown">
                      <Dropdown.Item className="dropdown-item preview-item" onClick={evt =>evt.preventDefault()}>
                        <div className="d-flex align-items-center">
                          <i className="ti-settings text-primary"></i>
                          <span className="ps-2">Settings</span>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item className="dropdown-item preview-item" onClick={evt =>evt.preventDefault()}>
                        <div className="d-flex align-items-center" onClick={()=> {localStorage.removeItem('@token'); history.push("/login")}}>
                          <i className="ti-power-off text-primary"></i>
                          <span className="ps-2">Logout</span>
                        </div>  
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              </ul>
              <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" onClick={toggleBottomMenu}>
                <span className="ti-menu"></span>
              </button>
            </div>
          </div>
        </nav>
        <nav className="bottom-navbar">
          <div className="container">
            <ul className="nav page-navigation">
              <li className={ isPathActive('/dashboard') ? 'nav-item active' : 'nav-item' }>
                <Link className="nav-link" to="/dashboard">
                  {/* <i className="ti-home menu-icon"></i> */}
                  <span className="menu-title">Dashboard</span>
                </Link>
              </li>
              <li className={ isPathActive('/services') ? 'nav-item active' : 'nav-item' }>
                <Link className="nav-link" to="/services">
                  {/* <i className="ti-home menu-icon"></i> */}
                  <span className="menu-title">Services</span>
                </Link>
              </li>  
              <li className={ isPathActive('/report') ? 'nav-item active' : 'nav-item' }>
                <Link className="nav-link" to="/report">
                  {/* <i className="ti-home menu-icon"></i> */}
                  <span className="menu-title">Report</span>
                </Link>
              </li>   
            </ul>
          </div>
        </nav>
      </div>
  )
}

export default withRouter(Header);
