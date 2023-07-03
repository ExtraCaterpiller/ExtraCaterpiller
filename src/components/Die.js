

function Die(props){
    const styles = {
        backgroundColor : props.color ? "#59E391" : "#FFFFFF"
    }
    return (
        <div 
            className="box--dice" 
            style={styles}
            onClick={props.holdDice}
        >
            <h4 className="box--num">{props.value}</h4>
        </div>
    )
}

export default Die