$(function () {
    init()
})

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
    eventOn()
}

// 이벤트
function eventOn() {
    // 검색
    $(document).on('click', '.search button', function () {
        let search = $('.search input');
        search.attr('value', search.val())
        updateList()
    })
    $(document).on('keyup', '.search input', function () {
        if (event.key === 'Enter') {
            $(this).attr('value', $(this).val())
            updateList()
        }
    })
}

function updateCart() {
    let total = 0
    let price = 0

    $('.album button').filter(function (i, e) {
        let count = parseInt($(this).attr('data-count'))

        // 갯수가 없을 때!
        if (!count) {
            $(this).html(`<i class="fa fa-shopping-cart"></i> 쇼핑카트담기`)
            return false
        } else {
            let idx = $(this).parents('.album').attr('data-idx')

            let item = $(`tr[data-idx="${idx}"]`).show()

            $(this).html(`<i class="fa fa-shopping-cart"></i> 추가하기 (${count}개)`)

            let pricesum = num(item.find('.albumprice').text()) * count

            item.find('.albumqty input').val(count).attr('value', count).end().find('.pricesum').text(`￦ ${pricesum.toLocaleString()}`)

            price += pricesum
            total += count
        }
    })

    $('.total-price span').text(`￦ ${price.toLocaleString()}`)
    $('.btn-lg').html(`<i class="fa fa-shopping-cart"></i> 쇼핑카트 <strong>${total}</strong> 개 금액 ￦ ${price.toLocaleString()}원`)

    save()
}

function updateList() {
    let keyword = $('.search input').attr('value')
    let category = $('.active-menu span').text()

    // 타이틀 설정
    $('h2').text(category)

    let view = `[data-category="${category}"]`
    if (category === 'ALL') view = ''

    // 하이라이트 제거
    $('mark').filter(function (i, e) {
        let text = $(e).parent().text()
        $(e).parent().text(text)
    })

    $('.album').hide()

    console.log(keyword, view)

    if (keyword) {
        let reg = new RegExp(keyword, 'g')

        $(`.album${view}`).filter(function (i, e) {
            let name = $(e).find(`h5:contains(${keyword})`).text()
            let artist = $(e).find(`.artist:contains(${keyword})`).text()

            if (name || artist) {
                $(e).show()

                if (name) {
                    name = name.replace(reg, `<mark>${keyword}</mark>`)
                    $(e).find('h5').html(name)
                }

                if (artist) {
                    artist = artist.replace(reg, `<mark>${keyword}</mark>`)
                    $(e).find('.artist').html(artist)
                }
            }
        })
    } else {
        $(`.album${view}`).show()
    }

    // 검색 앨범이 없을 시
    $('.album:visible').length ? $('.empty').hide() : $('.empty').show()

    save()
}

function save() {
    localStorage['page'] = $('#wrapper').html()
}
