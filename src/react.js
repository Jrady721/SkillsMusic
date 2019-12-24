'use strict';

const e = React.createElement;

let data = []


/* 장바구니 담기 버튼 */
function CartButton(props) {
    const addCount = () => {
        props.onCountChange()
        console.log('버튼 클릭')
    }

    // return (
    //     <button className="btn btn-default btn-xs btn-cart" data-count={props.count} onClick={addCount}>
    //         <i className="fa fa-shopping-cart"/>
    //     </button>
    // )

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
    // const [count, setCount] = useState(0)

    const countChange = () => {
        props.onUpdate(props.i)
        console.log(props.i)
    }

    return (
        <div className="col-md-2 col-sm-2 col-xs-2 product-grid album" data-category={props.e.category}
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
                        <p>￦{props.e.price.toLocaleString()}</p>
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
            data: [],
            menus: []
        }

        this.changeCountData = this.changeCountData.bind(this)
    }

    componentWillMount() {
        fetch('/music_data.json').then(res => res.json()).then(json => {
            json.data.sort(function (a, b) {
                return a.release > b.release ? -1 : 1;
            });

            this.setState({data: json.data})

            let menuArr = ['발라드']
            let menus = ''
            let items = ''

            /* json 데이터를 돌아가면서 보여주기 */
            json.data.filter((e, i) => {
                if ($.inArray(e.category, menuArr) === -1) {
                    menuArr.push(e.category)
                    menus += ` <li>
                        <a href="#"><i class="fa fa-youtube-play fa-2x"></i> <span>${e.category}</span></a>
                    </li>`
                }

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

                /* 갯수 정보 추가 */
                this.state.data[i].count = 0
            })

            $('.nav').append(menus)

            /* 아이템 목록 추가 */
            $('.modal tbody').html(items)
        })
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
        return (
            <div>{list}</div>
        )
    }
}


// function AlbumData(props) {
//     return (
//         <span>
//             <i className="fa fa-money"> 가격</i>
//             <p>￦{props.e.price.toLocaleString()}</p>
//         </span>
//     )
// }


/* 비동기적으로 데이터 처리 */
fetch('/music_data.json').then(res => res.json()).then(json => {
    json.data.sort(function (a, b) {
        return a.release > b.release ? -1 : 1;
    });

    data = json.data

    const domContainer = document.querySelector('.contents')
    ReactDOM.render(e(AlbumList), domContainer)
})