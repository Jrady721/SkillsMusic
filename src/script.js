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

    $('#myModal').hide();

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

    // 카테고리 메뉴
    $(document).on('click', '.nav a', function () {
        $('.active-menu').removeClass('active-menu')
        $(this).addClass('active-menu')

        updateList()
    })

    // 쇼핑카트 담기
    $(document).on('click', '.shopbtn button', function () {
        let count = parseInt($(this).attr('data-count'))
        $(this).attr('data-count', count + 1)
        updateCart(count)
    })

    // 수량 변경
    $(document).on('input', '.albumqty input', function () {
        var count = parseInt($(this).val());
        let idx = $(this).parents('tr').attr('data-idx')
        if (!count) {

            count = 1
            $(this).val(1)
        }

        $(this).attr('value', count)
        $(`.album[data-idx="${idx}"] button`).attr('data-count', count)
        updateCart()
    })


    // 아이템 삭제
    $(document).on('click', 'table button', function () {
        if (confirm('정말 삭제하시겠습니까?')) {
            let item = $(this).parents('tr').hide()
            let idx = item.attr('data-idx')
            $(`.album[data-idx="${idx}"] button`).attr('data-count', 0)

            updateCart()
        }
    })

    // 쇼핑카트 결제
    $(document).on('click', '.modal-footer button:last', function () {
        $('.album button').attr('data-count', 0)
        $('.modal tbody tr').hide()

        updateCart()
        alert('결제가 완료되었습니다.')
        $('.modal .close').click()
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

    $('.totalprice span').text(`￦ ${price.toLocaleString()}`)
    $('.btn-lg').html(`<i class="fa fa-shopping-cart"></i> 쇼핑카트 <strong>${total}</strong> 개 금액 ￦ ${price.toLocaleString()}원`)

    save()
}

function num(val) {
    return parseInt(val.replace(/[^0-9]/g, ''))
}

// function createList(list) {
//     let menuArr = ['발라드']
//     let menus = ''
//
//     // $('h2').text('ALL')
//
//     let albums = `<h1 class="empty" style="display: none; text-align: center; margin-top: 250px; ">검색된 앨범이 없습니다.</h1>`
//     let items = ''
//
//     list.filter(function (e, i) {
//         /* 만약 요소의 카테고리가 (카테고리 배열)에 존재하지 않으면 추가후 메뉴 추가 */
//         if ($.inArray(e.category, menuArr) === -1) {
//             menuArr.push(e.category)
//             menus += ` <li>
//                         <a href="#"><i class="fa fa-youtube-play fa-2x"></i> <span>${e.category}</span></a>
//                     </li>       `
//         }
//
//         albums += `<div class="col-md-2 col-sm-2 col-xs-2 product-grid album" data-category="${e.category}" data-name="${e.albumName}" data-idx="${i + 1}">
//                             <div class="product-items">
//                                     <div class="project-eff">
//                                         <img class="img-responsive" src="/images/${e.albumJaketImage}" alt="${e.albumName}">
//                                     </div>
//                                 <div class="produ-cost">
//                                     <h5>${e.albumName}</h5>
//                                     <span>
//                                         <i class="fa fa-microphone"> 아티스트</i>
//                                         <p class="artist">${e.artist}</p>
//                                     </span>
//                                     <span>
//                                         <i class="fa  fa-calendar"> 발매일</i>
//
//                                         <p>${e.release}</p>
//                                     </span>
//                                     <span>
//                                         <i class="fa fa-money"> 가격</i>
//                                         <p>￦${e.price.toLocaleString()}</p>
//                                     </span>
//                                     <span class="shopbtn">
//                                         <button class="btn btn-default btn-xs" data-count="0">
//                                             <i class="fa fa-shopping-cart"></i> 쇼핑카트담기
//                                         </button>
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>`
//
//         items += `<tr data-idx="${i + 1}" style="display: none;">
//                                             <td class="albuminfo">
//                                                 <img src="/images/${e.albumJaketImage}">
//                                                 <div class="info">
//                                                     <h4>${e.albumName}</h4>
//                                                     <span>
//                                                         <i class="fa fa-microphone"> 아티스트</i>
//                                                         <p>${e.artist}</p>
//                                                     </span>
//                                                     <span>
//                                                         <i class="fa  fa-calendar"> 발매일</i>
//                                                         <p>${e.release}</p>
//                                                     </span>
//                                                 </div>
//                                             </td>
//                                             <td class="albumprice">
//                                                 ￦ ${num(e.price).toLocaleString()}
//                                             </td>
//                                             <td class="albumqty">
//                                                 <input type="number" class="form-control" min="1" value="0">
//                                             </td>
//                                             <td class="pricesum">
//                                                 ￦ 0
//                                             </td>
//                                             <td>
//                                                 <button class="btn btn-default">
//                                                     <i class="fa fa-trash-o"></i> 삭제
//                                                 </button>
//                                             </td>
//                                         </tr>`
//
//     })
//     $('.nav').append(menus)
//     $('.contents').html(albums)
//     $('.modal tbody').html(items)
// }

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

