import React from 'react';
import Ajax from 'superagent';
import If from '../helper/if.jsx';
import stateTwoWayMixin from '../helper/stateTwoWayMixin.jsx';
import AjaxRequestLib from '../helper/ajaxRequestLib.js';
import autosize from 'autosize';

var ShowNote = React.createClass({
    mixins: [stateTwoWayMixin],
    getInitialState: function(){
        return{
            noteTitle: "",
            noteText:"",
            noteStatus:"",
            messageReq: ""
        }
    },
    setNote:function(data){
        this.setState({
            noteTitle : data.title,
            noteText : data.text,
            noteStatus : Number(data.status)
        });
    },
    handleChange: function(field, e) {
        this.setState({
           noteStatus : e.target.checked == true ? 1 : 0
        });
    },
    componentDidMount() {
        var _this = this;
        AjaxRequestLib.getNote(this.props.apiKey,this.props.id,function(data,bool){
            if(bool){
                _this.setNote(data,"Ajout de la note avec succès");
            }else{
                _this.setNote(data,"Ajout de la note à echoué");
            }
        });


    },
    componentDidUpdate(){
        autosize(document.querySelectorAll('textarea'));
    },
    submitFormModification(){
        var _this = this;

        AjaxRequestLib.putNote(this.props.apiKey,this.props.id,this.state.noteTitle,this.state.noteText,this.state.noteStatus,function(bool){
            if(bool){
                var note = {
                    title:_this.state.noteTitle,
                    text:_this.state.noteText,
                    status: _this.state.noteStatus ? '1' : '0'
                };
                _this.props.handleListView(note);
            }
        });
    },
    handleDelete(e){
        e.preventDefault();
        this.props.handleDeleteNote('noteModif');
    },
    render: function () {
        return (
            <form className="formUpdate" onSubmit={this.submitFormModification}>
                <label>Modifications</label>
                <input className="form-control" required type="text" {...this.linkState('noteTitle')} />
                <textarea className="form-control" required  {...this.linkState('noteText')} />
                <input type="checkbox" {...this.linkCheckState('noteStatus')}/>
                <input className="form-control" type="submit" value="Modifier" />
                <input className="form-control" type="button" value="Supprimer"  onClick={this.handleDelete} />
            </form>
        );
    }
});


module.exports = ShowNote;