import { useEffect, useRef, useState } from "react"



export const useFetch = ( url, id ) => {
    
    const isMounted = useRef(true);
    const [state, setState] = useState({ data: null, loading: true, error: null});

    useEffect(() => {
        
        return () => {
           isMounted.current = false;
        }
    }, [])

    useEffect( ()=>{

        fetch(url)
            .then( respuesta => respuesta.json())
            .then( data => {
               
                    if(isMounted.current){

                        setState({
                            loading: false,
                            error: null,
                            data
                        })

                    }else{
                        console.log('setState no se llamó...');
                    }
            })
            .catch(()=>{
                setState({
                    data: null,
                    loading: false,
                    error: 'No se pudo cargar la data!',
                })
            })

    }, [url, id])

    return state;

}