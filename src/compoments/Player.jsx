import {useState} from "react";

export default function Player({initialName, symbol, isActive, onChaneName}) {

    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        // if (isEditing) {
        //     setIsEditing(false);
        // } else
        //     setIsEditing(true);

        // setIsEditing(!isEditing);

        setIsEditing(isEditing => !isEditing);

        if (isEditing) {
            onChaneName(symbol,playerName);
        }
    }

    function handleChange(event){
        console.log(event)
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;
    // let btnCaption = "Edit";

    if (isEditing) {
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange}/>;
        // btnCaption = "Save";
    }

    return (
        <>
            {/* add class conditionally, so we can give the <li> tag conditional CSS effect. */}
            <li className={isActive ? "active" : undefined}>
                        <span className="player">
                            {editablePlayerName}
                            <span className="player-symbol">{symbol}</span>
                            <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
                        </span>
            </li>
        </>
    );

}