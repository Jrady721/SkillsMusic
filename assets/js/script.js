$(function () {
    init();
});

// 초기화
function init() {
    // if (localStorage['page'] === undefined) {
    //     $.getJSON('/music_data.json', function (res) {
    //         res.data.sort(function (a, b) {
    //             return a.release > b.release ? -1 : 1;
    //         })
    //
    //         createList(res.data)
    //         $('.btn-lg').html(`<i class="fa fa-shopping-cart"></i> 쇼핑카트 <strong>0</strong> 개 금액 ￦ 0원`)
    //     })
    // } else {
    //     $('#wrapper').html(localStorage['page'])
    // }

    // $('#myModal').hide();

    /* 이벤트 붙이기 */
    eventOn();
}

// 이벤트
function eventOn() {
    // 검색
    $(document).on('click', '.search button', function () {
        var search = $('.search input');
        search.attr('value', search.val());
        updateList();
    });
    $(document).on('keyup', '.search input', function () {
        if (event.key === 'Enter') {
            $(this).attr('value', $(this).val());
            updateList();
        }
    });
}

function updateCart() {
    var total = 0;
    var price = 0;

    $('.album button').filter(function (i, e) {
        var count = parseInt($(this).attr('data-count'));

        // 갯수가 없을 때!
        if (!count) {
            $(this).html('<i class="fa fa-shopping-cart"></i> \uC1FC\uD551\uCE74\uD2B8\uB2F4\uAE30');
            return false;
        } else {
            var idx = $(this).parents('.album').attr('data-idx');

            var item = $('tr[data-idx="' + idx + '"]').show();

            $(this).html('<i class="fa fa-shopping-cart"></i> \uCD94\uAC00\uD558\uAE30 (' + count + '\uAC1C)');

            var pricesum = num(item.find('.albumprice').text()) * count;

            item.find('.albumqty input').val(count).attr('value', count).end().find('.pricesum').text('\uFFE6 ' + pricesum.toLocaleString());

            price += pricesum;
            total += count;
        }
    });

    $('.total-price span').text('\uFFE6 ' + price.toLocaleString());
    $('.btn-lg').html('<i class="fa fa-shopping-cart"></i> \uC1FC\uD551\uCE74\uD2B8 <strong>' + total + '</strong> \uAC1C \uAE08\uC561 \uFFE6 ' + price.toLocaleString() + '\uC6D0');

    save();
}

function updateList() {
    var keyword = $('.search input').attr('value');
    var category = $('.active-menu span').text();

    // 타이틀 설정
    $('h2').text(category);

    var view = '[data-category="' + category + '"]';
    if (category === 'ALL') view = '';

    // 하이라이트 제거
    $('mark').filter(function (i, e) {
        var text = $(e).parent().text();
        $(e).parent().text(text);
    });

    $('.album').hide();

    console.log(keyword, view);

    if (keyword) {
        var reg = new RegExp(keyword, 'g');

        $('.album' + view).filter(function (i, e) {
            var name = $(e).find('h5:contains(' + keyword + ')').text();
            var artist = $(e).find('.artist:contains(' + keyword + ')').text();

            if (name || artist) {
                $(e).show();

                if (name) {
                    name = name.replace(reg, '<mark>' + keyword + '</mark>');
                    $(e).find('h5').html(name);
                }

                if (artist) {
                    artist = artist.replace(reg, '<mark>' + keyword + '</mark>');
                    $(e).find('.artist').html(artist);
                }
            }
        });
    } else {
        $('.album' + view).show();
    }

    // 검색 앨범이 없을 시
    $('.album:visible').length ? $('.empty').hide() : $('.empty').show();

    save();
}

function save() {
    localStorage['page'] = $('#wrapper').html();
}