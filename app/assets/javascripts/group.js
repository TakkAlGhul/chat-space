$(function() {

var userList = $('#user-search-result');
var memberList = $('#chat-group-user'); 

function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${ user.name }</p>
                    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${ user.id } data-user-name=${ user.name }>追加</div>
                </div>`
    userList.append(html);
}
function appendErrMsgToHTML(msg) {
    var html = `<p class= "chat-group-user">${ msg }</div>`
    userList.append(html);
}
function appendUserList(user_id, name) {
    var html = `<div class="chat-group-user clearfix js-chat-member" data-user-id=${ user_id }>
                <input name="group[user_ids][]" type="hidden" value=${ user_id }>
                <p class="chat-group-user__name">${ name }</p>
                <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id=${ user_id } data-user-name=${ name }>削除</div>
                </div>`
    memberList.append(html);
}

    $('#user-search-field').on("keyup", function() {
        var preWord;
        var input = $('#user-search-field').val();
        if (input !== preWord && input.length !== 0) {
   
        
        
        $.ajax({
            type: 'GET',
            url:  '/users',
            data: { keyword: input },
            dataType: 'json'
        })
        
        .done(function(users) {
            if(users.length !== 0) {
                users.forEach(function(user) {
                appendUser(user);                
            })
            
            }else{
                appendErrMsgToHTML("一致するユーザーがいない");
            } 
        })
        .fail(function(){
            alert('error')        
        })
    }
    
    preWord = input 
    $('#user-search-result').empty();
    });
    
        $(function() {
        $(document).on("click", ".user-search-add", function (){
            var user_id = $(this).attr("data-user-id");
            var name = $(this).attr("data-user-name");
            $(this).parent().remove();
            appendUserList(user_id, name);

        })
        $(document).on("click", ".js-remove-btn", function (){
            $(this).parent().remove();
        })
    })
});
