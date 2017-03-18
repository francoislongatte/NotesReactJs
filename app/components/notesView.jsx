import React from 'react';
import CreateNote from './createNote.jsx';
import ShowNote from './showNote.jsx';
import moment from 'moment';
import Sortable from 'sortablejs';
import arrayMove from '../helper/helper.js';
import AjaxRequestLib from '../helper/ajaxRequestLib.js';

var NotesView = React.createClass({
    getInitialState: function () {
        return {
            notes: [],
            ListeModifToggle: true,
            id: "",
            index: ""
        }
    },
    componentDidMount() {
        var _this = this;

        AjaxRequestLib.getNotes(this.props.apiKey,function(notes){
            _this.setNotes(notes);
        });
    },
    componentDidUpdate(){
        const _this = this;
        var notesItemList = document.getElementById('notesItemList');
        if(notesItemList){
            Sortable.create(notesItemList, {
                handle: ".draggableSpan",
                animation: 100,
                chosenClass: 'chosen',
                ghostClass: "ghost",
                onUpdate: function (e) {
                    arrayMove(_this.state.notes, e.oldIndex, e.newIndex);
                    AjaxRequestLib.postPositionList(_this.props.apiKey,_this.state.notes);
                }
            });
        }

    },
    setNotes: function (data) {
        data.sort(function (a, b) {
            return a.positionList - b.positionList;
        });

        this.setState({
            notes: data
        });
    },
    handleNewNotes: function (data) {
        this.state.notes.push(data);
        this.setState({
            notes: this.state.notes
        });
    },
    toggleListView(id, index, data){
        var indexTest = index || index == 0 ? index : this.state.index;

        if (data && (indexTest || indexTest == 0)) {
            this.state.notes[indexTest].modified_at = moment().format("YYYY-MM-D H:mm:ss");
            this.state.notes[indexTest].status = data.status;
            this.state.notes[indexTest].text = data.text;
            this.state.notes[indexTest].title = data.title;
        }

        this.setState({
            ListeModifToggle: !this.state.ListeModifToggle,
            id: id ? id : this.state.id,
            index: indexTest,
            notes: this.state.notes
        });
    },
    delete(index, e){
        var _this = this;
        var indexTest = index || index == 0 ? index : this.state.index;

        AjaxRequestLib.deleteNote(this.props.apiKey,this.state.notes[indexTest],function(){
            spliceNotesArray();
        });

        _this.state.notes.splice(index, 1);

        var spliceNotesArray = function () {
            if (e == 'noteModif') {
                _this.setState({
                    ListeModifToggle: !_this.state.ListeModifToggle,
                    notes: _this.state.notes
                })
            } else {
                _this.setState({
                    notes: _this.state.notes
                })
            }
        };
    },
    render: function () {
        if (this.state.ListeModifToggle) {
            return (
                <div>
                    <CreateNote apiKey={this.props.apiKey}
                                handleNewNotes={(data) => this.handleNewNotes(data)}/>

                    <ul id="notesItemList">
                        {this.state.notes.map((value, index) =>
                            <li key={index} className="noteItem">
                                <span className="draggableSpan">
                                </span>
                                <div className="contentLi" onClick={() => this.toggleListView(value.id, index)}>
                                    <h2 className="tile">{value.title}</h2>
                                    <p>{value.text}</p>
                                    <span className="timeNote">{value.modified_at}</span>
                                </div>

                                <a href="#" className="btn btnDelete" type="button" onClick={this.delete.bind(this, index)}></a>
                            </li>
                        )}
                    </ul>
                </div>
            )
        } else {
            return (
                <div className="showNoteDiv">
                    <input className="form-control" type="button" onClick={this.toggleListView} value="retour"/>
                    <ShowNote handleDeleteNote={this.delete.bind(this, this.state.index)}
                              handleListView={(data) => this.toggleListView(null, null, data)}
                              index={this.state.index} id={this.state.id} apiKey={this.props.apiKey}/>
                </div>
            )
        }
    }
});

module.exports = NotesView;