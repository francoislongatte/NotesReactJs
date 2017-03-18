import React from 'react';
import If from '../helper/if.jsx';
import stateTwoWayMixin from '../helper/stateTwoWayMixin.jsx';
import AjaxRequestLib from '../helper/ajaxRequestLib';

var Login = React.createClass({
    mixins: [stateTwoWayMixin],
    getInitialState: function(){
        return{
            registerBool : false,
            messageReq: "",
            name: "",
            email: "",
            password: ""
        }
    },
    toggleRegister: function(){
        this.setState({
            registerBool: !this.state.registerBool
        });
    },
    setMessageRegister: function(data){
        this.setState({
            messageReq : data
        });
    },
    submitFormLogin: function(e){
        e.preventDefault();
        var data = "";
        var _this = this;

        AjaxRequestLib.postLogin(this.state.email,this.state.password,function(data){
            if(!data.error){
                _this.props.handleResApiKey(data);
            }else{
                alert("erreur d'identifiant");
            }
        })
    },
    submitFormRegister: function(e){
        e.preventDefault();
        var _this = this;
        AjaxRequestLib.postRegister(this.state.name,this.state.email,this.state.password,function(message){

            var mes = message ? "Inscription réussie" : "Inscription echoué" ;
            _this.setMessageRegister(mes);
            _this.toggleRegister();

        });
    },
    render: function () {
        if(!this.state.registerBool){
            return (
                <div className="formLogin">
                    <If test={this.state.messageReq} >
                        <p>{this.state.messageReq}</p>
                    </If>
                    <form onSubmit={this.submitFormLogin}>
                        <input className="form-control" placeholder="email" type="email" {...this.linkState('email')} />
                        <input className="form-control" placeholder="password" type="password" {...this.linkState('password')}/>
                        <input className="form-control" type="submit" value="Login" />
                    </form>
                    <span>Ou</span>
                    <a href="#" onClick={this.toggleRegister}>inscrivez-vous</a>
                </div>
            );
        }else{
            return(
                <div className="formLogin">
                    <button className="form-control" onClick={this.toggleRegister}>retour</button>
                    <form onSubmit={this.submitFormRegister}>
                        <input className="form-control" placeholder="Nom" type="text" name="name" {...this.linkState('name')} />
                        <input className="form-control" placeholder="email" type="email" name="email" {...this.linkState('email')} />
                        <input className="form-control" placeholder="Mot de passe" type="password" name="password" {...this.linkState('password')} />
                        <input className="form-control" type="submit" value="Inscription" />
                    </form>
                </div>
            )
        }

    }
});


module.exports = Login;