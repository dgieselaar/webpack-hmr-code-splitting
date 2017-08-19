import React from 'react';
import Loadable from 'react-loadable';

const Home = Loadable({
    loader: ( ) => import(/* webpackChunkName: "home" */ './home'),
    loading: ( ) => <blink>Loading...</blink>
});

const Setting = Loadable({
    loader: ( ) => import(/* webpackChunkName: "setting" */ './setting'),
    loading: ( ) => <blink>Loading...</blink>
});


class App extends React.Component {
    
    constructor ( props ) {
        super(props);
        this.state = { view: 'none' };
    }

    render ( ) {

        const views = [ 'none', 'home', 'setting' ];
        
        let Component;
        
        switch(this.state.view) {
            default:
            Component = null;
            break;

            case 'home':
            Component = Home;
            break;

            case 'setting':
            Component = Setting;
            break;
        }

        return (<div>
            <ul>
                {views.map(view => (
                    <li key={view}>
                        <button type="button" onClick={( ) => this.setState({view })}>
                            {view}
                        </button>
                    </li>
                ))}
            </ul>
            <h4>Loaded: {this.state.view}</h4>
            {Component ?
                <Component/>
                : null
            }
        </div>)

    }
}

export default App;
