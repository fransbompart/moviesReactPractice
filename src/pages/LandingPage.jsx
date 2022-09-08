import { MoviesGrid } from "../components/MoviesGrid";
import { Search } from "../components/Search";
import { useDebounce } from "../hooks/useDebounce";
import { useQuery } from "../hooks/useQuery";

export function LandingPage() {
    const query = useQuery();
    const search = query.get("search");

    const debouncedSearch = useDebounce(search, 300)

    
    return (
        <div>
            <Search/>
            <MoviesGrid key={debouncedSearch} search={debouncedSearch} />  
        </div>
        //la clave/key de un componente en react es unica, le permite determinar diferentes cosas, por ejemplo si un componente ha cambiado o no
        //con la finalidad de no renderizarlo de nuevo en caso de no ser necesario
        //si el componente cambia de clave React lo destruye y renderiza uno nuevo
        //En este caso cada vez que se actualice el link actual ya que el usuario ha realizado una busqueda el parametro search se actualizara
        //por ende cambiara el componente de MovieGrid, asi se logran actualizar todos sus estados internos

    );
}