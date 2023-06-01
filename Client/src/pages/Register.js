import {Logo, FormRow, Alert} from "../components"
import Wrapper from "../assets/wrappers/RegisterPage";
import {useEffect, useState} from "react";
import {useAppContext} from "../context/appContext";
import {useNavigate} from "react-router-dom";


const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
}


function Register() {
    const [values, setValues] = useState(initialState)
    const navigate = useNavigate()
    const {user, isLoading, showAlert, displayAlert, setupUser} = useAppContext()

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const toggleMember = () => {
        setValues({...values, isMember: !values.isMember})

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const {name, email, password, isMember} = values
        if (!email || !password || (!isMember && !name)) {
            displayAlert()
            return
        }

        const currentUser = {
            name,
            email,
            password
        }
        if (isMember) {
            setupUser({curUser: currentUser, endPoint: "login", alertText: "Login Successful"})
        } else
            setupUser({curUser: currentUser, endPoint: "register", alertText: "User created"})

    }

    useEffect(() => {
        if (user && user !== undefined) {
            setTimeout(() => {
                navigate("/")
            }, 3000)
        }
    }, [user])


    return (
        <Wrapper className={"full-page"}>
            <form className={"form"} onSubmit={handleSubmit}>
                <Logo/>
                <h3>{values.isMember === true ? "Login" : "Register"}</h3>
                {showAlert && <Alert alert={"nejde"}></Alert>}

                {values.isMember !== true ?
                    <FormRow name={"name"} type={"text"} value={values.name} handleChange={handleChange}/> : ""}


                <FormRow name={"email"} type={"email"} value={values.email} handleChange={handleChange}/>

                <FormRow name={"password"} type={"password"} value={values.password} handleChange={handleChange}/>

                <button type='submit' className="btn btn-block" disabled={isLoading}> Submit</button>
                <p>
                    {values.isMember !== true ? <span>Already a memeber?</span> : <span>Not a member yet?</span>}
                    <button type="button" className="member-btn" onClick={toggleMember}> {values.isMember !== true ?
                        <span>Login </span> : <span>Register </span>} </button>
                </p>
            </form>


        </Wrapper>
    );
}

export default Register;