import { useState, useEffect } from 'react'

const LoginYProductos = () => {

    const baseURL = 'https://back-sandbox.herokuapp.com/api'

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [flag, setFlag] = useState(false);

    const limit = 10;

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const onLogin = async () => {
        try {
            const response = await fetch(`${baseURL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const json = await response.json();
            console.log(json);
            localStorage.setItem('token', json.token);
            setToken(json.token);
        } catch( error ) {
            alert(error);
        }
    }

    const onGetProducts = async() => {
        try {
            const response = await fetch(`${baseURL}/products?limit=${limit}&offset=${(page - 1) * limit}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const json = await response.json();
            setProducts(json.data.data);
            setTotal(json.data.total);
        } catch (error){
            alert(error);
        }
    }

    const onGoBack = () => {
        if(page > 1){
            setPage(page-1);
        }
    }
    const onGoAhead = () => {
        if(page < Math.ceil(total/limit)){
            setPage(page+1);
        }
    }

    useEffect(() => {
        const localToken = localStorage.getItem('token');
        if(localToken) {
            setToken(localToken);
        }
    }, []);

    useEffect(() => {
        if(token) {
            onGetProducts();
        }
    }, [token, page]);

    useEffect(() => {
        setFlag(!flag);
    }, [flag]);

    return (
        <div>
            <form>
                <input type="text" onChange={onChangeEmail} />
                <input type="text" onChange={onChangePassword}/>
                <button type="button" onClick={onLogin}>Login</button>
            </form>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map( (p, i) => {
                            return <tr key={i}>
                                <td>{p.name}</td>
                                <td>{p.price}</td>
                            </tr>
                        })}
                        {/* <tr>
                            <td>

                            </td>
                        </tr> */}
                    </tbody>
                </table>
                <div>
                    <button onClick={onGoBack}> {'<'} </button>
                    <strong style={{ margin: '0 15px'}}>{page} de {Math.round(total/limit)}</strong>
                    <button onClick={onGoAhead}> {'>'} </button>
                </div>
            </div>
        </div>
    )
}

export default LoginYProductos
