// jquery UI - datapicker
// require('jquery-ui/ui/widgets/datepicker.js');

$('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
    $(this).toggleClass('active');
});
var array = ["2019-09-01","2019-09-02","2019-09-03"] // LIST OF UNAVAILABLE DATES
$( "#reschedule-datepicker" ).datepicker({
    beforeShowDay: function(date){
        var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
        return [ array.indexOf(string) == -1 ]
    },
    dateFormat: "yy-mm-dd",
    onSelect:function(date){

        $('#time').on('change',function(){

            $('#sched-time').val($(this).val());
        });
        $('#sched-date').val(date);

    }
});
$('.btn-rv, .btn-cv').click(function(e){
    var cd = $(this).siblings('.sched-id').val();
    $('.resched').attr('action',  '/schedule/update/' +cd);
    e.preventDefault();
});

$('#inputGroupFile02').on('change', function (e) {
    $('#file-upload').text(e.target.files[0].name);
});

$('#btn-upload').on('click', function (e) {
    if ($('#inputGroupFile02').val() != '') {
        return true;
    }
    else {
        alert("No File Chosen");
        return false;
    }
});

jQuery(document).ready(function($){

    if($('#fn-content').length > 0){
        CKEDITOR.replace( 'fn-content');
    }
    if($('#ckeditor-prop_desc').length > 0){
        CKEDITOR.replace( 'ckeditor-prop_desc' );
    }
    if($('#ckeditor-prop_feat').length > 0){
        CKEDITOR.replace( 'ckeditor-prop_feat');
    }
    if($('#ckeditor-bldg_det').length > 0){
        CKEDITOR.replace( 'ckeditor-bldg_det' );
    }
});

$('.rpma_agent').keyup(function () {
    $('.rpma_agent').val($(this).val());
});

$('.photo-text').hide();
$('.photo-url').click(function() {

    var copyText =  $('#photoURL' + this.id);
    $('#photoURL' + this.id).show();

    if ($(window).width() <= 500) {
        copyText.setSelectionRange(0, 99999);
    }
    else {
        copyText.select();
    }

    document.execCommand("copy");
    $('#photoURL' + this.id).hide();

});

function confirmDelete() {
    alert("as");
    return false;
}
