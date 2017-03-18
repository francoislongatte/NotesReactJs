import React from 'react';
import Ajax from 'superagent';
import Cookies from 'js-cookie';
import moment from 'moment';
import stateTwoWayMixin from '../helper/stateTwoWayMixin.jsx';
import autosize from 'autosize';

var CreateNote = React.createClass({
    mixins: [stateTwoWayMixin],
    getInitialState: function(){
        var auth = Cookies.get('Auth') ? Cookies.get('Auth') : null ;
        return{
            messageReq: "",
            title: "",
            text: "",
            arrayNewNotes : []
        }
    },
    handleNewNotesAndMessage: function(bool,message,id){
        if(bool){
            var obNote = {
                "id":id,
                "title": this.state.title,
                "text": this.state.text,
                "status" : "0",
                "created_at" : moment().format("YYYY-MM-D H:mm:ss"),
                "positionList" : id
            };
            this.props.handleNewNotes(obNote);
        }
        this.setState({
            messageReq : message,
        });
    },
    componentDidUpdate(){
        autosize(document.querySelectorAll('textarea'));
    },
    submitFormNoteAdd: function(e){
        e.preventDefault();
        var data = "";
        var _this = this;
        Ajax.post('http://longatte.be/api/public/notes')
            .send({title: this.state.title, text: this.state.text})
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', this.props.apiKey )
            .end(function(err, res){
                console.log('error?:', err);
                console.log('Response ok:', res.ok);
                console.log('Response text:', res.text);
                var data = JSON.parse(res.text);
                if(!data.error){
                    _this.handleNewNotesAndMessage(true,"Ajout de la note à reussie",data.note_id);
                }else{
                    _this.handleNewNotesAndMessage(false,"Ajout de la note à echoué","");
                }

            });
    },
    render: function () {
        return (
            <form className="formAdd" onSubmit={this.submitFormNoteAdd}>
                <input required className="form-control" placeholder="titre" type="text" {...this.linkState('title')} />
                <textarea required className="form-control" placeholder="votre texte ..." {...this.linkState('text')} />
                <input className="form-control" type="submit"  value="Ajouter une note"/>
            </form>
        )
    }
});

module.exports = CreateNote;
