'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var data = [];

/* 장바구니 담기 버튼 */
function CartButton(props) {
    var addCount = function addCount() {
        props.onCountChange();
        console.log('버튼 클릭');
    };

    if (props.count) {
        return React.createElement(
            'button',
            { className: 'btn btn-default btn-xs btn-cart', onClick: addCount },
            props.count
        );
    } else {
        return React.createElement(
            'button',
            { className: 'btn btn-default btn-xs btn-cart', onClick: addCount },
            React.createElement('i', { className: 'fa fa-shopping-cart' })
        );
    }
}

/* 앨범 */
/**
 * @return {null}
 */
function Album(props) {
    var category = React.useContext(CategoryContext);

    var countChange = function countChange() {
        props.onUpdate(props.i);
    };

    if (category === props.e.category || category === 'ALL') {
        return React.createElement(
            'div',
            { className: 'col-2 product-grid album', 'data-category': props.e.category,
                'data-name': props.e.albumName, 'data-idx': props.i + 1 },
            React.createElement(
                'div',
                { className: 'product-items' },
                React.createElement(
                    'div',
                    { className: 'project-eff' },
                    React.createElement('img', { className: 'img-responsive', src: '/images/' + props.e.albumJaketImage,
                        alt: props.e.albumName })
                ),
                React.createElement(
                    'div',
                    { className: 'product-cost' },
                    React.createElement(
                        'h5',
                        null,
                        props.e.albumName
                    ),
                    React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'i',
                            { className: 'fa fa-microphone' },
                            ' \uC544\uD2F0\uC2A4\uD2B8'
                        ),
                        React.createElement(
                            'p',
                            { className: 'artist' },
                            props.e.artist
                        )
                    ),
                    React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'i',
                            { className: 'fa fa-calendar' },
                            ' \uBC1C\uB9E4\uC77C'
                        ),
                        React.createElement(
                            'p',
                            null,
                            props.e.release
                        )
                    ),
                    React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'i',
                            { className: 'fa fa-money' },
                            ' \uAC00\uACA9'
                        ),
                        React.createElement(
                            'p',
                            null,
                            '\uFFE6',
                            comma(props.e.price),
                            '\uC6D0'
                        )
                    ),
                    React.createElement(CartButton, { onCountChange: countChange, count: props.e.count })
                )
            )
        );
    } else {
        return null;
    }
}

/* 앨범 목록 */

var AlbumList = function (_React$Component) {
    _inherits(AlbumList, _React$Component);

    function AlbumList(props) {
        _classCallCheck(this, AlbumList);

        var _this = _possibleConstructorReturn(this, (AlbumList.__proto__ || Object.getPrototypeOf(AlbumList)).call(this, props));

        _this.state = {
            data: []
        };

        _this.changeCountData = _this.changeCountData.bind(_this);
        return _this;
    }

    _createClass(AlbumList, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.setState({ data: this.props.albums });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'changeCountData',
        value: function changeCountData(i) {
            var newData = this.state.data;
            newData[i].count = Number(newData[i].count) + 1;

            this.setState({ data: newData });

            this.props.onAddCart(newData[i]);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            console.log(this.state.data);

            /* 저거 할 때 중괄호 넣으면 안됀다... 중괄호 안넣어서 2시간 동안 고민함;;; */
            var list = this.state.data.map(function (e, i) {
                return React.createElement(Album, { onUpdate: _this2.changeCountData, key: i, e: e, i: i });
            });

            console.log(list);

            // 발매일 내림차순
            return React.createElement(
                'div',
                { className: 'albums row' },
                React.createElement(
                    'h5',
                    { className: 'empty col-12' },
                    '\uAC80\uC0C9\uB41C \uC568\uBC94\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.'
                ),
                list
            );
        }
    }]);

    return AlbumList;
}(React.Component);

/* 장바구니 모달 버튼 */


function ShowCartButton(props) {
    var count = 0;
    var price = 0;

    props.albums.filter(function (e, i) {
        count += Number(e.count);
        price += Number(e.count * e.price);
    });

    return React.createElement(
        'button',
        { className: 'btn btn-sm btn-secondary ml-auto', 'data-toggle': 'modal', 'data-target': '#myModal' },
        React.createElement('i', { className: 'fa fa-shopping-cart' }),
        ' \uC7A5\uBC14\uAD6C\uB2C8 ',
        React.createElement(
            'strong',
            { className: 'cart-count' },
            count
        ),
        ' \uAC1C \uAE08\uC561 \uFFE6',
        React.createElement(
            'span',
            { className: 'cart-price' },
            comma(price)
        ),
        '\uC6D0'
    );
}

function CartList(props) {
    console.log("LIST", props);

    var deleteCartItem = function deleteCartItem(i) {
        props.deleteCartItem(i);
    };

    var updateCartItem = function updateCartItem(i, val) {
        props.updateCartItem(i, val);
    };

    var list = props.albums.map(function (e, i) {
        return React.createElement(CartItem, { deleteCartItem: deleteCartItem, updateCartItem: updateCartItem, key: i, i: i, e: e });
    });
    return list;
}

/**
 * @return {null}
 */
function CartItem(props) {
    /* 카트 아이템 삭제 */
    var deleteCartItem = function deleteCartItem() {
        props.deleteCartItem(props.i);
    };

    /* 카트 수량 및 전체 그거 수정하기 */
    var updateCartItem = function updateCartItem(e) {
        var val = e.target.value;
        console.log(e.target.value);
        props.updateCartItem(props.i, val);
    };

    if (props.e.count) {
        return React.createElement(
            'tr',
            { 'data-idx': props.i + 1 },
            React.createElement(
                'td',
                { className: 'album-info' },
                React.createElement('img', { src: '/images/' + props.e.albumJaketImage, alt: 'img' }),
                React.createElement(
                    'div',
                    { className: 'info' },
                    React.createElement(
                        'h6',
                        { className: 'text-truncate' },
                        props.e.albumName
                    ),
                    React.createElement(
                        'div',
                        { className: 'd-flex mb-1' },
                        React.createElement('i', { className: 'fa fa-microphone' }),
                        '\xA0\uC544\uD2F0\uC2A4\uD2B8\xA0',
                        React.createElement(
                            'p',
                            { className: 'mb-0' },
                            props.e.artist
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'd-flex' },
                        React.createElement('i', { className: 'fa fa-calendar' }),
                        '\xA0\uBC1C\uB9E4\uC77C\xA0',
                        React.createElement(
                            'p',
                            { className: 'mb-0' },
                            props.e.release
                        )
                    )
                )
            ),
            React.createElement(
                'td',
                { className: 'albumprice' },
                '\uFFE6 ',
                comma(props.e.price)
            ),
            React.createElement(
                'td',
                { className: 'album-qty' },
                React.createElement('input', { type: 'number', className: 'form-control', min: 1, defaultValue: props.e.count,
                    value: props.e.count,
                    onChange: updateCartItem })
            ),
            React.createElement(
                'td',
                { className: 'price-sum' },
                '\uFFE6 ',
                props.e.count * props.e.price
            ),
            React.createElement(
                'td',
                null,
                React.createElement(
                    'button',
                    { className: 'btn btn-sm btn-danger', onClick: deleteCartItem },
                    React.createElement('i', { className: 'fa fa-trash-o' }),
                    ' \uC0AD\uC81C'
                )
            )
        );
    } else {
        return null;
    }
}

function CartModal(props) {
    var totalPrice = 0;

    props.albums.filter(function (e, i) {
        totalPrice += e.price * e.count;
    });

    /* 카트 아이템 삭제 */
    var deleteCartItem = function deleteCartItem(i) {
        props.deleteCartItem(i);
    };

    /* 카트 수량 및 전체 그거 수정하기 */
    var updateCartItem = function updateCartItem(i, val) {
        props.updateCartItem(i, val);
    };

    var paymentCart = function paymentCart() {
        props.paymentCart();
    };

    return React.createElement(
        'div',
        { className: 'modal fade', id: 'myModal', tabIndex: '-1', role: 'dialog', 'aria-labelledby': 'myModalLabel',
            'aria-hidden': 'true' },
        React.createElement(
            'div',
            { className: 'modal-dialog' },
            React.createElement(
                'div',
                { className: 'modal-content' },
                React.createElement(
                    'div',
                    { className: 'modal-header' },
                    React.createElement(
                        'h5',
                        { className: 'modal-title', id: 'myModalLabel' },
                        '\uC7A5\uBC14\uAD6C\uB2C8'
                    ),
                    React.createElement(
                        'button',
                        { type: 'button', className: 'close', 'data-dismiss': 'modal',
                            'aria-hidden': 'true' },
                        '\xD7'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'modal-body' },
                    React.createElement(
                        'table',
                        { className: 'table table-bordered' },
                        React.createElement(
                            'thead',
                            { className: 'thead-dark' },
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'th',
                                    null,
                                    '\uC568\uBC94\uC815\uBCF4'
                                ),
                                React.createElement(
                                    'th',
                                    null,
                                    '\uAC00\uACA9'
                                ),
                                React.createElement(
                                    'th',
                                    null,
                                    '\uC218\uB7C9'
                                ),
                                React.createElement(
                                    'th',
                                    null,
                                    '\uD569\uACC4'
                                ),
                                React.createElement(
                                    'th',
                                    null,
                                    '\uC0AD\uC81C'
                                )
                            )
                        ),
                        React.createElement(
                            'tbody',
                            null,
                            React.createElement(CartList, { deleteCartItem: deleteCartItem, updateCartItem: updateCartItem,
                                albums: props.albums })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'total-price text-right' },
                        React.createElement(
                            'h6',
                            null,
                            '\uCD1D \uD569\uACC4\uAE08\uC561 : \uFFE6',
                            React.createElement(
                                'span',
                                null,
                                comma(totalPrice)
                            ),
                            ' \uC6D0'
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'modal-footer' },
                    React.createElement(
                        'button',
                        { type: 'button', className: 'btn btn-sm btn-secondary', 'data-dismiss': 'modal' },
                        '\uB2EB\uAE30'
                    ),
                    React.createElement(
                        'button',
                        { type: 'button', className: 'btn btn-sm btn-dark', onClick: paymentCart },
                        '\uACB0\uC81C\uD558\uAE30'
                    )
                )
            )
        )
    );
}

/* TODO 화면이 업데이트 할 때마다 localStorage 든지 뭐든지 저장하자. 화면이 유지되게, 그리고 다시 접속했을떄 정보가 있으면 그 정보 보여주는 형식으로 처리. */

/* 카테고리 Context */
/* 나중에 context 완벽히 이해해서 사용하자.. */
var CategoryContext = React.createContext('ALL');

/* APP */

var App = function (_React$Component2) {
    _inherits(App, _React$Component2);

    function App(props) {
        _classCallCheck(this, App);

        var _this3 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this3.state = {
            selCategory: 'ALL',
            searchKeyword: '',
            albums: []
        };

        _this3.categoryUpdate = _this3.categoryUpdate.bind(_this3);
        _this3.cartUpdate = _this3.cartUpdate.bind(_this3);

        _this3.deleteCartItem = _this3.deleteCartItem.bind(_this3);
        _this3.updateCartItem = _this3.updateCartItem.bind(_this3);
        _this3.paymentCart = _this3.paymentCart.bind(_this3);

        _this3.sarchAlbum = _this3.sarchAlbum.bind(_this3);
        return _this3;
    }

    _createClass(App, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.setState({ albums: data });
        }
    }, {
        key: 'cartUpdate',
        value: function cartUpdate(album) {
            console.log('cart update');

            var newAlbums = this.state.albums;

            var chkNewItem = true;
            newAlbums.filter(function (e, i) {
                if (e.albumName === album.albumName) {
                    chkNewItem = false;
                    return false;
                }
            });

            this.setState({
                albums: newAlbums
            });
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps, nextState) {}

        /* 컴포넌트 수정되었을 때... 검색관련 처리하기 */
        /* TODO 사실상 jQuery를 이용해서 개발한 것... React 로 완전히 수정하자 */

    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            var keyword = this.state.searchKeyword;

            var view = '[data-category="' + this.state.selCategory + '"]';
            if (this.state.selCategory === 'ALL') view = '';

            $('.album').hide();

            // 하이라이트 제거
            $('mark').filter(function (i, e) {
                var text = $(e).parent().text();
                $(e).parent().text(text);
            });

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
        }

        /* 카테고리 업데이트를 한다. */

    }, {
        key: 'categoryUpdate',
        value: function categoryUpdate(category) {
            // console.log("CATEGORY", category);

            /* 새롭게 카테고리에 맞는 앨범을 업데이트 해준다. */
            var newAlbums = this.state.albums;

            this.setState({
                selCategory: category,
                albums: newAlbums
            });

            /* 보이는 앨범도 업데이트 하자.. (이미 검색 기록이 있을 경우) */
        }
    }, {
        key: 'deleteCartItem',
        value: function deleteCartItem(i) {
            console.log(i);
            var newAlbums = this.state.albums;

            newAlbums[i].count = 0;

            this.setState({
                albums: newAlbums
            });
        }
    }, {
        key: 'updateCartItem',
        value: function updateCartItem(i, val) {
            var newAlbums = this.state.albums;
            newAlbums[i].count = val;

            this.setState({
                albums: newAlbums
            });
        }
    }, {
        key: 'paymentCart',
        value: function paymentCart() {
            var newAlbums = this.state.albums;

            newAlbums.filter(function (e, i) {
                newAlbums[i].count = 0;
            });

            this.setState({
                albums: newAlbums
            });

            alert('결제가 완료되었습니다.');
            /* 결제 완료 후 모달을 닫을까?? 고민중.. */
        }

        /* 검색 기능 구현 */

    }, {
        key: 'sarchAlbum',
        value: function sarchAlbum(e) {
            this.setState({
                searchKeyword: e.target.value
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                CategoryContext.Provider,
                { value: this.state.selCategory },
                React.createElement(CartModal, { paymentCart: this.paymentCart, deleteCartItem: this.deleteCartItem,
                    updateCartItem: this.updateCartItem,
                    albums: this.state.albums }),
                React.createElement(
                    'header',
                    null,
                    React.createElement(
                        'nav',
                        { className: 'navbar navbar-dark bg-dark navbar-expand', role: 'navigation' },
                        React.createElement(
                            'div',
                            { className: 'container-fluid' },
                            React.createElement(
                                'a',
                                { className: 'navbar-brand', href: '/' },
                                'SKILLS MUSIC'
                            ),
                            React.createElement(ShowCartButton, { albums: this.state.albums })
                        )
                    )
                ),
                React.createElement(
                    'main',
                    null,
                    React.createElement(
                        'div',
                        { className: 'container-fluid' },
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-2 bg-secondary pt-3 left-side' },
                                React.createElement(
                                    'div',
                                    { className: 'search' },
                                    React.createElement(
                                        'div',
                                        { className: 'form-group input-group' },
                                        React.createElement('input', { onInput: this.sarchAlbum, type: 'text', className: 'form-control',
                                            placeholder: '\uC568\uBC94\uAC80\uC0C9' }),
                                        React.createElement(
                                            'div',
                                            { className: 'input-group-append' },
                                            React.createElement(
                                                'div',
                                                { className: 'input-group-text' },
                                                React.createElement(
                                                    'button',
                                                    { className: 'btn btn-default', type: 'button' },
                                                    React.createElement('i', {
                                                        className: 'fa fa-search' })
                                                )
                                            )
                                        )
                                    )
                                ),
                                React.createElement(CategoryList, { changeCategory: this.categoryUpdate })
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-10 right-side pt-3' },
                                React.createElement(
                                    'div',
                                    { className: 'row' },
                                    React.createElement(
                                        'div',
                                        { className: 'col-12' },
                                        React.createElement(
                                            'h2',
                                            { className: 'title-category' },
                                            this.state.selCategory
                                        )
                                    )
                                ),
                                React.createElement('hr', null),
                                React.createElement(AlbumList, { albums: this.state.albums, onAddCart: this.cartUpdate })
                            )
                        )
                    )
                ),
                React.createElement('footer', null)
            );
        }
    }]);

    return App;
}(React.Component);

/* 메뉴 목록 */


function Category(props) {
    var activeMenu = function activeMenu() {
        props.onActive(props.i, props.category);
    };

    if (props.i === 0) {
        return React.createElement(
            'li',
            { className: 'list-group-item ' + props.active, onClick: activeMenu },
            React.createElement('i', { className: 'fa fa-th-list' }),
            ' ',
            React.createElement(
                'span',
                null,
                props.category
            )
        );
    } else {
        return React.createElement(
            'li',
            { className: 'list-group-item ' + props.active, onClick: activeMenu },
            React.createElement('i', { className: 'fas fa-play-circle' }),
            ' ',
            React.createElement(
                'span',
                null,
                props.category
            )
        );
    }
}

var menuArr = ['ALL', '발라드'];
var activeArr = ['active-menu', ''];

/* TODO 카테고리 리스트를 만들때 앞의 아이콘을 ALL 이랑 기본에 차이를 두고 싶다.. props으로 장난질 쳐야하는 것인가? */

var CategoryList = function (_React$Component3) {
    _inherits(CategoryList, _React$Component3);

    function CategoryList(props) {
        _classCallCheck(this, CategoryList);

        var _this4 = _possibleConstructorReturn(this, (CategoryList.__proto__ || Object.getPrototypeOf(CategoryList)).call(this, props));

        _this4.state = {
            activeArr: []
        };

        _this4.toggleActive = _this4.toggleActive.bind(_this4);
        return _this4;
    }

    _createClass(CategoryList, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.setState({ activeArr: activeArr });
        }

        /* 메뉴 액티브 관련 */

    }, {
        key: 'toggleActive',
        value: function toggleActive(i, category) {
            var newActiveArr = this.state.activeArr;

            newActiveArr.filter(function (e, i) {
                newActiveArr[i] = '';
            });

            newActiveArr[i] = newActiveArr[i] === 'active-menu' ? '' : 'active-menu';

            this.setState({
                activeArr: newActiveArr
            });

            this.props.changeCategory(category);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            var categories = menuArr.map(function (menu, index) {
                return React.createElement(Category, { key: index, onActive: _this5.toggleActive,
                    active: activeArr[index], i: index,
                    category: menu });
            });

            return React.createElement(
                'ul',
                { className: 'list-group list-group-flush', id: 'main-menu' },
                categories
            );
        }
    }]);

    return CategoryList;
}(React.Component);

/* 비동기적으로 데이터 처리 (앱이 시작하는 부분) */


fetch('/music_data.json').then(function (res) {
    return res.json();
}).then(function (json) {
    json.data.sort(function (a, b) {
        return a.release > b.release ? -1 : 1;
    });

    data = json.data;

    /* json 데이터를 돌아가면서 보여주기 */
    data.filter(function (e, i) {
        data[i].count = 0;

        if ($.inArray(e.category, menuArr) === -1) {
            menuArr.push(e.category);
            activeArr.push('');
        }
    });

    ReactDOM.render(e(App), document.querySelector('#app'));
});

/* 콤마 찍기. */
var comma = function comma(str) {
    // console.log(str)

    /* 문자열로 변경 */
    str = str + "";

    // 7
    var start = str.length % 3;
    var len = str.length;
    // console.log(len, start);

    /* substr 을 하면 안된다.. 이유는 알아서 찾아봐; */
    var newStr = str.substring(0, start);

    while (start < len) {
        if (newStr !== "") newStr += ",";
        newStr += str.substring(start, start + 3);
        start += 3;
    }

    return newStr;
};