import {Button, FormControl, InputLabel, Select} from "@material-ui/core";
import {Link} from "react-router-dom";
import {categories} from "../store/tests";
// import {useEffect} from "react";

const Home = ({onSubmit,options,isUser, isLoading, setTruthUser,forseUpdate}) => {
    // let { token } = useParams();

    // useEffect(() => {
    //     fetch('https://tuit-exam.herokuapp.com/api/token/' + token)
    //         .then(response => response.json())
    //         .then(data => {
    //             setTruthUser(data)
    //         })
    //         .catch(() => setTruthUser(false))
    // }, []);
    //
    // if (isLoading){
    //     return <div className="d-flex mt-5 justify-content-center">
    //         <div className="spinner-border" role="status">
    //             <span className="visually-hidden">
    //
    //             </span>
    //         </div>
    //     </div>
    // }
    //
    // if (!isUser){
    //     return <h1 className="text-center">
    //         <p className="text-warning">
    //             Token ishlatilgan!
    //         </p>
    //         Botga qaytadan /start yoki /menu yozing!
    //     </h1>
    // }

    const selectChangeHandler = (object) => {
        onSubmit({...options, [object.name]: object.value})
    }
    const numbers = [
        {value: 35, name: 35},
        {value: 10, name: 10},
        {value: 15, name: 15},
        {value: 20, name: 20},
        {value: 25, name: 25},
        {value: 30, name: 30},
    ]
    // const difficulties = [
    //     {value: '-', name: '-'},
    // ]
    return (
        <div className="container-fluid p-0">
            <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3 p-3">
                <MySelect name={'amount'}
                          className="w-100"
                          label={"Number Of Questions:"}
                          options={options}
                          values={numbers}
                          onChange={selectChangeHandler}/>
                {/*<MySelect name={'difficulty'}*/}
                {/*          className="w-100"*/}
                {/*          values={difficulties}*/}
                {/*          label={"Select Difficulty:"}*/}
                {/*          options={options}*/}
                {/*          onChange={selectChangeHandler}/>*/}
                <MySelect name={'category'}
                          label={"Select Category:"}
                          values={categories}
                          options={options}
                          onChange={selectChangeHandler}/>
                <Button variant="contained"
                        size="large"
                        onClick={forseUpdate}
                        className="bg-success w-100 mt-3 p-0"
                        color="secondary">
                    <Link className="text-white d-block m-0 text-decoration-none w-100 h-100 py-2"
                          to="/quiz"
                          push>
                        Start
                    </Link>
                </Button>
                <Button variant="contained"
                        size="large"
                        onClick={forseUpdate}
                        className="bg-info w-100 mt-3 p-0"
                        color="secondary">
                    <Link to="/tests" className="text-white d-block m-0 text-decoration-none w-100 h-100 py-2" push>
                        Tests
                    </Link>
                </Button>
            </div>



        </div>
    );
};

const MySelect = ({values = [], onChange, name, label, options}) => {
    return (
        <FormControl variant="standard" fullWidth className="mt-2">
            <InputLabel shrink>{label}</InputLabel>
            <Select
                native
                value={options[name].value}
                onChange={(e) => onChange({name, value: e.target.value})}
                label={label}
            >
                {
                    values.map((value, index) => {
                        return (
                            <option key={index} value={value.value}>{value.name}</option>
                        )
                    })
                }
            </Select>
        </FormControl>
    )
}

export default Home;
