$(document).ready(function () {
    M.updateTextFields();
    $('.sidenav').sidenav();
    $("#create-note").on("click", createNote)

    function createNote() {
        event.preventDefault()
        console.log("create clicked")
        // eliminate when backend conected
        renderNotes()
        console.log(newNote);
        var newNote = {
            title: "newsflash",
            text: "sike"
        }
        // capture note from inputs, using jquery
        $.post("/api/notes", newNote).then(function (data) {
            console.log(data)
            //reload
        })
    }

    function renderNotes() {
        console.log("hello");
        $.get("/api/getNotes").then(function (dbNotes) {
            console.log(dbNotes)
            // ES6  map and filter  
            for (var i = 0; i < dbNotes.length; i++) {
                //let title = $("#title_name").val()
                // let text = $("#text_name").val()
                let title = dbNotes[i].title
                let text = dbNotes[i].text
                let id = dbNotes[i].id
                console.log(title, text)
                let card = `
                <div class="card">
                    <div class="card-action">
                        <a href="#" class="btn-floating waves-effect waves-light right">
                        <i class="material-icons delete">clear</i>
                        </a>
                    </div>
                    <div class="card-content black-text">
                        <span class="card-title" idDB=${id}>${title}</span>
                        <p>${text}</p>
                    </div>
                </div>`
                $("#cardArea").append(card)
                $(".delete").on("click", deleteNote)
            }
        })
    }
    function deleteNote() {
        event.preventDefault()
        console.log("delete clicked")
        // get the id from the note  you will ask for the attribute
        // let id = $(this).attr("idDB")
        // ajax call with method delete and pass the id
        $.ajax({   // passing the id to delete in req.params
            url: "/api/delete/" + id,
            method: "DELETE"
        }).then(function (data) {
            //reload
        })
    }
    renderNotes()

});