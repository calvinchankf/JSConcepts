import styles from "../../styles/Home.module.css";

export default function PokeCard({ pokemon: { name, height, imageURL } }) {
    return (<div className={styles.card}>
        <div>{name}</div>
        <div>{height > 0 ? height : '' }</div>
        <img className="logo" src={imageURL}></img>
    </div>)
}