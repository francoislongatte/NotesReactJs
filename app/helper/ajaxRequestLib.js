import ajax from 'superagent';

export default class AjaxRequestLib {

    static postLogin(email, password, callback) {
        ajax.post('http://longatte.be/api/public/login')
            .send({email: email, password: password})
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .end(function (err, res) {
                console.log('error?:', err);
                console.log('Response ok:', res.ok);
                console.log('Response text:', res.text);
                var data = JSON.parse(res.text);
                callback(data);
            });
    }

    static postRegister(name, email,password, callback) {
        ajax.post('http://longatte.be/api/public/register')
            .send({name: name, email: email, password: password })
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .end(function(err, res){
                console.log('error?:', err);
                console.log('Response ok:', res.ok);
                console.log('Response text:', res.text);

                callback(res.ok);

            });
    }

    static getNotes(apiKey,callback){
        ajax.get('http://longatte.be/api/public/notes')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', apiKey)
            .end(function (err, res) {
                //console.log('error?:', err);
                //console.log('Response ok:', res.ok);
                //console.log('Response ok:', res.text);
                var data = JSON.parse(res.text);

                callback(data.notes);
            });
    }

    static postPositionList(apiKey,notes){
        ajax.post('http://longatte.be/api/public/notes/positionList')
            .send({notes: notes}).set('Content-Type', 'application/json')
            .set('Authorization', apiKey)
            .end(function(err,res){});
    }

    static deleteNote(apiKey,note,callback){
        ajax.delete('http://longatte.be/api/public/notes/' + note.id)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', apiKey)
            .end(function (err, res) {
                callback();
            });
    }

    static getNote(apiKey,id,callback){
        ajax.get('http://longatte.be/api/public/notes/' + id)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', apiKey )
            .end(function(err, res){
                var data = JSON.parse(res.text);
                callback(data,res.ok);
            });
    }

    static putNote(apiKey,id,title,text,status,callback){
        ajax.put('http://longatte.be/api/public/notes/' + id)
            .send({title: title, text: text, status: status})
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', apiKey )
            .end(function(err, res){
                callback(res.ok);
            });
    }
}
