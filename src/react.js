'use strict';

const e = React.createElement;


// let data = null

class CartButton extends React.Component {
    render() {
        return (
            <button className="btn btn-default btn-xs" data-count="0">
                <i className="fa fa-shopping-cart"></i> 쇼핑카트담기
            </button>
        )
    }
}

class Albums extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    /* */
    componentWillMount() {
        fetch('/music_data.json').then(res => res.json()).then(json => {
            json.data.sort(function (a, b) {
                return a.release > b.release ? -1 : 1;
            });

            this.setState({data: json.data})
        })
    }

    componentDidMount() {

    }

    render() {
        console.log(this.state.data)

        /* 저거 할 때 중괄호 넣으면 안됀다... 중괄호 안넣어서 2시간 동안 고민함;;; */
        const list = this.state.data.map((e, i) => <Album key={i} e={e} i={i}/>)

        console.log(list)

        // 발매일 내림차순
        return (
            <div>{list}</div>
        )
    }
}

function Album(props) {
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
                            <i className="fa fa-microphone"> 아티스트 AA</i>
                            <p className="artist">{props.e.artist}</p>
                        </span>
                    <span>
                            <i className="fa fa-calendar"> 발매일</i>
                            <p>${props.e.release}</p>
                        </span>
                    <span>
                            <i className="fa fa-money"> 가격</i>
                            <p>￦{props.e.price.toLocaleString()}</p>
                        </span>
                    <span className="shopbtn">
                            <CartButton/>
                        </span>
                </div>
            </div>
        </div>
    )
}

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {liked: false};
    }

    render() {
        if (this.state.liked) {
            return 'You liked this.';
        }

        // return e(
        //     'button',
        //     { onClick: () => this.setState({ liked: true }) },
        //     'Like'
        // );

        return (
            <button onClick={() => this.setState({liked: true})}>
                Like
            </button>
        )
    }
}

let data = []
fetch('/music_data.json').then(res => res.json()).then(json => {
    json.data.sort(function (a, b) {
        return a.release > b.release ? -1 : 1;
    });

    data = json.data

    const domContainer = document.querySelector('.contents')
    ReactDOM.render(e(Albums), domContainer)
})