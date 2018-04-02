import React, {Component} from 'react';
import Aux from '../Auxiliar/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: true
    }

    sideDreawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((previousState) => {
            return {showSideDrawer: !previousState.showSideDrawer} 
        });
    }

    render () {
        return ( // always has to be wrapped with return
            <Aux>
                <Toolbar drawerToggleClicked = {this.sideDrawerToggleHandler} />
                <SideDrawer 
                    open = {this.state.showSideDrawer} 
                    closed = {this.sideDreawerClosedHandler} 
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;