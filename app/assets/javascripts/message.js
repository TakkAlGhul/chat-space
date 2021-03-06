$(function() {
    function buildHTML(message) { 
        var imgHTML = (message.image == null)
                        ?("")
                        :(`<img class="message__text__image" src="${ message.image }">`);
        
        var html = `<div class="message">
                        <div class="upper-info">
                            <div class= "upper-info__user">${ message.user_name }</div>
                            <div class= "upper-info__date">${ message.created_at }</div>
                        </div>
                        <div class="message__text">
                            <div class="message__test__body">${ message.body }</div>
                            ${ imgHTML }
                        </div>
                    </div>`
        return html;
    }
    $('#new_message').on('submit', function(e) {
        e.preventDefault();
        var formData = new FormData(this);
        var url = $(this).attr('action')
     
        $.ajax({
            type: 'POST',
            url: url,
            data: formData,
            dataType: 'json',
            processData: false,
            contentType: false
        })
        .done(function(data) {

            var html = buildHTML(data);
            $('.messages').append(html);
            $('#new_message')[0].reset();
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
        })
        .fail(function(){
            alert('error');   
        })
        .always(function() {
            $('.form__submit').prop('disabled', false);
        })
    });

    $(function(){
        $(function() {
            if(location.href.match(/\/groups\/\d+\/messages/)){
            setInterval(reloadMessages, 5000);    
            }
        });

    
        function reloadMessages() {
            last_message_id = $('.message').last().attr('data-id');
            var group_id = $('.messages').attr('data-id');
                
        $.ajax({
            url: '/groups/' + group_id + '/api/messages',
            type: "GET",
            data: { id: last_message_id },
            dataType: "json",
            processData: false,
            contentType: false
        }) 
    
        .done(function(messages){
            messages.forEach(function(message) {
                var html = buildHTML(message);
                $('.messages').append(html);
                $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});   
            })
        
        })
        .fail(function(){
           alert('error');
        })
    }
    })      
});
