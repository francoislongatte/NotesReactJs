var stateTwoWayMixin = {
    linkState : function(key){
        return{
            value: this.state[key],
            onChange: function (event){
                if (event.target.value === this.state[key]) {
                    return;
                }
                var newState = {};
                newState[key] = event.target.value;
                this.setState(newState);
            }.bind(this)
        }
    },
    linkCheckState : function(key){
        return{
            value: this.state[key],
            onChange: function (event){
                if (event.target.checked === this.state[key]) {
                    return;
                }
                var newState = {};
                newState[key] = event.target.checked;
                this.setState(newState);
            }.bind(this)
        }
    }
};
module.exports = stateTwoWayMixin;