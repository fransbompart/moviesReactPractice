import styles from "./Search.module.css"
import { FaSearch } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { useQuery } from "../hooks/useQuery"

export function Search() {
    const history = useNavigate(); //permite cambiar el historial de navegacion a la ruta, es decir movernos a una nueva pagina al agregrar un elemento a la ruta
    
    const handleSubmit = (e) => {
        e.preventDefault();
    }   

    const query = useQuery();
    const search = query.get("search");

    return (
        <form className={styles.searchContainer} onSubmit={handleSubmit}>
            <div className={styles.searchBox}>
                <input 
                    className={styles.searchInput}
                    type="text" 
                    value={search}
                    placeholder="Title"
                    aria-label="Search Movies"
                    onChange={ (e) => {
                        const value = e.target.value;
                        history("/?search=" + value);
                        
                    }}
                />
                <FaSearch className={styles.searchButton} color="black" size={20}/>    
            </div>
        </form>
    )
}