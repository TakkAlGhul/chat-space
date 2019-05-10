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
    var html = `<div class= "chat-group-user__name">${ msg }</div>`
    userList.append(html);
}
function appendUserList(user_id, name) {
    var html = `<div class="chat-group-user clearfix js-chat-member" id="chat-group-user-8">
                <input name="group[user_ids][]" type="hidden" value=${ user_id }>
                <p class="chat-group-user__name">${ name }</p>
                <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</div>
                </div>`
    memberList.append(html);
}

    $('#user-search-field').on("keyup", function() {
        var input = $('#user-search-field').val();
        
        $.ajax({
            type: 'GET',
            url:  '/users',
            data: { keyword: input },
            dataType: 'json'
        })
        
        .done(function(users) {
            $('#user-search-result').empty();
            if(users.length !== null) {
                 users.forEach(function(user) {
                    appendUser(user);                
            })
            $('.chat-group-user').on("click", ".user-search-add", function (){
                var user_id = $(this).attr("data-user-id");
                var name = $(this).attr("data-user-name");
                $(this).parent().remove();
                appendUserList(user_id, name);
            })
            $(document).on("click", ".user-search-remove", function (){
                $(this).parent().remove();
            })
            }else{
                appendErrMsgToHTML("一致するユーザーがいない");
            } 
        })
        .fail(function(){
            alert('error')        
        })
    });
    
});
