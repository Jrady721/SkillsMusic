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
function Album(props) {
    const countChange = () => {
        props.onUpdate(props.i)
    }


    return (
        <div className="col-2 product-grid album" data-category={props.e.category}
             data-name={props.e.albumName} data-idx={props.i + 1}>
            <div className="product-items">
                <div className="project-eff">
                    <img className="img-responsive" src={'/images/' + props.e.albumJaketImage} alt={props.e.albumName}/>
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
    }

    render() {
        console.log(this.state.data)

        /* 저거 할 때 중괄호 넣으면 안됀다... 중괄호 안넣어서 2시간 동안 고민함;;; */
        const list = this.state.data.map((e, i) => <Album onUpdate={this.changeCountData} key={i} e={e} i={i}/>)

        console.log(list)

        // 발매일 내림차순
        return (list)
    }
}

/* APP */
class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selCategory: 'ALL',
            searchKeyword: ''
        }
    }

    render() {
        return (
            "<div></div>"
        )
    }
}

/* 메뉴 목록 */
function Category(props) {
    const activeMenu = () => {
        props.onActive(props.i)
    }

    if (props.i === 0) {
        return (
            <li className={'list-group-item ' + props.active} onClick={activeMenu}>
                <i className="fa fa-th-list"></i> <span>{props.category}</span>
            </li>
        )
    } else {
        return (
            <li className={'list-group-item ' + props.active} onClick={activeMenu}>
                <i className="fas fa-play-circle"></i> <span>{props.category}</span>
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
    toggleActive(i) {
        let newActiveArr = this.state.activeArr

        newActiveArr.filter((e, i) => {
            newActiveArr[i] = ''
        })

        newActiveArr[i] = newActiveArr[i] === 'active-menu' ? '' : 'active-menu'

        this.setState({
            activeArr: newActiveArr
        })
    }

    render() {
        const categories = menuArr.map((menu, index) => <Category key={index} onActive={this.toggleActive}
                                                                  active={activeArr[index]} i={index}
                                                                  category={menu}/>)

        return (categories)
    }
}

/* 비동기적으로 데이터 처리 */
fetch('/music_data.json').then(res => res.json()).then(json => {
    json.data.sort(function (a, b) {
        return a.release > b.release ? -1 : 1;
    });

    data = json.data

    /* 앨범목록 처리하기 */
    const domContainer = document.querySelector('.albums')
    ReactDOM.render(e(AlbumList), domContainer)

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
        items += `<tr data-idx="${i + 1}" style="display: none;">
                                            <td class="albuminfo">
                                                <img src="/images/${e.albumJaketImage}">
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
                                                <input type="number" class="form-control" min="1" value="0">
                                            </td>
                                            <td class="pricesum">
                                                ￦ 0
                                            </td>
                                            <td>
                                                <button class="btn btn-default">
                                                    <i class="fa fa-trash-o"></i> 삭제
                                                </button>
                                            </td>
                                        </tr>`
    })

    /* APPEND 사용하지 말자.. 다 React Component 형태로 변경하기 */
    ReactDOM.render(e(CategoryList), document.querySelector('#main-menu'))

    /* 아이템 목록 추가 */
    $('.modal tbody').html(items)
})

const comma = (str) => {
    console.log(str)

    // 7
    let start = (str.length % 3)
    let len = str.length
    console.log(len, start);

    /* substr 을 하면 안된다.. 이유는 알아서 찾아봐; */
    let newStr = str.substring(0, start)

    while (start < len) {
        if (newStr !== "") newStr += ",";
        newStr += str.substring(start, start + 3);
        start += 3;
    }

    return newStr;
}
