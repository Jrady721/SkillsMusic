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
                    { className: 'produ-cost' },
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
            this.setState({ data: data });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'changeCountData',
        value: function changeCountData(i) {
            console.log(this.state);
            var newData = this.state.data;
            newData[i].count = newData[i].count + 1;

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
                    'h1',
                    { className: 'empty', style: { display: 'none', textAlign: 'center', marginTop: '250px' } },
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
    return React.createElement(
        'button',
        { className: 'btn btn-sm btn-secondary ml-auto', 'data-toggle': 'modal', 'data-target': '#myModal' },
        React.createElement('i', { className: 'fa fa-shopping-cart' }),
        ' \uC7A5\uBC14\uAD6C\uB2C8 ',
        React.createElement(
            'strong',
            { className: 'cart-count' },
            comma(props.cnt)
        ),
        ' \uAC1C \uAE08\uC561 \uFFE6',
        React.createElement(
            'span',
            { className: 'cart-price' },
            comma(props.price)
        ),
        '\uC6D0'
    );
}

/* 카테고리 Context */
var CategoryContext = React.createContext('ALL');

/* APP */

var App = function (_React$Component2) {
    _inherits(App, _React$Component2);

    function App(props) {
        _classCallCheck(this, App);

        /* 나중에 context 완벽히 이해해서 사용하자.. */

        var _this3 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this3.state = {
            selCategory: 'ALL',
            cntCart: 0,
            priceCart: 0,
            searchKeyword: '',
            albums: [],
            cartAlbums: []
        };

        _this3.categoryUpdate = _this3.categoryUpdate.bind(_this3);
        _this3.cartUpdate = _this3.cartUpdate.bind(_this3);
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

            var newCartAlbums = this.state.cartAlbums;
            newCartAlbums.push(album);

            this.setState({
                cntCart: Number(this.state.cntCart) + 1,
                priceCart: Number(this.state.priceCart) + Number(album.price),
                cartAlbums: newCartAlbums
            });
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

            /* 보이는 앨범도 업데이트 하자.. */
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                CategoryContext.Provider,
                { value: this.state.selCategory },
                React.createElement(
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
                                        React.createElement(
                                            'tr',
                                            null,
                                            React.createElement(
                                                'td',
                                                { className: 'albuminfo' },
                                                React.createElement('img', { src: '/images/20162259.jpg', alt: 'img' }),
                                                React.createElement(
                                                    'div',
                                                    { className: 'info' },
                                                    React.createElement(
                                                        'h4',
                                                        null,
                                                        'Lovelyz 4th Mini AlbumLovelyz 4th Mini Album'
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
                                                            null,
                                                            '\uB7EC\uBE14\uB9AC\uC988(Lovelyz)'
                                                        )
                                                    ),
                                                    React.createElement(
                                                        'span',
                                                        null,
                                                        React.createElement(
                                                            'i',
                                                            { className: 'fa  fa-calendar' },
                                                            ' \uBC1C\uB9E4\uC77C'
                                                        ),
                                                        React.createElement(
                                                            'p',
                                                            null,
                                                            '2018.04.23'
                                                        )
                                                    )
                                                )
                                            ),
                                            React.createElement(
                                                'td',
                                                { className: 'albumprice' },
                                                '\uFFE6 20,000'
                                            ),
                                            React.createElement(
                                                'td',
                                                { className: 'albumqty' },
                                                React.createElement(
                                                    'label',
                                                    null,
                                                    React.createElement('input', { type: 'number', className: 'form-control', defaultValue: '1' })
                                                )
                                            ),
                                            React.createElement(
                                                'td',
                                                { className: 'pricesum' },
                                                '\uFFE6 20,000'
                                            ),
                                            React.createElement(
                                                'td',
                                                null,
                                                React.createElement(
                                                    'button',
                                                    { className: 'btn btn-sm btn-secondary' },
                                                    React.createElement('i', { className: 'fa fa-trash-o' }),
                                                    ' \uC0AD\uC81C'
                                                )
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'totalprice text-right' },
                                    React.createElement(
                                        'h6',
                                        null,
                                        '\uCD1D \uD569\uACC4\uAE08\uC561 : ',
                                        React.createElement(
                                            'span',
                                            null,
                                            '\uFFE620,000'
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
                                    { type: 'button', className: 'btn btn-sm btn-dark' },
                                    '\uACB0\uC81C\uD558\uAE30'
                                )
                            )
                        )
                    )
                ),
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
                            React.createElement(ShowCartButton, { cnt: this.state.cntCart, price: this.state.priceCart })
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
                                        React.createElement('input', { type: 'text', className: 'form-control', placeholder: '\uC568\uBC94\uAC80\uC0C9' }),
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
                                { className: 'col-10 pt-3' },
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
                                React.createElement(AlbumList, { onAddCart: this.cartUpdate })
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

    /* 메뉴 정리하기 */
    var items = '';

    /* json 데이터를 돌아가면서 보여주기 */
    data.filter(function (e, i) {
        data[i].count = 0;

        if ($.inArray(e.category, menuArr) === -1) {
            menuArr.push(e.category);
            activeArr.push('');
        }

        /* 장바구니에 존재하는 목록 이 부분도 React 로 처리하기 */
        items += '<tr data-idx="' + (i + 1) + '" style={{display: \'none\'}}>\n                    <td class="albuminfo">\n                        <img src="/images/' + e.albumJaketImage + '" alt="img">\n                        <div class="info">\n                            <h4>' + e.albumName + '</h4>\n                            <span>\n                                <i class="fa fa-microphone"> \uC544\uD2F0\uC2A4\uD2B8</i> \n                                <p>' + e.artist + '</p>\n                            </span>\n                            <span>\n                                <i class="fa  fa-calendar"> \uBC1C\uB9E4\uC77C</i> \n                                <p>' + e.release + '</p>\n                            </span>\n                        </div>\n                    </td>\n                    <td class="albumprice">\n                        \uFFE6 ' + num(e.price).toLocaleString() + '\n                    </td>\n                    <td class="albumqty">\n                        <input type="number" class="form-control" min="1" value="0" />\n                    </td>\n                    <td class="pricesum">\n                        \uFFE6 0\n                    </td>\n                    <td>\n                        <button class="btn btn-default">\n                            <i class="fa fa-trash-o"/> \uC0AD\uC81C\n                        </button>\n                    </td>\n                </tr>';
    });

    ReactDOM.render(e(App), document.querySelector('#app'));

    /* 아이템 목록 추가 */
    $('.modal tbody').html(items);
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