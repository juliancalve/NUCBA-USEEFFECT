import { useEffect, useState } from 'react'

const Button = () => {

    const [page, setPage] = useState(1);

    const onGetUsers = async () => {
        try {
            const response = await fetch(`https://reqres.in/api/users?page=${page}`,{
                method: 'GET'
            });

            const json = await response.json();

            console.log(json.data);
        } catch( error ) {
            alert(error);
        }
    }

    //El useEffect tiene el rol de gestionar los ciclos de vida del componente
    // Render
    // Update
    // Destroy

    // El useEffect, obtiene 2 datos por parametros
    // 1- Primero es una funcion anonima, donde va a estar el codigo que se ejecuta
    // Cuando se reenderiza el componente, se updatea y se elimina
    // 2- Despues tiene el segundo dato que se envia por parametro, que es un arreglo
    // que declara las dependencias

    //Este se ejecuta al reenderizar el componente y cuando page cambie su valorJ
    useEffect(() => {
        onGetUsers();
    }, [page]);

    //Este solo se ejecuta cuando se destruye el componente
    useEffect(() => {
        return () => alert('Me destrui');
    }, []);

    //Este solo se ejecuta una unica vez y nunca mas
    useEffect(() => {
        alert('Hola');
    }, []);

    //Este se ejecuta siempre que cambie cualquier valor de estado
    useEffect(() => {
        alert('Me ejecuto siempre');
    })



    // useEffect(() => {
    //     console.log('Cambie mi estado 2');
    //     // return () => console.log('Me destrui');
    // }, [clicked2]);

    const handleClick1 = () => {
        setPage(1);
    }
    const handleClick2 = () => {
        setPage(2);
    }
    const handleClick3 = () => {
        setPage(3);
    }

    return (
        <div>
            <button onClick={handleClick1}>page 1</button>
            <button onClick={handleClick2}>page 2</button>
            <button onClick={handleClick3}>page 3</button>
        </div>
    )
}

export default Button
