import React from 'react';
import ReactDOM from 'react-dom';
import NavView from './components/navView.jsx';
import moment from 'moment';
import 'moment/locale/fr.js';

require("./style/style.scss");

var R_noteWidget = React.createClass({
    componentDidMount() {
        function doesFontExist(fontName) {
            // creating our in-memory Canvas element where the magic happens
            var canvas = document.createElement("canvas");
            var context = canvas.getContext("2d");

            // the text whose final pixel size I want to measure
            var text = "abcdefghijklmnopqrstuvwxyz0123456789";

            // specifying the baseline font
            context.font = "72px monospace";

            // checking the size of the baseline text
            var baselineSize = context.measureText(text).width;

            // specifying the font whose existence we want to check
            context.font = "72px '" + fontName + "', monospace";

            // checking the size of the font we want to check
            var newSize = context.measureText(text).width;

            // removing the Canvas element we created
            canvas = null;

            //
            // If the size of the two text instances is the same, the font does not exist because it is being rendered
            // using the default sans-serif font
            //
            if (newSize == baselineSize) {
                return false;
            } else {
                return true;
            }
        }

        window.onload = function(){
            if (!doesFontExist('Source Sans Pro')) {
                var headHTML = document.head.innerHTML;
                headHTML += '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:100,200,400">';
                document.head.innerHTML = headHTML;
            }
        };
    },
    getInitialState: function(){
        return{
            condition: false,
            dateDayN : moment().format('D'),
            dateDay : moment().format('dddd'),
            dateMonth : moment().format('MMM'),
        }
    },
    toggleClick: function(){
        this.setState({
            condition: !this.state.condition
        });
    },
    render: function () {
        return (
            <div className="Rwrapper">
                <div className={ this.state.condition ? "timeAn" : "timeAn transition" }>
                    <time onClick={this.toggleClick} >
                        <span className="month">{this.state.dateMonth}</span>
                        <span className="dayN">{this.state.dateDayN}</span>
                        <span className="day">{this.state.dateDay}</span>
                        <span className="title">Note App</span>
                    </time>
                </div>
                <div className={ this.state.condition ? "app" : "app transition" }>
                    <h1>Note</h1>
                    <NavView  />
                </div>
            </div>
        );
    }
});


ReactDOM.render(
<R_noteWidget />,
    document.getElementById('R_noteApp')
);