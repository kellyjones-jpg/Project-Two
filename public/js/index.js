// import { check } from "prettier";

$(document).ready(function () {

    M.updateTextFields();
    $('.sidenav').sidenav();
    $('.modal').modal();
    $("#create-note").on("click", createNote);
    $("#spell-check").on("click", function () {
        var noteText = $("#text_name").val();
        var modalData = checkGrammar(noteText);

        console.log(modalData);
        
    });

    function createNote() {
        event.preventDefault()
        console.log("create clicked")
        // eliminate when backend conected
        //renderNotes()
   
        var newNote = {
            title: $('#title_name').val(),
            text: $('#text_name').val()
        }
        console.log(newNote);
        // capture note from inputs, using jquery
        $.post("/api/notes", newNote).then(function (waitingforthis) {
            console.log(waitingforthis);
           //renderNotes()
            //reload
            location.reload()
        })
    }

    function renderNotes() {
        console.log("render");
        $.get("/api/notes").then(function (dbNotes) {
            console.log("dbNotes:", dbNotes)
            // ES6  map and filter  
            for (var i = 0; i < dbNotes.length; i++) {
                //let title = $("#title_name").val()
                // let text = $("#text_name").val()
                let title = dbNotes[i].title
                let text = dbNotes[i].text
                let id = dbNotes[i].id
                console.log(title, text)
                let card = `<div class="col s12 m6 l4">
                <div class="card">
                    <div class="card-action">
                        <a href="#" class="btn-floating waves-effect waves-light right">
                        <i class="material-icons delete" id="${id}">clear</i>
                        </a>
                    </div>
                    <div class="card-content black-text">
                        <span class="card-title" idDB=${id}>${title}</span>
                        <p>${text}</p>
                    </div>
                </div>
                </div>`
                $("#cardCol").append(card)
                
            }
        })
    }
    $(document).on("click", ".delete", function(thisIsWhatIClickedOn) {
        var id = thisIsWhatIClickedOn.target.id;
        console.log(id);
        deleteNote(id);
    })
    function deleteNote(id) {
        console.log("delete clicked")
        // get the id from the note  you will ask for the attribute
        console.log(id);
        // ajax call with method delete and pass the id
        $.ajax({   // passing the id to delete in req.params,
            method: "DELETE",
            url: "/api/notes/" + id
            
        }).then(function() {
            $("#cardCol").empty()
            renderNotes()
        });

        
            
            
    }
    renderNotes()

    var apiKey = 'CK3ShTXGxWXZom9G';

    function checkGrammar( noteText ) {

        const queryUrl = `https://api.textgears.com/check.php?text=${noteText.replace(' ', '+')}&key=${apiKey}`;

        $.ajax({
            url: queryUrl,
            method: "GET" 
        }).then(function(res) {
            console.log(res);

            var errArray = [];

            res.errors.forEach((e,i) => {
                var tempObject = {
                    type: e.type,
                    bad: e.bad,
                    better: e.better
                };
                errArray.push(tempObject);
            });
            
            console.log(errArray);
            renderErrorsToPage(errArray);
            return errArray;
        });
    }

    function renderErrorsToPage(errArray) {
        var modalErrors = $('#errors');

        console.log(modalErrors);
        
        errArray.forEach(err => {
            console.log(err);
            modalErrors.text(err.better)
        })
    }



});