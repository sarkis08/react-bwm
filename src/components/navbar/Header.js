import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

class Header extends React.Component {

    constructor() {
        super();

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.props.logout();
        this.props.history.push('/');
    }

    renderAuthButtons() {
        const { isAuth } = this.props.auth;

        if (isAuth) {

            return (
                <li className="nav-item">
                    <a className="nav-link clickable" onClick={this.handleLogout}>Logout</a>
                </li>
            )
        }

        return [
            <React.Fragment>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                </li>
            </React.Fragment>
        ]
    }

    render() {
        return (

            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
                <div className='container'>
                    <Link className="navbar-brand" to="/">Navbar  <span className="sr-only">(current)</span></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form className="form-inline my-2 my-lg-0 mr-auto">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                        <ul className="navbar-nav">
                            {this.renderAuthButtons()}
                        </ul>
                    </div>
                </div>
            </nav>

        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default withRouter(connect(mapStateToProps)(Header))