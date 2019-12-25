'use strict';
const e = React.createElement;

let data = []

/* 장바구니 담기 버튼 */
function CartButton(props) {
    const addCount = () => {
        props.onCountChange()
        console.log('버튼 클릭')
    }

    if (props.count) {
        return (
            <button className="btn btn-default btn-xs btn-cart" onClick={addCount}>
                {props.count}
            </button>
        )
    } else {
        return (
            <button className="btn btn-default btn-xs btn-cart" onClick={addCount}>
                <i className="fa fa-shopping-cart"/>
            </button>
        )
    }
}

/* 앨범 */
/**
 * @return {null}
 */
function Album(props) {
    const category = React.useContext(CategoryContext)

    const countChange = () => {
        props.onUpdate(props.i)
    }

    if (category === props.e.category || category === 'ALL') {
        return (
            <div className="col-2 product-grid album" data-category={props.e.category}
                 data-name={props.e.albumName} data-idx={props.i + 1}>
                <div className="product-items">
                    <div className="project-eff">
                        <img className="img-responsive" src={'/images/' + props.e.albumJaketImage}
                             alt={props.e.albumName}/>
                    </div>
                    <div className="produ-cost">
                        <h5>{props.e.albumName}</h5>
                        <span>
                        <i className="fa fa-microphone"> 아티스트</i>
                        <p className="artist">{props.e.artist}</p>
                    </span>
                        <span>
                        <i className="fa fa-calendar"> 발매일</i>
                        <p>{props.e.release}</p>
                    </span>
                        <span>
                        <i className="fa fa-money"> 가격</i>
                        <p>￦{comma(props.e.price)}원</p>
                    </span>
                        <CartButton onCountChange={countChange} count={props.e.count}/>
                    </div>
                </div>
            </div>
        )
    } else {
        return null
    }
}

/* 앨범 목록 */
class AlbumList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }

        this.changeCountData = this.changeCountData.bind(this)
    }

    componentWillMount() {
        this.setState({data: data})
    }

    componentDidMount() {

    }

    changeCountData(i) {
        console.log(this.state)
        let newData = this.state.data
        newData[i].count = newData[i].count + 1

        this.setState({data: newData})

        this.props.onAddCart(newData[i])
    }

    render() {
        console.log(this.state.data)

        /* 저거 할 때 중괄호 넣으면 안됀다... 중괄호 안넣어서 2시간 동안 고민함;;; */
        const list = this.state.data.map((e, i) => <Album onUpdate={this.changeCountData} key={i} e={e} i={i}/>)

        console.log(list)

        // 발매일 내림차순
        return (
            <div className="albums row">
                {/*내용이 비어있을 경우*/}
                <h1 className="empty" style={{display: 'none', textAlign: 'center', marginTop: '250px'}}>
                    검색된 앨범이 없습니다.
                </h1>
                {list}
            </div>
        )
    }
}

/* 장바구니 모달 버튼 */
function ShowCartButton(props) {
    return (
        <button className="btn btn-sm btn-secondary ml-auto" data-toggle="modal" data-target="#myModal">
            <i className="fa fa-shopping-cart"/> 장바구니 <strong className="cart-count">{comma(props.cnt)}</strong> 개 금액
            ￦<span className="cart-price">{comma(props.price)}</span>원
        </button>
    )
}

/* 카테고리 Context */
const CategoryContext = React.createContext('ALL')

/* APP */
class App extends React.Component {

    constructor(props) {
        super(props);

        /* 나중에 context 완벽히 이해해서 사용하자.. */

        this.state = {
            selCategory: 'ALL',
            cntCart: 0,
            priceCart: 0,
            searchKeyword: '',
            albums: [],
            cartAlbums: []
        }

        this.categoryUpdate = this.categoryUpdate.bind(this)
        this.cartUpdate = this.cartUpdate.bind(this)
    }

    componentWillMount() {
        this.setState({albums: data})
    }

    cartUpdate(album) {
        console.log('cart update')

        let newCartAlbums = this.state.cartAlbums
        newCartAlbums.push(album)

        this.setState({
            cntCart: Number(this.state.cntCart) + 1,
            priceCart: Number(this.state.priceCart) + Number(album.price),
            cartAlbums: newCartAlbums
        })
    }

    /* 카테고리 업데이트를 한다. */
    categoryUpdate(category) {
        // console.log("CATEGORY", category);

        /* 새롭게 카테고리에 맞는 앨범을 업데이트 해준다. */
        let newAlbums = this.state.albums

        this.setState({
            selCategory: category,
            albums: newAlbums
        })

        /* 보이는 앨범도 업데이트 하자.. */
    }

    render() {
        return (
            <CategoryContext.Provider value={this.state.selCategory}>
                {/*modal*/}
                <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="myModalLabel">장바구니</h5>
                                <button type="button" className="close" data-dismiss="modal"
                                        aria-hidden="true">&times;</button>
                            </div>
                            <div className="modal-body">
                                <table className="table table-bordered">
                                    <thead className="thead-dark">
                                    <tr>
                                        <th>앨범정보</th>
                                        <th>가격</th>
                                        <th>수량</th>
                                        <th>합계</th>
                                        <th>삭제</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className="albuminfo">
                                            <img src="/images/20162259.jpg" alt="img"/>
                                            <div className="info">
                                                <h4>Lovelyz 4th Mini AlbumLovelyz 4th Mini Album</h4>
                                                <span>
                                                        <i className="fa fa-microphone"> 아티스트</i>
                                                        <p>러블리즈(Lovelyz)</p>
                                                    </span>
                                                <span>
                                                        <i className="fa  fa-calendar"> 발매일</i>
                                                        <p>2018.04.23</p>
                                                    </span>
                                            </div>
                                        </td>
                                        <td className="albumprice">￦ 20,000</td>
                                        <td className="albumqty">
                                            <label>
                                                <input type="number" className="form-control" defaultValue="1"/>
                                            </label>
                                        </td>
                                        <td className="pricesum">￦ 20,000</td>
                                        <td>
                                            <button className="btn btn-sm btn-secondary">
                                                <i className="fa fa-trash-o"/> 삭제
                                            </button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div className="totalprice text-right">
                                    <h6>총 합계금액 : <span>￦20,000</span> 원</h6>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-sm btn-secondary" data-dismiss="modal">닫기
                                </button>
                                <button type="button" className="btn btn-sm btn-dark">결제하기</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* header */}
                <header>
                    <nav className="navbar navbar-dark bg-dark navbar-expand" role="navigation">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="/">SKILLS MUSIC</a>
                            <ShowCartButton cnt={this.state.cntCart} price={this.state.priceCart}/>
                        </div>
                    </nav>
                </header>

                {/*main*/}
                <main>
                    {/*REACT APP*/}
                    <div className='container-fluid'>
                        <div className="row">
                            {/*left-side*/}
                            <div className="col-2 bg-secondary pt-3 left-side">
                                {/*검색*/}
                                <div className="search">
                                    <div className="form-group input-group">
                                        <input type="text" className="form-control" placeholder="앨범검색"/>
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <button className="btn btn-default" type="button"><i
                                                    className="fa fa-search"/></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/*카테고리 목록 */}
                                <CategoryList changeCategory={this.categoryUpdate}/>
                            </div>
                            {/*right side*/}
                            <div className="col-10 pt-3">
                                {/*right-side__header*/}
                                <div className="row">
                                    <div className="col-12">
                                        <h2 className="title-category">{this.state.selCategory}</h2>
                                    </div>
                                </div>

                                <hr/>

                                {/*앨범목록*/}
                                <AlbumList onAddCart={this.cartUpdate}/>
                            </div>
                        </div>
                    </div>
                </main>

                {/*footer*/}
                <footer/>
            </CategoryContext.Provider>
        )
    }
}

/* 메뉴 목록 */
function Category(props) {
    const activeMenu = () => {
        props.onActive(props.i, props.category)
    }

    if (props.i === 0) {
        return (
            <li className={'list-group-item ' + props.active} onClick={activeMenu}>
                <i className="fa fa-th-list"/> <span>{props.category}</span>
            </li>
        )
    } else {
        return (
            <li className={'list-group-item ' + props.active} onClick={activeMenu}>
                <i className="fas fa-play-circle"/> <span>{props.category}</span>
            </li>
        )
    }
}

let menuArr = ['ALL', '발라드']
let activeArr = ['active-menu', '']

/* TODO 카테고리 리스트를 만들때 앞의 아이콘을 ALL 이랑 기본에 차이를 두고 싶다.. props으로 장난질 쳐야하는 것인가? */
class CategoryList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeArr: []
        }

        this.toggleActive = this.toggleActive.bind(this)
    }

    componentWillMount() {
        this.setState({activeArr: activeArr})
    }

    /* 메뉴 액티브 관련 */
    toggleActive(i, category) {
        let newActiveArr = this.state.activeArr

        newActiveArr.filter((e, i) => {
            newActiveArr[i] = ''
        })

        newActiveArr[i] = newActiveArr[i] === 'active-menu' ? '' : 'active-menu'

        this.setState({
            activeArr: newActiveArr
        })

        this.props.changeCategory(category)
    }

    render() {
        const categories = menuArr.map((menu, index) => <Category key={index} onActive={this.toggleActive}
                                                                  active={activeArr[index]} i={index}
                                                                  category={menu}/>)

        return (
            <ul className="list-group list-group-flush" id="main-menu">
                {categories}
            </ul>
        )
    }
}

/* 비동기적으로 데이터 처리 (앱이 시작하는 부분) */
fetch('/music_data.json').then(res => res.json()).then(json => {
    json.data.sort(function (a, b) {
        return a.release > b.release ? -1 : 1;
    });

    data = json.data

    /* 메뉴 정리하기 */
    let items = ''

    /* json 데이터를 돌아가면서 보여주기 */
    data.filter((e, i) => {
        data[i].count = 0

        if ($.inArray(e.category, menuArr) === -1) {
            menuArr.push(e.category)
            activeArr.push('')
        }

        /* 장바구니에 존재하는 목록 이 부분도 React 로 처리하기 */
        items += `<tr data-idx="${i + 1}" style={{display: 'none'}}>
                    <td class="albuminfo">
                        <img src="/images/${e.albumJaketImage}" alt="img">
                        <div class="info">
                            <h4>${e.albumName}</h4>
                            <span>
                                <i class="fa fa-microphone"> 아티스트</i> 
                                <p>${e.artist}</p>
                            </span>
                            <span>
                                <i class="fa  fa-calendar"> 발매일</i> 
                                <p>${e.release}</p>
                            </span>
                        </div>
                    </td>
                    <td class="albumprice">
                        ￦ ${num(e.price).toLocaleString()}
                    </td>
                    <td class="albumqty">
                        <input type="number" class="form-control" min="1" value="0" />
                    </td>
                    <td class="pricesum">
                        ￦ 0
                    </td>
                    <td>
                        <button class="btn btn-default">
                            <i class="fa fa-trash-o"/> 삭제
                        </button>
                    </td>
                </tr>`
    })

    ReactDOM.render(e(App), document.querySelector('#app'))

    /* 아이템 목록 추가 */
    $('.modal tbody').html(items)
})

/* 콤마 찍기. */
const comma = (str) => {
    // console.log(str)

    /* 문자열로 변경 */
    str = str + ""

    // 7
    let start = (str.length % 3)
    let len = str.length
    // console.log(len, start);

    /* substr 을 하면 안된다.. 이유는 알아서 찾아봐; */
    let newStr = str.substring(0, start)

    while (start < len) {
        if (newStr !== "") newStr += ",";
        newStr += str.substring(start, start + 3);
        start += 3;
    }

    return newStr;
}
