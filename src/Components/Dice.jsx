import  './DiceStyle.css'

export default function Dice(props) {

    const style = {
        backgroundColor: props.status ? 'aquamarine' : 'whitesmoke'
    }

    return (
        <div 
        className={`individual-die`} 
        onClick={props.onClick}
        style={style}
        >
            <h2 className='die-num'>{props.value}</h2>
        </div>
    )
}