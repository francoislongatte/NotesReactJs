import React from 'react';
import Login from './login.jsx';
import NotesView from './notesView.jsx';
import Cookies from 'js-cookie';

var NavView = React.createClass({
    getInitialState: function(){
        var auth = Cookies.get('Auth') ? Cookies.get('Auth') : null ;
        return{
            api_key: auth
        }
    },
    handleResApiKey:function(data){
        Cookies.set('Auth', data.apiKey);
        this.setState({
            api_key : data.apiKey
        });
    },
    render: function () {
        var auth = Cookies.get('Auth');
        if(auth){
            return(
                <NotesView apiKey={this.state.api_key} />
            );
        }else{
            return (
                    <Login handleResApiKey={(data) => this.handleResApiKey(data)} />
            );
        }

    }
});

module.exports = NavView;
